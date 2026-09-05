export const metadata = {
  title: 'Shipping & Returns | ANTHO',
  description: 'Shipping and return policies for ANTHO orders.',
};

export default function ShippingReturnsPage() {
  return (
    <div className="container mx-auto px-4 py-16 lg:py-24 max-w-4xl">
      <h1 className="text-4xl lg:text-6xl font-serif mb-16 text-center">SHIPPING & RETURNS</h1>

      <div className="space-y-16">
        {/* Shipping Section */}
        <section>
          <h2 className="text-3xl font-serif mb-6 pb-4 border-b border-stone-800">Shipping Policy</h2>
          
          <div className="space-y-6 text-stone-300 leading-relaxed font-light">
            <p>
              We aim to process and dispatch all orders within 24 hours of receipt. During peak periods or sale events, processing may take up to 48 hours.
            </p>

            <div className="bg-stone-900 border border-stone-800 p-6 my-8">
              <h3 className="font-medium text-white mb-4">Domestic Shipping Rates & Times</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-stone-800">
                  <div>
                    <span className="block text-white">Lagos</span>
                    <span className="text-sm text-stone-400">1-2 Business Days</span>
                  </div>
                  <span className="font-medium">₦3,000</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-stone-800">
                  <div>
                    <span className="block text-white">South West</span>
                    <span className="text-sm text-stone-400">2-4 Business Days</span>
                  </div>
                  <span className="font-medium">₦4,500</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-stone-800">
                  <div>
                    <span className="block text-white">South East & South South</span>
                    <span className="text-sm text-stone-400">3-5 Business Days</span>
                  </div>
                  <span className="font-medium">₦5,500</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <div>
                    <span className="block text-white">North</span>
                    <span className="text-sm text-stone-400">4-7 Business Days</span>
                  </div>
                  <span className="font-medium">₦6,500</span>
                </div>
              </div>
            </div>

            <div className="bg-stone-900/50 border border-gold/30 p-4 text-center">
              <p className="text-gold font-medium">Free shipping on all orders over ₦50,000</p>
            </div>

            <h3 className="text-xl font-medium text-white mt-8 mb-4">Order Tracking</h3>
            <p>
              Once your order has been dispatched, you will receive an email containing tracking information. If you do not receive a shipping confirmation email within 3 business days of placing your order, please contact our support team.
            </p>
          </div>
        </section>

        {/* Returns Section */}
        <section>
          <h2 className="text-3xl font-serif mb-6 pb-4 border-b border-stone-800">Returns & Exchanges</h2>
          
          <div className="space-y-6 text-stone-300 leading-relaxed font-light">
            <p>
              We want you to be completely satisfied with your ANTHO purchase. If you are not entirely happy, we offer a 14-day return window from the date of delivery.
            </p>

            <h3 className="text-xl font-medium text-white mt-8 mb-4">Conditions for Returns</h3>
            <ul className="list-disc pl-5 space-y-2 text-stone-400">
              <li>Items must be returned within 14 days of receiving your order.</li>
              <li>Items must be in original, unworn, unwashed condition.</li>
              <li>All original tags must still be attached.</li>
              <li>Items must not have any marks, stains, or odors (including makeup, deodorant, or perfume).</li>
              <li>Final sale items are non-returnable and non-exchangeable.</li>
            </ul>

            <h3 className="text-xl font-medium text-white mt-8 mb-4">How to Initiate a Return</h3>
            <div className="bg-stone-900 border border-stone-800 p-6 space-y-4">
              <div className="flex gap-4">
                <span className="text-gold font-medium w-6 shrink-0">1.</span>
                <p>Contact us via WhatsApp (+234 000 000 0000) or email (hello@antho.ng) with your order number and reason for return.</p>
              </div>
              <div className="flex gap-4">
                <span className="text-gold font-medium w-6 shrink-0">2.</span>
                <p>Wait for our team to approve the return and provide you with a return shipping address.</p>
              </div>
              <div className="flex gap-4">
                <span className="text-gold font-medium w-6 shrink-0">3.</span>
                <p>Package the item securely and ship it back to us using a trackable service. Please note that return shipping costs are the responsibility of the customer.</p>
              </div>
            </div>

            <h3 className="text-xl font-medium text-white mt-8 mb-4">Refunds</h3>
            <p>
              Once your return is received and inspected, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed and applied to your original method of payment within 3-5 business days.
            </p>

            <h3 className="text-xl font-medium text-white mt-8 mb-4">Exchanges</h3>
            <p>
              If you need a different size or color, the fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
