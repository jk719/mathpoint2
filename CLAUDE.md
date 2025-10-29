# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MathPoint is an adaptive math diagnostics application built with Next.js 15. It features an advanced Algebra1 Adaptive Diagnostic system with Bayesian Knowledge Tracing, item response theory, and comprehensive skill mapping across 400+ skills in 11 domains.

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

### Testing
```bash
node test-demo.js                 # Test demo page with Playwright
node test-algebra1-diagnostic.js  # Test algebra1 diagnostic system
node test-algebra1-css.js         # Test algebra1 specific CSS
```

### Database (when using PostgreSQL - currently using mock)
```bash
npx prisma generate    # Generate Prisma client
npx prisma migrate dev # Run database migrations
npx prisma studio      # Open Prisma Studio GUI
```

## Architecture

### Core Systems

**Algebra1 Adaptive Engine** (`lib/adaptive/`)
- `BayesianKT.ts`: Bayesian Knowledge Tracing for skill mastery estimation
- `ItemSelector.ts`: Adaptive item selection using IRT and CAT algorithms
- Uses Item Response Theory (IRT) parameters: discrimination (irtA), difficulty (irtB), guessing (irtC)
- Implements Computerized Adaptive Testing (CAT) for optimal question selection

**Math Input System** (`lib/math-input/`)
- `MathParser.ts`: Parses and validates mathematical expressions
- Supports LaTeX rendering via KaTeX
- Advanced input validation for algebraic expressions
- Virtual math keyboard for equation entry

**Key Data Flow**
1. User starts diagnostic → Creates session with mock/real database
2. Adaptive engine selects optimal items based on current skill estimates
3. Student responses update Bayesian skill probabilities
4. Item selector chooses next question using IRT and information maximization
5. System generates comprehensive diagnostic report with skill mastery levels

### Database Implementation

Currently using **mock database** (`lib/database/queries.ts`) for demo deployment:
- Returns pre-configured demo data
- No persistence between sessions
- Perfect for testing and demonstrations

For production, can switch to PostgreSQL with Prisma ORM:
- Full schema defined in `prisma/schema.prisma`
- Models: User, DiagnosticSession, UserProgress, ConceptMastery, Badge system
- Sessions store complete diagnostic data as JSON

### API Routes (`app/api/`)

**Algebra1 Adaptive System:**
- `/diagnostic/algebra1/start`: Starts adaptive diagnostic session with optional MVP mode
- `/diagnostic/algebra1/submit`: Processes responses with Bayesian updates and MVP support

**Shared Routes:**
- `/user/progress`: Returns mock/real user progress
- `/leaderboard`: Returns mock/real leaderboard data

### Navigation & Routing

**Grade Selection Flow:**
- Homepage (`/`) → Grade selector components
- `/diagnostic?grade=X` → Router page that directs by grade level
  - Grades 8-9 → Redirects to `/algebra1` (Algebra 1 diagnostic available)
  - Other grades → Shows "Coming Soon" page with call-to-action

**Diagnostic Pages:**
- `/algebra1` → Algebra 1 adaptive diagnostic with MVP toggle
- `/demo` → Redirects to `/algebra1` for quick access

### Component Structure
- `components/ui/`: Shadcn/ui components (Button, Card, Dialog, Progress, Input, Label, Badge, Skeleton, TypeWriter, MathTypeWriter)
- `components/diagnostic/`: QuestionCard (shared component for displaying diagnostic questions)
- `components/math-input/`: MathKeyboard, MathInput, MathPreview (for algebra1 system)
- `components/gamification/`: PointsDisplay, BadgeDisplay, StreakCounter
- `components/layout/`: PageLayout, Header
- `components/`: Grade selectors (GradeSelector, GradeSelectorLinks, GradeSelectorSimple)

### Type System

