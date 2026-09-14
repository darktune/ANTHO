'use client';

import Link from 'next/link';
import { useCartStore } from '@/stores/cartStore';
import { formatPrice } from '@/lib/utils';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { Minus, Plus, X } from 'lucide-react';
import Image from 'next/image';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 pt-32 md:pt-40 min-h-[60vh] flex flex-col items-center justify-center">
        <Breadcrumbs items={[{ label: 'Bag' }]} className="mb-8" />
        <h1 className="text-4xl font-serif mb-6 text-center text-neutral-900 dark:text-white">YOUR BAG</h1>
        <p className="text-neutral-500 dark:text-stone-400 mb-8 text-center max-w-md text-sm">
          Your cart is currently empty. Discover our latest pieces and elevated streetwear.
        </p>
        <Link 
          href="/shop" 
          className="bg-black text-white dark:bg-white dark:text-black px-8 py-4 text-xs font-semibold uppercase tracking-widest hover:opacity-90 transition-opacity"
        >
          CONTINUE SHOPPING
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 pt-28 md:pt-36 lg:py-24 max-w-7xl">
      <Breadcrumbs items={[{ label: 'Bag' }]} className="mb-8" />
      <h1 className="text-4xl lg:text-5xl font-serif mb-12 text-neutral-900 dark:text-white">YOUR BAG</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
          <div className="hidden md:grid grid-cols-12 pb-4 border-b border-stone-800 text-sm text-stone-400 mb-6">
            <div className="col-span-6">PRODUCT</div>
            <div className="col-span-3 text-center">QUANTITY</div>
            <div className="col-span-3 text-right">TOTAL</div>
          </div>

          <div className="space-y-6">
            {items.map((item) => (
              <div key={`${item.productId}-${item.variantId}`} className="flex flex-col md:grid md:grid-cols-12 items-center gap-4 py-4 border-b border-stone-800/50 relative">
                <button 
                  onClick={() => removeItem(item.variantId)}
                  className="absolute top-4 right-0 md:hidden p-2 text-stone-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="col-span-6 flex items-center gap-6 w-full">
                  <div className="w-24 h-32 bg-stone-900 relative flex-shrink-0">
                    <div className="absolute inset-0 flex items-center justify-center text-stone-800">
                      <Image
                        src={item.imageUrl || '/images/antho-shoot/IMG_3806.JPG'}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <Link href={`/products/${item.slug || item.productId}`} className="text-lg font-medium hover:text-[#C9A96E] transition-colors">
                      {item.name}
                    </Link>
                    <p className="text-sm text-stone-400 mt-1">{formatPrice(item.price)}</p>
                    {(item.size || item.color) && (
                      <p className="text-sm text-stone-500 mt-1">Variant: {[item.size, item.color].filter(Boolean).join(", ")}</p>
                    )}
                  </div>
                </div>

                <div className="col-span-3 flex justify-center w-full md:w-auto mt-4 md:mt-0">
                  <div className="flex items-center border border-stone-800 rounded-none w-32">
                    <button 
                      onClick={() => updateQuantity(item.variantId, Math.max(1, item.quantity - 1))}
                      className="p-3 text-stone-400 hover:text-white transition-colors"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="flex-1 text-center text-sm font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                      className="p-3 text-stone-400 hover:text-white transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="col-span-3 text-right flex justify-between md:block w-full mt-4 md:mt-0">
                  <span className="md:hidden text-stone-400">Total:</span>
                  <div className="flex items-center justify-end gap-4">
                    <span className="text-lg font-medium">{formatPrice(item.price * item.quantity)}</span>
                    <button 
                      onClick={() => removeItem(item.variantId)}
                      className="hidden md:block p-2 text-stone-500 hover:text-white transition-colors"
                      aria-label="Remove item"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="bg-stone-100 dark:bg-stone-900/60 border border-black/10 dark:border-stone-800 p-6 sm:p-8 sticky top-24">
            <h2 className="text-sm uppercase tracking-[0.2em] font-semibold mb-6 text-neutral-900 dark:text-white">ORDER SUMMARY</h2>
            
            <div className="space-y-4 mb-6 pb-6 border-b border-black/10 dark:border-stone-800 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-500 dark:text-stone-400">Subtotal</span>
                <span className="font-mono text-neutral-900 dark:text-white">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500 dark:text-stone-400">Shipping</span>
                <span className="text-neutral-600 dark:text-stone-400 text-xs">Calculated at checkout</span>
              </div>
            </div>
            
            <div className="flex justify-between items-end mb-8">
              <span className="text-base uppercase tracking-wider font-semibold text-neutral-900 dark:text-white">Total</span>
              <span className="text-2xl font-mono text-[#C9A96E] font-bold">{formatPrice(subtotal)}</span>
            </div>

            <div className="space-y-4">
              <Link 
                href="/checkout" 
                className="block w-full bg-black text-white dark:bg-white dark:text-black text-center py-4 font-bold text-xs uppercase tracking-[0.25em] hover:bg-[#C9A96E] dark:hover:bg-[#C9A96E] dark:hover:text-white transition-colors duration-300 shadow-sm"
              >
                PROCEED TO CHECKOUT &rarr;
              </Link>
              
              <Link 
                href="/shop" 
                className="block w-full text-center py-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-600 dark:text-stone-400 hover:text-black dark:hover:text-white transition-colors border border-black/15 dark:border-stone-800"
              >
                CONTINUE SHOPPING
              </Link>
            </div>

            {subtotal < 5000000 && (
              <p className="text-xs text-center text-neutral-500 dark:text-stone-500 mt-6">
                Spend {formatPrice(5000000 - subtotal)} more to unlock free shipping across Nigeria.
              </p>
            )}
            {subtotal >= 5000000 && (
              <p className="text-xs text-center text-[#C9A96E] font-semibold mt-6 uppercase tracking-wider">
                ✓ Free Shipping Unlocked
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
