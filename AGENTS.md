# AGENTS.md

## Project Overview

This is a **minimal Next.js app** to track progress for the Master Web Dev course from Boolean:

- Course: **Master Web Dev Part Time**
- Start: **2026-03-17 18:30**
- End: **2026-10-03 13:00**

The app calculates:

- completed lessons
- remaining lessons
- completed hours
- remaining hours
- progress percentage
- next lesson

This is a **small side project**.
**Do not overengineer. Keep everything simple.**

---

## Core Principle

- Prefer **simple, readable solutions**
- Avoid unnecessary abstractions, patterns, or libraries
- No complex architecture, no premature optimization
- This is **not a production SaaS**, just a personal tracker

---

## Data Source

The source of truth is the Boolean calendar:

```text
webcal://flynn.boolean.careers/montessori/api/out/calendar/de740af0-1df5-11f1-b790-a3e68c6f42a1
```

Convert to HTTPS when fetching:

```text
https://flynn.boolean.careers/montessori/api/out/calendar/de740af0-1df5-11f1-b790-a3e68c6f42a1
```

A local snapshot is stored at:

```text
src/data/public-calendar.ics
```

- This file is a **cached copy** of the remote calendar
- It must **not be edited manually**
- It should only be updated via the fetch script

---

## Data Flow

1. A script fetches the calendar (ICS format) from the remote URL
2. The file is saved as `src/data/public-calendar.ics` (raw snapshot)
3. Events are parsed from the ICS file
4. Only valid lessons are kept (see rules below)
5. Output is saved to `src/data/lessons.json`
6. The Next.js app reads `lessons.json` to compute stats of the valid lessons

---

## Data Ownership

- `public-calendar.ics` = raw external data → **read-only**
- `lessons.json` = processed data → safe to regenerate
- Never modify the ICS file directly
- If data looks wrong, fix the parser or refetch — not the source file

---

## Lesson Filtering Rules

A lesson is **tracked** if:

- Title does NOT include `"Tutoraggio"`
- AND:
  - it is on **Tuesday**
  - OR **Thursday**
  - OR **Saturday at 09:00**

Ignore everything else.

---

## Lesson Duration

- Tue/Thu lessons: **2.5 hours**
- Saturday lessons: **4 hours**

Duration should be calculated from start/end timestamps, not hardcoded.

---

## Data Format

Use a simple JSON structure:

```ts
type Lesson = {
  id: string
  title: string
  start: string // ISO
  end: string // ISO
}
```

Do not introduce unnecessary fields.

---

## Sync Strategy

- Data is generated via a script (e.g. `npm run sync-lessons`)
- The app does **NOT** fetch the calendar at runtime
- The app reads from the local JSON file

This keeps the app fast and simple.

---

## What to Avoid

- No Google Calendar API
- No OAuth / API keys
- No database (unless explicitly requested later)
- No over-abstracted layers
- No unnecessary state management libraries

---

## Suggested Structure

```text
src/app
src/lib
src/data/lessons.json
scripts/sync-lessons.ts
```

---

## Responsibilities

### Sync Script

- Fetch calendar
- Parse events
- Filter lessons
- Save JSON

### App

- Read lessons
- Compute stats
- Render UI

---

## Computations

- Completed lesson → `end < now`
- Remaining lesson → `start > now`
- Note: In-progress lessons are intentionally excluded for now and can be added later once the first dashboard UI is in place.

Metrics:

- total lessons
- completed lessons
- remaining lessons
- completed hours
- remaining hours
- progress = completed / total

---

## UI Scope (Minimal)

- Summary stats
- Progress bar
- Next lesson
- Optional lesson list

No complex UI or design system needed.

---

## Notes for Agents

- Keep code short and clear
- Prefer inline logic over premature abstraction
- Avoid adding dependencies unless necessary
- Favor readability over cleverness

---

## Next.js Notes

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->
