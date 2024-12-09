"use client";

import { useState } from 'react';
import Link from 'next/link';
import { WelcomeCharacter } from './components/WelcomeCharacter';
import { Navigation } from './components/Navigation';
import { levels } from './data/levels';
import { 
  ChevronUpIcon, 
  ChevronDownIcon,
  LockClosedIcon 
} from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { calculateTotalPoints } from '@/utils/points';
import { Url } from 'next/dist/shared/lib/router/router';

interface SkillWrapperProps {
  href?: Url;
  children: React.ReactNode;
  className: string;
}

function SkillWrapper({ href, children, className }: SkillWrapperProps) {
  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return <div className={className}>{children}</div>;
}

export default function Home() {
  const [expandedLevels, setExpandedLevels] = useState<number[]>(() => {
    return levels.filter(level => level.status === 'in-progress').map(level => level.id);
  });

  const toggleLevel = (levelId: number) => {
    setExpandedLevels(prev => 
      prev.includes(levelId) 
        ? prev.filter(id => id !== levelId)
        : [...prev, levelId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Side Navigation with Role Switcher */}
      <Navigation />

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        {/* Welcome Message */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border-l-4 border-blue-600">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Shalom, Daniel 👋
              </h1>
              <p className="text-lg text-gray-600">
                Every lesson is a new journey, full of exciting discoveries. Explore new words, stories, and wisdom, and watch yourself grow with every step! 🌟
              </p>
            </div>
            <WelcomeCharacter />
          </div>
        </div>

        {/* Levels List */}
        <div className="space-y-6">
          {levels.map((level) => (
            <div 
              key={level.id}
              className={`
                bg-white rounded-xl transition-all duration-300 transform
                ${level.status === 'in-progress' 
                  ? 'shadow-xl border-2 border-blue-400 scale-[1.02]' 
                  : level.status === 'locked'
                    ? 'shadow opacity-75'
                    : 'shadow hover:shadow-md'}
              `}
            >
              <div className="px-8 py-6 flex items-center justify-between">
                <button
                  onClick={() => toggleLevel(level.id)}
                  className="flex-1 flex items-center"
                >
                  <div className="flex items-center gap-6">
                    <div className={`
                      w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg relative
                      ${level.status === 'completed' ? 'bg-green-100 text-green-700' :
                        level.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-400'}
                    `}>
                      {level.id}
                      {level.status === 'completed' && (
                        <CheckCircleIcon className="w-6 h-6 text-green-600 absolute -top-1 -right-1 bg-white rounded-full" />
                      )}
                      {level.status === 'locked' && (
                        <LockClosedIcon className="w-5 h-5 text-gray-400 absolute -top-1 -right-1 bg-white rounded-full p-0.5" />
                      )}
                    </div>
                    <div className="text-left">
                      <h2 className="text-xl font-semibold">{level.title}</h2>
                      <p className="text-sm text-gray-500">
                        {level.status === 'completed' ? 'Completed' :
                         level.status === 'in-progress' ? `${level.progress}/${level.totalSkills} skills completed` :
                         'Complete previous level to unlock'}
                      </p>
                    </div>
                  </div>
                </button>

                <div className="flex items-center gap-4">
                  {level.status !== 'locked' && (
                    <Link
                      href={`/level/${level.id}`}
                      className={`
                        px-4 py-2 rounded-lg font-medium text-sm
                        ${level.status === 'completed' 
                          ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                          : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}
                        transition-colors
                      `}
                    >
                      {level.status === 'completed' ? 'Review Level' : 'Continue'}
                    </Link>
                  )}
                  
                  <button
                    onClick={() => toggleLevel(level.id)}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    {expandedLevels.includes(level.id) ? (
                      <ChevronUpIcon className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {expandedLevels.includes(level.id) && (
                <div className="px-8 pb-6 animate-fade-in">
                  <div className="grid grid-cols-4 gap-4 relative">
                    {level.skills.map((skill, index) => {
                      const SkillWrapper = level.status === 'locked' ? 'div' : Link;
                      const wrapperProps = level.status === 'locked' 
                        ? {} 
                        : { href: `/skill/${skill.id}` };

                      return (
                        <SkillWrapper
                          key={skill.id}
                          {...wrapperProps}
                          className={`
                            group relative flex-1 p-4 rounded-lg border h-24 
                            transition-all duration-300
                            ${level.status === 'locked' 
                              ? 'bg-gray-50 border-gray-200 opacity-75 cursor-not-allowed' 
                              : index < level.progress 
                                ? 'bg-white border-emerald-200 hover:border-emerald-300 cursor-pointer' 
                                : level.status === 'in-progress' && index === level.progress
                                  ? 'bg-white border-blue-200 hover:border-blue-300 shadow-md cursor-pointer'
                                  : 'bg-white border-gray-100 hover:border-gray-200 cursor-pointer'}
                          `}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`
                              w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium
                              transition-colors
                              ${level.status === 'locked' 
                                ? 'bg-gray-200 text-gray-600' 
                                : index < level.progress 
                                  ? 'bg-emerald-600 text-white group-hover:bg-emerald-700' 
                                  : level.status === 'in-progress' && index === level.progress
                                    ? 'bg-blue-600 text-white group-hover:bg-blue-700'
                                    : 'bg-gray-200 text-gray-600'}
                            `}>
                              {index < level.progress ? '✓' : (index + 1)}
                            </span>
                            <span className={`
                              font-medium transition-colors
                              ${level.status === 'locked' 
                                ? 'text-gray-400' 
                                : index < level.progress 
                                  ? 'text-emerald-700 group-hover:text-emerald-800' 
                                  : level.status === 'in-progress' && index === level.progress
                                    ? 'text-gray-900'
                                    : 'text-gray-400'}
                            `}>
                              {skill.title}
                            </span>
                          </div>

                          {index < level.progress && (
                            <div className="absolute bottom-2 right-2">
                              <span className="text-xs font-medium text-emerald-800 bg-emerald-50 px-2 py-1 rounded">
                                {skill.score}/100
                              </span>
                            </div>
                          )}
                        </SkillWrapper>
                      );
                    })}
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