import { NextRequest } from 'next/server';
import { createHandler, ApiResponse } from '@/lib/api/createHandler';
import { db } from '@/lib/database/queries';

export const GET = createHandler(
  async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const timeframe = searchParams.get('timeframe') as any || 'weekly';

    const validTimeframes = ['daily', 'weekly', 'monthly', 'all-time'];
    if (!validTimeframes.includes(timeframe)) {
      return ApiResponse.error('Invalid timeframe', 400);
    }

    const leaderboard = await db.gamification.getLeaderboard(timeframe);

    return ApiResponse.success({
      timeframe,
      entries: leaderboard,
    });
  }
);