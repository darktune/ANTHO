import { formatPrice } from '@/lib/utils';
import { Plus, Search, Edit, Trash2, MoreVertical } from 'lucide-react';
import Image from 'next/image';

export default function AdminProductsPage() {
  // Hardcoded sample data
  const products = [
    { id: 'PRD-01', name: 'Lagos Nights Silk Shirt', price: 4500000, category: 'Shirts', stock: 24, status: 'Published', image: '/products/placeholder-1.jpg' },
    { id: 'PRD-02', name: 'Harmattan Heavyweight Hoodie', price: 6500000, category: 'Outerwear', stock: 12, status: 'Published', image: '/products/placeholder-2.jpg' },
    { id: 'PRD-03', name: 'Victoria Island Tailored Trousers', price: 5500000, category: 'Bottoms', stock: 0, status: 'Out of Stock', image: '/products/placeholder-3.jpg' },
    { id: 'PRD-04', name: 'Eko Essential Tee', price: 2500000, category: 'T-Shirts', stock: 156, status: 'Published', image: '/products/placeholder-4.jpg' },
    { id: 'PRD-05', name: 'Oshodi Cargo Pants', price: 5000000, category: 'Bottoms', stock: 32, status: 'Draft', image: '/products/placeholder-5.jpg' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif mb-1">Products</h1>
          <p className="text-stone-400 text-sm">Manage your inventory, pricing, and variants.</p>
        </div>
        <button className="bg-white text-black px-4 py-2 font-medium hover:bg-stone-200 transition-colors flex items-center gap-2 text-sm rounded-md">
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      <div className="bg-stone-900 border border-stone-800 rounded-lg overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-stone-800 flex flex-col sm:flex-row gap-4 justify-between items-center bg-stone-950/50">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full bg-stone-900 border border-stone-800 pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-stone-500 rounded-md"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="bg-stone-900 border border-stone-800 px-3 py-2 text-sm text-white focus:outline-none rounded-md flex-1 sm:flex-none">
              <option value="">All Categories</option>
              <option value="shirts">Shirts</option>
              <option value="outerwear">Outerwear</option>
              <option value="bottoms">Bottoms</option>
            </select>
            <select className="bg-stone-900 border border-stone-800 px-3 py-2 text-sm text-white focus:outline-none rounded-md flex-1 sm:flex-none">
              <option value="">Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-stone-400 uppercase bg-stone-950/30">
              <tr>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Stock</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-stone-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-16 bg-stone-800 rounded flex-shrink-0">
                        {/* Placeholder for image */}
                      </div>
                      <div>
                        <div className="font-medium text-white line-clamp-1">{product.name}</div>
                        <div className="text-xs text-stone-500">{product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-stone-300">{product.category}</td>
                  <td className="px-6 py-4 text-stone-300">{formatPrice(product.price)}</td>
                  <td className="px-6 py-4">
                    <span className={`${product.stock === 0 ? 'text-red-500 font-medium' : 'text-stone-300'}`}>
                      {product.stock} in stock
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs rounded-full border ${
                      product.status === 'Published' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                      product.status === 'Draft' ? 'bg-stone-500/10 text-stone-400 border-stone-500/20' :
                      'bg-red-500/10 text-red-500 border-red-500/20'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-stone-400 hover:text-white transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-stone-400 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
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
          <span>Showing 1 to 5 of 48 products</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 bg-stone-900 border border-stone-800 rounded-md hover:bg-stone-800 disabled:opacity-50">Prev</button>
            <button className="px-3 py-1 bg-stone-900 border border-stone-800 rounded-md hover:bg-stone-800">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
