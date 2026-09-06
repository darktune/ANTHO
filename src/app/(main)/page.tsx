import MinimalShowcase from '@/components/home/MinimalShowcase';
import CurrentDrop from '@/components/home/CurrentDrop';

export const metadata = {
  title: 'ANTHO | Official Store',
  description: 'God is the Greatest. Premium Nigerian Streetwear.',
};

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <MinimalShowcase />
      <CurrentDrop />
    </main>
  );
}
