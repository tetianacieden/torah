import { skillScores } from './scores';
import { Skill } from '@/types';

export const skillsData: Skill[] = [
  // Level 1: Hebrew Foundations (10 skills)
  {
      id: 'letter-recognition',
      title: 'Letter Recognition',
      description: 'Learn to identify and recognize all Hebrew letters',
      level: '1',
      order: 1,
      status: 'completed',
      score: skillScores['letter-recognition'],
      skillId: 'letter-recognition'
  },
  {
      id: 'basic-reading',
      title: 'Basic Reading',
      description: 'Master fundamental Hebrew reading skills',
      level: '1',
      order: 2,
      status: 'completed',
      prerequisites: ['letter-recognition'],
      score: skillScores['basic-reading'],
      skillId: 'basic-reading'
  },
  {
      id: 'vowel-marks',
      title: 'Vowel Marks',
      description: 'Understand and use the Nikud system',
      level: '1',
      order: 3,
      status: 'completed',
      prerequisites: ['basic-reading'],
      score: skillScores['vowel-marks'],
      skillId: 'vowel-marks'
  },
  {
      id: 'letter-writing',
      title: 'Letter Writing',
      description: 'Practice writing Hebrew letters with proper form',
      level: '1',
      order: 4,
      status: 'completed',
      prerequisites: ['letter-recognition'],
      score: skillScores['letter-writing'],
      skillId: undefined
  },
  {
      id: 'final-letters',
      title: 'Final Letters',
      description: 'Learn the special forms of letters at word endings',
      level: '1',
      order: 5,
      status: 'completed',
      prerequisites: ['letter-writing'],
      score: skillScores['final-letters'],
      skillId: undefined
  },
  {
      id: 'basic-pronunciation',
      title: 'Basic Pronunciation',
      description: 'Develop proper pronunciation of letters and vowels',
      level: '1',
      order: 6,
      status: 'completed',
      prerequisites: ['vowel-marks'],
      score: skillScores['basic-pronunciation'],
      skillId: undefined
  },
  {
      id: 'writing-direction',
      title: 'Writing Direction',
      description: 'Master the right-to-left writing system',
      level: '1',
      order: 7,
      status: 'completed',
      prerequisites: ['letter-writing'],
      score: skillScores['writing-direction'],
      skillId: undefined
  },
  {
      id: 'letter-combinations',
      title: 'Letter Combinations',
      description: 'Learn common letter combinations and rules',
      level: '1',
      order: 8,
      status: 'completed',
      prerequisites: ['basic-pronunciation'],
      score: skillScores['letter-combinations'],
      skillId: undefined
  },
  {
      id: 'basic-vocabulary',
      title: 'Basic Vocabulary',
      description: 'Learn your first Hebrew words',
      level: '1',
      order: 9,
      status: 'completed',
      prerequisites: ['letter-combinations'],
      score: skillScores['basic-vocabulary'],
      skillId: undefined
  },
  {
      id: 'reading-practice',
      title: 'Reading Practice',
      description: 'Practice reading simple Hebrew texts',
      level: '1',
      order: 10,
      status: 'completed',
      prerequisites: ['basic-vocabulary'],
      score: skillScores['reading-practice'],
      skillId: undefined
  },

  // Level 2: Text Navigation
  {
      id: 'chapter-structure',
      title: 'Chapter Structure',
      description: 'Understand how Torah text is organized into chapters and verses',
      level: '2',
      order: 1,
      status: 'completed',
      prerequisites: ['vowel-marks'],
      score: skillScores['chapter-structure'],
      progress: {
          learn: { completed: true, progress: 100 },
          practice: { completed: true, progress: 100 },
          test: {
              completed: true,
              progress: 100,
              score: skillScores['chapter-structure'],
              answers: {
                  't1': 'א (Alef)',
                  't2': ['א', 'ו', 'י'],
                  't3': ['ש', 'ל', 'ו', 'ם'],
                  't4': [
                      ['ב', 'b/v'],
                      ['ג', 'g'],
                      ['ד', 'd']
                  ],
                  't5': 'ג'
              }
          }
      },
      skillId: undefined
  },
  {
      id: 'verse-navigation',
      title: 'Verse Navigation',
      description: 'Learn to locate and reference specific verses efficiently',
      level: '2',
      order: 2,
      status: 'completed',
      prerequisites: ['chapter-structure'],
      score: skillScores['verse-navigation'],
      skillId: undefined
  },
  {
      id: 'parsha-overview',
      title: 'Parsha Overview',
      description: 'Grasp the weekly Torah portion structure and organization',
      level: '2',
      order: 3,
      status: 'completed',
      prerequisites: ['verse-navigation'],
      score: skillScores['parsha-overview'],
      skillId: undefined
  },
  {
      id: 'text-markers',
      title: 'Text Markers',
      description: 'Identify and understand various textual markers and divisions',
      level: '2',
      order: 4,
      status: 'available',
      prerequisites: ['parsha-overview'],
      skillId: undefined
  },
  {
      id: 'section-breaks',
      title: 'Section Breaks',
      description: 'Recognize different types of textual breaks and their significance',
      level: '2',
      order: 5,
      status: 'locked',
      prerequisites: ['text-markers'],
      skillId: undefined
  },
  {
      id: 'page-layout',
      title: 'Page Layout',
      description: 'Master the standard layout of Torah texts and commentaries',
      level: '2',
      order: 6,
      status: 'locked',
      prerequisites: ['section-breaks'],
      skillId: undefined
  },
  {
      id: 'reference-system',
      title: 'Reference System',
      description: 'Learn the traditional system for citing Torah passages',
      level: '2',
      order: 7,
      status: 'locked',
      prerequisites: ['page-layout'],
      skillId: undefined
  },

  // Level 3: Basic Grammar
  {
      id: 'root-words',
      title: 'Root Words',
      description: 'Identify and understand the three-letter root system',
      level: '3',
      order: 1,
      status: 'locked',
      prerequisites: ['parsha-overview'],
      skillId: undefined
  },
  {
      id: 'prefixes',
      title: 'Prefixes',
      description: 'Learn common Hebrew prefixes and their meanings',
      level: '3',
      order: 2,
      status: 'locked',
      prerequisites: ['root-words'],
      skillId: undefined
  },
  {
      id: 'suffixes',
      title: 'Suffixes',
      description: 'Master Hebrew suffixes and their grammatical functions',
      level: '3',
      order: 3,
      status: 'locked',
      prerequisites: ['prefixes'],
      skillId: undefined
  }
]; 

