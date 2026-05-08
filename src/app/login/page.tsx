'use client';
import { AnimatePresence, motion } from 'motion/react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
      setLoading(false);
      if (result?.error) {
        setError('Invalid email or password. Please try again.');
        return;
      }
      setEmail('');
      setPassword('');
      router.push('/');
    } catch {
      setLoading(false);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <section className="h-screen flex items-center justify-center bg-[#f8f7ff] md:p-4">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% -10%, #6c63ff22 0%, transparent 70%)',
        }}
      />
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-full md:max-w-md relative z-10"
        >
          <div className="bg-white max-md:h-screen md:shadow-xl shadow-[#6c63ff18] border border-[#e5e3f5] p-8 md:p-10 flex flex-col justify-center">
            <div className="mb-8 text-center">
              <h1
                className="text-3xl font-bold text-[#0f0f0f]"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                Welcome back
              </h1>
              <p className="text-[#6b7280] mt-1 text-sm">Sign in to your account</p>
            </div>

            <form onSubmit={handleSignIn} className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-[#6b7280] uppercase tracking-wider pl-1">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-[#f8f7ff] border border-[#e5e3f5] text-[#0f0f0f] placeholder:text-[#b0adc9] p-3.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-text focus:border-transparent transition-all w-full text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-[#6b7280] uppercase tracking-wider pl-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Your password"
                      value={password}
                      required
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-[#f8f7ff] border border-[#e5e3f5] text-[#0f0f0f] placeholder:text-[#b0adc9] p-3.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-text focus:border-transparent transition-all w-full pr-11 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#b0adc9] hover:text-text transition-colors"
                    >
                      {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                    </button>
                  </div>
                </div>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-xs bg-red-50 border border-red-100 rounded-lg px-4 py-2.5"
                >
                  {error}
                </motion.p>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                whileTap={{ scale: 0.98 }}
                className="mt-2 px-6 py-3.5 bg-text text-white rounded-lg hover:bg-text/95 transition-colors cursor-pointer w-full flex items-center justify-center gap-2 font-medium text-sm disabled:opacity-70"
              >
                {loading ? <CgSpinner className="text-xl animate-spin" /> : 'Sign In'}
              </motion.button>

              <div className="flex items-center gap-3 my-1">
                <div className="flex-1 h-px bg-[#e5e3f5]" />
                <span className="text-xs text-[#b0adc9]">or</span>
                <div className="flex-1 h-px bg-[#e5e3f5]" />
              </div>

              <motion.button
                type="button"
                onClick={() => signIn('google', { callbackUrl: '/' })}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3.5 bg-white text-[#0f0f0f] rounded-lg hover:bg-[#f8f7ff] transition-colors cursor-pointer w-full flex items-center justify-center gap-3 border border-[#e5e3f5] text-sm font-medium"
              >
                <FcGoogle size={20} />
                Continue with Google
              </motion.button>

              <p className="text-center text-[#6b7280] text-sm pt-2">
                Don&apos;t have an account?{' '}
                <span
                  onClick={() => router.push('/register')}
                  className="text-text cursor-pointer font-medium hover:underline"
                >
                  Sign up
                </span>
              </p>
            </form>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default LoginPage;
