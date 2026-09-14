'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/stores/cartStore';
import { formatPrice } from '@/lib/utils';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import { FREE_SHIPPING_THRESHOLD, getShippingCost } from "@/lib/constants";
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Image from 'next/image';
import Link from 'next/link';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, selectedState } = useCartStore();
  
  useEffect(() => {
    if (items.length === 0) {
      router.push('/shop');
    }
  }, [items, router]);

  if (items.length === 0) return null;

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  
  let shippingCost = 0;
  if (subtotal < FREE_SHIPPING_THRESHOLD && selectedState) {
    const stateObj = getShippingCost(selectedState || "");
    if (stateObj) {
      shippingCost = stateObj.cost;
    }
  }

  const total = subtotal + shippingCost;

  return (
    <div className="container mx-auto px-4 py-12 pt-28 md:pt-36 lg:py-16 lg:pt-36 max-w-7xl">
      <Breadcrumbs 
        items={[
          { label: 'Bag', href: '/cart' },
          { label: 'Checkout' }
        ]} 
        className="mb-8"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        {/* Left Column - Form */}
        <div className="lg:col-span-7">
          <div className="mb-8">
            <h1 className="text-3xl font-serif mb-2 text-neutral-900 dark:text-white">CHECKOUT</h1>
            <p className="text-neutral-500 dark:text-stone-400 text-sm">Complete your order details below.</p>
          </div>
          
          <CheckoutForm subtotal={subtotal} />
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-stone-100 dark:bg-stone-900/60 border border-black/10 dark:border-stone-800 p-6 lg:p-8 sticky top-28">
            <h2 className="text-sm uppercase tracking-[0.2em] font-semibold mb-6 text-neutral-900 dark:text-white">ORDER SUMMARY</h2>
            
            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
              {items.map((item) => (
                <div key={`${item.productId}-${item.variantId}`} className="flex gap-4">
                  <div className="w-16 h-20 bg-neutral-200 dark:bg-stone-900 relative flex-shrink-0 border border-black/10 dark:border-stone-800">
                    <Image
                      src={item.imageUrl || '/images/antho-shoot/IMG_3806.JPG'}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute -top-2 -right-2 bg-black dark:bg-stone-700 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold z-10">
                      {item.quantity}
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-sm font-medium line-clamp-1 text-neutral-900 dark:text-white">{item.name}</h3>
                    {(item.size || item.color) && (
                      <p className="text-xs text-neutral-500 dark:text-stone-400 mt-1">{[item.size, item.color].filter(Boolean).join(", ")}</p>
                    )}
                  </div>
                  <div className="text-sm font-medium font-mono flex items-center text-neutral-900 dark:text-white">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-3 py-6 border-y border-black/10 dark:border-stone-800 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-500 dark:text-stone-400">Subtotal</span>
                <span className="font-mono text-neutral-900 dark:text-white">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500 dark:text-stone-400">Shipping</span>
                <span className="font-mono text-neutral-900 dark:text-white">
                  {!selectedState 
                    ? 'Enter delivery address' 
                    : subtotal >= FREE_SHIPPING_THRESHOLD 
                      ? 'Free' 
                      : formatPrice(shippingCost)}
                </span>
              </div>
            </div>
            
            <div className="flex justify-between items-end pt-6">
              <span className="text-base uppercase tracking-wider font-semibold text-neutral-900 dark:text-white">Total</span>
              <div className="text-right">
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 dark:text-stone-400 block mb-1">NGN</span>
                <span className="text-2xl font-mono text-[#C9A96E] font-bold">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
