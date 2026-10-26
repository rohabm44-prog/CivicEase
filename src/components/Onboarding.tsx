import React from 'react';
import { Volume2, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import { Language } from '../types';
import { speakText } from '../utils/speech';

interface OnboardingProps {
  onSelectLanguage: (lang: Language) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onSelectLanguage }) => {
  const speakEnglishPrompt = (e: React.MouseEvent) => {
    e.stopPropagation();
    speakText('Welcome to CivicEase. Click this card to continue in English.', 'en');
  };

  const speakUrduPrompt = (e: React.MouseEvent) => {
    e.stopPropagation();
    speakText('سیوک ایز میں خوش آمدید۔ اردو میں معلومات حاصل کرنے کے لیے اس کارڈ پر کلک کریں۔', 'ur');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between items-center px-4 py-8 sm:py-16 max-w-5xl mx-auto">
      {/* Top Quiet Trust Header */}
      <div className="w-full text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-medium mb-6 shadow-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Zero-Knowledge Privacy: Data never leaves your device</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">
          Welcome <span className="opacity-40 font-normal">/</span> خوش آمدید
        </h1>
        <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Calm, direct access to Pakistani government welfare gateways (BISP 8171, Himmat Card, NADRA) without middlemen.
        </p>
      </div>

      {/* Main 2 Large Selection Cards */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 my-8 max-w-4xl">
        {/* English Card */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => onSelectLanguage('en')}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelectLanguage('en')}
          className="group relative flex flex-col justify-between p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-emerald-600 dark:hover:border-emerald-500 shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer text-left focus-visible:ring-4 focus-visible:ring-emerald-500 min-h-[280px]"
        >
          <div className="flex items-start justify-between">
            <span className="text-xs font-semibold tracking-wider uppercase text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-900">
              Left-to-Right (LTR)
            </span>
            <button
              type="button"
              onClick={speakEnglishPrompt}
              className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-emerald-100 text-slate-600 dark:text-slate-300 hover:text-emerald-700 transition-colors"
              title="Listen in English"
              aria-label="Listen in English"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          <div className="my-6">
            <div className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">
              Continue in
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight group-hover:text-emerald-600 transition-colors">
              ENGLISH
            </div>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              Accessible typography, plain explanations, and bionic reading assistance.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span>Enter English Workspace</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Urdu Card */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => onSelectLanguage('ur')}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelectLanguage('ur')}
          dir="rtl"
          className="group relative flex flex-col justify-between p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-emerald-600 dark:hover:border-emerald-500 shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer text-right focus-visible:ring-4 focus-visible:ring-emerald-500 min-h-[280px]"
        >
          <div className="flex items-start justify-between">
            <span className="text-xs font-semibold tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-900">
              دائیں سے بائیں (RTL)
            </span>
            <button
              type="button"
              onClick={speakUrduPrompt}
              className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-emerald-100 text-slate-600 dark:text-slate-300 hover:text-emerald-700 transition-colors"
              title="اردو میں سنیں"
              aria-label="اردو میں سنیں"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          <div className="my-6">
            <div className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">
              اردو میں آگے
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight group-hover:text-emerald-600 transition-colors font-urdu-clean">
              بڑھیں
            </div>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 font-urdu-clean leading-relaxed">
              سادہ روزمرہ اردو، بڑا اور واضح رسم الخط، اور مرحلہ وار مکمل رہنمائی۔
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span>اردو پورٹل کھولیں</span>
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Bottom Privacy Reassurance */}
      <div className="text-center text-xs text-slate-500 dark:text-slate-400 max-w-lg">
        <p>
          No logins, no passwords, and zero cookies required. All verifications happen on your browser.
        </p>
      </div>
    </div>
  );
};
