# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MathPoint is an adaptive math diagnostics application built with Next.js 15, focusing on quadratic equations. It features an intelligent diagnostic engine that adapts questions based on student responses, gamification elements, and currently uses a mock database implementation for demo deployment (can be switched to PostgreSQL via Prisma ORM for production).

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
node test-demo.js      # Test demo page with Playwright
node test-diagnostic.js # Test diagnostic page
```

### Database (when using PostgreSQL - currently using mock)
```bash
npx prisma generate  # Generate Prisma client
npx prisma migrate dev  # Run database migrations
npx prisma studio    # Open Prisma Studio GUI
```

## Architecture

### Core Systems

**Diagnostic Engine** (`lib/diagnostic-engine/`)
- `DiagnosticEngine.ts`: Main orchestrator for diagnostic sessions
- `DecisionTree.ts`: Manages adaptive branching logic based on responses
- `ResponseAnalyzer.ts`: Analyzes student answers and identifies error patterns
- `DiagnosisGenerator.ts`: Creates comprehensive learning reports
- `index.ts`: Central export point for all diagnostic components

**Adaptive Branching Logic**
- Initial question: "Solve x² - 3x - 10 = 0 and verify one solution"
- Branch A: Factoring errors → Tests factor pairs, FOIL understanding
- Branch B: Quadratic formula errors → Tests coefficient identification, discriminant
- Branch C: Method correct but errors → Tests zero product property, substitution
- Branch D: No attempt → Tests basic equation solving confidence
- Questions adapt based on responses, 4-7 questions maximum per session

**Key Data Flow**
1. User starts diagnostic → Creates session with mock/real database
2. DiagnosticEngine generates questions from `data/questionBank.ts`
3. ResponseAnalyzer identifies error patterns and concept mastery
4. DecisionTree determines next question based on branching rules
5. DiagnosisGenerator creates detailed report with specific recommendations

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
- `/diagnostic/start-mock`: Initiates diagnostic with mock data (current)
- `/diagnostic/submit-mock`: Processes answers with mock backend (current)
- `/user/progress`: Returns mock/real user progress
- `/leaderboard`: Returns mock/real leaderboard data

### Component Structure
- `components/ui/`: Shadcn/ui components (Button, Card, Dialog, Progress, Input, Label, Badge, Skeleton, TypeWriter, MathTypeWriter)
- `components/diagnostic/`: DiagnosticFlow, QuestionCard, DiagnosisDisplay
- `components/gamification/`: PointsDisplay, BadgeDisplay, StreakCounter
- `components/layout/`: PageLayout, Header

### Type System
All diagnostic types are centralized in `types/diagnostic.ts`, including:
- Question types: 'multiple-choice' | 'open-ended' | 'multi-select'
- Difficulty levels: 'easy' | 'medium' | 'hard'
- Branch types: 'A' | 'B' | 'C' | 'D' | 'main'
- Concept categories: 'factoring' | 'quadratic-formula' | 'verification' | 'arithmetic' | 'algebra-basics'
- Error types: sign-error, arithmetic-error, factor-pair-error, foil-error, formula-application, etc.
- Core interfaces: DiagnosticQuestion, StudentResponse, BranchingRule, PartialDiagnosis, FinalDiagnosis

### Gamification System
- Points: +50 for completing diagnostics, +10 for practice problems
- Badges: Defined in `data/badges.ts` with requirements and rarity levels
- BadgeEngine (`lib/gamification/BadgeEngine.ts`): Awards badges based on progress
- Leaderboard: Shows top performers with points, streaks, and badge counts

### Question Bank (`data/questionBank.ts`)
- 30+ diagnostic questions organized by branch (A, B, C, D, main)
- Each question includes: content, type, difficulty, concepts tested, correct answer
- Branching rules define next question based on response analysis
- Questions test multiple concepts simultaneously for efficient diagnosis

## Deployment

The application is configured for demo deployment without a database:
- GitHub Actions workflow (`.github/workflows/deploy.yml`) for CI/CD
- Mock data implementation allows deployment without PostgreSQL
- To switch to production database: Replace mock implementation in `lib/database/queries.ts` with Prisma client

## Key Technologies

- **Framework**: Next.js 15 with App Router
- **Database**: Mock implementation (demo) / PostgreSQL + Prisma ORM (production)
- **Styling**: Tailwind CSS v4
- **Math Rendering**: KaTeX for LaTeX equations
- **UI Components**: Radix UI primitives with shadcn/ui
- **Forms**: React Hook Form + Zod validation
- **State**: Zustand for client state management
- **Testing**: Playwright for E2E tests
- **Animations**: Framer Motion
- **Utilities**: clsx, tailwind-merge, class-variance-authority