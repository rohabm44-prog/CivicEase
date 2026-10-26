import React from 'react';
import { Banknote, HeartHandshake, ShieldCheck, Volume2, ArrowRight, ArrowLeft } from 'lucide-react';
import { WelfareService, ServiceId, AccessibilitySettings } from '../types';
import { WELFARE_SERVICES } from '../services/data';
import { speakText } from '../utils/speech';
import { AccessibleText } from '../utils/bionic';

interface ServiceSelectorProps {
  settings: AccessibilitySettings;
  selectedService: ServiceId | null;
  onSelectService: (serviceId: ServiceId) => void;
}

export const ServiceSelector: React.FC<ServiceSelectorProps> = ({
  settings,
  selectedService,
  onSelectService,
}) => {
  const isUrdu = settings.language === 'ur';

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Banknote':
        return <Banknote className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-8 h-8 text-amber-600 dark:text-amber-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-8 h-8 text-sky-600 dark:text-sky-400" />;
      default:
        return <ShieldCheck className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />;
    }
  };

  const handleSpeakService = (e: React.MouseEvent, service: WelfareService) => {
    e.stopPropagation();
    const title = isUrdu ? service.nameUr : service.nameEn;
    const desc = isUrdu ? service.shortDescUr : service.shortDescEn;
    speakText(`${title}. ${desc}`, settings.language, settings.voiceTtsSpeed);
  };

  return (
    <section aria-labelledby="service-heading" className="w-full">
      <div className="mb-6">
        <h2
          id="service-heading"
          className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white"
        >
          <AccessibleText isBionic={settings.bionicReading} isUrdu={isUrdu}>
            {isUrdu ? 'مرحلہ 1: سرکاری سہولت کا انتخاب کریں' : 'Step 1: Choose Government Service'}
          </AccessibleText>
        </h2>
        <p className="mt-1 text-sm sm:text-base text-slate-600 dark:text-slate-300">
          <AccessibleText isBionic={settings.bionicReading} isUrdu={isUrdu}>
            {isUrdu
              ? 'جس پروگرام کی معلومات یا تصدیق درکار ہے اس کارڈ پر کلک کریں:'
              : 'Tap the service you need guidance or eligibility status for:'}
          </AccessibleText>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {WELFARE_SERVICES.map((service) => {
          const isSelected = selectedService === service.id;
          const title = isUrdu ? service.nameUr : service.nameEn;
          const tagline = isUrdu ? service.taglineUr : service.taglineEn;
          const desc = isUrdu ? service.shortDescUr : service.shortDescEn;

          return (
            <div
              key={service.id}
              role="button"
              tabIndex={0}
              onClick={() => onSelectService(service.id)}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelectService(service.id)}
              className={`relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl border-2 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-lg focus-visible:ring-4 focus-visible:ring-emerald-500 min-h-[290px] ${
                isSelected
                  ? 'bg-emerald-50/50 dark:bg-emerald-950/40 border-emerald-600 dark:border-emerald-400 ring-2 ring-emerald-500/30'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-400'
              }`}
            >
              {/* Card Header: Icon & Audio */}
              <div className="flex items-start justify-between">
                <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  {getIcon(service.iconName)}
                </div>
                <button
                  type="button"
                  onClick={(e) => handleSpeakService(e, service)}
                  className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-emerald-100 text-slate-600 dark:text-slate-300 hover:text-emerald-700 transition-colors"
                  title={isUrdu ? 'آواز میں سنیں' : 'Listen aloud'}
                  aria-label={isUrdu ? 'کارڈ کی تفصیل سنیں' : 'Listen to card description'}
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              {/* Card Body */}
              <div className="my-4">
                <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-1">
                  {tagline}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  <AccessibleText isBionic={settings.bionicReading} isUrdu={isUrdu}>
                    {title}
                  </AccessibleText>
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  <AccessibleText isBionic={settings.bionicReading} isUrdu={isUrdu}>
                    {desc}
                  </AccessibleText>
                </p>
              </div>

              {/* Card Footer: Metadata and action button */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5 font-mono">
                  <span>SMS: {service.smsCode}</span>
                  <span>·</span>
                  <span>Helpline: {service.helpline}</span>
                </div>
                <div className="flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400">
                  <span>{isUrdu ? 'منتخب کریں' : 'Select'}</span>
                  {isUrdu ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
