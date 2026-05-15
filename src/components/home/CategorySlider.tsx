'use client';
import React, { useState, useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const categories = [
  { label: 'Fashion & Lifestyle', icon: '🛍️' },
  { label: 'Electronics & Tech', icon: '💻' },
  { label: 'Home & Garden', icon: '🏡' },
  { label: 'Health & Beauty', icon: '✨' },
  { label: 'Sports & Outdoors', icon: '⚽' },
  { label: 'Books & Stationery', icon: '📚' },
  { label: 'Toys & Games', icon: '🧸' },
  { label: 'Groceries & Food', icon: '🍎' },
  { label: 'Automotive & Tools', icon: '🛠️' },
  { label: 'Pet Supplies', icon: '🐾' },
];

const CategorySlider = () => {
  const [index, setIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(6);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerView(2);
      else if (window.innerWidth < 768) setItemsPerView(3);
      else if (window.innerWidth < 1024) setItemsPerView(4);
      else setItemsPerView(6);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = categories.length - itemsPerView;

  const nextSlide = () => {
    setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <section className="w-full py-4 md:py-6 select-none px-2 md:px-4">
      <div className="flex justify-between items-center mb-4 px-2 md:px-2">
        <h2 className="text-lg font-bold text-white/90 uppercase tracking-tighter">
          Shop By Categories
        </h2>
        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors rounded-sm active:scale-90"
          >
            <FaAngleLeft size={16} />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors rounded-sm active:scale-90"
          >
            <FaAngleRight size={16} />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden cursor-grab active:cursor-grabbing">
        <motion.div
          animate={{ x: `-${index * (100 / itemsPerView)}%` }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="flex"
        >
          {categories.map((item, idx) => (
            <div key={idx} style={{ minWidth: `${100 / itemsPerView}%` }} className="px-2">
              <motion.div
                whileTap={{ scale: 0.95 }}
                className="bg-zinc-900/50 border border-white/5 rounded-sm p-4 md:py-6 flex flex-col items-center justify-center group hover:bg-white/5 transition-colors duration-300 h-full"
              >
                <span className="text-3xl md:text-4xl mb-2 md:mb-3 drop-shadow-md">
                  {item.icon}
                </span>
                <p className="text-[10px] md:text-xs font-bold text-white/60 group-hover:text-white uppercase tracking-widest text-center">
                  {item.label}
                </p>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CategorySlider;
