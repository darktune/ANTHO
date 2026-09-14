'use client';

export default function ColorSelector({ colors, selectedColor, onSelect }: { colors: any[], selectedColor: string, onSelect: (color: string) => void }) {
  return (
    <div className="flex gap-3">
      {colors.map((c) => {
        const isSelected = c.color === selectedColor;
        return (
          <button
            key={c.color}
            type="button"
            onClick={() => onSelect(c.color)}
            title={c.color}
            aria-label={c.color}
            className={`
              w-7 h-7 rounded-full flex items-center justify-center transition-all border border-black/15 dark:border-white/20
              ${isSelected 
                ? 'ring-2 ring-[#C9A96E] ring-offset-2 ring-offset-[#FAFAF9] dark:ring-offset-[#0A0A0A] scale-110' 
                : 'hover:scale-105 opacity-80 hover:opacity-100'
              }
            `}
            style={{ backgroundColor: c.colorHex }}
          />
        );
      })}
    </div>
  );
}
