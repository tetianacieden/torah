"use client";

import { type FC } from 'react';

interface ProgressBarProps {
  progress: number;
  total: number;
  className?: string;
}

export const ProgressBar: FC<ProgressBarProps> = ({ progress, total, className = '' }) => {
  const percentage = Math.round((progress / total) * 100);

  return (
    <div className={`w-full h-2 bg-gray-200 rounded-full overflow-hidden ${className}`}>
      <div
        className="h-full bg-blue-500 transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};
