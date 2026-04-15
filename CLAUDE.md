# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Premier Education** — An SAT Math platform that diagnoses student weaknesses at an unprecedented level of detail.

### How It Works
1. Student takes a 10-15 minute adaptive diagnostic
2. System identifies exactly which micro-skills they're missing — using Bayesian Knowledge Tracing, a knowledge graph, and fluency analysis
3. Student sees a clear skill checklist showing strengths and weaknesses
4. Student practices with adaptive questions targeting their specific gaps — mastery updates in real time
5. Tutors run live sessions with video + Excalidraw whiteboard, assign homework, and answer student questions

### The Insight
SAT difficulty isn't about harder math — it's about cognitive approach. Hard questions reward pattern recognition over computation. The platform teaches students to see what the SAT is actually testing.

### Current Status
- Demo topic: Percents (18 skills, ~125 questions)
- Full adaptive diagnostic → results → practice flow working end-to-end
- Live sessions with Excalidraw whiteboard + LiveKit video/audio
- AI tutor lessons via Claude API (streaming, bilingual EN/ZH)
- 4 role-based dashboards (Student, Tutor, Parent, Admin) with mock data
- Assignments/homework/Q&A system (UI complete, no persistence)
- All data is mock — Prisma schema defined but not connected

### Tech Stack
- Next.js 15 with App Router
- PostgreSQL + Prisma ORM (production) / Mock data (demo)
- Tailwind CSS v4, Radix UI, shadcn/ui
- KaTeX for LaTeX math rendering
- Zustand for state, Framer Motion for animations
- Bayesian Knowledge Tracing + Knowledge Graph for skill mastery estimation
- Excalidraw for collaborative whiteboard
- LiveKit for video/audio sessions
- Claude API for AI tutoring

## Common Commands

```bash
npm run dev          # Start development server on http://localhost:3000
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint (no directory arg needed)
npx tsc              # Run TypeScript type checking
```

### Database (when using PostgreSQL - currently using mock)
```bash
npx prisma generate         # Generate Prisma client
npx prisma migrate dev      # Run database migrations
npx prisma studio           # Open Prisma Studio GUI
npm run db:seed              # Seed skills/topics/patterns
npm run db:seed-questions    # Seed questions from data files
npm run db:reset             # Reset database and re-migrate
```

### Testing
E2E tests use Playwright (run from project root):
```bash
npx playwright test              # Run all E2E tests
npx playwright test test-demo.js # Run a single test file
```

## Architecture

### Core Systems

**Adaptive Engine** (`lib/adaptive/`):
- `BayesianKT.ts`: Bayesian Knowledge Tracing — updates skill mastery probabilities using Bayes' rule with slip/guess/learn parameters. Supports mastery update callbacks for knowledge graph propagation.
- `ItemSelector.ts`: Adaptive item selection using Expected Information Gain (EIG) and 3-parameter IRT model. Scores combine EIG, difficulty match, diversity, recency, and fluency. Supports `targetSkills` filtering for practice mode.
- `KnowledgeGraph.ts`: Models prerequisite relationships between skills. Propagates mastery beliefs across connected skills (downward if hard mastered → infer easy; upward if easy failed → penalize hard; lateral for same-difficulty correlation). Max 2-hop BFS with exponential decay.
- `ResponseTimeModel.ts`: Tracks response times per skill using log-normal distribution. Classifies fluency as AUTOMATED (fast+correct), COMPUTED (correct but slow), STRUGGLING (slow+wrong), or GUESSING (fast+wrong). Used by ItemSelector to prioritize "computed" skills for teaching.
- `SessionStore.ts`: Session management for diagnostic sessions

**Diagnostic Scoring** (`lib/diagnostic/`):
- `DiagnosticScorer.ts`: Scores questions, skills, sections, and full diagnostics. Generates practice sequences ordered by prerequisite dependencies (topological sort) and accuracy.
- `ResponseQualityChecker.ts`: Detects gaming — rushed responses (<5s), guessing (below per-question time thresholds), spam patterns (4+ same answer), and low engagement (5+ fast wrong answers). Responses are classified as VALID, RUSHED, GUESSING, SPAM_PATTERN, or LOW_ENGAGEMENT. Only VALID responses count toward mastery.

**State Management** (`lib/stores/`):
- `diagnosticStore.ts`: Zustand store for diagnostic sessions. Initializes BKT, ItemSelector, KnowledgeGraph, and ResponseTimeModel. Orchestrates question selection → answer → mastery update → next question loop. Persists to sessionStorage.
- `practiceStore.ts`: Zustand store for practice sessions. Same adaptive engine as diagnostic but filtered to target skill + same-topic skills. Stops at 85% mastery or 10 questions. Tracks before/after mastery for results.
- `authStore.ts`: Simple role-based auth (student/parent/tutor/admin) via sessionStorage.

