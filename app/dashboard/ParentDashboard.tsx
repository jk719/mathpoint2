'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { TrendingUp, Clock, CheckCircle, BookOpen, Calendar, Video, Target, Award, Sparkles, AlertTriangle, MessageSquare } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/LanguageContext';
import { MOCK_ASSIGNMENTS, MOCK_SUBMISSIONS } from '@/data/mock-assignments';
import { AssignmentCard } from '@/components/assignments/AssignmentCard';
import { useComingSoon } from '@/components/ui/ComingSoonToast';

const MOCK_CHILD = {
  name: 'Emma',
  accuracy: 67,
  mastered: 4,
  developing: 6,
  weak: 3,
  totalSessions: 8,
  lastActive: '2 hours ago',
  totalPoints: 450,
  streak: 5,
  totalPracticeQuestions: 87,
  timeSpentMinutes: 340,
};

const MOCK_SKILLS = [
  { name: 'Finding a Percent', topic: 'Percents', mastery: 92, status: 'mastered' },
  { name: 'Fraction to Percent', topic: 'Percents', mastery: 85, status: 'mastered' },
  { name: 'Percent Increase', topic: 'Percents', mastery: 68, status: 'developing' },
  { name: 'Stacked Discounts', topic: 'Percents', mastery: 55, status: 'developing' },
  { name: 'Successive Changes', topic: 'Percents', mastery: 45, status: 'weak' },
  { name: 'Markup vs Margin', topic: 'Percents', mastery: 35, status: 'weak' },
  { name: 'Compound Discounts', topic: 'Percents', mastery: 30, status: 'weak' },
];

const MOCK_ACTIVITY = [
  { action: 'Completed diagnostic', topic: 'Percents', time: '2 hours ago', icon: CheckCircle, color: 'text-green-500' },
  { action: 'Practiced', topic: 'Stacked Discounts — scored 80%', time: '1 day ago', icon: Target, color: 'text-purple-500' },
  { action: 'AI Lesson', topic: 'Percent Increase', time: '2 days ago', icon: Sparkles, color: 'text-[#ff6b35]' },
  { action: 'Live Session', topic: 'with Tutor Sarah — 45 min', time: '3 days ago', icon: Video, color: 'text-blue-500' },
  { action: 'Completed diagnostic', topic: 'Percent Change', time: '5 days ago', icon: CheckCircle, color: 'text-green-500' },
  { action: 'Practiced', topic: 'Finding a Percent — scored 95%', time: '6 days ago', icon: Target, color: 'text-purple-500' },
];

const MOCK_SESSIONS = [
  { tutor: 'Sarah M.', topic: 'Percent Change', time: 'Today, 4:00 PM', duration: '45 min' },
  { tutor: 'Sarah M.', topic: 'Applied Percents', time: 'Friday, 2:00 PM', duration: '30 min' },
];

