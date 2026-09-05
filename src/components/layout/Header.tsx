'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useUIStore } from '@/stores/uiStore';
import { useCartStore } from '@/stores/cartStore';

export default function Header() {
  const { openMobileMenu, openCartDrawer } = useUIStore();
  const cartItems = useCartStore((state) => state.items);
  
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 w-full z-40 mix-blend-difference invert dark:invert-0 dark:mix-blend-normal pointer-events-none">
      <div className="flex items-start justify-between w-full px-6 md:px-12 py-8 pointer-events-auto">
        
        {/* Left: Menu */}
        <div className="w-1/3 flex justify-start">
          <button 
            onClick={() => openMobileMenu()} 
            className="text-black dark:text-white uppercase tracking-widest text-xs font-medium hover:opacity-50 transition-opacity"
          >
            MENU
          </button>
        </div>

        {/* Center: Logo */}
        <div className="w-1/3 flex justify-center">
          <Link href="/" className="flex items-center hover:opacity-50 transition-opacity">
            <Image 
              src="/images/logo.jpg" 
              alt="ANTHO Logo" 
              width={140} 
              height={50} 
              className="h-10 w-auto invert dark:invert-0 dark:brightness-200" 
              priority
            />
          </Link>
        </div>

        {/* Right: Cart */}
        <div className="w-1/3 flex justify-end">
          <button 
            onClick={() => openCartDrawer()} 
            className="text-black dark:text-white uppercase tracking-widest text-xs font-medium hover:opacity-50 transition-opacity"
          >
            CART [{cartCount}]
          </button>
        </div>

      </div>
    </header>
  );
}