// Example for a skill's learning content
const letterFormsContent = {
  title: "Letter Forms",
  sections: [
    {
      title: "Introduction to Hebrew Letters",
      explanation: `
        <p>Hebrew is written from right to left and has 22 letters. Each letter represents a consonant sound, and vowels are typically indicated by marks above or below the letters.</p>
        <p>The Hebrew alphabet is also known as the "Aleph-Bet," named after the first two letters: Aleph (א) and Bet (ב).</p>
      `
    },
    {
      title: "Final Forms",
      subtitle: "Special forms of letters at the end of words",
      explanation: `
        <p>Some Hebrew letters have different forms when they appear at the end of a word. These are called "final forms" or "sofit" letters.</p>
        <p>There are five letters that have final forms:</p>
      `,
      examples: [
        'מ (Mem) becomes ם at the end of a word',
        'נ (Nun) becomes ן at the end of a word',
        'צ (Tzadi) becomes ץ at the end of a word',
        'פ (Peh) becomes ף at the end of a word',
        'כ (Kaf) becomes ך at the end of a word'
      ]
    },
    {
      title: "Letter Variations",
      explanation: `
        <p>Some letters can also change their pronunciation based on a dot (called a "dagesh") placed inside them:</p>
      `,
      examples: [
        'ב without dagesh: "v" sound (בָּ)',
        'ב with dagesh: "b" sound (ב)',
        'פ without dagesh: "f" sound (פ)',
        'פ with dagesh: "p" sound (פּ)'
      ],
      visual: "/images/letter-variations.svg",
      visualCaption: "Examples of letters with and without dagesh"
    },
    {
      title: "Common Letter Combinations",
      explanation: `
        <p>Certain letter combinations appear frequently in Hebrew texts. Learning to recognize these patterns will help you read more fluently.</p>
      `,
      examples: [
        'שׁ + ל = של ("of" or "belonging to")',
        'ב + ה = בה ("in the")',
        'מ + ה = מה ("what")',
        'ל + א = לא ("no" or "not")'
      ]
    },
    {
      title: "Practice Tips",
      explanation: `
        <p>Here are some effective ways to practice recognizing and writing Hebrew letters:</p>
        <ul>
          <li>Practice writing each letter multiple times</li>
          <li>Focus on one letter family at a time (e.g., final forms)</li>
          <li>Use flashcards to memorize letter shapes</li>
          <li>Read simple Hebrew texts regularly</li>
        </ul>
      `
    }
  ]
};

