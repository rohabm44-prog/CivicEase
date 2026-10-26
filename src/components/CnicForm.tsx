import React, { useState, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Info
} from 'lucide-react';
import { AccessibilitySettings, ServiceId } from '../types';
import { WELFARE_SERVICES, DEMO_CNICS } from '../services/data';
import { formatCnicString, parseSpokenCnic, speakText } from '../utils/speech';
import { AccessibleText } from '../utils/bionic';
import { JargonTooltip } from './JargonTooltip';

interface CnicFormProps {
  settings: AccessibilitySettings;
  selectedService: ServiceId;
  cnic: string;
  onChangeCnic: (val: string) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export const CnicForm: React.FC<CnicFormProps> = ({
  settings,
  selectedService,
  cnic,
  onChangeCnic,
  onSubmit,
  onBack,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [voiceNotice, setVoiceNotice] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isUrdu = settings.language === 'ur';
  const service = WELFARE_SERVICES.find((s) => s.id === selectedService) || WELFARE_SERVICES[0];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCnicString(e.target.value);
    onChangeCnic(formatted);
    if (errorMsg) setErrorMsg(null);
  };

  const handleListenInstructions = () => {
    const prompt = isUrdu
      ? `براہ کرم اپنا 13 ہندسوں پر مشتمل قومی شناختی کارڈ نمبر درج کریں۔ آپ کا ڈیٹا صرف آپ کے فون پر رہتا ہے اور انٹرنیٹ پر نہیں بھیجا جاتا۔`
      : `Please enter your 13-digit Computerized National Identity Card number. Your data stays strictly on your device and is never sent to any server.`;
    speakText(prompt, settings.language, settings.voiceTtsSpeed);
  };

  // Web Speech Recognition for Dictation
  const handleToggleVoiceDictation = () => {
    if (isListening) {
      setIsListening(false);
      setVoiceNotice(null);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      // Graceful fallback for restricted iframe or browsers without SpeechRecognition
      const fallbackPrompt = isUrdu
        ? 'مائیکروفون اس براؤزر میں محدود ہے، نمونہ کارڈز سے ٹیسٹ کریں یا خود ٹائپ کریں۔'
        : 'Microphone speech recognition is not permitted in this frame. Use the 1-click test personas below or type digits.';
      setVoiceNotice(fallbackPrompt);
      speakText(fallbackPrompt, settings.language);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = isUrdu ? 'ur-PK' : 'en-US';
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceNotice(
          isUrdu ? 'آواز سن رہے ہیں... ہندسے بولیں' : 'Listening... Speak digits slowly'
        );
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        const parsedDigits = parseSpokenCnic(transcript);
        if (parsedDigits) {
          onChangeCnic(formatCnicString(parsedDigits));
        }
      };

      recognition.onerror = (e: any) => {
        console.warn('Speech recognition error:', e);
        setIsListening(false);
        setVoiceNotice(
          isUrdu
            ? 'مائیکروفون کی اجازت نہیں ملی۔ براہ کرم نیچے دیے گئے نمونہ کارڈز آزمائیں۔'
            : 'Microphone access restricted. You can tap the sample test personas below.'
        );
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.warn('Could not start speech recognition:', err);
      setIsListening(false);
    }
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const digits = cnic.replace(/\D/g, '');
    if (digits.length !== 13) {
      const err = isUrdu
        ? 'شناختی کارڈ نمبر لازمی طور پر 13 ہندسوں پر مشتمل ہونا چاہیے۔'
        : 'CNIC number must be exactly 13 digits (e.g. 35201-1234567-1).';
      setErrorMsg(err);
      speakText(err, settings.language);
      return;
    }
    onSubmit();
  };

  const handleSelectDemo = (demoCnic: string) => {
    onChangeCnic(demoCnic);
    setErrorMsg(null);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Navigation Kicker */}
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
        >
          {isUrdu ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>{isUrdu ? 'سروس کا انتخاب بدلیں' : 'Change Service Selection'}</span>
        </button>

        <span className="text-xs font-mono uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
          {isUrdu ? service.nameUr : service.nameEn}
        </span>
      </div>

      <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm">
        {/* Title & Speech instructions */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              <AccessibleText isBionic={settings.bionicReading} isUrdu={isUrdu}>
                {isUrdu ? 'مرحلہ 2: شناختی معلومات درج کریں' : 'Step 2: Enter Identity Information'}
              </AccessibleText>
            </h2>
            <p className="mt-1 text-sm sm:text-base text-slate-600 dark:text-slate-300">
              <AccessibleText isBionic={settings.bionicReading} isUrdu={isUrdu}>
                {isUrdu
                  ? 'اپنا 13 ہندسوں کا قومی شناختی کارڈ نمبر درج کریں:'
                  : 'Enter your 13-digit Computerized National Identity Card (CNIC) number:'}
              </AccessibleText>
            </p>
          </div>

          <button
            type="button"
            onClick={handleListenInstructions}
            className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 border border-emerald-200 dark:border-emerald-800 transition-colors shrink-0 cursor-pointer"
            title={isUrdu ? 'ہدایات آواز میں سنیں' : 'Listen to instructions aloud'}
            aria-label={isUrdu ? 'ہدایات آواز میں سنیں' : 'Listen to instructions'}
          >
            <Volume2 className="w-6 h-6" />
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmitForm} className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="cnic-input"
                className="block text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100"
              >
                {isUrdu ? 'قومی شناختی کارڈ (CNIC)' : 'CNIC Number'}
              </label>

              {/* Jargon Buster link for CNIC / Identity */}
              <JargonTooltip termKey="biometric" lang={settings.language}>
                {isUrdu ? 'بایومیٹرک کیا ہے؟' : 'What is Biometrics?'}
              </JargonTooltip>
            </div>

            <div className="relative flex items-center">
              <input
                id="cnic-input"
                type="text"
                inputMode="numeric"
                value={cnic}
                onChange={handleInputChange}
                placeholder={isUrdu ? '35201-1234567-1' : '35201-1234567-1'}
                maxLength={15}
                autoFocus
                className={`w-full px-5 py-4 rounded-2xl border-2 font-mono text-xl sm:text-2xl tracking-wider transition-all focus:outline-none focus:ring-4 focus:ring-emerald-500/20 ${
                  errorMsg
                    ? 'border-red-500 bg-red-50/20'
                    : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-emerald-600'
                }`}
              />

              {/* Voice Dictation Button */}
              <div className="absolute right-3 rtl:right-auto rtl:left-3 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleToggleVoiceDictation}
                  className={`p-2.5 rounded-xl transition-all cursor-pointer ${
                    isListening
                      ? 'bg-red-500 text-white animate-pulse shadow-md'
                      : 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-200'
                  }`}
                  title={
                    isUrdu
                      ? 'بول کر شناختی کارڈ نمبر لکھوائیں (مائیکروفون)'
                      : 'Speak CNIC number out loud (Voice Dictation)'
                  }
                  aria-label="Voice Dictation"
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Voice Notice or Error */}
            {voiceNotice && (
              <div className="mt-2 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 shrink-0" />
                <span>{voiceNotice}</span>
              </div>
            )}

            {errorMsg && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400 font-medium">
                {errorMsg}
              </p>
            )}

