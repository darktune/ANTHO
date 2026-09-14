import ProductCard from './ProductCard';

export default function RelatedProducts({ products, currentProductId }: { products: any[], currentProductId: string }) {
  const related = products.filter(p => p.id !== currentProductId).slice(0, 4);

  return (
    <div>
      <h2 className="text-2xl font-serif text-neutral-900 dark:text-[#FAFAF9] mb-6">You May Also Like</h2>
      <div className="flex overflow-x-auto gap-4 pb-4 snap-x hide-scrollbar">
        {related.map((product) => (
          <div key={product.id} className="min-w-[200px] md:min-w-[250px] flex-shrink-0 snap-start">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
