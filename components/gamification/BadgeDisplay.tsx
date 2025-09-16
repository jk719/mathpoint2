'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Badge as UIBadge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { Progress } from '@/components/ui/Progress';
import { Badge, UserBadge } from '@/types';

interface BadgeDisplayProps {
  badge: Badge;
  userBadge?: UserBadge;
  progress?: number;
  showProgress?: boolean;
}

export function BadgeDisplay({
  badge,
  userBadge,
  progress = 0,
  showProgress = false
}: BadgeDisplayProps) {
  const isEarned = !!userBadge;

  const rarityColors = {
    common: 'from-gray-400 to-gray-600',
    rare: 'from-blue-400 to-blue-600',
    epic: 'from-purple-400 to-purple-600',
    legendary: 'from-yellow-400 to-orange-500',
  };

  const rarityTextColors = {
    common: 'text-gray-600',
    rare: 'text-blue-600',
    epic: 'text-purple-600',
    legendary: 'text-orange-600',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Card className={`relative overflow-hidden ${isEarned ? 'ring-2 ring-yellow-400' : 'opacity-70'}`}>
        {isEarned && (
          <div className="absolute top-2 right-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          </div>
        )}

        <CardContent className="p-4 text-center">
          <div className="relative mb-3">
            <div
              className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${rarityColors[badge.rarity]}
                          flex items-center justify-center text-2xl ${isEarned ? '' : 'grayscale'}`}
            >
              {badge.icon}
            </div>

            {userBadge?.isNew && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
              >
                <span className="text-white text-xs font-bold">!</span>
              </motion.div>
            )}
          </div>

          <h3 className="font-semibold text-sm mb-1">{badge.name}</h3>
          <p className="text-xs text-gray-600 mb-2">{badge.description}</p>

          <div className="flex justify-center gap-1 mb-2">
            <UIBadge variant="outline" className={rarityTextColors[badge.rarity]}>
              {badge.rarity}
            </UIBadge>
            <UIBadge variant="secondary">
              {badge.points}pts
            </UIBadge>
          </div>

          {showProgress && !isEarned && progress > 0 && (
            <div className="mt-3">
              <Progress value={progress} className="h-2" variant="gradient" />
              <p className="text-xs text-gray-500 mt-1">{Math.round(progress)}% complete</p>
            </div>
          )}

          {userBadge?.earnedAt && (
            <p className="text-xs text-gray-500 mt-2">
              Earned {new Date(userBadge.earnedAt).toLocaleDateString()}
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}