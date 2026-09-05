'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';

import Image from 'next/image';

export default function BrandStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={containerRef} className="py-24 px-4 md:px-8 max-w-[1400px] mx-auto bg-[#0A0A0A] overflow-hidden">
      <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
        <div className="w-full md:w-1/2 aspect-[3/4] relative overflow-hidden bg-zinc-900 border border-white/5">
          <motion.div 
            style={{ y }}
            className="absolute inset-[-10%] w-[120%] h-[120%]"
          >
            <Image
              src="/images/antho-shoot/IMG_3803.JPG"
              alt="ANTHO Lagos Brand Story"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center filter grayscale contrast-125"
            />
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>
        </div>
        
        <div className="w-full md:w-1/2 flex flex-col items-start text-left">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs uppercase tracking-[0.2em] text-[#C9A96E] mb-6 block">OUR STORY</span>
            <h2 className="font-serif text-4xl md:text-6xl text-[#FAFAF9] mb-8 leading-tight">
              Rooted in Lagos.<br />
              Made for Everywhere.
            </h2>
            <div className="space-y-6 text-[#A8A29E] text-sm md:text-base leading-relaxed max-w-lg mb-12">
              <p>
                ANTHO represents a new wave of African luxury. Born in the vibrant streets of Lagos, we merge contemporary silhouettes with deep cultural narratives.
              </p>
              <p>
                Every piece is a testament to our heritage—crafted for the global citizen who appreciates storytelling through design. We don't just make clothes; we document culture.
              </p>
            </div>
            <Link 
              href="/about"
              className="inline-block border border-[#A8A29E] text-[#A8A29E] px-8 py-3 text-sm tracking-widest uppercase hover:bg-[#FAFAF9] hover:text-black hover:border-[#FAFAF9] transition-all duration-300"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
