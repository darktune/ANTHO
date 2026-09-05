'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/stores/cartStore';
import { formatPrice } from '@/lib/utils';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import { FREE_SHIPPING_THRESHOLD, getShippingCost } from "@/lib/constants";
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
    <div className="container mx-auto px-4 py-12 pt-28 md:pt-36 lg:py-16 lg:pt-36">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        {/* Left Column - Form */}
        <div className="lg:col-span-7">
          <div className="mb-8">
            <h1 className="text-3xl font-serif mb-2">CHECKOUT</h1>
            <p className="text-stone-400">Complete your order details below.</p>
          </div>
          
          <CheckoutForm subtotal={subtotal} />
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-stone-900/50 border border-stone-800 p-6 lg:p-8 sticky top-28">
            <h2 className="text-xl font-medium mb-6">ORDER SUMMARY</h2>
            
            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
              {items.map((item) => (
                <div key={`${item.productId}-${item.variantId}`} className="flex gap-4">
                  <div className="w-16 h-20 bg-stone-900 relative flex-shrink-0 border border-stone-800">
                    <Image
                      src={item.imageUrl || '/images/antho-shoot/IMG_3806.JPG'}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute -top-2 -right-2 bg-stone-700 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold z-10">
                      {item.quantity}
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-sm font-medium line-clamp-1">{item.name}</h3>
                    {(item.size || item.color) && (
                      <p className="text-xs text-stone-400 mt-1">{[item.size, item.color].filter(Boolean).join(", ")}</p>
                    )}
                  </div>
                  <div className="text-sm font-medium flex items-center">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-3 py-6 border-y border-stone-800 text-sm">
              <div className="flex justify-between">
                <span className="text-stone-400">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Shipping</span>
                <span>
                  {!selectedState 
                    ? 'Enter shipping address' 
                    : subtotal >= FREE_SHIPPING_THRESHOLD 
                      ? 'Free' 
                      : formatPrice(shippingCost)}
                </span>
              </div>
            </div>
            
            <div className="flex justify-between items-end pt-6">
              <span className="text-lg font-medium">Total</span>
              <div className="text-right">
                <span className="text-xs text-stone-400 block mb-1">NGN</span>
                <span className="text-2xl font-serif">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
