import { LearningContent, SkillContentMap } from '@/types';

export const learningContent: SkillContentMap = {
  'text-markers': {
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
        ],
        visual: "/images/text-markers.svg",
        visualCaption: "Examples of text markers in Torah text"
      }
    ]
  },
  'letter-recognition': {
    title: "Letter Recognition",
    sections: [
      // ... letter recognition sections
    ]
  },
  'basic-reading': {
    title: "Basic Reading",
    sections: [
      // ... basic reading sections
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
        visual: "/images/hebrew-letters.svg",
        visualCaption: "The Hebrew alphabet with letter names and sounds"
      },
      {
        title: "Final Forms",
        subtitle: "Different forms of Hebrew letters",
        explanation: `
          <p>Some Hebrew letters have different forms when they appear at the end of a word. These are called "final forms" or "sofit" letters.</p>
        `,
        examples: [
          'מ (Mem) becomes ם at the end of a word',
          'נ (Nun) becomes ן at the end of a word',
          'צ (Tzadi) becomes ץ at the end of a word'
        ],
        visual: "/images/final-forms.svg",
        visualCaption: "Regular and final forms of Hebrew letters"
      }
    ]
  },
  'vowel-marks': {
    title: "Vowel Marks",
    sections: [
      // ... vowel marks sections
    ]
  }
}; 