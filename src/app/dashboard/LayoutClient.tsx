'use client';
import Link from 'next/link';
import { redirect, usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import {
  FiUsers,
  FiGrid,
  FiArrowLeft,
  FiMenu,
  FiLogOut,
  FiUser,
  FiX,
  FiSettings,
  FiChevronDown,
  FiShoppingBag,
  FiPieChart,
  FiPlusSquare,
  FiPackage,
} from 'react-icons/fi';
import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import { signOut } from 'next-auth/react';
import { AiOutlineUser } from 'react-icons/ai';

interface User {
  name?: string;
  email?: string;
  role?: string;
  image?: string;
}

export default function LayoutClient({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState<Record<string, boolean>>({});
  const dropdownRef = useRef<HTMLDivElement>(null);

  const role = user?.role || 'user';

  // Navigation Logic with Sub-routes
  const menuConfig = {
    user: [
      { name: 'Overview', path: '/dashboard', icon: FiGrid },
      { name: 'My Profile', path: '/dashboard/user/profile', icon: FiUser },
      {
        name: 'My Orders',
        path: '/dashboard/user/orders',
        icon: FiShoppingBag,
        subItems: [{ name: 'Track Order', path: '/dashboard/user/orders/track', icon: FiPackage }],
      },
    ],
    seller: [
      { name: 'Overview', path: '/dashboard', icon: FiGrid },
      {
        name: 'Products',
        path: '/dashboard/seller/products',
        icon: FiShoppingBag,
        subItems: [
          { name: 'Add Product', path: '/dashboard/seller/products/create', icon: FiPlusSquare },
          {
            name: 'Manage Inventory',
            path: '/dashboard/seller/products/inventory',
            icon: FiPackage,
          },
        ],
      },
      { name: 'Analytics', path: '/dashboard/seller/analytics', icon: FiPieChart },
      { name: 'Shop Settings', path: '/dashboard/seller/shop', icon: FiSettings },
    ],
    admin: [
      { name: 'Overview', path: '/dashboard', icon: FiGrid },
      {
        name: 'Management',
        path: '/dashboard/admin/manage',
        icon: FiUsers,
        subItems: [
          { name: 'All Users', path: '/dashboard/admin/users', icon: FiUsers },
          { name: 'All Products', path: '/dashboard/admin/products', icon: FiShoppingBag },
          { name: 'Theme Settings', path: '/dashboard/admin/theme', icon: FiSettings },
        ],
      },
    ],
  };

  const currentMenu = menuConfig[role as keyof typeof menuConfig] || menuConfig.user;

  // Handle click outside for dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setIsDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!pathname) return;

    const isAdminRoute = pathname.startsWith('/dashboard/admin');
    const isSellerRoute = pathname.startsWith('/dashboard/seller');
    const isUserRoute = pathname.startsWith('/dashboard/user');

    // Protection Logic
    if (role === 'user' && (isAdminRoute || isSellerRoute)) {
      redirect('/dashboard');
    }

    if (role === 'seller' && (isAdminRoute || isUserRoute)) {
      // Seller kintu tar profile (/dashboard/user/profile) access korte parbe, tai oita check kora jete pare
      if (!pathname.includes('/profile')) {
        redirect('/dashboard');
      }
    }

    if (role === 'admin') {
      // Admin usually sob access korte pare, tai redirect dorkar nai
    }
  }, [pathname, role]);

  const toggleSubMenu = (name: string) => {
    setOpenSubMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white dark:bg-[#111] border-r border-[#eee] dark:border-[#222]">
      <div className="h-16 flex items-center px-6 border-b border-[#eee] dark:border-[#222]">
        <Link href="/" className="flex items-center gap-3">
          <span
            className="text-sm font-bold tracking-widest uppercase text-[#111] dark:text-white"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Gadget BDs
          </span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 scrollbar-hide">
        {currentMenu.map((item) => {
          const hasSubItems = item.subItems && item.subItems.length > 0;
          const isActive = pathname === item.path;
          const isSubActive = item.subItems?.some((sub) => pathname === sub.path);
          const isOpen = openSubMenus[item.name] || isSubActive;

          return (
            <div key={item.name} className="flex flex-col">
              <div className="flex items-center">
                <Link
                  href={item.path}
                  className={`flex-1 flex items-center gap-3 px-4 py-2.5 rounded-sm text-[10px] font-bold uppercase tracking-[0.15em] transition-all ${
                    isActive
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-[#555] dark:text-[#bbb] hover:bg-[#f5f5f5] dark:hover:bg-[#222]'
                  }`}
                >
                  <item.icon size={16} />
                  {item.name}
                </Link>
                {hasSubItems && (
                  <button
                    onClick={() => toggleSubMenu(item.name)}
                    className="p-2.5 text-[#555] dark:text-[#bbb] hover:text-primary transition-colors"
                  >
                    <motion.div animate={{ rotate: isOpen ? 0 : -90 }}>
                      <FiChevronDown size={14} />
                    </motion.div>
                  </button>
                )}
              </div>

              {hasSubItems && (
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden ml-6 mt-1 border-l border-[#eee] dark:border-[#222]"
                    >
                      {item.subItems?.map((sub) => (
                        <Link
                          key={sub.path}
                          href={sub.path}
                          className={`flex items-center gap-3 px-6 py-2.5 text-[9px] font-bold uppercase tracking-widest transition-all ${
                            pathname === sub.path
                              ? 'text-primary'
                              : 'text-[#777] dark:text-[#888] hover:text-[#111] dark:hover:text-white'
                          }`}
                        >
                          <sub.icon size={14} />
                          {sub.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-4 border-t border-[#eee] dark:border-[#222]">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-sm border border-[#ddd] dark:border-[#333] text-[9px] font-bold uppercase tracking-[0.2em] text-[#555] dark:text-[#bbb] hover:bg-[#111] dark:hover:bg-white hover:text-white dark:hover:text-[#111] transition-all"
        >
          <FiArrowLeft size={14} /> Marketplace
        </Link>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex bg-white dark:bg-black overflow-hidden transition-colors duration-200">
      <aside className="w-64 hidden lg:block z-50">
        <SidebarContent />
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white dark:bg-[#111] border-b border-[#eee] dark:border-[#222] flex items-center justify-between px-4 md:px-6 z-40 transition-colors">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden text-[#555] dark:text-[#bbb]"
          >
            <FiMenu size={22} />
          </button>

          <div className="ml-auto" ref={dropdownRef}>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-4 p-1 group"
              >
                <div className="hidden md:block text-right">
                  <p className="text-[10px] font-bold text-[#111] dark:text-white uppercase tracking-widest">
                    {user?.name}
                  </p>
                  <p className="text-[8px] font-bold text-primary uppercase mt-1 tracking-tighter">
                    {role}
                  </p>
                </div>
                <div className="h-8 w-8 rounded-full bg-[#eee] dark:bg-[#222] border border-[#ddd] dark:border-[#333] flex items-center justify-center overflow-hidden">
                  {user?.image ? (
                    <Image
                      src={user.image}
                      alt="user"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  ) : (
                    <AiOutlineUser size={16} className="text-[#555]" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-3 w-52 bg-white dark:bg-[#111] border border-[#eee] dark:border-[#222] rounded-sm shadow-xl p-1 z-50"
                  >
                    <div className="px-4 py-3 border-b border-[#eee] dark:border-[#222] mb-1">
                      <p className="text-[9px] font-bold text-[#999] uppercase tracking-[0.1em] truncate">
                        {user?.email}
                      </p>
                    </div>
                    <Link
                      href="/dashboard/user/profile"
                      className="flex items-center gap-3 px-4 py-2.5 rounded-sm text-[10px] font-bold uppercase text-[#555] dark:text-[#bbb] hover:bg-[#f5f5f5] dark:hover:bg-[#222] transition-all"
                    >
                      <FiUser size={14} /> Profile
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="w-full flex items-center gap-3 px-4 py-2.5 rounded-sm text-[10px] font-bold uppercase text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all border-t border-[#eee] dark:border-[#222] mt-1"
                    >
                      <FiLogOut size={14} /> Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#fafafa] dark:bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="absolute left-0 top-0 h-full w-72"
            >
              <SidebarContent />
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="absolute top-5 -right-12 text-white"
              >
                <FiX size={26} />
              </button>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
