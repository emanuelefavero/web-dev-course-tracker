'use client'

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

type ProgressChartProps = {
  completedLessons: number
  remainingLessons: number
  completedHours: number
  remainingHours: number
}

const chartConfig = {
  completed: {
    label: 'Completed',
    color: 'var(--chart-3)',
  },
  remaining: {
    label: 'Remaining',
    color: 'var(--muted-foreground)',
  },
} satisfies ChartConfig

export function ProgressChart({
  completedLessons,
  remainingLessons,
  completedHours,
  remainingHours,
}: ProgressChartProps) {
  const chartData = [
    {
      metric: 'Lessons',
      completed: completedLessons,
      remaining: remainingLessons,
    },
    {
      metric: 'Hours',
      completed: completedHours,
      remaining: remainingHours,
    },
  ]

  return (
    <ChartContainer
      config={chartConfig}
      className='h-72 w-full'
      aria-label='Completed and remaining lessons and hours'
    >
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey='metric'
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar
          dataKey='completed'
          stackId='course'
          fill='var(--color-completed)'
          radius={[4, 0, 0, 4]}
          isAnimationActive={false}
        />
        <Bar
          dataKey='remaining'
          stackId='course'
          fill='var(--color-remaining)'
          radius={[0, 4, 4, 0]}
          isAnimationActive={false}
        />
        <ChartLegend content={<ChartLegendContent />} />
      </BarChart>
    </ChartContainer>
  )
}
