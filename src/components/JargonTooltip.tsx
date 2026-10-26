import React, { useState } from 'react';
import { HelpCircle, Volume2, X } from 'lucide-react';
import { JARGON_DICTIONARY } from '../i18n/translations';
import { Language } from '../types';
import { speakText } from '../utils/speech';

interface JargonTooltipProps {
  termKey: keyof typeof JARGON_DICTIONARY;
  lang: Language;
  children?: React.ReactNode;
}

export const JargonTooltip: React.FC<JargonTooltipProps> = ({ termKey, lang, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const data = JARGON_DICTIONARY[termKey];

  if (!data) return <>{children}</>;

  const termText = lang === 'ur' ? data.termUr : data.termEn;
  const plainText = lang === 'ur' ? data.plainUr : data.plainEn;

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    speakText(`${termText}. ${plainText}`, lang);
  };

  return (
    <span className="relative inline-block">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1 underline decoration-dotted decoration-emerald-600 underline-offset-4 font-semibold text-emerald-800 dark:text-emerald-300 hover:text-emerald-950 cursor-pointer text-inherit"
        title={lang === 'ur' ? 'آسان الفاظ میں مطلب دیکھیں' : 'Click to see plain-English definition'}
        aria-expanded={isOpen}
      >
        <span>{children || termText}</span>
        <HelpCircle className="w-3.5 h-3.5 opacity-70" />
      </button>

      {isOpen && (
        <div
          className={`absolute z-40 bottom-full mb-2 w-72 sm:w-80 p-3.5 rounded-xl shadow-xl border text-sm text-left ${
            lang === 'ur' ? 'right-0 text-right' : 'left-0'
          } bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100`}
          role="dialog"
          aria-label="Jargon Buster definition"
        >
          <div className="flex items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 mb-2">
            <span className="font-bold text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              {lang === 'ur' ? 'آسان لغت (Jargon Buster)' : 'Plain Definition'}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleSpeak}
                className="p-1 text-slate-500 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
                title={lang === 'ur' ? 'آواز میں سنیں' : 'Listen to definition'}
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
                title={lang === 'ur' ? 'بند کریں' : 'Close'}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="font-semibold text-xs text-slate-500 dark:text-slate-400 mb-1">
            {termText}
          </div>
          <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            {plainText}
          </p>
        </div>
      )}
    </span>
  );
};
