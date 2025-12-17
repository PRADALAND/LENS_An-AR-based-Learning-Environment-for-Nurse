import React, { useEffect, useRef, useState } from 'react';
import { Scan, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { SYSTEM_INTRO_MESSAGES } from '../constants';
import { speakText as speak } from '../services/ttsService';

interface ARScannerProps {
  onScanComplete: () => void;
  language: Language;
}

const ARScanner: React.FC<ARScannerProps> = ({ onScanComplete, language }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scanned, setScanned] = useState(false);
  const [systemSpeaking, setSystemSpeaking] = useState(false);

  useEffect(() => {
    // Attempt to access camera
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.warn("Camera access denied or unavailable", err);
      }
    };
    startCamera();

    // Mock scanning process
    const timer = setTimeout(() => {
      setScanned(true);
      setSystemSpeaking(true);
      
      const message = SYSTEM_INTRO_MESSAGES[language];
      
      // Play System Voice in selected language
      speak(message, language, () => {
        setSystemSpeaking(false);
        setTimeout(onScanComplete, 1000);
      });

    }, 2000);

    return () => {
      clearTimeout(timer);
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, [onScanComplete, language]);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Camera Feed - Visible in Scanner */}
      <video 
        ref={videoRef} 
        autoPlay 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover opacity-60" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/50" />

      {/* AR Overlays */}
      <div className="absolute inset-0 flex items-center justify-center">
        {!scanned ? (
          <div className="flex flex-col items-center animate-pulse text-cyan-400">
            <Scan className="w-24 h-24 mb-4 stroke-[1]" />
            <h2 className="text-xl font-mono tracking-widest">
                {language === 'ko' ? "간호사 인식 중..." : "IDENTIFYING NURSE..."}
            </h2>
          </div>
        ) : (
          <div className="flex flex-col items-center text-green-400">
            <div className="p-4 border-2 border-green-500 rounded-full mb-4 bg-green-900/20 backdrop-blur-md">
              <CheckCircle2 className="w-16 h-16" />
            </div>
            <h2 className="text-2xl font-bold tracking-wider mb-2">
                {language === 'ko' ? "인식 완료" : "RECOGNITION COMPLETE"}
            </h2>
            <p className="text-white font-mono text-sm bg-black/50 px-4 py-1 rounded">
               {systemSpeaking 
                  ? (language === 'ko' ? "시스템 음성 재생 중..." : "SYSTEM AUDIO PLAYING...") 
                  : (language === 'ko' ? "시나리오 초기화 중..." : "INITIALIZING SCENARIO...")}
            </p>
          </div>
        )}
      </div>

      <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-cyan-500/50" />
      <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-cyan-500/50" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-cyan-500/50" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-cyan-500/50" />
    </div>
  );
};

export default ARScanner;