**Math Input System** (`lib/math-input/`):
- `MathParser.ts`: Parses and validates mathematical expressions
- Supports LaTeX rendering via KaTeX

**Live Sessions** (`app/session/`, `components/session/`):
- LiveKit integration for video/audio with role-based tokens (tutor gets room admin)
- Excalidraw whiteboard with real-time sync via LiveKit data channels (throttled at 100ms, echo prevention via senderId)
- Session chat via data channels
- Dynamic import for Excalidraw (SSR disabled)

**Assignments System** (`components/assignments/`, `components/questions/`):
- `AssignmentCard.tsx`: Displays assignments with due dates, linked skills, submission status
- `CreateAssignmentForm.tsx`: Tutors create and assign homework to students
- `SubmitHomeworkForm.tsx`: Students submit answers
- `QuestionThread.tsx`: Student-tutor Q&A threads
- All data currently mock (`data/mock-assignments.ts`)

### Data Architecture

**Skills** (`data/demo-skills.ts`): 18 skills organized by topic → pattern → variant → difficulty. Each skill has a `displayName` shown to students. Currently covers Percents topic.

**Questions** (`data/demo-questions.ts`): ~125 questions linked to skills via `skillId`. Each question has choices (A, B, C, D), `correctAnswer`, and optional `collegeBoardId`.

**Skill Prerequisites** (`data/skill-prerequisites.ts`): Auto-generates difficulty progression edges from skill data (Easy → Medium → Hard within same pattern). Used by KnowledgeGraph for belief propagation and DiagnosticScorer for practice sequence ordering.

### Type System (`types/sat.ts`)

```typescript
type SATSkill = {
  id: string
  topic: string          // "Percents"
  pattern: string        // "Finding a Percent"
  variant: string        // "Find percent of a whole number"
  difficulty: "Easy" | "Medium" | "Hard"
  displayName: string    // "Finding a Percent of a Number"
}

type SATQuestion = {
  id: string
  skillId: string
  questionText: string
  choices: { label: string, text: string }[]
  correctAnswer: string  // "A", "B", "C", or "D"
  collegeBoardId?: string
}
```

**Additional Types:**
- `types/adaptive.ts`: Knowledge graph edges, skill nodes, propagation results, fluency levels, time model state
- `types/assignments.ts`: Assignment, Submission, StudentQuestion types

**API Layer** (`lib/api/createHandler.ts`): Wrapper for API routes with Zod validation and optional auth. Returns standardized `{success, data}` or `{success, error}` responses.

**Database Abstraction** (`lib/database/queries.ts`): All DB access goes through `db.*` methods. Currently returns mock data — swap to Prisma client for production.

### App Flow
Landing (`/`) → Diagnostic (`/diagnostic`) → Results (`/results`) → Practice (`/practice?skill=skillId`) → Dashboard (`/dashboard`)

Practice flow: Select skill → adaptive questions → mastery updates in real time → completion screen with before/after comparison

### Conventions
- Path alias: `@/*` maps to project root (e.g., `import { cn } from '@/lib/utils/cn'`)
- All pages are client components (`'use client'`) — no server actions yet
- Brand: "Premier Education" — logo shows PREM(IER) in orange + EDUCATION in gray
- Brand colors: primary `#1a3a52` (navy), accent `#ff6b35` (orange) — defined in `lib/theme/colors.ts`
- UI components use shadcn/ui pattern in `components/ui/`
- Bilingual: English + Mandarin Chinese (`lib/i18n/translations.ts`)

## Adding SAT Questions

To add questions, populate the arrays in:
1. `data/demo-skills.ts` - Add skill definitions
2. `data/demo-questions.ts` - Add questions linked to skills

### LaTeX in Questions

**Critical: Escape backslashes in TypeScript strings.**

| Math | In TypeScript |
|------|---------------|
| `\frac{3}{4}` | `\\frac{3}{4}` |
| `x^2` | `x^2` (no escaping needed) |
| `\sqrt{x}` | `\\sqrt{x}` |
| `1,000` with proper spacing | `1{,}000` |

Example question:
```typescript
{
  id: 'q1',
  skillId: 'linear-eq-perp-lines-nonstandard',
  questionText: 'Line $k$ is defined by $3x + 4y = 12$. Which equation defines a line perpendicular to line $k$?',
  choices: [
    { label: 'A', text: '$y = -\\frac{3}{4}x + 5$' },
    { label: 'B', text: '$y = \\frac{3}{4}x + 5$' },
    { label: 'C', text: '$y = -\\frac{4}{3}x + 5$' },
    { label: 'D', text: '$y = \\frac{4}{3}x + 5$' },
  ],
  correctAnswer: 'D',
  collegeBoardId: 'db422e7f',
}
```

## Deployment

The application is configured for demo deployment without a database:
- Mock data implementation allows deployment without PostgreSQL
- To switch to production: Replace mock implementation in `lib/database/queries.ts` with Prisma client
