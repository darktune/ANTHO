'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

const formatPrice = (amountInKobo: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(amountInKobo / 100);
};

const products = [
  { id: 1, name: 'Onyx Silk Shirt', price: 8500000, slug: 'onyx-silk-shirt', category: 'Tops' },
  { id: 2, name: 'Heritage Linen Trousers', price: 9500000, slug: 'heritage-linen-trousers', category: 'Bottoms' },
  { id: 3, name: 'Asa Cropped Jacket', price: 15000000, slug: 'asa-cropped-jacket', category: 'Outerwear' },
  { id: 4, name: 'Zola Pleated Skirt', price: 7200000, slug: 'zola-pleated-skirt', category: 'Bottoms' },
  { id: 5, name: 'Eko Oversized Tee', price: 4500000, slug: 'eko-oversized-tee', category: 'Tops' },
  { id: 6, name: 'Nomad Duster Coat', price: 18500000, slug: 'nomad-duster-coat', category: 'Outerwear' },
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
            <span className="text-xs uppercase tracking-[0.2em] text-[#C9A96E] mb-4 block">CURATED</span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#FAFAF9]">Best Sellers</h2>
          </motion.div>
          
          <div className="hidden md:flex gap-4">
            <button onClick={() => scroll('left')} className="p-2 border border-[#A8A29E] text-[#A8A29E] hover:text-[#FAFAF9] hover:border-[#FAFAF9] transition-colors rounded-full">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => scroll('right')} className="p-2 border border-[#A8A29E] text-[#A8A29E] hover:text-[#FAFAF9] hover:border-[#FAFAF9] transition-colors rounded-full">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 pb-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="min-w-[280px] md:min-w-[320px] flex-shrink-0 snap-start group"
            >
              <Link href={`/product/${product.slug}`}>
                <div className="aspect-[3/4] bg-zinc-900 mb-6 overflow-hidden">
                  <div className="w-full h-full bg-zinc-800 group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-widest text-[#A8A29E]">{product.category}</span>
                  <h3 className="text-[#FAFAF9] font-medium font-serif text-lg">{product.name}</h3>
                  <p className="text-[#A8A29E] text-sm">{formatPrice(product.price)}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
