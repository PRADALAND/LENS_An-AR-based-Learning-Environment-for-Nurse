
import React from 'react';
import { Language } from '../types';
import { Globe, ArrowRight } from 'lucide-react';

interface LanguageSelectorProps {
  onSelect: (lang: Language) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onSelect }) => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800 via-black to-black opacity-50 z-0"></div>
      
      <div className="z-10 text-center max-w-md w-full">
        <div className="mb-8 flex justify-center">
            <div className="p-4 bg-cyan-900/30 rounded-full border border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                <Globe className="w-12 h-12 text-cyan-400 animate-pulse" />
            </div>
        </div>
        
        <h1 className="text-3xl font-bold tracking-tight mb-2">AR SDM TRAINING</h1>
        <p className="text-slate-400 mb-12 font-mono text-sm">SELECT INTERFACE LANGUAGE</p>
        
        <div className="grid gap-4 w-full">
          <button
            onClick={() => onSelect('ko')}
            className="group relative flex items-center justify-between p-6 bg-slate-900 border border-slate-700 hover:border-cyan-500 hover:bg-slate-800 rounded-xl transition-all duration-300 active:scale-95 touch-manipulation"
          >
            <div className="flex flex-col items-start">
                <span className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">한국어</span>
                <span className="text-xs text-slate-400 font-mono mt-1">한국어 인터페이스 및 음성 지원</span>
            </div>
            <ArrowRight className="w-6 h-6 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
          </button>

          <button
            onClick={() => onSelect('en')}
            className="group relative flex items-center justify-between p-6 bg-slate-900 border border-slate-700 hover:border-purple-500 hover:bg-slate-800 rounded-xl transition-all duration-300 active:scale-95 touch-manipulation"
          >
            <div className="flex flex-col items-start">
                <span className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">English</span>
                <span className="text-xs text-slate-500 font-mono mt-1">English Interface & Voice Support</span>
            </div>
            <ArrowRight className="w-6 h-6 text-slate-600 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
          </button>
        </div>
        
        <div className="mt-12 text-xs text-slate-600 font-mono">
           SYSTEM VERSION 2.2 • ONCOLOGY UNIT
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
