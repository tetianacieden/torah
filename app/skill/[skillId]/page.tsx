"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon, BookOpenIcon, BeakerIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { LearningSection } from '@/components/skill/LearningSection';
import { PracticeSection } from '@/components/skill/PracticeSection';
import { TestSection } from '@/components/skill/TestSection';
import { skillsData } from '@/data/curriculum/skills';
import { LearningProps, Exercise, Skill } from '@/types';

type Step = 'learn' | 'practice' | 'test';

export default function SkillPage() {
  const params = useParams();
  const skill = skillsData.find(s => s.id === params.skillId);
  
  // Initialize state with practice step if skill is completed
  const [currentStep, setCurrentStep] = useState<Step>(
    skill?.status === 'completed' ? 'practice' : 'learn'
  );

  // Initialize progress - mark Learn and Test as completed for completed skills
  const [progress, setProgress] = useState(
    skill?.status === 'completed' 
      ? {
          learn: { completed: true, progress: 100 },
          practice: { completed: false, progress: 0 },
          test: { completed: true, progress: 100 }
        }
      : skill?.progress || {
          learn: { completed: false, progress: 0 },
          practice: { completed: false, progress: 0 },
          test: { completed: false, progress: 0 }
        }
  );

  // If skill is completed, show Learn and Test as completed
  useEffect(() => {
    if (skill?.status === 'completed') {
      setProgress(prev => ({
        ...prev,
        learn: { completed: true, progress: 100 },
        test: { completed: true, progress: 100 }
      }));
    }
  }, [skill]);

  const steps = [
    { id: 'learn', label: 'Learn', icon: BookOpenIcon },
    { id: 'practice', label: 'Practice', icon: BeakerIcon },
    { id: 'test', label: 'Test', icon: AcademicCapIcon }
  ];

  const getStepStatus = (stepId: Step) => {
    if (progress[stepId].completed) return 'completed';
    if (stepId === currentStep) return 'current';
    if (stepId === 'practice' && !progress.learn.completed) return 'locked';
    if (stepId === 'test' && !progress.practice.completed) return 'locked';
    return 'upcoming';
  };

  const exercises: Exercise[] = [
    {
      id: '1',
      type: 'single-select',
      helpContentKey: 'hebrew-sounds',
      question: 'Which letter makes a "b" sound in Hebrew?',
      options: ['א (Alef)', 'ב (Bet)', 'ג (Gimel)', 'ד (Dalet)'],
      correctAnswer: 'ב (Bet)',
      feedback: {
        correct: "That's right! ב (Bet) makes a 'b' sound, like in 'boy'.",
        incorrect: "Try again! Think about which letter sounds like its name in English."
      }
    },
    {
      id: '2',
      type: 'multiple-select',
      helpContentKey: 'final-forms',
      question: 'Select all letters that can appear at the end of a word in a different form:',
      options: ['מ (Mem)', 'ב (Bet)', 'נ (Nun)', 'ל (Lamed)', 'צ (Tzadi)'],
      correctAnswers: ['מ (Mem)', 'נ (Nun)', 'צ (Tzadi)'],
      feedback: {
        correct: "Correct! These letters have special 'final forms' when they appear at the end of a word.",
        incorrect: "Some selections are incorrect. Look for letters that change their form at the end of words."
      }
    },
    {
      id: '4',
      type: 'construct',
      helpContentKey: 'word-construction',
      question: 'Arrange these letters to spell "shalom" (peace):',
      availableBlocks: ['ם', 'ו', 'ל', 'ש'],
      correctSequence: ['ש', 'ל', 'ו', 'ם']
    },
    {
      id: '5',
      type: 'match-pairs',
      helpContentKey: 'hebrew-sounds',
      question: 'Match each Hebrew letter with its correct name:',
      pairs: [
        { left: 'א', right: 'Alef' },
        { left: 'ב', right: 'Bet' },
        { left: 'ג', right: 'Gimel' },
        { left: 'ד', right: 'Dalet' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header with Steps */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 items-center py-3">
            {/* Left side: Back Button + Title */}
            <div className="flex items-center gap-8">
              <Link
                href="/level/1"
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors inline-flex"
              >
                <ArrowLeftIcon className="w-5 h-5" />
              </Link>
              <h1 className="text-2xl font-bold">Basic Reading</h1>
            </div>

            {/* Right side: Steps Navigation */}
            <div className="flex items-center justify-center gap-4">
              {steps.map((step, index) => {
                const status = getStepStatus(step.id as Step);
                const Icon = step.icon;
                
                return (
                  <div key={step.id} className="flex items-center">
                    {index > 0 && (
                      <div className="relative h-px w-32 mx-2">
                        <div className="absolute inset-0 bg-gray-200" />
                        {progress[steps[index - 1].id as Step].completed && (
                          <div className="absolute inset-0 bg-blue-500 transition-all duration-500" />
                        )}
                      </div>
                    )}
                    <div className="relative">
                      <button
                        onClick={() => {
                          if (status !== 'locked') setCurrentStep(step.id as Step);
                        }}
                        disabled={status === 'locked'}
                        className={`
                          group flex flex-col items-center gap-2 px-6 py-2 rounded-lg
                          ${status === 'current' 
                            ? 'text-blue-600' 
                            : status === 'completed'
                            ? 'text-emerald-600'
                            : status === 'locked'
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'text-gray-500 hover:text-gray-700'}
                          transition-all duration-200
                        `}
                      >
                        {/* Icon Container */}
                        <div className={`
                          relative w-12 h-12 rounded-full flex items-center justify-center
                          ${status === 'current'
                            ? 'bg-blue-100 ring-2 ring-blue-500 ring-offset-2'
                            : status === 'completed'
                            ? 'bg-emerald-100'
                            : status === 'locked'
                            ? 'bg-gray-100'
                            : 'bg-gray-100 group-hover:bg-gray-200'}
                          transition-all duration-200
                        `}>
                          {status === 'completed' ? (
                            <div className="relative">
                              <CheckCircleIcon className="w-8 h-8 text-emerald-500" />
                              <div className="absolute inset-0 animate-ping-slow">
                                <CheckCircleIcon className="w-8 h-8 text-emerald-500 opacity-50" />
                              </div>
                            </div>
                          ) : (
                            <Icon className={`w-6 h-6 ${status === 'locked' ? 'opacity-50' : ''}`} />
                          )}
                        </div>

                        {/* Label */}
                        <span className="font-medium whitespace-nowrap">
                          {step.label}
                        </span>

                        {/* Progress Bar for Current Step */}
                        {status === 'current' && (
                          <div className="absolute -bottom-1 left-0 right-0 h-1 bg-blue-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-500 transition-all duration-500"
                              style={{ width: `${progress[step.id as Step].progress}%` }}
                            />
                          </div>
                        )}

                        {/* Lock Indicator */}
                        {status === 'locked' && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full" />
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Add padding for fixed header */}
      <div className="pt-24 max-w-7xl mx-auto px-4 pb-24">
        {currentStep === 'learn' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <LearningSection 
              content={{
                title: "Basic Reading",
                sections: [
                  {
                    title: "Introduction to Hebrew Letters",
                    subtitle: "Understanding the basics of the Hebrew alphabet",
                    explanation: `
                      <p>Hebrew is written from right to left and has 22 letters. Each letter represents a consonant sound, and vowels are typically indicated by marks above or below the letters.</p>
                      <p>The Hebrew alphabet is also known as the "Aleph-Bet," named after the first two letters: Aleph (א) and Bet (ב).</p>
                    `,
                    examples: [
                      `<span class="font-hebrew text-3xl">א</span> - 
                       <strong class="text-blue-900">Aleph:</strong> 
                       <span class="text-gray-700">Silent letter, first letter of the alphabet. 
                       Often carries vowel sounds when combined with vowel marks.</span>`,
                      
                      `<span class="font-hebrew text-3xl">ב</span> - 
                       <strong class="text-blue-900">Bet:</strong> 
                       <span class="text-gray-700">Makes a 'b' sound as in 'boy'. 
                       When written with a dot (בּ) it makes the 'b' sound, without the dot (ב) it makes a 'v' sound.</span>`,
                      
                      `<span class="font-hebrew text-3xl">ג</span> - 
                       <strong class="text-blue-900">Gimel:</strong> 
                       <span class="text-gray-700">Makes a 'g' sound as in 'girl'. 
                       One of the simplest letters to recognize and pronounce.</span>`
                    ],
                    visual: "/images/hebrew-alphabet.png",
                    visualCaption: "The Hebrew alphabet with letter names and sounds"
                  },
                  {
                    title: "Letter Forms",
                    subtitle: "Different forms of Hebrew letters",
                    explanation: `
                      <p>Some Hebrew letters have different forms when they appear at the end of a word. These are called "final forms" or "sofit" letters.</p>
                    `,
                    examples: [
                      "מ (Mem) becomes ם at the end of a word",
                      "נ (Nun) becomes ן at the end of a word",
                      "צ (Tzadi) becomes ץ at the end of a word"
                    ],
                    visual: "/images/final-letters.png",
                    visualCaption: "Regular and final forms of Hebrew letters"
                  }
                  // ... more sections
                ]
              }}
              onComplete={() => {
                setProgress(prev => ({
                  ...prev,
                  learn: { completed: true, progress: 100 }
                }));
              }}
              onStartPractice={() => {
                setCurrentStep('practice');
              }}
            />
          </div>
        )}

        {currentStep === 'practice' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <PracticeSection 
              exercises={exercises}
              onComplete={() => {
                setProgress(prev => ({
                  ...prev,
                  practice: { completed: true, progress: 100 }
                }));
              }}
              onStartTest={() => {
                setCurrentStep('test');
              }}
            />
          </div>
        )}

        {currentStep === 'test' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <TestSection 
              exercises={exercises}
              savedAnswers={skill?.progress?.test?.answers}  // Pass saved answers
              onComplete={(passed) => {
                setProgress(prev => ({
                  ...prev,
                  test: { 
                    completed: passed,
                    progress: 100
                  }
                }));
                if (!passed) {
                  // Show message suggesting to go back to practice
                  alert('Try reviewing the material and practicing more before attempting the test again.');
                  setCurrentStep('practice');
                }
              }}
              onRetry={() => {
                setProgress(prev => ({
                  ...prev,
                  test: { 
                    completed: false,
                    progress: 0
                  }
                }));
                setCurrentStep('practice');
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
} 