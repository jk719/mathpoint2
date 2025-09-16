import { NextRequest } from 'next/server';
import { createHandler, ApiResponse } from '@/lib/api/createHandler';
import { db } from '@/lib/database/queries';

export const GET = createHandler(
  async (req: NextRequest) => {
    const userId = req.headers.get('x-user-id');
    if (!userId) {
      return ApiResponse.error('User ID required', 400);
    }

    const progress = await db.progress.get(userId);
    if (!progress) {
      return ApiResponse.error('Progress not found', 404);
    }

    const badges = await db.gamification.getUserBadges(userId);
    const recentSessions = await db.diagnostic.getUserSessions(userId, 5);

    return ApiResponse.success({
      progress,
      badges,
      recentSessions,
    });
  }
);