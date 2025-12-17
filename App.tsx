
import React, { useState } from 'react';
import { AppState, Language, Difficulty } from './types';
import LanguageSelector from './components/LanguageSelector';
import DifficultySelector from './components/DifficultySelector';
import MissionBriefing from './components/MissionBriefing';
import ARScanner from './components/ARScanner';
import HUD from './components/HUD';
import { RefreshCcw } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('LANGUAGE_SELECT');
  const [language, setLanguage] = useState<Language>('en');
  const [difficulty, setDifficulty] = useState<Difficulty>('EASY');

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    setAppState('DIFFICULTY_SELECT');
  };

  const handleDifficultySelect = (diff: Difficulty) => {
    setDifficulty(diff);
    setAppState('BRIEFING');
  }

  const handleBackToDifficulty = () => {
    setAppState('DIFFICULTY_SELECT');
  };

  const startScanning = () => setAppState('SCANNING');
  const startSimulation = () => setAppState('SIMULATION');
  const completeSimulation = () => setAppState('COMPLETED');
  const restart = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setAppState('LANGUAGE_SELECT');
  };

  return (
    <div className="min-h-screen bg-black">
      
      {appState === 'LANGUAGE_SELECT' && (
        <LanguageSelector onSelect={handleLanguageSelect} />
      )}

      {appState === 'DIFFICULTY_SELECT' && (
        <DifficultySelector onSelect={handleDifficultySelect} language={language} />
      )}

      {appState === 'BRIEFING' && (
        <MissionBriefing 
          onStart={startScanning} 
          onBack={handleBackToDifficulty}
          language={language} 
          difficulty={difficulty} 
        />
      )}

      {appState === 'SCANNING' && (
        <ARScanner onScanComplete={startSimulation} language={language} />
      )}

      {appState === 'SIMULATION' && (
        <HUD onScenarioComplete={completeSimulation} language={language} onExit={restart} difficulty={difficulty} />
      )}

      {appState === 'COMPLETED' && (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-center p-8">
           <div className={`max-w-md w-full bg-slate-800 p-8 rounded-2xl border shadow-2xl ${difficulty === 'HARD' ? 'border-red-500/50' : 'border-green-500/50'}`}>
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${difficulty === 'HARD' ? 'bg-red-500/20' : 'bg-green-500/20'}`}>
                <span className="text-4xl">✓</span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {language === 'ko' ? "시뮬레이션 완료" : "SIMULATION COMPLETE"}
              </h1>
              <p className="text-slate-400 mb-8">
                {language === 'ko' 
                  ? (difficulty === 'HARD' ? "고난이도 시나리오의 복잡한 갈등을 성공적으로 조율했습니다." : "공유 의사결정 과정을 성공적으로 마쳤습니다.")
                  : (difficulty === 'HARD' ? "You successfully navigated the complex conflict of the High Complexity scenario." : "You have successfully guided the patient through the process.")}
              </p>
              
              <button 
                onClick={restart}
                className="flex items-center justify-center w-full gap-2 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg transition-colors"
              >
                <RefreshCcw className="w-4 h-4" />
                {language === 'ko' ? "처음으로 돌아가기" : "RESTART SCENARIO"}
              </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default App;
