'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, BookOpen, Video, DollarSign, TrendingUp, UserPlus, Target, Clock, Sparkles, AlertTriangle, CheckCircle, ArrowUpRight, ArrowDownRight, Globe, Flame, X, Star, Calendar, MessageSquare } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/LanguageContext';
import { useComingSoon } from '@/components/ui/ComingSoonToast';

const MOCK_SIGNUPS = [
  { name: 'Emma W.', role: 'Student', time: '2 hours ago', plan: 'Premium', email: 'emma.w@email.com', mastery: 67, diagnostics: 3, sessions: 5, lastActive: '2h ago', joined: 'Mar 5, 2026', skills: [{ name: 'Finding a Percent', mastery: 92 }, { name: 'Percent Increase', mastery: 68 }, { name: 'Stacked Discounts', mastery: 55 }, { name: 'Markup vs Margin', mastery: 30 }] },
  { name: 'David C.', role: 'Parent', time: '5 hours ago', plan: 'Free', email: 'david.c@email.com', mastery: 0, diagnostics: 0, sessions: 0, lastActive: '5h ago', joined: 'Apr 1, 2026', skills: [] },
  { name: 'Sarah M.', role: 'Tutor', time: '1 day ago', plan: 'Pro', email: 'sarah.m@email.com', mastery: 0, diagnostics: 0, sessions: 156, lastActive: '3h ago', joined: 'Jan 12, 2026', skills: [] },
  { name: 'Lin Z.', role: 'Student', time: '1 day ago', plan: 'Premium', email: 'lin.z@email.com', mastery: 45, diagnostics: 2, sessions: 3, lastActive: '1d ago', joined: 'Mar 20, 2026', skills: [{ name: 'Fraction to Percent', mastery: 80 }, { name: 'Successive Changes', mastery: 40 }, { name: 'Compound Discounts', mastery: 30 }] },
  { name: 'Marcus J.', role: 'Student', time: '2 days ago', plan: 'Free', email: 'marcus.j@email.com', mastery: 31, diagnostics: 1, sessions: 0, lastActive: '5d ago', joined: 'Mar 28, 2026', skills: [{ name: 'Fraction to Percent', mastery: 60 }, { name: 'Finding a Percent', mastery: 25 }] },
  { name: 'Yuki T.', role: 'Parent', time: '2 days ago', plan: 'Premium', email: 'yuki.t@email.com', mastery: 0, diagnostics: 0, sessions: 0, lastActive: '2d ago', joined: 'Mar 30, 2026', skills: [] },
];

const MOCK_TOP_TUTORS = [
  { name: 'Sarah M.', students: 24, rating: 4.9, sessions: 156, revenue: '$3,240', email: 'sarah.m@email.com', joined: 'Jan 12, 2026', specialties: ['Percents', 'Percent Change'], avgSessionLength: '42 min', completionRate: 94, topStudents: ['Emma W.', 'Sofia R.', 'James L.'], recentReviews: ['Excellent teacher, very patient!', 'Helped me master percent problems', 'Best math tutor ever'] },
  { name: 'Mike R.', students: 18, rating: 4.8, sessions: 112, revenue: '$2,560', email: 'mike.r@email.com', joined: 'Feb 3, 2026', specialties: ['Applied Percents', 'Discounts'], avgSessionLength: '38 min', completionRate: 89, topStudents: ['Alex K.', 'Lin Z.'], recentReviews: ['Great at explaining fundamentals', 'Very knowledgeable about word problems'] },
  { name: 'Lisa K.', students: 15, rating: 4.7, sessions: 89, revenue: '$1,980', email: 'lisa.k@email.com', joined: 'Feb 15, 2026', specialties: ['Percent Change', 'Applied Percents'], avgSessionLength: '35 min', completionRate: 87, topStudents: ['Yuki T.', 'David C.'], recentReviews: ['Amazing at breaking down complex problems', 'Helped with advanced techniques'] },
  { name: 'Tom H.', students: 12, rating: 4.6, sessions: 67, revenue: '$1,420', email: 'tom.h@email.com', joined: 'Mar 1, 2026', specialties: ['Basic Percents'], avgSessionLength: '30 min', completionRate: 82, topStudents: ['Marcus J.'], recentReviews: ['Good for beginners', 'Patient and clear explanations'] },
];

