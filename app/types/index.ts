export interface Level {
  id: number;
  title: string;
  description: string;
  status: 'locked' | 'in-progress' | 'completed';
  skills: string[];
  progress: number;
  totalSkills: number;
  lockMessage?: string;
}

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

export interface LearningProps {
  content: LearningContent;
  onComplete: () => void;
}

// Add these types for practice exercises
export type ExerciseType = 
  | 'single-select'
  | 'multiple-select'
  | 'sort-boxes'
  | 'construct'
  | 'match-pairs';

export interface BaseExercise {
  id: string;
  type: ExerciseType;
  question: string;
  explanation?: string;
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

export interface SortBoxesExercise extends BaseExercise {
  type: 'sort-boxes';
  items: string[];
  categories: string[];
  correctPlacements: Record<string, string[]>;
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

export type Exercise = 
  | SingleSelectExercise 
  | MultipleSelectExercise 
  | SortBoxesExercise 
  | ConstructExercise
  | MatchPairsExercise;

export interface StudentProgress {
  id: string;
  name: string;
  progress: {
    [skillId: string]: {
      status: 'completed' | 'in-progress' | 'not-started';
      score?: number;
      lastActivity?: string;
    }
  }
}

export interface SkillProgress {
  skillId: string;
  skillName: string;
  score: number;
}

export interface SkillIssue {
  skillId: string;
  skillName: string;
  score: number;
  specificIssues: string[];
}

export interface StudentInsight {
  student: StudentProgress;
  averageRecentScore: number;
  strugglingSkills: SkillIssue[];
}

export interface TeacherStudent extends StudentProgress {
  email: string;
  class: string;
  lastActive: string;
}

export interface TeacherClass {
  id: string;
  name: string;
  students: TeacherStudent[];
  averageProgress: number;
  lastActivity: string;
}