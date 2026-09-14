'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/stores/cartStore';
import Input from '@/components/ui/Input';
import { NIGERIAN_STATES, FREE_SHIPPING_THRESHOLD, getShippingCost } from "@/lib/constants";
import { formatPrice } from '@/lib/utils';
import { Loader2, AlertCircle } from 'lucide-react';

interface CheckoutFormProps {
  subtotal: number;
}

export function CheckoutForm({ subtotal }: CheckoutFormProps) {
  const router = useRouter();
  const { items, clearCart, setSelectedState, selectedState } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
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
    setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!selectedState) {
      setErrorMessage('Please select a delivery state to continue.');
      return;
    }

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
          shippingState: selectedState,
          notes: formData.notes,
          subtotal,
          shippingCost,
          total,
          items,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to initialize order with Paystack');
      }

      const orderNumber = data.orderNumber || `ANTHO-${Date.now().toString().slice(-6)}`;
      clearCart();

      if (data.authorizationUrl) {
        window.location.href = data.authorizationUrl;
        return;
      }

      router.push(`/orders/${orderNumber}`);
    } catch (err: any) {
      console.error('Checkout error:', err);
      setErrorMessage(err.message || 'Payment service error. Please try again or reach out to concierge.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {errorMessage && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 dark:text-red-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Contact Info */}
      <section>
        <h2 className="text-sm uppercase tracking-[0.2em] font-semibold mb-4 pb-2 border-b border-black/10 dark:border-stone-800 text-neutral-900 dark:text-white">
          Contact Information
        </h2>
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
        <h2 className="text-sm uppercase tracking-[0.2em] font-semibold mb-4 pb-2 border-b border-black/10 dark:border-stone-800 text-neutral-900 dark:text-white">
          Shipping Address
        </h2>
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
            <label className="block text-[10px] uppercase tracking-[0.2em] text-[#A8A29E] font-semibold">
              Delivery Address
            </label>
            <textarea 
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              rows={3}
              className="w-full bg-stone-50 dark:bg-stone-900 border border-neutral-300 dark:border-stone-800 px-4 py-3 text-neutral-900 dark:text-white focus:outline-none focus:border-[#C9A96E] transition-colors text-base sm:text-sm placeholder:text-stone-400"
              placeholder="Street address, estate, apartment, etc."
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
              <label className="block text-[10px] uppercase tracking-[0.2em] text-[#A8A29E] font-semibold">
                State (Nigeria)
              </label>
              <select
                name="state"
                value={selectedState || ''}
                onChange={handleStateChange}
                required
                className="w-full bg-stone-50 dark:bg-stone-900 border border-neutral-300 dark:border-stone-800 px-4 py-3 text-neutral-900 dark:text-white focus:outline-none focus:border-[#C9A96E] transition-colors text-base sm:text-sm"
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
        <h2 className="text-sm uppercase tracking-[0.2em] font-semibold mb-4 pb-2 border-b border-black/10 dark:border-stone-800 text-neutral-900 dark:text-white">
          Order Notes (Optional)
        </h2>
        <div className="space-y-2">
          <textarea 
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={2}
            className="w-full bg-stone-50 dark:bg-stone-900 border border-neutral-300 dark:border-stone-800 px-4 py-3 text-neutral-900 dark:text-white focus:outline-none focus:border-[#C9A96E] transition-colors text-base sm:text-sm placeholder:text-stone-400"
            placeholder="Special delivery instructions or gate access..."
          />
        </div>
      </section>

      <div className="pt-2">
        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black text-white dark:bg-white dark:text-black py-4 min-h-[52px] font-bold hover:bg-[#C9A96E] dark:hover:bg-[#C9A96E] dark:hover:text-white transition-colors duration-300 disabled:opacity-50 flex justify-center items-center tracking-widest text-xs uppercase shadow-md"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              CONNECTING TO PAYSTACK...
            </>
          ) : !selectedState ? (
            'SELECT DELIVERY STATE TO PAY'
          ) : (
            'PAY WITH PAYSTACK'
          )}
        </button>
        <p className="text-center text-[10px] tracking-wider text-neutral-500 uppercase mt-2 font-medium">
          Secured by Paystack • Cards, Bank Transfers, USSD & Apple Pay
        </p>
      </div>
    </form>
  );
}
