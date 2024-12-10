import { Level } from '@/types';
import { skillsData } from './skills';

export const levelsData: Level[] = [
  {
      id: 1,
      title: 'Hebrew Foundations',
      description: 'Learn the basics of Hebrew letters and reading',
      order: 1,
      status: 'in-progress',
      progress: 0,
      totalSkills: 10,
      skills: skillsData.filter(skill => skill.level === '1'),
      hebrewTitle: undefined,
      learningGoals: undefined
  },
  {
      id: 2,
      title: 'Text Navigation',
      description: 'Learn to navigate and understand Torah text structure',
      order: 2,
      status: 'locked',
      progress: 0,
      totalSkills: 7,
      skills: skillsData.filter(skill => skill.level === '2'),
      hebrewTitle: undefined,
      learningGoals: undefined
  },
  {
      id: 3,
      title: 'Basic Grammar',
      description: 'Master fundamental Hebrew grammar concepts',
      order: 3,
      status: 'locked',
      progress: 0,
      totalSkills: 9,
      skills: skillsData.filter(skill => skill.level === '3'),
      hebrewTitle: undefined,
      learningGoals: undefined
  }
];