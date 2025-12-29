"use client";

import { useMemo, useState, useEffect } from "react";
import * as Progress from "@radix-ui/react-progress";
import type { LetterStat } from "@/lib/type";
import { ArrowDownIcon, ArrowUpIcon } from "@/ui/icon";

type Props = {
  letterStats: LetterStat[];
  initialVisible?: number;
};

export default function LetterDensity({
  letterStats,
  initialVisible = 8,
}: Props) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setExpanded(false);
  }, [letterStats]);

  const nonZeroStats = useMemo(
    () => letterStats.filter((s) => s.count > 0),
    [letterStats]
  );

  const visibleStats = expanded
    ? nonZeroStats
    : nonZeroStats.slice(0, initialVisible);

  const hiddenCount = Math.max(0, nonZeroStats.length - initialVisible);

  return (
    <section className="rounded-xl mt-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Letter density</h2>
      </div>

      {nonZeroStats.length === 0 ? (
        <p className="text-sm opacity-70">No characters found. Start typing to see letter density.</p>
      ) : (
        <ul className="space-y-3">
          {visibleStats.map(({ letter, percent }) => (
            <li
              key={letter}
              className="grid grid-cols-[24px_1fr_56px] items-center gap-3"
            >
              <span className="font-semibold">{letter}</span>

              <Progress.Root className="h-2 rounded bg-gray-200 dark:bg-gray-800 overflow-hidden">
                <Progress.Indicator
                  className="h-full bg-[#D3A0FA] transition-transform duration-300"
                  style={{
                    transform: `translateX(-${100 - percent}%)`,
                  }}
                />
              </Progress.Root>

              <span className="text-right tabular-nums">
                {percent.toFixed(0)}%
              </span>
            </li>
          ))}
        </ul>
      )}

      {hiddenCount > 0 && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="text-sm font-semibold cursor-pointer"
        >
          <p className="flex items-center gap-2">
            <span>{expanded ? "See less" : "See more"}</span>
            {expanded ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </p>
        </button>
      )}
    </section>
  );
}