const MOCK_TOPICS_PERFORMANCE = [
  { topic: 'Basic Percents', students: 847, avgMastery: 62, completion: 78 },
  { topic: 'Percent Change', students: 623, avgMastery: 51, completion: 64 },
  { topic: 'Applied Percents', students: 412, avgMastery: 44, completion: 52 },
];

const MOCK_REVENUE_BREAKDOWN = [
  { label: 'Premium Plans', amount: '$7,200', pct: 58, color: 'bg-blue-500' },
  { label: 'Pro (Tutor) Plans', amount: '$3,100', pct: 25, color: 'bg-[#ff6b35]' },
  { label: 'Session Fees', amount: '$1,600', pct: 13, color: 'bg-green-500' },
  { label: 'Enterprise', amount: '$500', pct: 4, color: 'bg-purple-500' },
];

const MOCK_DAILY_ACTIVE = [
  { day: 'Mon', users: 320 },
  { day: 'Tue', users: 410 },
  { day: 'Wed', users: 380 },
  { day: 'Thu', users: 450 },
  { day: 'Fri', users: 520 },
  { day: 'Sat', users: 280 },
  { day: 'Sun', users: 190 },
];

const MOCK_ALERTS = [
  { type: 'warning', message: '3 tutors haven\'t logged in for 7+ days', action: 'Review' },
  { type: 'info', message: '12 students completed their first diagnostic today', action: 'View' },
  { type: 'success', message: 'System uptime: 99.97% this month', action: '' },
];

