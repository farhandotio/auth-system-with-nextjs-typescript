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
} from 'react-icons/fi';
import { MdOutlineNavigation, MdOutlineInfo } from 'react-icons/md';
import { TbLayoutBottombar } from 'react-icons/tb';
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
  const [customizerOpen, setCustomizerOpen] = useState(pathname?.includes('/theme/'));
  const dropdownRef = useRef<HTMLDivElement>(null);

  const role = user?.role;
  if (!role) redirect('/');

  const menuConfig = {
    user: [
      { name: 'Overview', path: '/dashboard', icon: FiGrid },
      { name: 'My Profile', path: '/dashboard/user/profile', icon: FiUser },
      { name: 'My Orders', path: '/dashboard/user/orders', icon: FiShoppingBag },
    ],
    seller: [
      { name: 'Overview', path: '/dashboard', icon: FiGrid },
      { name: 'Shop Settings', path: '/dashboard/seller/shop', icon: FiSettings },
      { name: 'Products', path: '/dashboard/seller/products', icon: FiShoppingBag },
      { name: 'Analytics', path: '/dashboard/seller/analytics', icon: FiPieChart },
    ],
    admin: [
      { name: 'Overview', path: '/dashboard', icon: FiGrid },
      { name: 'User Management', path: '/dashboard/admin/users', icon: FiUsers },
      { name: 'Product Management', path: '/dashboard/admin/products', icon: FiShoppingBag },
    ],
  };

  const adminCustomizer = [
    { name: 'Navbar Edit', path: '/dashboard/admin/theme/navbar', icon: MdOutlineNavigation },
    { name: 'Footer Edit', path: '/dashboard/admin/theme/footer', icon: TbLayoutBottombar },
    { name: 'About Page Edit', path: '/dashboard/admin/theme/about', icon: MdOutlineInfo },
  ];

  const currentMenu = menuConfig[role as keyof typeof menuConfig] || [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setIsDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#fff] dark:bg-[#111] text-[#111] dark:text-[#fff] border-r border-[#eee] dark:border-[#222]">
      <div className="h-16 flex items-center px-6 border-b border-[#eee] dark:border-[#222]">
        <Link href="/" className="flex items-center gap-3 group">
          {/* <div className="w-8 h-8 bg-[#111] dark:bg-[#fff] flex items-center justify-center rounded-sm transition-all group-hover:bg-primary">
            <span className="text-white dark:text-[#111] text-xs font-black">G</span>
          </div> */}
          <span
            className="text-sm font-bold tracking-widest uppercase text-[#111] dark:text-[#fff]"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Gadget BDs
          </span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 scrollbar-hide">
        {currentMenu.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-sm text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-150 ${
                isActive
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-[#555] dark:text-[#bbb] hover:text-[#111] dark:hover:text-[#fff] hover:bg-[#f5f5f5] dark:hover:bg-[#222]'
              }`}
            >
              <item.icon size={16} />
              {item.name}
            </Link>
          );
        })}

        {role === 'admin' && (
          <div className="pt-2">
            <button
              onClick={() => setCustomizerOpen(!customizerOpen)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-sm text-[10px] font-bold uppercase tracking-[0.15em] transition-all ${
                pathname?.includes('/theme/') ? 'text-primary' : 'text-[#555] dark:text-[#bbb]'
              } hover:bg-[#f5f5f5] dark:hover:bg-[#222]`}
            >
              <FiSettings size={16} />
              <span className="flex-1 text-left">Customizer</span>
              <motion.div
                animate={{ rotate: customizerOpen ? 0 : 90 }}
                transition={{ duration: 0.2 }}
              >
                <FiChevronDown size={14} />
              </motion.div>
            </button>

            <AnimatePresence>
              {customizerOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="overflow-hidden bg-[#fafafa] dark:bg-[#181818] mt-1 border-l border-[#eee] dark:border-[#333] ml-6"
                >
                  {adminCustomizer.map((sub) => (
                    <Link
                      key={sub.path}
                      href={sub.path}
                      className={`flex items-center gap-3 px-6 py-2.5 text-[9px] font-bold uppercase tracking-widest transition-all ${
                        pathname === sub.path
                          ? 'text-primary'
                          : 'text-[#777] dark:text-[#888] hover:text-[#111] dark:hover:text-[#fff]'
                      }`}
                    >
                      <sub.icon size={14} />
                      {sub.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-[#eee] dark:border-[#222]">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-sm border border-[#ddd] dark:border-[#333] text-[9px] font-bold uppercase tracking-[0.2em] text-[#555] dark:text-[#bbb] hover:bg-[#111] dark:hover:bg-[#fff] hover:text-[#fff] dark:hover:text-[#111] transition-all"
        >
          <FiArrowLeft size={14} /> Marketplace
        </Link>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex bg-[#fff] dark:bg-[#000] overflow-hidden transition-colors duration-200">
      <aside className="w-64 hidden lg:block z-50 shadow-[1px_0_0_0_rgba(0,0,0,0.05)] dark:shadow-[1px_0_0_0_rgba(255,255,255,0.05)]">
        <SidebarContent />
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white dark:bg-[#111] border-b border-[#eee] dark:border-[#222] flex items-center justify-between px-4 md:px-6 z-40 transition-colors duration-200">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden text-[#555] dark:text-[#bbb] hover:bg-[#f5f5f5] dark:hover:bg-[#222] rounded-sm transition-all"
          >
            <FiMenu size={22} />
          </button>

          <div className="ml-auto" ref={dropdownRef}>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-4 p-1 rounded-sm group transition-all"
              >
                <div className="hidden md:block text-right leading-none">
                  <p className="text-[10px] font-bold text-[#111] dark:text-[#fff] uppercase tracking-widest">
                    {user?.name}
                  </p>
                  <p className="text-[8px] font-bold text-primary uppercase mt-1 tracking-tighter opacity-80">
                    {role}
                  </p>
                </div>
                <div className="h-8 w-8 rounded-full bg-[#eee] dark:bg-[#222] border border-[#ddd] dark:border-[#333] flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
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
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.15 }}
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

        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#fafafa] dark:bg-[#0a0a0a] dark:text-[#fafafa] text-[#0a0a0a] transition-colors duration-300">
          <div className="mx-auto">{children}</div>
        </main>
      </div>

      <AnimatePresence>
        {isSidebarOpen && (
          <div className="fixed inset-0 z-100 lg:hidden">
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
              transition={{ type: 'tween', duration: 0.25 }}
              className="absolute left-0 top-0 h-full w-72 shadow-2xl"
            >
              <SidebarContent />
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="absolute top-5 -right-12 text-white hover:text-red-400 transition-colors"
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
