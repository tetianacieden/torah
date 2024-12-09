export const skillScores: Record<string, number> = {
  'letter-recognition': 95,
  'basic-reading': 92,
  'vowel-marks': 88,
  'letter-writing': 90,
  'final-letters': 93,
  'basic-pronunciation': 87,
  'writing-direction': 91,
  'letter-combinations': 89,
  'basic-vocabulary': 94,
  'reading-practice': 96,
  'chapter-structure': 85,
  'verse-navigation': 88,
  'parsha-overview': 90,
  'text-markers': 0  // Not completed yet
}; 

export type SkillId = string;

export interface SkillScore {
  id: SkillId;
  score: number;
  completedAt: string;
} 