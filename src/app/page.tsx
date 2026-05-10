import { ProgressChart } from '@/components/dashboard/progress-chart'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import lessonsData from '@/data/lessons.json'
import {
  formatLessonDate,
  formatLessonDuration,
  formatLessonMonth,
  formatLessonTimeRange,
  getLessonStats,
  getLessonTimelineData,
  type Lesson,
  type LessonStats,
  type LessonTimelineItem,
  type LessonTimelineStatus,
} from '@/lib/lessons'
import { cn } from '@/lib/utils'
import {
  BookOpenCheck,
  CalendarClock,
  CheckCircle2,
  Clock3,
  Hourglass,
  TrendingUp,
} from 'lucide-react'
import { connection } from 'next/server'

const lessons = lessonsData as Lesson[]

const numberFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 1,
})

const percentFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 1,
  minimumFractionDigits: 1,
  style: 'percent',
})

function formatNumber(value: number) {
  return numberFormatter.format(value)
}

function formatPercent(value: number) {
  return percentFormatter.format(value / 100)
}

function getStatusLabel(status: LessonTimelineStatus) {
  if (status === 'completed') {
    return 'Completed'
  }

  if (status === 'next') {
    return 'Next'
  }

  return 'Upcoming'
}

function StatCard({
  title,
  value,
  description,
  icon: Icon,
}: {
  title: string
  value: string
  description: string
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>
}) {
  return (
    <Card size='sm'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-sm text-muted-foreground'>
          <Icon className='size-4 text-primary-text' aria-hidden />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-1'>
        <div className='text-3xl font-semibold tracking-tight tabular-nums'>
          {value}
        </div>
        <p className='text-sm text-muted-foreground'>{description}</p>
      </CardContent>
    </Card>
  )
}

function NextLessonCard({ nextLesson }: { nextLesson: Lesson | null }) {
  return (
    <Card className='border-primary/30 bg-primary/5 ring-primary/20'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <CalendarClock className='size-5 text-primary-text' aria-hidden />
          Next Lesson
        </CardTitle>
        <CardDescription>Next up in the course schedule</CardDescription>
      </CardHeader>
      <CardContent>
        {nextLesson ? (
          <div className='space-y-4'>
            <div className='space-y-2'>
              <Badge>Next Up</Badge>
              <h2 className='text-2xl leading-tight font-semibold text-balance'>
                {nextLesson.title}
              </h2>
            </div>
            <div className='grid gap-2 text-sm text-muted-foreground'>
              <div>{formatLessonDate(nextLesson.start)}</div>
              <div>
                {formatLessonTimeRange(nextLesson)} ·{' '}
                {formatLessonDuration(nextLesson)}
              </div>
            </div>
          </div>
        ) : (
          <p className='text-sm text-muted-foreground'>
            No remaining lesson is scheduled.
          </p>
        )}
      </CardContent>
    </Card>
  )
}

function ProgressCard({ stats }: { stats: LessonStats }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <TrendingUp className='size-5 text-primary-text' aria-hidden />
          Course Completion
        </CardTitle>
        <CardDescription>
          Completed lessons compared with the full tracked course schedule
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='space-y-3'>
          <div className='flex items-end justify-between gap-4'>
            <span className='text-5xl font-semibold tracking-tight tabular-nums'>
              {formatPercent(stats.progressPercent)}
            </span>
            <span className='pb-1 text-sm text-muted-foreground'>
              {stats.completedLessons} of {stats.totalLessons} lessons
            </span>
          </div>
          <Progress
            value={stats.progressPercent}
            aria-label='Course progress'
          />
        </div>
        <div className='space-y-2'>
          <div className='flex justify-between gap-4 text-sm'>
            <span className='font-medium'>Hours Completed</span>
            <span className='text-muted-foreground tabular-nums'>
              {formatNumber(stats.completedHours)}h /{' '}
              {formatNumber(stats.totalHours)}h
            </span>
          </div>
          <div className='flex h-2 overflow-hidden rounded-full bg-muted'>
            <div
              className='bg-chart-3'
              style={{ width: `${stats.progressPercent}%` }}
            />
            <div className='flex-1 bg-muted-foreground/30' />
          </div>
          <div className='flex justify-between text-xs text-muted-foreground'>
            <span>{formatNumber(stats.completedHours)}h done</span>
            <span>{formatNumber(stats.remainingHours)}h remaining</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ChartCard({ stats }: { stats: LessonStats }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Progress Split</CardTitle>
        <CardDescription>
          Completed and remaining work by lesson count and tracked hours
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ProgressChart
          completedLessons={stats.completedLessons}
          remainingLessons={stats.remainingLessons}
          completedHours={stats.completedHours}
          remainingHours={stats.remainingHours}
        />
      </CardContent>
    </Card>
  )
}

