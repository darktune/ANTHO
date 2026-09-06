'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/stores/uiStore';
import { useCartStore } from '@/stores/cartStore';

export default function CartDrawer() {
  const { isCartDrawerOpen, closeCartDrawer } = useUIStore();
  const { items, removeItem, updateQuantity } = useCartStore();

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  useEffect(() => {
    if (isCartDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartDrawerOpen]);

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={() => closeCartDrawer()}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-full max-w-md h-full bg-[#FAFAF9] dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-[#FAFAF9] shadow-2xl z-[101] flex flex-col border-l border-black/10 dark:border-white/10 transition-colors duration-300"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-black/10 dark:border-white/10">
              <h2 className="text-lg font-serif tracking-widest uppercase">Your Bag ({items.length})</h2>
              <button onClick={() => closeCartDrawer()} className="hover:text-[#C9A96E] transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center space-y-6">
                  <p className="text-neutral-500 tracking-widest uppercase text-xs">Your bag is empty.</p>
                  <button 
                    onClick={() => closeCartDrawer()}
                    className="border border-black dark:border-white px-8 py-3 text-xs tracking-[0.2em] uppercase hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={`${item.productId}-${item.variantId}`} className="flex space-x-4 border-b border-black/10 dark:border-white/10 pb-6">
                      <div className="relative w-24 h-32 bg-neutral-100 dark:bg-neutral-900 flex-shrink-0">
                        {item.imageUrl && (
                          <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                        )}
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-sm">{item.name}</h3>
                            <button onClick={() => removeItem(item.variantId)} className="text-neutral-400 hover:text-red-500 transition-colors">
                              <Trash2 size={16} />
                            </button>
                          </div>
                          {(item.size || item.color) && (
                            <p className="text-neutral-500 text-xs mt-1">{[item.size, item.color].filter(Boolean).join(", ")}</p>
                          )}
                          <p className="text-[#C9A96E] text-sm mt-2 font-mono">₦ {(item.price / 100).toLocaleString()}</p>
                        </div>
                        <div className="flex items-center border border-black/20 dark:border-white/20 w-fit rounded-sm mt-4">
                          <button onClick={() => updateQuantity(item.variantId, item.quantity - 1)} className="p-1 hover:text-[#C9A96E]" disabled={item.quantity <= 1}>
                            <Minus size={14} />
                          </button>
                          <span className="text-xs px-3 py-1 font-mono">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.variantId, item.quantity + 1)} className="p-1 hover:text-[#C9A96E]">
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-black/10 dark:border-white/10 bg-[#FAFAF9] dark:bg-[#0A0A0A]">
                <div className="flex justify-between items-center mb-6">
                  <span className="tracking-widest uppercase text-xs font-semibold">Subtotal</span>
                  <span className="text-[#C9A96E] text-lg font-mono">₦ {(subtotal / 100).toLocaleString()}</span>
                </div>
                <div className="space-y-3">
                  <Link href="/cart" onClick={() => closeCartDrawer()} className="w-full block text-center border border-black dark:border-white py-3.5 text-xs tracking-[0.2em] uppercase hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors font-semibold">
                    View Bag
                  </Link>
                  <Link href="/checkout" onClick={() => closeCartDrawer()} className="w-full block text-center bg-[#C9A96E] text-black font-bold py-3.5 text-xs tracking-[0.2em] uppercase hover:bg-[#b0925c] transition-colors">
                    Checkout
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
