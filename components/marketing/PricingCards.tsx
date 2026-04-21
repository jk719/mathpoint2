'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Sparkles, Crown, GraduationCap, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/lib/i18n/LanguageContext';

interface PricingCardsProps {
  onSelectFree?: () => void;
}

export function PricingCards({ onSelectFree }: PricingCardsProps) {
  const { t } = useTranslation();
  const router = useRouter();

  const handleFree = onSelectFree ?? (() => router.push('/diagnostic'));
  const handlePaid = () => router.push('/login');

  const tiers = [
    {
      key: 'free',
      icon: Sparkles,
      iconColor: 'text-[#ff6b35]',
      name: t('pricing.freeName'),
      price: t('pricing.freePrice'),
      per: '',
      tagline: t('pricing.freeTagline'),
      bullets: [
        t('pricing.freeBullet1'),
        t('pricing.freeBullet2'),
        t('pricing.freeBullet3'),
        t('pricing.freeBullet4'),
      ],
      cta: t('pricing.getStarted'),
      onClick: handleFree,
      highlighted: false,
      ctaClass: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    },
    {
      key: 'plus',
      icon: Zap,
      iconColor: 'text-blue-600',
      name: t('pricing.plusName'),
      price: t('pricing.plusPrice'),
      per: t('pricing.perMonth'),
      tagline: t('pricing.plusTagline'),
      bullets: [
        t('pricing.plusBullet1'),
        t('pricing.plusBullet2'),
        t('pricing.plusBullet3'),
        t('pricing.plusBullet4'),
        t('pricing.plusBullet5'),
      ],
      cta: t('pricing.getStarted'),
      onClick: handlePaid,
      highlighted: false,
      ctaClass: 'bg-[#1a3a52] text-white hover:bg-[#152e42]',
    },
    {
      key: 'premier',
      icon: GraduationCap,
      iconColor: 'text-[#ff6b35]',
      name: t('pricing.premierName'),
      price: t('pricing.premierPrice'),
      per: t('pricing.perMonth'),
      tagline: t('pricing.premierTagline'),
      bullets: [
        t('pricing.premierBullet1'),
        t('pricing.premierBullet2'),
        t('pricing.premierBullet3'),
        t('pricing.premierBullet4'),
        t('pricing.premierBullet5'),
      ],
      cta: t('pricing.getStarted'),
      onClick: handlePaid,
      highlighted: true,
      ctaClass: 'bg-[#ff6b35] text-white hover:bg-[#e55a2a]',
    },
    {
      key: 'elite',
      icon: Crown,
      iconColor: 'text-amber-500',
      name: t('pricing.eliteName'),
      price: t('pricing.elitePrice'),
      per: t('pricing.perMonth'),
      tagline: t('pricing.eliteTagline'),
      bullets: [
        t('pricing.eliteBullet1'),
        t('pricing.eliteBullet2'),
        t('pricing.eliteBullet3'),
        t('pricing.eliteBullet4'),
        t('pricing.eliteBullet5'),
      ],
      cta: t('pricing.contactSales'),
      onClick: handlePaid,
      highlighted: false,
      ctaClass: 'bg-[#1a3a52] text-white hover:bg-[#152e42]',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {tiers.map((tier, i) => {
        const Icon = tier.icon;
        return (
          <motion.div
            key={tier.key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className={`relative rounded-2xl p-6 flex flex-col ${
              tier.highlighted
                ? 'bg-white border-2 border-[#ff6b35] shadow-xl scale-[1.02]'
                : 'bg-white border border-gray-200 shadow-sm'
            }`}
          >
            {tier.highlighted && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#ff6b35] text-white text-xs font-semibold rounded-full shadow-md">
                {t('pricing.mostPopular')}
              </div>
            )}

            <div className="flex items-center gap-2 mb-3">
              <Icon className={`w-5 h-5 ${tier.iconColor}`} />
              <h3 className="text-lg font-bold text-gray-900">{tier.name}</h3>
            </div>

            <div className="mb-3">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-gray-900">{tier.price}</span>
                {tier.per && <span className="text-gray-500 text-sm font-medium">{tier.per}</span>}
              </div>
              {tier.per && (
                <p className="text-xs text-gray-400 mt-1">{t('pricing.billedMonthly')}</p>
              )}
            </div>

            <p className="text-sm text-gray-600 mb-5 min-h-[40px] leading-relaxed">
              {tier.tagline}
            </p>

            <ul className="space-y-2.5 mb-6 flex-1">
              {tier.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={tier.onClick}
              className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-colors ${tier.ctaClass}`}
            >
              {tier.cta}
            </button>
          </motion.div>
        );
      })}
    </div>
  );
}
