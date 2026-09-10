import { formatPrice } from '@/lib/utils';
import { ArrowUpRight, Package, ShoppingCart, Users, DollarSign, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { sampleProducts } from '@/lib/sample-data';

export const metadata = {
  title: 'Dashboard | ANTHO Admin',
};

export default async function AdminDashboard() {
  let totalRevenue = 0;
  let totalOrdersCount = 0;
  let totalProductsCount = 0;
  let totalSubscribers = 0;
  let recentOrders: any[] = [];

  try {
    const [revenueAgg, ordersCount, productsCount, subscribersCount, orders] = await Promise.all([
      prisma.order.aggregate({
        where: { paymentStatus: 'paid' },
        _sum: { total: true },
      }),
      prisma.order.count(),
      prisma.product.count(),
      prisma.newsletter.count(),
      prisma.order.findMany({
        take: 6,
        orderBy: { createdAt: 'desc' },
        include: { items: true },
      }),
    ]);

    totalRevenue = revenueAgg._sum.total || 0;
    totalOrdersCount = ordersCount;
    totalProductsCount = productsCount;
    totalSubscribers = subscribersCount;
    recentOrders = orders;
  } catch (err) {
    // Graceful fallback for offline / initial state
  }

  // Fallback defaults if DB is fresh
  if (totalProductsCount === 0) {
    totalProductsCount = sampleProducts.length;
  }

  const stats = [
    { 
      name: 'Total Revenue', 
      value: totalRevenue > 0 ? formatPrice(totalRevenue) : '₦ 0', 
      change: 'Settled via Paystack', 
      isPositive: true, 
      icon: DollarSign 
    },
    { 
      name: 'Total Orders', 
      value: totalOrdersCount.toString(), 
      change: `${recentOrders.filter(o => o.paymentStatus === 'paid').length} Paid`, 
      isPositive: true, 
      icon: ShoppingCart 
    },
    { 
      name: 'Active Catalog', 
      value: totalProductsCount.toString(), 
      change: 'Editorial pieces', 
      isPositive: true, 
      icon: Package 
    },
    { 
      name: 'Inner Circle Drops', 
      value: totalSubscribers.toString(), 
      change: 'Subscribed VIPs', 
      isPositive: true, 
      icon: Users 
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#C9A96E] font-semibold block mb-1">OVERVIEW</span>
          <h1 className="text-3xl font-serif text-white">Dashboard</h1>
        </div>
        <div className="flex gap-2">
          <Link
            href="/"
            target="_blank"
            className="px-4 py-2 bg-stone-900 border border-stone-800 text-xs font-semibold uppercase tracking-wider text-stone-300 hover:text-white rounded flex items-center gap-2"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#C9A96E]" />
            Live Storefront
          </Link>
          <Link
            href="/admin/orders"
            className="px-4 py-2 bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-stone-200 rounded"
          >
            Manage Orders &rarr;
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-stone-950 border border-stone-800 p-6 rounded">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-stone-900 rounded text-[#C9A96E]">
                <stat.icon className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-mono tracking-wider text-stone-400">
                {stat.change}
              </span>
            </div>
            <h3 className="text-stone-400 text-xs uppercase tracking-wider mb-1">{stat.name}</h3>
            <p className="text-2xl font-serif font-bold text-white tracking-tight">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-stone-950 border border-stone-800 rounded overflow-hidden">
        <div className="p-6 border-b border-stone-800 flex justify-between items-center bg-stone-900/30">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-white">Live Customer Orders</h2>
            <p className="text-xs text-stone-400 mt-0.5">Real-time incoming orders through Paystack checkout</p>
          </div>
          <Link href="/admin/orders" className="text-xs text-[#C9A96E] hover:underline uppercase tracking-wider font-semibold">
            View All ({totalOrdersCount}) &rarr;
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="p-12 text-center text-stone-400 text-xs">
            <ShoppingCart className="w-8 h-8 mx-auto mb-3 text-stone-600 opacity-50" />
            <p className="uppercase tracking-widest font-semibold mb-1">No orders recorded yet</p>
            <p className="text-stone-500">Orders placed on the storefront will stream live directly here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-[10px] text-stone-400 uppercase tracking-widest bg-stone-900/60 border-b border-stone-800">
                <tr>
                  <th className="px-6 py-3.5 font-medium">Reference</th>
                  <th className="px-6 py-3.5 font-medium">Customer</th>
                  <th className="px-6 py-3.5 font-medium">Date</th>
                  <th className="px-6 py-3.5 font-medium">Total</th>
                  <th className="px-6 py-3.5 font-medium">Payment</th>
                  <th className="px-6 py-3.5 font-medium">Fulfillment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/60">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-stone-900/40 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-[#C9A96E]">
                      <Link href={`/orders/${order.orderNumber}`} target="_blank" className="hover:underline">
                        {order.orderNumber}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{order.customerName}</div>
                      <div className="text-[11px] text-stone-500 font-mono">{order.customerEmail}</div>
                    </td>
                    <td className="px-6 py-4 text-stone-400 font-mono">
                      {new Date(order.createdAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="px-6 py-4 font-mono text-stone-200">{formatPrice(order.total)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 text-[10px] uppercase tracking-wider rounded font-semibold border ${
                        order.paymentStatus === 'paid'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : order.paymentStatus === 'failed'
                          ? 'bg-red-500/10 text-red-400 border-red-500/30'
                          : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
                      }`}>
                        {order.paymentStatus || 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[11px] uppercase tracking-wider text-stone-400">
                        {order.status}
                      </span>
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
