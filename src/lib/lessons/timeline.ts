import type {
  Lesson,
  LessonTimelineItem,
  LessonTimelineMonthGroup,
} from './types'

// Builds a stable Rome-local month key from a lesson start date (e.g. "2026-04")
function getLessonMonthKey(start: string) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    timeZone: 'Europe/Rome',
  }).formatToParts(new Date(start))

  const year = parts.find((part) => part.type === 'year')?.value
  const month = parts.find((part) => part.type === 'month')?.value

  return `${year}-${month}`
}

/**
 * Adds a timeline status to each lesson for rendering.
 */
export function getLessonTimelineItems(
  lessons: Lesson[],
  now: Date,
): LessonTimelineItem[] {
  const nextLesson = lessons.find((lesson) => new Date(lesson.start) > now)

  return lessons.map((lesson) => {
    if (new Date(lesson.end) < now) {
      return { ...lesson, status: 'completed' }
    }

    if (nextLesson && lesson.id === nextLesson.id) {
      return { ...lesson, status: 'next' }
    }

    return { ...lesson, status: 'upcoming' }
  })
}

/**
 * Groups timeline items by month using Europe/Rome date parts.
 */
export function groupLessonTimelineItemsByMonth(
  items: LessonTimelineItem[],
): LessonTimelineMonthGroup[] {
  const groups = new Map<string, LessonTimelineMonthGroup>()

  for (const item of items) {
    const monthKey = getLessonMonthKey(item.start)
    const currentGroup = groups.get(monthKey)

    if (currentGroup) {
      currentGroup.lessons.push(item)
      continue
    }

    groups.set(monthKey, {
      monthKey,
      lessons: [item],
    })
  }

  return Array.from(groups.values())
}

/**
 * Builds month-grouped timeline data from the lesson array.
 */
export function getLessonTimelineData(lessons: Lesson[], now: Date) {
  const items = getLessonTimelineItems(lessons, now)

  return groupLessonTimelineItemsByMonth(items)
}
