import type { Lesson } from './types'

const timeZone = 'Europe/Rome'

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'short',
  timeZone,
  weekday: 'short',
  year: 'numeric',
})

const monthFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  timeZone,
  year: 'numeric',
})

const timeFormatter = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  timeZone,
})

function getLessonDurationHours(lesson: Pick<Lesson, 'start' | 'end'>) {
  const start = new Date(lesson.start)
  const end = new Date(lesson.end)

  return (end.getTime() - start.getTime()) / (1000 * 60 * 60)
}

export function formatLessonDate(start: string) {
  return dateFormatter.format(new Date(start))
}

export function formatLessonMonth(monthKey: string) {
  return monthFormatter.format(new Date(`${monthKey}-15T12:00:00Z`))
}

export function formatLessonTimeRange(lesson: Pick<Lesson, 'start' | 'end'>) {
  const start = timeFormatter.format(new Date(lesson.start))
  const end = timeFormatter.format(new Date(lesson.end))

  return `${start} - ${end}`
}

export function formatLessonDuration(lesson: Pick<Lesson, 'start' | 'end'>) {
  const hours = getLessonDurationHours(lesson)

  return `${Number.isInteger(hours) ? hours : hours.toFixed(1)}h`
}
