"use client";

import React, { useRef, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { levelsData } from '@/data/curriculum/levels';
import { Level, Skill } from '@/types';
import { ArrowLeftIcon, BeakerIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { skillsData } from '@/data/curriculum/skills';
import { calculateTotalPoints } from '@/utils/points';

export default function LevelPage() {
  const router = useRouter();
  const params = useParams();
  const levelId = params?.levelId as string;
  const level = levelsData.find(l => l.id.toString() === levelId);

  // Add ref for scrolling
  const skillsContainerRef = useRef<HTMLDivElement>(null);
  const inProgressSkillRef = useRef<HTMLDivElement>(null);

  // Get the skills for this level
  const levelSkills = level ? skillsData
    .filter(skill => skill.level.toString() === level.id.toString())
    .sort((a, b) => a.order - b.order) : [];

  // Calculate progress
  const completedSkills = levelSkills.filter(skill => skill.status === 'completed').length;
  const totalSkills = levelSkills.length;
  const progress = Math.round((completedSkills / totalSkills) * 100) || 0;
  const inProgressSkill = levelSkills.find(skill => skill.status === 'available');
  const totalPoints = calculateTotalPoints(levelSkills);

  // Scroll to in-progress skill on mount
  useEffect(() => {
    if (inProgressSkillRef.current && skillsContainerRef.current) {
      const container = skillsContainerRef.current;
      const element = inProgressSkillRef.current;
      const elementPosition = element.offsetTop - (container.offsetHeight / 2) + (element.offsetHeight / 2);
      
      container.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  if (!level) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Level not found</h1>
          <Link href="/" className="text-blue-600 hover:text-blue-800 transition-colors">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <div className="sticky top-0 bg-gray-50 z-10 pt-8 pb-4">
        <div className="max-w-6xl mx-auto px-4">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Levels
          </Link>

          {/* Level Header */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className={`
                w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold
                ${progress === 100 ? 'bg-emerald-100 text-emerald-700' :
                  progress > 0 ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-400'}
              `}>
                {level.id}
              </div>
              <div>
                <h1 className="text-3xl font-bold">{level.title}</h1>
                <p className="text-gray-600">{level.description}</p>
              </div>
            </div>
            
            {/* Progress Overview */}
            <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
              <div className="flex gap-8">
                <div>
                  <div className="text-sm text-gray-500">Progress</div>
                  <div className="text-2xl font-bold text-gray-900">{completedSkills}/{totalSkills}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Total Points</div>
                  <div className="text-2xl font-bold text-emerald-600">
                    {totalPoints}
                  </div>
                </div>
              </div>
              <div className="w-64 h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Skills Section */}
      <div 
        ref={skillsContainerRef}
        className="max-h-[calc(100vh-24rem)] overflow-y-auto py-8"
      >
        <div className="max-w-6xl mx-auto px-4">
          {/* Skills Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200"></div>

            <div className="space-y-8">
              {levelSkills.map((skill, index) => {
                const isCompleted = skill.status === 'completed';
                const isInProgress = skill.status === 'available';
                const isLocked = skill.status === 'locked';

                return (
                  <div 
                    key={skill.id} 
                    ref={isInProgress ? inProgressSkillRef : null}
                    className={`
                      relative flex items-center gap-8
                      ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}
                    `}
                  >
                    {/* Timeline Node */}
                    <div className={`
                      absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-4 border-white
                      ${isCompleted ? 'bg-emerald-500' :
                        isInProgress ? 'bg-blue-500 animate-pulse' :
                        'bg-gray-300'}
                    `}></div>

                    {/* Content Card */}
                    <div className={`
                      w-[calc(50%-2rem)] bg-white rounded-xl shadow-lg p-6
                      min-h-[200px]
                      flex flex-col
                      ${isInProgress ? 'ring-2 ring-blue-400 ring-offset-4 ring-offset-gray-50' : ''}
                      ${isCompleted ? 'border-emerald-200' : isInProgress ? 'border-blue-200' : 'border-gray-200'}
                      transition-all duration-300 hover:shadow-xl
                    `}>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              {isCompleted ? (
                                <CheckCircleIcon className="w-6 h-6 text-emerald-500" />
                              ) : isLocked ? (
                                <LockClosedIcon className="w-6 h-6 text-gray-400" />
                              ) : (
                                <BeakerIcon className="w-6 h-6 text-blue-500" />
                              )}
                              <h3 className="text-lg font-semibold">{skill.title}</h3>
                            </div>
                            <p className="text-gray-600">
                              {skill.description}
                            </p>
                          </div>

                          {isCompleted && (
                            <span className="text-sm font-medium text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">
                              {skill.score}/100
                            </span>
                          )}
                        </div>

                        {isInProgress && (
                          <div className="mt-4">
                            <div className="flex gap-1">
                              {/* Learn Section - Completed */}
                              <div className="flex-1">
                                <div className="flex items-center justify-between text-xs mb-1">
                                  <span className="text-emerald-600">Learn</span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-emerald-500 rounded-full"
                                    style={{ width: '100%' }}
                                  ></div>
                                </div>
                              </div>

                              {/* Practice Section - In Progress */}
                              <div className="flex-1">
                                <div className="flex items-center justify-between text-xs mb-1">
                                  <span className="text-blue-600">Practice</span>
                                  <span className="text-blue-600">20%</span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-blue-500 rounded-full"
                                    style={{ width: '20%' }}
                                  ></div>
                                </div>
                              </div>

                              {/* Test Section - Not Started */}
                              <div className="flex-1">
                                <div className="flex items-center justify-between text-xs mb-1">
                                  <span className="text-gray-400">Test</span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-gray-300 rounded-full"
                                    style={{ width: '0%' }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-4 border-t">
                        <div>
                          {isCompleted && (
                            <span className="text-sm font-medium text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">
                              {skill.score}/100
                            </span>
                          )}
                        </div>
                        {!isLocked && (
                          <Link
                            href={`/skill/${skill.id}`}
                            className={`
                              px-4 py-2 rounded-lg text-sm font-medium
                              ${isCompleted 
                                ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' 
                                : 'bg-blue-500 text-white hover:bg-blue-600'}
                              transition-colors
                            `}
                          >
                            {isCompleted ? 'Practice Again' : 'Continue Learning'}
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 