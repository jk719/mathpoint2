import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Mock progress data for demo
  const mockProgress = {
    currentStreak: 5,
    totalPoints: 1250,
    diagnosticsCompleted: 3,
    conceptMastery: [
      { conceptId: 'quadratic-formula', masteryLevel: 85 },
      { conceptId: 'factoring', masteryLevel: 70 },
    ]
  };

  const mockBadges = [
    { id: 'first-diagnostic', name: 'First Steps', earnedAt: new Date() },
    { id: 'streak-3', name: '3-Day Streak', earnedAt: new Date() },
  ];

  const mockSessions = [
    { id: 'session1', completedAt: new Date(), score: 85 },
    { id: 'session2', completedAt: new Date(), score: 78 },
  ];

  return NextResponse.json({
    success: true,
    data: {
      progress: mockProgress,
      badges: mockBadges,
      recentSessions: mockSessions,
    }
  });
}