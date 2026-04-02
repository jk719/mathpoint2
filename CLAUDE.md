# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**mathpoint.io** — An SAT Math platform that diagnoses student weaknesses at an unprecedented level of detail.

### How It Works
1. Student takes a 15-20 minute adaptive diagnostic
2. System identifies exactly which micro-skills they're missing — across 19 topics and ~2,000+ questions, all personally analyzed and tagged by pattern, variant, and difficulty
3. Student sees a clear skill checklist showing strengths and weaknesses
4. System prescribes a practice sequence — ordered by skill dependencies and SAT point recovery potential
5. Student practices with adaptive questions targeting their specific gaps

### The Insight
SAT difficulty isn't about harder math — it's about cognitive approach. Hard questions reward pattern recognition over computation. The platform teaches students to see what the SAT is actually testing.

### Current Status
- 3 topics complete (~125 questions imported)
- 16 topics remaining (~1,600+ questions)
- Platform structure built, diagnostic UI exists

### Tech Stack
- Next.js 15 with App Router
- PostgreSQL + Prisma ORM (production) / Mock data (demo)
- Tailwind CSS v4, Radix UI, shadcn/ui
- KaTeX for LaTeX math rendering
- Zustand for state, Framer Motion for animations
- Bayesian Knowledge Tracing for skill mastery estimation

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
- `BayesianKT.ts`: Bayesian Knowledge Tracing — updates skill mastery probabilities based on student responses using Bayes' rule with slip/guess/learn parameters
- `ItemSelector.ts`: Adaptive item selection using Expected Information Gain (EIG) and 3-parameter IRT model — selects questions that maximize uncertainty reduction
- `SessionStore.ts`: Session management for diagnostic sessions

**Diagnostic Scoring** (`lib/diagnostic/`):
- `DiagnosticScorer.ts`: Scores questions, skills, sections, and full diagnostics. Generates practice sequences ordered by difficulty and accuracy.
- `ResponseQualityChecker.ts`: Detects gaming — rushed responses (<5s), guessing (below per-question time thresholds), spam patterns (4+ same answer), and low engagement (5+ fast wrong answers). Responses are classified as VALID, RUSHED, GUESSING, SPAM_PATTERN, or LOW_ENGAGEMENT. Only VALID responses count toward mastery.

**Math Input System** (`lib/math-input/`):
- `MathParser.ts`: Parses and validates mathematical expressions
- Supports LaTeX rendering via KaTeX

### Data Architecture

**Skills** (`data/sat-skills.ts`): Organized by topic → pattern → variant → difficulty. Each skill has a `displayName` shown to students.

**Questions** (`data/sat-questions.ts`): Linked to skills via `skillId`. Each question has choices (A, B, C, D), `correctAnswer`, and optional `collegeBoardId`.

### Type System (`types/sat.ts`)

```typescript
type SATSkill = {
  id: string
  topic: string          // "Linear Equations Two Variables"
  pattern: string        // "Perpendicular Lines"
  variant: string        // "From non-standard form"
  difficulty: "Easy" | "Medium" | "Hard"
  displayName: string    // "Perpendicular Lines — Advanced"
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

**API Layer** (`lib/api/createHandler.ts`): Wrapper for API routes with Zod validation and optional auth. Returns standardized `{success, data}` or `{success, error}` responses.

**Database Abstraction** (`lib/database/queries.ts`): All DB access goes through `db.*` methods. Currently returns mock data — swap to Prisma client for production.

### App Flow
Landing (`/`) → Diagnostic (`/diagnostic`) → Results → Practice (`/practice`) → Dashboard (`/dashboard`)

### Conventions
- Path alias: `@/*` maps to project root (e.g., `import { cn } from '@/lib/utils/cn'`)
- All pages are client components (`'use client'`) — no server actions yet
- Brand colors: primary `#1a3a52` (navy), accent `#ff6b35` (orange) — defined in `lib/theme/colors.ts`
- UI components use shadcn/ui pattern in `components/ui/`

## Adding SAT Questions

To add questions, populate the arrays in:
1. `data/sat-skills.ts` - Add skill definitions
2. `data/sat-questions.ts` - Add questions linked to skills

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
