# MVP Implementation Tracker

This file is the working implementation board for the MVP.

Use it to track what gets built next, what is currently in progress, what is blocked, and what is already done. `docs/MVP_PLAN.md` remains the high-level product direction document. This file is the step-by-step execution tracker.

This file must be updated whenever the active task changes status.

## Workflow

- `Backlog`: planned work not started yet
- `In Progress`: the current task being implemented
- `Blocked`: work that cannot continue until a dependency is completed
- `Done`: completed work that passed its acceptance checks
- `Later`: good ideas intentionally deferred beyond the MVP

## Working Agreement

- Keep only one feature task in `In Progress` at a time unless tasks are clearly independent.
- Move tasks across sections instead of duplicating them.
- Add a short completion note when a task moves to `Done`.
- Keep `Done` entries compressed to the task title plus a short completion note.
- Keep `Done` entries ordered by task number in ascending order.
- Keep tasks feature-sized. Each task should have a clear goal and acceptance criteria that can be objectively verified.
- Use acceptance criteria as the definition of done.

## Recommended Build Order

1. Setup the UI/tooling baseline
2. Build the lesson/domain utility layer
3. Build the server-rendered homepage data flow
4. Implement dashboard sections in order of value
5. Polish responsiveness and verify correctness

## In Progress

### T04 - Create lesson stats utility

Goal: Build a minimal server-side utility that reads `src/data/lessons.json` and computes the core dashboard metrics.

Acceptance:

- total lessons is computed correctly
- completed lessons is computed correctly
- remaining lessons is computed correctly
- total, completed, and remaining hours are computed correctly
- progress percentage is computed correctly
- next lesson is derived correctly

Depends on:

- none

## Backlog

### T05 - Add lesson timeline status helpers

Goal: Derive timeline-ready lesson items with display status and grouping information.

Acceptance:

- each lesson has a status of `completed`, `next`, or `upcoming`
- lessons can be grouped by month for rendering
- grouping and status logic use `Europe/Rome`

Depends on:

- T04

### T06 - Add minimal display formatting helpers

Goal: Add lightweight formatting helpers only where repeated formatting would otherwise become noisy.

Acceptance:

- lesson dates render in a clear Rome-local format
- lesson durations render cleanly
- no unnecessary date library is introduced unless repetition clearly justifies it

Depends on:

- T04

### T07 - Build homepage server data flow

Goal: Keep the homepage server-rendered and load all dashboard data from `lessons.json`.

Acceptance:

- `src/app/page.tsx` remains a Server Component
- dashboard data is loaded without client-side fetching
- the page can render from derived lesson data alone

Depends on:

- T04

### T08 - Add dashboard layout sections

Goal: Create the structural layout of the homepage before final UI polish.

Acceptance:

- the page has dedicated sections for stats, progress, next lesson, chart, and timeline
- layout works as a readable stacked mobile page and multi-section desktop page

Depends on:

- T07

### T09 - Add summary stat cards

Goal: Show the key metrics at the top of the page.

Acceptance:

- lessons and hours metrics are visible at a glance
- card labels are unambiguous
- values match the derived stats utility

Depends on:

- T08

### T10 - Add progress card

Goal: Visualize overall course completion with one strong progress surface.

Acceptance:

- overall completion percentage is prominent
- progress bar reflects the correct percentage
- hours completed vs remaining are visually understandable

Depends on:

- T08

### T11 - Add next lesson card

Goal: Make the next scheduled lesson immediately visible.

Acceptance:

- next lesson title is shown clearly
- date and time are formatted clearly
- the card visually stands out from the rest of the summary area

Depends on:

- T08

### T12 - Add the single MVP chart

Goal: Add one chart that supports the dashboard without overwhelming it.

Acceptance:

- chart uses shadcn chart patterns and Recharts v3
- chart data matches the stat cards
- chart remains understandable in both light and dark mode

Depends on:

- T01
- T04
- T08

### T13 - Add chronological lesson timeline

Goal: Show the full course schedule as a readable timeline instead of a calendar.

Acceptance:

- lessons are grouped chronologically by month
- completed lessons are visually muted or green-accented
- the next lesson is highlighted
- upcoming lessons use a distinct non-completed style
- each lesson shows title, date, weekday, and duration

Depends on:

- T05
- T06
- T08

### T14 - Refine responsive layout and visual hierarchy

Goal: Make the dashboard feel coherent and polished on both mobile and desktop.

Acceptance:

- no section feels cramped or awkward on mobile
- desktop layout has clear hierarchy and spacing
- typography and color usage feel consistent across the page

Depends on:

- T09
- T10
- T11
- T12
- T13

### T15 - Verify dashboard correctness against source data

Goal: Confirm that the rendered dashboard is correct relative to `src/data/lessons.json`.

Acceptance:

- metric totals match the lesson data
- progress percentage is correct
- next lesson is correct for the current date
- timeline statuses are correct
- chart values match the summary cards

Depends on:

- T09
- T10
- T11
- T12
- T13

### T16 - Final MVP cleanup

Goal: Remove placeholders and leave the MVP in a coherent, ship-ready state.

Acceptance:

- default placeholder text is gone
- metadata is finalized
- the page feels complete without obvious rough edges

Depends on:

- T14
- T15

## Blocked

- None currently

## Done

### T01 - Install MVP UI dependencies

Completed: shadcn/ui initialized, `next-themes` and `lucide-react` installed, and chart dependencies added.

### T02 - Update app metadata and base shell

Completed: app metadata updated, centered shell established, layout components extracted, and footer added.

### T03 - Add theme provider and dark mode toggle

Completed: theme provider, dark mode toggle, and dark mode-ready shell styling added without hydration issues.

## Later

### L01 - Add more charts if the first chart proves useful

### L02 - Add filtering or collapsing to the timeline if the lesson list becomes harder to scan

### L03 - Add a visible "last synced" data timestamp if the raw sync time becomes important to users

### L04 - Add per-lesson detail views only if the homepage becomes too dense
