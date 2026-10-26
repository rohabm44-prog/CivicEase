import React, { useState, useEffect } from 'react';
import {
  AccessibilitySettings,
  Language,
  ServiceId,
  VerificationResult
} from './types';
import { Onboarding } from './components/Onboarding';
import { Header } from './components/Header';
import { ServiceSelector } from './components/ServiceSelector';
import { CnicForm } from './components/CnicForm';
import { GuidanceWizard } from './components/GuidanceWizard';
import { AccessibilityToolbar } from './components/AccessibilityToolbar';
import { FocusRuler } from './components/FocusRuler';
import { verifyCnicLocally } from './services/data';

const DEFAULT_SETTINGS: AccessibilitySettings = {
  profile: 'custom',
  language: 'en',
  declutter: false,
  bionicReading: false,
  fontMode: 'standard',
  textScale: 'normal',
  contrastTheme: 'standard',
  focusRuler: false,
  plainLanguage: true,
  voiceTtsSpeed: 0.95,
  enlargedTouch: false,
};

export default function App() {
  const [hasChosenLanguage, setHasChosenLanguage] = useState<boolean>(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(DEFAULT_SETTINGS);
  const [currentStep, setCurrentStep] = useState<'service' | 'cnic' | 'guidance'>('service');
  const [selectedService, setSelectedService] = useState<ServiceId | null>(null);
  const [cnic, setCnic] = useState<string>('');
  const [result, setResult] = useState<VerificationResult | null>(null);

  // Sync settings with document root (dir, theme, scale, font)
  useEffect(() => {
    const isUrdu = settings.language === 'ur';
    document.documentElement.setAttribute('dir', isUrdu ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', settings.language);
    document.documentElement.setAttribute('data-theme', settings.contrastTheme);

    // Apply font and scale classes
    const classList = document.documentElement.classList;
    classList.remove('font-dyslexic', 'font-urdu-clean', 'font-nastaliq', 'scale-normal', 'scale-large', 'scale-xlarge', 'touch-enlarged');

    if (settings.fontMode === 'opendyslexic') {
      classList.add('font-dyslexic');
    } else if (isUrdu) {
      classList.add('font-urdu-clean');
    }

    if (settings.textScale === 'xlarge') {
      classList.add('scale-xlarge');
    } else if (settings.textScale === 'large') {
      classList.add('scale-large');
    } else {
      classList.add('scale-normal');
    }

    if (settings.enlargedTouch || settings.profile === 'senior-sight') {
      classList.add('touch-enlarged');
    }
  }, [settings]);

  const handleLanguageSelect = (lang: Language) => {
    setSettings((prev) => ({
      ...prev,
      language: lang,
    }));
    setHasChosenLanguage(true);
  };

  const handleSelectService = (serviceId: ServiceId) => {
    setSelectedService(serviceId);
    setCurrentStep('cnic');
  };

  const handleFormSubmit = () => {
    if (!selectedService) return;
    const res = verifyCnicLocally(cnic, selectedService);
    setResult(res);
    setCurrentStep('guidance');
  };

  const handleResetToStart = () => {
    setHasChosenLanguage(false);
    setSelectedService(null);
    setCnic('');
    setResult(null);
    setCurrentStep('service');
  };

  const handleResetService = () => {
    setSelectedService(null);
    setCnic('');
    setResult(null);
    setCurrentStep('service');
  };

  // If initial onboarding language screen is not yet dismissed
  if (!hasChosenLanguage) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors">
        <Onboarding onSelectLanguage={handleLanguageSelect} />
      </div>
    );
  }

  // Active screen content summary for voice reader
  let activeTitle = 'CivicEase Portal';
  let activeContent = '';
  if (currentStep === 'service') {
    activeTitle = settings.language === 'ur' ? 'سرکاری سہولت کا انتخاب کریں' : 'Choose Government Service';
    activeContent = settings.language === 'ur'
      ? 'بے نظیر انکم سپورٹ، ہمت کارڈ یا نادرا شناختی سہولیات میں سے ایک منتخب کریں۔'
      : 'Select BISP Ehsaas 8171, Himmat Card, or NADRA Identity Services.';
  } else if (currentStep === 'cnic') {
    activeTitle = settings.language === 'ur' ? 'شناختی کارڈ نمبر درج کریں' : 'Enter Identity Information';
    activeContent = settings.language === 'ur'
      ? 'اپنا 13 ہندسوں کا قومی شناختی کارڈ نمبر لکھیں یا مائیکروفون دبا کر بولیں۔'
      : 'Enter your 13 digit CNIC number or tap the microphone to dictate.';
  } else if (result) {
    activeTitle = settings.language === 'ur' ? result.titleUr : result.titleEn;
    activeContent = settings.language === 'ur' ? result.plainExplanationUr : result.plainExplanationEn;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors pb-24">
      {/* Focus Reading Guide Ruler */}
      <FocusRuler
        active={settings.focusRuler}
        onClose={() => setSettings((prev) => ({ ...prev, focusRuler: false }))}
        isUrdu={settings.language === 'ur'}
      />

      {/* Top Navigation Bar */}
      <Header
        settings={settings}
        onUpdateSettings={setSettings}
        onResetLanguage={handleResetToStart}
        onResetService={handleResetService}
      />

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        {currentStep === 'service' && (
          <ServiceSelector
            settings={settings}
            selectedService={selectedService}
            onSelectService={handleSelectService}
          />
        )}

        {currentStep === 'cnic' && selectedService && (
          <CnicForm
            settings={settings}
            selectedService={selectedService}
            cnic={cnic}
            onChangeCnic={setCnic}
            onSubmit={handleFormSubmit}
            onBack={handleResetService}
          />
        )}

        {currentStep === 'guidance' && result && (
          <GuidanceWizard
            settings={settings}
            result={result}
            onReset={handleResetService}
            onBackToForm={() => setCurrentStep('cnic')}
          />
        )}
      </main>

      {/* Docked Accessibility Bottom Toolbar */}
      <AccessibilityToolbar
        settings={settings}
        onUpdateSettings={setSettings}
        activeScreenTitle={activeTitle}
        activeScreenContent={activeContent}
      />
    </div>
  );
}
