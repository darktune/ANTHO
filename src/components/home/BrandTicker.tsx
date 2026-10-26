'use client';

export default function BrandTicker() {
  const items = [
    'ANTHO SYLLOGI',
    'GOD IS THE GREATEST',
    'LAGOS & WORLDWIDE',
    '300GSM COMBED COTTON',
    '500GSM FRENCH TERRY',
    'DROP 001 ACTIVE',
    'ARCHITECTURAL SILHOUETTES',
    'BESPOKE NIGERIAN ATELIER',
  ];

  return (
    <div className="w-full bg-[#0A0A0A] text-[#FAFAF9] dark:bg-white/[0.03] dark:text-[#FAFAF9] border-y border-black/10 dark:border-white/10 py-3.5 sm:py-4 overflow-hidden select-none select-none">
      <div className="flex w-max animate-marquee space-x-8 sm:space-x-12">
        {[...items, ...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center space-x-8 sm:space-x-12 shrink-0">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] font-semibold text-stone-300 dark:text-stone-300">
              {text}
            </span>
            <span className="text-[#C9A96E] text-xs select-none">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
