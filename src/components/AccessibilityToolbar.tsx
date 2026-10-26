import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Type,
  SunMoon,
  Eye,
  BookOpen,
  Sparkles,
  Maximize2,
  Layers,
  Check
} from 'lucide-react';
import { AccessibilitySettings, ContrastTheme, TextScale, FontMode } from '../types';
import { stopSpeech, isSpeaking, speakText } from '../utils/speech';

interface AccessibilityToolbarProps {
  settings: AccessibilitySettings;
  onUpdateSettings: (updater: (prev: AccessibilitySettings) => AccessibilitySettings) => void;
  activeScreenTitle?: string;
  activeScreenContent?: string;
}

export const AccessibilityToolbar: React.FC<AccessibilityToolbarProps> = ({
  settings,
  onUpdateSettings,
  activeScreenTitle,
  activeScreenContent,
}) => {
  const [speaking, setSpeaking] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const isUrdu = settings.language === 'ur';

  // Keep speaking status synchronized
  useEffect(() => {
    const interval = setInterval(() => {
      setSpeaking(isSpeaking());
    }, 250);
    return () => clearInterval(interval);
  }, []);

  const handleToggleSpeech = () => {
    if (speaking) {
      stopSpeech();
      setSpeaking(false);
    } else {
      const textToRead = `${activeScreenTitle || 'CivicEase'}. ${activeScreenContent || ''}`;
      speakText(
        textToRead,
        settings.language,
        settings.voiceTtsSpeed,
        () => setSpeaking(false),
        () => setSpeaking(false)
      );
      setSpeaking(true);
    }
  };

  const cycleTextScale = () => {
    const scales: TextScale[] = ['normal', 'large', 'xlarge'];
    const currentIndex = scales.indexOf(settings.textScale);
    const nextScale = scales[(currentIndex + 1) % scales.length];
    onUpdateSettings((prev) => ({
      ...prev,
      textScale: nextScale,
    }));
  };

  const cycleContrastTheme = () => {
    const themes: ContrastTheme[] = ['standard', 'high-contrast-dark', 'glare-free', 'high-contrast-light'];
    const currentIndex = themes.indexOf(settings.contrastTheme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    onUpdateSettings((prev) => ({
      ...prev,
      contrastTheme: nextTheme,
    }));
  };

  const cycleFontMode = () => {
    const modes: FontMode[] = ['standard', 'bionic', 'opendyslexic'];
    const currentIndex = modes.indexOf(settings.fontMode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    onUpdateSettings((prev) => ({
      ...prev,
      fontMode: nextMode,
      bionicReading: nextMode === 'bionic',
    }));
  };

  const toggleFocusRuler = () => {
    onUpdateSettings((prev) => ({
      ...prev,
      focusRuler: !prev.focusRuler,
    }));
  };

  const toggleDeclutter = () => {
    onUpdateSettings((prev) => ({
      ...prev,
      declutter: !prev.declutter,
    }));
  };

  const togglePlainLanguage = () => {
    onUpdateSettings((prev) => ({
      ...prev,
      plainLanguage: !prev.plainLanguage,
    }));
  };

  return (
    <nav
      aria-label="Accessibility Dock"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 shadow-2xl transition-colors no-print"
    >
      <div className="max-w-5xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-1 sm:gap-2">
        {/* 1. Natural Voice Assistant */}
        <button
          onClick={handleToggleSpeech}
          className={`flex items-center gap-1.5 px-3 py-2 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all min-h-[46px] cursor-pointer ${
            speaking
              ? 'bg-emerald-600 text-white animate-pulse shadow-md'
              : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 border border-emerald-200 dark:border-emerald-800'
          }`}
          title={isUrdu ? 'آواز میں سنیں یا روکیں' : 'Listen aloud / Stop voice reading'}
        >
          {speaking ? <VolumeX className="w-4 h-4 shrink-0" /> : <Volume2 className="w-4 h-4 shrink-0" />}
          <span className="whitespace-nowrap">
            {speaking
              ? (isUrdu ? 'آواز روکیں' : 'Stop')
              : (isUrdu ? 'سنیں' : 'Listen')}
          </span>
        </button>

        {/* 2. Text Size Super Scaling */}
        <button
          onClick={cycleTextScale}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors min-h-[46px] cursor-pointer"
          title={isUrdu ? 'تحریر کا سائز تبدیل کریں' : 'Change Text Size (16px / 20px / 24px+)'}
        >
          <Type className="w-4 h-4 shrink-0 text-emerald-600" />
          <span className="hidden sm:inline">{isUrdu ? 'سائز:' : 'Size:'}</span>
          <span className="font-mono text-xs uppercase px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
            {settings.textScale === 'normal' ? '1x' : settings.textScale === 'large' ? '1.25x' : '1.5x'}
          </span>
        </button>

        {/* 3. Contrast Theme */}
        <button
          onClick={cycleContrastTheme}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors min-h-[46px] cursor-pointer"
          title={isUrdu ? 'کنٹراسٹ اور رنگ موڈ تبدیل کریں' : 'Toggle Contrast Theme (Standard / Dark Yellow / Glare-Free / Stark Light)'}
        >
          <SunMoon className="w-4 h-4 shrink-0 text-amber-500" />
          <span className="hidden sm:inline">{isUrdu ? 'رنگ:' : 'Theme'}</span>
          <span className="w-3 h-3 rounded-full border border-slate-400 shrink-0"
            style={{
              backgroundColor:
                settings.contrastTheme === 'high-contrast-dark'
                  ? '#ffff00'
                  : settings.contrastTheme === 'glare-free'
                  ? '#e2d7bd'
                  : settings.contrastTheme === 'high-contrast-light'
                  ? '#ffffff'
                  : '#059669',
            }}
          />
        </button>

        {/* 4. Focus Ruler */}
        <button
          onClick={toggleFocusRuler}
          className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors min-h-[46px] cursor-pointer ${
            settings.focusRuler
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200'
          }`}
          title={isUrdu ? 'فوکس رولر گائیڈ آن یا آف کریں' : 'Toggle Focus Reading Ruler Line'}
        >
          <Eye className="w-4 h-4 shrink-0" />
          <span className="hidden sm:inline">{isUrdu ? 'فوکس رولر' : 'Ruler'}</span>
        </button>

        {/* 5. Font Mode (Bionic / Dyslexic / Standard) */}
        <button
          onClick={cycleFontMode}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 transition-colors min-h-[46px] cursor-pointer"
          title={isUrdu ? 'فونٹ موڈ (بایونک / ڈسلیکسیا)' : 'Toggle Font: Standard / Bionic / OpenDyslexic (Lexend)'}
        >
          <BookOpen className="w-4 h-4 shrink-0 text-indigo-500" />
          <span className="hidden sm:inline">{isUrdu ? 'فونٹ:' : 'Font:'}</span>
          <span className="text-xs capitalize font-medium">
            {settings.fontMode === 'bionic'
              ? 'Bionic'
              : settings.fontMode === 'opendyslexic'
              ? 'Lexend'
              : 'Clean'}
          </span>
        </button>

        {/* 6. Plain Words / Jargon Simplifier */}
        <button
          onClick={togglePlainLanguage}
          className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors min-h-[46px] cursor-pointer ${
            settings.plainLanguage
              ? 'bg-purple-600 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200'
          }`}
          title={isUrdu ? 'سادہ آسان الفاظ موڈ آن یا آف کریں' : 'Toggle Plain-Language vs Official Jargon'}
        >
          <Sparkles className="w-4 h-4 shrink-0" />
          <span className="hidden md:inline">
            {settings.plainLanguage
              ? (isUrdu ? 'سادہ الفاظ: فعال' : 'Plain Words: On')
              : (isUrdu ? 'سادہ الفاظ' : 'Plain Words')}
          </span>
        </button>

        {/* 7. Visual De-clutter */}
        <button
          onClick={toggleDeclutter}
          className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors min-h-[46px] cursor-pointer ${
            settings.declutter
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
          }`}
          title={isUrdu ? 'بصری شور صاف کریں' : 'Visual De-clutter: Strip decorative noise'}
        >
          <Layers className="w-4 h-4 shrink-0" />
          <span className="hidden lg:inline">{isUrdu ? 'صفائی' : 'De-Clutter'}</span>
        </button>
      </div>
    </nav>
  );
};