**Algebra1 Adaptive System** (`types/algebra1-diagnostic.ts`):
- Item formats: 'MCQ' | 'NUM' | 'FR' | 'TWO_TIER' | 'ERROR_ANALYSIS' | 'MULTI_STEP' | 'STEP_SELECTION' | 'HYBRID_VERIFY'
- Difficulty levels: 'LOW' | 'MEDIUM' | 'HIGH'
- IRT parameters: discrimination (irtA), difficulty (irtB), guessing (irtC)
- Core interfaces: AlgebraItem, StudentAttempt, AdaptiveDiagnosticSession, DiagnosticReport, SessionConfig
- Skill hierarchy with prerequisites, difficulty estimates, and learning objectives
- SessionConfig includes mvp and demo flags for question set selection

### Gamification System
- Points: +50 for completing diagnostics, +10 for practice problems
- Badges: Defined in `data/badges.ts` with requirements and rarity levels
- BadgeEngine (`lib/gamification/BadgeEngine.ts`): Awards badges based on progress
- Leaderboard: Shows top performers with points, streaks, and badge counts

### Data Architecture

**Algebra1 Adaptive System**:
- `data/algebra1-skills.ts`: Comprehensive skill hierarchy (147 atomic skills across 11 domains)
- `data/algebra1-questions.ts`: Full question bank (27 questions) with IRT parameters and rubrics
- `data/algebra1-mvp-questions.ts`: **MVP question set (15 curated questions)** for school presentations
- `data/algebra1-misconceptions.ts`: Common misconceptions with detection patterns
- `data/algebra1-linear-steps.ts` & `algebra1-quadratic-steps.ts`: Step-by-step solution scaffolding
- `data/algebra1-step-questions.ts`: STEP_SELECTION format questions (check all steps that apply)
- `data/algebra1-hybrid-questions.ts`: HYBRID_VERIFY format questions (answer + process verification)

**Question Bank Details**:
- **Full Bank**: 27 questions across 8 formats covering 9 domains
- **MVP Bank**: 15 curated questions for 10-15 minute diagnostic (optimal for demos)
- All 8 question formats represented in MVP set
- Balanced difficulty: 20% LOW, 40% MEDIUM, 40% HIGH

## Deployment

The application is configured for demo deployment without a database:
- GitHub Actions workflow (`.github/workflows/deploy.yml`) for CI/CD
- Mock data implementation allows deployment without PostgreSQL
- To switch to production database: Replace mock implementation in `lib/database/queries.ts` with Prisma client

## Key Technologies

- **Framework**: Next.js 15 with App Router
- **Database**: Mock implementation (demo) / PostgreSQL + Prisma ORM (production)
- **Styling**: Tailwind CSS v4
- **Math**: KaTeX for LaTeX equations, mathjs for expression parsing
- **UI Components**: Radix UI primitives with shadcn/ui
- **Forms**: React Hook Form + Zod validation
- **State**: Zustand for client state management
- **Testing**: Playwright for E2E tests
- **Animations**: Framer Motion
- **Utilities**: clsx, tailwind-merge, class-variance-authority

## Development Notes

### Algebra1 Adaptive System
The diagnostic system is located in:
- Page routes: `/app/algebra1/` (includes MVP toggle on start screen)
- API routes: `/app/api/diagnostic/algebra1/` (supports MVP mode via config)
- Core engine: `/lib/adaptive/`
- Math input: `/lib/math-input/`
- Types: `/types/algebra1-diagnostic.ts`

**MVP Mode**:
- Toggle enabled on `/algebra1` start screen (default: ON)
- Uses curated 15-question set for school presentations
- API automatically selects question bank based on config.mvp flag
- Estimated time: 10-15 minutes (vs 5-10 for full demo)

### Math Input Components
The system features advanced math input capabilities:
- Virtual math keyboard for equation entry
- Real-time LaTeX preview
- Expression validation and parsing
- Support for complex algebraic notation

### Type Safety
Use comprehensive TypeScript interfaces from `types/algebra1-diagnostic.ts` for all diagnostic work.

### Mock vs Real Database
Currently using mock implementations in `lib/database/queries.ts`. To switch to real PostgreSQL:
1. Replace mock functions with Prisma client calls
2. Run `npx prisma generate` and `npx prisma migrate dev`
3. Update environment variables for database connection