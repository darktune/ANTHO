'use client';

import Link from 'next/link';
import Image from 'next/image';
import { sampleProducts } from '@/lib/sample-data';
import { formatPrice } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';

export default function CurrentDrop() {
  const dropProducts = sampleProducts.slice(0, 4);

  return (
    <section id="current-drop" className="w-full py-20 sm:py-24 md:py-32 px-4 sm:px-8 md:px-12 bg-[#FAFAF9] dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-[#FAFAF9] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end pb-6 mb-12 sm:mb-16 border-b border-black/10 dark:border-white/10 gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-mono text-[#C9A96E] font-semibold">
                LAUNCH DOSSIER // SS26
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight uppercase">
              Current Drop
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-2 max-w-md">
              Four definitive streetwear silhouettes engineered with custom-milled textiles and intentional drape.
            </p>
          </div>

          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors py-1"
          >
            <span>View All Pieces ({sampleProducts.length})</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* 4-Column Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {dropProducts.map((product, idx) => {
            const primaryImage = product.images?.[0]?.url || '/images/antho-shoot/IMG_3806.JPG';
            const secondaryImage = product.images?.[1]?.url || primaryImage;

            return (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group flex flex-col cursor-pointer"
              >
                {/* Image Frame */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-200 dark:bg-neutral-900 border border-black/5 dark:border-white/5 mb-4">
                  
                  {/* Subtle Corner Number Index */}
                  <div className="absolute top-3 left-3 z-10 font-mono text-[10px] text-black/50 dark:text-white/50 bg-white/70 dark:bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded-sm">
                    {String(idx + 1).padStart(2, '0')}
                  </div>

                  {/* Primary Front View */}
                  <Image
                    src={primaryImage}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-0"
                  />

                  {/* Secondary Back / Editorial View */}
                  <Image
                    src={secondaryImage}
                    alt={`${product.name} alternate view`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center transition-all duration-700 ease-out opacity-0 group-hover:opacity-100 group-hover:scale-105"
                  />

                  {/* Hover Quick Action Pill (Desktop) */}
                  <div className="absolute inset-x-3 bottom-3 z-10 hidden sm:flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <span className="w-full text-center py-2.5 bg-white/95 dark:bg-black/95 text-black dark:text-white text-[10px] uppercase tracking-[0.2em] font-bold shadow-md border border-black/10 dark:border-white/10 backdrop-blur-md">
                      VIEW PIECE &rarr;
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-col space-y-1.5">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-[#C9A96E] font-semibold">
                    {product.category}
                  </span>

                  <h3 className="text-sm font-medium tracking-tight truncate text-neutral-900 dark:text-neutral-100 group-hover:text-[#C9A96E] transition-colors">
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-between pt-0.5">
                    <p className="text-sm text-neutral-700 dark:text-neutral-300 font-mono font-medium">
                      {formatPrice(product.price)}
                    </p>

                    <span className="text-[10px] text-neutral-400 font-mono tracking-wider">
                      {product.variants?.length ? `${product.variants.length} Variants` : 'In Stock'}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
