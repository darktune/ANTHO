'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import { formatPrice } from '@/lib/utils';

const products = [
  { 
    id: 1, 
    name: 'Lagos Nights Silk Shirt', 
    price: 4500000, 
    slug: 'lagos-nights-silk-shirt', 
    category: 'Tops',
    image: '/images/antho-shoot/IMG_3806.JPG'
  },
  { 
    id: 2, 
    name: 'Harmattan Heavyweight Hoodie', 
    price: 6500000, 
    slug: 'harmattan-heavyweight-hoodie', 
    category: 'Tops',
    image: '/images/antho-shoot/IMG_3807.JPG'
  },
  { 
    id: 3, 
    name: 'VI Tailored Trousers', 
    price: 5500000, 
    slug: 'vi-tailored-trousers', 
    category: 'Bottoms',
    image: '/images/antho-shoot/IMG_3801.JPG'
  },
  { 
    id: 4, 
    name: 'Eko Essential Boxy Tee', 
    price: 2500000, 
    slug: 'eko-essential-tee', 
    category: 'Tops',
    image: '/images/antho-shoot/IMG_3803.JPG'
  },
  { 
    id: 5, 
    name: 'Adire Modern Camp Shirt', 
    price: 3500000, 
    slug: 'adire-camp-collar', 
    category: 'Tops',
    image: '/images/antho-shoot/IMG_3804.JPG'
  },
  { 
    id: 6, 
    name: 'Oshodi Technical Cargo Pants', 
    price: 5000000, 
    slug: 'oshodi-cargo', 
    category: 'Bottoms',
    image: '/images/antho-shoot/IMG_3805.JPG'
  },
  { 
    id: 7, 
    name: 'Mainland Boxy Denim Jacket', 
    price: 7500000, 
    slug: 'mainland-denim', 
    category: 'Outerwear',
    image: '/images/antho-shoot/IMG_3808.JPG'
  },
];

export default function BestSellers() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-[#0A0A0A] overflow-hidden">
      <div className="px-4 md:px-8 max-w-[1400px] mx-auto">
        <div className="flex justify-between items-end mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs uppercase tracking-[0.25em] text-[#C9A96E] mb-3 block">BEST OF ANTHO</span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#FAFAF9]">Signature Pieces</h2>
          </motion.div>
          
          <div className="hidden md:flex gap-3">
            <button 
              onClick={() => scroll('left')} 
              aria-label="Scroll left"
              className="p-3 border border-white/20 text-white/70 hover:text-white hover:border-white transition-colors rounded-full"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={() => scroll('right')} 
              aria-label="Scroll right"
              className="p-3 border border-white/20 text-white/70 hover:text-white hover:border-white transition-colors rounded-full"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 pb-6"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="min-w-[280px] md:min-w-[320px] flex-shrink-0 snap-start group"
            >
              <Link href={`/products/${product.slug}`}>
                <div className="aspect-[3/4] relative bg-zinc-900 mb-5 overflow-hidden border border-white/5">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 280px, 320px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-95 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A96E] font-medium">{product.category}</span>
                  <h3 className="text-[#FAFAF9] font-medium text-sm uppercase tracking-wider group-hover:text-[#C9A96E] transition-colors">{product.name}</h3>
                  <p className="text-neutral-400 text-xs tracking-widest">{formatPrice(product.price)}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
