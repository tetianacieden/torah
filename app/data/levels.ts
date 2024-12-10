import { Level } from '@/types';
import { skillsData } from './curriculum/skills';

// Helper function to generate random score between 80 and 100
const randomScore = () => Math.floor(Math.random() * (100 - 80 + 1)) + 80;

export const levels: Level[] = [
  {
      id: 1,
      title: "Hebrew Foundations",
      description: "Learn the basics of Hebrew letters and reading",
      progress: 10,
      totalSkills: 10,
      skills: [
          {
              id: 'letter-recognition', title: 'Letter Recognition', level: '1', order: 1, status: 'completed', score: randomScore(),
              description: '',
              skillId: 'letter-recognition'
          },
          {
              id: 'basic-reading', title: 'Basic Reading', level: '1', order: 2, status: 'completed', score: randomScore(),
              description: '',
              skillId: 'basic-reading'
          },
          {
              id: 'vowel-marks', title: 'Vowel Marks', level: '1', order: 3, status: 'completed', score: randomScore(),
              description: '',
              skillId: 'vowel-marks'
          },
          {
              id: 'letter-writing', title: 'Letter Writing', level: '1', order: 4, status: 'completed', score: randomScore(),
              description: '',
              skillId: 'letter-writing'
          },
          {
              id: 'final-letters', title: 'Final Letters', level: '1', order: 5, status: 'completed', score: randomScore(),
              description: '',
              skillId: 'final-letters'
          },
          {
              id: 'basic-pronunciation', title: 'Basic Pronunciation', level: '1', order: 6, status: 'completed', score: randomScore(),
              description: '',
              skillId: 'basic-pronunciation'
          },
          {
              id: 'writing-direction', title: 'Writing Direction', level: '1', order: 7, status: 'completed', score: randomScore(),
              description: '',
              skillId: 'writing-direction'
          },
          {
              id: 'letter-combinations', title: 'Letter Combinations', level: '1', order: 8, status: 'completed', score: randomScore(),
              description: '',
              skillId: 'letter-combinations'
          },
          {
              id: 'basic-vocabulary', title: 'Basic Vocabulary', level: '1', order: 9, status: 'completed', score: randomScore(),
              description: '',
              skillId: 'basic-vocabulary'
          },
          {
              id: 'reading-practice', title: 'Reading Practice', level: '1', order: 10, status: 'completed', score: randomScore(),
              description: '',
              skillId: 'reading-practice'
          }
      ],
      status: 'completed',
      order: 0,
      hebrewTitle: undefined,
      learningGoals: undefined
  },
  {
      id: 2,
      title: "Text Navigation",
      description: "Learn to navigate and understand Chumash structure",
      status: "in-progress",
      progress: 3,
      totalSkills: 7,
      skills: [
          {
              id: 'chapter-structure', title: 'Chapter Structure', level: '2', order: 1, status: 'completed', score: randomScore(),
              description: '',
              skillId: undefined
          },
          {
              id: 'verse-navigation', title: 'Verse Navigation', level: '2', order: 2, status: 'completed', score: randomScore(),
              description: '',
              skillId: undefined
          },
          {
              id: 'parsha-overview', title: 'Parsha Overview', level: '2', order: 3, status: 'completed', score: randomScore(),
              description: '',
              skillId: undefined
          },
          {
              id: 'text-markers', title: 'Text Markers', level: '2', order: 4, status: 'available',
              description: '',
              skillId: undefined
          },
          {
              id: 'section-breaks', title: 'Section Breaks', level: '2', order: 5, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'page-layout', title: 'Page Layout', level: '2', order: 6, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'reference-system', title: 'Reference System', level: '2', order: 7, status: 'locked',
              description: '',
              skillId: undefined
          }
      ],
      order: 0,
      hebrewTitle: undefined,
      learningGoals: undefined
  },
  {
      id: 3,
      title: "Basic Grammar",
      description: "Understand fundamental Hebrew grammar concepts",
      status: "locked",
      progress: 0,
      totalSkills: 9,
      skills: [
          {
              id: 'root-words', title: 'Root Words', level: '3', order: 1, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'prefixes', title: 'Prefixes', level: '3', order: 2, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'suffixes', title: 'Suffixes', level: '3', order: 3, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'word-patterns', title: 'Word Patterns', level: '3', order: 4, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'gender-forms', title: 'Gender Forms', level: '3', order: 5, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'number-forms', title: 'Number Forms', level: '3', order: 6, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'basic-conjugation', title: 'Basic Conjugation', level: '3', order: 7, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'possessives', title: 'Possessives', level: '3', order: 8, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'articles', title: 'Articles', level: '3', order: 9, status: 'locked',
              description: '',
              skillId: undefined
          }
      ],
      order: 0,
      hebrewTitle: undefined,
      learningGoals: undefined
  },
  {
      id: 4,
      title: "Vocabulary Building",
      description: "Build essential Torah vocabulary",
      status: "locked",
      progress: 0,
      totalSkills: 8,
      skills: [
          {
              id: 'common-words', title: 'Common Words', level: '4', order: 1, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'word-families', title: 'Word Families', level: '4', order: 2, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'context-clues', title: 'Context Clues', level: '4', order: 3, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'word-relationships', title: 'Word Relationships', level: '4', order: 4, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'synonyms', title: 'Synonyms', level: '4', order: 5, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'antonyms', title: 'Antonyms', level: '4', order: 6, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'root-patterns', title: 'Root Patterns', level: '4', order: 7, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'frequency-words', title: 'Frequency Words', level: '4', order: 8, status: 'locked',
              description: '',
              skillId: undefined
          }
      ],
      order: 0,
      hebrewTitle: undefined,
      learningGoals: undefined
  },
  {
      id: 5,
      title: "Sentence Structure",
      description: "Learn to analyze Hebrew sentence patterns",
      status: "locked",
      progress: 0,
      totalSkills: 10,
      skills: [
          {
              id: 'basic-sentences', title: 'Basic Sentences', level: '5', order: 1, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'complex-structures', title: 'Complex Structures', level: '5', order: 2, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'verb-forms', title: 'Verb Forms', level: '5', order: 3, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'sentence-types', title: 'Sentence Types', level: '5', order: 4, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'word-order', title: 'Word Order', level: '5', order: 5, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'clauses', title: 'Clauses', level: '5', order: 6, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'conjunctions', title: 'Conjunctions', level: '5', order: 7, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'modifiers', title: 'Modifiers', level: '5', order: 8, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'prepositions', title: 'Prepositions', level: '5', order: 9, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'particles', title: 'Particles', level: '5', order: 10, status: 'locked',
              description: '',
              skillId: undefined
          }
      ],
      order: 0,
      hebrewTitle: undefined,
      learningGoals: undefined
  },
  {
      id: 6,
      title: "Commentary Basics",
      description: "Introduction to major commentaries",
      status: "locked",
      progress: 0,
      totalSkills: 7,
      skills: [
          {
              id: 'rashi-script', title: 'Rashi Script', level: '6', order: 1, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'basic-terms', title: 'Basic Terms', level: '6', order: 2, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'commentary-structure', title: 'Commentary Structure', level: '6', order: 3, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'cross-references', title: 'Cross References', level: '6', order: 4, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'abbreviations', title: 'Abbreviations', level: '6', order: 5, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'citation-methods', title: 'Citation Methods', level: '6', order: 6, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'commentary-layout', title: 'Commentary Layout', level: '6', order: 7, status: 'locked',
              description: '',
              skillId: undefined
          }
      ],
      order: 0,
      hebrewTitle: undefined,
      learningGoals: undefined
  },
  {
      id: 7,
      title: "Advanced Grammar",
      description: "Master complex grammatical concepts",
      status: "locked",
      progress: 0,
      totalSkills: 8,
      skills: [
          {
              id: 'verb-conjugation', title: 'Verb Conjugation', level: '7', order: 1, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'tense-system', title: 'Tense System', level: '7', order: 2, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'special-forms', title: 'Special Forms', level: '7', order: 3, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'grammar-patterns', title: 'Grammar Patterns', level: '7', order: 4, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'irregular-verbs', title: 'Irregular Verbs', level: '7', order: 5, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'advanced-prefixes', title: 'Advanced Prefixes', level: '7', order: 6, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'complex-suffixes', title: 'Complex Suffixes', level: '7', order: 7, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'binyanim-system', title: 'Binyanim System', level: '7', order: 8, status: 'locked',
              description: '',
              skillId: undefined
          }
      ],
      order: 0,
      hebrewTitle: undefined,
      learningGoals: undefined
  },
  {
      id: 8,
      title: "Text Analysis",
      description: "Develop deeper text understanding",
      status: "locked",
      progress: 0,
      totalSkills: 9,
      skills: [
          {
              id: 'theme-recognition', title: 'Theme Recognition', level: '8', order: 1, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'pattern-analysis', title: 'Pattern Analysis', level: '8', order: 2, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'context-study', title: 'Context Study', level: '8', order: 3, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'comparative-reading', title: 'Comparative Reading', level: '8', order: 4, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'literary-devices', title: 'Literary Devices', level: '8', order: 5, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'textual-variants', title: 'Textual Variants', level: '8', order: 6, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'historical-context', title: 'Historical Context', level: '8', order: 7, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'parallel-passages', title: 'Parallel Passages', level: '8', order: 8, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'narrative-structure', title: 'Narrative Structure', level: '8', order: 9, status: 'locked',
              description: '',
              skillId: undefined
          }
      ],
      order: 0,
      hebrewTitle: undefined,
      learningGoals: undefined
  },
  {
      id: 9,
      title: "Commentary Deep Dive",
      description: "Advanced commentary navigation and understanding",
      status: "locked",
      progress: 0,
      totalSkills: 8,
      skills: [
          {
              id: 'multiple-sources', title: 'Multiple Sources', level: '9', order: 1, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'commentary-comparison', title: 'Commentary Comparison', level: '9', order: 2, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'historical-context-adv', title: 'Historical Context', level: '9', order: 3, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'methodology', title: 'Methodology', level: '9', order: 4, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'super-commentary', title: 'Super-Commentary', level: '9', order: 5, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'cross-references-adv', title: 'Cross-References', level: '9', order: 6, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'source-analysis', title: 'Source Analysis', level: '9', order: 7, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'argument-structure', title: 'Argument Structure', level: '9', order: 8, status: 'locked',
              description: '',
              skillId: undefined
          }
      ],
      order: 0,
      hebrewTitle: undefined,
      learningGoals: undefined
  },
  {
      id: 10,
      title: "Independent Study",
      description: "Apply all skills in independent learning",
      status: "locked",
      progress: 0,
      totalSkills: 9,
      skills: [
          {
              id: 'research-methods', title: 'Research Methods', level: '10', order: 1, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'source-navigation', title: 'Source Navigation', level: '10', order: 2, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'analysis-writing', title: 'Analysis Writing', level: '10', order: 3, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'discussion-leading', title: 'Discussion Leading', level: '10', order: 4, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'comparative-study', title: 'Comparative Study', level: '10', order: 5, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'original-insights', title: 'Original Insights', level: '10', order: 6, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'teaching-skills', title: 'Teaching Skills', level: '10', order: 7, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'project-planning', title: 'Project Planning', level: '10', order: 8, status: 'locked',
              description: '',
              skillId: undefined
          },
          {
              id: 'resource-management', title: 'Resource Management', level: '10', order: 9, status: 'locked',
              description: '',
              skillId: 'resource-management',
              requiredMastery: 0
          }
      ],
      order: 0,
      hebrewTitle: undefined,
      learningGoals: undefined
  }
];