const letterRecognitionContent = {
  title: "Letter Recognition",
  sections: [
    {
      title: "The Hebrew Alphabet",
      subtitle: "Understanding the basics of Hebrew letters",
      explanation: `
        <p>The Hebrew alphabet consists of 22 letters, each representing a consonant sound. Unlike English, Hebrew is written from right to left.</p>
        <p>Each letter has a unique shape and sound, and some letters have special forms when they appear at the end of a word.</p>
      `,
      examples: [
        'א (Alef) - Silent letter',
        'ב (Bet) - "b" or "v" sound',
        'ג (Gimel) - "g" sound',
        'ד (Dalet) - "d" sound'
      ]
    },
    {
      title: "Letter Categories",
      explanation: `
        <p>Hebrew letters can be grouped into categories based on their appearance and sound patterns:</p>
        <ul>
          <li>Letters with similar shapes</li>
          <li>Letters with similar sounds</li>
          <li>Letters that can change pronunciation</li>
          <li>Letters with final forms</li>
        </ul>
      `,
      examples: [
        'ב and כ look similar',
        'ח and כ have similar sounds',
        'ו can be a consonant or vowel',
        'מ has a final form ם'
      ]
    },
    {
      title: "Similar-Looking Letters",
      subtitle: "Learning to distinguish between similar letters",
      explanation: `
        <p>Several Hebrew letters look similar but have distinct features to tell them apart:</p>
      `,
      examples: [
        'ב (Bet) vs. כ (Kaf) - Bet has a point at the base',
        'ה (Hey) vs. ח (Chet) - Hey has a gap in the top',
        'ו (Vav) vs. ז (Zayin) - Zayin has a longer top',
        'ר (Resh) vs. ד (Dalet) - Dalet has a sharper corner'
      ],
      visual: "/images/similar-letters.svg",
      visualCaption: "Comparison of similar-looking Hebrew letters"
    },
    {
      title: "Letter Sounds",
      explanation: `
        <p>Each Hebrew letter has a distinct sound, though some letters share similar pronunciations:</p>
      `,
      examples: [
        'א and ע are both silent in modern Hebrew',
        'ת and ט both make a "t" sound',
        'כ and ח have guttural sounds',
        'ס and שׂ make an "s" sound'
      ]
    },
    {
      title: "Writing Direction",
      explanation: `
        <p>Hebrew is written from right to left. When writing letters:</p>
        <ul>
          <li>Start from the rightmost letter</li>
          <li>Move left as you write each letter</li>
          <li>Leave space between letters</li>
          <li>Pay attention to letter height consistency</li>
        </ul>
      `,
      visual: "/images/writing-direction.svg",
      visualCaption: "Demonstration of Hebrew writing direction"
    }
  ]
};

