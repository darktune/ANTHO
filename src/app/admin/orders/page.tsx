import { formatPrice } from '@/lib/utils';
import { Search, Eye } from 'lucide-react';

export default function AdminOrdersPage() {
  // Hardcoded sample data
  const orders = [
    { id: 'ORD-1234', customer: 'Chioma Adebayo', email: 'chioma@example.com', date: 'Oct 24, 2023', total: 8500000, status: 'Processing', payment: 'Paid' },
    { id: 'ORD-1235', customer: 'Oluwaseun O.', email: 'oluwaseun@example.com', date: 'Oct 24, 2023', total: 12500000, status: 'Shipped', payment: 'Paid' },
    { id: 'ORD-1236', customer: 'Aisha Mohammed', email: 'aisha@example.com', date: 'Oct 23, 2023', total: 4500000, status: 'Delivered', payment: 'Paid' },
    { id: 'ORD-1237', customer: 'Emmanuel E.', email: 'emmanuel@example.com', date: 'Oct 22, 2023', total: 21000000, status: 'Processing', payment: 'Paid' },
    { id: 'ORD-1238', customer: 'David O.', email: 'david@example.com', date: 'Oct 20, 2023', total: 6500000, status: 'Delivered', payment: 'Paid' },
    { id: 'ORD-1239', customer: 'Sarah Johnson', email: 'sarah@example.com', date: 'Oct 19, 2023', total: 15500000, status: 'Cancelled', payment: 'Refunded' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif mb-1">Orders</h1>
          <p className="text-stone-400 text-sm">View and manage customer orders.</p>
        </div>
      </div>

      <div className="bg-stone-900 border border-stone-800 rounded-lg overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-stone-800 flex flex-col sm:flex-row gap-4 justify-between items-center bg-stone-950/50">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
            <input 
              type="text" 
              placeholder="Search by order ID or customer..." 
              className="w-full bg-stone-900 border border-stone-800 pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-stone-500 rounded-md"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="bg-stone-900 border border-stone-800 px-3 py-2 text-sm text-white focus:outline-none rounded-md flex-1 sm:flex-none">
              <option value="">Fulfillment Status</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select className="bg-stone-900 border border-stone-800 px-3 py-2 text-sm text-white focus:outline-none rounded-md flex-1 sm:flex-none">
              <option value="">Payment Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-stone-400 uppercase bg-stone-950/30">
              <tr>
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Total</th>
                <th className="px-6 py-4 font-medium">Payment</th>
                <th className="px-6 py-4 font-medium">Fulfillment</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-stone-800/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{order.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium">{order.customer}</div>
                    <div className="text-xs text-stone-500">{order.email}</div>
                  </td>
                  <td className="px-6 py-4 text-stone-400">{order.date}</td>
                  <td className="px-6 py-4 font-medium text-stone-300">{formatPrice(order.total)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs rounded-full border ${
                      order.payment === 'Paid' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                      order.payment === 'Refunded' ? 'bg-stone-500/10 text-stone-400 border-stone-500/20' :
                      'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                    }`}>
                      {order.payment}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs rounded-full border ${
                      order.status === 'Delivered' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                      order.status === 'Processing' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                      order.status === 'Cancelled' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                      'bg-blue-500/10 text-blue-500 border-blue-500/20'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end">
                      <button className="p-1.5 text-stone-400 hover:text-white transition-colors flex items-center gap-1 text-xs font-medium border border-stone-700 rounded bg-stone-800 px-2">
                        <Eye className="w-3 h-3" />
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="p-4 border-t border-stone-800 flex justify-between items-center text-sm text-stone-400 bg-stone-950/30">
          <span>Showing 1 to 6 of 342 orders</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 bg-stone-900 border border-stone-800 rounded-md hover:bg-stone-800 disabled:opacity-50">Prev</button>
            <button className="px-3 py-1 bg-stone-900 border border-stone-800 rounded-md hover:bg-stone-800">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
