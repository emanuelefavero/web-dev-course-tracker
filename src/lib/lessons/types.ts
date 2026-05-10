export type Lesson = {
  id: string
  title: string
  start: string
  end: string
}

export type LessonStats = {
  totalLessons: number
  completedLessons: number
  remainingLessons: number
  totalHours: number
  completedHours: number
  remainingHours: number
  progressPercent: number
  nextLesson: Lesson | null
}

export type LessonTimelineStatus = 'completed' | 'next' | 'upcoming'

export type LessonTimelineItem = Lesson & {
  status: LessonTimelineStatus
}

export type LessonTimelineMonthGroup = {
  monthKey: string
  lessons: LessonTimelineItem[]
}
