'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, LogOut } from 'lucide-react';
import { LanguageToggle } from './LanguageToggle';
import { useTranslation } from '@/lib/i18n/LanguageContext';
import { useAuthStore } from '@/lib/stores/authStore';

const ROLE_COLORS: Record<string, string> = {
  student: 'bg-blue-500',
  parent: 'bg-green-500',
  tutor: 'bg-[#ff6b35]',
  admin: 'bg-[#1a3a52] ring-1 ring-white/30',
};

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { t } = useTranslation();
  const { isLoggedIn, role, name, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="bg-[#1a3a52] shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo + Nav */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black text-white tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                PREM<span className="text-[#ff6b35]">IER</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/diagnostic" className="text-gray-300 hover:text-[#ff6b35] font-medium transition-colors">
                {t('common.diagnostic')}
              </Link>
              <Link href="/results" className="text-gray-300 hover:text-[#ff6b35] font-medium transition-colors">
                {t('common.results')}
              </Link>
              <Link href="/practice" className="text-gray-300 hover:text-[#ff6b35] font-medium transition-colors">
                {t('common.practice')}
              </Link>
              <Link href="/dashboard" className="text-gray-300 hover:text-[#ff6b35] font-medium transition-colors">
                {t('common.dashboard')}
              </Link>
              <Link href="/session/join" className="text-gray-300 hover:text-[#ff6b35] font-medium transition-colors">
                {t('session.title')}
              </Link>
            </nav>
          </div>

          {/* Right side: auth + language + mobile menu */}
          <div className="flex items-center gap-3">
            {/* Auth state */}
            {isLoggedIn && role ? (
              <div className="hidden md:flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold text-white ${ROLE_COLORS[role]}`}>
                  {t(`auth.${role}`)}
                </span>
                <span className="text-sm text-gray-300">{name}</span>
                <button
                  onClick={handleLogout}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden md:block text-sm text-gray-300 hover:text-[#ff6b35] font-medium transition-colors"
              >
                {t('auth.login')}
              </Link>
            )}

            <LanguageToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-[#ff6b35] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <nav className="md:hidden pt-4 pb-2 border-t border-white/10 mt-4">
            <div className="flex flex-col gap-3">
              {isLoggedIn && role && (
                <div className="flex items-center gap-2 pb-3 border-b border-white/10 mb-1">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold text-white ${ROLE_COLORS[role]}`}>
                    {t(`auth.${role}`)}
                  </span>
                  <span className="text-sm text-gray-300">{name}</span>
                </div>
              )}
              <Link href="/diagnostic" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-[#ff6b35] font-medium transition-colors py-2">
                {t('common.diagnostic')}
              </Link>
              <Link href="/results" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-[#ff6b35] font-medium transition-colors py-2">
                {t('common.results')}
              </Link>
              <Link href="/practice" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-[#ff6b35] font-medium transition-colors py-2">
                {t('common.practice')}
              </Link>
              <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-[#ff6b35] font-medium transition-colors py-2">
                {t('common.dashboard')}
              </Link>
              <Link href="/session/join" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-[#ff6b35] font-medium transition-colors py-2">
                {t('session.title')}
              </Link>
              {isLoggedIn ? (
                <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="text-left text-red-400 hover:text-red-300 font-medium transition-colors py-2">
                  {t('auth.logout')}
                </button>
              ) : (
                <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="text-[#ff6b35] font-medium transition-colors py-2">
                  {t('auth.login')}
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
