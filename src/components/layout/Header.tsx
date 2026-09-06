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
    <header className="fixed top-0 left-0 w-full z-40 pointer-events-none">
      <div className="flex items-center justify-between w-full px-6 md:px-12 py-6 md:py-8 pointer-events-auto">
        
        {/* Left: Menu */}
        <div className="w-1/3 flex justify-start">
          <button 
            onClick={() => openMobileMenu()} 
            className="text-white uppercase tracking-widest text-xs font-medium hover:opacity-50 transition-opacity"
          >
            MENU
          </button>
        </div>

        {/* Center: Logo */}
        <div className="w-1/3 flex justify-center">
          <Link href="/" className="flex items-center hover:opacity-75 transition-opacity">
            <Image 
              src="/images/logos/antho-wordmark-white.png" 
              alt="ANTHO Logo" 
              width={160} 
              height={96} 
              className="h-10 md:h-12 w-auto object-contain" 
              priority
            />
          </Link>
        </div>

        {/* Right: Cart */}
        <div className="w-1/3 flex justify-end">
          <button 
            onClick={() => openCartDrawer()} 
            className="text-white uppercase tracking-widest text-xs font-medium hover:opacity-50 transition-opacity"
          >
            CART [{cartCount}]
          </button>
        </div>

      </div>
    </header>
  );
}
