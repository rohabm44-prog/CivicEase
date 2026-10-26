import { JargonTerm } from '../types';

export const JARGON_DICTIONARY: Record<string, JargonTerm> = {
  pmt: {
    termEn: 'PMT Score (Proxy Means Test)',
    termUr: 'پی ایم ٹی اسکور (غربت کی شرح)',
    plainEn: 'A household poverty rating from 0 to 100 calculated by BISP. A score below 32 or 45 makes you eligible for financial stipends.',
    plainUr: 'حکومت کی طرف سے خاندان کی مالی حالت کا نمبر (0 سے 100)۔ اگر آپ کا نمبر 32 یا 45 سے کم ہو تو آپ کو سرکاری وظیفہ ملتا ہے۔',
    category: 'welfare'
  },
  biometric: {
    termEn: 'Biometric Verification',
    termUr: 'بایومیٹرک تصدیق (انگوٹھے کا نشان)',
    plainEn: 'Placing your thumb or finger on an electronic scanner to prove you are the real person receiving the money.',
    plainUr: 'مشین پر انگوٹھا لگا کر اپنی شناخت ثابت کرنا تاکہ وظیفہ اصل حقدار کو ملے۔',
    category: 'biometrics'
  },
  dynamic_registry: {
    termEn: 'Dynamic Registry',
    termUr: 'ڈائنامک رجسٹری (معلومات کی تجدید)',
    plainEn: 'Visiting the official BISP office with your electricity bill and CNIC to update your family records and recalculate your poverty score.',
    plainUr: 'بی آئی ایس پی دفتر جا کر اپنے بچوں، گھر اور بجلی کے بل کے نئے کوائف درج کروانا تاکہ نیا اسکور بن سکے۔',
    category: 'welfare'
  },
  himmat_card: {
    termEn: 'Himmat Card (DPMIS)',
    termUr: 'ہمت کارڈ (معذور افراد کا وظیفہ)',
    plainEn: 'A special government ATM card issued to certified persons with disabilities providing Rs. 10,500 every 3 months directly via Bank of Punjab.',
    plainUr: 'معذور افراد کے لیے خصوصی اے ٹی ایم کارڈ، جس کے ذریعے ہر تین ماہ بعد 10,500 روپے براہ راست بینک آف پنجاب سے ملتے ہیں۔',
    category: 'welfare'
  },
  frc: {
    termEn: 'FRC (Family Registration Certificate)',
    termUr: 'فیملی رجسٹریشن سرٹیفکیٹ (FRC)',
    plainEn: 'An official NADRA paper that lists all parents, children, or spouses legally tied to you in government records.',
    plainUr: 'نادرا کی جاری کردہ باضابطہ دستاویز جو آپ کے خاندان کے تمام افراد اور رشتوں کی قانونی تصدیق کرتی ہے۔',
    category: 'identity'
  },
  kafalat: {
    termEn: 'BISP Kafalat',
    termUr: 'بے نظیر کفالت پروگرام',
    plainEn: 'A direct cash assistance payment of Rs. 10,500 deposited every three months for eligible female heads of families.',
    plainUr: 'مستحق خواتین کے لیے حکومت کا سہ ماہی مالی وظیفہ جو سال میں چار بار دیا جاتا ہے۔',
    category: 'welfare'
  }
};

