"use client";
import { useState } from 'react';
import { Exercise } from '@/types/exercises';
import { SingleSelect } from './exercises/SingleSelect';
import { MultipleSelect } from './exercises/MultipleSelect';
import { Construct } from './exercises/Construct';
import { MatchPairs } from './exercises/MatchPairs';
import { CheckCircleIcon, XCircleIcon, ArrowPathIcon, ChevronLeftIcon, ChevronRightIcon, BookOpenIcon, BeakerIcon, SpeakerWaveIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

interface TestSectionProps {
  exercises: Exercise[];
  onComplete: (passed: boolean) => void;
  onRetry: () => void;
}

interface FeedbackPopupProps {
  passed: boolean;
  score: number;
  onClose: () => void;
  onRetry: () => void;
}

function FeedbackPopup({ passed, score, onClose, onRetry }: FeedbackPopupProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay with blur effect */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      {/* Popup Content */}
      <div className="relative w-full max-w-lg mx-4 animate-fade-up">
        <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl">
          {/* Top Decoration */}
          <div className={`h-2 ${passed ? 'bg-green-500' : 'bg-blue-500'}`} />

          {/* Character and Message */}
          <div className={`p-8 ${passed ? 'bg-green-50/50' : 'bg-blue-50/50'}`}>
            <div className="flex items-center gap-6">
              <div className="flex-shrink-0">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
                  passed ? 'bg-green-100' : 'bg-blue-100'
                }`}>
                  {passed ? (
                    <div className="relative">
                      <CheckCircleIcon className="w-12 h-12 text-green-500" />
                      <div className="absolute inset-0 animate-ping-slow">
                        <CheckCircleIcon className="w-12 h-12 text-green-500 opacity-50" />
                      </div>
                    </div>
                  ) : (
                    <BeakerIcon className="w-12 h-12 text-blue-500" />
                  )}
                </div>
              </div>
              <div>
                <h3 className={`text-2xl font-bold mb-2 ${passed ? 'text-green-800' : 'text-blue-800'}`}>
                  {passed ? 'Congratulations!' : 'Keep Learning!'}
                </h3>
                <p className={`text-lg ${passed ? 'text-green-700' : 'text-blue-700'}`}>
                  {passed 
                    ? `You scored ${score}/5! You've mastered these concepts.`
                    : `You scored ${score}/5. A bit more practice will help you succeed!`
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Message and Action */}
          <div className="p-8 bg-white">
            {passed ? (
              <>
                <p className="text-gray-600 mb-6">
                  You've demonstrated a solid understanding of the Hebrew letters. 
                  Ready to move on to the next challenge?
                </p>
                <div className="flex justify-end">
                  <button
                    onClick={onClose}
                    className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 
                             transition-all duration-200 transform hover:scale-105
                             flex items-center gap-2 font-medium shadow-lg shadow-green-100"
                  >
                    Continue Learning
                    <ChevronRightIcon className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  <p className="text-gray-600 font-medium">
                    Here are some tips to help you improve:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-gray-600 bg-gray-50 p-3 rounded-lg">
                      <div className="flex-shrink-0 w-6 h-6 mt-0.5">
                        <BookOpenIcon className="w-6 h-6 text-blue-500" />
                      </div>
                      <span>Review the learning materials to strengthen your understanding</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-600 bg-gray-50 p-3 rounded-lg">
                      <div className="flex-shrink-0 w-6 h-6 mt-0.5">
                        <BeakerIcon className="w-6 h-6 text-blue-500" />
                      </div>
                      <span>Practice with more exercises to build confidence</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-600 bg-gray-50 p-3 rounded-lg">
                      <div className="flex-shrink-0 w-6 h-6 mt-0.5">
                        <SpeakerWaveIcon className="w-6 h-6 text-blue-500" />
                      </div>
                      <span>Listen to the letter sounds to improve recognition</span>
                    </li>
                  </ul>
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={onRetry}
                    className="px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-xl 
                             hover:bg-blue-50 transition-all duration-200 transform hover:scale-105
                             flex items-center gap-2 font-medium"
                  >
                    Practice More
                    <BeakerIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={onClose}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 
                             transition-all duration-200 transform hover:scale-105
                             flex items-center gap-2 font-medium shadow-lg shadow-blue-100"
                  >
                    Review Learning
                    <BookOpenIcon className="w-5 h-5" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function TestSection({ exercises, onComplete, onRetry }: TestSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [testScore, setTestScore] = useState(0);

  const currentExercise = exercises[currentIndex];
  const progress = ((currentIndex + 1) / exercises.length) * 100;

  const handleAnswer = (answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [currentExercise.id]: answer
    }));
  };

  const checkAnswer = (exercise: Exercise, answer: any): boolean => {
    if (!answer) return false;
    
    switch (exercise.type) {
      case 'single-select':
        return answer === exercise.correctAnswer;
      case 'multiple-select':
        return answer.length === exercise.correctAnswers?.length &&
          answer.every((a: string) => exercise.correctAnswers?.includes(a));
      case 'construct':
        return answer.length === exercise.correctSequence?.length &&
          answer.every((item: string, index: number) => item === exercise.correctSequence?.[index]);
      case 'match-pairs':
        return exercise.pairs?.every(({ left, right }: { left: string, right: string }) =>
          answer.some(([l, r]: [string, string]) => l === left && r === right)
        );
      default:
        return false;
    }
  };

  const handleSubmit = () => {
    const correctAnswers = exercises.reduce((count, exercise) => {
      const isCorrect = checkAnswer(exercise, answers[exercise.id]);
      return isCorrect ? count + 1 : count;
    }, 0);

    setTestScore(correctAnswers);
    setSubmitted(true);
    setShowFeedback(true);
    const passed = correctAnswers >= 4;
    onComplete(passed);
  };

  const allAnswered = exercises.every(exercise => answers[exercise.id]);

  return (
    <div className="h-[calc(100vh-73px)] relative">
      {/* Progress Bar */}
      <div className="fixed top-[73px] left-0 right-0 bg-white z-40 border-b">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="absolute inset-0 pt-[44px] pb-[64px]">
        <div className="h-full max-w-3xl mx-auto px-4">
          <div className="h-full bg-white rounded-xl p-6">
            {/* Question Header */}
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Question {currentIndex + 1} of {exercises.length}
              </h3>
              {submitted && (
                <div className={`${checkAnswer(currentExercise, answers[currentExercise.id]) ? 'text-green-600' : 'text-red-600'}`}>
                  {checkAnswer(currentExercise, answers[currentExercise.id]) ? 
                    <CheckCircleIcon className="w-6 h-6" /> : 
                    <XCircleIcon className="w-6 h-6" />
                  }
                </div>
              )}
            </div>

            {/* Question */}
            <div className="mb-8">
              {currentExercise.question}
            </div>

            {/* Exercise Component */}
            <div className="mt-4">
              {currentExercise.type === 'single-select' && (
                <SingleSelect
                  options={currentExercise.options || []}
                  selected={answers[currentExercise.id]}
                  onChange={handleAnswer}
                  disabled={submitted}
                />
              )}
              {currentExercise.type === 'multiple-select' && (
                <MultipleSelect
                  options={currentExercise.options || []}
                  selected={answers[currentExercise.id] || []}
                  onChange={handleAnswer}
                  disabled={submitted}
                />
              )}
              {currentExercise.type === 'construct' && (
                <Construct
                  availableBlocks={currentExercise.availableBlocks || []}
                  correctSequence={currentExercise.correctSequence || []}
                  onChange={handleAnswer}
                  disabled={submitted}
                />
              )}
              {currentExercise.type === 'match-pairs' && (
                <MatchPairs
                  pairs={currentExercise.pairs || []}
                  currentMatches={answers[currentExercise.id] || []}
                  onChange={handleAnswer}
                  disabled={submitted}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-40">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Navigation Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentIndex(prev => prev - 1)}
                disabled={currentIndex === 0}
                className={`
                  p-2 rounded-lg flex items-center gap-1
                  ${currentIndex === 0 
                    ? 'text-gray-300 cursor-not-allowed' 
                    : 'text-gray-600 hover:bg-gray-100'}
                `}
              >
                <ChevronLeftIcon className="w-5 h-5" />
                Previous
              </button>
              <button
                onClick={() => setCurrentIndex(prev => prev + 1)}
                disabled={currentIndex === exercises.length - 1}
                className={`
                  p-2 rounded-lg flex items-center gap-1
                  ${currentIndex === exercises.length - 1
                    ? 'text-gray-300 cursor-not-allowed' 
                    : 'text-gray-600 hover:bg-gray-100'}
                `}
              >
                Next
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Action Button */}
            {!submitted ? (
              <button
                onClick={handleSubmit}
                disabled={!allAnswered}
                className={`
                  px-8 py-2.5 rounded-lg font-medium
                  ${allAnswered
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
                `}
              >
                Submit Test
              </button>
            ) : (
              <button
                onClick={onRetry}
                className="px-8 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center gap-2"
              >
                <ArrowPathIcon className="w-5 h-5" />
                Try Again
              </button>
            )}
          </div>
        </div>
      </div>

      {showFeedback && (
        <FeedbackPopup
          passed={testScore >= 4}
          score={testScore}
          onClose={() => {
            setShowFeedback(false);
            if (testScore < 4) {
              onRetry();
            }
          }}
          onRetry={() => {
            setShowFeedback(false);
            onRetry();
          }}
        />
      )}
    </div>
  );
} 