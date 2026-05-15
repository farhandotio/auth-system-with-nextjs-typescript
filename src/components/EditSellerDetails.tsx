'use client';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import axios from 'axios';
import { CgSpinner } from 'react-icons/cg';
import { FiShoppingBag, FiMapPin, FiTag } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const EditSellerDetails = () => {
  const [formData, setFormData] = useState({
    shopName: '',
    shopAddress: '',
    shopType: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic Validation
    if (!formData.shopName || !formData.shopAddress || !formData.shopType) {
      setError('Please fill in all fields to register your shop.');
      return;
    }

    setLoading(true);
    try {
      await axios.post('/api/seller/update-seller-info', formData);
      setLoading(false);
      router.refresh();
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  const inputClasses =
    'bg-[#f8f7ff] dark:bg-[#181818] border border-[#e5e3f5] dark:border-[#333] text-[#0f0f0f] dark:text-white placeholder:text-[#b0adc9] dark:placeholder:text-[#555] p-3.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all w-full text-sm';
  const labelClasses =
    'text-[10px] font-bold text-[#6b7280] dark:text-[#aaa] uppercase tracking-widest pl-1 flex items-center gap-2';

  return (
    <section
      className="h-screen flex items-center justify-center bg-[#f8f7ff] dark:bg-[#0a0a0a] transition-colors duration-200"
      aria-label="Shop information setup"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% -10%, #6c63ff15 0%, transparent 70%)',
        }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-full md:max-w-lg relative z-10"
        >
          <div className="bg-white dark:bg-[#111] shadow-2xl dark:md:shadow-none max-md:h-screen flex flex-col justify-center md:border border-[#e5e3f5] dark:border-[#222] p-8 md:p-12 transition-colors">
            {/* Header */}
            <div className="mb-10 text-center">
              <h1
                className="text-3xl font-bold text-[#0f0f0f] dark:text-white uppercase tracking-tight"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                Shop Details
              </h1>
              <p className="text-[#6b7280] dark:text-[#888] mt-2 text-sm leading-relaxed">
                Complete your seller profile.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
              {/* Shop Name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="shopName" className={labelClasses}>
                  <FiShoppingBag size={14} /> Shop Name
                </label>
                <input
                  id="shopName"
                  type="text"
                  placeholder="Enter your shop name"
                  value={formData.shopName}
                  onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                  className={inputClasses}
                />
              </div>

              {/* Shop Type */}
              <div className="flex flex-col gap-2">
                <label htmlFor="shopType" className={labelClasses}>
                  <FiTag size={14} /> Business Category
                </label>
                <select
                  id="shopType"
                  value={formData.shopType}
                  onChange={(e) => setFormData({ ...formData, shopType: e.target.value })}
                  className={`${inputClasses} appearance-none cursor-pointer`}
                >
                  <option value="" disabled>
                    Select shop category
                  </option>
                  <option value="Electronics">Electronics</option>
                  <option value="Smartphones">Smartphones & Tablets</option>
                  <option value="Computers">Computers & Laptops</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Gaming">Gaming Gear</option>
                </select>
              </div>

              {/* Shop Address */}
              <div className="flex flex-col gap-2">
                <label htmlFor="shopAddress" className={labelClasses}>
                  <FiMapPin size={14} /> Shop Address
                </label>
                <textarea
                  id="shopAddress"
                  rows={3}
                  placeholder="Street address, city, and postal code"
                  value={formData.shopAddress}
                  onChange={(e) => setFormData({ ...formData, shopAddress: e.target.value })}
                  className={`${inputClasses} resize-none`}
                />
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="text-red-500 text-[11px] font-bold uppercase tracking-wider bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-lg px-4 py-3"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileTap={{ scale: 0.98 }}
                className="mt-2 px-6 py-4 bg-[#111] dark:bg-white text-white dark:text-[#111] rounded-lg hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all cursor-pointer w-full flex items-center justify-center gap-2 font-bold uppercase tracking-[0.2em] text-[10px] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-primary/10"
              >
                {loading ? (
                  <>
                    <CgSpinner className="text-xl animate-spin" />
                    <span>Processing…</span>
                  </>
                ) : (
                  'Complete Registration'
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default EditSellerDetails;