export function ParentDashboard({ name }: { name: string }) {
  const { t } = useTranslation();
  const router = useRouter();
  const { show: showComingSoon, toast: comingSoonToast } = useComingSoon();

  const getSkillColor = (mastery: number) => {
    if (mastery >= 80) return 'bg-green-500';
    if (mastery >= 50) return 'bg-[#ff6b35]';
    return 'bg-red-400';
  };

  const getStatusBadge = (status: string) => {
    if (status === 'mastered') return { bg: 'bg-green-100', text: 'text-green-700', label: t('common.mastered') };
    if (status === 'developing') return { bg: 'bg-orange-100', text: 'text-[#ff6b35]', label: t('common.developing') };
    return { bg: 'bg-red-100', text: 'text-red-700', label: t('common.weak') };
  };

  return (
    <>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">{t('auth.welcome')}, {name}</h1>
        <p className="text-gray-600">{t('parentDash.subtitle')}</p>
      </motion.div>

      {/* Child Overview Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm p-6 mb-6 border-l-4 border-green-500">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-2xl font-bold">
              {MOCK_CHILD.name[0]}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{MOCK_CHILD.name}</h2>
              <p className="text-sm text-gray-500">{t('parentDash.lastActive')}: {MOCK_CHILD.lastActive}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-sm font-medium text-orange-500">
              <Award className="w-4 h-4" /> {MOCK_CHILD.streak} {t('parentDash.dayStreak')}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3">
          <div className="text-center p-2 sm:p-3 bg-gray-50 rounded-lg">
            <div className="text-lg sm:text-2xl font-bold text-gray-900">{MOCK_CHILD.accuracy}%</div>
            <div className="text-[10px] sm:text-xs text-gray-500">{t('common.accuracy')}</div>
          </div>
          <div className="text-center p-2 sm:p-3 bg-green-50 rounded-lg">
            <div className="text-lg sm:text-2xl font-bold text-green-700">{MOCK_CHILD.mastered}</div>
            <div className="text-[10px] sm:text-xs text-gray-500">{t('common.mastered')}</div>
          </div>
          <div className="text-center p-2 sm:p-3 bg-orange-50 rounded-lg">
            <div className="text-lg sm:text-2xl font-bold text-[#ff6b35]">{MOCK_CHILD.developing}</div>
            <div className="text-[10px] sm:text-xs text-gray-500">{t('common.developing')}</div>
          </div>
          <div className="text-center p-2 sm:p-3 bg-red-50 rounded-lg">
            <div className="text-lg sm:text-2xl font-bold text-red-600">{MOCK_CHILD.weak}</div>
            <div className="text-[10px] sm:text-xs text-gray-500">{t('common.weak')}</div>
          </div>
          <div className="text-center p-2 sm:p-3 bg-blue-50 rounded-lg">
            <div className="text-lg sm:text-2xl font-bold text-blue-600">{MOCK_CHILD.totalPoints}</div>
            <div className="text-[10px] sm:text-xs text-gray-500">{t('common.points')}</div>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Skills Breakdown — 2 columns */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">{t('dashboard.skillMastery')}</h2>
          <div className="space-y-3">
            {MOCK_SKILLS.map((skill, i) => {
              const badge = getStatusBadge(skill.status);
              return (
                <div key={skill.name} className="flex items-center gap-3">
                  <span className="text-sm text-gray-800 w-40 truncate">{skill.name}</span>
                  <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${getSkillColor(skill.mastery)}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.mastery}%` }}
                      transition={{ duration: 0.6, delay: 0.1 * i }}
                    />
                  </div>
                  <span className="text-xs font-semibold w-10 text-right">{skill.mastery}%</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full w-24 text-center ${badge.bg} ${badge.text}`}>{badge.label}</span>
                </div>
              );
            })}
          </div>

          {/* Weak areas alert */}
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-800">3 {t('parentDash.skillsNeedAttention')}</p>
              <p className="text-xs text-red-600 mt-0.5">Successive Changes, Markup vs Margin, Compound Discounts {t('parentDash.weakSkillsAlert')}</p>
            </div>
          </div>
        </motion.div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Progress Over Time */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">{t('parentDash.progress')}</h2>
            <div className="space-y-3">
              {['Week 1', 'Week 2', 'Week 3', 'Week 4'].map((week, i) => {
                const progress = [35, 48, 58, 67][i];
                return (
                  <div key={week}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{week}</span>
                      <span className="font-semibold text-gray-900">{progress}%</span>
                    </div>
                    <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-green-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-1 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="font-semibold text-green-600">+32%</span>
              <span className="text-gray-500">{t('parentDash.improvementThisMonth')}</span>
            </div>
          </motion.div>

          {/* Learning Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">{t('parentDash.learningStats')}</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-gray-400" />
                  {t('parentDash.timeSpentLearning')}
                </div>
                <span className="font-semibold text-gray-900">5h 40m</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Target className="w-4 h-4 text-gray-400" />
                  {t('parentDash.questionsAnswered')}
                </div>
                <span className="font-semibold text-gray-900">{MOCK_CHILD.totalPracticeQuestions}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Video className="w-4 h-4 text-gray-400" />
                  {t('parentDash.liveSessionsAttended')}
                </div>
                <span className="font-semibold text-gray-900">{MOCK_CHILD.totalSessions}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Sparkles className="w-4 h-4 text-gray-400" />
                  {t('parentDash.aiLessonsCompleted')}
                </div>
                <span className="font-semibold text-gray-900">6</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Assignments */}
      {(() => {
        const childAssignments = MOCK_ASSIGNMENTS.filter((a) => a.assignedStudents.includes('Emma W.'));
        return childAssignments.length > 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="mt-6 bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#ff6b35]" />
              {t('parentDash.childAssignments')}
            </h2>
            <div className="space-y-3">
              {childAssignments.map((assignment, i) => (
                <AssignmentCard
                  key={assignment.id}
                  assignment={assignment}
                  submissions={MOCK_SUBMISSIONS}
                  role="parent"
                  studentName="Emma W."
                  index={i}
                />
              ))}
            </div>
          </motion.div>
        ) : null;
      })()}

      {/* Bottom row */}
      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        {/* Upcoming Sessions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#ff6b35]" />
            {t('parentDash.upcomingSessions')}
          </h2>
          <div className="space-y-3">
            {MOCK_SESSIONS.map((session, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900 text-sm">{session.topic}</div>
                  <div className="text-xs text-gray-500 mt-0.5">with {session.tutor} · {session.duration}</div>
                </div>
                <span className="text-xs font-medium text-[#ff6b35] bg-orange-50 px-2.5 py-1 rounded-full">{session.time}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => router.push('/session/join')}
            className="w-full mt-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
          >
            <Video className="w-4 h-4" />
            {t('parentDash.scheduleNewSession')}
          </button>
        </motion.div>

        {/* Recent Activity */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">{t('parentDash.recentActivity')}</h2>
          <div className="space-y-3">
            {MOCK_ACTIVITY.map((item, i) => (
              <div key={i} className="flex items-center gap-3 py-2">
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <item.icon className={`w-4 h-4 ${item.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{item.action}</p>
                  <p className="text-xs text-gray-500">{item.topic}</p>
                </div>
                <span className="text-xs text-gray-400 flex-shrink-0">{item.time}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Contact Tutor CTA */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
        className="mt-6 bg-[#1a3a52] rounded-xl p-6 flex items-center justify-between">
        <div>
          <h3 className="text-white font-bold text-lg">{t('parentDash.needHelpTitle')}</h3>
          <p className="text-gray-300 text-sm mt-1">{t('parentDash.needHelpDesc')}</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => showComingSoon('Message Tutor')}
            className="px-4 py-2.5 bg-white/10 text-white rounded-lg font-medium text-sm hover:bg-white/20 transition-colors flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            {t('parentDash.messageTutor')}
          </button>
          <button
            onClick={() => router.push('/session/join')}
            className="px-4 py-2.5 bg-[#ff6b35] text-white rounded-lg font-medium text-sm hover:bg-[#e55a2a] transition-colors flex items-center gap-2"
          >
            <Video className="w-4 h-4" />
            {t('parentDash.bookSession')}
          </button>
        </div>
      </motion.div>
      {comingSoonToast}
    </>
  );
}
