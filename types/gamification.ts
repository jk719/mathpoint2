export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: BadgeCategory;
  requirement: BadgeRequirement;
  points: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export type BadgeCategory =
  | 'mastery'
  | 'streak'
  | 'speed'
  | 'accuracy'
  | 'exploration'
  | 'milestone';

export interface BadgeRequirement {
  type: 'concept-mastery' | 'streak-days' | 'problems-solved' | 'accuracy-rate' | 'diagnostic-complete';
  value: number;
  conceptId?: string;
}

export interface UserBadge {
  id: string;
  userId: string;
  badgeId: string;
  badge: Badge;
  earnedAt: Date;
  isNew: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  points: number;
  icon: string;
  progress: number;
  total: number;
  isCompleted: boolean;
  completedAt?: Date;
}

export interface PointsTransaction {
  id: string;
  userId: string;
  points: number;
  type: PointsTransactionType;
  description: string;
  createdAt: Date;
}

export type PointsTransactionType =
  | 'diagnostic-complete'
  | 'problem-solved'
  | 'streak-bonus'
  | 'badge-earned'
  | 'achievement-unlocked'
  | 'daily-login'
  | 'perfect-score';

export interface GamificationState {
  userPoints: number;
  userBadges: UserBadge[];
  achievements: Achievement[];
  currentStreak: number;
  recentTransactions: PointsTransaction[];
}