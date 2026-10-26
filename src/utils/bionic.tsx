import React from 'react';

/**
 * Transforms an English or alphanumeric text string into Bionic Reading format
 * by wrapping the first 30%-50% letters of each word in a <strong> tag.
 * For Urdu text, it adds gentle visual anchoring styling.
 */
export function formatBionic(text: string, isUrdu = false): React.ReactNode {
  if (!text) return null;

  if (isUrdu) {
    // Urdu Nastaliq / Arabic script is cursive; splitting characters can break ligatures.
    // Instead, we emphasize key vocabulary anchors and readability letter-spacing.
    return <span className="tracking-wide font-medium">{text}</span>;
  }

  // Split words while preserving spaces and line breaks
  const words = text.split(/(\s+)/);

  return (
    <>
      {words.map((word, idx) => {
        // If it's whitespace or punctuation
        if (/^\s+$/.test(word)) {
          return <span key={idx}>{word}</span>;
        }

        // Clean out outer punctuation to measure word length
        const match = word.match(/^([^\w]*)(\w+)([^\w]*)$/);
        if (!match) {
          return <span key={idx}>{word}</span>;
        }

        const [, prefix, coreWord, suffix] = match;
        const len = coreWord.length;

        // Bionic proportion:
        // 1 letter: bold 1
        // 2-3 letters: bold 1
        // 4-6 letters: bold 2
        // 7+ letters: bold ~half
        let boldCount = 1;
        if (len <= 3) {
          boldCount = 1;
        } else if (len <= 6) {
          boldCount = 2;
        } else {
          boldCount = Math.ceil(len * 0.45);
        }

        const boldPart = coreWord.slice(0, boldCount);
        const restPart = coreWord.slice(boldCount);

        return (
          <span key={idx} className="inline">
            {prefix}
            <strong className="font-extrabold text-inherit opacity-100">{boldPart}</strong>
            <span className="opacity-90">{restPart}</span>
            {suffix}
          </span>
        );
      })}
    </>
  );
}

/**
 * Smart Text Component that respects Bionic Reading toggle
 */
interface AccessibleTextProps {
  children: string;
  isBionic?: boolean;
  isUrdu?: boolean;
  className?: string;
}

export const AccessibleText: React.FC<AccessibleTextProps> = ({
  children,
  isBionic = false,
  isUrdu = false,
  className = '',
}) => {
  if (!isBionic) {
    return <span className={className}>{children}</span>;
  }

  return <span className={className}>{formatBionic(children, isUrdu)}</span>;
};
