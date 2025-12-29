"use client";

import React, { useMemo, useState } from "react";
import GridItem from "@/components/GridItem";
import LetterDensity from "./LetterDensity";
import { useTextStats } from "@/hooks/useTextStats";
import { useTheme } from "next-themes";

export default function TextArea() {
  const [text, setText] = useState("");
  const [excludeSpaces, setExcludeSpaces] = useState(false);

  const [characterLimit, setCharacterLimit] = useState<number>(280);
  const [setLimitEnabled, setSetLimitEnabled] = useState(false);

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const stats = useTextStats(text, {
    excludeSpaces,
    characterLimit: setLimitEnabled ? characterLimit : null,
  });

  // Hard limit: prevent typing past the limit (counts raw characters including spaces)
  const handleChange = (value: string) => {
    if (!setLimitEnabled) return setText(value);

    const limit = characterLimit;
    const next = value.slice(0, Math.max(0, limit));
    setText(next);
  };

console.log('theme', resolvedTheme);
  const isEmpty = stats.charCountWithSpaces === 0;

  const topLetters = useMemo(() => {
    return stats.letterStats
      .filter((l) => l.count > 0)
      .slice(0, 3)
      .map((l) => `${l.letter} ${l.percent.toFixed(0)}%`)
      .join(", ");
  }, [stats.letterStats]);

  const summaryText = useMemo(() => {
    const limitLine = setLimitEnabled ? `Character limit: ${characterLimit}` : "Character limit: Off";

    return `Character Counter Summary
${limitLine}
Characters: ${stats.charCountWithSpaces}
Characters (excluding spaces): ${stats.charCount}
Words: ${stats.wordCount}
Sentences: ${stats.sentenceCount}
Reading time: ${stats.readingTimeLabel}
${topLetters ? `Top letters: ${topLetters}` : ""}`.trim();
  }, [
    stats.charCountWithSpaces,
    stats.charCount,
    stats.wordCount,
    stats.sentenceCount,
    stats.readingTimeLabel,
    topLetters,
    setLimitEnabled,
    characterLimit,
  ]);

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = summaryText;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    }
  };




  const actionBtnBase =
    "rounded-md px-3 py-2 text-sm font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <section className="mt-20">
      <h1
        className={`text-2xl md:text-6xl ${
          isDark ? "text-white" : "text-black"
        } mb-12 font-bold text-center`}
      >
        Analyze your text{" "}
        <br className="hidden md:block" />
        in real-time.
      </h1>

      <div>
        <textarea
          value={text}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Type or paste your text here..."
          rows={10}
          className={`w-full rounded-lg focus:outline-none outline-none p-6 font-bold mt-4 mb-3
            ${isDark ? "bg-[#21222C] text-white" : "bg-[#E4E4EF] text-black"}
          `}
        />

        {setLimitEnabled && (
          <p
            className={`text-sm mb-3 ${
              stats.isOverLimit ? "text-red-400" : isDark ? "text-white/70" : "text-black/70"
            }`}
          >
            {stats.isOverLimit
              ? `Over limit by ${stats.overBy} characters`
              : `${stats.remainingCharacters} characters remaining`}
          </p>
        )}

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="accent-[#D3A0FA] cursor-pointer"
                checked={excludeSpaces}
                onChange={(e) => setExcludeSpaces(e.target.checked)}
              />
              <span className={isDark ? "text-white" : "text-black"}>
                Exclude spaces
              </span>
            </label>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-[#D3A0FA] cursor-pointer"
                  checked={setLimitEnabled}
                  onChange={(e) => setSetLimitEnabled(e.target.checked)}
                />
                <span className={isDark ? "text-white" : "text-black"}>
                  Set character limit
                </span>
              </label>

              {setLimitEnabled && (
                <input
                  type="number"
                  min={1}
                  value={characterLimit}
                  onChange={(e) => setCharacterLimit(Number(e.target.value || 0))}
                  className={`w-28 rounded-md p-2 outline-none ${
                    isDark ? "bg-[#21222C] text-white" : "bg-[#E4E4EF] text-black"
                  }`}
                  aria-label="Character limit"
                />
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
            <p className={isDark ? "text-white" : "text-black"}>
              Approx. reading time: {stats.readingTimeLabel}
            </p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleCopy}
                disabled={isEmpty}
                className={`${actionBtnBase} ${
                  isDark ? "bg-white text-black hover:opacity-90" : "bg-black text-white hover:opacity-90"
                }`}
              >
                {copied ? "Copied!" : "Copy summary"}
              </button>

            </div>
          </div>
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

