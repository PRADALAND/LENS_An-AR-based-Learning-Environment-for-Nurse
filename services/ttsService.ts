import { Language } from '../types';

export const stopSpeaking = () => {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
};

export const speakText = (text: string, lang: Language, onEnd?: () => void) => {
  if (!window.speechSynthesis) {
    console.warn("Speech Synthesis not supported");
    if (onEnd) onEnd();
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  
  // Set language code based on selection
  const langCode = lang === 'ko' ? 'ko-KR' : 'en-US';
  utterance.lang = langCode;

  // Attempt to find a matching voice
  const voices = window.speechSynthesis.getVoices();
  const matchingVoice = voices.find(v => v.lang.includes(langCode));
  
  if (matchingVoice) {
    utterance.voice = matchingVoice;
  }
  
  utterance.rate = 0.9; // Slightly slower for clarity
  utterance.pitch = 1.0;

  utterance.onend = () => {
    if (onEnd) onEnd();
  };

  utterance.onerror = (e) => {
    console.error("TTS Error", e);
    if (onEnd) onEnd();
  };

  window.speechSynthesis.speak(utterance);
};

// Pre-load voices (Chrome requires this)
if (window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}