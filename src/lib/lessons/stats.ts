import lessonsData from '@/data/lessons.json'
import type { Lesson, LessonStats } from './types'

// Computes a lesson duration in hours from its start and end timestamps (e.g. 1.5 for a 90-minute lesson).
function getLessonHours(lesson: Lesson) {
  const start = new Date(lesson.start)
  const end = new Date(lesson.end)

  return (end.getTime() - start.getTime()) / (1000 * 60 * 60)
}

/**
 * Computes derived lesson metrics from a lesson array and a reference date.
 */
export function getLessonStats(lessons: Lesson[], now: Date): LessonStats {
  // Lessons that have ended before 'now' are considered completed.
  const completedLessonsList = lessons.filter(
    (lesson) => new Date(lesson.end) < now,
  )

  // Lessons that haven't started yet are considered remaining.
  const remainingLessonsList = lessons.filter(
    (lesson) => new Date(lesson.start) > now,
  )

  const totalLessons = lessons.length
  const completedLessons = completedLessonsList.length
  const remainingLessons = remainingLessonsList.length
  const totalHours = lessons.reduce((total, lesson) => {
    return total + getLessonHours(lesson)
  }, 0)
  const completedHours = completedLessonsList.reduce((total, lesson) => {
    return total + getLessonHours(lesson)
  }, 0)
  const remainingHours = remainingLessonsList.reduce((total, lesson) => {
    return total + getLessonHours(lesson)
  }, 0)
  const progressPercent =
    totalLessons === 0 ? 0 : (completedLessons / totalLessons) * 100
  const nextLesson = remainingLessonsList[0] ?? null

  return {
    totalLessons,
    completedLessons,
    remainingLessons,
    totalHours,
    completedHours,
    remainingHours,
    progressPercent,
    nextLesson,
  }
}

/**
 * Loads lessons from the local JSON source and returns the current derived stats.
 */
export function getLessonStatsFromJson(now = new Date()) {
  const lessons = lessonsData as Lesson[]

  return getLessonStats(lessons, now)
}
