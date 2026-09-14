'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SizeSelector from './SizeSelector';
import ColorSelector from './ColorSelector';
import { Minus, Plus, Share2, Check, X } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/stores/cartStore';
import { useUIStore } from '@/stores/uiStore';
import { SIZE_CHART } from '@/lib/constants';

export default function ProductInfo({ product }: { product: any }) {
  const router = useRouter();
  const { addItem } = useCartStore();
  const { openCartDrawer } = useUIStore();

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('M');
  const [color, setColor] = useState('Black');
  const [added, setAdded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [sizeTab, setSizeTab] = useState<'tops' | 'bottoms'>('tops');

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = [
    { color: 'Black', colorHex: '#000000' },
    { color: 'White', colorHex: '#FFFFFF' },
    { color: 'Stone', colorHex: '#A8A29E' },
  ];

  const handleAddToCart = () => {
    const imageUrl = product.images?.[0]?.url || '/images/antho-shoot/IMG_3806.JPG';
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      imageUrl,
      size,
      color,
      colorHex: colors.find((c) => c.color === color)?.colorHex || '#000000',
      quantity,
      maxStock: 50,
      variantId: `${product.id}-${size}-${color}`,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    openCartDrawer();
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/checkout');
  };

  const handleShare = async () => {
    if (typeof window === 'undefined') return;

    // 1. Native mobile share sheet
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${product.name} | ANTHO`,
          text: `Explore ${product.name} on ANTHO — Contemporary Luxury Streetwear.`,
          url: window.location.href,
        });
        return;
      } catch (err: any) {
        if (err?.name === 'AbortError') return;
      }
    }

    // 2. Clipboard API
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
        return;
      }
    } catch {}

    // 3. Fallback input copy
    try {
      const el = document.createElement('textarea');
      el.value = window.location.href;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error('Share link copy failed:', e);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-neutral-900 dark:text-[#FAFAF9] mb-2 uppercase tracking-tight">
          {product.name}
        </h1>
        <div className="text-xl sm:text-2xl font-mono text-neutral-900 dark:text-[#FAFAF9]">
          {formatPrice ? formatPrice(product.price) : `₦${product.price / 100}`}
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-xs uppercase tracking-wider text-neutral-600 dark:text-[#A8A29E] font-medium">
              Color: {color}
            </span>
          </div>
          <ColorSelector colors={colors} selectedColor={color} onSelect={setColor} />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs uppercase tracking-wider text-neutral-600 dark:text-[#A8A29E] font-medium">
              Size: {size}
            </span>
            <button 
              type="button"
              onClick={() => setIsSizeGuideOpen(true)}
              className="text-xs text-neutral-500 hover:text-black dark:text-[#A8A29E] dark:hover:text-white underline tracking-wider uppercase transition-colors"
            >
              Size Guide
            </button>
          </div>
          <SizeSelector sizes={sizes} selectedSize={size} onSelect={setSize} variants={[]} />
        </div>

        <div>
          <span className="text-xs uppercase tracking-wider text-neutral-600 dark:text-[#A8A29E] block mb-2 font-medium">
            Quantity
          </span>
          <div className="flex items-center border border-neutral-300 dark:border-neutral-700 w-32">
            <button 
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))} 
              className="px-3 py-2 text-neutral-600 hover:text-black dark:text-[#A8A29E] dark:hover:text-white transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="flex-1 text-center font-mono text-xs text-neutral-900 dark:text-[#FAFAF9]">
              {quantity}
            </span>
            <button 
              type="button"
              onClick={() => setQuantity(quantity + 1)} 
              className="px-3 py-2 text-neutral-600 hover:text-black dark:text-[#A8A29E] dark:hover:text-white transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-4">
        <button 
          type="button"
          onClick={handleAddToCart} 
          className="w-full bg-black text-white dark:bg-[#FAFAF9] dark:text-[#0A0A0A] font-bold py-4 text-xs tracking-[0.25em] uppercase hover:bg-[#C9A96E] dark:hover:bg-[#C9A96E] dark:hover:text-white transition-colors duration-300 shadow-sm"
        >
          {added ? 'ADDED TO BAG ✓' : 'ADD TO BAG'}
        </button>
        <button 
          type="button"
          onClick={handleBuyNow} 
          className="w-full bg-transparent border border-black dark:border-white/40 text-neutral-900 dark:text-[#FAFAF9] font-bold py-4 text-xs tracking-[0.25em] uppercase hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300"
        >
          BUY NOW
        </button>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-[#A8A29E]/30">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">
            In Stock &bull; Ready to Ship
          </span>
        </div>
        <button 
          type="button"
          onClick={handleShare}
          className="flex items-center gap-2 text-xs uppercase tracking-wider text-neutral-600 hover:text-black dark:text-[#A8A29E] dark:hover:text-white transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#C9A96E]" />
              <span className="text-[#C9A96E] font-bold">LINK COPIED</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5" />
              <span>SHARE</span>
            </>
          )}
        </button>
      </div>

      {/* Accordions */}
      <div className="mt-4 divide-y divide-neutral-200 dark:divide-[#A8A29E]/30 border-y border-neutral-200 dark:border-[#A8A29E]/30">
        <details className="group py-4">
          <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-neutral-900 dark:text-[#FAFAF9] text-xs uppercase tracking-wider">
            <span>Description & Silhouette</span>
            <span className="transition group-open:rotate-180">
              <Plus className="w-4 h-4" />
            </span>
          </summary>
          <div className="text-neutral-600 dark:text-[#A8A29E] text-xs sm:text-sm mt-3 leading-relaxed">
            {product.description || 'Premium architectural streetwear piece meticulously designed and finished in Lagos, Nigeria.'}
          </div>
        </details>
        <details className="group py-4">
          <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-neutral-900 dark:text-[#FAFAF9] text-xs uppercase tracking-wider">
            <span>Materials & Care</span>
            <span className="transition group-open:rotate-180">
              <Plus className="w-4 h-4" />
            </span>
          </summary>
          <div className="text-neutral-600 dark:text-[#A8A29E] text-xs sm:text-sm mt-3 leading-relaxed">
            100% Heavyweight Cotton. Custom ribbing and hand-distressed detailing. Cold wash with like colors. Do not tumble dry.
          </div>
        </details>
        <details className="group py-4">
          <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-neutral-900 dark:text-[#FAFAF9] text-xs uppercase tracking-wider">
            <span>Shipping & Concierge Returns</span>
            <span className="transition group-open:rotate-180">
              <Plus className="w-4 h-4" />
            </span>
          </summary>
          <div className="text-neutral-600 dark:text-[#A8A29E] text-xs sm:text-sm mt-3 leading-relaxed">
            Orders are fulfilled within 24–48 hours. Nationwide delivery across Nigeria via tracked courier (1–5 business days). International express delivery via DHL.
          </div>
        </details>
      </div>

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#FAFAF9] dark:bg-[#121212] border border-black/10 dark:border-white/15 max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <div className="flex justify-between items-center pb-4 mb-4 border-b border-black/10 dark:border-white/10">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9A96E] font-bold block">MEASUREMENTS</span>
                <h3 className="text-lg font-serif uppercase tracking-wider text-neutral-900 dark:text-white">ANTHO Size Chart</h3>
              </div>
              <button 
                onClick={() => setIsSizeGuideOpen(false)}
                className="p-1.5 hover:text-[#C9A96E] transition-colors"
                aria-label="Close size guide"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex gap-4 mb-6 border-b border-black/10 dark:border-white/10">
              <button
                type="button"
                onClick={() => setSizeTab('tops')}
                className={`pb-2 text-xs uppercase tracking-widest font-semibold transition-colors ${
                  sizeTab === 'tops'
                    ? 'border-b-2 border-[#C9A96E] text-[#C9A96E]'
                    : 'text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                Tops & Polos (Inches)
              </button>
              <button
                type="button"
                onClick={() => setSizeTab('bottoms')}
                className={`pb-2 text-xs uppercase tracking-widest font-semibold transition-colors ${
                  sizeTab === 'bottoms'
                    ? 'border-b-2 border-[#C9A96E] text-[#C9A96E]'
                    : 'text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                Bottoms & Pants (Inches)
              </button>
            </div>

            <div className="overflow-x-auto">
              {sizeTab === 'tops' ? (
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-black/10 dark:border-white/10 font-bold uppercase tracking-wider text-neutral-500">
                      <th className="py-2.5 px-2">Size</th>
                      <th className="py-2.5 px-2">Chest</th>
                      <th className="py-2.5 px-2">Length</th>
                      <th className="py-2.5 px-2">Shoulders</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5 dark:divide-white/5 font-mono">
                    {SIZE_CHART.tops.map((row) => (
                      <tr key={row.size} className="hover:bg-black/5 dark:hover:bg-white/5">
                        <td className="py-2.5 px-2 font-bold text-neutral-900 dark:text-white">{row.size}</td>
                        <td className="py-2.5 px-2 text-neutral-600 dark:text-neutral-400">{row.chest}&quot;</td>
                        <td className="py-2.5 px-2 text-neutral-600 dark:text-neutral-400">{row.length}&quot;</td>
                        <td className="py-2.5 px-2 text-neutral-600 dark:text-neutral-400">{row.shoulders}&quot;</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-black/10 dark:border-white/10 font-bold uppercase tracking-wider text-neutral-500">
                      <th className="py-2.5 px-2">Size</th>
                      <th className="py-2.5 px-2">Waist</th>
                      <th className="py-2.5 px-2">Hips</th>
                      <th className="py-2.5 px-2">Inseam</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5 dark:divide-white/5 font-mono">
                    {SIZE_CHART.bottoms.map((row) => (
                      <tr key={row.size} className="hover:bg-black/5 dark:hover:bg-white/5">
                        <td className="py-2.5 px-2 font-bold text-neutral-900 dark:text-white">{row.size}</td>
                        <td className="py-2.5 px-2 text-neutral-600 dark:text-neutral-400">{row.waist}&quot;</td>
                        <td className="py-2.5 px-2 text-neutral-600 dark:text-neutral-400">{row.hips}&quot;</td>
                        <td className="py-2.5 px-2 text-neutral-600 dark:text-neutral-400">{row.inseam}&quot;</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <p className="text-[10px] text-neutral-500 uppercase tracking-wider mt-6 text-center">
              Tailored relaxed contemporary fit. For questions, reach out via WhatsApp concierge.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
