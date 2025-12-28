// SAT Math Skill-based Types

export type SATDifficulty = 'Easy' | 'Medium' | 'Hard';

export interface SATSkill {
  id: string;
  topic: string; // e.g., "Linear Equations Two Variables"
  pattern: string; // e.g., "Perpendicular Lines"
  variant: string; // e.g., "From non-standard form"
  difficulty: SATDifficulty;
  displayName: string; // What students see: "Perpendicular Lines — Advanced"
}

export interface SATChoice {
  label: string; // "A", "B", "C", "D"
  text: string;
}

export interface SATQuestion {
  id: string;
  skillId: string;
  questionText: string;
  choices: SATChoice[];
  correctAnswer: string; // "A", "B", "C", or "D"
  collegeBoardId?: string; // 8-char ID like "db422e7f"
  explanation?: string;
}

// Session types for SAT diagnostic
export interface SATDiagnosticSession {
  id: string;
  userId: string;
  startedAt: Date;
  completedAt?: Date;
  questions: SATSessionQuestion[];
  skillMastery: SATSkillMastery[];
}

export interface SATSessionQuestion {
  questionId: string;
  skillId: string;
  selectedAnswer: string | null;
  isCorrect: boolean | null;
  timeSpentMs: number;
  confidence: number | null;
}

export interface SATSkillMastery {
  skillId: string;
  masteryLevel: number; // 0-1 probability
  questionsAttempted: number;
  questionsCorrect: number;
}

// Report types
export interface SATDiagnosticReport {
  sessionId: string;
  totalQuestions: number;
  correctCount: number;
  accuracy: number;
  avgConfidence: number;
  totalTimeMs: number;
  skillBreakdown: SATSkillBreakdown[];
  strengths: SATSkillSummary[];
  weaknesses: SATSkillSummary[];
  recommendations: string[];
}

export interface SATSkillBreakdown {
  skillId: string;
  skillDisplayName: string;
  topic: string;
  questionsAttempted: number;
  questionsCorrect: number;
  mastery: number;
}

export interface SATSkillSummary {
  skillId: string;
  displayName: string;
  topic: string;
  mastery: number;
}

// API response types
export interface StartSATDiagnosticResponse {
  sessionId: string;
  firstQuestion: SATQuestion;
  totalQuestions: number;
}

export interface SubmitSATAnswerResponse {
  isCorrect: boolean;
  feedback?: string;
  nextQuestion?: SATQuestion;
  isComplete: boolean;
  report?: SATDiagnosticReport;
  questionsRemaining: number;
}
