'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, Search, ShoppingBag } from 'lucide-react';
import { useUIStore } from '@/stores/uiStore';
import { useCartStore } from '@/stores/cartStore';
import { NAV_LINKS } from '@/lib/constants';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { openMobileMenu, openCartDrawer } = useUIStore();
  const cartItems = useCartStore((state) => state.items);
  
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full h-[72px] z-50 transition-colors duration-300 ${scrolled ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#A8A29E]/20' : 'bg-transparent'}`}>
      <div className="container h-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-full">
          {/* Mobile Left */}
          <div className="flex md:hidden items-center">
            <button onClick={() => openMobileMenu()} className="p-2 text-white">
              <Menu size={24} />
            </button>
          </div>

          {/* Logo (Desktop Left, Mobile Center) */}
          <div className="flex-1 md:flex-none flex justify-center md:justify-start">
            <Link href="/" className="flex items-center">
              <Image 
                src="/images/logo.jpg" 
                alt="ANTHO Logo" 
                width={120} 
                height={40} 
                className="h-10 w-auto mix-blend-difference invert brightness-200" 
              />
            </Link>
          </div>

          {/* Desktop Nav (Center) */}
          <nav className="hidden md:flex flex-1 justify-center space-x-8">
            {NAV_LINKS.map((link) => (
              <Link key={link.label} href={link.href} className="text-sm tracking-widest uppercase text-white/80 hover:text-[#C9A96E] transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right section (Desktop & Mobile) */}
          <div className="flex items-center justify-end space-x-4 md:space-x-6">
            <button className="text-white hover:text-[#C9A96E] transition-colors">
              <Search size={20} />
            </button>
            <button onClick={() => openCartDrawer()} className="text-white hover:text-[#C9A96E] transition-colors relative">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#C9A96E] text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
