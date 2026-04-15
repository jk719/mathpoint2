'use client';

import { ArrowRight, CheckCircle, Users, GraduationCap, UserCheck, Sparkles, Video, Target, BookOpen, TrendingUp, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n/LanguageContext';
import { useAuthStore } from '@/lib/stores/authStore';

export default function Home() {
  const router = useRouter();
  const { t } = useTranslation();
  const { isLoggedIn } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 px-4 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff6b35]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#1a3a52]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto max-w-5xl relative">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff6b35]/10 rounded-full text-[#ff6b35] text-sm font-semibold mb-6"
            >
              <Sparkles className="w-4 h-4" />
              {t('home.badge')}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight"
            >
              {t('home.heroTitle')}
              <span className="block mt-2 text-[#ff6b35]">
                {t('home.heroSubtitle')}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-10"
            >
              {t('home.heroDescription')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center gap-3 mb-8"
            >
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => router.push(isLoggedIn ? '/dashboard' : '/diagnostic')}
                  className="group inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#ff6b35] text-white rounded-xl font-semibold text-lg shadow-lg hover:bg-[#e55a2a] transform hover:-translate-y-0.5 transition-all duration-200 w-full sm:w-auto"
                >
                  {t('home.startDiagnostic')}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => router.push('/login')}
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1a3a52] text-white rounded-xl font-semibold text-lg shadow-lg hover:bg-[#152e42] transform hover:-translate-y-0.5 transition-all duration-200 w-full sm:w-auto"
                >
                  {t('home.parentLogin')}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <button
                onClick={() => router.push('/login')}
                className="text-sm text-gray-500 hover:text-[#ff6b35] transition-colors underline underline-offset-2"
              >
                {t('home.loginLink')}
              </button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-sm text-gray-500"
            >
              {t('home.noAccount')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 bg-[#1a3a52]">
        <div className="container mx-auto max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6"
          >
            {[
              { value: t('home.stat1'), label: t('home.stat1Label') },
              { value: t('home.stat2'), label: t('home.stat2Label') },
              { value: t('home.stat3'), label: t('home.stat3Label') },
              { value: t('home.stat4'), label: t('home.stat4Label') },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-black text-white">{stat.value}</div>
                <div className="text-sm text-gray-300 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-5xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('home.howItWorks')}
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">{t('home.howItWorksDesc')}</p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-4 sm:gap-8">
            {[
              { num: 1, title: t('home.step1Title'), desc: t('home.step1Desc'), icon: Target, color: 'bg-blue-100 text-blue-600' },
              { num: 2, title: t('home.step2Title'), desc: t('home.step2Desc'), icon: Sparkles, color: 'bg-orange-100 text-[#ff6b35]' },
              { num: 3, title: t('home.step3Title'), desc: t('home.step3Desc'), icon: TrendingUp, color: 'bg-green-100 text-green-600' },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-50 rounded-2xl p-8 text-center relative"
              >
                <div className={`w-14 h-14 ${step.color} rounded-xl flex items-center justify-center mx-auto mb-6`}>
                  <step.icon className="w-7 h-7" />
                </div>
                <div className="absolute top-4 right-4 text-5xl font-black text-gray-100">{step.num}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* For Parents / Students / Tutors */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto max-w-5xl px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-16 text-center"
          >
            {t('home.trustedBy')}
          </motion.h2>

          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {[
              { title: t('home.forParentsTitle'), desc: t('home.forParentsDesc'), icon: Users, color: 'border-green-500', iconBg: 'bg-green-100', iconColor: 'text-green-600', features: [t('home.parentFeat1'), t('home.parentFeat2'), t('home.parentFeat3'), t('home.parentFeat4')] },
              { title: t('home.forStudentsTitle'), desc: t('home.forStudentsDesc'), icon: GraduationCap, color: 'border-blue-500', iconBg: 'bg-blue-100', iconColor: 'text-blue-600', features: [t('home.studentFeat1'), t('home.studentFeat2'), t('home.studentFeat3'), t('home.studentFeat4')] },
              { title: t('home.forTutorsTitle'), desc: t('home.forTutorsDesc'), icon: UserCheck, color: 'border-[#ff6b35]', iconBg: 'bg-orange-100', iconColor: 'text-[#ff6b35]', features: [t('home.tutorFeat1'), t('home.tutorFeat2'), t('home.tutorFeat3'), t('home.tutorFeat4')] },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-white rounded-2xl p-8 shadow-sm border-t-4 ${card.color}`}
              >
                <div className={`w-12 h-12 ${card.iconBg} rounded-xl flex items-center justify-center mb-5`}>
                  <card.icon className={`w-6 h-6 ${card.iconColor}`} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{card.title}</h3>
                <p className="text-gray-600 text-sm mb-5">{card.desc}</p>
                <ul className="space-y-2">
                  {card.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-5xl px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-16 text-center"
          >
            {t('home.everythingTitle')}
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Target, title: t('home.feat1Title'), desc: t('home.feat1Desc'), color: 'text-blue-600' },
              { icon: Sparkles, title: t('home.feat2Title'), desc: t('home.feat2Desc'), color: 'text-[#ff6b35]' },
              { icon: Video, title: t('home.feat3Title'), desc: t('home.feat3Desc'), color: 'text-green-600' },
              { icon: BookOpen, title: t('home.feat4Title'), desc: t('home.feat4Desc'), color: 'text-purple-600' },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <feature.icon className={`w-8 h-8 ${feature.color} mb-4`} />
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial / Social Proof */}
      <section className="py-20 bg-[#1a3a52]">
        <div className="container mx-auto max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="flex justify-center gap-1 mb-6">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />)}
            </div>
            <blockquote className="text-xl sm:text-2xl text-white font-medium leading-relaxed mb-6 italic">
              &ldquo;{t('home.testimonial')}&rdquo;
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">{t('home.testimonialName')[0]}</div>
              <div className="text-left">
                <div className="text-white font-medium">{t('home.testimonialName')}</div>
                <div className="text-gray-400 text-sm">{t('home.testimonialRole')}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-2xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('home.finalCtaTitle')}
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              {t('home.finalCtaDesc')}
            </p>
            <button
              onClick={() => router.push(isLoggedIn ? '/dashboard' : '/diagnostic')}
              className="group inline-flex items-center justify-center gap-2 px-6 sm:px-10 py-4 sm:py-5 bg-[#ff6b35] text-white rounded-xl font-semibold text-lg sm:text-xl shadow-xl hover:bg-[#e55a2a] transform hover:-translate-y-1 transition-all duration-200"
            >
              {t('home.getStarted')}
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
