import type { StudentProgress } from './index';

export interface TeacherStudent extends StudentProgress {
  email: string;
  class: string;
  lastActive: string;
}

export interface TeacherClass {
  id: string;
  name: string;
  grade: string;
  students: TeacherStudent[];
  averageProgress: number;
  lastActivity: string;
} 