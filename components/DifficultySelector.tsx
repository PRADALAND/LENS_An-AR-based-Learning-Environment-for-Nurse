
import React from 'react';
import { Difficulty, Language } from '../types';
import { Zap, ShieldAlert, ArrowRight } from 'lucide-react';

interface DifficultySelectorProps {
  onSelect: (diff: Difficulty) => void;
  language: Language;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({ onSelect, language }) => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 md:p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-black to-black z-0"></div>
      
      <div className="z-10 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        
        {/* Easy Mode */}
        <button 
          onClick={() => onSelect('EASY')}
          className="group relative bg-slate-900/50 border border-cyan-500/30 hover:border-cyan-400 p-6 md:p-8 rounded-2xl transition-all duration-300 hover:bg-slate-800 flex flex-col items-start text-left active:scale-95 touch-manipulation"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500 rounded-t-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
          <div className="mb-4 md:mb-6 p-3 md:p-4 bg-cyan-900/20 rounded-full">
            <Zap className="w-8 h-8 md:w-10 md:h-10 text-cyan-400" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-cyan-300">
            {language === 'ko' ? "Standard Training" : "Standard Training"}
          </h2>
          <span className="inline-block px-3 py-1 bg-cyan-500/20 text-cyan-300 text-xs font-bold rounded-full mb-4 tracking-wider">
             {language === 'ko' ? "초심자 권장" : "RECOMMENDED"}
          </span>
          <ul className="space-y-2 md:space-y-3 text-slate-400 text-xs md:text-sm">
            <li className="flex items-start gap-2">
               <span className="text-cyan-500">✓</span>
               {language === 'ko' ? "명확한 의학적 옵션" : "Clear medical options"}
            </li>
            <li className="flex items-start gap-2">
               <span className="text-cyan-500">✓</span>
               {language === 'ko' ? "협조적인 환자 태도" : "Cooperative patient attitude"}
            </li>
            <li className="flex items-start gap-2">
               <span className="text-cyan-500">✓</span>
               {language === 'ko' ? "시간 압박 없음" : "No time pressure"}
            </li>
          </ul>
        </button>

        {/* Hard Mode */}
        <button 
          onClick={() => onSelect('HARD')}
          className="group relative bg-red-950/10 border border-red-500/30 hover:border-red-500 p-6 md:p-8 rounded-2xl transition-all duration-300 hover:bg-red-950/20 flex flex-col items-start text-left active:scale-95 touch-manipulation"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-red-600 rounded-t-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
          <div className="mb-4 md:mb-6 p-3 md:p-4 bg-red-900/20 rounded-full animate-pulse">
            <ShieldAlert className="w-8 h-8 md:w-10 md:h-10 text-red-500" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-red-400">
            {language === 'ko' ? "High Complexity" : "High Complexity"}
          </h2>
          <span className="inline-block px-3 py-1 bg-red-500/20 text-red-400 text-xs font-bold rounded-full mb-4 tracking-wider">
             {language === 'ko' ? "숙련자 모드" : "EXPERT MODE"}
          </span>
          <ul className="space-y-2 md:space-y-3 text-slate-400 text-xs md:text-sm">
             <li className="flex items-start gap-2">
               <span className="text-red-500">⚠</span>
               {language === 'ko' ? "불확실한 예후 & 정보 비대칭" : "Clinical uncertainty & Info asymmetry"}
            </li>
            <li className="flex items-start gap-2">
               <span className="text-red-500">⚠</span>
               {language === 'ko' ? "보호자와의 갈등 상황 (Role Conflict)" : "Family/Role conflict included"}
            </li>
            <li className="flex items-start gap-2">
               <span className="text-red-500">⚠</span>
               {language === 'ko' ? "인지 과부하 (Cognitive Load) 시스템 적용" : "Cognitive Load System Active"}
            </li>
          </ul>
        </button>

      </div>
    </div>
  );
};

export default DifficultySelector;