function LessonStatusBadge({ status }: { status: LessonTimelineStatus }) {
  return (
    <Badge
      variant={status === 'next' ? 'default' : 'outline'}
      className={cn(
        status === 'completed' &&
          'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
        status === 'upcoming' &&
          'border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300',
      )}
    >
      {getStatusLabel(status)}
    </Badge>
  )
}

function LessonTimelineRow({ lesson }: { lesson: LessonTimelineItem }) {
  return (
    <li
      className={cn(
        'grid gap-3 py-4 [contain-intrinsic-size:96px] [content-visibility:auto] sm:grid-cols-[minmax(0,1fr)_auto]',
        lesson.status === 'completed' && 'text-muted-foreground',
        lesson.status === 'next' &&
          'rounded-lg bg-primary/5 px-4 ring-1 ring-primary/20',
      )}
    >
      <div className='min-w-0 space-y-1'>
        <div className='flex flex-wrap items-center gap-2'>
          <LessonStatusBadge status={lesson.status} />
          <span className='text-xs text-muted-foreground'>
            {formatLessonDate(lesson.start)}
          </span>
        </div>
        <h3 className='font-medium wrap-break-word text-foreground'>
          {lesson.title}
        </h3>
      </div>
      <div className='flex items-center gap-3 text-sm text-muted-foreground sm:justify-end'>
        <span>{formatLessonTimeRange(lesson)}</span>
        <span className='tabular-nums'>{formatLessonDuration(lesson)}</span>
      </div>
    </li>
  )
}

function TimelineSection({
  timelineGroups,
}: {
  timelineGroups: ReturnType<typeof getLessonTimelineData>
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lesson Timeline</CardTitle>
        <CardDescription>
          Chronological course schedule grouped by Rome-local month
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-8'>
        {timelineGroups.map((group) => (
          <section key={group.monthKey} className='space-y-3'>
            <div className='flex items-center gap-3'>
              <h2 className='shrink-0 text-sm font-semibold tracking-wide text-muted-foreground uppercase'>
                {formatLessonMonth(group.monthKey)}
              </h2>
              <Separator />
            </div>
            <ol className='divide-y divide-border'>
              {group.lessons.map((lesson) => (
                <LessonTimelineRow key={lesson.id} lesson={lesson} />
              ))}
            </ol>
          </section>
        ))}
      </CardContent>
    </Card>
  )
}

export default async function Home() {
  await connection()

  const now = new Date()
  const stats = getLessonStats(lessons, now)
  const timelineGroups = getLessonTimelineData(lessons, now)

  return (
    <div className='space-y-10'>
      <section className='space-y-3'>
        <p className='text-sm font-medium text-primary-text'>
          Boolean Master Web Dev Part Time
        </p>
        <div className='space-y-2.5'>
          <h1 className='max-w-4xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl'>
            Course Progress Dashboard
          </h1>
          <p className='max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg'>
            Current progress from the local lesson snapshot. Stats use completed
            lessons that ended before now and remaining lessons that start
            later.
          </p>
        </div>
        <p className='text-sm text-muted-foreground'>
          As of {formatLessonDate(now.toISOString())}
        </p>
      </section>

      <section
        className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'
        aria-label='Course Summary'
      >
        <StatCard
          title='Total Lessons'
          value={formatNumber(stats.totalLessons)}
          description='Tracked course sessions'
          icon={BookOpenCheck}
        />
        <StatCard
          title='Completed'
          value={formatNumber(stats.completedLessons)}
          description={`${formatNumber(stats.completedHours)}h completed`}
          icon={CheckCircle2}
        />
        <StatCard
          title='Remaining'
          value={formatNumber(stats.remainingLessons)}
          description={`${formatNumber(stats.remainingHours)}h remaining`}
          icon={Hourglass}
        />
        <StatCard
          title='Total Hours'
          value={`${formatNumber(stats.totalHours)}h`}
          description='Calculated from lesson times'
          icon={Clock3}
        />
      </section>

      <section className='grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.8fr)]'>
        <ProgressCard stats={stats} />
        <NextLessonCard nextLesson={stats.nextLesson} />
      </section>

      <section>
        <ChartCard stats={stats} />
      </section>

      <TimelineSection timelineGroups={timelineGroups} />
    </div>
  )
}
