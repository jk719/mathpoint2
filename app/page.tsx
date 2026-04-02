'use client';

import { Award, ArrowRight, Clock, TrendingUp, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/lib/i18n/LanguageContext';

export default function Home() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Hero Text */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              {t('home.heroTitle')}
              <span className="block mt-2 text-[#ff6b35]">
                {t('home.heroSubtitle')}
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {t('home.heroDescription')}
            </p>
          </div>

          {/* Main CTA Card */}
          <div className="max-w-xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-t-4 border-[#ff6b35]">
              <div className="p-8">
                  {/* Stats */}
                  <div className="flex justify-center gap-8 mb-8">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1.5 mb-1">
                        <Clock className="w-4 h-4 text-[#ff6b35]" />
                        <span className="text-2xl font-bold text-gray-900">5-10</span>
                      </div>
                      <span className="text-sm text-gray-500">{t('common.minutes')}</span>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1.5 mb-1">
                        <TrendingUp className="w-4 h-4 text-[#1a3a52]" />
                        <span className="text-2xl font-bold text-gray-900">{t('common.adaptive')}</span>
                      </div>
                      <span className="text-sm text-gray-500">{t('common.questions')}</span>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1.5 mb-1">
                        <Award className="w-4 h-4 text-[#ff6b35]" />
                        <span className="text-2xl font-bold text-gray-900">{t('home.free')}</span>
                      </div>
                      <span className="text-sm text-gray-500">{t('home.always')}</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => router.push('/diagnostic')}
                    className="group w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#ff6b35] text-white rounded-xl font-semibold text-lg shadow-lg hover:bg-[#e55a2a] transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    {t('home.startFree')}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <p className="text-center text-sm text-gray-500 mt-4">
                    {t('home.noAccount')}
                  </p>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-16 text-center">
            {t('home.howItWorks')}
          </h2>

          <div className="grid sm:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-14 h-14 bg-[#ff6b35] rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl shadow-lg">1</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{t('home.step1Title')}</h3>
              <p className="text-gray-600 leading-relaxed">{t('home.step1Desc')}</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-[#ff6b35] rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl shadow-lg">2</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{t('home.step2Title')}</h3>
              <p className="text-gray-600 leading-relaxed">{t('home.step2Desc')}</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-[#ff6b35] rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl shadow-lg">3</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{t('home.step3Title')}</h3>
              <p className="text-gray-600 leading-relaxed">{t('home.step3Desc')}</p>
            </div>
          </div>

          <div className="text-center mt-16">
            <button
              onClick={() => router.push('/diagnostic')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
            >
              {t('home.getStarted')}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Topics Covered */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto max-w-2xl px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10 text-center">
            {t('home.topicsCovered')}
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {['Maki Rolls', 'Uramaki (Inside-Out)', 'Temaki (Hand Rolls)', 'Knife Skills & Presentation'].map((topic) => (
              <div key={topic} className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
                <CheckCircle className="w-5 h-5 text-[#ff6b35] flex-shrink-0" />
                <span className="text-gray-700 font-medium">{topic}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
