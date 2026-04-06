# MVP Direction: Read-Only Course Progress Dashboard

## Summary

Build a small, read-only Next.js dashboard centered on one question: "How far through the course are we today?"

The app should stay server-rendered by default, read only from `src/data/lessons.json`, and focus on three surfaces:

- a compact progress overview
- one strong chart plus progress bars
- a chronological lesson timeline with clear status colors

This keeps the product useful for you and classmates without turning it into a planner, calendar clone, or user-account app.

## Product Shape

- App type: public, read-only progress dashboard
- Primary audience: you and classmates checking current course status from the current date
- Core value: instant visibility into completion percentage, hours done, lessons done, remaining work, and the next lesson
- Explicitly out for MVP:
  - authentication
  - personal progress overrides
  - editing data in the UI
  - attendance tracking
  - full month calendar
  - notifications
  - backend/database

## MVP Features

- Top summary section:
  - course title
  - current date / "last synced" timestamp
  - total lessons
  - completed lessons
  - remaining lessons
  - completed hours
  - remaining hours
  - completion percentage
- Progress section:
  - one main progress bar for total completion
  - one secondary split for hours completed vs remaining
- Next lesson card:
  - title
  - formatted date
  - start/end time
  - relative label such as "next up"
- Chart section:
  - one chart only for MVP
  - recommended chart: completed vs remaining lessons and hours in a compact radial/donut or stacked bar presentation
  - keep the chart explanatory, not decorative
- Timeline section:
  - chronological lesson list grouped by month
  - each lesson shows title, date, weekday, and duration
  - status styles:
    - completed: muted or green-accented with subdued text
    - next lesson: emphasized/highlighted
    - upcoming: neutral/blue-accented
  - no pagination for MVP; 60 items is small enough to render directly

## Recommended Technical Approach

- Rendering model:
  - keep `src/app/page.tsx` as a Server Component
  - read `src/data/lessons.json` on the server
  - compute all derived stats on the server in a small utility module
  - use client components only where required by the chart library and theme toggle
- Domain structure:
  - `src/lib/lessons.ts`: load lessons and compute derived stats
  - `src/lib/date.ts` only if formatting starts to repeat; otherwise keep formatting close to usage
  - no global state library
- Derived data to compute:
  - `totalLessons`
  - `completedLessons`
  - `remainingLessons`
  - `totalHours`
  - `completedHours`
  - `remainingHours`
  - `progressPercent`
  - `nextLesson`
  - timeline items with `status: completed | next | upcoming`
  - optional monthly grouping for the timeline
- Date logic:
  - completed lesson: `end < now`
  - next lesson: first lesson with `start > now`
  - remaining lesson: `start > now`
  - use `Europe/Rome` consistently for display and weekday formatting

## Library Choices

- Keep:
  - `Next.js` App Router
  - `Tailwind CSS v4`
- Add for MVP:
  - `shadcn/ui` for cards, badges, progress, separators, scroll-area if needed, and chart primitives
  - `next-themes` for a dark mode toggle in the header
  - `lucide-react` for lightweight iconography
  - `recharts@^3` through shadcn chart patterns for the single infographic chart
- Do not add for MVP:
  - calendar libraries
  - state management libraries
  - data fetching libraries
  - animation libraries unless the base UI feels clearly too static
- Date utilities:
  - default to the built-in `Intl` APIs first to stay minimal
  - only add `date-fns` later if formatting/grouping becomes repetitive enough to justify it

## UI Structure

- Page shell:
  - simple centered container
  - dashboard header with title, short description, and a dark mode toggle
- First row:
  - 4 compact stat cards for lessons and hours
- Second row:
  - wide completion card with progress bar and percentage
  - next lesson card
- Third row:
  - one chart card titled around course progress
- Fourth row:
  - timeline card with lessons grouped by month
- Visual direction:
  - clean, editorial dashboard rather than admin SaaS
  - support both light and dark mode from the start
  - strong spacing, clear typography, restrained color coding
  - status colors should communicate meaning, not decoration

## Acceptance Criteria

- The homepage renders fully from `lessons.json` with no runtime fetching
- All metrics match the source lessons for the current date
- The next lesson is correct
- Completed, next, and upcoming lesson states are visually distinct
- The chart and progress bars agree with the stat cards
- The app remains understandable without any interaction or onboarding
- The dark mode toggle works correctly without hydration issues

## Assumptions

- The app remains read-only for MVP
- One shared "course progress as of now" view is the correct product, not per-user tracking
- The schedule should be a timeline, not a calendar
- One chart is enough for v1; more charts can be added later if they reveal something genuinely useful
- This file will be used as the starting point for the build checklist / kanban board and updated as implementation progresses

## References

- shadcn/ui dark mode for Next.js:
  - [https://ui.shadcn.com/docs/dark-mode/next](https://ui.shadcn.com/docs/dark-mode/next)
- shadcn/ui chart component:
  - [https://ui.shadcn.com/docs/components/radix/chart](https://ui.shadcn.com/docs/components/radix/chart)
