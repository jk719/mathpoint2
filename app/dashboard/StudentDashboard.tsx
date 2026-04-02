'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { TrendingUp, Target, BookOpen, Award, ArrowRight, Flame, Sparkles, CheckCircle, Clock, Video } from 'lucide-react';
import { useDiagnosticStore } from '@/lib/stores/diagnosticStore';
import { useTranslation } from '@/lib/i18n/LanguageContext';

const MOCK_SKILLS = [
  { skill: 'Rice Spreading Basics', topic: 'Maki Rolls', mastery: 92 },
  { skill: 'Nori Orientation', topic: 'Maki Rolls', mastery: 85 },
  { skill: 'Rolling Technique', topic: 'Maki Rolls', mastery: 68 },
  { skill: 'Filling Placement', topic: 'Maki Rolls', mastery: 55 },
  { skill: 'Rice-Outside Basics', topic: 'Uramaki Rolls', mastery: 45 },
  { skill: 'Cone Shaping Basics', topic: 'Temaki Hand Rolls', mastery: 30 },
];

const MOCK_ACTIVITY = [
  { icon: CheckCircle, action: 'Completed diagnostic', detail: 'Maki Rolls', time: '2h ago', color: 'text-green-500' },
  { icon: Sparkles, action: 'AI Lesson', detail: 'Rolling Technique', time: '1d ago', color: 'text-[#ff6b35]' },
  { icon: Video, action: 'Live Session', detail: 'with Tutor Sarah', time: '2d ago', color: 'text-blue-500' },
  { icon: Target, action: 'Practiced', detail: 'Filling Placement — 4 questions', time: '3d ago', color: 'text-purple-500' },
  { icon: CheckCircle, action: 'Completed diagnostic', detail: 'Uramaki Rolls', time: '5d ago', color: 'text-green-500' },
];

const MOCK_UPCOMING = [
  { title: 'Live Session with Tutor Sarah', time: 'Today, 4:00 PM', topic: 'Uramaki Technique' },
  { title: 'Practice Reminder', time: 'Tomorrow', topic: 'Cone Shaping' },
];

export function StudentDashboard({ name }: { name: string }) {
  const router = useRouter();
  const { t } = useTranslation();
  const { diagnosticResult } = useDiagnosticStore();

  const hasResults = !!diagnosticResult;

  // Use real data if available, otherwise fall back to mock
  const points = hasResults ? (diagnosticResult.correctCount ?? 0) * 50 : 450;
  const skillsAssessed = hasResults ? (diagnosticResult.skills?.length ?? 0) : 12;
  const accuracy = hasResults ? Math.round((diagnosticResult.accuracy ?? 0) * 100) : 63;
  const streak = 5;

  const skillMastery = hasResults
    ? (diagnosticResult.skills ?? []).map((s) => ({
        skill: s.displayName,
        topic: s.topic,
        mastery: Math.round(s.accuracy * 100),
      }))
    : MOCK_SKILLS;

  const getProgressColor = (mastery: number) => {
    if (mastery >= 80) return 'bg-green-500';
    if (mastery >= 50) return 'bg-[#ff6b35]';
    return 'bg-red-400';
  };

  return (
    <>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">{t('auth.welcome')}, {name}</h1>
        <p className="text-gray-600">{t('dashboard.subtitle')}</p>
      </motion.div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1a3a52]/10 rounded-lg flex items-center justify-center"><Award className="w-5 h-5 text-[#1a3a52]" /></div>
            <div><div className="text-2xl font-bold text-gray-900">{points}</div><div className="text-sm text-gray-500">{t('common.points')}</div></div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center"><Flame className="w-5 h-5 text-orange-500" /></div>
            <div><div className="text-2xl font-bold text-gray-900">{streak}</div><div className="text-sm text-gray-500">Day Streak</div></div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center"><TrendingUp className="w-5 h-5 text-green-500" /></div>
            <div><div className="text-2xl font-bold text-gray-900">{accuracy}%</div><div className="text-sm text-gray-500">{t('common.accuracy')}</div></div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#ff6b35]/10 rounded-lg flex items-center justify-center"><Target className="w-5 h-5 text-[#ff6b35]" /></div>
            <div><div className="text-2xl font-bold text-gray-900">{skillsAssessed}</div><div className="text-sm text-gray-500">{t('common.skillsAssessed')}</div></div>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Skills */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">{t('dashboard.skillMastery')}</h2>
            <button onClick={() => router.push(hasResults ? '/results' : '/diagnostic')} className="text-sm text-[#ff6b35] hover:underline flex items-center gap-1">
              {hasResults ? t('dashboard.fullReport') : t('common.diagnostic')} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            {skillMastery.slice(0, 6).map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900 text-sm">{item.skill}</span>
                      <span className="text-xs text-gray-400">{item.topic}</span>
                    </div>
                    <span className={`text-sm font-semibold ${item.mastery >= 80 ? 'text-green-600' : item.mastery >= 50 ? 'text-[#ff6b35]' : 'text-red-500'}`}>{item.mastery}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <motion.div
                      className={`h-full rounded-full ${getProgressColor(item.mastery)}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${item.mastery}%` }}
                      transition={{ duration: 0.6, delay: 0.1 * i }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">{t('dashboard.quickActions')}</h2>
            <div className="space-y-3">
              <button onClick={() => router.push('/diagnostic')} className="w-full py-3 px-4 bg-[#ff6b35] text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-[#e55a2a] transition-colors">
                <BookOpen className="w-4 h-4" />
                {hasResults ? t('dashboard.retakeDiagnostic') : t('dashboard.takeDiagnostic')}
              </button>
              <button onClick={() => router.push('/practice')} className="w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
                <TrendingUp className="w-4 h-4" />
                {t('dashboard.practiceWeak')}
              </button>
              <button onClick={() => router.push('/session/join')} className="w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
                <Video className="w-4 h-4" />
                {t('session.joinSession')}
              </button>
            </div>
          </motion.div>

          {/* Upcoming */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Upcoming</h2>
            <div className="space-y-3">
              {MOCK_UPCOMING.map((item, i) => (
                <div key={i} className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-900 text-sm">{item.title}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{item.topic}</div>
                  <div className="text-xs text-[#ff6b35] mt-1">{item.time}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Recent Activity */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-6 bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {MOCK_ACTIVITY.map((item, i) => (
            <div key={i} className="flex items-center gap-3 py-2">
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0">
                <item.icon className={`w-4 h-4 ${item.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{item.action}</p>
                <p className="text-xs text-gray-500">{item.detail}</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400 flex-shrink-0">
                <Clock className="w-3 h-3" />
                {item.time}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
}
