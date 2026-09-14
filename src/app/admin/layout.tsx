import { AdminSidebar } from '@/components/admin/AdminSidebar';

export const metadata = {
  title: 'Admin Concierge OS | ANTHO',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Simple check would go here - for now we just render
  // In a real app, this would use middleware or server-side auth checking

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row font-sans">
      <AdminSidebar />
      <main className="flex-1 p-6 md:p-10 md:ml-64 overflow-x-hidden min-h-screen">
        {children}
      </main>
    </div>
  );
}
