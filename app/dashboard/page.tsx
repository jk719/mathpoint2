'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { TrendingUp, Target, BookOpen, Award, ArrowRight, Flame } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();

  // Mock SAT skill mastery data
  const mockSkillMastery = [
    { skill: 'Linear Equations', topic: 'Algebra', mastery: 85 },
    { skill: 'Quadratic Functions', topic: 'Advanced Math', mastery: 65 },
    { skill: 'Perpendicular Lines', topic: 'Algebra', mastery: 45 },
    { skill: 'Data Analysis', topic: 'Problem Solving', mastery: 78 },
  ];

  const getMasteryColor = (mastery: number) => {
    if (mastery >= 80) return 'text-[#1a3a52] bg-[#1a3a52]/10';
    if (mastery >= 60) return 'text-[#1a3a52] bg-[#1a3a52]/10';
    if (mastery >= 40) return 'text-[#ff6b35] bg-[#ff6b35]/10';
    return 'text-[#ff6b35] bg-[#ff6b35]/10';
  };

  const getProgressColor = (mastery: number) => {
    if (mastery >= 80) return 'bg-[#1a3a52]';
    if (mastery >= 60) return 'bg-[#1a3a52]/70';
    if (mastery >= 40) return 'bg-[#ff6b35]/70';
    return 'bg-[#ff6b35]';
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 sm:py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Track your SAT Math progress</p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#1a3a52]/10 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-[#1a3a52]" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">750</div>
                <div className="text-sm text-gray-500">Points</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Flame className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">5</div>
                <div className="text-sm text-gray-500">Day Streak</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#ff6b35]/10 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-[#ff6b35]" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">4</div>
                <div className="text-sm text-gray-500">Skills Practiced</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Skill Mastery - Takes 2 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Skill Mastery</h2>
              <button
                onClick={() => router.push('/practice')}
                className="text-sm text-[#ff6b35] hover:underline flex items-center gap-1"
              >
                View All <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {mockSkillMastery.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900 truncate">{item.skill}</span>
                        <span className="text-xs text-gray-500">{item.topic}</span>
                      </div>
                      <span className={`text-sm font-semibold px-2 py-0.5 rounded ${getMasteryColor(item.mastery)}`}>
                        {item.mastery}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className={`h-full rounded-full ${getProgressColor(item.mastery)}`}
                        style={{ width: `${item.mastery}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-6">Quick Actions</h2>

            <div className="space-y-3">
              <button
                onClick={() => router.push('/diagnostic')}
                className="w-full py-3 px-4 bg-[#ff6b35] text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-[#e55a2a] transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                Take Diagnostic
              </button>

              <button
                onClick={() => router.push('/practice')}
                className="w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
              >
                <TrendingUp className="w-4 h-4" />
                Practice Weak Skills
              </button>
            </div>
          </motion.div>
        </div>

        {/* No Results Yet Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-white rounded-xl shadow-sm p-8 text-center"
        >
          <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Diagnostic Results Yet</h3>
          <p className="text-gray-500 mb-6">
            Take the diagnostic to see your personalized skill breakdown
          </p>
          <button
            onClick={() => router.push('/diagnostic')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Start Diagnostic
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
