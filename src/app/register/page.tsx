'use client';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { TbPlayerTrackNext, TbPlayerTrackPrev } from 'react-icons/tb';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { CgSpinner } from 'react-icons/cg';
import { signIn } from 'next-auth/react';

type Role = 'user' | 'seller' | 'admin';

const ROLES: { label: string; icon: string; role: Role; description: string }[] = [
  { label: 'User', icon: '👤', role: 'user', description: 'Browse & shop products' },
  { label: 'Seller', icon: '🏪', role: 'seller', description: 'List & sell products' },
  { label: 'Admin', icon: '🛠️', role: 'admin', description: 'Manage the platform' },
];

const RegisterPage = () => {
  const [selectedRole, setSelectedRole] = useState<Role>('user');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post('/api/auth/register', { name, email, password });
      setLoading(false);
      setName('');
      setEmail('');
      setPassword('');
      router.push('/login');
    } catch (err: any) {
      setLoading(false);
      setError(err?.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <section className="h-screen flex items-center justify-center bg-[#f8f7ff] dark:bg-[#0a0a0a] transition-colors duration-200">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% -10%, #6c63ff22 0%, transparent 70%)',
        }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white dark:bg-[#111] md:shadow-xl dark:md:shadow-none shadow-[#6c63ff18] border border-[#e5e3f5] dark:border-[#222] p-8 md:p-10 max-md:h-screen flex flex-col justify-center transition-colors">
          <div className="mb-8 text-center">
            <h1
              className="text-3xl font-bold text-[#0f0f0f] dark:text-white"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Create Account
            </h1>
            <p className="text-[#6b7280] dark:text-[#888] mt-1 text-sm">
              Registering as{' '}
              <span className="text-primary font-medium capitalize">{selectedRole}</span>
            </p>
          </div>

          <form onSubmit={handleSignUp} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-[#6b7280] dark:text-[#aaa] uppercase tracking-wider pl-1">
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-[#f8f7ff] dark:bg-[#181818] border border-[#e5e3f5] dark:border-[#333] text-[#0f0f0f] dark:text-white placeholder:text-[#b0adc9] dark:placeholder:text-[#555] p-3.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all w-full text-sm"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-[#6b7280] dark:text-[#aaa] uppercase tracking-wider pl-1">
                Email
              </label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#f8f7ff] dark:bg-[#181818] border border-[#e5e3f5] dark:border-[#333] text-[#0f0f0f] dark:text-white placeholder:text-[#b0adc9] dark:placeholder:text-[#555] p-3.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all w-full text-sm"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-[#6b7280] dark:text-[#aaa] uppercase tracking-wider pl-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min 8 characters"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-[#f8f7ff] dark:bg-[#181818] border border-[#e5e3f5] dark:border-[#333] text-[#0f0f0f] dark:text-white placeholder:text-[#b0adc9] dark:placeholder:text-[#555] p-3.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all w-full pr-11 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#b0adc9] dark:text-[#555] hover:text-primary transition-colors"
                >
                  {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-xs bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-lg px-4 py-2.5"
              >
                {error}
              </motion.p>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.98 }}
              className="mt-2 px-6 py-3.5 bg-[#111] dark:bg-white text-white dark:text-[#111] rounded-lg hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all cursor-pointer w-full flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-[10px] disabled:opacity-70"
            >
              {loading ? <CgSpinner className="text-xl animate-spin" /> : 'Create Account'}
            </motion.button>

            <div className="flex items-center gap-3 my-1">
              <div className="flex-1 h-px bg-[#e5e3f5] dark:bg-[#222]" />
              <span className="text-xs text-[#b0adc9] dark:text-[#555]">or</span>
              <div className="flex-1 h-px bg-[#e5e3f5] dark:bg-[#222]" />
            </div>

            <motion.button
              type="button"
              onClick={() => signIn('google', { callbackUrl: '/' })}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3.5 bg-white dark:bg-[#111] text-[#0f0f0f] dark:text-white rounded-lg hover:bg-[#f8f7ff] dark:hover:bg-[#222] transition-colors cursor-pointer w-full flex items-center justify-center gap-3 border border-[#e5e3f5] dark:border-[#333] text-[10px] font-bold uppercase tracking-widest"
            >
              <FcGoogle size={20} />
              Continue with Google
            </motion.button>

            <div className="flex items-center justify-center pt-2">
              <p className="text-[#6b7280] dark:text-[#888] text-sm">
                Have an account?{' '}
                <span
                  onClick={() => router.push('/login')}
                  className="text-primary cursor-pointer font-medium hover:underline"
                >
                  Sign in
                </span>
              </p>
            </div>
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default RegisterPage;
