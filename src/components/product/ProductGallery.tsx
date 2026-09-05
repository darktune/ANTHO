'use client';

import { useState } from 'react';

export default function ProductGallery({ images }: { images: any[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const displayImages = images?.length > 0 ? images : [1, 2, 3, 4]; // mock images

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      <div className="flex md:flex-col gap-4 overflow-x-auto md:w-24 shrink-0">
        {displayImages.map((img, i) => (
          <button 
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`relative w-20 md:w-24 aspect-[3/4] shrink-0 bg-[#1A1A1A] rounded-md overflow-hidden border-2 transition-colors ${activeIndex === i ? 'border-[#C9A96E]' : 'border-transparent'}`}
          >
             <div className="absolute inset-0 flex items-center justify-center opacity-20 font-serif text-[10px] text-[#A8A29E]">ANTHO</div>
          </button>
        ))}
      </div>
      
      <div className="flex-1 relative aspect-[3/4] bg-[#1A1A1A] rounded-lg overflow-hidden">
         <div className="absolute inset-0 flex items-center justify-center opacity-20 font-serif text-3xl text-[#A8A29E]">ANTHO</div>
      </div>
    </div>
  );
}
