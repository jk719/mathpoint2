'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { TrendingUp, Target, BookOpen, Award, ArrowRight, Flame } from 'lucide-react';
import { useDiagnosticStore } from '@/lib/stores/diagnosticStore';
import { useTranslation } from '@/lib/i18n/LanguageContext';

export default function DashboardPage() {
  const router = useRouter();
  const { diagnosticResult } = useDiagnosticStore();
  const { t } = useTranslation();

  const hasResults = !!diagnosticResult;

  // Derive stats from real results or show defaults
  const points = hasResults ? (diagnosticResult.correctCount ?? 0) * 50 : 0;
  const skillsAssessed = hasResults ? (diagnosticResult.skills?.length ?? 0) : 0;
  const accuracy = hasResults ? Math.round((diagnosticResult.accuracy ?? 0) * 100) : 0;

  const skillMastery = hasResults
    ? (diagnosticResult.skills ?? []).map((s) => ({
        skill: s.displayName,
        topic: s.topic,
        mastery: Math.round(s.accuracy * 100),
      }))
    : [];

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
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{t('dashboard.title')}</h1>
          <p className="text-gray-600">{t('dashboard.subtitle')}</p>
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
                <div className="text-2xl font-bold text-gray-900">{points}</div>
                <div className="text-sm text-gray-500">{t('common.points')}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Flame className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{accuracy}%</div>
                <div className="text-sm text-gray-500">{t('common.accuracy')}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#ff6b35]/10 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-[#ff6b35]" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{skillsAssessed}</div>
                <div className="text-sm text-gray-500">{t('common.skillsAssessed')}</div>
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
              <h2 className="text-lg font-bold text-gray-900">{t('dashboard.skillMastery')}</h2>
              {hasResults && (
                <button
                  onClick={() => router.push('/results')}
                  className="text-sm text-[#ff6b35] hover:underline flex items-center gap-1"
                >
                  {t('dashboard.fullReport')} <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {skillMastery.length > 0 ? (
              <div className="space-y-4">
                {skillMastery.map((item, index) => (
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
            ) : (
              <div className="text-center py-8">
                <TrendingUp className="w-10 h-10 mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500 text-sm">{t('dashboard.emptySkills')}</p>
              </div>
            )}
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-6">{t('dashboard.quickActions')}</h2>

            <div className="space-y-3">
              <button
                onClick={() => router.push('/diagnostic')}
                className="w-full py-3 px-4 bg-[#ff6b35] text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-[#e55a2a] transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                {hasResults ? t('dashboard.retakeDiagnostic') : t('dashboard.takeDiagnostic')}
              </button>

              {hasResults && (
                <>
                  <button
                    onClick={() => router.push('/practice')}
                    className="w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
                  >
                    <TrendingUp className="w-4 h-4" />
                    {t('dashboard.practiceWeak')}
                  </button>
                  <button
                    onClick={() => router.push('/results')}
                    className="w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
                  >
                    <Target className="w-4 h-4" />
                    {t('dashboard.viewFullReport')}
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </div>

        {/* No Results Yet Message (only when no diagnostic done) */}
        {!hasResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 bg-white rounded-xl shadow-sm p-8 text-center"
          >
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('dashboard.noResults')}</h3>
            <p className="text-gray-500 mb-6">
              {t('dashboard.noResultsDesc')}
            </p>
            <button
              onClick={() => router.push('/diagnostic')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              {t('dashboard.startDiagnostic')}
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
