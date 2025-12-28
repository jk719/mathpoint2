# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MathPoint is an adaptive SAT Math diagnostics application built with Next.js 15. It features a skill-based assessment system that identifies specific SAT Math skills students need to work on, with Bayesian Knowledge Tracing for skill mastery estimation.

The application uses gamification elements, mock database for demo deployment, and can switch to PostgreSQL via Prisma ORM for production.

## Common Commands

### Development
```bash
npm run dev          # Start development server on http://localhost:3000
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npx tsc             # Run TypeScript type checking
```

### Database (when using PostgreSQL - currently using mock)
```bash
npx prisma generate    # Generate Prisma client
npx prisma migrate dev # Run database migrations
npx prisma studio      # Open Prisma Studio GUI
```

## Architecture

### Core Systems

**Adaptive Engine** (`lib/adaptive/`)
- `BayesianKT.ts`: Bayesian Knowledge Tracing for skill mastery estimation
- `ItemSelector.ts`: Adaptive item selection using IRT and CAT algorithms
- `SessionStore.ts`: Session management for diagnostic sessions

**Math Input System** (`lib/math-input/`)
- `MathParser.ts`: Parses and validates mathematical expressions
- Supports LaTeX rendering via KaTeX

### Data Architecture

**SAT Math Skills** (`data/sat-skills.ts`):
- Skills are organized by topic, pattern, variant, and difficulty
- Each skill has a displayName shown to students
- Skills will be populated as questions are imported

**SAT Math Questions** (`data/sat-questions.ts`):
- Questions are linked to skills via skillId
- Each question has choices (A, B, C, D) and a correctAnswer
- Optional collegeBoardId for College Board question mapping

### Type System (`types/`)

**SAT Types** (`types/sat.ts`):
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

### Navigation & Routing

**App Flow**: Landing → Diagnostic → Results → Practice → Dashboard

**Routes**:
- `/` → Landing page with SAT Math focus
- `/diagnostic` → SAT Math diagnostic assessment
- `/practice` → Targeted skill practice
- `/dashboard` → Progress tracking and skill mastery

### Component Structure
- `components/ui/`: Shadcn/ui components (Button, Card, Progress, etc.)
- `components/diagnostic/`: QuestionCard for displaying questions
- `components/math-input/`: MathKeyboard, MathInput, MathPreview
- `components/gamification/`: PointsDisplay, BadgeDisplay, StreakCounter
- `components/layout/`: PageLayout, Header

### Gamification System
- Points: Earned for completing diagnostics and practice
- Badges: Defined in `data/badges.ts` with requirements and rarity levels
- BadgeEngine (`lib/gamification/BadgeEngine.ts`): Awards badges based on progress
- Streaks: Track consecutive days of practice

## Adding SAT Questions

To add questions, populate the arrays in:
1. `data/sat-skills.ts` - Add skill definitions
2. `data/sat-questions.ts` - Add questions linked to skills

Example skill:
```typescript
{
  id: 'linear-eq-perp-lines-nonstandard',
  topic: 'Linear Equations Two Variables',
  pattern: 'Perpendicular Lines',
  variant: 'From non-standard form',
  difficulty: 'Hard',
  displayName: 'Perpendicular Lines — Advanced',
}
```

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
- To switch to production database: Replace mock implementation in `lib/database/queries.ts` with Prisma client

## Key Technologies

- **Framework**: Next.js 15 with App Router
- **Database**: Mock implementation (demo) / PostgreSQL + Prisma ORM (production)
- **Styling**: Tailwind CSS v4
- **Math**: KaTeX for LaTeX equations
- **UI Components**: Radix UI primitives with shadcn/ui
- **State**: Zustand for client state management
- **Animations**: Framer Motion
