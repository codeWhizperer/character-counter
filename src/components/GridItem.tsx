// GridItem.tsx
import React from "react";

type Props = {
  chars: number;
  words: number;
  sentences: number;
};

export default function GridItem({ chars, words, sentences }: Props) {
  return (
    <div className="grid md:grid-cols-3 gap-4 mt-6">
      <div
        className="bg-[#D3A0FA] rounded-lg p-4 flex flex-col
        bg-[url('/pattern-character-count.svg')]
        bg-no-repeat bg-[length:120px] bg-right-bottom"
      >
        <p className="text-black font-bold text-4xl tabular-nums">{chars}</p>
        <span className="text-black font-semibold">Total Characters</span>
      </div>

      <div
        className="bg-[#FF9F00] rounded-lg p-4 flex flex-col
        bg-[url('/pattern-word-count.svg')]
        bg-no-repeat bg-[length:120px] bg-right-bottom"
      >
        <p className="text-black font-bold text-4xl tabular-nums">{words}</p>
        <span className="text-black font-semibold">Word Count</span>
      </div>

      <div
        className="bg-[#FE8159] rounded-lg p-4 flex flex-col
        bg-[url('/pattern-sentence-count.svg')]
        bg-no-repeat bg-[length:120px] bg-right-bottom"
      >
        <p className="text-black font-bold text-4xl tabular-nums">{sentences}</p>
        <span className="text-black font-semibold">Sentence Count</span>
      </div>
    </div>
  );
}
