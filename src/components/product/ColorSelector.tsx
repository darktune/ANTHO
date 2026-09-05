'use client';

export default function ColorSelector({ colors, selectedColor, onSelect }: { colors: any[], selectedColor: string, onSelect: (color: string) => void }) {
  return (
    <div className="flex gap-3">
      {colors.map((c) => {
        const isSelected = c.color === selectedColor;
        return (
          <button
            key={c.color}
            onClick={() => onSelect(c.color)}
            title={c.color}
            className={`
              w-8 h-8 rounded-full flex items-center justify-center transition-all
              ${isSelected ? 'ring-2 ring-offset-2 ring-offset-[#0A0A0A] ring-[#FAFAF9]' : 'ring-1 ring-[#A8A29E]'}
            `}
            style={{ backgroundColor: c.colorHex }}
          />
        );
      })}
    </div>
  );
}
