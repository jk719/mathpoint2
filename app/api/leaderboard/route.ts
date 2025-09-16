import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database/queries';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const timeframeParam = searchParams.get('timeframe') || 'weekly';

    const validTimeframes = ['daily', 'weekly', 'monthly', 'all-time'] as const;
    type ValidTimeframe = typeof validTimeframes[number];

    if (!validTimeframes.includes(timeframeParam as ValidTimeframe)) {
      return NextResponse.json(
        { success: false, error: 'Invalid timeframe' },
        { status: 400 }
      );
    }

    const timeframe = timeframeParam as ValidTimeframe;
    const leaderboard = await db.gamification.getLeaderboard(timeframe);

    return NextResponse.json({
      success: true,
      data: {
        timeframe,
        entries: leaderboard,
      }
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}