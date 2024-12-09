import { SkillId } from '@/data/curriculum/scores';

export interface BaseExercise {
  id: string;
  type: string;
  question: string;
  helpContentKey: string;
  feedback?: {
    correct: string;
    incorrect: string;
    hint?: string;
  };
}

export interface SingleSelectExercise extends BaseExercise {
  type: 'single-select';
  options: string[];
  correctAnswer: string;
}

export interface MultipleSelectExercise extends BaseExercise {
  type: 'multiple-select';
  options: string[];
  correctAnswers: string[];
}

export interface ConstructExercise extends BaseExercise {
  type: 'construct';
  availableBlocks: string[];
  correctSequence: string[];
}

export interface MatchPairsExercise extends BaseExercise {
  type: 'match-pairs';
  pairs: Array<{ left: string; right: string }>;
}

export interface SortBoxesExercise extends BaseExercise {
  type: 'sort-boxes';
  items: string[];
  categories: string[];
  correctPlacements: Record<string, string[]>;
}

export type Exercise = 
  | SingleSelectExercise 
  | MultipleSelectExercise 
  | ConstructExercise 
  | MatchPairsExercise 
  | SortBoxesExercise;

export interface LearningContent {
  title: string;
  sections: {
    title: string;
    subtitle?: string;
    explanation: string;
    examples?: string[];
    visual?: string;
    visualCaption?: string;
  }[];
}

export type SkillContentMap = {
  [key: string]: LearningContent;
}

export interface LearningProps {
  content: LearningContent;
  onComplete: () => void;
  onStartPractice: () => void;
}

// Add new interfaces for tracking progress
interface SkillProgress {
  learn: { completed: boolean; progress: number };
  practice: { completed: boolean; progress: number };
  test: { 
    completed: boolean; 
    progress: number;
    score?: number;
    answers?: {
      [exerciseId: string]: any;  // Store answers for each exercise
    };
  };
}

// Update Skill interface
export interface Skill {
  id: SkillId;
  title: string;
  description: string;
  level: string;
  order: number;
  status: 'locked' | 'available' | 'completed';
  prerequisites?: SkillId[];
  score?: number;
  progress?: SkillProgress;  // Add progress tracking
}

// Update Level interface
export interface Level {
  id: number;
  title: string;
  description: string;
  status: 'locked' | 'in-progress' | 'completed';
  progress: number;
  totalSkills: number;
  skills: Skill[];  // Change from string[] to Skill[]
}

// ... other types