export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  subscription: Subscription;
  profile: UserProfile;
}

export interface UserProfile {
  id: string;
  userId: string;
  gradeLevel?: number;
  learningGoals?: string[];
  preferredDifficulty?: 'easy' | 'medium' | 'hard';
  weeklyGoalMinutes?: number;
  timezone?: string;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: 'free' | 'premium' | 'pro';
  status: 'active' | 'canceled' | 'past_due';
  currentPeriodEnd?: Date;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
}

export interface UserProgress {
  id: string;
  userId: string;
  totalPoints: number;
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: Date;
  conceptMastery: ConceptMastery[];
  completedDiagnostics: number;
  practiceProblemsCompleted: number;
  totalTimeSpent: number;
}

export interface ConceptMastery {
  conceptId: string;
  masteryLevel: number;
  lastPracticed: Date;
  problemsSolved: number;
  accuracy: number;
  averageTime: number;
}