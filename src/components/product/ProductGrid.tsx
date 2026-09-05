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
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-16 gap-x-8"
    >
      {products.map((product, index) => {
        // Create an alternating asymmetrical grid layout
        // Mobile is 1 col. Tablet is 2 cols. Desktop is 12-col grid.
        // We'll alternate between 5-col, 7-col, 6-col widths to create a lookbook feel
        const colSpan = index % 3 === 0 ? 'lg:col-span-5' 
                     : index % 3 === 1 ? 'lg:col-span-7 lg:mt-24' 
                     : 'lg:col-span-6 lg:col-start-4';

        return (
          <motion.div key={product.id} variants={item as any} className={colSpan}>
            <ProductCard product={product} />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
