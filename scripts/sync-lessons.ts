import ical from 'node-ical'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const CALENDAR_URL =
  'https://flynn.boolean.careers/montessori/api/out/calendar/de740af0-1df5-11f1-b790-a3e68c6f42a1'
const DATA_DIR = path.join(process.cwd(), 'src', 'data')
const ICS_PATH = path.join(DATA_DIR, 'public-calendar.ics')
const LESSONS_PATH = path.join(DATA_DIR, 'lessons.json')
const ROME_TIMEZONE = 'Europe/Rome'
const { sync } = ical

type Lesson = {
  id: string
  title: string
  start: string
  end: string
}

const weekdayFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: ROME_TIMEZONE,
  weekday: 'short',
})

const timeFormatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: ROME_TIMEZONE,
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

function getWeekday(date: Date) {
  return weekdayFormatter.format(date)
}

function getTime(date: Date) {
  return timeFormatter.format(date)
}

function isTrackedLesson(title: string, start: Date) {
  if (title.includes('Tutoraggio')) {
    return false
  }

  const weekday = getWeekday(start)

  if (weekday === 'Tue' || weekday === 'Thu') {
    return true
  }

  return weekday === 'Sat' && getTime(start) === '09:00'
}

function readLessonsFromCalendar() {
  const calendar = sync.parseFile(ICS_PATH)
  const lessons: Lesson[] = []

  for (const entry of Object.values(calendar)) {
    if (!entry || entry.type !== 'VEVENT') {
      continue
    }

    if (!entry.uid || !entry.summary || !entry.start || !entry.end) {
      continue
    }

    const title = String(entry.summary).trim()
    const start = new Date(entry.start)
    const end = new Date(entry.end)

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      continue
    }

    if (!isTrackedLesson(title, start)) {
      continue
    }

    lessons.push({
      id: entry.uid,
      title,
      start: start.toISOString(),
      end: end.toISOString(),
    })
  }

  lessons.sort((left, right) => left.start.localeCompare(right.start))

  return lessons
}

async function fetchCalendar() {
  const response = await fetch(CALENDAR_URL)

  if (!response.ok) {
    throw new Error(
      `Calendar fetch failed with ${response.status} ${response.statusText}`,
    )
  }

  const calendarText = await response.text()

  if (!calendarText.trim()) {
    throw new Error('Calendar fetch returned an empty ICS file')
  }

  return calendarText
}

async function saveSnapshot(calendarText: string) {
  await mkdir(DATA_DIR, { recursive: true })
  await writeFile(ICS_PATH, calendarText, 'utf8')
}

async function saveLessons(lessons: Lesson[]) {
  await writeFile(LESSONS_PATH, `${JSON.stringify(lessons, null, 2)}\n`, 'utf8')
}

async function printSummary(lessons: Lesson[]) {
  console.log(
    `Saved ${lessons.length} lessons to ${path.relative(process.cwd(), LESSONS_PATH)}`,
  )

  if (lessons.length === 0) {
    throw new Error('No tracked lessons were parsed from the calendar')
  }

  const preview = (label: string, items: Lesson[]) => {
    console.log(`\n${label}`)

    for (const lesson of items) {
      const durationHours =
        (new Date(lesson.end).getTime() - new Date(lesson.start).getTime()) /
        (1000 * 60 * 60)

      console.log(
        `- ${lesson.start} -> ${lesson.end} (${durationHours}h) | ${lesson.title} | ${lesson.id}`,
      )
    }
  }

  preview('First 3 lessons:', lessons.slice(0, 3))
  preview('Last 3 lessons:', lessons.slice(-3))

  const snapshot = await readFile(ICS_PATH, 'utf8')
  console.log(
    `\nUpdated snapshot: ${path.relative(process.cwd(), ICS_PATH)} (${snapshot.length} chars)`,
  )
}

async function main() {
  const calendarText = await fetchCalendar()
  await saveSnapshot(calendarText)

  const lessons = readLessonsFromCalendar()
  await saveLessons(lessons)
  await printSummary(lessons)
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : 'Unknown error'
  console.error(`sync-lessons failed: ${message}`)
  process.exitCode = 1
})
