'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PointsTransaction } from '@/types';
import { Star, TrendingUp, Award } from 'lucide-react';

interface PointsDisplayProps {
  totalPoints: number;
  recentTransactions?: PointsTransaction[];
  showRecent?: boolean;
}

export function PointsDisplay({
  totalPoints,
  recentTransactions = [],
  showRecent = false
}: PointsDisplayProps) {
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'diagnostic-complete':
        return '🎯';
      case 'problem-solved':
        return '✅';
      case 'streak-bonus':
        return '🔥';
      case 'badge-earned':
        return '🏆';
      case 'perfect-score':
        return '⭐';
      default:
        return '📈';
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-br from-[#1a3a52] to-[#0f2436] text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6" />
              <span className="font-semibold">Total Points</span>
            </div>
            <TrendingUp className="w-5 h-5" />
          </div>

          <motion.div
            key={totalPoints}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="text-4xl font-bold mb-2"
          >
            {formatNumber(totalPoints)}
          </motion.div>

          <div className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            <span className="text-sm opacity-90">
              {totalPoints >= 1000 ? 'Expert Level' :
               totalPoints >= 500 ? 'Advanced Level' :
               totalPoints >= 100 ? 'Intermediate Level' : 'Beginner Level'}
            </span>
          </div>
        </CardContent>
      </Card>

      {showRecent && recentTransactions.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-sm mb-3 text-gray-700">Recent Activity</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              <AnimatePresence>
                {recentTransactions.slice(0, 5).map((transaction, index) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getTransactionIcon(transaction.type)}</span>
                      <div>
                        <p className="text-sm font-medium">{transaction.description}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(transaction.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={transaction.points > 0 ? 'success' : 'secondary'}
                      className="text-xs"
                    >
                      {transaction.points > 0 ? '+' : ''}{transaction.points}
                    </Badge>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}