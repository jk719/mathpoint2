'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Target, ArrowRight, TrendingUp, BookOpen } from 'lucide-react';
import { useDiagnosticStore } from '@/lib/stores/diagnosticStore';
import { useTranslation } from '@/lib/i18n/LanguageContext';

export default function PracticePage() {
  const router = useRouter();
  const { diagnosticResult } = useDiagnosticStore();
  const { t } = useTranslation();

  const hasResults = !!diagnosticResult;

  // Build skills list from real results or fall back to empty
  const skills = hasResults
    ? [...(diagnosticResult.recommended ?? []), ...(diagnosticResult.weaknesses ?? [])]
        // Deduplicate by skillId
        .filter((s, i, arr) => arr.findIndex((x) => x.skillId === s.skillId) === i)
        .map((s) => ({
          id: s.skillId,
          displayName: s.displayName,
          topic: s.topic,
          mastery: Math.round(s.accuracy * 100),
          status: s.status,
          questionsAttempted: s.questionsAttempted,
        }))
    : [];

  const getMasteryColor = (mastery: number) => {
    if (mastery >= 70) return 'bg-[#1a3a52]';
    if (mastery >= 50) return 'bg-[#1a3a52]/70';
    return 'bg-[#ff6b35]';
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 sm:py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t('practice.title')}
          </h1>
          <p className="text-lg text-gray-600">
            {t('practice.subtitle')}
          </p>
        </motion.div>

        {/* Take Diagnostic Prompt (only when no results) */}
        {!hasResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-8 border-l-4 border-[#ff6b35]"
          >
            <div className="flex items-start gap-4">
              <Target className="w-6 h-6 text-[#ff6b35] flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{t('practice.takeDiagnosticFirst')}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {t('practice.takeDiagnosticDesc')}
                </p>
                <button
                  onClick={() => router.push('/diagnostic')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff6b35] text-white rounded-lg font-medium text-sm hover:bg-[#e55a2a] transition-colors"
                >
                  {t('practice.takeDiagnostic')}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Skills to Practice */}
        {skills.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">{t('practice.skillsToPractice')}</h2>
              <span className="text-sm text-gray-500">
                {t('practice.skillsToImprove').replace('{count}', String(skills.length))}
              </span>
            </div>

            <div className="space-y-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900 truncate">{skill.displayName}</h3>
                        <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full flex-shrink-0">
                          {skill.topic}
                        </span>
                        {skill.status === 'WEAK' && (
                          <span className="text-xs px-2 py-0.5 bg-red-100 text-red-600 rounded-full flex-shrink-0">
                            {t('common.weak')}
                          </span>
                        )}
                        {skill.status === 'DEVELOPING' && (
                          <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-600 rounded-full flex-shrink-0">
                            {t('common.developing')}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1.5">
                          <TrendingUp className="w-4 h-4" />
                          <span>{skill.mastery}% {t('practice.accuracyLabel')}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <BookOpen className="w-4 h-4" />
                          <span>{skill.questionsAttempted} {t('practice.attempted')}</span>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="mt-3 w-full bg-gray-100 rounded-full h-1.5">
                        <div
                          className={`h-full rounded-full ${getMasteryColor(skill.mastery)}`}
                          style={{ width: `${skill.mastery}%` }}
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => router.push('/results')}
                      className="ml-4 px-4 py-2 bg-gray-900 text-white rounded-lg font-medium text-sm hover:bg-gray-800 transition-colors flex-shrink-0"
                    >
                      {t('practice.review')}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state when no results */}
        {!hasResults && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">
              {t('practice.emptyState')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
