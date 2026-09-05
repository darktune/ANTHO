import { formatPrice } from '@/lib/utils';
import { ArrowUpRight, ArrowDownRight, Package, ShoppingCart, Users, DollarSign } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  // Hardcoded sample data
  const stats = [
    { name: 'Total Revenue', value: 1250000000, change: '+12.5%', isPositive: true, icon: DollarSign },
    { name: 'Total Orders', value: 342, change: '+8.2%', isPositive: true, icon: ShoppingCart },
    { name: 'Total Products', value: 48, change: '+2', isPositive: true, icon: Package },
    { name: 'Active Customers', value: 892, change: '-2.4%', isPositive: false, icon: Users },
  ];

  const recentOrders = [
    { id: 'ORD-1234', customer: 'Chioma Adebayo', date: 'Today, 2:45 PM', total: 8500000, status: 'Processing' },
    { id: 'ORD-1235', customer: 'Oluwaseun O.', date: 'Today, 11:20 AM', total: 12500000, status: 'Shipped' },
    { id: 'ORD-1236', customer: 'Aisha Mohammed', date: 'Yesterday', total: 4500000, status: 'Delivered' },
    { id: 'ORD-1237', customer: 'Emmanuel E.', date: 'Yesterday', total: 21000000, status: 'Processing' },
    { id: 'ORD-1238', customer: 'David O.', date: '2 days ago', total: 6500000, status: 'Delivered' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif mb-2">Dashboard</h1>
        <p className="text-stone-400">Welcome back. Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-stone-900 border border-stone-800 p-6 rounded-lg">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-stone-950 rounded-md text-stone-400">
                <stat.icon className="w-5 h-5" />
              </div>
              <span className={`text-xs font-medium flex items-center ${stat.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {stat.isPositive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                {stat.change}
              </span>
            </div>
            <h3 className="text-stone-400 text-sm font-medium mb-1">{stat.name}</h3>
            <p className="text-2xl font-semibold">
              {stat.name === 'Total Revenue' ? formatPrice(stat.value) : stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-stone-900 border border-stone-800 rounded-lg overflow-hidden">
        <div className="p-6 border-b border-stone-800 flex justify-between items-center">
          <h2 className="text-lg font-medium">Recent Orders</h2>
          <Link href="/admin/orders" className="text-sm text-gold hover:underline">
            View all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-stone-400 uppercase bg-stone-950/50">
              <tr>
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Total</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-stone-800/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{order.id}</td>
                  <td className="px-6 py-4">{order.customer}</td>
                  <td className="px-6 py-4 text-stone-400">{order.date}</td>
                  <td className="px-6 py-4">{formatPrice(order.total)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      order.status === 'Delivered' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                      order.status === 'Processing' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                      'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
