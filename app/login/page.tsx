'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { GraduationCap, Users, UserCheck, Shield, ArrowRight } from 'lucide-react';
import { useAuthStore, Role } from '@/lib/stores/authStore';
import { useTranslation } from '@/lib/i18n/LanguageContext';

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

  const handleLogin = () => {
    if (!selectedRole || !name.trim()) return;
    login(selectedRole, name.trim());
    router.push('/dashboard');
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden border-t-4 border-[#ff6b35] p-8"
        >
          {/* Role Selection */}
          <h3 className="font-semibold text-gray-900 mb-4">{t('auth.selectRole')}</h3>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {ROLES.map(({ role, icon: Icon, color, bg }, i) => (
              <motion.button
                key={role}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.05 }}
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
      </div>
    </div>
  );
}
