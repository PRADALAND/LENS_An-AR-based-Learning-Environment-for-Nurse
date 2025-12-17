
import React from 'react';
import { PATIENT_PROFILES, SDM_INDICATORS } from '../constants';
import { Language, Difficulty } from '../types';
import { ClipboardList, AlertCircle, ArrowRight, BookOpen, ShieldAlert, ArrowLeft } from 'lucide-react';

interface MissionBriefingProps {
  onStart: () => void;
  onBack: () => void;
  language: Language;
  difficulty: Difficulty;
}

const MissionBriefing: React.FC<MissionBriefingProps> = ({ onStart, onBack, language, difficulty }) => {
  const profile = PATIENT_PROFILES[language][difficulty];
  const indicators = SDM_INDICATORS[language];

  const isHard = difficulty === 'HARD';

  return (
    // Fixed: h-screen and overflow-y-auto to handle scrolling within the viewport since body is overflow-hidden
    <div className="h-screen w-full bg-slate-900 text-slate-100 p-4 md:p-6 flex flex-col items-center font-sans overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
      
      <div className={`max-w-4xl w-full bg-slate-800 border ${isHard ? 'border-red-500/50' : 'border-slate-700'} rounded-2xl p-4 md:p-8 shadow-2xl my-4 relative shrink-0`}>
        
        {/* Hard Mode Background Effect */}
        {isHard && (
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <ShieldAlert className="w-48 h-48 md:w-64 md:h-64 text-red-500" />
            </div>
        )}

        {/* Header with improved Back Button */}
        <header className="mb-6 md:mb-8 border-b border-slate-700 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 relative z-10">
          <div className="flex items-center gap-3">
            {/* Improved Visibility Back Button */}
            <button 
              onClick={onBack}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 border border-slate-600 hover:border-slate-500 text-white rounded-lg transition-all shadow-md mr-2 group"
              aria-label="Go Back"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold text-sm hidden md:inline">
                {language === 'ko' ? "뒤로" : "Back"}
              </span>
            </button>

            <div className={`p-2 rounded-lg ${isHard ? 'bg-red-900/50' : 'bg-cyan-900/50'}`}>
              <ClipboardList className={`w-6 h-6 md:w-8 md:h-8 ${isHard ? 'text-red-400' : 'text-cyan-400'}`} />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white tracking-wide">
                {isHard ? (language === 'ko' ? "고난이도 시나리오" : "HIGH COMPLEXITY BRIEFING") : "SDM MISSION BRIEFING"}
              </h1>
              <p className={`${isHard ? 'text-red-400' : 'text-cyan-400'} text-xs md:text-sm font-mono`}>
                {isHard ? "WARNING: COGNITIVE LOAD ACTIVE" : "ONCOLOGY UNIT • SIMULATION #402"}
              </p>
            </div>
          </div>

          <button 
            onClick={onStart}
            className={`w-full md:w-auto group flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-base transition-all shadow-lg whitespace-nowrap active:scale-95 touch-manipulation
                ${isHard 
                    ? 'bg-red-700 hover:bg-red-600 text-white shadow-red-900/20' 
                    : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-900/20'}`}
          >
            {language === 'ko' ? "시뮬레이션 시작" : "START SIMULATION"}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative z-10">
            {/* Left Column: Patient & Role */}
            <section className="space-y-4 md:space-y-6">
                <div className={`bg-slate-900/50 p-4 rounded-lg border-l-4 ${isHard ? 'border-red-500' : 'border-cyan-500'}`}>
                    <h2 className="text-sm font-bold text-slate-400 uppercase mb-2">
                        {language === 'ko' ? "환자 프로필 & 임상 배경" : "Patient Profile & Clinical Context"}
                    </h2>
                    
                    {/* Demographics Grid */}
                    <div className="grid grid-cols-2 gap-x-2 gap-y-3 md:gap-x-4 md:gap-y-4 mb-4 border-b border-slate-700/50 pb-4">
                        <div>
                            <span className="block text-[10px] md:text-xs text-slate-500 uppercase tracking-wide">{language === 'ko' ? "이름" : "Name"}</span>
                            <span className="text-base md:text-lg font-bold text-white">{profile.name}</span>
                        </div>
                        <div>
                            <span className="block text-[10px] md:text-xs text-slate-500 uppercase tracking-wide">{language === 'ko' ? "나이 / 성별" : "Age / Gender"}</span>
                            <span className="text-base md:text-lg font-medium text-slate-200">
                                {profile.age} / <span className={isHard ? "text-red-200" : "text-cyan-200"}>{profile.gender}</span>
                            </span>
                        </div>
                         <div>
                            <span className="block text-[10px] md:text-xs text-slate-500 uppercase tracking-wide">{language === 'ko' ? "질환" : "Condition"}</span>
                            <span className="text-xs md:text-sm font-medium text-slate-300 truncate">{profile.condition}</span>
                        </div>
                        <div>
                            <span className="block text-[10px] md:text-xs text-slate-500 uppercase tracking-wide">{language === 'ko' ? "상태" : "Status"}</span>
                            <span className={`text-xs md:text-sm font-bold ${isHard ? "text-red-400" : "text-yellow-400"}`}>
                                {profile.status}
                            </span>
                        </div>
                    </div>

                    {/* Context - REMOVED max-h constraint to allow full expansion */}
                    <div className="bg-black/20 p-3 rounded text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                        {profile.context}
                    </div>
                </div>

                <div className="bg-slate-900/50 p-4 rounded-lg border-l-4 border-purple-500">
                    <h2 className="text-sm font-bold text-slate-400 uppercase mb-2 flex items-center gap-2">
                         <AlertCircle className="w-4 h-4 text-purple-400" />
                        {language === 'ko' ? "간호사 수행 목표 (Role)" : "Nurse's Role & Objectives"}
                    </h2>
                    {/* Role Description - REMOVED max-h constraint */}
                    <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                        {profile.roleDescription}
                    </div>
                </div>

                {isHard && (
                     <div className="bg-red-950/30 p-4 rounded-lg border border-red-500/30">
                        <h2 className="text-sm font-bold text-red-400 uppercase mb-2 flex items-center gap-2">
                            <ShieldAlert className="w-4 h-4" />
                            {language === 'ko' ? "고난이도 제약 조건" : "HARD MODE CONSTRAINTS"}
                        </h2>
                        {/* Constraints - REMOVED max-h constraint */}
                        <div>
                            <ul className="text-sm text-slate-300 space-y-2 list-disc pl-4">
                                {profile.clinicalContextList.map((ctx, idx) => (
                                    <li key={idx}>{ctx}</li>
                                ))}
                                <li className="text-red-300 font-bold">{profile.difficultyContext}</li>
                            </ul>
                        </div>
                     </div>
                )}
            </section>

            {/* Right Column: SDM Indicators - REMOVED max-h constraint */}
            <section className="bg-slate-950/80 p-4 md:p-6 rounded-xl border border-slate-600/50 h-fit">
                <div className="flex items-center gap-2 mb-4 text-green-400 border-b border-slate-800 pb-2">
                    <BookOpen className="w-5 h-5" />
                    <h2 className="text-sm font-bold uppercase tracking-wider">
                        {language === 'ko' ? "필수 SDM 지표 (11 Indicators)" : "Key SDM Indicators"}
                    </h2>
                </div>
                <div className="space-y-3">
                    <p className="text-xs text-slate-500 mb-2 italic">
                        {language === 'ko' 
                            ? "시뮬레이션 진행 시 아래 지표들을 준수해야 합니다." 
                            : "You must adhere to these indicators during the simulation."}
                    </p>
                    <ul className="space-y-2">
                        {indicators.map((indicator, index) => (
                            <li key={index} className="text-xs md:text-sm text-slate-300 flex items-start gap-2">
                                <span className="text-green-500/50 mt-1">●</span>
                                <span>{indicator}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>

      </div>
    </div>
  );
};

export default MissionBriefing;
