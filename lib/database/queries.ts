import { prisma } from './prisma';
import {
  DiagnosticSession,
  FinalDiagnosis,
  StudentResponse,
  DiagnosticQuestion,
  User,
  UserProgress,
  Badge,
  PointsTransactionType,
} from '@/types';

export const db = {
  user: {
    async create(data: { email: string; name: string }) {
      return await prisma.user.create({
        data: {
          ...data,
          profile: { create: {} },
          subscription: { create: {} },
          progress: { create: {} },
        },
        include: {
          profile: true,
          subscription: true,
          progress: true,
        },
      });
    },

    async findByEmail(email: string) {
      return await prisma.user.findUnique({
        where: { email },
        include: {
          profile: true,
          subscription: true,
          progress: true,
        },
      });
    },

    async updateProfile(userId: string, data: any) {
      return await prisma.userProfile.update({
        where: { userId },
        data,
      });
    },
  },

  diagnostic: {
    async createSession(userId: string, initialQuestion: DiagnosticQuestion) {
      return await prisma.diagnosticSession.create({
        data: {
          userId,
          questionsAsked: [initialQuestion],
          responses: [],
          currentPath: ['main'],
        },
      });
    },

    async updateSession(
      sessionId: string,
      data: {
        questionsAsked?: DiagnosticQuestion[];
        responses?: StudentResponse[];
        currentPath?: string[];
        isComplete?: boolean;
        endTime?: Date;
        finalDiagnosis?: FinalDiagnosis;
      }
    ) {
      return await prisma.diagnosticSession.update({
        where: { id: sessionId },
        data: {
          questionsAsked: data.questionsAsked as any,
          responses: data.responses as any,
          currentPath: data.currentPath,
          isComplete: data.isComplete,
          endTime: data.endTime,
          finalDiagnosis: data.finalDiagnosis as any,
        },
      });
    },

    async getSession(sessionId: string) {
      return await prisma.diagnosticSession.findUnique({
        where: { id: sessionId },
        include: { user: true },
      });
    },

    async getUserSessions(userId: string, limit = 10) {
      return await prisma.diagnosticSession.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: limit,
      });
    },

    async getCompletedCount(userId: string) {
      return await prisma.diagnosticSession.count({
        where: { userId, isComplete: true },
      });
    },
  },

  progress: {
    async get(userId: string) {
      return await prisma.userProgress.findUnique({
        where: { userId },
        include: { conceptMastery: true },
      });
    },

    async updateConceptMastery(
      userId: string,
      conceptId: string,
      data: {
        conceptName: string;
        conceptCategory: string;
        masteryLevel: number;
        accuracy: number;
      }
    ) {
      const progress = await prisma.userProgress.findUnique({
        where: { userId },
      });

      if (!progress) return null;

      return await prisma.conceptMastery.upsert({
        where: {
          progressId_conceptId: {
            progressId: progress.id,
            conceptId,
          },
        },
        update: {
          masteryLevel: data.masteryLevel,
          accuracy: data.accuracy,
          lastPracticed: new Date(),
        },
        create: {
          progressId: progress.id,
          conceptId,
          conceptName: data.conceptName,
          conceptCategory: data.conceptCategory,
          masteryLevel: data.masteryLevel,
          accuracy: data.accuracy,
        },
      });
    },

    async incrementStreak(userId: string) {
      const progress = await prisma.userProgress.findUnique({
        where: { userId },
      });

      if (!progress) return null;

      const lastActivity = progress.lastActivityDate;
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      let newStreak = 1;
      if (lastActivity) {
        const lastDate = new Date(lastActivity);
        lastDate.setHours(0, 0, 0, 0);
        const daysDiff = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

        if (daysDiff === 0) {
          return progress;
        } else if (daysDiff === 1) {
          newStreak = progress.currentStreak + 1;
        }
      }

      return await prisma.userProgress.update({
        where: { userId },
        data: {
          currentStreak: newStreak,
          longestStreak: Math.max(newStreak, progress.longestStreak),
          lastActivityDate: new Date(),
        },
      });
    },

    async addPoints(
      userId: string,
      points: number,
      type: PointsTransactionType,
      description: string
    ) {
      const [transaction, progress] = await prisma.$transaction([
        prisma.pointsTransaction.create({
          data: {
            userId,
            points,
            type,
            description,
          },
        }),
        prisma.userProgress.update({
          where: { userId },
          data: {
            totalPoints: { increment: points },
          },
        }),
      ]);

      return { transaction, progress };
    },
  },

  gamification: {
    async getBadges() {
      return await prisma.badge.findMany({
        orderBy: { points: 'desc' },
      });
    },

    async getUserBadges(userId: string) {
      return await prisma.userBadge.findMany({
        where: { userId },
        include: { badge: true },
        orderBy: { earnedAt: 'desc' },
      });
    },

    async awardBadge(userId: string, badgeId: string) {
      return await prisma.userBadge.create({
        data: {
          userId,
          badgeId,
        },
        include: { badge: true },
      });
    },

    async markBadgesAsViewed(userId: string) {
      return await prisma.userBadge.updateMany({
        where: { userId, isNew: true },
        data: { isNew: false },
      });
    },

    async getLeaderboard(timeframe: 'daily' | 'weekly' | 'monthly' | 'all-time') {
      const dateFilter = this.getDateFilter(timeframe);

      const topUsers = await prisma.pointsTransaction.groupBy({
        by: ['userId'],
        where: dateFilter ? { createdAt: { gte: dateFilter } } : {},
        _sum: { points: true },
        orderBy: { _sum: { points: 'desc' } },
        take: 100,
      });

      const userIds = topUsers.map(u => u.userId);
      const users = await prisma.user.findMany({
        where: { id: { in: userIds } },
        include: {
          progress: true,
          badges: true,
        },
      });

      const userMap = new Map(users.map(u => [u.id, u]));

      return topUsers.map((entry, index) => {
        const user = userMap.get(entry.userId);
        return {
          rank: index + 1,
          userId: entry.userId,
          userName: user?.name || 'Unknown',
          points: entry._sum.points || 0,
          streak: user?.progress?.currentStreak || 0,
          badges: user?.badges?.length || 0,
        };
      });
    },

    getDateFilter(timeframe: string): Date | null {
      const now = new Date();
      switch (timeframe) {
        case 'daily':
          return new Date(now.setHours(0, 0, 0, 0));
        case 'weekly':
          return new Date(now.setDate(now.getDate() - 7));
        case 'monthly':
          return new Date(now.setMonth(now.getMonth() - 1));
        default:
          return null;
      }
    },
  },
};