export const UI_STRINGS = {
  en: {
    appName: 'CivicEase',
    appTagline: 'Cognitive Accessibility Portal for Citizen Welfare',
    privacyLockBadge: 'Privacy Lock Active: Data never leaves your device',
    privacyGuarantee: 'Zero-Knowledge Client Processing. Your CNIC and personal information remain strictly inside this browser session and are never saved or uploaded.',
    languageToggle: 'اردو میں پڑھیں',
    currentLanguageName: 'English',
    welcomeTitle: 'Welcome to CivicEase',
    welcomeSubtitle: 'Independent, dignified, and calm access to Pakistani welfare services without middlemen.',
    chooseLanguage: 'Please select your preferred language to continue:',
    continueEnglish: 'Continue in ENGLISH',
    continueEnglishSub: 'Left-to-Right layout, clear accessible typography',
    continueUrdu: 'اردو میں آگے بڑھیں',
    continueUrduSub: 'سادہ اردو، نستعلیق رسم الخط، دائیں سے بائیں',
    stepIndicator: 'Step',
    of: 'of',
    
    // Profiles
    profilesTitle: 'Cognitive Adaptation Profile',
    profileNeuroCalm: 'Neuro-Calm (Autism / ADHD)',
    profileNeuroCalmDesc: 'De-clutter visual noise, focus ruler, bionic word anchoring, step-by-step guidance.',
    profileSimpleSpeak: 'Simple-Speak (Dyslexia / Anxiety)',
    profileSimpleSpeakDesc: 'Plain everyday words, OpenDyslexic heavy-base typeface, jargon dictionary popups.',
    profileSeniorSight: 'Senior-Sight (Aging / Low Vision)',
    profileSeniorSightDesc: 'Super-scaled 24px+ text, high-contrast themes, 52px enlarged touch buttons.',
    profileDefault: 'Custom Accessible',

    // Services
    servicesTitle: 'Select Government Service',
    servicesSubtitle: 'Choose which gateway you want to verify or navigate today:',
    serviceBispTitle: 'BISP / Ehsaas 8171',
    serviceBispTagline: 'Kafalat & Taleemi Wazaif Stipends',
    serviceBispDesc: 'Check your quarterly Rs. 10,500 stipend status, dynamic registry survey schedule, and authorized biometric payment locations.',
    serviceHimmatTitle: 'Himmat Card Portal',
    serviceHimmatTagline: 'Disability Allowance & Assistive Aid',
    serviceHimmatDesc: 'Track your Punjab Social Protection (DPMIS) disability card status, ATM delivery schedule, and medical board verification.',
    serviceNadraTitle: 'NADRA Identity Gate',
    serviceNadraTagline: 'CNIC, Special Cards & FRC',
    serviceNadraDesc: 'Step-by-step guidance for Special CNIC (wheelchair monogram), doorstep biometrics for seniors, and family registration.',
    
    // Form
    formTitle: 'Enter Identity Information',
    formSubtitle: 'Enter your 13-digit Computerized National Identity Card (CNIC) number.',
    cnicLabel: 'CNIC Number',
    cnicPlaceholder: '35201-1234567-1',
    micSpeakTooltip: 'Speak your CNIC number out loud (Voice Dictation)',
    micListening: 'Listening... Please speak digits slowly',
    micStop: 'Stop listening',
    audioListenInstructions: 'Listen to instructions aloud',
    checkStatusBtn: 'Check Status Safely',
    nextStepBtn: 'Next Step',
    backBtn: 'Back',
    sampleCnicsTitle: 'Quick Test Personas (No typing required):',
    sample1: 'BISP Approved (Ready for Rs. 10,500 Pickup)',
    sample2: 'Himmat Card (Pending Biometric at BOP)',
    sample3: 'NADRA Doorstep Service for Senior / Special Card',
    sample4: 'Survey Required at Tehsil Center',
    
    // Results & Guidance
    verificationResult: 'Local Verification Summary',
    whereToGoTitle: 'Where to Go (Physical Location)',
    whatToBringTitle: 'What to Bring with You',
    avoidMiddlemenTitle: 'Warning: Defend Against Middlemen Fraud',
    avoidMiddlemenDesc: 'NEVER pay any fee to shopkeepers or agents. Government welfare services are 100% free. Never leave your original CNIC card with anyone.',
    officialHotlinesTitle: 'Official Helpline & SMS Channels',
    checkAnotherCnic: 'Check Another Service or CNIC',
    stepNumberLabel: 'Step',
    completedChecklist: 'Checklist item',

    // Docked Controls
    dockToolbarLabel: 'Accessibility Suite',
    btnListen: 'Listen to Screen',
    btnStopAudio: 'Stop Speaking',
    btnTextSize: 'Text Size',
    btnTheme: 'Contrast Theme',
    btnFocusRuler: 'Focus Ruler',
    btnBionic: 'Bionic / Dyslexia Font',
    btnDeclutter: 'De-Clutter Screen',
    btnPlainLang: 'Plain Words Mode',

    // Themes
    themeStandard: 'Standard Theme',
    themeDarkHighContrast: 'High Contrast Dark (Yellow / Black)',
    themeGlareFree: 'Glare-Free Paper',
    themeLightHighContrast: 'High Contrast Stark Light',

    // Sizes
    sizeNormal: 'Standard (16px)',
    sizeLarge: 'Large (20px)',
    sizeXLarge: 'Super Scale (24px+)',

    // Fonts
    fontStandard: 'Clear Sans',
    fontBionic: 'Bionic Anchors',
    fontDyslexic: 'OpenDyslexic / Lexend'
  },
  ur: {
    appName: 'سیوک ایز (CivicEase)',
    appTagline: 'خصوصی اور معمر شہریوں کے لیے سرکاری معاونتی پورٹل',
    privacyLockBadge: 'پرائیویسی لاک فعال: آپ کا ڈیٹا صرف آپ کے فون پر محفوظ ہے',
    privacyGuarantee: 'زیرو نالج لوکل پروسیسنگ: آپ کا شناختی کارڈ نمبر اور ذاتی معلومات کسی انٹرنیٹ سرور پر نہیں بھیجی جاتیں۔ تمام کام آپ کے براؤزر کے اندر محفوظ رہتا ہے۔',
    languageToggle: 'Read in English',
    currentLanguageName: 'اردو',
    welcomeTitle: 'سیوک ایز میں خوش آمدید',
    welcomeSubtitle: 'ایجنٹوں اور انٹرنیٹ کیفے کے محتاج ہوئے بغیر، باعزت اور آسان طریقے سے حکومتی وظائف کی معلومات حاصل کریں۔',
    chooseLanguage: 'براہ کرم اپنی پسندیدہ زبان منتخب کریں:',
    continueEnglish: 'Continue in ENGLISH',
    continueEnglishSub: 'انگریزی زبان، بائیں سے دائیں لے آؤٹ',
    continueUrdu: 'اردو میں آگے بڑھیں',
    continueUrduSub: 'سادہ روزمرہ اردو، بڑا اور واضح نستعلیق رسم الخط',
    stepIndicator: 'مرحلہ',
    of: 'از',

    // Profiles
    profilesTitle: 'آسانی کے لیے خصوصی پروفائلز',
    profileNeuroCalm: 'نیورو-کالم (آٹزم اور اے ڈی ایچ ڈی کے لیے)',
    profileNeuroCalmDesc: 'غیر ضروری بصری شور کا خاتمہ، فوکس رولر، الفاظ کی نمایاں پڑھائی اور ایک وقت میں ایک مرحلہ۔',
    profileSimpleSpeak: 'سادہ الفاظ (ڈسلیکسیا اور الجھن سے نجات)',
    profileSimpleSpeakDesc: 'آسان بول چال کی زبان، ڈسلیکسیا کے لیے موزوں فونٹس اور مشکل اصطلاحات کی فوری وضاحت۔',
    profileSeniorSight: 'سینئر-سائٹ (بزرگوں اور کمزور بینائی کے لیے)',
    profileSeniorSightDesc: '24 پکسل سے بڑا خط، زرد اور سیاہ کا ہائی کنٹراسٹ، اور انگلی سے چھونے کے لیے 52 پکسل کے بڑے بٹن۔',
    profileDefault: 'حسبِ ضرورت رسائی',

    // Services
    servicesTitle: 'سرکاری سہولت کا انتخاب کریں',
    servicesSubtitle: 'جس سہولت کی تصدیق یا رہنمائی درکار ہے اس پر کلک کریں:',
    serviceBispTitle: 'بے نظیر انکم سپورٹ / 8171',
    serviceBispTagline: 'کفالت اور تعلیمی وظائف کی رقم',
    serviceBispDesc: 'اپنے 10,500 روپے کے سہ ماہی وظیفے کی تاریخ، ڈائنامک سروے کا وقت اور قریبی بائیو میٹرک کیمپ کی معلومات حاصل کریں۔',
    serviceHimmatTitle: 'ہمت کارڈ پورٹل (پنجاب)',
    serviceHimmatTagline: 'معذور افراد کا خصوصی وظیفہ',
    serviceHimmatDesc: 'پنجاب سوشل پروٹیکشن اتھارٹی کا ہمت اے ٹی ایم کارڈ، سہ ماہی وظیفہ اور مفت معاونتی آلات کی فراہمی کی تفصیلات دیکھیں۔',
    serviceNadraTitle: 'نادرا شناختی سہولیات',
    serviceNadraTagline: 'خصوصی شناختی کارڈ اور گھریلو تصدیق',
    serviceNadraDesc: 'معذور افراد کے لیے ویل چیئر مونوگرام والا خصوصی کارڈ، بزرگوں کے لیے گھر کی دہلیز پر بائیو میٹرک اور فیملی سرٹیفکیٹ۔',

    // Form
    formTitle: 'شناختی معلومات درج کریں',
    formSubtitle: 'اپنا 13 ہندسوں پر مشتمل قومی شناختی کارڈ (CNIC) نمبر درج کریں:',
    cnicLabel: 'قومی شناختی کارڈ نمبر',
    cnicPlaceholder: '35201-1234567-1',
    micSpeakTooltip: 'بول کر اپنا شناختی کارڈ نمبر درج کروائیں (مائیکروفون)',
    micListening: 'سن رہے ہیں... براہ کرم ہندسے آہستہ آہستہ بولیں',
    micStop: 'آواز روکیں',
    audioListenInstructions: 'ہدایات آواز میں سنیں',
    checkStatusBtn: 'محفوظ طریقے سے تصدیق کریں',
    nextStepBtn: 'اگلا مرحلہ',
    backBtn: 'واپس جائیں',
    sampleCnicsTitle: 'فوری آزمائشی شناختی کارڈز (بغیر ٹائپ کیے آزمائیں):',
    sample1: 'بے نظیر کفالت منظور شدہ (10,500 روپے وصولی کے لیے تیار)',
    sample2: 'ہمت کارڈ (بینک آف پنجاب میں بائیومیٹرک کا انتظار)',
    sample3: 'نادرا بزرگ/خصوصی شناختی کارڈ (گھر پر سروس کے اہل)',
    sample4: 'تحصیل دفتر میں دوبارہ سروے درکار ہے',

    // Results & Guidance
    verificationResult: 'مقامی تصدیقی خلاصہ',
    whereToGoTitle: 'کہاں جانا ہے؟ (جسمانی پتہ اور دفتر)',
    whatToBringTitle: 'ساتھ کیا لے کر جانا ہے؟ (لازمی کاغذات)',
    avoidMiddlemenTitle: 'وارننگ: ایجنٹوں اور دھوکے بازوں سے ہوشیار رہیں!',
    avoidMiddlemenDesc: 'حکومتی وظائف حاصل کرنا 100 فیصد مفت ہے۔ کسی بھی دکاندار یا ایجنٹ کو فیس یا کٹوتی مت دیں۔ اپنا اصل شناختی کارڈ کسی کے پاس مت چھوڑیں۔',
    officialHotlinesTitle: 'سرکاری ہیلپ لائن اور ایس ایم ایس تصدیق',
    checkAnotherCnic: 'کسی اور سروس یا شناختی کارڈ کی تصدیق کریں',
    stepNumberLabel: 'مرحلہ',
    completedChecklist: 'لازمی دستاویز',

    // Docked Controls
    dockToolbarLabel: 'خصوصی سہولیات کا ٹول بار',
    btnListen: 'آواز میں سنیں',
    btnStopAudio: 'آواز بند کریں',
    btnTextSize: 'تحریر کا سائز',
    btnTheme: 'رنگ اور کنٹراسٹ',
    btnFocusRuler: 'فوکس رولر لائن',
    btnBionic: 'بایونک / پڑھنے کا فونٹ',
    btnDeclutter: 'اسکرین کو صاف کریں',
    btnPlainLang: 'سادہ الفاظ موڈ',

    // Themes
    themeStandard: 'معیاری ہلکا رنگ',
    themeDarkHighContrast: 'ہائی کنٹراسٹ (سیاہ پر چمکدار پیلا)',
    themeGlareFree: 'آنکھوں کے آرام کا کاغذی رنگ',
    themeLightHighContrast: 'انتہائی واضح سفید و سیاہ',

    // Sizes
    sizeNormal: 'معمول (16 پکسل)',
    sizeLarge: 'بڑا سائز (20 پکسل)',
    sizeXLarge: 'سپر اسکیل (24+ پکسل)',

    // Fonts
    fontStandard: 'صاف خط',
    fontBionic: 'بایونک اینکرز',
    fontDyslexic: 'ڈسلیکسیا فونٹ (لیکسینڈ)'
  }
};
