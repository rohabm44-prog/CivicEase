export type Language = 'en' | 'ur';

export type ContrastTheme = 'standard' | 'high-contrast-dark' | 'glare-free' | 'high-contrast-light';

export type TextScale = 'normal' | 'large' | 'xlarge';

export type FontMode = 'standard' | 'bionic' | 'opendyslexic';

export type AccessibilityProfile = 'custom' | 'neuro-calm' | 'simple-speak' | 'senior-sight';

export interface AccessibilitySettings {
  profile: AccessibilityProfile;
  language: Language;
  declutter: boolean;
  bionicReading: boolean;
  fontMode: FontMode;
  textScale: TextScale;
  contrastTheme: ContrastTheme;
  focusRuler: boolean;
  plainLanguage: boolean;
  voiceTtsSpeed: number;
  enlargedTouch: boolean;
}

export type ServiceId = 'bisp' | 'himmat' | 'nadra';

export interface WelfareService {
  id: ServiceId;
  nameEn: string;
  nameUr: string;
  taglineEn: string;
  taglineUr: string;
  shortDescEn: string;
  shortDescUr: string;
  iconName: string;
  colorScheme: string;
  helpline: string;
  smsCode: string;
}

export interface VerificationResult {
  cnic: string;
  serviceId: ServiceId;
  status: 'eligible' | 'action_needed' | 'in_review' | 'not_registered';
  titleEn: string;
  titleUr: string;
  benefitAmountEn?: string;
  benefitAmountUr?: string;
  plainExplanationEn: string;
  plainExplanationUr: string;
  officialJargonEn: string;
  officialJargonUr: string;
  steps: GuidanceStep[];
}

export interface GuidanceStep {
  stepNumber: number;
  titleEn: string;
  titleUr: string;
  summaryEn: string;
  summaryUr: string;
  plainSummaryEn: string;
  plainSummaryUr: string;
  locationEn: string;
  locationUr: string;
  itemsToBringEn: string[];
  itemsToBringUr: string[];
  pitfallsWarningEn: string;
  pitfallsWarningUr: string;
  actionButtonTextEn?: string;
  actionButtonTextUr?: string;
}

export interface JargonTerm {
  termEn: string;
  termUr: string;
  plainEn: string;
  plainUr: string;
  category: 'welfare' | 'biometrics' | 'identity' | 'finance';
}
