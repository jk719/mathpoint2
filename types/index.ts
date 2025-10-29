// Minimal type definition for shared QuestionCard component
export interface DiagnosticQuestion {
  id: string;
  content: string;
  type: 'multiple-choice' | 'open-ended' | 'multi-select';
  options?: string[];
  hint?: string;
  difficulty?: string;
  branch?: string;
}

export * from './user';
export * from './gamification';