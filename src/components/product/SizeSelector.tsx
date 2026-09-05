'use client';

export default function SizeSelector({ sizes, selectedSize, onSelect, variants }: { sizes: string[], selectedSize: string, onSelect: (size: string) => void, variants: any[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {sizes.map((size) => {
        const isSelected = size === selectedSize;
        // mock stock check
        const isOutOfStock = size === 'XXL'; 
        
        return (
          <button
            key={size}
            onClick={() => !isOutOfStock && onSelect(size)}
            disabled={isOutOfStock}
            className={`
              min-w-[3rem] h-10 px-3 flex items-center justify-center rounded-md border text-sm transition-all
              ${isSelected 
                ? 'bg-[#FAFAF9] border-[#FAFAF9] text-[#0A0A0A]' 
                : 'bg-transparent border-[#A8A29E] text-[#FAFAF9] hover:border-white'
              }
              ${isOutOfStock ? 'opacity-50 cursor-not-allowed line-through' : ''}
            `}
          >
            {size}
          </button>
        );
      })}
    </div>
  );
}
