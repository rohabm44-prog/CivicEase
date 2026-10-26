import React from 'react';
import { ShieldCheck, Languages, Sparkles, RefreshCw } from 'lucide-react';
import { AccessibilitySettings, Language, AccessibilityProfile } from '../types';

interface HeaderProps {
  settings: AccessibilitySettings;
  onUpdateSettings: (updater: (prev: AccessibilitySettings) => AccessibilitySettings) => void;
  onResetLanguage: () => void;
  onResetService: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  onUpdateSettings,
  onResetLanguage,
  onResetService,
}) => {
  const isUrdu = settings.language === 'ur';

  const toggleLanguage = () => {
    onUpdateSettings((prev) => ({
      ...prev,
      language: prev.language === 'en' ? 'ur' : 'en',
    }));
  };

  const handleProfileSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const prof = e.target.value as AccessibilityProfile;
    onUpdateSettings((prev) => {
      if (prof === 'neuro-calm') {
        return {
          ...prev,
          profile: 'neuro-calm',
          declutter: true,
          bionicReading: true,
          focusRuler: true,
          plainLanguage: true,
          fontMode: 'bionic',
          contrastTheme: 'standard',
          textScale: 'normal',
          enlargedTouch: false,
        };
      }
      if (prof === 'simple-speak') {
        return {
          ...prev,
          profile: 'simple-speak',
          declutter: false,
          bionicReading: false,
          focusRuler: false,
          plainLanguage: true,
          fontMode: 'opendyslexic',
          contrastTheme: 'standard',
          textScale: 'large',
          enlargedTouch: true,
        };
      }
      if (prof === 'senior-sight') {
        return {
          ...prev,
          profile: 'senior-sight',
          declutter: true,
          bionicReading: false,
          focusRuler: false,
          plainLanguage: true,
          fontMode: 'standard',
          contrastTheme: 'high-contrast-dark',
          textScale: 'xlarge',
          enlargedTouch: true,
        };
      }
      return {
        ...prev,
        profile: 'custom',
        declutter: false,
        focusRuler: false,
        bionicReading: false,
        plainLanguage: false,
        contrastTheme: 'standard',
        textScale: 'normal',
        fontMode: 'standard',
      };
    });
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onResetService}
            className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white whitespace-nowrap hover:text-emerald-600 transition-colors cursor-pointer flex items-center gap-2"
          >
            <span>CivicEase</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-urdu-clean">
              {isUrdu ? 'سیوک ایز' : 'Portal'}
            </span>
          </button>

          {/* Privacy badge: Single unboxed status indicator */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 font-medium pl-3 border-l border-slate-200 dark:border-slate-700">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span className="whitespace-nowrap">
              {isUrdu
                ? '🔒 پرائیویسی لاک: ڈیٹا آپ کے فون پر محفوظ رہتا ہے'
                : '🔒 Privacy Lock: Your data stays on your device'}
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links / Profile Switcher */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <label htmlFor="profile-select" className="sr-only">
              {isUrdu ? 'خصوصی پروفائل' : 'Accessibility Profile'}
            </label>
            <span className="whitespace-nowrap font-semibold text-slate-700 dark:text-slate-200">
              {isUrdu ? 'پروفائل:' : 'Mode:'}
            </span>
            <select
              id="profile-select"
              value={settings.profile}
              onChange={handleProfileSelect}
              className="bg-transparent text-slate-900 dark:text-slate-100 font-medium focus:outline-none cursor-pointer"
            >
              <option value="custom" className="bg-white dark:bg-slate-900">
                {isUrdu ? 'معیاری (Standard)' : 'Standard Accessible'}
              </option>
              <option value="neuro-calm" className="bg-white dark:bg-slate-900">
                {isUrdu ? 'نیورو-کالم (Autism/ADHD)' : 'Neuro-Calm (Autism & ADHD)'}
              </option>
              <option value="simple-speak" className="bg-white dark:bg-slate-900">
                {isUrdu ? 'سادہ الفاظ (Dyslexia/Anxiety)' : 'Simple-Speak (Dyslexia)'}
              </option>
              <option value="senior-sight" className="bg-white dark:bg-slate-900">
                {isUrdu ? 'سینئر-سائٹ (24px+ High Contrast)' : 'Senior-Sight (Super Scaling)'}
              </option>
            </select>
          </div>
        </div>

        {/* Zone 3: Primary Action / Language Switcher */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Language Toggle: English | اردو */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-bold rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white hover:border-emerald-600 transition-colors whitespace-nowrap shadow-sm cursor-pointer"
            title={isUrdu ? 'Switch to English' : 'اردو میں پڑھیں'}
            aria-label="Switch Language"
          >
            <Languages className="w-4 h-4 text-emerald-600" />
            <span>{isUrdu ? 'English' : 'اردو'}</span>
          </button>

          {/* Reset button to go back to clean start */}
          <button
            onClick={onResetLanguage}
            className="p-2 text-slate-500 hover:text-slate-800 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={isUrdu ? 'شروع سے شروع کریں' : 'Restart / Choose Language'}
            aria-label="Restart"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
