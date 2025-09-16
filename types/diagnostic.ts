export type QuestionType = 'multiple-choice' | 'open-ended' | 'multi-select';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type Branch = 'A' | 'B' | 'C' | 'D' | 'main';
export type ConceptCategory = 'factoring' | 'quadratic-formula' | 'verification' | 'arithmetic' | 'algebra-basics';

export interface Concept {
  id: string;
  name: string;
  category: ConceptCategory;
  description: string;
}

export interface DiagnosticQuestion {
  id: string;
  content: string;
  type: QuestionType;
  branch: Branch;
  difficulty: Difficulty;
  conceptsTested: Concept[];
  options?: string[];
  correctAnswer?: string | string[];
  hint?: string;
  explanation?: string;
  nextQuestionRules: BranchingRule[];
}

export interface BranchingRule {
  condition: ResponseCondition;
  nextQuestionId: string | null;
  diagnosis?: PartialDiagnosis;
}

export interface ResponseCondition {
  type: 'correct' | 'incorrect' | 'partial' | 'no-attempt' | 'specific-error';
  errorType?: ErrorType;
}

export type ErrorType =
  | 'sign-error'
  | 'arithmetic-error'
  | 'factor-pair-error'
  | 'foil-error'
  | 'formula-application'
  | 'coefficient-identification'
  | 'discriminant-calculation'
  | 'zero-product-property'
  | 'substitution-error';

export interface StudentResponse {
  questionId: string;
  answer: string | string[];
  timeSpent: number;
  attemptNumber: number;
  confidence?: number;
}

export interface PartialDiagnosis {
  strengths: Concept[];
  weaknesses: Concept[];
  errorPatterns: ErrorType[];
  confidence: number;
}

export interface DiagnosticSession {
  id: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  questionsAsked: DiagnosticQuestion[];
  responses: StudentResponse[];
  currentPath: Branch[];
  isComplete: boolean;
  finalDiagnosis?: FinalDiagnosis;
}

export interface FinalDiagnosis {
  sessionId: string;
  overallLevel: 'beginner' | 'intermediate' | 'advanced';
  strengths: {
    concept: Concept;
    confidence: number;
  }[];
  weaknesses: {
    concept: Concept;
    confidence: number;
    suggestedPractice: string[];
  }[];
  errorPatterns: {
    type: ErrorType;
    frequency: number;
    examples: string[];
  }[];
  recommendedPath: string;
  estimatedTimeToMastery: number;
  detailedSummary: string;
}

export interface DiagnosticState {
  session: DiagnosticSession | null;
  currentQuestion: DiagnosticQuestion | null;
  questionHistory: DiagnosticQuestion[];
  responseHistory: StudentResponse[];
  diagnosis: PartialDiagnosis;
  isLoading: boolean;
  error: string | null;
}