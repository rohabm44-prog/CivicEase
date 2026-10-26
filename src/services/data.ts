import { WelfareService, VerificationResult, ServiceId } from '../types';

export const WELFARE_SERVICES: WelfareService[] = [
  {
    id: 'bisp',
    nameEn: 'BISP / Ehsaas (8171)',
    nameUr: 'بے نظیر انکم سپورٹ (8171)',
    taglineEn: 'Kafalat & Education Stipends',
    taglineUr: 'سہ ماہی کفالت اور تعلیمی وظائف',
    shortDescEn: 'Quarterly financial assistance of Rs. 10,500 for eligible families and children school attendance rewards.',
    shortDescUr: 'مستحق خاندانوں کے لیے 10,500 روپے کا سہ ماہی مالی وظیفہ اور سکول جانے والے بچوں کی حوصلہ افزائی۔',
    iconName: 'Banknote',
    colorScheme: 'emerald',
    helpline: '0800-26477',
    smsCode: '8171'
  },
  {
    id: 'himmat',
    nameEn: 'Himmat Card (DPMIS)',
    nameUr: 'ہمت کارڈ پورٹل (پنجاب)',
    taglineEn: 'Disability Allowance & Equipment',
    taglineUr: 'معذور افراد کا وظیفہ اور معاون کارڈ',
    shortDescEn: 'Punjab Social Protection Authority direct allowance (Rs. 10,500 quarterly) and assistive mobility aids.',
    shortDescUr: 'پنجاب سوشل پروٹیکشن اتھارٹی کا خصوصی اے ٹی ایم کارڈ، سہ ماہی وظیفہ اور وہیل چیئر و معاون آلات کی فراہمی۔',
    iconName: 'HeartHandshake',
    colorScheme: 'amber',
    helpline: '1221',
    smsCode: '8500'
  },
  {
    id: 'nadra',
    nameEn: 'NADRA Identity Services',
    nameUr: 'نادرا شناختی سہولیات',
    taglineEn: 'Special CNIC & Doorstep Service',
    taglineUr: 'خصوصی شناختی کارڈ اور گھریلو تصدیق',
    shortDescEn: 'Doorstep biometric verification for seniors and special citizens, disability wheelchair monogram card, and FRC.',
    shortDescUr: 'بزرگوں اور خصوصی افراد کے لیے گھر پر بائیومیٹرک سروس، خصوصی شناختی کارڈ اور فیملی رجسٹریشن سرٹیفکیٹ۔',
    iconName: 'ShieldCheck',
    colorScheme: 'sky',
    helpline: '1777',
    smsCode: '8400'
  }
];

export const DEMO_CNICS = [
  {
    cnic: '35201-1234567-1',
    labelEn: 'BISP Eligible: Rs. 10,500 Ready for Pickup',
    labelUr: 'بے نظیر کفالت: 10,500 روپے وصولی کے لیے تیار',
    service: 'bisp' as ServiceId
  },
  {
    cnic: '35202-9876543-2',
    labelEn: 'Himmat Card: Biometric & ATM Card at Bank of Punjab',
    labelUr: 'ہمت کارڈ: بائیو میٹرک اور اے ٹی ایم کارڈ بینک میں دستیاب',
    service: 'himmat' as ServiceId
  },
  {
    cnic: '35201-5555555-3',
    labelEn: 'NADRA: Doorstep Van for Senior / Special Card',
    labelUr: 'نادرا: معمر اور معذور شہریوں کے لیے گھر کی دہلیز پر سروس',
    service: 'nadra' as ServiceId
  },
  {
    cnic: '35201-8888888-4',
    labelEn: 'Survey Update Required at BISP Tehsil Center',
    labelUr: 'بی آئی ایس پی تحصیل سینٹر پر ڈائنامک سروے درکار',
    service: 'bisp' as ServiceId
  }
];

