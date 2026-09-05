'use client';

import { motion } from 'framer-motion';

export default function Marquee({ text = "ANTHO — GOD IS THE GREATEST — LAGOS TO THE WORLD — SS26" }: { text?: string }) {
  const items = [
    text,
    "ANTHO — GOD IS THE GREATEST",
    "CONTEMPORARY LUXURY — LAGOS",
    "PAR EXCELLENCE — SS26",
  ];

  return (
    <div className="relative w-full overflow-hidden bg-[#0A0A0A] text-[#FAFAF9] border-y border-white/10 py-5 select-none">
      <div className="flex w-max animate-marquee">
        <div className="flex shrink-0 items-center gap-12 pr-12">
          {items.map((item, idx) => (
            <div key={`track1-${idx}`} className="flex items-center gap-12">
              <span className="text-2xl md:text-4xl font-serif uppercase tracking-[0.25em] text-white/90">
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
            </div>
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-12 pr-12" aria-hidden="true">
          {items.map((item, idx) => (
            <div key={`track2-${idx}`} className="flex items-center gap-12">
              <span className="text-2xl md:text-4xl font-serif uppercase tracking-[0.25em] text-white/90">
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