            {/* Zero-knowledge indicator */}
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {isUrdu
                  ? 'آپ کا شناختی کارڈ نمبر صرف آپ کے براؤزر میں جانچا جاتا ہے، کہیں محفوظ نہیں ہوتا۔'
                  : 'Zero-Knowledge: Your CNIC is evaluated purely client-side and never stored.'}
              </span>
            </div>
          </div>

          {/* Quick Test Demo Personas */}
          {!settings.declutter && (
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>
                  {isUrdu
                    ? 'فوری آزمائشی شناختی کارڈز (ایک کلک سے ٹیسٹ کریں):'
                    : '1-Click Test Personas (No typing needed):'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {DEMO_CNICS.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectDemo(item.cnic)}
                    className="p-3 text-left rtl:text-right rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-500 bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 text-xs transition-colors cursor-pointer"
                  >
                    <div className="font-mono font-bold text-slate-800 dark:text-slate-100">
                      {item.cnic}
                    </div>
                    <div className="text-slate-600 dark:text-slate-400 mt-0.5 font-medium line-clamp-1">
                      {isUrdu ? item.labelUr : item.labelEn}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="submit"
              className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base sm:text-lg shadow-lg shadow-emerald-700/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[52px]"
            >
              <span>{isUrdu ? 'محفوظ طریقے سے تصدیق کریں' : 'Check Status Safely'}</span>
              {isUrdu ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
