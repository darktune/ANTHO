'use client';

import Link from 'next/link';
import Image from 'next/image';
import { sampleProducts } from '@/lib/sample-data';
import { formatPrice } from '@/lib/utils';

export default function CurrentDrop() {
  const dropProducts = sampleProducts.slice(0, 4);

  return (
    <section className="w-full py-16 md:py-24 px-6 md:px-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Bar */}
        <div className="flex justify-between items-baseline pb-6 mb-10 border-b border-black/10 dark:border-white/10">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-red-600" />
            <h2 className="text-xs md:text-sm uppercase tracking-[0.25em] font-semibold">
              Drop 001 // Selected Pieces
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs uppercase tracking-[0.2em] font-semibold text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
          >
            [ View All &rarr; ]
          </Link>
        </div>

        {/* 4-Column Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {dropProducts.map((product) => {
            const primaryImage = product.images?.[0]?.url || '/images/antho-shoot/IMG_3806.JPG';
            const secondaryImage = product.images?.[1]?.url || primaryImage;

            return (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group flex flex-col"
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900 mb-3">
                  <Image
                    src={primaryImage}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-0"
                  />
                  <Image
                    src={secondaryImage}
                    alt={`${product.name} alternate`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover object-center transition-all duration-700 ease-out opacity-0 group-hover:opacity-100 group-hover:scale-105"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-col space-y-1">
                  <h3 className="text-xs sm:text-sm font-medium tracking-tight truncate group-hover:text-[#C9A96E] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono tracking-tight">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
