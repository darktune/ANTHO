'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // Ignored
    }
    sessionStorage.removeItem('antho_admin_auth');
    window.location.href = '/login';
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-stone-950 border-b border-stone-800 sticky top-0 z-50">
        <span className="font-serif text-lg tracking-widest text-white">
          ANTHO <span className="text-[#C9A96E] text-xs font-sans tracking-normal uppercase ml-1">Admin</span>
        </span>
        <button onClick={() => setIsOpen(!isOpen)} className="text-stone-300 p-1">
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/80 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <aside className={`
        fixed md:sticky top-0 left-0 z-50 h-screen bg-stone-950 border-r border-stone-800 w-64 flex flex-col transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 border-b border-stone-800 hidden md:block">
          <Link href="/admin">
            <span className="font-serif text-xl tracking-widest text-white block">
              ANTHO <span className="text-[#C9A96E] text-xs font-sans tracking-normal uppercase ml-1">Admin</span>
            </span>
          </Link>
          <span className="text-[10px] uppercase tracking-widest text-stone-500 mt-1 block">
            Studio Management
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(`${item.href}/`));
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded text-xs uppercase tracking-wider font-semibold transition-colors ${
                  isActive 
                    ? 'bg-stone-900 text-white border border-stone-800' 
                    : 'text-stone-400 hover:text-white hover:bg-stone-900/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#C9A96E]' : ''}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-stone-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2 text-stone-400 hover:text-white transition-colors text-xs uppercase tracking-wider font-medium"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#C9A96E]" />
            <span>View Storefront</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 text-stone-400 hover:text-red-400 transition-colors text-xs uppercase tracking-wider font-medium w-full text-left"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
