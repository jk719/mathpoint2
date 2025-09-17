// Mock implementation for demo deployment
const mockUser = { id: 'demo-user', name: 'Demo User', email: 'demo@example.com' };
const mockProgress = {
  currentStreak: 5,
  totalPoints: 1250,
  diagnosticsCompleted: 3,
  completedDiagnostics: 3,
  practiceProblemsCompleted: 15,
  conceptMastery: []
};
const mockBadges: unknown[] = [];
const mockSessions: unknown[] = [];

export const db = {
  user: {
    async create(data: { email: string; name: string }) {
      return Promise.resolve({ ...mockUser, ...data });
    },

    async findByEmail(_email: string) {
      return Promise.resolve(mockUser);
    },

    async updateProfile(userId: string, data: Record<string, unknown>) {
      return Promise.resolve({ ...mockUser, ...data });
    },
  },

  diagnostic: {
    async createSession(data: { userId: string }) {
      return Promise.resolve({
        id: `session_${Date.now()}_demo`,
        userId: data.userId,
        startTime: new Date(),
        questionsAsked: [],
        responses: [],
        currentPath: ['main'],
        isComplete: false,
      });
    },

    async getSession(sessionId: string) {
      return Promise.resolve({
        id: sessionId,
        userId: 'demo-user',
        startTime: new Date(),
        questionsAsked: [],
        responses: [],
        currentPath: ['main'],
        isComplete: false,
        endTime: null,
        finalDiagnosis: null,
      });
    },

    async updateSession(sessionId: string, data: Record<string, unknown>) {
      return Promise.resolve({ id: sessionId, ...data });
    },

    async getUserSessions(_userId: string, _limit: number) {
      return Promise.resolve(mockSessions);
    },
  },

  progress: {
    async get(_userId: string) {
      return Promise.resolve(mockProgress);
    },

    async addPoints(userId: string, points: number, type: string, description: string) {
      return Promise.resolve({ id: 'transaction_1', userId, points, type, description });
    },

    async updateConceptMastery(userId: string, conceptId: string, masteryLevel: number) {
      return Promise.resolve({ userId, conceptId, masteryLevel });
    },
  },

  gamification: {
    async getLeaderboard(_timeframe: string) {
      return Promise.resolve([
        { rank: 1, userId: 'user1', userName: 'Alex M.', points: 2500, streak: 7, badges: 5 },
        { rank: 2, userId: 'user2', userName: 'Sarah K.', points: 2100, streak: 5, badges: 3 },
        { rank: 3, userId: 'user3', userName: 'Mike R.', points: 1800, streak: 3, badges: 4 },
      ]);
    },

    async getUserBadges(_userId: string) {
      return Promise.resolve(mockBadges);
    },

    async awardBadge(userId: string, badgeId: string) {
      return Promise.resolve({ userId, badgeId, earnedAt: new Date() });
    },
  },
};