'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { GraduationCap, Users, UserCheck, Shield, ArrowRight, Play, Mail, KeyRound, User } from 'lucide-react';
import { useAuthStore, Role } from '@/lib/stores/authStore';
import { useTranslation } from '@/lib/i18n/LanguageContext';

const DEMO_ACCOUNTS: { role: Role; name: string; labelKey: string; icon: typeof GraduationCap; color: string; bg: string; hoverBg: string }[] = [
  { role: 'student', name: 'Emma W.', labelKey: 'auth.demoStudent', icon: GraduationCap, color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200', hoverBg: 'hover:bg-blue-100 hover:border-blue-300' },
  { role: 'parent', name: 'David C.', labelKey: 'auth.demoParent', icon: Users, color: 'text-green-700', bg: 'bg-green-50 border-green-200', hoverBg: 'hover:bg-green-100 hover:border-green-300' },
  { role: 'tutor', name: 'Sarah M.', labelKey: 'auth.demoTutor', icon: UserCheck, color: 'text-orange-700', bg: 'bg-orange-50 border-orange-200', hoverBg: 'hover:bg-orange-100 hover:border-orange-300' },
  { role: 'admin', name: 'Admin', labelKey: 'auth.demoAdmin', icon: Shield, color: 'text-slate-700', bg: 'bg-slate-50 border-slate-200', hoverBg: 'hover:bg-slate-100 hover:border-slate-300' },
];

const ROLES: { role: Role; icon: typeof GraduationCap; color: string; bg: string }[] = [
  { role: 'student', icon: GraduationCap, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200 hover:border-blue-400' },
  { role: 'parent', icon: Users, color: 'text-green-600', bg: 'bg-green-50 border-green-200 hover:border-green-400' },
  { role: 'tutor', icon: UserCheck, color: 'text-[#ff6b35]', bg: 'bg-orange-50 border-orange-200 hover:border-orange-400' },
  { role: 'admin', icon: Shield, color: 'text-[#1a3a52]', bg: 'bg-slate-50 border-slate-200 hover:border-slate-400' },
];

export default function LoginPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const { login } = useAuthStore();

  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [name, setName] = useState('');
  const [showManual, setShowManual] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupRole, setSignupRole] = useState<Role | null>(null);

  const handleDemoLogin = (role: Role, demoName: string) => {
    login(role, demoName);
    router.push('/dashboard');
  };

  const handleLogin = () => {
    if (!selectedRole || !name.trim()) return;
    login(selectedRole, name.trim());
    router.push('/dashboard');
  };

  const handleSignup = () => {
    if (!signupRole || !signupEmail.trim() || !signupPassword.trim() || !signupName.trim()) return;
    login(signupRole, signupName.trim());
    router.push(signupRole === 'student' ? '/diagnostic' : '/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 sm:py-16">
      <div className="container mx-auto px-4 max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            {t('auth.title')}
          </h1>
          <p className="text-gray-600">
            {t('auth.subtitle')}
          </p>
        </motion.div>

        {/* Demo Accounts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden border-t-4 border-[#ff6b35] p-8 mb-6"
        >
          <div className="flex items-center gap-2 mb-5">
            <Play className="w-4 h-4 text-[#ff6b35]" />
            <h3 className="font-semibold text-gray-900">{t('auth.demoMode')}</h3>
            <span className="text-xs px-2 py-0.5 bg-[#ff6b35]/10 text-[#ff6b35] rounded-full font-medium">
              One click
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {DEMO_ACCOUNTS.map((account, i) => (
              <motion.button
                key={account.role}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.05 }}
                onClick={() => handleDemoLogin(account.role, account.name)}
                className={`flex flex-col items-center gap-1.5 p-4 rounded-xl border-2 transition-all cursor-pointer ${account.bg} ${account.hoverBg}`}
              >
                <account.icon className={`w-6 h-6 ${account.color}`} />
                <span className={`font-semibold text-xs ${account.color}`}>{t(account.labelKey)}</span>
                <span className="text-[10px] text-gray-500">{account.name}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Separator */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-gray-200" />
          <button
            onClick={() => setShowManual(!showManual)}
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            {t('auth.orSignIn')}
          </button>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Manual Login (collapsed by default) */}
        {showManual && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200 p-8"
          >
            {/* Role Selection */}
            <h3 className="font-semibold text-gray-900 mb-4">{t('auth.selectRole')}</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
              {ROLES.map(({ role, icon: Icon, color, bg }, i) => (
                <motion.button
                  key={role}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                  onClick={() => setSelectedRole(role)}
                  className={`flex flex-col items-center gap-2 p-5 rounded-xl border-2 transition-all ${
                    selectedRole === role
                      ? `${bg} ring-2 ring-offset-1 ring-current ${color} scale-[1.02]`
                      : `bg-white border-gray-200 hover:bg-gray-50 text-gray-600`
                  }`}
                >
                  <Icon className={`w-7 h-7 ${selectedRole === role ? color : 'text-gray-400'}`} />
                  <span className="font-semibold text-sm">{t(`auth.${role}`)}</span>
                  <span className="text-xs text-gray-500 text-center">{t(`auth.${role}Desc`)}</span>
                </motion.button>
              ))}
            </div>

            {/* Name Input */}
            {selectedRole && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.2 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {t('auth.yourName')}
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  placeholder={t('auth.namePlaceholder')}
                  autoFocus
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent text-sm mb-6"
                />

                <button
                  onClick={handleLogin}
                  disabled={!name.trim()}
                  className="w-full py-4 bg-[#ff6b35] text-white rounded-xl font-semibold text-lg shadow-lg hover:bg-[#e55a2a] transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {t('auth.continue')}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Create Account Separator */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-gray-200" />
          <button
            onClick={() => setShowSignup(!showSignup)}
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            {t('auth.newHere')}
          </button>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Create Account Form */}
        {showSignup && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200 p-8"
          >
            <h3 className="font-semibold text-gray-900 mb-4">{t('auth.createNewAccount')}</h3>

            {/* Role selector */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
              {ROLES.map(({ role, icon: Icon, color, bg }) => (
                <button
                  key={role}
                  onClick={() => setSignupRole(role)}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all text-center ${
                    signupRole === role
                      ? `${bg} ring-2 ring-offset-1 ring-current ${color} scale-[1.02]`
                      : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-600'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${signupRole === role ? color : 'text-gray-400'}`} />
                  <span className="font-semibold text-xs">{t(`auth.${role}`)}</span>
                </button>
              ))}
            </div>

            {signupRole && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.2 }}
                className="space-y-3"
              >
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    placeholder={t('auth.namePlaceholder')}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent text-sm"
                  />
                </div>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    type="email"
                    placeholder="you@email.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent text-sm"
                  />
                </div>
                <div className="relative">
                  <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    type="password"
                    placeholder={t('results.passwordPlaceholder')}
                    onKeyDown={(e) => e.key === 'Enter' && handleSignup()}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent text-sm"
                  />
                </div>

                <button
                  onClick={handleSignup}
                  disabled={!signupEmail.trim() || !signupPassword.trim() || !signupName.trim()}
                  className="w-full py-4 bg-[#ff6b35] text-white rounded-xl font-semibold text-lg shadow-lg hover:bg-[#e55a2a] transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-2"
                >
                  {t('auth.createNewAccount')}
                  <ArrowRight className="w-5 h-5" />
                </button>

                {signupRole === 'student' && (
                  <p className="text-xs text-gray-400 text-center mt-1">
                    You&apos;ll start with a free diagnostic to find your weak spots
                  </p>
                )}
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
