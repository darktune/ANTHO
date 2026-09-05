'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  FolderOpen, 
  ShoppingCart, 
  FileText, 
  Image as ImageIcon,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Collections', href: '/admin/collections', icon: FolderOpen },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Content', href: '/admin/content', icon: FileText },
  { name: 'Lookbook', href: '/admin/lookbook', icon: ImageIcon },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-stone-950 border-b border-stone-800 sticky top-0 z-50">
        <span className="font-serif text-xl tracking-widest">ANTHO <span className="text-gold text-xs font-sans tracking-normal uppercase ml-1">Admin</span></span>
        <button onClick={() => setIsOpen(!isOpen)} className="text-stone-300">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
          <span className="font-serif text-2xl tracking-widest">ANTHO <span className="text-gold text-xs font-sans tracking-normal uppercase ml-1">Admin</span></span>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-3 rounded-md transition-colors ${
                  isActive 
                    ? 'bg-stone-900 text-white' 
                    : 'text-stone-400 hover:text-white hover:bg-stone-900/50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-gold' : ''}`} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-stone-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2 text-stone-400 hover:text-white transition-colors text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View Storefront</span>
          </Link>
          <button
            onClick={() => {
              sessionStorage.removeItem('antho_admin_auth');
              window.location.href = '/login';
            }}
            className="flex items-center gap-3 px-3 py-2 text-stone-400 hover:text-white transition-colors text-sm w-full text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
