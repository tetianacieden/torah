"use client";

import { useState, useRef, useEffect } from 'react';
import { BeakerIcon, SpeakerWaveIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { LearningContent, LearningProps } from '@/types';
import { UI } from '@/styles/constants';

export function LearningSection({ content, onComplete, onStartPractice }: LearningProps) {
  const [activeSection, setActiveSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<number[]>([]);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const markSectionComplete = (index: number) => {
    if (!completedSections.includes(index)) {
      const newCompleted = [...completedSections, index];
      setCompletedSections(newCompleted);
      
      if (newCompleted.length === content.sections.length) {
        onComplete();
      }
    }
  };

  const scrollToSection = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(index);
  };

  // Update active section based on scroll position
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.findIndex(ref => ref === entry.target);
            if (index !== -1) {
              setActiveSection(index);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      {/* Content Sections */}
      <div className="flex gap-12 relative pb-16 pt-4 h-[calc(100vh-12rem)]">
        {/* Left Side - Table of Contents - Fixed position */}
        <div className="w-64 flex-shrink-0">
          <div className="fixed w-64">
            <div className="space-y-2">
              {content.sections.map((section, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(index)}
                  className={`
                    w-full text-left px-4 py-3 rounded-lg
                    ${activeSection === index 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50'}
                    transition-colors
                  `}
                >
                  <span className="text-lg">{section.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Content - Scrollable container */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto pr-4">
            <div className="space-y-16">
              {content.sections.map((section: {
                title: string;
                subtitle?: string;
                explanation: string;
                examples?: string[];
                visual?: string;
                visualCaption?: string;
              }, index: number) => (
                <div
                  key={index}
                  ref={el => sectionRefs.current[index] = el}
                  className={`
                    scroll-mt-4
                    ${UI.animations.fadeIn}
                    ${UI.animations.slideIn}
                  `}
                >
                  {/* Section Title */}
                  <div className={`
                    border-l-4 border-blue-500 pl-4 mb-6
                    ${UI.effects.glow}
                  `}>
                    <h2 className={`${UI.text.title} ${UI.animations.fadeIn}`}>
                      {section.title}
                    </h2>
                    {section.subtitle && (
                      <p className={`${UI.text.subtitle} ${UI.animations.slideIn}`}>
                        {section.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Main Content */}
                  <div className={`
                    prose max-w-none space-y-6
                    ${UI.animations.fadeIn}
                  `}>
                    {/* Text Explanation */}
                    <div 
                      className="bg-white rounded-lg p-6"
                      dangerouslySetInnerHTML={{ __html: section.explanation }} 
                    />

                    {/* Examples */}
                    {section.examples && (
                      <div className="bg-blue-50 rounded-xl p-8">
                        <h4 className="text-lg font-bold text-blue-900 mb-6 flex items-center gap-2">
                          <BeakerIcon className="w-6 h-6" />
                          Examples
                        </h4>
                        <div className="space-y-4">
                          {section.examples.map((example, idx) => (
                            <div 
                              key={idx} 
                              className="bg-white rounded-xl p-6 flex items-center justify-between"
                            >
                              <div className="text-blue-900 text-lg">
                                <div 
                                  dangerouslySetInnerHTML={{ __html: example }}
                                  className="leading-relaxed"
                                />
                              </div>
                              <button 
                                className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center text-blue-600 transition-colors"
                                onClick={() => {/* Add sound playback functionality */}}
                              >
                                <SpeakerWaveIcon className="w-6 h-6" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Visual Content */}
                    {section.visual && (
                      <div>
                        <img
                          src={section.visual}
                          alt={section.visualCaption || "Visual explanation"}
                          className="rounded-lg w-full"
                        />
                        {section.visualCaption && (
                          <p className="text-sm text-gray-600 mt-2 text-center">
                            {section.visualCaption}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Bar with Practice Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-end">
          <button
            onClick={() => {
              const allSections = Array.from({ length: content.sections.length }, (_, i) => i);
              setCompletedSections(allSections);
              onComplete();
              onStartPractice();
            }}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            Let's Practice
            <BeakerIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
} 