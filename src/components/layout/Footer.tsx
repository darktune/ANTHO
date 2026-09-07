import Link from 'next/link';
import Image from 'next/image';
import { FOOTER_LINKS } from '@/lib/constants';
import SocialLinks from '@/components/ui/SocialIcons';

import NewsletterForm from '@/components/layout/NewsletterForm';

export default function Footer() {
  return (
    <footer className="bg-[#F9F9F8] dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-[#FAFAF9] pt-16 pb-10 border-t border-black/10 dark:border-white/10 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimal Newsletter (Single line, BolaPSD style) */}
        <div className="flex flex-col sm:flex-row items-center justify-between pb-12 mb-12 border-b border-black/10 dark:border-white/10 gap-6">
          <div className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C9A96E]">
            Inner Circle // Access & Drops
          </div>
          <NewsletterForm />
        </div>

        {/* 4-column link grid (Zero essay text) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-4 hover:opacity-80 transition-opacity">
              <Image 
                src="/images/logos/antho-wordmark-red.png" 
                alt="ANTHO" 
                width={130} 
                height={70} 
                className="h-8 w-auto object-contain block dark:hidden" 
              />
              <Image 
                src="/images/logos/antho-wordmark-white.png" 
                alt="ANTHO" 
                width={130} 
                height={70} 
                className="h-8 w-auto object-contain hidden dark:block" 
              />
            </Link>
            <p className="text-xs tracking-wider uppercase text-neutral-500 dark:text-neutral-400 font-medium">
              Lagos &bull; Worldwide
            </p>
          </div>
          
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.25em] font-bold mb-4 text-[#C9A96E]">Shop</h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.shop.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-xs text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.25em] font-bold mb-4 text-[#C9A96E]">Client Care</h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.help.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-xs text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.25em] font-bold mb-4 text-[#C9A96E]">Index</h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.company.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-xs text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Massive Monumental Footer Logo (Nivis Gear Style) */}
        <div className="w-full pt-12 pb-8 md:pt-24 md:pb-16 border-t border-black/10 dark:border-white/10 flex flex-col items-center justify-center overflow-hidden">
          <Link href="/" className="w-full flex justify-center group relative cursor-pointer px-4">
            <div className="relative w-full max-w-5xl h-[120px] sm:h-[180px] md:h-[260px] lg:h-[340px]">
              {/* Light Theme: Bold Red ANTHO Logo Dominating */}
              <Image 
                src="/images/logos/antho-wordmark-red.png" 
                alt="ANTHO" 
                fill 
                priority
                className="object-contain object-center transition-all duration-700 ease-out group-hover:scale-[1.02] block dark:hidden" 
              />
              
              {/* Dark Theme: White Logo with Red Hover Flare */}
              <Image 
                src="/images/logos/antho-wordmark-white.png" 
                alt="ANTHO" 
                fill 
                priority
                className="object-contain object-center transition-all duration-700 ease-out group-hover:opacity-0 hidden dark:block" 
              />
              <Image 
                src="/images/logos/antho-wordmark-red.png" 
                alt="ANTHO Red" 
                fill 
                className="object-contain object-center transition-all duration-700 ease-out opacity-0 group-hover:opacity-100 group-hover:scale-[1.02] hidden dark:block" 
              />
            </div>
          </Link>
          
          <div className="flex items-center gap-4 md:gap-8 mt-6 select-none">
            <span className="h-px w-8 md:w-20 bg-black/15 dark:bg-white/15" />
            <span className="text-[10px] md:text-xs tracking-[0.35em] uppercase text-[#C9A96E] font-serif italic">
              God is the greatest
            </span>
            <span className="h-px w-8 md:w-20 bg-black/15 dark:bg-white/15" />
          </div>
        </div>

        <div className="w-full h-px bg-black/10 dark:bg-white/10 mb-8"></div>

        {/* Bottom copyright, social & region section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] sm:text-[11px] text-neutral-500 tracking-widest uppercase">
          <p>&copy; {new Date().getFullYear()} ANTHO. All rights reserved.</p>
          <SocialLinks />
          <div className="flex space-x-6">
            <span>Region: Nigeria</span>
            <span>Currency: ₦ NGN</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
