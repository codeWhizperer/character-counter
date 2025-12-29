export const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export type LetterStat = {
  letter: string;
  count: number;
  percent: number; // 0–100
};

export type TextStatsOptions = {
  excludeSpaces?: boolean;
  wordsPerMinute?: number; // default 200
  characterLimit?: number | null;
};

export type TextStats = {
  text: string;
  charCount: number; // respects excludeSpaces
  charCountWithSpaces: number;
  wordCount: number;
  sentenceCount: number;
  readingTimeMinutes: number; // minimum 0
  readingTimeLabel: string; // e.g. "< 1 minute" / "3 minutes"
  totalLetters: number;
  letterStats: LetterStat[]; // sorted desc by percent
  remainingCharacters: number | null; 
  isOverLimit: boolean; 
  overBy: number; 
};