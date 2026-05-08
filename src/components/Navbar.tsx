'use client';
import { IUser } from '@/models/user.model';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import logo from '@/assets/logo.png';
import {
  AiOutlineLogin,
  AiOutlineLogout,
  AiOutlineMenu,
  AiOutlinePhone,
  AiOutlineSearch,
  AiOutlineSignature,
  AiOutlineUser,
} from 'react-icons/ai';
import { MdDashboard } from 'react-icons/md';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { signOut } from 'next-auth/react';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Categories', path: '/categories' },
  { label: 'Shop', path: '/shop' },
  { label: 'Orders', path: '/orders' },
];

const DASHBOARD_PATH: Record<string, string> = {
  user: '/profile',
  seller: '/seller/dashboard',
  admin: '/admin/dashboard',
};

const Navbar = ({ user }: { user: IUser | null }) => {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  const dashboardPath = user ? (DASHBOARD_PATH[user.role] ?? '/profile') : '/profile';

  return (
    <>
      <header
        className="fixed top-0 h-18 flex items-center justify-center left-0 w-full z-50 bg-text text-white"
        role="banner"
      >
        <div className="px-4 py-3 flex items-center justify-between w-full">
          {/* Left */}
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setOpenSidebar(true)}
              aria-label="Open navigation menu"
              aria-expanded={openSidebar}
              className="md:hidden p-2 rounded-sm hover:bg-white/10 transition-colors"
            >
              <AiOutlineMenu size={20} aria-hidden="true" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push('/')}
              aria-label="Gadget BDs — go to homepage"
              className="flex items-center gap-2"
            >
              {/* <Image
                src={logo}
                width={32}
                height={32}
                loading="eager"
                alt="Gadget BDs logo"
                className="w-8 h-8 object-contain"
              /> */}
              <span className="w-8 h-8 bg-primary flex items-center justify-center rounded-full text-white">
                G
              </span>
              <span
                className="text-base font-bold hidden md:inline"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                Gadget BDs
              </span>
            </motion.button>

            <nav className="hidden md:flex items-center gap-1 ml-6" aria-label="Main navigation">
              {NAV_LINKS.map((link) => (
                <motion.button
                  key={link.path}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => router.push(link.path)}
                  className="px-4 py-2 rounded-sm text-sm text-white/60 hover:text-white hover:bg-white/10 transition-all"
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>
          </div>

          {/* Right */}
          <div className="flex items-center justify-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => router.push('/categories')}
              aria-label="Search"
              className="hidden md:flex p-2 rounded-sm hover:bg-white/10 transition-colors text-white/60 hover:text-white"
            >
              <AiOutlineSearch size={20} aria-hidden="true" />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => router.push('/support')}
              aria-label="Support"
              className="hidden md:flex p-2 rounded-sm hover:bg-white/10 transition-colors text-white/60 hover:text-white"
            >
              <AiOutlinePhone size={20} aria-hidden="true" />
            </motion.button>

            {/* Authenticated */}
            {user ? (
              <div className="relative">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setOpenMenu(!openMenu)}
                  aria-label="Open profile menu"
                  aria-expanded={openMenu}
                  aria-haspopup="menu"
                  className="rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary flex items-center justify-center"
                >
                  {user.image ? (
                    <Image
                      src={user.image}
                      width={32}
                      height={32}
                      loading="eager"
                      alt={`${user.name ?? 'User'} profile picture`}
                      className="w-8 h-8 object-cover rounded-full ring-2 ring-white/10"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white/60 hover:text-white">
                      <AiOutlineUser size={16} aria-hidden="true" />
                    </div>
                  )}
                </motion.button>

                <AnimatePresence>
                  {openMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      role="menu"
                      aria-label="Profile menu"
                      className="absolute right-0 mt-2 w-52 bg-text rounded-sm shadow-2xl border border-white/10 overflow-hidden"
                    >
                      {user.name && (
                        <div className="px-4 py-3 border-b border-white/10">
                          <p className="text-white text-xs font-semibold truncate">{user.name}</p>
                          <p className="text-white/40 text-[10px] capitalize mt-0.5">{user.role}</p>
                        </div>
                      )}
                      <button
                        role="menuitem"
                        onClick={() => {
                          router.push(dashboardPath);
                          setOpenMenu(false);
                        }}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/10 transition-colors text-left"
                      >
                        <MdDashboard size={15} aria-hidden="true" />
                        {user.role === 'admin'
                          ? 'Admin Dashboard'
                          : user.role === 'seller'
                            ? 'Seller Dashboard'
                            : 'My Profile'}
                      </button>
                      <div className="border-t border-white/10">
                        <button
                          role="menuitem"
                          onClick={() => {
                            signOut();
                            setOpenMenu(false);
                          }}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors text-left"
                        >
                          <AiOutlineLogout size={15} aria-hidden="true" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              /* Guest */
              <div className="flex items-center gap-2">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => router.push('/login')}
                  className="px-4 py-1.5 rounded-sm text-sm text-white/60 hover:text-white hover:bg-white/10 transition-all hidden md:block"
                >
                  Sign In
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => router.push('/register')}
                  className="px-4 py-1.5 rounded-sm text-sm bg-primary text-white hover:opacity-90 transition-all"
                >
                  Sign Up
                </motion.button>
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
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setOpenSidebar(false)}
              aria-hidden="true"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 40, stiffness: 300 }}
              className="fixed top-0 left-0 h-full w-64 bg-text z-50 flex flex-col"
              role="dialog"
              aria-label="Navigation menu"
              aria-modal="true"
            >
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  {/* <Image
                    src={logo}
                    width={28}
                    height={28}
                    alt="Gadget BDs logo"
                    className="w-7 h-7 object-contain"
                  /> */}
                  <span className="w-8 h-8 bg-primary flex items-center justify-center rounded-full text-white">
                    G
                  </span>
                  <span
                    className="text-base font-bold text-white"
                    style={{ fontFamily: 'Syne, sans-serif' }}
                  >
                    Gadget BDs
                  </span>
                </div>
                <button
                  onClick={() => setOpenSidebar(false)}
                  aria-label="Close navigation menu"
                  className="text-white/60 hover:text-white flex items-center justify-center text-xl transition-colors"
                >
                  ✕
                </button>
              </div>

              <nav className="flex-1 p-3 flex flex-col gap-0.5" aria-label="Mobile navigation">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.path}
                    onClick={() => {
                      router.push(link.path);
                      setOpenSidebar(false);
                    }}
                    className="flex items-center px-4 py-2.5 rounded-sm text-white/60 hover:text-white hover:bg-white/10 transition-all text-sm text-left"
                  >
                    {link.label}
                  </button>
                ))}
                <button
                  onClick={() => {
                    router.push('/support');
                    setOpenSidebar(false);
                  }}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-sm text-white/60 hover:text-white hover:bg-white/10 transition-all text-sm text-left"
                >
                  <AiOutlinePhone size={15} aria-hidden="true" />
                  Support
                </button>
              </nav>

              <div className="p-3 border-t border-white/10 flex flex-col gap-1">
                {user ? (
                  <button
                    onClick={() => signOut()}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-sm text-red-400 hover:bg-red-500/10 transition-all text-sm w-full text-left"
                  >
                    <AiOutlineLogout size={15} aria-hidden="true" />
                    Sign Out
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        router.push('/login');
                        setOpenSidebar(false);
                      }}
                      className="flex items-center px-4 py-2.5 rounded-md text-white/80 hover:text-white border-2 border-white/50 mb-2 hover:bg-white/10 font-medium transition-all text-sm text-left justify-between"
                    >
                      <span> Sign In </span> <AiOutlineLogin />
                    </button>
                    <button
                      onClick={() => {
                        router.push('/register');
                        setOpenSidebar(false);
                      }}
                      className="flex items-center justify-between px-4 py-2.5 rounded-md bg-primary text-white hover:opacity-90 transition-all text-sm text-left font-medium"
                    >
                      <span> Sign Up </span> <AiOutlineSignature />
                    </button>
                  </>
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
