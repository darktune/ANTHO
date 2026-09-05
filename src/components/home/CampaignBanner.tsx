'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CampaignBanner() {
  return (
    <section className="relative w-full py-32 md:py-48 flex items-center justify-center overflow-hidden bg-zinc-950 border-y border-zinc-900">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-700 via-black to-black mix-blend-overlay" />
      
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="overflow-hidden"
        >
          <h2 className="font-serif italic text-5xl md:text-7xl lg:text-8xl text-[#FAFAF9] tracking-tighter mb-4">
            THE LAGOS EDIT
          </h2>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-[#A8A29E] text-sm md:text-base tracking-[0.2em] uppercase mb-10"
        >
          SS26 Collection — Available Now
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Link 
            href="/collections/lagos-edit"
            className="inline-block bg-[#FAFAF9] text-black px-10 py-4 text-xs font-medium tracking-widest uppercase hover:bg-[#C9A96E] hover:text-white transition-colors duration-300"
          >
            VIEW CAMPAIGN
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
