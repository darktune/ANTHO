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
            <Link href="/" className="inline-block mb-4">
              <Image 
                src="/images/logo.jpg" 
                alt="ANTHO Logo" 
                width={120} 
                height={40} 
                className="h-10 w-auto mix-blend-difference invert brightness-200" 
              />
            </Link>
            <p className="text-[#A8A29E] text-sm leading-relaxed">
              Premium Nigerian clothing brand blending cultural heritage with modern editorial aesthetics.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold mb-6 text-[#A8A29E]">Shop</h4>
            <ul className="space-y-4">
              {FOOTER_LINKS.shop.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm hover:text-[#C9A96E] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold mb-6 text-[#A8A29E]">Help</h4>
            <ul className="space-y-4">
              {FOOTER_LINKS.help.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm hover:text-[#C9A96E] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold mb-6 text-[#A8A29E]">Company</h4>
            <ul className="space-y-4">
              {FOOTER_LINKS.company.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm hover:text-[#C9A96E] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-full h-px bg-[#A8A29E]/20 mb-8"></div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-[#A8A29E] tracking-widest uppercase">
          <p>&copy; {new Date().getFullYear()} ANTHO. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <span>Currency: ₦ NGN</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
