'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Flame, Calendar } from 'lucide-react';

interface StreakCounterProps {
  currentStreak: number;
  longestStreak: number;
  lastActivityDate?: Date;
}

export function StreakCounter({
  currentStreak,
  longestStreak,
  lastActivityDate
}: StreakCounterProps) {
  const getStreakColor = (streak: number) => {
    if (streak >= 30) return 'text-red-500';
    if (streak >= 7) return 'text-orange-500';
    if (streak >= 3) return 'text-yellow-500';
    return 'text-gray-400';
  };

  const getStreakMessage = (streak: number) => {
    if (streak === 0) return 'Start your streak today!';
    if (streak === 1) return 'Great start!';
    if (streak < 7) return 'Keep it up!';
    if (streak < 30) return 'You\'re on fire!';
    return 'Legendary streak!';
  };

  const isToday = lastActivityDate &&
    new Date().toDateString() === new Date(lastActivityDate).toDateString();

  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Flame className={`w-6 h-6 ${getStreakColor(currentStreak)}`} />
            <span className="font-semibold text-gray-700">Practice Streak</span>
          </div>
          {isToday && (
            <Badge variant="success" className="text-xs">
              Active Today
            </Badge>
          )}
        </div>

        <div className="text-center mb-4">
          <motion.div
            key={currentStreak}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className={`text-4xl font-bold ${getStreakColor(currentStreak)}`}
          >
            {currentStreak}
          </motion.div>
          <p className="text-sm text-gray-600">{getStreakMessage(currentStreak)}</p>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>Longest: {longestStreak} days</span>
          </div>
          {lastActivityDate && (
            <span>
              Last: {new Date(lastActivityDate).toLocaleDateString()}
            </span>
          )}
        </div>

        <div className="mt-4 flex justify-center">
          <div className="flex gap-1">
            {Array.from({ length: Math.min(currentStreak, 7) }, (_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`w-2 h-2 rounded-full ${getStreakColor(currentStreak)} bg-current`}
              />
            ))}
            {currentStreak > 7 && (
              <span className="text-xs text-gray-500 ml-1">+{currentStreak - 7}</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}