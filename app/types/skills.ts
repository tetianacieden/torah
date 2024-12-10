export interface Skill {
  id: string;
  title: string;
  description: string;
  level: string;
  order: number;
  status: 'completed' | 'in-progress' | 'locked';
  score?: number;
} 