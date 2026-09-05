import Accordion from '@/components/ui/Accordion';

export const metadata = {
  title: 'FAQ | ANTHO',
  description: 'Frequently asked questions about ANTHO orders, shipping, returns, and sizing.',
};

export default function FAQPage() {
  const orderShippingItems = [
    {
      title: 'How long will it take to receive my order?',
      content: 'Orders within Lagos typically take 1-2 business days to arrive. Orders to other states in Nigeria take 3-7 business days depending on the location. International shipping is currently unavailable but coming soon.'
    },
    {
      title: 'How can I track my order?',
      content: 'Once your order has been dispatched, you will receive an email containing a tracking number and a link to track your package\'s journey.'
    },
    {
      title: 'Can I change or cancel my order?',
      content: 'We process orders very quickly to ensure fast delivery. If you need to make a change or cancel, please contact us via WhatsApp within 1 hour of placing your order. Once an order is processed, we cannot make changes.'
    }
  ];

  const returnsItems = [
    {
      title: 'What is your return policy?',
      content: 'We accept returns within 14 days of delivery. Items must be unworn, unwashed, and have all original tags attached. Final sale items cannot be returned or exchanged.'
    },
    {
      title: 'How do I initiate a return?',
      content: 'Please email hello@antho.ng with your order number and reason for return. Our team will provide you with instructions and a return shipping address. Please note that return shipping costs are the responsibility of the customer.'
    },
    {
      title: 'When will I receive my refund?',
      content: 'Once we receive and inspect your return, we will process your refund within 3-5 business days. The funds will be returned to your original payment method. Depending on your bank, it may take an additional 2-5 days to appear on your statement.'
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
    <div className="container mx-auto px-4 py-16 lg:py-24 max-w-4xl">
      <h1 className="text-4xl lg:text-6xl font-serif mb-12 text-center">FAQ</h1>

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
