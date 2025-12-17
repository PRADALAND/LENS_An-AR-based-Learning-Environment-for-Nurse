
export type Language = 'en' | 'ko';
export type Difficulty = 'EASY' | 'HARD';

export type SDMStageId = 
  | 'INVITING' 
  | 'EXPLORING' 
  | 'INFO_EXCHANGE' 
  | 'ELICITING_VALUES' 
  | 'DELIBERATING' 
  | 'SUPPORTING';

export type EmotionType = 'neutral' | 'anxious' | 'confused' | 'sad' | 'relieved' | 'thinking' | 'angry' | 'overwhelmed';

export interface DialogueOption {
  id: string;
  text: string; // Display text
  speechText: string; // Spoken text
  isOptimal: boolean;
  feedback: string;
  // Hard mode specific effects
  cognitiveLoadImpact?: number; // Adds to patient confusion
  timeCost?: number; // Consumes simulated time
}

export interface SDMStage {
  id: SDMStageId;
  name: string;
  order: number;
  goal: string;
  patientIntro: string;
  emotion: EmotionType;
  options: DialogueOption[];
  // Hard mode context
  arAlert?: string; // e.g., "FAMILY INTERFERENCE DETECTED"
}

export interface PatientProfile {
  name: string;
  age: number;
  gender: string; // Added gender
  condition: string;
  status: string;
  context: string;
  roleDescription: string;
  clinicalContextList: string[];
  difficultyContext?: string; // Specific notes for the difficulty level
}

export type AppState = 'LANGUAGE_SELECT' | 'DIFFICULTY_SELECT' | 'BRIEFING' | 'SCANNING' | 'SIMULATION' | 'COMPLETED';
