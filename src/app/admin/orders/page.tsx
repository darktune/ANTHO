import { formatPrice } from '@/lib/utils';
import { ShoppingBag, ExternalLink, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export const metadata = {
  title: 'Order Management | ANTHO Admin',
};

export default async function AdminOrdersPage() {
  let orders: any[] = [];

  try {
    orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        items: true,
      },
    });
  } catch (err) {
    // Database offline fallback
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#C9A96E] font-semibold block mb-1">FULFILLMENT & PAYMENTS</span>
          <h1 className="text-3xl font-serif text-white">Orders ({orders.length})</h1>
        </div>
      </div>

      <div className="bg-stone-950 border border-stone-800 rounded overflow-hidden flex flex-col">
        {orders.length === 0 ? (
          <div className="p-16 text-center text-stone-400">
            <ShoppingBag className="w-10 h-10 mx-auto mb-3 text-stone-600 opacity-50" />
            <h3 className="text-sm uppercase tracking-widest font-semibold text-white mb-1">No Orders Found</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto mb-6">
              When customers checkout via Paystack on your storefront, orders and items will populate here automatically.
            </p>
            <Link
              href="/shop"
              target="_blank"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 border border-stone-700 text-xs uppercase tracking-wider font-semibold text-stone-300 hover:text-white rounded"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Test Storefront Checkout &rarr;
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-[10px] text-stone-400 uppercase tracking-widest bg-stone-900/60 border-b border-stone-800">
                <tr>
                  <th className="px-6 py-4 font-medium">Order Number</th>
                  <th className="px-6 py-4 font-medium">Customer & Contact</th>
                  <th className="px-6 py-4 font-medium">Destination</th>
                  <th className="px-6 py-4 font-medium">Items</th>
                  <th className="px-6 py-4 font-medium">Total</th>
                  <th className="px-6 py-4 font-medium">Payment Status</th>
                  <th className="px-6 py-4 font-medium text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/60">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-stone-900/30 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-[#C9A96E]">
                      {order.orderNumber}
                      <div className="text-[10px] text-stone-500 font-sans font-normal mt-0.5">
                        {new Date(order.createdAt).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-white">{order.customerName}</div>
                      <div className="text-[11px] text-stone-400 font-mono">{order.customerEmail}</div>
                      {order.customerPhone && (
                        <div className="text-[11px] text-stone-500 font-mono">{order.customerPhone}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-stone-300 truncate max-w-[200px]">{order.shippingAddress}</div>
                      <div className="text-stone-500 text-[11px]">
                        {[order.shippingCity, order.shippingState].filter(Boolean).join(', ')}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-stone-300 font-medium">
                        {order.items?.length || 0} item{order.items?.length === 1 ? '' : 's'}
                      </div>
                      <div className="text-[10px] text-stone-500 truncate max-w-[180px]">
                        {order.items?.map((it: any) => `${it.quantity}x ${it.productName}`).join(', ')}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-stone-200 font-semibold">
                      {formatPrice(order.total)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-[10px] uppercase tracking-wider rounded font-semibold border ${
                        order.paymentStatus === 'paid'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : order.paymentStatus === 'failed'
                          ? 'bg-red-500/10 text-red-400 border-red-500/30'
                          : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
                      }`}>
                        <ShieldCheck className="w-3 h-3" />
                        {order.paymentStatus || 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/orders/${order.orderNumber}`}
                        target="_blank"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 border border-stone-700 hover:border-white text-stone-300 hover:text-white rounded text-[11px] uppercase tracking-wider font-semibold transition-colors"
                      >
                        <ExternalLink className="w-3 h-3 text-[#C9A96E]" />
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
