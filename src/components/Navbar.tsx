'use client';
import { IUser } from '@/models/user.model';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  AiOutlineLogin,
  AiOutlineLogout,
  AiOutlineMenu,
  AiOutlinePhone,
  AiOutlineSearch,
  AiOutlineUser,
} from 'react-icons/ai';
import { MdDashboard } from 'react-icons/md';
import { AnimatePresence, motion } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { FiX } from 'react-icons/fi';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Categories', path: '/categories' },
  { label: 'Shop', path: '/shop' },
  { label: 'Orders', path: '/orders' },
];

const DASHBOARD_PATH: Record<string, string> = {
  user: '/dashboard',
  seller: '/dashboard',
  admin: '/dashboard',
};

const Navbar = ({ user }: { user: IUser | null }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const hideNavbarPaths = ['/login', '/register'];
  const isDashboard = pathname?.startsWith('/dashboard');
  const isAuthPage = hideNavbarPaths.includes(pathname);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setOpenMenu(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (isAuthPage || isDashboard) {
    return null;
  }

  const dashboardPath = user ? (DASHBOARD_PATH[user?.role] ?? '/profile') : '/profile';

  return (
    <>
      <header
        className="fixed top-0 h-16 flex items-center justify-center left-0 w-full z-50 bg-[#fff] dark:bg-[#111] border-b border-[#eee] dark:border-[#222] transition-colors duration-200"
        role="banner"
      >
        <div className="px-4 md:px-6 flex items-center justify-between w-full mx-auto">
          {/* Left Section */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setOpenSidebar(true)}
              className="md:hidden text-[#111] dark:text-[#fff] hover:bg-[#f5f5f5] dark:hover:bg-[#222] rounded-sm transition-all"
            >
              <AiOutlineMenu size={20} />
            </button>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/')}
              className="flex items-center gap-3 group"
            >
              {/* <div className="w-8 h-8 bg-[#111] dark:bg-[#fff] flex items-center justify-center rounded-full transition-all">
                <span className="text-white dark:text-[#111] text-sm font-black">G</span>
              </div> */}
              <span
                className="text-lg font-bold tracking-widest uppercase hidden md:inline text-[#111] dark:text-[#fff]"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                Gadget BDs
              </span>
            </motion.button>

            <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.path}
                  onClick={() => router.push(link.path)}
                  className="px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#555] dark:text-[#bbb] hover:text-[#111] dark:hover:text-[#fff] transition-all"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/search')}
              className="p-2 text-[#555] dark:text-[#bbb] hover:text-[#111] dark:hover:text-[#fff] transition-colors"
            >
              <AiOutlineSearch size={18} />
            </button>

            <div className="h-4 w-[1px] bg-[#eee] dark:bg-[#333] hidden md:block mx-1" />

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setOpenMenu(!openMenu)}
                  className="flex items-center gap-3 p-1 rounded-full group"
                >
                  <div className="h-8 w-8 rounded-full bg-[#eee] dark:bg-[#222] border border-[#ddd] dark:border-[#333] flex items-center justify-center overflow-hidden">
                    {user?.image ? (
                      <Image
                        src={user?.image}
                        width={32}
                        height={32}
                        alt="user"
                        className="object-cover"
                      />
                    ) : (
                      <AiOutlineUser
                        size={16}
                        className="text-[#555] group-hover:text-primary transition-colors"
                      />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {openMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-3 w-52 bg-white dark:bg-[#111] border border-[#eee] dark:border-[#222] rounded-sm shadow-xl p-1"
                    >
                      <div className="px-4 py-3 border-b border-[#eee] dark:border-[#222] mb-1">
                        <p className="text-[#111] dark:text-white text-[10px] font-bold uppercase truncate">
                          {user?.name}
                        </p>
                        <p className="text-primary text-[8px] font-bold uppercase tracking-tighter mt-0.5">
                          {user?.role}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          router.push(dashboardPath);
                          setOpenMenu(false);
                        }}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-[10px] font-bold uppercase text-[#555] dark:text-[#bbb] hover:bg-[#f5f5f5] dark:hover:bg-[#222] transition-colors text-left"
                      >
                        <MdDashboard size={14} /> Dashboard
                      </button>
                      <button
                        onClick={() => {
                          signOut();
                          setOpenMenu(false);
                        }}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-[10px] font-bold uppercase text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors text-left border-t border-[#eee] dark:border-[#222]"
                      >
                        <AiOutlineLogout size={14} /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => router.push('/login')}
                  className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#555] dark:text-[#bbb] hover:text-[#111] dark:hover:text-[#fff] transition-all hidden md:block"
                >
                  Sign In
                </button>
                <button
                  onClick={() => router.push('/register')}
                  className="px-5 py-1.5 bg-[#111] dark:bg-[#fff] text-white dark:text-[#111] text-[10px] font-bold uppercase tracking-widest rounded-sm hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all shadow-sm"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {openSidebar && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setOpenSidebar(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed top-0 left-0 h-full w-72 bg-white dark:bg-[#111] z-101 flex flex-col shadow-2xl"
            >
              <div className="h-16 flex items-center justify-between px-6 border-b border-[#eee] dark:border-[#222]">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#111] dark:text-[#fff]">
                  Menu
                </span>
                <button
                  onClick={() => setOpenSidebar(false)}
                  className="text-[#555] dark:text-[#bbb] hover:text-red-500 transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>

              <nav className="flex-1 p-4 space-y-1">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.path}
                    onClick={() => {
                      router.push(link.path);
                      setOpenSidebar(false);
                    }}
                    className="w-full text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-[#555] dark:text-[#bbb] hover:bg-[#f5f5f5] dark:hover:bg-[#222] transition-all rounded-sm"
                  >
                    {link.label}
                  </button>
                ))}
                <button className="w-full text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-[#555] dark:text-[#bbb] flex items-center gap-2">
                  <AiOutlinePhone size={14} /> Support
                </button>
              </nav>

              <div className="p-4 border-t border-[#eee] dark:border-[#222] space-y-2">
                {!user ? (
                  <>
                    <button
                      onClick={() => router.push('/login')}
                      className="w-full py-3 text-[10px] font-bold uppercase tracking-widest text-[#111] dark:text-[#fff] border border-[#ddd] dark:border-[#333] rounded-sm"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => router.push('/register')}
                      className="w-full py-3 text-[10px] font-bold uppercase tracking-widest bg-primary text-white rounded-sm"
                    >
                      Join Now
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => signOut()}
                    className="w-full py-3 text-[10px] font-bold uppercase tracking-widest text-red-500 bg-red-50 dark:bg-red-500/5 rounded-sm"
                  >
                    Sign Out
                  </button>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
