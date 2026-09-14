import type { Metadata } from 'next';
import Accordion from '@/components/ui/Accordion';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Client FAQs & Care Guide | ANTHO',
  description: 'Frequently asked questions regarding ANTHO drops, nationwide delivery in Nigeria, international DHL shipping, tailored sizing, and payment security.',
  alternates: {
    canonical: '/faq',
  },
  openGraph: {
    title: 'Client FAQs | ANTHO Concierge',
    description: 'Frequently asked questions regarding ANTHO drops, delivery, and sizing.',
    url: 'https://www.anthosyllogi.xyz/faq',
  },
};

export default function FAQPage() {
  const orderShippingItems = [
    {
      title: 'How long will it take to receive my order?',
      content: 'All orders are processed within 10–14 business days. Following processing, Covenant University deliveries take 1 business day, Lagos takes 1–2 business days, and nationwide delivery across other states takes 3–5 business days.'
    },
    {
      title: 'What are your shipping rates?',
      content: 'Covenant University (CU) delivery is ₦3,000 NGN; Lagos State is ₦6,500 NGN; and Nationwide shipping across all other 35 states in Nigeria is ₦9,000 NGN.'
    },
    {
      title: 'How can I track my order?',
      content: 'Once your order has been dispatched, you will receive an automated email containing full courier tracking information.'
    },
    {
      title: 'Can I change or cancel my order?',
      content: 'Orders are processed quickly. Contact client concierge at antho.syllogi@gmail.com within 1 hour of placing your order if adjustments are needed.'
    }
  ];

  const returnsItems = [
    {
      title: 'What is your return policy?',
      content: 'All sales are final. Due to limited release sizes, refunds or replacements are not offered unless the piece is confirmed damaged upon delivery.'
    },
    {
      title: 'What if my item arrives damaged?',
      content: 'Contact us within 48 hours of delivery at antho.syllogi@gmail.com with photographs of the piece and packaging.'
    }
  ];

  const sizingItems = [
    {
      title: 'How do your clothes fit?',
      content: 'Most of our pieces are designed with a contemporary, slightly relaxed fit. We recommend ordering your true size for the intended look, or sizing up if you prefer an oversized fit. Please check the product description for specific fit notes.'
    },
    {
      title: 'Size Guide',
      content: (
        <div className="overflow-x-auto mt-4 border border-stone-800">
          <table className="w-full text-sm text-left">
            <thead className="bg-stone-900 border-b border-stone-800">
              <tr>
                <th className="px-4 py-3 font-medium">Size</th>
                <th className="px-4 py-3 font-medium">Chest (cm)</th>
                <th className="px-4 py-3 font-medium">Waist (cm)</th>
                <th className="px-4 py-3 font-medium">Hips (cm)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800">
              <tr>
                <td className="px-4 py-3 font-medium">S</td>
                <td className="px-4 py-3 text-stone-400">92-96</td>
                <td className="px-4 py-3 text-stone-400">76-80</td>
                <td className="px-4 py-3 text-stone-400">92-96</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">M</td>
                <td className="px-4 py-3 text-stone-400">96-100</td>
                <td className="px-4 py-3 text-stone-400">80-84</td>
                <td className="px-4 py-3 text-stone-400">96-100</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">L</td>
                <td className="px-4 py-3 text-stone-400">100-104</td>
                <td className="px-4 py-3 text-stone-400">84-88</td>
                <td className="px-4 py-3 text-stone-400">100-104</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">XL</td>
                <td className="px-4 py-3 text-stone-400">104-108</td>
                <td className="px-4 py-3 text-stone-400">88-92</td>
                <td className="px-4 py-3 text-stone-400">104-108</td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    }
  ];

  const paymentItems = [
    {
      title: 'What payment methods do you accept?',
      content: 'We accept all major debit and credit cards, bank transfers, and USSD payments securely processed through Paystack.'
    },
    {
      title: 'Is my payment secure?',
      content: 'Yes, absolutely. We use Paystack for all transactions. We do not store any of your payment information on our servers.'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-10 sm:py-16 pt-20 sm:pt-28 md:pt-36 lg:py-24 lg:pt-36 max-w-4xl">
      <Breadcrumbs 
        items={[
          { label: 'Client Care', href: '/shipping-returns' },
          { label: 'FAQ' }
        ]} 
        className="mb-8"
      />

      <h1 className="text-4xl lg:text-6xl font-serif mb-12 text-center text-neutral-900 dark:text-white">FAQ</h1>

      <div className="space-y-16">
        <section>
          <h2 className="text-2xl font-serif mb-6 text-gold">Orders & Shipping</h2>
          <Accordion items={orderShippingItems} />
        </section>

        <section>
          <h2 className="text-2xl font-serif mb-6 text-gold">Returns & Exchanges</h2>
          <Accordion items={returnsItems} />
        </section>

        <section>
          <h2 className="text-2xl font-serif mb-6 text-gold">Sizing & Fit</h2>
          <Accordion items={sizingItems} />
        </section>

        <section>
          <h2 className="text-2xl font-serif mb-6 text-gold">Payment</h2>
          <Accordion items={paymentItems} />
        </section>
      </div>
    </div>
  );
}
