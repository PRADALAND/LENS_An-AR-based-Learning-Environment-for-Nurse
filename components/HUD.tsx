
import React, { useState } from 'react';
import { SDMStage, DialogueOption, Language, EmotionType, Difficulty } from '../types';
import { SCENARIO_STAGES, PATIENT_PROFILES } from '../constants';
import { speakText, stopSpeaking } from '../services/ttsService';
import { Activity, User, BrainCircuit, ChevronRight, XCircle, CheckCircle, RotateCcw, ArrowRight, Home, MessageCircle, FastForward, AlertTriangle, Zap, X } from 'lucide-react';

interface HUDProps {
  onScenarioComplete: () => void;
  language: Language;
  onExit: () => void;
  difficulty: Difficulty;
}

const getEmotionEmoji = (emotion: EmotionType) => {
  switch (emotion) {
    case 'anxious': return '😰';
    case 'confused': return '😵‍💫';
    case 'sad': return '😢';
    case 'relieved': return '😌';
    case 'thinking': return '🤔';
    case 'angry': return '😠';
    case 'overwhelmed': return '🤯';
    default: return '😐';
  }
};

const HUD: React.FC<HUDProps> = ({ onScenarioComplete, language, onExit, difficulty }) => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [isNurseSpeaking, setIsNurseSpeaking] = useState(false);
  const [nurseSpeechText, setNurseSpeechText] = useState("");
  const [feedbackOption, setFeedbackOption] = useState<DialogueOption | null>(null);
  const [showOptions, setShowOptions] = useState(true);
  const [pendingOption, setPendingOption] = useState<DialogueOption | null>(null);
  
  // Hard Mode State
  const [cognitiveLoad, setCognitiveLoad] = useState(0); // 0 to 100

  // Get data
  const stages = SCENARIO_STAGES[language][difficulty] || SCENARIO_STAGES[language]['EASY'];
  const profile = PATIENT_PROFILES[language][difficulty] || PATIENT_PROFILES[language]['EASY'];
  
  const currentStage: SDMStage = stages[currentStageIndex] || stages[0]; 
  const isLastStage = currentStageIndex === stages.length - 1;
  const isHard = difficulty === 'HARD';

  const handleOptionSelect = (option: DialogueOption) => {
    setShowOptions(false);
    setNurseSpeechText(option.speechText);
    setIsNurseSpeaking(true);
    setPendingOption(option);

    // Hard Mode: Update Cognitive Load
    if (isHard && option.cognitiveLoadImpact) {
        setCognitiveLoad(prev => Math.min(100, Math.max(0, prev + option.cognitiveLoadImpact!)));
    }

    speakText(option.speechText, language, () => {
      setIsNurseSpeaking(false);
      setNurseSpeechText("");
      setFeedbackOption(option);
      setPendingOption(null);
    });
  };

  const handleSkip = () => {
    stopSpeaking();
    if (pendingOption) {
        setIsNurseSpeaking(false);
        setNurseSpeechText("");
        setFeedbackOption(pendingOption);
        setPendingOption(null);
    }
  };

  const handleFeedbackAction = () => {
    if (!feedbackOption) return;

    if (feedbackOption.isOptimal) {
        setFeedbackOption(null);
        if (isLastStage) {
            onScenarioComplete();
        } else {
            setCurrentStageIndex(prev => prev + 1);
            setShowOptions(true);
        }
    } else {
        setFeedbackOption(null);
        setShowOptions(true);
    }
  };

  const progress = ((currentStageIndex + 1) / stages.length) * 100;

  // Visual Effect for High Cognitive Load
  const isOverloaded = cognitiveLoad > 70;
  const containerBlur = isOverloaded ? 'blur-sm grayscale transition-all duration-1000' : 'transition-all duration-500';

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden font-mono flex flex-col justify-between">
       {/* Background */}
       <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2000&auto=format&fit=crop" 
            alt="Hospital Ward" 
            className={`w-full h-full object-cover opacity-40 grayscale ${isOverloaded ? 'animate-pulse' : ''}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80" />
       </div>

       {/* HARD MODE: Overload Warning Overlay */}
       {isOverloaded && (
         <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
            <div className="w-full h-full border-[10px] md:border-[20px] border-red-500/20 animate-pulse"></div>
            <div className="absolute top-1/4 bg-red-600 text-white px-4 py-1 font-bold tracking-widest animate-bounce text-sm md:text-base">
                {language === 'ko' ? "경고: 인지 과부하 감지" : "WARNING: COGNITIVE OVERLOAD"}
            </div>
         </div>
       )}
       
       {/* Patient Avatar - Optimized for Mobile */}
       <div className={`absolute inset-0 flex items-center justify-center -z-10 mt-[-50px] md:mt-[-100px] ${containerBlur}`}>
        <div className="relative w-64 h-64 md:w-[32rem] md:h-[32rem] transition-all duration-500">
            <div className={`absolute inset-0 rounded-full blur-3xl animate-pulse ${isHard ? 'bg-red-500/10' : 'bg-cyan-500/10'}`}></div>
            <img 
                src="https://plus.unsplash.com/premium_photo-1661578500248-152865955635?q=80&w=1000&auto=format&fit=crop" 
                alt="Patient" 
                className={`w-full h-full rounded-full object-cover opacity-80 md:opacity-90 border-4 shadow-[0_0_50px_rgba(6,182,212,0.3)]
                    ${isHard ? 'border-red-500/30' : 'border-cyan-500/30'}
                `}
            />
            <div className={`absolute bottom-0 md:bottom-4 left-1/2 -translate-x-1/2 bg-black/60 px-4 py-1 md:px-6 md:py-2 rounded-full border backdrop-blur-md z-10
                 ${isHard ? 'border-red-500/30' : 'border-cyan-500/30'}
            `}>
                 <span className={`${isHard ? 'text-red-300' : 'text-cyan-300'} text-sm md:text-lg font-bold tracking-widest whitespace-nowrap`}>
                    {profile.name}
                 </span>
            </div>
        </div>
      </div>

      {/* --- HUD HEADER --- */}
      <div className="relative z-20 flex flex-col md:flex-row justify-between items-start p-4 md:p-6 gap-4">
        <div className="flex flex-col gap-2 md:gap-4 max-w-full md:max-w-md w-full">
            <div className="flex items-center gap-2 text-cyan-500/80 text-[10px] md:text-xs">
                <Activity className="w-3 h-3 md:w-4 md:h-4 animate-pulse" />
                <span>SYS: {difficulty}</span>
                <span className="ml-2 md:ml-4 border-l border-cyan-900 pl-2 md:pl-4">REC: {currentStage?.id}</span>
            </div>
            
            <div className={`bg-slate-900/80 border-l-4 p-3 md:p-4 backdrop-blur-md rounded-r-lg shadow-xl w-full
                ${isHard ? 'border-red-500' : 'border-cyan-500'}
            `}>
                <div className="flex items-center gap-2 mb-1">
                    <BrainCircuit className={`w-3 h-3 md:w-4 md:h-4 ${isHard ? 'text-red-400' : 'text-cyan-300'}`} />
                    <span className={`text-[10px] md:text-xs font-bold uppercase tracking-wider ${isHard ? 'text-red-400' : 'text-cyan-300'}`}>
                        {language === 'ko' ? "현재 목표" : "Current Goal"}
                    </span>
                </div>
                <h4 className="text-white font-bold text-sm md:text-base">{currentStage?.name}</h4>
                <p className="text-slate-300 text-xs md:text-sm leading-relaxed mt-1 opacity-80 truncate md:whitespace-normal">{currentStage?.goal}</p>
            </div>
            
            {/* Hard Mode: AR Alert */}
            {isHard && currentStage?.arAlert && (
                 <div className="bg-red-950/80 border border-red-500/50 p-2 rounded flex items-center gap-2 animate-pulse">
                    <AlertTriangle className="w-3 h-3 md:w-4 md:h-4 text-red-500" />
                    <span className="text-red-400 text-[10px] md:text-xs font-bold tracking-wider">{currentStage.arAlert}</span>
                 </div>
            )}
        </div>

        {/* Top Right: Status & Cognitive Load */}
        <div className="flex flex-row md:flex-col gap-2 md:gap-3 w-full md:w-80">
            <div className={`bg-slate-900/80 border rounded-xl p-3 md:p-4 backdrop-blur-md shadow-2xl flex-1
                ${isHard ? 'border-red-500/30' : 'border-cyan-500/30'}
            `}>
                <div className="flex items-center gap-3">
                    <div className={`bg-slate-800 p-2 rounded-lg border border-slate-700 hidden md:block`}>
                        <User className={`w-6 h-6 md:w-8 md:h-8 ${isHard ? 'text-red-200' : 'text-cyan-200'}`} />
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-sm md:text-base truncate">{profile.condition}</h3>
                        <div className="flex items-center gap-2 text-slate-400 text-[10px] md:text-xs font-mono mt-1">
                             <span className={isHard ? "text-red-400 font-bold" : "text-cyan-400"}>{profile.status}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cognitive Load Meter (Hard Mode Only) */}
            {isHard && (
                <div className="bg-black/60 border border-slate-700 p-2 md:p-3 rounded-lg backdrop-blur flex-1 md:flex-none">
                    <div className="flex justify-between text-[10px] md:text-xs text-slate-400 mb-1 font-bold">
                        <span>LOAD</span>
                        <span className={isOverloaded ? "text-red-500" : "text-green-500"}>{cognitiveLoad}%</span>
                    </div>
                    <div className="w-full h-1.5 md:h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                            className={`h-full transition-all duration-500 ${isOverloaded ? 'bg-red-500' : 'bg-green-500'}`}
                            style={{ width: `${cognitiveLoad}%` }}
                        />
                    </div>
                </div>
            )}
        </div>
      </div>

      {/* --- CENTRAL --- */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center pointer-events-none">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-2 md:gap-4 mb-16 md:mb-20 pointer-events-auto max-w-3xl w-full px-4 transform translate-y-[-10px] md:translate-y-[-20px]">
            <div className="flex-shrink-0 flex flex-col items-center gap-2">
                 <div className="text-5xl md:text-6xl filter drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] animate-bounce">
                    {getEmotionEmoji(currentStage?.emotion)}
                 </div>
            </div>

            <div className={`relative bg-white/10 backdrop-blur-xl border-2 p-4 md:p-6 rounded-2xl rounded-tl-none md:rounded-bl-none md:rounded-tl-2xl shadow-2xl flex-1 w-full text-center md:text-left
                 ${isHard ? 'border-red-200/20' : 'border-white/30'}
            `}>
                 <MessageCircle className={`hidden md:block absolute -top-4 -left-4 w-8 h-8 fill-current ${isHard ? 'text-red-400' : 'text-cyan-400'}`} />
                 <p className={`text-white text-base md:text-2xl font-medium leading-relaxed italic ${isOverloaded ? 'blur-[2px] opacity-70' : ''}`}>
                    "{currentStage?.patientIntro}"
                 </p>
            </div>
        </div>
      </div>

      {/* --- BOTTOM --- */}
      <div className="relative z-30 w-full px-3 md:px-4 pb-4 md:pb-8 flex flex-col items-center">
        {/* Dialogue Options */}
        <div className="w-full max-w-4xl min-h-[100px] md:min-h-[120px]">
            {showOptions && !isNurseSpeaking && !feedbackOption && (
            <div className="flex flex-col gap-2 md:gap-3 animate-in slide-in-from-bottom-10 fade-in duration-500">
                <div className={`${isHard ? 'text-red-400' : 'text-cyan-400'} text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold mb-1 pl-1`}>
                    {language === 'ko' ? "간호사 발화 선택" : "Select Nurse Response"}
                </div>
                {currentStage?.options.map((option) => (
                    <button
                        key={option.id}
                        onClick={() => handleOptionSelect(option)}
                        className={`w-full text-left bg-slate-900/95 border-l-4 p-3 md:p-5 rounded-r-xl transition-all group relative overflow-hidden shadow-lg active:scale-95 touch-manipulation
                             ${isHard 
                                ? 'border-slate-600 hover:border-red-400 hover:bg-red-950/40' 
                                : 'border-slate-600 hover:border-cyan-400 hover:bg-cyan-950/95'}
                        `}
                    >
                        <div className="flex items-start justify-between gap-3 md:gap-4">
                            <span className="text-sm md:text-base text-slate-100 font-medium leading-snug">
                                {option.text}
                            </span>
                            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-slate-500 group-hover:text-white flex-shrink-0 mt-1" />
                        </div>
                    </button>
                ))}
            </div>
            )}

            {/* Speaking Visualizer with Improved SKIP Button */}
            {isNurseSpeaking && (
                <div className={`relative flex flex-col items-center justify-center gap-2 md:gap-4 p-4 md:p-6 bg-black/80 rounded-xl backdrop-blur-md border-2 w-full animate-in fade-in shadow-2xl
                    ${isHard ? 'border-red-500/50' : 'border-cyan-500/50'}
                `}>
                    {/* Visualizer Bars */}
                    <div className="flex items-center justify-center gap-1 h-8 md:h-12 w-full mt-2">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className={`w-1 md:w-1.5 rounded-full animate-pulse ${isHard ? 'bg-red-500' : 'bg-cyan-400'}`}
                                 style={{ 
                                    height: `${30 + Math.random() * 70}%`, 
                                    animationDuration: `${0.4 + Math.random() * 0.4}s`
                                 }} 
                            />
                        ))}
                    </div>
                    
                    {/* Text - Added right padding (pr-20) to prevent overlap with Skip button */}
                    <p className="text-white text-sm md:text-xl font-medium text-center leading-relaxed px-2 md:px-8 pb-4">
                        "{nurseSpeechText}"
                    </p>

                    {/* SKIP BUTTON */}
                    <button 
                        onClick={handleSkip} 
                        className="absolute top-2 right-2 md:top-4 md:right-4 flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-600 px-3 py-2 md:py-1.5 rounded-lg transition-all shadow-lg text-[10px] md:text-xs font-bold tracking-wider z-50 group touch-manipulation"
                    >
                        <span>SKIP</span> 
                        <FastForward className="w-3 h-3 fill-current group-hover:text-cyan-400" />
                    </button>
                </div>
            )}
        </div>
      </div>

      <button onClick={onExit} className="absolute bottom-4 right-4 md:bottom-6 md:right-6 z-40 p-2 md:p-3 bg-slate-900/80 border border-slate-600 rounded-full text-slate-400 hover:text-white transition-all shadow-lg backdrop-blur-md">
        <Home className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* --- FEEDBACK MODAL --- */}
      {feedbackOption && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200">
            <div className={`max-w-3xl w-full p-6 md:p-8 rounded-2xl border-2 md:border-4 shadow-2xl transform transition-all
                ${feedbackOption.isOptimal ? 'bg-gradient-to-br from-green-950 to-black border-green-500' : 'bg-gradient-to-br from-red-950 to-black border-red-500'}
            `}>
                <div className="flex flex-col items-center text-center space-y-4 md:space-y-8">
                    <div className={`p-4 md:p-6 rounded-full shadow-inner ${feedbackOption.isOptimal ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                        {feedbackOption.isOptimal 
                            ? <CheckCircle className="w-16 h-16 md:w-24 md:h-24 text-green-400" />
                            : <XCircle className="w-16 h-16 md:w-24 md:h-24 text-red-400" />
                        }
                    </div>
                    <div>
                        <h2 className={`text-2xl md:text-4xl font-bold uppercase tracking-widest mb-2 ${feedbackOption.isOptimal ? 'text-green-300' : 'text-red-300'}`}>
                            {feedbackOption.isOptimal 
                                ? (language === 'ko' ? '올바른 접근입니다' : 'CORRECT APPROACH')
                                : (language === 'ko' ? '부적절한 접근입니다' : 'INCORRECT APPROACH')
                            }
                        </h2>
                    </div>
                    
                    {/* Hard Mode Stats Impact */}
                    {isHard && feedbackOption.cognitiveLoadImpact !== 0 && (
                        <div className="flex items-center gap-2 bg-black/40 px-3 py-1 md:px-4 md:py-2 rounded-lg border border-slate-700">
                            <Zap className={`w-3 h-3 md:w-4 md:h-4 ${feedbackOption.cognitiveLoadImpact! > 0 ? 'text-red-400' : 'text-green-400'}`} />
                            <span className="text-xs md:text-sm text-slate-300">
                                Cognitive Load: 
                                <span className={feedbackOption.cognitiveLoadImpact! > 0 ? 'text-red-400 ml-1' : 'text-green-400 ml-1'}>
                                    {feedbackOption.cognitiveLoadImpact! > 0 ? '+' : ''}{feedbackOption.cognitiveLoadImpact}
                                </span>
                            </span>
                        </div>
                    )}

                    <p className="text-white text-base md:text-xl leading-relaxed font-medium px-2 md:px-4 max-h-[30vh] overflow-y-auto">
                        {feedbackOption.feedback}
                    </p>
                    <button 
                        onClick={handleFeedbackAction}
                        className={`w-full md:w-auto px-8 py-3 md:px-10 md:py-4 rounded-xl font-bold text-lg md:text-xl flex items-center justify-center gap-3 transition-all active:scale-95 touch-manipulation
                            ${feedbackOption.isOptimal ? 'bg-green-600 text-white' : 'bg-white text-red-900'}
                        `}
                    >
                        {feedbackOption.isOptimal 
                            ? (language === 'ko' ? '다음 단계로' : 'NEXT STAGE')
                            : (language === 'ko' ? '다시 시도하기' : 'TRY AGAIN')
                        }
                        {feedbackOption.isOptimal ? <ArrowRight className="w-5 h-5 md:w-6 md:h-6" /> : <RotateCcw className="w-5 h-5 md:w-6 md:h-6" />}
                    </button>
                </div>
            </div>
        </div>
      )}

    </div>
  );
};

export default HUD;
