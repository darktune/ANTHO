'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useUIStore } from '@/stores/uiStore';
import { useCartStore } from '@/stores/cartStore';

export default function Header() {
  const { openMobileMenu, openCartDrawer, theme, toggleTheme } = useUIStore();
  const cartItems = useCartStore((state) => state.items);
  
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 w-full z-40 pointer-events-none transition-colors duration-300">
      <div className="flex items-center justify-between w-full px-5 sm:px-8 md:px-12 py-5 sm:py-6 md:py-8 pointer-events-auto">
        
        {/* Left: Menu & Theme Toggle */}
        <div className="w-1/3 flex items-center justify-start gap-4 sm:gap-6">
          <button 
            onClick={() => openMobileMenu()} 
            className="uppercase tracking-[0.2em] text-[11px] sm:text-xs font-semibold hover:opacity-60 transition-opacity text-black dark:text-white"
          >
            MENU
          </button>

          <span className="text-black/30 dark:text-white/30 text-xs select-none">/</span>

          <button 
            onClick={() => toggleTheme()}
            aria-label="Toggle Theme"
            className="group flex items-center gap-1.5 uppercase tracking-[0.2em] text-[10px] sm:text-[11px] font-semibold hover:opacity-60 transition-all text-black dark:text-white"
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C9A96E] group-hover:scale-125 transition-transform" />
            <span>{theme === 'dark' ? 'LIGHT' : 'DARK'}</span>
          </button>
        </div>

        {/* Center: Adaptive Brand Wordmark */}
        <div className="w-1/3 flex justify-center">
          <Link href="/" className="group relative flex items-center hover:opacity-80 transition-opacity">
            <div className="relative h-10 sm:h-12 md:h-14 w-28 sm:w-36 md:w-44 flex items-center justify-center">
              {/* Light Mode Wordmark: Bold Signature Red Logo dominating the light theme */}
              <div className="block dark:hidden relative w-full h-full">
                <Image 
                  src="/images/logos/antho-wordmark-red.png" 
                  alt="ANTHO" 
                  fill
                  className="object-contain object-center transition-transform duration-300 group-hover:scale-105" 
                  priority
                />
              </div>

              {/* Dark Mode Wordmark: White Logo with Red Hover Flare */}
              <div className="hidden dark:block relative w-full h-full">
                <Image 
                  src="/images/logos/antho-wordmark-white.png" 
                  alt="ANTHO" 
                  fill
                  className="object-contain object-center transition-all duration-300 group-hover:opacity-0" 
                  priority
                />
                <Image 
                  src="/images/logos/antho-wordmark-red.png" 
                  alt="ANTHO Red" 
                  fill
                  className="object-contain object-center transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:scale-105" 
                />
              </div>
            </div>
          </Link>
        </div>

        {/* Right: Cart */}
        <div className="w-1/3 flex justify-end">
          <button 
            onClick={() => openCartDrawer()} 
            className="uppercase tracking-[0.2em] text-[11px] sm:text-xs font-semibold hover:opacity-60 transition-opacity text-black dark:text-white"
          >
            BAG [{cartCount}]
          </button>
        </div>

      </div>
    </header>
  );
}
