// SAT Math types
export * from './sat';

// User and gamification types
export * from './user';
export * from './gamification';

// Legacy diagnostic question type for QuestionCard component
export interface DiagnosticQuestion {
  id: string;
  type: 'multiple-choice' | 'multi-select' | 'open-ended';
  difficulty: string;
  branch: string;
  content: string;
  options?: string[];
  hint?: string;
}