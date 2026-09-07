'use client';

import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function ProductGrid({ products }: { products: any[] }) {
  if (!products || products.length === 0) {
    return (
      <div className="py-32 text-center text-stone-500 tracking-widest uppercase text-sm">
        <p>No pieces found in this collection.</p>
      </div>
    );
  }

  return (
    <motion.div 
      variants={container as any}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={item as any} className="w-full">
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
}
