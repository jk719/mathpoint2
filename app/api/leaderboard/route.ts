import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Mock leaderboard data for demo
  const mockLeaderboard = [
    { rank: 1, userId: 'user1', userName: 'Alex M.', points: 2500, streak: 7, badges: 5 },
    { rank: 2, userId: 'user2', userName: 'Sarah K.', points: 2100, streak: 5, badges: 3 },
    { rank: 3, userId: 'user3', userName: 'Mike R.', points: 1800, streak: 3, badges: 4 },
  ];

  return NextResponse.json({
    success: true,
    data: {
      timeframe: 'weekly',
      entries: mockLeaderboard,
    }
  });
}