export function AdminDashboard({ name }: { name: string }) {
  const { t } = useTranslation();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedTutor, setSelectedTutor] = useState<string | null>(null);
  const { show: showComingSoon, toast: comingSoonToast } = useComingSoon();

  const maxDAU = Math.max(...MOCK_DAILY_ACTIVE.map(d => d.users));

  const getSkillColor = (m: number) => m >= 80 ? 'bg-green-500' : m >= 50 ? 'bg-[#ff6b35]' : 'bg-red-400';
  const getRoleBadge = (role: string) => {
    const map: Record<string, string> = { Student: 'bg-blue-100 text-blue-700', Parent: 'bg-green-100 text-green-700', Tutor: 'bg-orange-100 text-[#ff6b35]', Admin: 'bg-slate-100 text-slate-700' };
    return map[role] ?? 'bg-gray-100 text-gray-600';
  };

  return (
    <>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">{t('auth.welcome')}, {name}</h1>
        <p className="text-gray-600">{t('adminDash.subtitle')}</p>
      </motion.div>

      {/* Platform Stats — Top Row */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-6">
        {[
          { icon: Users, label: t('adminDash.totalUsers'), value: '1,247', change: '+12%', up: true, color: 'bg-blue-100', iconColor: 'text-blue-600' },
          { icon: BookOpen, label: t('adminDash.diagnosticsRun'), value: '3,891', change: '+28%', up: true, color: 'bg-orange-100', iconColor: 'text-[#ff6b35]' },
          { icon: Video, label: t('adminDash.liveSessions'), value: '482', change: '+18%', up: true, color: 'bg-green-100', iconColor: 'text-green-600' },
          { icon: DollarSign, label: t('adminDash.mrr'), value: '$12.4k', change: '+23%', up: true, color: 'bg-purple-100', iconColor: 'text-purple-600' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl shadow-sm p-3 sm:p-5">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 ${stat.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <stat.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.iconColor}`} />
              </div>
              <span className={`text-[10px] sm:text-xs font-semibold flex items-center gap-0.5 ${stat.up ? 'text-green-600' : 'text-red-500'}`}>
                {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </span>
            </div>
            <div className="text-lg sm:text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-[10px] sm:text-xs text-gray-500 mt-0.5 truncate">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Secondary Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-6">
        {[
          { icon: Target, label: t('adminDash.avgAccuracy'), value: '61%', color: 'text-[#1a3a52]' },
          { icon: Clock, label: t('adminDash.avgSessionLength'), value: '38 min', color: 'text-blue-600' },
          { icon: Sparkles, label: t('adminDash.aiLessons'), value: '1,247', color: 'text-[#ff6b35]' },
          { icon: Globe, label: t('adminDash.countries'), value: '14', color: 'text-green-600' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl shadow-sm p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
            <stat.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.color} flex-shrink-0`} />
            <div className="min-w-0">
              <div className="text-base sm:text-lg font-bold text-gray-900">{stat.value}</div>
              <div className="text-[10px] sm:text-xs text-gray-500 truncate">{stat.label}</div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Alerts */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-6 space-y-2">
        {MOCK_ALERTS.map((alert, i) => {
          const colors = {
            warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
            info: 'bg-blue-50 border-blue-200 text-blue-800',
            success: 'bg-green-50 border-green-200 text-green-800',
          }[alert.type] ?? '';
          const Icon = alert.type === 'warning' ? AlertTriangle : alert.type === 'success' ? CheckCircle : Sparkles;
          return (
            <div key={i} className={`flex items-center justify-between p-3 rounded-lg border ${colors}`}>
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{alert.message}</span>
              </div>
              {alert.action && (
                <button className="text-xs font-semibold hover:underline">{alert.action}</button>
              )}
            </div>
          );
        })}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Daily Active Users Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">{t('adminDash.dailyActiveUsers')}</h2>
          <div className="flex items-end gap-1 sm:gap-3 h-32 sm:h-40">
            {MOCK_DAILY_ACTIVE.map((day, i) => (
              <div key={day.day} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs font-semibold text-gray-900">{day.users}</span>
                <motion.div
                  className="w-full bg-[#1a3a52] rounded-t-md"
                  initial={{ height: 0 }}
                  animate={{ height: `${(day.users / maxDAU) * 120}px` }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.05 }}
                />
                <span className="text-xs text-gray-500">{day.day}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm">
            <span className="text-gray-500">{t('adminDash.weeklyAvg')}: <span className="font-semibold text-gray-900">364 users/day</span></span>
            <span className="flex items-center gap-1 text-green-600 font-semibold">
              <ArrowUpRight className="w-4 h-4" /> {t('adminDash.weeklyGrowth')}
            </span>
          </div>
        </motion.div>

        {/* Revenue Breakdown */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">{t('adminDash.revenueBreakdown')}</h2>
          <div className="space-y-3">
            {MOCK_REVENUE_BREAKDOWN.map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{item.label}</span>
                  <span className="font-semibold text-gray-900">{item.amount}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${item.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${item.pct}%` }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between text-sm">
              <span className="font-semibold text-gray-900">{t('adminDash.totalMrr')}</span>
              <span className="font-bold text-gray-900">$12,400</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{t('adminDash.arrProjection')}</span>
              <span className="font-semibold text-green-600">$148,800</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Topic Performance */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">{t('adminDash.topicPerformance')}</h2>
          <div className="space-y-4">
            {MOCK_TOPICS_PERFORMANCE.map((topic) => (
              <div key={topic.topic} className="p-3 bg-gray-50 rounded-lg">
                <div className="font-medium text-gray-900 text-sm mb-2">{topic.topic}</div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-sm font-bold text-gray-900">{topic.students}</div>
                    <div className="text-xs text-gray-500">{t('adminDash.topicStudents')}</div>
                  </div>
                  <div>
                    <div className={`text-sm font-bold ${topic.avgMastery >= 60 ? 'text-green-600' : topic.avgMastery >= 45 ? 'text-[#ff6b35]' : 'text-red-500'}`}>{topic.avgMastery}%</div>
                    <div className="text-xs text-gray-500">{t('adminDash.topicAvgMastery')}</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">{topic.completion}%</div>
                    <div className="text-xs text-gray-500">{t('adminDash.topicCompletion')}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Tutors */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Flame className="w-5 h-5 text-[#ff6b35]" />
            {t('adminDash.topTutors')}
          </h2>
          <div className="space-y-2">
            {MOCK_TOP_TUTORS.map((tutor, i) => (
              <div key={tutor.name}>
                <button
                  onClick={() => setSelectedTutor(selectedTutor === tutor.name ? null : tutor.name)}
                  className={`w-full flex items-center gap-3 py-2 px-2 rounded-lg transition-colors text-left ${selectedTutor === tutor.name ? 'bg-orange-50' : 'hover:bg-gray-50'}`}
                >
                  <div className="w-7 h-7 rounded-full bg-[#ff6b35] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900">{tutor.name}</div>
                    <div className="text-xs text-gray-500">{tutor.students} students · {tutor.sessions} sessions</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm font-semibold text-gray-900">{tutor.revenue}</div>
                    <div className="text-xs text-yellow-500">★ {tutor.rating}</div>
                  </div>
                </button>

                <AnimatePresence>
                  {selectedTutor === tutor.name && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                      <div className="ml-10 mr-1 mt-1 mb-2 p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs text-gray-500">{tutor.email} · Joined {tutor.joined}</span>
                          <button onClick={() => setSelectedTutor(null)} className="p-0.5 rounded hover:bg-gray-200"><X className="w-3 h-3 text-gray-400" /></button>
                        </div>
                        <div className="grid grid-cols-3 gap-2 mb-3">
                          <div className="text-center p-2 bg-white rounded">
                            <div className="font-bold text-gray-900">{tutor.avgSessionLength}</div>
                            <div className="text-xs text-gray-500">{t('adminDash.avgSessionLength')}</div>
                          </div>
                          <div className="text-center p-2 bg-white rounded">
                            <div className="font-bold text-green-600">{tutor.completionRate}%</div>
                            <div className="text-xs text-gray-500">{t('adminDash.topicCompletion')}</div>
                          </div>
                          <div className="text-center p-2 bg-white rounded">
                            <div className="font-bold text-gray-900">{tutor.specialties.length}</div>
                            <div className="text-xs text-gray-500">{t('adminDash.specialties')}</div>
                          </div>
                        </div>
                        <div className="mb-2">
                          <span className="text-xs font-semibold text-gray-600">{t('adminDash.specialties')}:</span>
                          <div className="flex gap-1 mt-1">{tutor.specialties.map(s => <span key={s} className="text-xs px-2 py-0.5 bg-orange-50 text-[#ff6b35] rounded-full">{s}</span>)}</div>
                        </div>
                        <div className="mb-2">
                          <span className="text-xs font-semibold text-gray-600">{t('adminDash.topStudentsLabel')}:</span>
                          <span className="text-xs text-gray-500 ml-1">{tutor.topStudents.join(', ')}</span>
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-gray-600">{t('adminDash.recentReviewsLabel')}:</span>
                          {tutor.recentReviews.slice(0, 2).map((r, j) => (
                            <div key={j} className="flex items-start gap-1 mt-1">
                              <Star className="w-3 h-3 text-yellow-400 flex-shrink-0 mt-0.5" />
                              <span className="text-xs text-gray-600 italic">&quot;{r}&quot;</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2 mt-3">
                          <button onClick={() => showComingSoon('Message')} className="flex-1 py-1.5 bg-white border border-gray-200 rounded text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-1"><MessageSquare className="w-3 h-3" /> {t('common.message')}</button>
                          <button onClick={() => showComingSoon('Schedule')} className="flex-1 py-1.5 bg-white border border-gray-200 rounded text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-1"><Calendar className="w-3 h-3" /> {t('common.schedule')}</button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Signups + User Distribution */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-[#ff6b35]" />
              {t('adminDash.recentSignups')}
            </h2>
            <div className="space-y-1">
              {MOCK_SIGNUPS.map((user, i) => (
                <div key={i}>
                  <button
                    onClick={() => setSelectedUser(selectedUser === user.name ? null : user.name)}
                    className={`w-full flex items-center gap-2 py-1.5 px-2 rounded-lg transition-colors text-left ${selectedUser === user.name ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                  >
                    <div className="w-7 h-7 rounded-full bg-[#1a3a52] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {user.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">{user.name}</div>
                      <div className="text-xs text-gray-500">{user.role} · {user.plan}</div>
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0">{user.time}</span>
                  </button>

                  <AnimatePresence>
                    {selectedUser === user.name && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                        <div className="ml-9 mr-1 mt-1 mb-2 p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getRoleBadge(user.role)}`}>{user.role}</span>
                              <span className="text-xs text-gray-500">{user.plan} {t('adminDash.planLabel')}</span>
                            </div>
                            <button onClick={() => setSelectedUser(null)} className="p-0.5 rounded hover:bg-gray-200"><X className="w-3 h-3 text-gray-400" /></button>
                          </div>
                          <div className="text-xs text-gray-500 mb-2">{user.email} · Joined {user.joined}</div>
                          <div className="grid grid-cols-3 gap-2 mb-2">
                            <div className="text-center p-1.5 bg-white rounded">
                              <div className="font-bold text-gray-900 text-sm">{user.diagnostics}</div>
                              <div className="text-xs text-gray-500">{t('adminDash.userDiagnostics')}</div>
                            </div>
                            <div className="text-center p-1.5 bg-white rounded">
                              <div className="font-bold text-gray-900 text-sm">{user.sessions}</div>
                              <div className="text-xs text-gray-500">{t('adminDash.userSessions')}</div>
                            </div>
                            <div className="text-center p-1.5 bg-white rounded">
                              <div className={`font-bold text-sm ${user.mastery >= 60 ? 'text-green-600' : user.mastery >= 40 ? 'text-[#ff6b35]' : user.mastery > 0 ? 'text-red-500' : 'text-gray-400'}`}>{user.mastery > 0 ? `${user.mastery}%` : '—'}</div>
                              <div className="text-xs text-gray-500">{t('common.mastery')}</div>
                            </div>
                          </div>
                          {user.skills.length > 0 && (
                            <div className="space-y-1.5 mb-2">
                              {user.skills.map(skill => (
                                <div key={skill.name} className="flex items-center gap-2">
                                  <span className="text-xs text-gray-700 w-28 truncate">{skill.name}</span>
                                  <div className="flex-1 h-1.5 bg-gray-200 rounded-full"><div className={`h-full rounded-full ${getSkillColor(skill.mastery)}`} style={{ width: `${skill.mastery}%` }} /></div>
                                  <span className="text-xs text-gray-500 w-8 text-right">{skill.mastery}%</span>
                                </div>
                              ))}
                            </div>
                          )}
                          <div className="flex gap-2">
                            <button onClick={() => showComingSoon('Message')} className="flex-1 py-1.5 bg-white border border-gray-200 rounded text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-1"><MessageSquare className="w-3 h-3" /> {t('common.message')}</button>
                            <button onClick={() => showComingSoon('View Activity')} className="flex-1 py-1.5 bg-white border border-gray-200 rounded text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-1"><Calendar className="w-3 h-3" /> {t('adminDash.viewActivity')}</button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-center gap-1 text-sm text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span className="font-semibold">+23%</span>
              <span className="text-gray-500">{t('adminDash.thisMonth')}</span>
            </div>
          </div>

          {/* System Health */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-3">{t('adminDash.systemHealth')}</h3>
            <div className="space-y-2">
              {[
                { label: 'API', status: t('adminDash.operational'), latency: '45ms' },
                { label: 'Database', status: t('adminDash.operational'), latency: '12ms' },
                { label: 'LiveKit', status: t('adminDash.operational'), latency: '28ms' },
                { label: 'Claude API', status: t('adminDash.operational'), latency: '890ms' },
                { label: 'CDN', status: t('adminDash.operational'), latency: '8ms' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-sm text-gray-700">{item.label}</span>
                  </div>
                  <span className="text-xs text-gray-400">{item.latency}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100 text-center">
              <span className="text-xs text-green-600 font-semibold">{t('adminDash.systemUptime')}</span>
            </div>
          </div>
        </motion.div>
      </div>
      {comingSoonToast}
    </>
  );
}
