import { formatPrice } from '@/lib/utils';
import { Package, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { sampleProducts } from '@/lib/sample-data';

export const metadata = {
  title: 'Inventory & Products | ANTHO Admin',
};

export default async function AdminProductsPage() {
  let products: any[] = [];

  try {
    products = await prisma.product.findMany({
      include: {
        images: { orderBy: { position: 'asc' } },
        variants: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  } catch (err) {
    // Database offline fallback
  }

  if (!products || products.length === 0) {
    products = sampleProducts as any;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#C9A96E] font-semibold block mb-1">CATALOG ARCHIVE</span>
          <h1 className="text-3xl font-serif text-white">Products ({products.length})</h1>
        </div>
        <Link
          href="/shop"
          target="_blank"
          className="bg-white text-black px-4 py-2 font-bold hover:bg-stone-200 transition-colors flex items-center gap-2 text-xs uppercase tracking-wider rounded"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          View Storefront
        </Link>
      </div>

      <div className="bg-stone-950 border border-stone-800 rounded overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="text-[10px] text-stone-400 uppercase tracking-widest bg-stone-900/60 border-b border-stone-800">
              <tr>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Variants</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Storefront</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60">
              {products.map((product) => {
                const img = product.images?.[0]?.url || '/images/antho-shoot/IMG_3806.JPG';
                return (
                  <tr key={product.id} className="hover:bg-stone-900/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-14 bg-stone-900 rounded overflow-hidden shrink-0 border border-stone-800">
                          <Image
                            src={img}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-white truncate max-w-[220px]">{product.name}</div>
                          <div className="text-[10px] text-stone-500 font-mono">{product.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-stone-300 font-medium">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 font-mono text-stone-200 font-semibold">
                      {formatPrice(product.price)}
                    </td>
                    <td className="px-6 py-4 text-stone-400">
                      {product.variants?.length > 0 ? (
                        <span>{product.variants.length} SKU sizes</span>
                      ) : (
                        <span>XS – XXL</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider rounded font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        Active Drop
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/products/${product.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 border border-stone-700 hover:border-white text-stone-300 hover:text-white rounded text-[11px] uppercase tracking-wider font-semibold transition-colors"
                      >
                        <ExternalLink className="w-3 h-3 text-[#C9A96E]" />
                        Inspect
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
