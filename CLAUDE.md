# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MathPoint is an adaptive math diagnostics application built with Next.js 15, focusing on quadratic equations. It features an intelligent diagnostic engine that adapts questions based on student responses, gamification elements, and a PostgreSQL database via Prisma ORM.

## Common Commands

### Development
```bash
npm run dev          # Start development server on http://localhost:3000
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npx tsc             # Run TypeScript type checking
```

### Database
```bash
npx prisma generate  # Generate Prisma client
npx prisma migrate dev  # Run database migrations
npx prisma studio    # Open Prisma Studio GUI
```

### Testing
```bash
node test-demo.js      # Test demo page with Playwright
node test-diagnostic.js # Test diagnostic page
node visual-test.js    # Run visual regression tests
```

## Architecture

### Core Systems

**Diagnostic Engine** (`lib/diagnostic-engine/`)
- `DiagnosticEngine.ts`: Main orchestrator for diagnostic sessions
- `DecisionTree.ts`: Manages adaptive branching logic based on responses
- `ResponseAnalyzer.ts`: Analyzes student answers and identifies error patterns
- `DiagnosisGenerator.ts`: Creates comprehensive learning reports
- `index.ts`: Central export point for all diagnostic components

**Key Data Flow**
1. User starts diagnostic session → API creates session in database
2. DiagnosticEngine generates questions based on DecisionTree branches
3. ResponseAnalyzer processes answers, identifying strengths/weaknesses
4. Engine adapts next question based on analysis
5. DiagnosisGenerator creates final report with learning recommendations

### Database Schema

The application uses PostgreSQL with Prisma ORM. Key models:
- `User`: Core user accounts with related profiles and progress
- `DiagnosticSession`: Stores complete diagnostic test data (questions, responses, paths as JSON)
- `UserProgress`: Tracks learning metrics and concept mastery
- `ConceptMastery`: Granular tracking of math concept understanding
- Gamification: `Badge`, `UserBadge`, `PointsTransaction` for engagement

### API Routes (`app/api/`)
- `/diagnostic/start`: Initiates new diagnostic session
- `/diagnostic/submit`: Processes answers and returns next question
- `/diagnostic/start-mock` & `/diagnostic/submit-mock`: Mock endpoints for testing
- `/user/progress`: Retrieves user progress data
- `/leaderboard`: Fetches gamification leaderboard

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

### Supporting Libraries (`lib/`)
- `database/`: Prisma client instance and database queries
- `utils/`: Common utilities including constants and cn helper
- `validation/`: Zod schemas for form validation
- `api/`: API route handler utilities
- `hooks/`: Custom React hooks (useDiagnostic)
- `gamification/`: BadgeEngine for achievement system
- `theme/`: Color constants and theming

## Key Technologies

- **Framework**: Next.js 15 with App Router
- **Database**: PostgreSQL + Prisma ORM
- **Styling**: Tailwind CSS v4
- **Math Rendering**: KaTeX for LaTeX equations
- **UI Components**: Radix UI primitives with shadcn/ui
- **Forms**: React Hook Form + Zod validation
- **State**: Zustand for client state management
- **Testing**: Playwright for E2E tests
- **Animations**: Framer Motion
- **Utilities**: clsx, tailwind-merge, class-variance-authority