import Link from 'next/link';
import { CheckCircle2, ShieldCheck, Clock, AlertTriangle } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { formatPrice } from '@/lib/utils';

interface OrderConfirmationPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function OrderConfirmationPage({
  params,
  searchParams,
}: OrderConfirmationPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const orderNumber = resolvedParams.id;
  const paymentQuery = resolvedSearchParams.payment;
  const isSimulated = resolvedSearchParams.simulated === 'true';

  let order: any = null;
  try {
    order = await prisma.order.findUnique({
      where: { orderNumber },
      include: { items: true },
    });
  } catch (err) {
    // Database offline or query failed
  }

  const isPaid = order?.paymentStatus === 'paid' || paymentQuery === 'success';
  const isFailed = order?.paymentStatus === 'failed' || paymentQuery === 'failed';

  return (
    <div className="container mx-auto px-4 py-20 pt-28 md:pt-36 min-h-[75vh] flex flex-col items-center justify-center">
      <div className="max-w-xl w-full bg-stone-900/60 border border-stone-800 p-6 md:p-10 text-center backdrop-blur-sm">
        
        {/* Status Icon */}
        <div className="flex justify-center mb-6">
          {isPaid ? (
            <div className="w-16 h-16 bg-[#C9A96E]/15 rounded-full flex items-center justify-center text-[#C9A96E] border border-[#C9A96E]/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>
          ) : isFailed ? (
            <div className="w-16 h-16 bg-red-500/15 rounded-full flex items-center justify-center text-red-400 border border-red-500/30">
              <AlertTriangle className="w-8 h-8" />
            </div>
          ) : (
            <div className="w-16 h-16 bg-stone-800 rounded-full flex items-center justify-center text-stone-300">
              <Clock className="w-8 h-8" />
            </div>
          )}
        </div>

        {/* Title & Badge */}
        <h1 className="text-2xl md:text-3xl font-serif tracking-tight mb-2 uppercase">
          {isPaid ? 'ORDER & PAYMENT CONFIRMED' : isFailed ? 'PAYMENT UNVERIFIED' : 'ORDER RECEIVED'}
        </h1>
        
        {/* Payment Gateway Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] tracking-widest font-semibold uppercase mb-6 bg-stone-800/80 border border-stone-700 text-stone-300">
          <ShieldCheck className="w-3.5 h-3.5 text-[#C9A96E]" />
          {isSimulated ? (
            <span>PAYSTACK SIMULATION MODE</span>
          ) : isPaid ? (
            <span>SECURED VIA PAYSTACK • PAID</span>
          ) : isFailed ? (
            <span className="text-red-400">PAYSTACK TRANSACTION PENDING</span>
          ) : (
            <span>PAYSTACK GATEWAY</span>
          )}
        </div>

        <p className="text-stone-400 text-xs sm:text-sm mb-1">Thank you for joining the ANTHO circle.</p>
        <p className="text-stone-200 font-mono text-xs sm:text-sm tracking-wider mb-8">
          REFERENCE: <span className="text-[#C9A96E] font-bold">{orderNumber}</span>
        </p>

        {/* Order Details (if loaded from DB) */}
        {order && order.items && order.items.length > 0 && (
          <div className="bg-stone-950/80 p-5 border border-stone-800 mb-6 text-left">
            <div className="text-[11px] uppercase tracking-widest text-stone-400 font-semibold mb-3 border-b border-stone-800 pb-2">
              Order Summary
            </div>
            <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
              {order.items.map((item: any) => (
                <div key={item.id} className="flex justify-between items-center text-xs">
                  <span className="text-stone-300 truncate max-w-[240px]">
                    {item.quantity}x {item.productName} ({item.variant})
                  </span>
                  <span className="text-stone-400 font-mono">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-stone-800 pt-3 flex justify-between items-center text-xs font-semibold">
              <span className="text-stone-300 uppercase tracking-wider">Total</span>
              <span className="text-[#C9A96E] font-mono text-sm">{formatPrice(order.total)}</span>
            </div>
          </div>
        )}

        {/* Next Steps Guide */}
        <div className="bg-stone-950/60 p-5 border border-stone-800/80 mb-8 text-left">
          <h2 className="text-[11px] uppercase tracking-widest font-semibold text-stone-300 mb-3">
            Concierge Next Steps
          </h2>
          <ul className="space-y-2.5 text-xs text-stone-400">
            <li className="flex gap-2.5">
              <span className="text-[#C9A96E] font-bold">1.</span>
              <span>Confirmation sent to {order?.customerEmail || 'your email'}.</span>
            </li>
            <li className="flex gap-2.5">
              <span className="text-[#C9A96E] font-bold">2.</span>
              <span>Our Lagos studio will package and seal your editorial garments within 24 hours.</span>
            </li>
            <li className="flex gap-2.5">
              <span className="text-[#C9A96E] font-bold">3.</span>
              <span>Dispatch tracking details will follow immediately upon dispatch.</span>
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/shop"
            className="bg-white text-black px-6 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-stone-200 transition-colors"
          >
            CONTINUE SHOPPING
          </Link>
          <a
            href={`https://wa.me/2348000000000?text=Hello%20ANTHO%20team,%20regarding%20my%20order%20${encodeURIComponent(orderNumber)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent border border-stone-700 text-stone-300 px-6 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors"
          >
            WHATSAPP CONCIERGE
          </a>
        </div>
      </div>
    </div>
  );
}
