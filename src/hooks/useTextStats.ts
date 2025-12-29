"use client";

import { useMemo } from "react";
import  { LetterStat, ALPHABET,TextStats, TextStatsOptions } from "../lib/type";

function countWords(text: string) {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).filter(Boolean).length;
}

function countSentences(text: string) {
  // Simple, decent heuristic: count sentence-ending punctuation clusters
  // e.g. "Hello! What?" => 2
  const matches = text.match(/[.!?]+(?=\s|$)/g);
  return matches ? matches.length : 0;
}

function computeLetterDensity(text: string): { stats: LetterStat[]; totalLetters: number } {
  const counts: Record<string, number> = {};
  let totalLetters = 0;

  for (const ch of text.toUpperCase()) {
    if (ch >= "A" && ch <= "Z") {
      counts[ch] = (counts[ch] || 0) + 1;
      totalLetters++;
    }
  }

  const stats = ALPHABET.map((letter) => {
    const count = counts[letter] || 0;
    const percent = totalLetters === 0 ? 0 : (count / totalLetters) * 100;
    return { letter, count, percent };
  }).sort((a, b) => b.percent - a.percent);

  return { stats, totalLetters };
}

function readingTimeLabelFromMinutes(minutes: number) {
  if (minutes <= 0) return "< 1 minute";
  if (minutes === 1) return "1 minute";
  return `${minutes} minutes`;
}

export function useTextStats(text: string, options: TextStatsOptions = {}): TextStats {
  const { excludeSpaces = false, wordsPerMinute = 200 } = options;

  return useMemo(() => {
    const charCountWithSpaces = text.length;
    const charCount = excludeSpaces ? text.replace(/\s/g, "").length : charCountWithSpaces;

    const wordCount = countWords(text);
    const sentenceCount = countSentences(text);

    // Reading time based on words; common baseline ~200 WPM.
    // show "< 1 minute" for short text (< 200 words).
    const rawMinutes = wordCount / Math.max(1, wordsPerMinute);
    const readingTimeMinutes = wordCount === 0 ? 0 : Math.max(0, Math.ceil(rawMinutes) - 1);

    const readingTimeLabel =
      wordCount === 0 ? "< 1 minute" : rawMinutes < 1 ? "< 1 minute" : readingTimeLabelFromMinutes(Math.ceil(rawMinutes));

    const { stats: letterStats, totalLetters } = computeLetterDensity(text);

    const characterLimit = options.characterLimit ?? null;

const remainingCharacters =
  characterLimit == null ? null : characterLimit - charCount;

const isOverLimit = remainingCharacters != null && remainingCharacters < 0;
const overBy = isOverLimit ? Math.abs(remainingCharacters!) : 0;

    return {
      text,
      charCount,
      charCountWithSpaces,
      wordCount,
      sentenceCount,
      readingTimeMinutes: rawMinutes < 1 ? 0 : Math.ceil(rawMinutes),
      readingTimeLabel,
      totalLetters,
      letterStats,
      characterLimit,
  remainingCharacters,
  isOverLimit,
  overBy,
    };
  }, [text, excludeSpaces, wordsPerMinute]);
}
