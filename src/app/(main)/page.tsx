import HeroSection from '@/components/home/HeroSection';
import FeaturedCollection from '@/components/home/FeaturedCollection';
import BrandStory from '@/components/home/BrandStory';
import BestSellers from '@/components/home/BestSellers';
import CampaignBanner from '@/components/home/CampaignBanner';
import EditorialGrid from '@/components/home/EditorialGrid';
import Newsletter from '@/components/home/Newsletter';
import TrustSignals from '@/components/home/TrustSignals';

export const metadata = {
  title: 'ANTHO | Premium Nigerian Contemporary Fashion',
  description: 'For the culture. By the culture. Premium clothing brand blending contemporary fashion with cultural heritage.',
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#FAFAF9]">
      <HeroSection />
      <FeaturedCollection />
      <BrandStory />
      <BestSellers />
      <CampaignBanner />
      <EditorialGrid />
      <Newsletter />
      <TrustSignals />
    </main>
  );
}
