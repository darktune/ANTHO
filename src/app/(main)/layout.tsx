import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileMenu from '@/components/layout/MobileMenu';
import Preloader from '@/components/layout/Preloader';
import CartDrawer from '@/components/cart/CartDrawer';
import FilmGrain from '@/components/ui/FilmGrain';
import CustomCursor from '@/components/ui/CustomCursor';
import ThemeWrapper from '@/components/layout/ThemeWrapper';
import ServiceWorkerRegister from '@/components/layout/ServiceWorkerRegister';
import VIPIntentModal from '@/components/layout/VIPIntentModal';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeWrapper>
      <div className="relative min-h-screen flex flex-col">
        <FilmGrain />
        <CustomCursor />
        <Preloader />
        <ServiceWorkerRegister />
        <VIPIntentModal />
        <Header />
        <MobileMenu />
        <CartDrawer />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </ThemeWrapper>
  );
}
