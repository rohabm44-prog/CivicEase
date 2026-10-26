import { Language } from '../types';

let currentUtterance: SpeechSynthesisUtterance | null = null;

/**
 * Reads aloud text in English or Urdu using the Web Speech Synthesis API.
 */
export function speakText(
  text: string,
  lang: Language = 'en',
  rate = 0.95,
  onEnd?: () => void,
  onError?: (err: any) => void
): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('SpeechSynthesis not supported on this browser/environment.');
    return false;
  }

  // Cancel any ongoing speech
  stopSpeech();

  if (!text || text.trim() === '') {
    if (onEnd) onEnd();
    return true;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  currentUtterance = utterance;

  // Find preferred voice if available
  const voices = window.speechSynthesis.getVoices();
  if (lang === 'ur') {
    // Try to find Urdu or Arabic voice fallback
    const urduVoice = voices.find(
      (v) => v.lang.startsWith('ur') || v.name.toLowerCase().includes('urdu')
    ) || voices.find((v) => v.lang.startsWith('ar') || v.lang.startsWith('hi'));
    if (urduVoice) {
      utterance.voice = urduVoice;
    }
    utterance.lang = 'ur-PK';
  } else {
    // English voice
    const englishVoice = voices.find(
      (v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.default)
    ) || voices.find((v) => v.lang.startsWith('en'));
    if (englishVoice) {
      utterance.voice = englishVoice;
    }
    utterance.lang = 'en-US';
  }

  utterance.rate = rate; // slightly slower for neurodivergent and senior clarity
  utterance.pitch = 1.0;

  utterance.onend = () => {
    currentUtterance = null;
    if (onEnd) onEnd();
  };

  utterance.onerror = (e) => {
    console.warn('SpeechSynthesis error:', e);
    currentUtterance = null;
    if (onError) onError(e);
    if (onEnd) onEnd();
  };

  window.speechSynthesis.speak(utterance);
  return true;
}

export function stopSpeech(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    currentUtterance = null;
  }
}

export function isSpeaking(): boolean {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    return window.speechSynthesis.speaking;
  }
  return false;
}

/**
 * Helper to convert spoken words (in English or Urdu) into digits for CNIC
 */
export function parseSpokenCnic(transcript: string): string {
  const urduDigits: Record<string, string> = {
    'صفر': '0', 'ایک': '1', 'دو': '2', 'تین': '3', 'چار': '4',
    'پانچ': '5', 'چھ': '6', 'سات': '7', 'آٹھ': '8', 'نو': '9',
    'دس': '10'
  };

  const englishDigits: Record<string, string> = {
    'zero': '0', 'oh': '0', 'one': '1', 'two': '2', 'three': '3',
    'four': '4', 'five': '5', 'six': '6', 'seven': '7', 'eight': '8',
    'nine': '9'
  };

  let clean = transcript.toLowerCase();
  
  // Replace Urdu words
  Object.keys(urduDigits).forEach((word) => {
    clean = clean.split(word).join(urduDigits[word]);
  });

  // Replace English words
  Object.keys(englishDigits).forEach((word) => {
    clean = clean.split(word).join(englishDigits[word]);
  });

  // Extract only numbers
  const digitsOnly = clean.replace(/\D/g, '');
  return digitsOnly.slice(0, 13);
}

/**
 * Format 13 digits into standard CNIC format: XXXXX-XXXXXXX-X
 */
export function formatCnicString(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 13);
  if (digits.length <= 5) return digits;
  if (digits.length <= 12) return `${digits.slice(0, 5)}-${digits.slice(5)}`;
  return `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits.slice(12, 13)}`;
}
