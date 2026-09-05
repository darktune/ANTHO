import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Globe, Zap, Heart } from 'lucide-react';

export const metadata = {
  title: 'About | ANTHO',
  description: 'The story of ANTHO. Blending Lagos street culture with premium fashion.',
};

export default function AboutPage() {
  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="relative h-[65vh] min-h-[520px] flex items-center justify-center bg-black overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/IMG_3807.JPG"
            alt="ANTHO Lagos"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center filter grayscale contrast-125 opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
        </div>
        <div className="z-10 text-center px-4 max-w-4xl mx-auto pt-20">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C9A96E] mb-4 block">OUR GENESIS</span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 tracking-tight">ABOUT ANTHO</h1>
          <p className="text-base md:text-xl text-neutral-300 font-light tracking-wide uppercase">
            Born in Lagos. Crafted for the World.
          </p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6 text-stone-300 leading-relaxed text-lg font-light">
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-8">The Narrative</h2>
            <p>
              ANTHO emerged from the vibrant, chaotic, and endlessly inspiring streets of Lagos, Nigeria. What started as a small capsule collection has grown into a movement that redefines contemporary African fashion.
            </p>
            <p>
              We believe in the power of blending our rich cultural heritage with modern, minimalist design principles. Every piece we create is a testament to the resilience, creativity, and unapologetic bold energy of our home city.
            </p>
            <p>
              Our commitment goes beyond aesthetics. We source premium materials, partner with skilled local artisans, and maintain a focus on quality that ensures our garments stand the test of time, both in durability and style.
            </p>
          </div>
          <div className="relative aspect-[3/4] w-full bg-stone-900 border border-white/10 overflow-hidden">
            <Image
              src="/images/antho-shoot/IMG_3803.JPG"
              alt="ANTHO Lagos Heritage"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center filter grayscale contrast-115"
            />
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-stone-950 py-24 border-y border-stone-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-sm tracking-widest text-gold uppercase mb-6">Our Mission</h2>
          <p className="text-3xl md:text-5xl font-serif max-w-4xl mx-auto leading-tight">
            To elevate Nigerian fashion on the global stage through uncompromising quality, cultural pride, and modern design.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="container mx-auto px-4 py-24">
        <h2 className="text-3xl font-serif text-center mb-16">Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-stone-900 rounded-full flex items-center justify-center text-gold">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-medium">Quality First</h3>
            <p className="text-stone-400 text-sm">Premium materials and meticulous craftsmanship in every stitch.</p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-stone-900 rounded-full flex items-center justify-center text-gold">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-medium">Cultural Pride</h3>
            <p className="text-stone-400 text-sm">Rooted in Lagos, speaking a global fashion language.</p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-stone-900 rounded-full flex items-center justify-center text-gold">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-medium">Innovation</h3>
            <p className="text-stone-400 text-sm">Constantly pushing boundaries in design and silhouette.</p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-stone-900 rounded-full flex items-center justify-center text-gold">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-medium">Community</h3>
            <p className="text-stone-400 text-sm">Building a movement, not just a customer base.</p>
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="py-24 bg-stone-900 text-center px-4">
        <blockquote className="text-2xl md:text-4xl font-serif italic max-w-4xl mx-auto text-stone-300 leading-relaxed mb-12">
          "We don't just make clothes; we craft identity. We take the raw, unapologetic energy of the streets and refine it into wearable art."
        </blockquote>
        <Link 
          href="/shop" 
          className="inline-block bg-white text-black px-10 py-4 font-medium hover:bg-stone-200 transition-colors"
        >
          Shop the Collection
        </Link>
      </section>
    </div>
  );
}
