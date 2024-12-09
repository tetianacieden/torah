"use client";

import { useState } from 'react';
import { Exercise } from '@/types';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { SingleSelect } from './exercises/SingleSelect';
import { MultipleSelect } from './exercises/MultipleSelect';
import { SortBoxes } from './exercises/SortBoxes';
import { Construct } from './exercises/Construct';
import { MatchPairs } from './exercises/MatchPairs';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { AcademicCapIcon } from '@heroicons/react/24/outline';
import { BeakerIcon } from '@heroicons/react/24/outline';
import { BookOpenIcon } from '@heroicons/react/24/outline';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

interface PracticeSectionProps {
  exercises: Exercise[];
  onComplete: () => void;
  onStartTest: () => void;
}

// Add type for the drag and drop provided object
interface DroppableProvided {
  innerRef: (element: HTMLElement | null) => void;
  droppableProps: {
    [key: string]: any;
  };
  placeholder?: React.ReactElement;
}

interface DraggableProvided {
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: {
    [key: string]: any;
  };
  dragHandleProps: {
    [key: string]: any;
  } | null;
}

interface HelpContent {
  theory: string;
  examples: string[];
}

function HelpPopup({ content, onClose }: { content: HelpContent; onClose: () => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      {/* Fixed size container with max height */}
      <div className="relative w-full max-w-2xl mx-4 h-[600px] animate-fade-up">
        <div className="bg-white rounded-2xl shadow-xl h-full flex flex-col">
          {/* Top Decoration */}
          <div className="h-2 bg-blue-500 flex-shrink-0" />

          {/* Header - Fixed */}
          <div className="px-8 py-6 border-b bg-white">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <BookOpenIcon className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Let's Review
              </h3>
            </div>
          </div>

          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto px-8 py-6">
            <div className="prose max-w-none space-y-8">
              {/* Theory Section */}
              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-blue-900 mb-4">Theory</h4>
                <div className="text-blue-800" dangerouslySetInnerHTML={{ __html: content.theory }} />
              </div>

              {/* Examples Section */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Examples</h4>
                <ul className="space-y-4">
                  {content.examples.map((example, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 mt-1">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div dangerouslySetInnerHTML={{ __html: example }} />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Action Button - Fixed */}
          <div className="p-6 border-t bg-white">
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 
                         transition-all duration-200
                         flex items-center gap-2 font-medium"
              >
                Got it, thanks!
                <CheckCircleIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add help content for each exercise type
const helpContent: Record<string, HelpContent> = {
  'hebrew-sounds': {
    theory: `
      <p>Hebrew letters have consistent sounds, with a few exceptions:</p>
      <ul class="list-disc pl-6 space-y-2">
        <li>א (Alef) is silent but carries vowel sounds</li>
        <li>ב (Bet/Vet) has two sounds:
          <ul class="ml-4 mt-1">
            <li>בּ (with dot) = "b" as in "boy"</li>
            <li>ב (without dot) = "v" as in "very"</li>
          </ul>
        </li>
        <li>ג (Gimel) = "g" as in "good"</li>
        <li>ד (Dalet) = "d" as in "door"</li>
      </ul>
    `,
    examples: [
      `<span class="font-hebrew text-2xl">בָּבָּה</span> - "baba" (uses Bet with dot)`,
      `<span class="font-hebrew text-2xl">אָב</span> - "av" (uses Bet without dot)`,
      `<span class="font-hebrew text-2xl">גַּן</span> - "gan" (garden)`
    ]
  },
  'final-forms': {
    theory: `
      <p>Five Hebrew letters change their form when they appear at the end of a word:</p>
      <ul class="list-disc pl-6 space-y-2">
        <li>מ (Mem) → ם</li>
        <li>נ (Nun) → ן</li>
        <li>צ (Tzadi) → ץ</li>
        <li>פ (Peh) → ף</li>
        <li>כ (Kaf) → ך</li>
      </ul>
      <p class="mt-4">Remember: The sound stays the same, only the shape changes!</p>
    `,
    examples: [
      `<span class="font-hebrew text-2xl">שָׁלוֹם</span> - "shalom" (peace) - ends with ם`,
      `<span class="font-hebrew text-2xl">בֵּן</span> - "ben" (son) - ends with ן`,
      `<span class="font-hebrew text-2xl">אֶרֶץ</span> - "eretz" (land) - ends with ץ`
    ]
  },
  'vowel-carriers': {
    theory: `
      <p>Some Hebrew letters can carry vowel sounds. The main vowel carriers are:</p>
      <ul class="list-disc pl-6 space-y-2">
        <li>א (Alef) - silent, can carry any vowel</li>
        <li>ה (Heh) - can be silent at end of word</li>
        <li>ו (Vav) - can be "o" or "u"</li>
        <li>י (Yod) - can be "i" or "ey"</li>
      </ul>
    `,
    examples: [
      `<span class="font-hebrew text-2xl">אוֹר</span> - "or" (light) - א carries "o" sound`,
      `<span class="font-hebrew text-2xl">מִי</span> - "mi" (who) - י makes "i" sound`,
      `<span class="font-hebrew text-2xl">תּוֹרָה</span> - "torah" - ו makes "o" sound`
    ]
  },
  'word-construction': {
    theory: `
      <p>Hebrew words are read from right to left. When constructing words:</p>
      <ul class="list-disc pl-6 space-y-2">
        <li>Start from the rightmost letter</li>
        <li>Pay attention to final forms at word end</li>
        <li>Look for vowel marks under/above letters</li>
        <li>Remember that some letters can change sound</li>
      </ul>
    `,
    examples: [
      `<span class="font-hebrew text-2xl">שָׁלוֹם</span> - "shalom" breaks down as:
       <ul class="ml-4 mt-1">
         <li>ש (sh) + ָ (a) + ל (l) + וֹ (o) + ם (m)</li>
       </ul>`,
      `<span class="font-hebrew text-2xl">סֵפֶר</span> - "sefer" (book) breaks down as:
       <ul class="ml-4 mt-1">
         <li>ס (s) + ֵ (e) + פ (f) + ֶ (e) + ר (r)</li>
       </ul>`
    ]
  }
};

function PracticeCompletionPopup({ onClose, onKeepPracticing }: { 
  onClose: () => void;
  onKeepPracticing: () => void;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative bg-white rounded-2xl overflow-hidden max-w-md mx-4 w-full animate-fade-up">
        <div className="h-2 bg-green-500" />
        <div className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircleIcon className="w-8 h-8 text-green-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Practice Complete!
              </h3>
              <p className="text-gray-600">
                Great work! What would you like to do next?
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button
              onClick={onKeepPracticing}
              className="px-6 py-2.5 bg-white border-2 border-blue-600 text-blue-600 rounded-lg 
                       hover:bg-blue-50 transition-all duration-200 transform hover:scale-105
                       flex items-center gap-2 font-medium"
            >
              Keep Practicing
              <BeakerIcon className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 
                       transition-all duration-200 transform hover:scale-105
                       flex items-center gap-2 font-medium shadow-lg shadow-green-100"
            >
              Start Test
              <AcademicCapIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to generate additional practice exercises
function generateMoreExercises(baseExercises: Exercise[]): Exercise[] {
  const newExercises: Exercise[] = [
    {
      id: 'extra1',
      type: 'single-select',
      helpContentKey: 'hebrew-sounds',
      question: 'Which letter makes a "v" sound in Hebrew?',
      options: ['א (Alef)', 'ב (Vet)', 'ג (Gimel)', 'ד (Dalet)'],
      correctAnswer: 'ב (Vet)',
      feedback: {
        correct: "That's right! ב without a dot (vet) makes a 'v' sound.",
        incorrect: "Try again! Think about the letter ב without a dot."
      }
    },
    {
      id: 'extra2',
      type: 'match-pairs',
      helpContentKey: 'hebrew-sounds',
      question: 'Match these letters with their sounds:',
      pairs: [
        { left: 'ו', right: 'v/o/u' },
        { left: 'י', right: 'y/i' },
        { left: 'ה', right: 'h' }
      ]
    },
    {
      id: 'extra3',
      type: 'multiple-select',
      helpContentKey: 'vowel-carriers',
      question: 'Select all letters that can be vowel carriers:',
      options: ['ו', 'ב', 'י', 'ה', 'א'],
      correctAnswers: ['ו', 'י', 'א'],
      feedback: {
        correct: "Correct! These letters can carry vowel sounds.",
        incorrect: "Some selections are incorrect. Focus on letters that can represent vowels."
      }
    }
  ];

  return newExercises;
}

export function PracticeSection({ exercises: initialExercises, onComplete, onStartTest }: PracticeSectionProps) {
  const [exercises, setExercises] = useState(initialExercises);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [feedback, setFeedback] = useState<{
    isCorrect: boolean;
    message: string;
  } | null>(null);
  const [showCompletionPopup, setShowCompletionPopup] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const handleKeepPracticing = () => {
    const moreExercises = generateMoreExercises(exercises);
    setExercises(prev => [...prev, ...moreExercises]);
    setShowCompletionPopup(false);
    // Continue with current progress
    setCurrentIndex(exercises.length);
  };

  const currentExercise = exercises[currentIndex];
  const progress = ((currentIndex + 1) / exercises.length) * 100;

  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setFeedback(null);
    } else {
      onComplete();
      setShowCompletionPopup(true);
    }
  };

  const handleAnswer = (answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [currentExercise.id]: answer
    }));
    setFeedback(null);
  };

  const handleSubmit = () => {
    const answer = answers[currentExercise.id];
    let isCorrect = false;

    switch (currentExercise.type) {
      case 'single-select':
        isCorrect = answer === currentExercise.correctAnswer;
        break;
      case 'multiple-select':
        isCorrect = 
          answer.length === currentExercise.correctAnswers.length &&
          answer.every((a: string) => currentExercise.correctAnswers.includes(a));
        break;
      case 'sort-boxes':
        isCorrect = Object.entries(currentExercise.correctPlacements as Record<string, string[]>).every(
          ([category, items]) => {
            const currentItems = answer[category] || [];
            return (
              currentItems.length === items.length &&
              currentItems.every((item: string) => items.includes(item))
            );
          }
        );
        break;
      case 'construct':
        isCorrect = 
          answer.length === currentExercise.correctSequence.length &&
          answer.every((item: string, index: number) => item === currentExercise.correctSequence[index]);
        break;
      case 'match-pairs':
        isCorrect = currentExercise.pairs.every(({ left, right }: { left: string; right: string }) =>
          answer.some(([l, r]: [string, string]) => l === left && r === right)
        );
        break;
    }

    setFeedback({
      isCorrect,
      message: isCorrect 
        ? currentExercise.feedback?.correct || "Correct! Well done!"
        : currentExercise.feedback?.incorrect || "Try again!"
    });
  };

  const canSubmit = !!answers[currentExercise.id];
  const canGoNext = feedback?.isCorrect;

  // Update feedback popup to include help button
  const renderFeedbackPopup = () => {
    if (!feedback) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-black/50" onClick={() => setFeedback(null)} />
        <div className="relative bg-white/0 w-[400px] mx-4">
          <div className={`p-4 ${feedback.isCorrect ? 'bg-green-50' : 'bg-red-50'} rounded-t-2xl`}>
            <h3 className={`text-xl font-semibold ${
              feedback.isCorrect ? 'text-green-800' : 'text-red-800'
            }`}>
              {feedback.isCorrect ? 'Correct!' : 'Try Again'}
            </h3>
          </div>

          <div className="p-4 bg-white rounded-b-2xl">
            <p className="text-gray-700 mb-4">
              {feedback.message}
            </p>

            <div className="flex justify-end gap-3">
              {!feedback.isCorrect && (
                <button
                  onClick={() => {
                    setFeedback(null);
                    setShowHelp(true);
                  }}
                  className="px-6 py-2.5 bg-white border-2 border-blue-600 text-blue-600 rounded-lg 
                           hover:bg-blue-50 transition-all duration-200
                           flex items-center gap-2 text-sm font-medium"
                >
                  I Need Help
                  <BookOpenIcon className="w-5 h-5" />
                </button>
              )}
              
              <button
                onClick={() => {
                  setFeedback(null);
                  if (feedback.isCorrect) handleNext();
                }}
                className={`px-6 py-2.5 rounded-lg transition-all duration-200 
                         flex items-center gap-2 text-sm font-medium
                         ${feedback.isCorrect 
                           ? 'bg-green-600 text-white hover:bg-green-700'
                           : 'bg-blue-600 text-white hover:bg-blue-700'
                         }`}
              >
                {feedback.isCorrect ? (
                  <>
                    {currentIndex === exercises.length - 1 ? 'Complete' : 'Next Exercise'}
                    <ChevronRightIcon className="w-5 h-5" />
                  </>
                ) : (
                  'Try Again'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-[calc(100vh-73px)] relative">
      {/* Progress Bar - Fixed */}
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

      {/* Exercise Content - Fixed height container */}
      <div className="absolute inset-0 pt-[44px] pb-[64px]">
        <div className="h-full max-w-7xl mx-auto px-4">
          <div className="h-full bg-white rounded-xl p-6">
            {/* Question Header with Help Button */}
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                {currentExercise.question}
              </h3>
              <button
                onClick={() => setShowHelp(true)}
                className="ml-4 p-2 text-blue-600hover:bg-blue-50 rounded-lg transition-colors 
                          flex items-center gap-2 text-sm font-medium"
              >
                <BookOpenIcon className="w-5 h-5" />
                I Need Help
              </button>
            </div>

            {/* Exercise Component - Takes remaining height */}
            <div className="flex-1 overflow-hidden">
              {currentExercise.type === 'single-select' && (
                <SingleSelect
                  options={currentExercise.options}
                  selected={answers[currentExercise.id]}
                  onChange={handleAnswer}
                  disabled={feedback?.isCorrect}
                />
              )}
              {currentExercise.type === 'multiple-select' && (
                <MultipleSelect
                  options={currentExercise.options}
                  selected={answers[currentExercise.id] || []}
                  onChange={handleAnswer}
                  disabled={feedback?.isCorrect}
                />
              )}
              {currentExercise.type === 'sort-boxes' && (
                <SortBoxes
                  items={currentExercise.items}
                  categories={currentExercise.categories}
                  currentPlacements={answers[currentExercise.id] || {}}
                  onChange={handleAnswer}
                  disabled={feedback?.isCorrect}
                />
              )}
              {currentExercise.type === 'construct' && (
                <Construct
                  availableBlocks={currentExercise.availableBlocks}
                  correctSequence={currentExercise.correctSequence}
                  onChange={(sequence) => handleAnswer(sequence)}
                  disabled={feedback?.isCorrect}
                />
              )}
              {currentExercise.type === 'match-pairs' && (
                <MatchPairs
                  pairs={currentExercise.pairs}
                  currentMatches={answers[currentExercise.id] || []}
                  onChange={handleAnswer}
                  disabled={feedback?.isCorrect}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation - Fixed */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-40">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              {currentIndex + 1} of {exercises.length}
            </span>

            {canSubmit && !feedback?.isCorrect ? (
              <button
                onClick={handleSubmit}
                className="px-8 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Check Answer
              </button>
            ) : (
              <button
                disabled
                className="px-8 py-2.5 bg-gray-200 text-gray-400 rounded-lg cursor-not-allowed"
              >
                Check Answer
              </button>
            )}
          </div>
        </div>
      </div>

      {feedback && renderFeedbackPopup()}

      {showCompletionPopup && (
        <PracticeCompletionPopup
          onClose={() => {
            setShowCompletionPopup(false);
            onStartTest();
          }}
          onKeepPracticing={handleKeepPracticing}
        />
      )}

      {showHelp && (
        <HelpPopup
          content={helpContent[currentExercise.helpContentKey] || helpContent['single-select-hebrew-sounds']}
          onClose={() => setShowHelp(false)}
        />
      )}
    </div>
  );
} 