'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { formatPrice } from '@/lib/utils';
import type { Product, ProductImage } from '@/types';

export default function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false);

  // Safely extract images
  const images: ProductImage[] = product.images || [];
  const primaryImage = images.length > 0 ? images[0].url : '/images/antho-shoot/IMG_3806.JPG';
  const secondaryImage = images.length > 1 ? images[1].url : primaryImage;

  return (
    <Link 
      href={`/products/${product.slug}`}
      className="group flex flex-col gap-4 block w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] w-full bg-stone-900 overflow-hidden">
        {/* Primary Image */}
        <Image
          src={primaryImage}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover transition-opacity duration-700 ease-in-out ${isHovered && images.length > 1 ? 'opacity-0' : 'opacity-100'}`}
          priority={false}
        />
        
        {/* Secondary Image (Hover) */}
        {images.length > 1 && (
          <Image
            src={secondaryImage}
            alt={`${product.name} alternate view`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-opacity duration-700 ease-in-out absolute inset-0 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          />
        )}
        
        {product.isBestSeller && (
          <div className="absolute top-4 left-4 bg-white text-black text-[9px] font-bold px-3 py-1.5 uppercase tracking-widest z-10">
            Best Seller
          </div>
        )}
        {!product.isBestSeller && product.compareAtPrice && (
          <div className="absolute top-4 left-4 bg-[#C9A96E] text-black text-[9px] font-bold px-3 py-1.5 uppercase tracking-widest z-10">
            Sale
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1.5 items-center text-center">
        <h3 className="text-xs font-medium text-white uppercase tracking-[0.15em]">{product.name}</h3>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-xs text-stone-400 tracking-widest">
            {formatPrice ? formatPrice(product.price) : `,${product.price / 100}`}
          </span>
          {product.compareAtPrice && (
            <span className="text-[10px] text-stone-600 line-through tracking-widest">
              {formatPrice ? formatPrice(product.compareAtPrice) : `,${product.compareAtPrice / 100}`}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
