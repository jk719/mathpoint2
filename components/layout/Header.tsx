'use client';

import React from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { LanguageToggle } from './LanguageToggle';
import { useTranslation } from '@/lib/i18n/LanguageContext';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { t } = useTranslation();

  return (
    <header className="bg-[#1a3a52] shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo + Nav */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-black text-white tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                MATH<span className="text-[#ff6b35]">POINT</span>
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

          {/* Language Toggle + Mobile Menu Button */}
          <div className="flex items-center gap-3">
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
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
