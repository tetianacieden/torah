"use client";

import { useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

interface MatchPairsProps {
  pairs: Array<{ left: string; right: string }>;
  currentMatches: Array<[string, string]>;
  onChange: (matches: Array<[string, string]>) => void;
  disabled?: boolean;
}

export function MatchPairs({ pairs, currentMatches, onChange, disabled }: MatchPairsProps) {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);

  const handleLeftClick = (item: string) => {
    if (disabled) return;
    setSelectedLeft(item);
  };

  const handleRightClick = (item: string) => {
    if (disabled || !selectedLeft) return;

    const newMatches = [...currentMatches];
    
    // Remove any existing matches involving either item
    const filteredMatches = newMatches.filter(([left, right]) => 
      left !== selectedLeft && right !== item
    );

    // Add the new match
    onChange([...filteredMatches, [selectedLeft, item]]);
    setSelectedLeft(null);
  };

  const isMatched = (item: string, side: 'left' | 'right') => {
    return currentMatches.some(([left, right]) => 
      side === 'left' ? left === item : right === item
    );
  };

  return (
    <div className="flex justify-between gap-16">
      {/* Left Column */}
      <div className="flex-1 space-y-4">
        {pairs.map(({ left }) => (
          <button
            key={left}
            onClick={() => handleLeftClick(left)}
            disabled={disabled || isMatched(left, 'left')}
            className={`
              w-full p-4 rounded-lg border-2 text-left transition-all
              ${selectedLeft === left ? 'border-blue-500 bg-blue-50' :
                isMatched(left, 'left') ? 'border-green-500 bg-green-50' :
                'border-gray-200 hover:border-gray-300'}
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <div className="flex items-center justify-between">
              <span>{left}</span>
              {isMatched(left, 'left') && (
                <CheckCircleIcon className="w-5 h-5 text-green-500" />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Right Column */}
      <div className="flex-1 space-y-4">
        {pairs.map(({ right }) => (
          <button
            key={right}
            onClick={() => handleRightClick(right)}
            disabled={disabled || isMatched(right, 'right')}
            className={`
              w-full p-4 rounded-lg border-2 text-left transition-all
              ${selectedLeft && !isMatched(right, 'right') ? 'border-blue-200 bg-blue-50' :
                isMatched(right, 'right') ? 'border-green-500 bg-green-50' :
                'border-gray-200 hover:border-gray-300'}
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <div className="flex items-center justify-between">
              <span>{right}</span>
              {isMatched(right, 'right') && (
                <CheckCircleIcon className="w-5 h-5 text-green-500" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
} 