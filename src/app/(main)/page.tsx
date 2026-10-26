import MinimalShowcase from '@/components/home/MinimalShowcase';
import BrandTicker from '@/components/home/BrandTicker';
import CurrentDrop from '@/components/home/CurrentDrop';
import FeaturedCollection from '@/components/home/FeaturedCollection';

export const metadata = {
  title: 'ANTHO | Official Store — Contemporary Nigerian Streetwear',
  description: 'God is the Greatest. Premium Nigerian Streetwear tailored for youth and young adults in Lagos, Nigeria.',
};

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* 1. Kinetic Hero Slideshow */}
      <MinimalShowcase />

      {/* 2. Brand Ethos Ticker */}
      <BrandTicker />

      {/* 3. Core 4-Piece Drop */}
      <CurrentDrop />

      {/* 4. Featured Curated Collections */}
      <FeaturedCollection />
    </main>
  );
}
