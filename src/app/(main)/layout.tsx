import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileMenu from '@/components/layout/MobileMenu';
import Preloader from '@/components/layout/Preloader';
import CartDrawer from '@/components/cart/CartDrawer';
import FilmGrain from '@/components/ui/FilmGrain';
import CustomCursor from '@/components/ui/CustomCursor';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#0A0A0A] text-[#FAFAF9]">
      <FilmGrain />
      <CustomCursor />
      <Preloader />
      <Header />
      <MobileMenu />
      <CartDrawer />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
