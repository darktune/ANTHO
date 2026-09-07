import Breadcrumbs from '@/components/ui/Breadcrumbs';

export const metadata = {
  title: 'Shipping & Returns | ANTHO',
  description: 'Shipping and return policies for ANTHO.',
};

export default function ShippingReturnsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-8 py-16 pt-28 md:pt-36">
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
              Refunds are not offered unless the item is confirmed unavailable or lost in transit.
            </p>
          </div>
        </section>

        {/* Shipping Policy */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-red-600" />
            <h2 className="text-xs uppercase tracking-[0.25em] font-bold text-[#C9A96E]">
              Shipping Policy
            </h2>
          </div>
          <div className="space-y-4 pl-5 border-l border-black/10 dark:border-white/10 text-neutral-700 dark:text-neutral-300">
            <p>
              Orders are processed within <strong className="text-black dark:text-white font-medium">24–48 hours</strong> following order confirmation.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-[#C9A96E]">&bull;</span>
                <span><strong className="text-black dark:text-white font-medium">Domestic Shipping (Nigeria):</strong> Estimated delivery is 5–7 business days after processing.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#C9A96E]">&bull;</span>
                <span><strong className="text-black dark:text-white font-medium">International Shipping:</strong> Estimated delivery is 7–15 business days after processing.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#C9A96E]">&bull;</span>
                <span><strong className="text-black dark:text-white font-medium">Import Duties:</strong> Duties and local taxes may apply depending on your jurisdiction.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#C9A96E]">&bull;</span>
                <span><strong className="text-black dark:text-white font-medium">Calculation:</strong> Exact shipping rates are calculated dynamically at checkout.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Assistance */}
        <section className="pt-8 border-t border-black/10 dark:border-white/10 text-xs tracking-wider uppercase text-neutral-500">
          <p>
            For order inquiries or support, contact client concierge at{' '}
            <a href="mailto:info@antho.com" className="text-black dark:text-white underline underline-offset-4 hover:text-[#C9A96E]">
              info@antho.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
