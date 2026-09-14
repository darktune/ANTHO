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
            type="button"
            onClick={() => !isOutOfStock && onSelect(size)}
            disabled={isOutOfStock}
            className={`
              min-w-[3rem] h-10 px-3 flex items-center justify-center rounded-none border text-xs tracking-wider uppercase transition-all
              ${isSelected 
                ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white font-bold' 
                : 'bg-transparent border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:border-black dark:hover:border-white font-medium'
              }
              ${isOutOfStock ? 'opacity-40 cursor-not-allowed line-through' : ''}
            `}
          >
            {size}
          </button>
        );
      })}
    </div>
  );
}
