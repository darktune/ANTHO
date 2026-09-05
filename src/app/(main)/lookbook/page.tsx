export const metadata = {
  title: 'Lookbook | ANTHO',
  description: 'SS26 — The Lagos Edit. Explore the latest collection from ANTHO.',
};

export default function LookbookPage() {
  // Generate placeholder data for masonry layout
  const items = Array.from({ length: 9 }).map((_, i) => ({
    id: i,
    aspect: i % 3 === 0 ? 'aspect-[3/4]' : i % 4 === 0 ? 'aspect-[4/5]' : 'aspect-square',
    title: `Look ${i + 1}`,
  }));

  return (
    <div className="pb-24">
      {/* Header */}
      <section className="py-24 text-center px-4">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif mb-6">LOOKBOOK</h1>
        <p className="text-xl text-stone-400 font-light tracking-wide uppercase">SS26 — The Lagos Edit</p>
      </section>

      {/* Masonry Grid */}
      <section className="container mx-auto px-4">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {items.map((item) => (
            <div 
              key={item.id} 
              className={`relative break-inside-avoid overflow-hidden group bg-stone-900 ${item.aspect}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-stone-800 to-stone-950 transition-transform duration-700 group-hover:scale-105"></div>
              
              {/* Optional caption on hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-serif text-xl tracking-widest">{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
