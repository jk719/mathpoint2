import { z } from 'zod';

export const answerSchema = z.object({
  questionId: z.string().min(1, 'Question ID is required'),
  answer: z.union([z.string(), z.array(z.string())]),
  timeSpent: z.number().min(0).max(3600),
  attemptNumber: z.number().min(1).max(10),
  confidence: z.number().min(0).max(100).optional(),
});

export const startDiagnosticSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
});

export const submitAnswerSchema = z.object({
  sessionId: z.string().min(1, 'Session ID is required'),
  response: answerSchema,
});

export const userProfileSchema = z.object({
  gradeLevel: z.number().min(1).max(12).optional(),
  learningGoals: z.array(z.string()).optional(),
  preferredDifficulty: z.enum(['easy', 'medium', 'hard']).optional(),
  weeklyGoalMinutes: z.number().min(15).max(600).optional(),
  timezone: z.string().optional(),
});

export const createUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

export const practiceConfigSchema = z.object({
  conceptIds: z.array(z.string()).min(1, 'Select at least one concept'),
  difficulty: z.enum(['easy', 'medium', 'hard', 'mixed']),
  problemCount: z.number().min(1).max(20),
});

export type AnswerInput = z.infer<typeof answerSchema>;
export type StartDiagnosticInput = z.infer<typeof startDiagnosticSchema>;
export type SubmitAnswerInput = z.infer<typeof submitAnswerSchema>;
export type UserProfileInput = z.infer<typeof userProfileSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type PracticeConfigInput = z.infer<typeof practiceConfigSchema>;