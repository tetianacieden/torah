"use client";

import { 
  useState, 
  useEffect, 
  useRef, 
  useCallback, 
  useMemo,
  type ReactNode,
  type MouseEvent,
  type FormEvent,
  type ChangeEvent,
  type KeyboardEvent
} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { levelsData } from '@/data/curriculum/levels';
import { skillsData } from '@/data/curriculum/skills';
import { calculateTotalPoints } from '@/utils/points';
import { 
  ChevronUpIcon, 
  ChevronDownIcon,
  LockClosedIcon 
} from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

interface MyLearningProps {
  // Add any props if needed
}

export default function MyLearning({}: MyLearningProps) {
  const router = useRouter();
  const [expandedLevel, setExpandedLevel] = useState<string | null>(null);

  const handleLevelClick = useCallback((levelId: string | number) => {
    setExpandedLevel(prev => prev === levelId.toString() ? null : levelId.toString());
  }, []);

  const handleSkillClick = useCallback((skillId: string) => {
    router.push(`/skill/${skillId}`);
  }, [router]);

  const totalPoints = useMemo(() => calculateTotalPoints(skillsData), []);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Learning</h1>
        
        <div className="space-y-6">
          {levelsData.map((level) => (
            <div key={level.id} className="bg-white rounded-lg shadow">
              {/* Level header */}
              <button
                onClick={() => handleLevelClick(level.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{level.title}</h2>
                  <p className="text-sm text-gray-500 mt-1">{level.description}</p>
                </div>
                <ChevronUpIcon 
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    expandedLevel === level.id.toString() ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Level content */}
              {expandedLevel === level.id.toString() && (
                <div className="px-6 pb-6">
                  {/* Skills grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {skillsData
                      .filter(skill => skill.level.toString() === level.id.toString())
                      .map(skill => (
                        <button
                          key={skill.id}
                          onClick={() => handleSkillClick(skill.id)}
                          className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 text-left"
                          disabled={skill.status === 'locked'}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-gray-900">{skill.title}</h3>
                              <p className="text-sm text-gray-500 mt-1">{skill.description}</p>
                            </div>
                            {skill.status === 'completed' && (
                              <CheckCircleIcon className="w-5 h-5 text-green-500" />
                            )}
                            {skill.status === 'locked' && (
                              <LockClosedIcon className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}