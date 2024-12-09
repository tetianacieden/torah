"use client";

import React from 'react';

export function WelcomeCharacter() {
  return (
    <div className="relative w-40 h-40">
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}
      >
        {/* Black Hat */}
        <path 
          d="M25 25 C25 25 35 15 50 15 C65 15 75 25 75 25 L72 22 C72 22 65 18 50 18 C35 18 28 22 28 22 Z" 
          fill="#000000"
        />
        <ellipse cx="50" cy="25" rx="25" ry="6" fill="#000000"/>
        
        {/* Face */}
        <path 
          d="M35 25 C35 25 35 45 50 45 C65 45 65 25 65 25" 
          fill="#F5D0C5"
        />
        <ellipse cx="50" cy="32" rx="15" ry="12" fill="#F5D0C5"/>
        
        {/* Beard */}
        <path 
          d="M35 32 C35 32 40 55 50 55 C60 55 65 32 65 32" 
          fill="#4B5563"
        />
        <path 
          d="M37 34 C37 34 42 52 50 52 C58 52 63 34 63 34" 
          fill="#374151"
        />
        
        {/* Peyot */}
        <path 
          d="M35 28 C33 32 32 38 34 42" 
          stroke="#4B5563" 
          strokeWidth="2" 
          fill="none"
        />
        <path 
          d="M65 28 C67 32 68 38 66 42" 
          stroke="#4B5563" 
          strokeWidth="2" 
          fill="none"
        />
        
        {/* Eyes */}
        <path 
          d="M43 30 C43 32 41 32 41 30" 
          stroke="#000000" 
          strokeWidth="1.5"
        />
        <path 
          d="M57 30 C57 32 55 32 55 30" 
          stroke="#000000" 
          strokeWidth="1.5"
        />

        {/* Gentle Smile */}
        <path 
          d="M45 36 C47 38 53 38 55 36" 
          fill="none" 
          stroke="#000000" 
          strokeWidth="1"
        />
      </svg>
    </div>
  );
} 