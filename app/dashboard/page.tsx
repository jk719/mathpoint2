import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PointsDisplay } from '@/components/gamification/PointsDisplay';
import { StreakCounter } from '@/components/gamification/StreakCounter';
import { BadgeDisplay } from '@/components/gamification/BadgeDisplay';
import { badgeData } from '@/data/badges';
import { TrendingUp, Target, BookOpen, Award } from 'lucide-react';

export default function DashboardPage() {
  const mockUserBadges = [
    {
      id: '1',
      userId: 'user1',
      badgeId: 'diagnostic-pioneer',
      badge: badgeData.find(b => b.id === 'diagnostic-pioneer')!,
      earnedAt: new Date('2024-01-15'),
      isNew: false,
    },
    {
      id: '2',
      userId: 'user1',
      badgeId: 'streak-bronze',
      badge: badgeData.find(b => b.id === 'streak-bronze')!,
      earnedAt: new Date('2024-01-20'),
      isNew: true,
    },
  ];

  const mockTransactions = [
    {
      id: '1',
      userId: 'user1',
      points: 50,
      type: 'diagnostic-complete' as const,
      description: 'Completed diagnostic assessment',
      createdAt: new Date('2024-01-20'),
    },
    {
      id: '2',
      userId: 'user1',
      points: 25,
      type: 'streak-bonus' as const,
      description: '3-day streak bonus',
      createdAt: new Date('2024-01-19'),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Track your progress and achievements</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-1">
            <PointsDisplay
              totalPoints={750}
              recentTransactions={mockTransactions}
              showRecent={true}
            />
          </div>

          <div className="lg:col-span-1">
            <StreakCounter
              currentStreak={5}
              longestStreak={12}
              lastActivityDate={new Date()}
            />
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#ff6b35]" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="gradient" className="w-full">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Take Diagnostic
                </Button>
                <Button variant="outline" className="w-full">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Get AI Tutoring
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Concept Mastery</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-green-800">Factoring</h3>
                      <p className="text-sm text-green-600">Strong understanding</p>
                    </div>
                    <div className="text-2xl font-bold text-green-700">85%</div>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-yellow-800">Quadratic Formula</h3>
                      <p className="text-sm text-yellow-600">Needs practice</p>
                    </div>
                    <div className="text-2xl font-bold text-yellow-700">65%</div>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-orange-800">Verification</h3>
                      <p className="text-sm text-orange-600">Good progress</p>
                    </div>
                    <div className="text-2xl font-bold text-orange-700">78%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Recent Badges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockUserBadges.map((userBadge) => (
                    <BadgeDisplay
                      key={userBadge.id}
                      badge={userBadge.badge}
                      userBadge={userBadge}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}