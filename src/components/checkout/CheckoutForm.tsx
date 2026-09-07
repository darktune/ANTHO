'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/stores/cartStore';
import Input from '@/components/ui/Input';
import { NIGERIAN_STATES, FREE_SHIPPING_THRESHOLD, getShippingCost } from "@/lib/constants";
import { formatPrice } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface CheckoutFormProps {
  subtotal: number;
}

export function CheckoutForm({ subtotal }: CheckoutFormProps) {
  const router = useRouter();
  const { items, clearCart, setSelectedState, selectedState } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : (getShippingCost(selectedState || "").cost || 0);
    const total = subtotal + shippingCost;

    try {
      const res = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: `${formData.firstName} ${formData.lastName}`.trim(),
          customerEmail: formData.email,
          customerPhone: formData.phone,
          shippingAddress: formData.address,
          shippingCity: formData.city,
          shippingState: selectedState || '',
          notes: formData.notes,
          subtotal,
          shippingCost,
          total,
          items,
        }),
      });

      const data = await res.json();
      const orderNumber = data.orderNumber || `ANTHO-${Date.now().toString().slice(-6)}`;
      clearCart();

      if (data.authorizationUrl) {
        window.location.href = data.authorizationUrl;
        return;
      }

      router.push(`/orders/${orderNumber}`);
    } catch (err) {
      console.error('Checkout error:', err);
      clearCart();
      router.push(`/orders/ANTHO-${Date.now().toString().slice(-6)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Contact Info */}
      <section>
        <h2 className="text-lg font-medium mb-4 pb-2 border-b border-stone-800">Contact Information</h2>
        <div className="space-y-4">
          <Input 
            label="Email Address" 
            type="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange}
            required 
            placeholder="you@example.com"
          />
          <Input 
            label="Phone Number" 
            type="tel" 
            name="phone" 
            value={formData.phone}
            onChange={handleChange}
            required 
            placeholder="+234..."
          />
        </div>
      </section>

      {/* Shipping Address */}
      <section>
        <h2 className="text-lg font-medium mb-4 pb-2 border-b border-stone-800">Shipping Address</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="First Name" 
              name="firstName" 
              value={formData.firstName}
              onChange={handleChange}
              required 
            />
            <Input 
              label="Last Name" 
              name="lastName" 
              value={formData.lastName}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-stone-300">
              Address
            </label>
            <textarea 
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              rows={3}
              className="w-full bg-stone-900 border border-stone-800 px-4 py-3 text-white focus:outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-500 transition-colors"
              placeholder="Street address, apartment, suite, etc."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="City" 
              name="city" 
              value={formData.city}
              onChange={handleChange}
              required 
            />
            <div className="space-y-2">
              <label className="block text-sm font-medium text-stone-300">
                State
              </label>
              <select
                name="state"
                value={selectedState || ''}
                onChange={handleStateChange}
                required
                className="w-full bg-stone-900 border border-stone-800 px-4 py-3 text-white focus:outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-500 transition-colors appearance-none"
              >
                <option value="" disabled>Select State</option>
                {NIGERIAN_STATES.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Notes */}
      <section>
        <h2 className="text-lg font-medium mb-4 pb-2 border-b border-stone-800">Additional Information</h2>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-stone-300">
            Order Notes (Optional)
          </label>
          <textarea 
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={2}
            className="w-full bg-stone-900 border border-stone-800 px-4 py-3 text-white focus:outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-500 transition-colors"
            placeholder="Special instructions for delivery..."
          />
        </div>
      </section>

      <div className="pt-2">
        <button 
          type="submit"
          disabled={isSubmitting || !selectedState}
          className="w-full bg-white text-black py-4 font-medium hover:bg-stone-200 transition-colors disabled:opacity-70 flex justify-center items-center tracking-widest text-xs uppercase font-bold"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              CONNECTING TO PAYSTACK...
            </>
          ) : (
            'PAY WITH PAYSTACK'
          )}
        </button>
        <p className="text-center text-[10px] tracking-wider text-stone-500 uppercase mt-2">
          Secured by Paystack • Cards, Bank Transfers, USSD & Apple Pay
        </p>
      </div>
    </form>
  );
}