const textMarkersContent = {
  title: "Text Markers",
  sections: [
    {
      title: "Introduction to Text Markers",
      subtitle: "Understanding the signs and symbols in Torah text",
      explanation: `
        <p>Text markers in Torah scrolls and printed texts serve multiple purposes:</p>
        <ul>
          <li>Indicate breaks between sections</li>
          <li>Show proper pronunciation</li>
          <li>Guide proper cantillation</li>
          <li>Mark special emphasis or significance</li>
        </ul>
      `
    },
    {
      title: "Paragraph Breaks",
      explanation: `
        <p>There are two types of paragraph breaks in Torah text:</p>
        <p><strong>Petuchah (פתוחה)</strong> - "Open" paragraph, starts on a new line</p>
        <p><strong>Setumah (סתומה)</strong> - "Closed" paragraph, starts after a space</p>
      `,
      examples: [
        'פ marks a Petuchah break',
        'ס marks a Setumah break',
        'Nine-letter space indicates Petuchah',
        'Three-letter space indicates Setumah'
      ]
    },
    {
      title: "Cantillation Marks",
      subtitle: "Understanding trope marks",
      explanation: `
        <p>Cantillation marks (טעמי המקרא) serve three main purposes:</p>
        <ul>
          <li>Guide the musical reading of the text</li>
          <li>Indicate proper phrasing and punctuation</li>
          <li>Sometimes affect the meaning of words</li>
        </ul>
      `,
      examples: [
        'אֶתְנַחְתָּא - Major pause, like a comma',
        'סוֹף פָּסוּק - End of verse',
        'זַרְקָא - Special rising tone',
        'סֶגּוֹל - Joining mark'
      ],
      visual: "/images/cantillation-marks.svg",
      visualCaption: "Common cantillation marks and their positions"
    },
    {
      title: "Special Letters",
      explanation: `
        <p>Some letters in the Torah text have special markings or sizes:</p>
      `,
      examples: [
        'Large letters (אותיות גדולות)',
        'Small letters (אותיות קטנות)',
        'Dotted letters (נקודות)',
        'Broken letters (אותיות משונות)'
      ]
    },
    {
      title: "Section Markers",
      explanation: `
        <p>Various markers help organize the text into sections:</p>
        <ul>
          <li>Parsha breaks</li>
          <li>Chapter divisions</li>
          <li>Aliyah markings</li>
          <li>Special readings markers</li>
        </ul>
      `,
      visual: "/images/section-markers.svg",
      visualCaption: "Different types of section markers in Torah text"
    }
  ]
};

const basicReadingContent = {
  title: "Basic Reading",
  sections: [
    {
      title: "Introduction to Hebrew Letters",
      subtitle: "Understanding the basics of the Hebrew alphabet",
      explanation: `
        <p>Hebrew is written from right to left and has 22 letters. Each letter represents a consonant sound, and vowels are typically indicated by marks above or below the letters.</p>
        <p>The Hebrew alphabet is also known as the "Aleph-Bet," named after the first two letters: Aleph (א) and Bet (ב).</p>
      `
    },
    {
      title: "Letter Forms",
      subtitle: "Different forms of Hebrew letters",
      explanation: `
        <p>Some Hebrew letters have different forms when they appear at the end of a word. These are called "final forms" or "sofit" letters.</p>
      `,
      examples: [
        'א (Aleph) - Silent letter, first letter of the alphabet. Often carries vowel sounds when combined with vowel marks.',
        'ב (Bet) - Makes a \'b\' sound as in \'boy\'. When written with a dot (בּ) it makes the \'b\' sound, without the dot (ב) it makes the \'v\' sound.',
        'ג (Gimel) - Makes a \'g\' sound as in \'girl\'. One of the simplest letters to recognize and pronounce.'
      ],
      visual: "/images/hebrew-alphabet.svg",
      visualCaption: "The Hebrew alphabet with letter names and sounds"
    },
    {
      title: "Letter Forms",
      subtitle: "Different forms of Hebrew letters",
      explanation: `
        <p>Some Hebrew letters have different forms when they appear at the end of a word. These are called "final forms" or "sofit" letters.</p>
      `,
      examples: [
        'מ (Mem) becomes ם at the end of a word',
        'נ (Nun) becomes ן at the end of a word',
        'צ (Tzadi) becomes ץ at the end of a word'
      ],
      visual: "/images/letter-forms.svg",
      visualCaption: "Regular and final forms of Hebrew letters"
    }
  ]
};

interface SkillContent {
  [key: string]: {
    title: string;
    sections: Array<{
      title: string;
      subtitle?: string;
      explanation?: string;
    }>;
  };
}

const skillContent: SkillContent = {
  'letter-recognition': {
    title: 'Letter Recognition',
    sections: []
  },
  // ... other skills
};

export function getSkillContent(skillId: string) {
  return skillContent[skillId] || null;
} 