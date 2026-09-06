import Link from 'next/link';
import Image from 'next/image';
import { FOOTER_LINKS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-[#FAFAF9] pt-20 pb-10 border-t border-[#A8A29E]/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section: Newsletter */}
        <div className="flex flex-col items-center text-center mb-20">
          <h3 className="font-serif text-3xl mb-4">Join the ANTHO Inner Circle</h3>
          <p className="text-[#A8A29E] max-w-md mb-8">Subscribe to receive updates, access to exclusive deals, and more.</p>
          <form className="flex w-full max-w-md border-b border-[#A8A29E] focus-within:border-[#C9A96E] transition-colors">
            <input 
              type="email" 
              placeholder="ENTER YOUR EMAIL ADDRESS" 
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm tracking-widest px-2 py-3 outline-none"
              required
            />
            <button type="submit" className="text-xs uppercase tracking-widest font-bold px-4 hover:text-[#C9A96E] transition-colors">
              Subscribe
            </button>
          </form>
        </div>

        <div className="w-full h-px bg-[#A8A29E]/20 mb-16"></div>

        {/* Middle section: 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1">
            <Link href="/" className="inline-block mb-6 hover:opacity-80 transition-opacity">
              <Image 
                src="/images/logos/antho-wordmark-white.png" 
                alt="ANTHO Logo" 
                width={150} 
                height={90} 
                className="h-10 w-auto object-contain dark:block hidden" 
              />
              <Image 
                src="/images/logos/antho-wordmark-black.png" 
                alt="ANTHO Logo" 
                width={150} 
                height={90} 
                className="h-10 w-auto object-contain dark:hidden block" 
              />
            </Link>
            <p className="text-[#A8A29E] text-sm leading-relaxed">
              Premium Nigerian fashion blending cultural heritage with contemporary luxury silhouettes.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] font-medium mb-6 text-[#C9A96E]">Shop</h4>
            <ul className="space-y-4">
              {FOOTER_LINKS.shop.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-neutral-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] font-medium mb-6 text-[#C9A96E]">Help</h4>
            <ul className="space-y-4">
              {FOOTER_LINKS.help.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-neutral-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] font-medium mb-6 text-[#C9A96E]">Company</h4>
            <ul className="space-y-4">
              {FOOTER_LINKS.company.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-neutral-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Massive Monumental Footer Logo (Nivis Gear Style) */}
        <div className="w-full pt-16 pb-12 md:pt-28 md:pb-20 border-t border-white/10 flex flex-col items-center justify-center overflow-hidden">
          <Link href="/" className="w-full flex justify-center group relative cursor-pointer px-4">
            <div className="relative w-full max-w-5xl h-[120px] sm:h-[180px] md:h-[260px] lg:h-[340px]">
              {/* Dark Theme Wordmark (White) */}
              <Image 
                src="/images/logos/antho-wordmark-white.png" 
                alt="ANTHO" 
                fill 
                priority
                className="object-contain object-center transition-all duration-700 ease-out group-hover:opacity-0 hidden dark:block" 
              />
              {/* Light Theme Wordmark (Black) */}
              <Image 
                src="/images/logos/antho-wordmark-black.png" 
                alt="ANTHO" 
                fill 
                priority
                className="object-contain object-center transition-all duration-700 ease-out group-hover:opacity-0 block dark:hidden" 
              />
              {/* Interactive Hover Flare (Signature Red Cross) */}
              <Image 
                src="/images/logos/antho-wordmark-red.png" 
                alt="ANTHO Red" 
                fill 
                className="object-contain object-center transition-all duration-700 ease-out opacity-0 group-hover:opacity-100 group-hover:scale-[1.02]" 
              />
            </div>
          </Link>
          
          <div className="flex items-center gap-4 md:gap-8 mt-6 select-none">
            <span className="h-px w-8 md:w-20 bg-white/15" />
            <span className="text-[10px] md:text-xs tracking-[0.35em] uppercase text-[#C9A96E] font-serif italic">
              God is the Greatest
            </span>
            <span className="h-px w-8 md:w-20 bg-white/15" />
          </div>
        </div>

        <div className="w-full h-px bg-white/10 mb-8"></div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-[11px] text-[#A8A29E] tracking-widest uppercase">
          <p>&copy; {new Date().getFullYear()} ANTHO. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <span>Region: Nigeria</span>
            <span>Currency: ₦ NGN</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
