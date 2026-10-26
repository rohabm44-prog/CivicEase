import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  MapPin,
  FileText,
  ShieldAlert,
  Volume2,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  PhoneCall,
  MessageSquare,
  Check
} from 'lucide-react';
import { VerificationResult, AccessibilitySettings, GuidanceStep } from '../types';
import { speakText } from '../utils/speech';
import { AccessibleText } from '../utils/bionic';
import { JargonTooltip } from './JargonTooltip';
import { WELFARE_SERVICES } from '../services/data';

interface GuidanceWizardProps {
  settings: AccessibilitySettings;
  result: VerificationResult;
  onReset: () => void;
  onBackToForm: () => void;
}

export const GuidanceWizard: React.FC<GuidanceWizardProps> = ({
  settings,
  result,
  onReset,
  onBackToForm,
}) => {
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const isUrdu = settings.language === 'ur';
  const totalSteps = result.steps.length;
  const currentStep: GuidanceStep = result.steps[currentStepIdx] || result.steps[0];
  const service = WELFARE_SERVICES.find((s) => s.id === result.serviceId) || WELFARE_SERVICES[0];

  const toggleCheckItem = (itemKey: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [itemKey]: !prev[itemKey],
    }));
  };

  const handleSpeakCurrentStep = () => {
    const title = isUrdu ? currentStep.titleUr : currentStep.titleEn;
    const summary = settings.plainLanguage
      ? (isUrdu ? currentStep.plainSummaryUr : currentStep.plainSummaryEn)
      : (isUrdu ? currentStep.summaryUr : currentStep.summaryEn);
    const location = isUrdu ? currentStep.locationUr : currentStep.locationEn;
    const warning = isUrdu ? currentStep.pitfallsWarningUr : currentStep.pitfallsWarningEn;

    const fullText = `${title}. ${summary}. Location: ${location}. Important warning: ${warning}`;
    speakText(fullText, settings.language, settings.voiceTtsSpeed);
  };

  const handleNext = () => {
    if (currentStepIdx < totalSteps - 1) {
      setCurrentStepIdx((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx((prev) => prev - 1);
    }
  };

  const stepTitle = isUrdu ? currentStep.titleUr : currentStep.titleEn;
  const stepSummary = settings.plainLanguage
    ? (isUrdu ? currentStep.plainSummaryUr : currentStep.plainSummaryEn)
    : (isUrdu ? currentStep.summaryUr : currentStep.summaryEn);
  const locationText = isUrdu ? currentStep.locationUr : currentStep.locationEn;
  const warningText = isUrdu ? currentStep.pitfallsWarningUr : currentStep.pitfallsWarningEn;
  const itemsList = isUrdu ? currentStep.itemsToBringUr : currentStep.itemsToBringEn;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Status Banner */}
      <div className="bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-300 dark:border-emerald-700 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-3 rounded-2xl bg-emerald-600 text-white shrink-0 mt-0.5">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider mb-1">
                <span>{isUrdu ? 'شناختی تصدیق مکمل' : 'Identity Verified Locally'}</span>
                <span>·</span>
                <span className="font-mono">{result.cnic}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                <AccessibleText isBionic={settings.bionicReading} isUrdu={isUrdu}>
                  {isUrdu ? result.titleUr : result.titleEn}
                </AccessibleText>
              </h2>
              {result.benefitAmountEn && (
                <div className="mt-2 text-lg sm:text-xl font-black text-emerald-700 dark:text-emerald-400">
                  {isUrdu ? result.benefitAmountUr : result.benefitAmountEn}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
            <button
              onClick={onBackToForm}
              className="px-4 py-2 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            >
              {isUrdu ? 'شناختی کارڈ بدلیں' : 'Change CNIC'}
            </button>
          </div>
        </div>

        {/* Bureaucratic vs Plain Language Explanation */}
        <div className="mt-4 pt-4 border-t border-emerald-200/60 dark:border-emerald-800/60 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <p>
            <AccessibleText isBionic={settings.bionicReading} isUrdu={isUrdu}>
              {settings.plainLanguage
                ? (isUrdu ? result.plainExplanationUr : result.plainExplanationEn)
                : (isUrdu ? result.officialJargonUr : result.officialJargonEn)}
            </AccessibleText>
          </p>
        </div>
      </div>

      {/* Step Indicator / Wizard Progress */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {isUrdu ? 'مرحلہ' : 'Step'} {currentStepIdx + 1} {isUrdu ? 'از' : 'of'} {totalSteps}
          </span>
          <div className="flex items-center gap-1.5 ml-2">
            {result.steps.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentStepIdx(idx)}
                aria-label={`Jump to step ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  idx === currentStepIdx
                    ? 'w-8 bg-emerald-600'
                    : 'w-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Audio read-aloud button for this step */}
        <button
          type="button"
          onClick={handleSpeakCurrentStep}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-100 hover:text-emerald-800 text-xs font-bold transition-colors cursor-pointer"
          title={isUrdu ? 'اس مرحلے کی تمام معلومات سنیں' : 'Listen to this step instructions'}
        >
          <Volume2 className="w-4 h-4 text-emerald-600" />
          <span>{isUrdu ? 'سنیں' : 'Listen'}</span>
        </button>
      </div>

      {/* ONE CARD AT A TIME: Stepped Guidance Card */}
      <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-md">
        {/* Step Title & Plain Summary */}
        <div className="mb-6">
          <div className="inline-block text-xs font-black px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 mb-2">
            {isUrdu ? `رہنمائی کارڈ #${currentStepIdx + 1}` : `Action Card #${currentStepIdx + 1}`}
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            <AccessibleText isBionic={settings.bionicReading} isUrdu={isUrdu}>
              {stepTitle}
            </AccessibleText>
          </h3>
          <p className="mt-2 text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            <AccessibleText isBionic={settings.bionicReading} isUrdu={isUrdu}>
              {stepSummary}
            </AccessibleText>
          </p>
        </div>

        {/* 2-Column Info: Where to Go & What to Bring */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          {/* Where to Go */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm sm:text-base mb-3">
              <MapPin className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{isUrdu ? 'کہاں جانا ہے؟ (مقام)' : 'Where to Go (Physical Location)'}</span>
            </div>
            <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-200 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
              <AccessibleText isBionic={settings.bionicReading} isUrdu={isUrdu}>
                {locationText}
              </AccessibleText>
            </p>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              {isUrdu
                ? 'کسی بھی مدد کے لیے صرف سرکاری کاؤنٹر پر یونیفارم یا بیج والے اہلکار سے بات کریں۔'
                : 'Only speak with officially badged government staff at designated counters.'}
            </p>
          </div>

          {/* What to Bring Interactive Checklist */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm sm:text-base mb-3">
              <FileText className="w-5 h-5 text-indigo-600 shrink-0" />
              <span>{isUrdu ? 'ساتھ کیا لے کر جانا ہے؟ (چیک لسٹ)' : 'What to Bring with You (Checklist)'}</span>
            </div>
            <ul className="space-y-2">
              {itemsList.map((item, idx) => {
                const itemKey = `step-${currentStepIdx}-item-${idx}`;
                const isChecked = !!checkedItems[itemKey];

                return (
                  <li
                    key={idx}
                    onClick={() => toggleCheckItem(itemKey)}
                    className={`flex items-start gap-2.5 p-2.5 rounded-xl border transition-colors cursor-pointer text-xs sm:text-sm ${
                      isChecked
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-slate-900 dark:text-white line-through opacity-75'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border mt-0.5 ${
                        isChecked
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'border-slate-400 bg-transparent'
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <span>
                      <AccessibleText isBionic={settings.bionicReading} isUrdu={isUrdu}>
                        {item}
                      </AccessibleText>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Fraud / Middlemen Defense Alert Card */}
        <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-700">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm sm:text-base font-extrabold text-amber-900 dark:text-amber-200">
                {isUrdu ? 'وارننگ: کسی ایجنٹ یا دکاندار کو کوئی کٹوتی نہ دیں!' : 'Protective Warning: Never Pay Middlemen Fees'}
              </h4>
              <p className="mt-1 text-xs sm:text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
                <AccessibleText isBionic={settings.bionicReading} isUrdu={isUrdu}>
                  {warningText}
                </AccessibleText>
              </p>
            </div>
          </div>
        </div>

        {/* Step Navigation Controls */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStepIdx === 0}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm sm:text-base border transition-all cursor-pointer min-h-[52px] ${
              currentStepIdx === 0
                ? 'opacity-30 cursor-not-allowed border-slate-200 text-slate-400'
                : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-100'
            }`}
          >
            {isUrdu ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
            <span>{isUrdu ? 'پچھلا مرحلہ' : 'Previous Step'}</span>
          </button>

          {currentStepIdx < totalSteps - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl font-extrabold text-sm sm:text-base bg-emerald-600 hover:bg-emerald-700 text-white shadow-md active:scale-95 transition-all cursor-pointer min-h-[52px]"
            >
              <span>{isUrdu ? 'اگلا مرحلہ' : 'Next Step'}</span>
              {isUrdu ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
            </button>
          ) : (
            <button
              type="button"
              onClick={onReset}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl font-extrabold text-sm sm:text-base bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 shadow-md active:scale-95 transition-all cursor-pointer min-h-[52px]"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{isUrdu ? 'شروع سے دوبارہ دیکھیں' : 'Finish / Start Over'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Official Hotlines & SMS Verification Bar */}
      <div className="bg-slate-100 dark:bg-slate-800/80 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-bold">
          <PhoneCall className="w-4 h-4 text-emerald-600" />
          <span>
            {isUrdu
              ? `سرکاری ہیلپ لائن: ${service.helpline}`
              : `Official Toll-Free Helpline: ${service.helpline}`}
          </span>
        </div>
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-bold">
          <MessageSquare className="w-4 h-4 text-emerald-600" />
          <span>
            {isUrdu
              ? `ایس ایم ایس کوڈ: اپنے شناختی کارڈ کے ساتھ ${service.smsCode} پر مفت بھیجیں`
              : `Official SMS Code: Send CNIC to ${service.smsCode} for free status`}
          </span>
        </div>
      </div>
    </div>
  );
};
