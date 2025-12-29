// TextArea.tsx
"use client";

import React, { useState } from "react";
import GridItem from "@/components/GridItem";
import LetterDensity from "./LetterDensity";
import { useTextStats } from "@/hooks/useTextStats";
import { useTheme } from "next-themes";

export default function TextArea() {
  const [text, setText] = useState("");
  const [excludeSpaces, setExcludeSpaces] = useState(false);
  const [characterLimit, setCharacterLimit] = useState<number>(280);
  const [setLimitEnabled, setSetLimitEnabled] = useState(false);

  const { resolvedTheme, setTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  const stats = useTextStats(text, {
    excludeSpaces,
    characterLimit: setLimitEnabled ? characterLimit : null,
  });

  const handleChange = (value: string) => {
    if (!setLimitEnabled) return setText(value);

    const limit = characterLimit;
    const next = value.slice(0, Math.max(0, limit));
    setText(next);
  };

  return (
    <section className="mt-20">
      <h1
        className={`text-2xl md:text-6xl ${
          isDark ? "text-white" : "text-black"
        } mb-12 font-bold text-center`}
      >
        Analyze your text <br className="hidden md:block" />
        in real-time.
      </h1>

      <div>
        <textarea
          value={text}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Type or paste your text here..."
          rows={10}
          className={`w-full rounded-lg focus:outline-none outline-none p-6  font-bold ${
            isDark ? "bg-[#21222C] text-white" : "bg-[#E4E4EF] text-black"
          }  mt-4 mb-6`}
        />
        {setLimitEnabled && (
          <p
            className={`text-sm ${
              stats.isOverLimit ? "text-red-400" : "text-white/70"
            }`}
          >
            {stats.isOverLimit
              ? `Over limit by ${stats.overBy} characters`
              : `${stats.remainingCharacters} characters remaining`}
          </p>
        )}
        <div className="md:flex justify-between items-center">
          <div className="md:flex items-center gap-6">
            <label className="space-x-2 flex items-center">
              <input
                type="checkbox"
                className="accent-[#D3A0FA] cursor-pointer"
                checked={excludeSpaces}
                onChange={(e) => setExcludeSpaces(e.target.checked)}
              />
              <span className={`${isDark ? "text-white" : "text-black"}`}>
                Exclude Spaces
              </span>
            </label>

            <label className="space-x-2 flex items-center">
              <input
                type="checkbox"
                className="accent-[#D3A0FA] cursor-pointer"
                checked={setLimitEnabled}
                onChange={(e) => setSetLimitEnabled(e.target.checked)}
              />
              <span className={`${isDark ? "text-white" : "text-black"}`}>
                Set Character Limit
              </span>
            </label>

            {setLimitEnabled && (
              <input
                type="number"
                min={1}
                value={characterLimit}
                onChange={(e) => setCharacterLimit(Number(e.target.value || 0))}
                className="ml-3 w-28 rounded-md bg-[#21222C] p-2 text-white outline-none"
                aria-label="Character limit"
              />
            )}
          </div>

          <p className={`${isDark ? "text-white" : "text-black"}`}>
            Approx. reading time: {stats.readingTimeLabel}
          </p>
        </div>
      </div>

      <GridItem
        chars={stats.charCount}
        words={stats.wordCount}
        sentences={stats.sentenceCount}
      />

      <LetterDensity letterStats={stats.letterStats} initialVisible={8} />
    </section>
  );
}
