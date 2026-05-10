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

- None currently

## Backlog

- None currently

## Blocked

- None currently

## Done

### T01 - Install MVP UI dependencies

Completed: shadcn/ui initialized, `next-themes` and `lucide-react` installed, and chart dependencies added.

### T02 - Update app metadata and base shell

Completed: app metadata updated, centered shell established, layout components extracted, and footer added.

### T03 - Add theme provider and dark mode toggle

Completed: theme provider, dark mode toggle, and dark mode-ready shell styling added without hydration issues.

### T04 - Create lesson stats utility

Completed: added a server-side lesson stats utility with a pure stats function, a JSON-backed helper, and verified totals against the current lesson dataset.

### T05 - Add lesson timeline status helpers

Completed: split lesson domain code into `src/lib/lessons/`, added timeline status helpers and month grouping, and verified timeline statuses and grouping against the current dataset.

### T06 - Add minimal display formatting helpers

Completed: added Rome-local lesson date, month, time range, and duration formatters using built-in `Intl` APIs with no new dependency.

### T07 - Build homepage server data flow

Completed: homepage remains a Server Component, reads local `lessons.json`, opts into request-time rendering for `new Date()`, and derives stats/timeline data without client-side fetching.

### T08 - Add dashboard layout sections

Completed: homepage now has dedicated summary, progress, next lesson, chart, and timeline sections with stacked mobile and multi-section desktop layouts.

### T09 - Add summary stat cards

Completed: added compact stat cards for total lessons, completed lessons/hours, remaining lessons/hours, and total hours using derived stats.

### T10 - Add progress card

Completed: added a prominent completion percentage, accessible progress bar, and completed-vs-remaining hours split.

### T11 - Add next lesson card

Completed: added an emphasized next lesson card with title, Rome-local date, time range, and duration.

### T12 - Add the single MVP chart

Completed: added one shadcn/Recharts stacked bar chart for completed vs remaining lessons and hours, including a visible legend.

### T13 - Add chronological lesson timeline

Completed: added a month-grouped lesson timeline with completed, next, and upcoming status styling plus date, time, and duration.

### T14 - Refine responsive layout and visual hierarchy

Completed: tightened page spacing, verified mobile/desktop screenshots, and kept section hierarchy readable in light and dark modes.

### T15 - Verify dashboard correctness against source data

Completed: verified source-derived metrics, next lesson, timeline statuses, and chart inputs against `src/data/lessons.json` for May 10, 2026.

### T16 - Final MVP cleanup

Completed: removed placeholder homepage content, finalized metadata/viewport theme colors, fixed small UI cleanup items, and confirmed lint, TypeScript, production build, and Playwright checks.

## Later

### L01 - Add in-progress lesson support once the first dashboard UI is stable

### L02 - Add more charts if the first chart proves useful

### L03 - Add filtering or collapsing to the timeline if the lesson list becomes harder to scan

### L04 - Add a visible "last synced" data timestamp if the raw sync time becomes important to users

### L05 - Add per-lesson detail views only if the homepage becomes too dense
