import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

export default async function OrderConfirmationPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <div className="container mx-auto px-4 py-24 pt-32 md:pt-40 min-h-[70vh] flex flex-col items-center justify-center">
      <div className="max-w-xl w-full bg-stone-900/50 border border-stone-800 p-8 md:p-12 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center text-gold">
            <CheckCircle2 className="w-8 h-8" />
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-serif mb-4">ORDER CONFIRMED</h1>
        <p className="text-stone-400 mb-2">Thank you for your purchase.</p>
        <p className="text-stone-300 font-medium mb-8">Order Number: {(await params).id}</p>
        
        <div className="bg-stone-900 p-6 border border-stone-800 mb-8 text-left">
          <h2 className="font-medium mb-4">What happens next?</h2>
          <ul className="space-y-3 text-sm text-stone-400">
            <li className="flex gap-3">
              <span className="text-gold flex-shrink-0">1.</span>
              <span>You will receive an order confirmation email with details of your order.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-gold flex-shrink-0">2.</span>
              <span>Our team will begin processing your order within 24 hours.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-gold flex-shrink-0">3.</span>
              <span>You will receive another email with tracking information once your order has shipped.</span>
            </li>
          </ul>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/shop" 
            className="bg-white text-black px-8 py-4 font-medium hover:bg-stone-200 transition-colors"
          >
            CONTINUE SHOPPING
          </Link>
          <a 
            href="https://wa.me/2340000000000" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-transparent border border-stone-800 px-8 py-4 font-medium hover:bg-stone-900 transition-colors"
          >
            WHATSAPP SUPPORT
          </a>
        </div>
      </div>
    </div>
  );
}
