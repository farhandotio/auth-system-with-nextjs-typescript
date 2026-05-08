'use client';
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import axios from 'axios';
import { CgSpinner } from 'react-icons/cg';
import { FiUser } from 'react-icons/fi';
import { RiStore2Line } from 'react-icons/ri';
import { BiWrench } from 'react-icons/bi';
import { useRouter } from 'next/navigation';

type Role = 'user' | 'seller' | 'admin';

const ROLES: { label: string; value: Role; icon: React.ReactNode; description: string }[] = [
  {
    label: 'User',
    value: 'user',
    icon: <FiUser size={20} />,
    description: 'Browse & shop products',
  },
  {
    label: 'Seller',
    value: 'seller',
    icon: <RiStore2Line size={20} />,
    description: 'List & sell products',
  },
  {
    label: 'Admin',
    value: 'admin',
    icon: <BiWrench size={20} />,
    description: 'Manage the platform',
  },
];

const EditRoleAndPhone = () => {
  const [role, setRole] = useState<Role | ''>('');
  const [phone, setPhone] = useState('');
  const [adminExist, setAdminExist] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await axios.get('/api/admin/check-admin');
        setAdminExist(res.data.exists);
      } catch {
        setAdminExist(false);
      }
    };
    checkAdmin();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!role) {
      setError('Please select a role to continue.');
      return;
    }
    if (!phone || phone.length < 10) {
      setError('Please enter a valid phone number.');
      return;
    }

    setLoading(true);
    try {
      await axios.post('/api/user/edit-role-phone', { role, phone });
      setLoading(false);
      router.refresh();
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <section
      className="h-screen flex items-center justify-center bg-[#f8f7ff] dark:bg-[#0a0a0a] transition-colors duration-200"
      aria-label="Role and phone setup"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
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
          <div className="bg-white dark:bg-[#111] shadow-xl dark:md:shadow-none max-md:h-screen flex flex-col justify-center shadow-[#6c63ff18] border border-[#e5e3f5] dark:border-[#222] p-8 md:p-10 transition-colors">
            {/* Header */}
            <div className="mb-8 text-center">
              <h1
                className="text-3xl font-bold text-[#0f0f0f] dark:text-white"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                Set Up Your Profile
              </h1>
              <p className="text-[#6b7280] dark:text-[#888] mt-1 text-sm">
                Choose your role and add a phone number to continue.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              {/* Phone Input */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="phone"
                  className="text-xs font-medium text-[#6b7280] dark:text-[#aaa] uppercase tracking-wider pl-1"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  value={phone}
                  placeholder="01XXXXXXXXX"
                  maxLength={11}
                  required
                  className="bg-[#f8f7ff] dark:bg-[#181818] border border-[#e5e3f5] dark:border-[#333] text-[#0f0f0f] dark:text-white placeholder:text-[#b0adc9] dark:placeholder:text-[#555] p-3.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all w-full text-sm"
                />
              </div>

              {/* Role Selection */}
              <fieldset>
                <legend className="text-xs font-medium text-[#6b7280] dark:text-[#aaa] uppercase tracking-wider pl-1 mb-3">
                  Select Role
                </legend>
                <div className="grid grid-cols-3 gap-3" role="radiogroup">
                  {ROLES.map((rol) => {
                    const isAdminBlocked = rol.value === 'admin' && adminExist;
                    const isSelected = role === rol.value;

                    return (
                      <motion.button
                        key={rol.value}
                        type="button"
                        whileTap={!isAdminBlocked ? { scale: 0.97 } : undefined}
                        onClick={() => {
                          if (isAdminBlocked) return;
                          setRole(rol.value);
                          setError('');
                        }}
                        disabled={isAdminBlocked}
                        className={`p-4 rounded-lg transition-all flex flex-col items-center justify-center gap-2 border-2 text-center focus:outline-none 
                          ${
                            isSelected
                              ? 'border-primary bg-primary/5 text-primary'
                              : 'border-[#e5e3f5] dark:border-[#222] bg-[#f8f7ff] dark:bg-[#181818] text-[#6b7280] dark:text-[#555] hover:border-primary/50 dark:hover:border-primary/50 hover:text-primary dark:hover:text-primary'
                          }
                          ${isAdminBlocked ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        <span aria-hidden="true">{rol.icon}</span>
                        <div>
                          <p
                            className="text-[10px] font-bold uppercase tracking-tight"
                            style={{ fontFamily: 'Syne, sans-serif' }}
                          >
                            {rol.label}
                          </p>
                        </div>
                        {isSelected && (
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </fieldset>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="text-red-500 text-xs bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-lg px-4 py-2.5"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={loading}
                whileTap={{ scale: 0.98 }}
                className="mt-1 px-6 py-3.5 bg-[#111] dark:bg-white text-white dark:text-[#111] rounded-lg hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all cursor-pointer w-full flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-[10px] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <CgSpinner className="text-xl animate-spin" />
                    <span>Submitting…</span>
                  </>
                ) : (
                  'Continue'
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default EditRoleAndPhone;
