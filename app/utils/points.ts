import { Skill } from '@/types';

export const calculateTotalPoints = (skills: Skill[]) => {
  return skills
    .filter(skill => skill.status === 'completed')
    .reduce((total, skill) => total + (skill.score || 0), 0);
}; 