export function verifyCnicLocally(cnic: string, serviceId: ServiceId): VerificationResult {
  const digits = cnic.replace(/\D/g, '');

  if (serviceId === 'bisp') {
    if (digits.endsWith('4') || digits.includes('8888')) {
      return {
        cnic,
        serviceId: 'bisp',
        status: 'action_needed',
        titleEn: 'Survey Update Required (Dynamic Registry)',
        titleUr: 'معلومات کی تجدید اور نیا سروے درکار ہے',
        plainExplanationEn: 'Your government file has reached the 3-year renewal date. You need to visit the local BISP office once to update your family details.',
        plainExplanationUr: 'آپ کے خاندان کا سرکاری ریکارڈ 3 سال پرانا ہو چکا ہے۔ آپ کو ایک بار قریبی سرکاری دفتر جا کر اپنے بچوں اور کوائف کی تصدیق کروانی ہوگی تاکہ وظیفہ بحال رہے۔',
        officialJargonEn: 'Household PMT score tenure expired. Enrolment in Dynamic Registry required as per Benazir National Socio-Economic Registry (NSER) guidelines.',
        officialJargonUr: 'خاندان کا پی ایم ٹی اسکور زائد المیعاد ہو چکا ہے۔ این ایس ای آر کے قواعد کے مطابق ڈائنامک رجسٹری کاؤنٹر پر بائیو میٹرک تصدیق اور دوبارہ اندراج لازمی ہے۔',
        steps: [
          {
            stepNumber: 1,
            titleEn: 'Locate Your Nearest BISP Tehsil Center',
            titleUr: 'اپنا قریبی بی آئی ایس پی تحصیل دفتر تلاش کریں',
            summaryEn: 'Visit the official government registration desk in your tehsil or district.',
            summaryUr: 'اپنی تحصیل یا ضلع کے سرکاری بی آئی ایس پی مرکز تشریف لے جائیں۔',
            plainSummaryEn: 'Go to the official BISP building in your town during morning hours (8:30 AM to 2:00 PM).',
            plainSummaryUr: 'صبح ساڑھے آٹھ سے دو بجے کے درمیان اپنی تحصیل میں قائم بی آئی ایس پی کے سرکاری دفتر جائیں۔',
            locationEn: 'Government High School Campsite / Tehsil BISP Executive Center',
            locationUr: 'گورنمنٹ سکول کیمپ سائٹ یا تحصیل بی آئی ایس پی دفتر',
            itemsToBringEn: [
              'Original CNIC of the female family head',
              'NADRA B-Form for all school-going children',
              'Latest paid Electricity & Gas bill of your home',
              'Mobile phone with SIM registered in your own name'
            ],
            itemsToBringUr: [
              'خاتون سربراہ کا اصل کمپیوٹرائزڈ شناختی کارڈ',
              'تمام سکول جانے والے بچوں کا نادرا ب-فارم',
              'گھر کے بجلی اور گیس کا حالیہ ادا شدہ بل',
              'اپنے ہی نام پر رجسٹرڈ سم والا موبائل فون'
            ],
            pitfallsWarningEn: 'Never pay anyone money to fill out this survey form. Registration at government centers is strictly 100% free.',
            pitfallsWarningUr: 'سروے فارم بھرنے یا ٹوکن لینے کے لیے کسی ایجنٹ کو پیسے نہ دیں۔ رجسٹریشن مکمل مفت ہے۔'
          },
          {
            stepNumber: 2,
            titleEn: 'Biometric Fingerprint & Token Generation',
            titleUr: 'بائیو میٹرک انگوٹھے کا نشان اور ٹوکن کا حصول',
            summaryEn: 'Officer will scan your fingerprints and hand you a stamped dynamic registry receipt.',
            summaryUr: 'سرکاری عملہ آپ کے انگوٹھے کا نشان لے کر کمپیوٹر پر کوائف درج کرے گا اور رسید دے گا۔',
            plainSummaryEn: 'Clean your hands with water so the machine reads your thumbprint quickly. Keep the white paper receipt safe.',
            plainSummaryUr: 'اپنے ہاتھ اچھی طرح دھو کر جائیں تاکہ انگوٹھا باآسانی اسکین ہو جائے۔ سفید رسید سنبھال کر رکھیں۔',
            locationEn: 'Data Entry Counter, BISP Office',
            locationUr: 'ڈیٹا انٹری کاؤنٹر، بی آئی ایس پی دفتر',
            itemsToBringEn: ['White survey receipt with tracking QR code'],
            itemsToBringUr: ['کیو آر کوڈ والی سفید رجسٹریشن رسید'],
            pitfallsWarningEn: 'Do not leave the center until you receive your official stamped printed receipt with your CNIC number on it.',
            pitfallsWarningUr: 'جب تک آپ کو باضابطہ مہر لگی رسید نہ مل جائے، دفتر سے واپس نہ آئیں۔'
          }
        ]
      };
    }

    // Default eligible
    return {
      cnic,
      serviceId: 'bisp',
      status: 'eligible',
      titleEn: 'Approved: Rs. 10,500 Ready for Cash Collection',
      titleUr: 'مبارک ہو! 10,500 روپے وصولی کے لیے دستیاب ہیں',
      benefitAmountEn: 'Rs. 10,500 (Quarterly Kafalat)',
      benefitAmountUr: '10,500 روپے (سہ ماہی کفالت)',
      plainExplanationEn: 'Your family is officially approved for the BISP Kafalat stipend. The money is waiting for your biometric withdrawal right now.',
      plainExplanationUr: 'آپ کا سہ ماہی وظیفہ حکومت کی طرف سے منظور ہو کر جاری ہو چکا ہے۔ آپ قریبی بائیو میٹرک ادائیگی مرکز سے پوری رقم لے سکتے ہیں۔',
      officialJargonEn: 'Beneficiary PMT score verified <= 32. Tranche disbursed via Partner Bank CMS (HBL Konnect / Bank Alfalah biometric switch).',
      officialJargonUr: 'صارف کا غربت کا اسکور مطلوبہ حد کے اندر ہے۔ فنڈز تصدیق کے بعد بائیو میٹرک ڈسٹری بیوشن نیٹ ورک کے ذریعے فراہم کر دیے گئے ہیں۔',
      steps: [
        {
          stepNumber: 1,
          titleEn: 'Choose Your Safe Payment Location',
          titleUr: 'رقم وصولی کے لیے محفوظ جگہ کا انتخاب کریں',
          summaryEn: 'Go to an official designated BISP campsite or authorized bank franchise.',
          summaryUr: 'بی آئی ایس پی کے باضابطہ کیمپ یا حبیب بینک کنیکٹ / بینک الفلاح کے مجاز دکاندار کے پاس جائیں۔',
          plainSummaryEn: 'You can collect your full Rs. 10,500 from any HBL Konnect shop (in Punjab/Sindh/Balochistan) or Bank Alfalah (in KP/GB/AJK) or the government campsite.',
          plainSummaryUr: 'آپ اپنی پوری رقم (10,500 روپے) قریبی ایچ بی ایل کنیکٹ، بینک الفلاح یا گورنمنٹ کیمپ سائٹ سے لے سکتے ہیں۔',
          locationEn: 'Official BISP Campsite or Authorized HBL Konnect / Bank Alfalah Retailer',
          locationUr: 'قریبی بی آئی ایس پی کیمپ یا مجاز بینک کنیکٹ شاپ',
          itemsToBringEn: [
            'Your original Plastic CNIC card (Photocopy is NOT accepted)',
            'Your mobile phone to receive the free 8171 SMS confirmation'
          ],
          itemsToBringUr: [
            'اپنا اصل نادرا شناختی کارڈ (فوٹو کاپی قبول نہیں کی جائے گی)',
            'اپنا موبائل فون تاکہ 8171 سے مفت تصدیقی ایس ایم ایس دیکھا جا سکے'
          ],
          pitfallsWarningEn: 'CRITICAL: The retailer is NOT allowed to deduct any service fee, fee for "tea", or card fee. You must receive exactly Rs. 10,500 cash in full.',
          pitfallsWarningUr: 'اہم وارننگ: کسی دکاندار کو کوئی کٹوتی (مثلاً 500 یا 1000 روپے) کرنے کی اجازت نہیں ہے۔ آپ کو پورے 10,500 روپے ملنے چاہئیں۔'
        },
        {
          stepNumber: 2,
          titleEn: 'Biometric Verification & Safe Counting',
          titleUr: 'بائیو میٹرک انگوٹھا لگانا اور رقم کی گنتی',
          summaryEn: 'Put your finger on the biometric scanner and count your cash before walking away.',
          summaryUr: 'مشین پر انگوٹھا لگائیں اور کاؤنٹر چھوڑنے سے پہلے تمام نوٹ گن لیں۔',
          plainSummaryEn: 'Put your thumb on the green light scanner. Ask for the printed receipt. Count each note on the table before leaving.',
          plainSummaryUr: 'سبز بتی والے اسکینر پر انگوٹھا لگائیں۔ پرنٹ شدہ رسید لازمی مانگیں اور کاؤنٹر پر ہی تمام پیسے گن لیں۔',
          locationEn: 'Authorized Biometric Pos Machine',
          locationUr: 'بائیو میٹرک مشین کاؤنٹر',
          itemsToBringEn: ['Original CNIC', 'Cash collection receipt'],
          itemsToBringUr: ['اصل شناختی کارڈ', 'پیسے وصولی کی رسید'],
          pitfallsWarningEn: 'If the machine fails to read your thumbprint 3 times, do not panic. Ask the operator for "NADRA verification bypass" or visit the BISP Tehsil office for manual override.',
          pitfallsWarningUr: 'اگر انگوٹھا تین بار نہ لگے تو گھبرائیں نہیں۔ آپ تحصیل دفتر جا کر بائیو میٹرک متبادل تصدیق کی درخواست کر سکتے ہیں۔'
        }
      ]
    };
  }

  if (serviceId === 'himmat') {
    return {
      cnic,
      serviceId: 'himmat',
      status: 'eligible',
      titleEn: 'Himmat Card Approved: Collect ATM Card from Bank of Punjab',
      titleUr: 'ہمت کارڈ منظور ہو گیا: بینک آف پنجاب سے اپنا اے ٹی ایم کارڈ وصول کریں',
      benefitAmountEn: 'Rs. 10,500 Quarterly Disability Stipend',
      benefitAmountUr: '10,500 روپے سہ ماہی معذوری وظیفہ',
      plainExplanationEn: 'Punjab Social Protection Authority has approved your special Himmat Card. Your debit card has arrived at your designated Bank of Punjab branch.',
      plainExplanationUr: 'پنجاب حکومت نے آپ کی درخواست منظور کر لی ہے۔ آپ کا ہمت اے ٹی ایم کارڈ بینک آف پنجاب کی متعلقہ برانچ میں پہنچ چکا ہے۔',
      officialJargonEn: 'Beneficiary qualified under Punjab Disability Social Protection Initiative (DPMIS). Certified score within PMT threshold. Personalized PayPak debit card dispatched.',
      officialJargonUr: 'امیدوار کا نام ڈی پی ایم آئی ایس سسٹم میں بطور مستحق معذور شہری درج ہو چکا ہے۔ پے پاک ڈیبٹ کارڈ متعلقہ بینک برانچ کو ارسال کر دیا گیا ہے۔',
      steps: [
        {
          stepNumber: 1,
          titleEn: 'Visit Your Designated Bank of Punjab (BOP) Branch',
          titleUr: 'بینک آف پنجاب کی مخصوص برانچ تشریف لے جائیں',
          summaryEn: 'Head to the special disability desk inside the bank.',
          summaryUr: 'بینک کے اندر خصوصی افراد کے کاؤنٹر پر تشریف لے جائیں۔',
          plainSummaryEn: 'You can go to the Bank of Punjab branch between 9:00 AM and 4:00 PM on any working day.',
          plainSummaryUr: 'کسی بھی کام کے دن صبح 9 سے شام 4 بجے کے درمیان بینک آف پنجاب کی برانچ جائیں۔',
          locationEn: 'Designated Tehsil Bank of Punjab Branch (Customer Service Desk)',
          locationUr: 'بینک آف پنجاب کی تحصیل برانچ (خصوصی کسٹمر کاؤنٹر)',
          itemsToBringEn: [
            'Original CNIC with Disability Monogram (or Medical Board Certificate)',
            'Official District Disability Assessment Board Certificate',
            'Registered mobile phone with active SMS SIM'
          ],
          itemsToBringUr: [
            'معذوری کے مونوگرام والا اصل شناختی کارڈ یا میڈیکل بورڈ کا سرٹیفکیٹ',
            'ڈسٹرکٹ ڈس ایبلٹی اسیسمنٹ بورڈ کی جاری کردہ باضابطہ سند',
            'اپنے نام رجسٹرڈ فعال سم والا موبائل فون'
          ],
          pitfallsWarningEn: 'Wheelchair access ramp is mandatory at all designated branches. If you need assistance entering, bank guards are required by law to assist you.',
          pitfallsWarningUr: 'تمام برانچز پر وہیل چیئر ریمپ لازمی ہے۔ اگر داخلے میں دشواری ہو تو بینک عملہ مدد فراہم کرنے کا پابند ہے۔'
        },
        {
          stepNumber: 2,
          titleEn: 'Card Handover & Biometric Activation',
          titleUr: 'کارڈ کی وصولی اور بائیو میٹرک پن کوڈ بنانا',
          summaryEn: 'Bank officer will verify your thumbprint and help you set your 4-digit secret ATM PIN.',
          summaryUr: 'بینک آفیسر آپ کے انگوٹھے کی تصدیق کر کے کارڈ آپ کے حوالے کرے گا اور 4 ہندسوں کا خفیہ پن کوڈ بنوائے گا۔',
          plainSummaryEn: 'You will receive your blue Himmat Card inside a sealed envelope. Choose an easy 4-digit number for your ATM code.',
          plainSummaryUr: 'آپ کو بند لفافے میں نیلا ہمت کارڈ دیا جائے گا۔ اپنے اے ٹی ایم کے لیے 4 آسان ہندسوں کا خفیہ کوڈ منتخب کریں۔',
          locationEn: 'Bank Branch Biometric Desk',
          locationUr: 'بینک برانچ بائیو میٹرک کاؤنٹر',
          itemsToBringEn: ['Sealed Himmat Card envelope', 'BOP Biometric Confirmation Slip'],
          itemsToBringUr: ['سیل بند ہمت کارڈ لفافہ', 'بینک کی تصدیقی پرچی'],
          pitfallsWarningEn: 'NEVER tell your 4-digit ATM PIN to strangers, guards, or shopkeepers. With this card, you can withdraw money from ANY ATM in Pakistan without charges.',
          pitfallsWarningUr: 'اپنا 4 ہندسوں کا خفیہ اے ٹی ایم پن کوڈ کسی بھی اجنبی کو مت بتائیں۔ اس کارڈ سے پاکستان کے کسی بھی اے ٹی ایم سے مفت رقم نکلوائی جا سکتی ہے۔'
        }
      ]
    };
  }

  // NADRA Identity
  return {
    cnic,
    serviceId: 'nadra',
    status: 'eligible',
    titleEn: 'NADRA Special Citizen Priority & Doorstep Service Eligible',
    titleUr: 'نادرا خصوصی و معمر شہری سروس: ترجیحی سہولت اور گھر پر آمد کے اہل',
    plainExplanationEn: 'You are eligible for expedited priority service at any NADRA Mega Center without waiting in long queues, or you can request the NADRA Doorstep Mobile Van to your home.',
    plainExplanationUr: 'آپ نادرا کے کسی بھی بڑے سینٹر پر بغیر قطار میں کھڑے ہوئے ترجیحی بنیاد پر کارڈ بنوا سکتے ہیں، یا اپنے گھر پر نادرا کی موبائل وین طلب کر سکتے ہیں۔',
    officialJargonEn: 'Applicant qualifies for Special CNIC issuance with physical disability insignia under Section 12 of NADRA Ordinance. Free lifetime validity and fee waiver applicable.',
    officialJargonUr: 'شہری نادرا کے خصوصی شناختی کارڈ (ویل چیئر مونوگرام) کے حقدار ہیں۔ اس کارڈ پر تاحیات میعاد اور فیس میں خصوصی چھوٹ دی جاتی ہے۔',
    steps: [
      {
        stepNumber: 1,
        titleEn: 'Option A: Call Doorstep Mobile Van (Service to Your Home)',
        titleUr: 'طریقہ اول: گھر پر موبائل وین منگوائیں (ہوم سروس)',
        summaryEn: 'For bedridden seniors or persons with severe mobility challenges, a NADRA van comes to your home.',
        summaryUr: 'بستر تک محدود بزرگوں یا چلنے پھرنے سے معذور افراد کے لیے نادرا وین گھر آ کر تصویر اور فنگر پرنٹ لیتی ہے۔',
        plainSummaryEn: 'Dial 1777 (or 051-111-786-100) from your phone and ask for "NADRA Manzil Doorstep Van". They will schedule a visit to your doorstep.',
        plainSummaryUr: 'اپنے فون سے 1777 پر کال کر کے "نادرا منزل ڈور اسٹیپ سروس" کی درخواست دیں۔ وہ آپ کے گھر کا وقت طے کریں گے۔',
        locationEn: 'Your Home Residence (Doorstep Visit)',
        locationUr: 'آپ کا اپنا گھر (نادرا موبائل ٹیم)',
        itemsToBringEn: [
          'Old CNIC card or Child Registration B-Form',
          'Medical disability certificate from a government hospital',
          'One blood-relative (Father, Mother, Brother, Sister, Spouse) with original CNIC'
        ],
        itemsToBringUr: [
          'پرانا شناختی کارڈ یا بچوں کا ب-فارم',
          'سرکاری ہسپتال کا میڈیکل سرٹیفکیٹ',
          'ایک خونی رشتہ دار (والد، والدہ، بہن، بھائی یا شریک حیات) اصل شناختی کارڈ کے ساتھ'
        ],
        pitfallsWarningEn: 'Always ask the visiting NADRA team for their official government ID cards before allowing them inside.',
        pitfallsWarningUr: 'گھر کے اندر داخل ہونے سے پہلے نادرا ٹیم کے سرکاری شناختی کارڈ ضرور چیک کریں۔'
      },
      {
        stepNumber: 2,
        titleEn: 'Option B: Visit Nearest NADRA Center (Priority Counter)',
        titleUr: 'طریقہ دوم: نادرا میگا سینٹر تشریف لے جائیں (ترجیحی کاؤنٹر)',
        summaryEn: 'No line! Go straight to the Senior Citizens & Special Persons Counter.',
        summaryUr: 'قطار میں کھڑے ہونے کی ضرورت نہیں! سیدھا خصوصی افراد کے کاؤنٹر نمبر 1 پر جائیں۔',
        plainSummaryEn: 'NADRA centers have a dedicated green-carpet counter for seniors and neurodivergent individuals. You receive an immediate priority token.',
        plainSummaryUr: 'نادرا کے تمام دفاتر میں بزرگوں اور خصوصی شہریوں کے لیے علیحدہ کاؤنٹر ہوتا ہے جہاں فوری ٹوکن ملتا ہے۔',
        locationEn: 'NADRA Mega Center / Tehsil Registration Center',
        locationUr: 'نادرا میگا سینٹر یا تحصیل رجسٹریشن دفتر',
        itemsToBringEn: [
          'Original Old CNIC',
          'Disability Medical Board Certificate',
          'Blood relative with CNIC for digital attestation'
        ],
        itemsToBringUr: [
          'پرانا اصل شناختی کارڈ',
          'میڈیکل بورڈ کی تصدیقی سند',
          'تصدیق کے لیے خونی رشتہ دار بمع اصل شناختی کارڈ'
        ],
        pitfallsWarningEn: 'The Special CNIC with wheelchair logo provides 50% discount on Pakistan Railways and domestic flights, plus free healthcare at public hospitals.',
        pitfallsWarningUr: 'خصوصی شناختی کارڈ بنوانے پر پاکستان ریلویز اور ہوائی جہاز کے ٹکٹ میں 50 فیصد رعایت اور سرکاری ہسپتالوں میں مفت علاج ملتا ہے۔'
      }
    ]
  };
}
