"use client";

import { useState } from 'react';

interface ConstructProps {
  availableBlocks: string[];
  correctSequence: string[];
  onChange: (sequence: string[]) => void;
  disabled?: boolean;
}

export function Construct({ availableBlocks, correctSequence, onChange, disabled = false }: ConstructProps) {
  const [sequence, setSequence] = useState<string[]>([]);
  const [available, setAvailable] = useState<string[]>(availableBlocks);

  const handleBlockClick = (block: string, isFromSequence: boolean) => {
    if (disabled) return;

    if (isFromSequence) {
      // Remove from sequence and add back to available
      setSequence(prev => prev.filter(b => b !== block));
      setAvailable(prev => [...prev, block]);
    } else {
      // Add to sequence and remove from available
      setSequence(prev => [...prev, block]);
      setAvailable(prev => prev.filter(b => b !== block));
    }

    // Notify parent of change
    const newSequence = isFromSequence 
      ? sequence.filter(b => b !== block)
      : [...sequence, block];
    onChange(newSequence);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Answer Area */}
      <div className="p-6 bg-blue-50 rounded-xl border-2 border-dashed border-blue-200">
        {sequence.length === 0 ? (
          <div className="text-blue-500 text-center">
            Drag blocks here to construct your answer
          </div>
        ) : (
          <div className="flex gap-3 justify-center">
            {sequence.map((block, index) => (
              <button
                key={`${block}-${index}`}
                onClick={() => handleBlockClick(block, true)}
                disabled={disabled}
                className={`
                  w-12 h-12 bg-white rounded-lg shadow-sm border border-blue-200 
                  flex items-center justify-center text-lg font-hebrew
                  ${disabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-50 cursor-pointer'}
                `}
              >
                {block}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Available Blocks */}
      <div className="flex gap-3 justify-center">
        {available.map((block, index) => (
          <button
            key={`${block}-${index}`}
            onClick={() => handleBlockClick(block, false)}
            disabled={disabled}
            className={`
              w-12 h-12 bg-white rounded-lg shadow-sm border border-gray-200 
              flex items-center justify-center text-lg font-hebrew
              ${disabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-50 cursor-pointer'}
            `}
          >
            {block}
          </button>
        ))}
      </div>
    </div>
  );
} 