import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database/queries';

export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get('x-user-id');
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID required' },
        { status: 400 }
      );
    }

    const progress = await db.progress.get(userId);
    if (!progress) {
      return NextResponse.json(
        { success: false, error: 'Progress not found' },
        { status: 404 }
      );
    }

    const badges = await db.gamification.getUserBadges(userId);
    const recentSessions = await db.diagnostic.getUserSessions(userId, 5);

    return NextResponse.json({
      success: true,
      data: {
        progress,
        badges,
        recentSessions,
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