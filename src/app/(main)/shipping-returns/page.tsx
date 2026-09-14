import type { Metadata } from 'next';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Shipping, Delivery & Returns Protocol | ANTHO',
  description: 'ANTHO fulfillment timeline, nationwide delivery across Nigeria via tracked courier, Covenant University drop, Lagos rates, and return policies.',
  alternates: {
    canonical: '/shipping-returns',
  },
  openGraph: {
    title: 'Shipping & Returns | ANTHO',
    description: 'Nationwide delivery across Nigeria and campus fulfillment guidelines.',
    url: 'https://www.anthosyllogi.xyz/shipping-returns',
  },
};

export default function ShippingReturnsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 sm:py-16 pt-20 sm:pt-28 md:pt-36">
      <Breadcrumbs 
        items={[
          { label: 'Client Care', href: '/faq' },
          { label: 'Shipping & Returns' }
        ]} 
      />

      <div className="mt-8 mb-16 pb-6 border-b border-black/10 dark:border-white/10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif uppercase tracking-tight">
          Shipping & Returns
        </h1>
      </div>

      <div className="space-y-16 text-sm sm:text-base leading-relaxed">
        {/* Processing & Fulfillment Timeline */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-red-600" />
            <h2 className="text-xs uppercase tracking-[0.25em] font-bold text-[#C9A96E]">
              Order Processing Timeline
            </h2>
          </div>
          <div className="space-y-3 pl-5 border-l border-black/10 dark:border-white/10 text-neutral-700 dark:text-neutral-300">
            <p className="font-medium text-black dark:text-white">
              All orders are processed within 10–14 business days before they are sent out for delivery.
            </p>
            <p>
              Once your piece is inspected and packaged, you will receive an automated email confirmation containing full tracking information.
            </p>
          </div>
        </section>

        {/* Domestic Delivery Rates */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-red-600" />
            <h2 className="text-xs uppercase tracking-[0.25em] font-bold text-[#C9A96E]">
              Delivery Rates (Nigeria)
            </h2>
          </div>
          <div className="space-y-4 pl-5 border-l border-black/10 dark:border-white/10 text-neutral-700 dark:text-neutral-300">
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-[#C9A96E]">&bull;</span>
                <span>
                  <strong className="text-black dark:text-white font-medium">Covenant University (CU):</strong> ₦3,000 NGN — Campus drop / Tradefair pop-up pickup.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#C9A96E]">&bull;</span>
                <span>
                  <strong className="text-black dark:text-white font-medium">Lagos State:</strong> ₦6,500 NGN — 1–2 business days dispatch following processing.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#C9A96E]">&bull;</span>
                <span>
                  <strong className="text-black dark:text-white font-medium">Nationwide (All Other 35 States):</strong> ₦9,000 NGN — Tracked domestic logistics across Nigeria (3–5 business days).
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Return Policy */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-red-600" />
            <h2 className="text-xs uppercase tracking-[0.25em] font-bold text-[#C9A96E]">
              Return Policy
            </h2>
          </div>
          <div className="space-y-3 pl-5 border-l border-black/10 dark:border-white/10 text-neutral-700 dark:text-neutral-300">
            <p className="font-medium text-black dark:text-white">
              All sales are final.
            </p>
            <p>
              Due to the limited release and small-batch production of each drop, refunds or exchanges are not offered unless an item is confirmed damaged or unavailable upon arrival.
            </p>
          </div>
        </section>

        {/* Client Support Assistance */}
        <section className="pt-8 border-t border-black/10 dark:border-white/10 text-xs tracking-wider uppercase text-neutral-500">
          <p>
            For order inquiries or support, contact client concierge at{' '}
            <a href="mailto:antho.syllogi@gmail.com" className="text-black dark:text-white underline underline-offset-4 hover:text-[#C9A96E]">
              antho.syllogi@gmail.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
