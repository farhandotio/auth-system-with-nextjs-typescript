'use client';
import React, { useEffect, useState } from 'react';
import slide1 from '@/assets/slide1.webp';
import slide2 from '@/assets/slide2.webp';
import slide3 from '@/assets/slide3.webp';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';

const slides = [
  {
    image: slide1,
    title: 'Next-Gen Computing',
    subtitle: 'Elite Performance',
    desccription: 'High-Performance Laptops for Professionals & Gamers',
    button: 'SHOP LAPTOPS',
  },
  {
    image: slide2,
    title: 'Stay Connected',
    subtitle: 'Flagship Experience',
    desccription: 'Latest Smartphones with Advanced Camera & 5G Tech',
    button: 'EXPLORE MOBILE',
  },
  {
    image: slide3,
    title: 'Pure Sound',
    subtitle: 'Premium Audio',
    desccription: 'Noise Cancelling Wireless Headphones & Earbuds',
    button: 'DISCOVER SOUND',
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex justify-center items-center"
        >
          <Image
            src={slides[current].image}
            alt={slides[current].title}
            priority
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            className="object-cover opacity-70"
          />

          <div className="absolute inset-0 flex flex-col items-start justify-center px-4 md:px-6 bg-linear-to-br from-black/70 to-transparent">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="text-xs md:text-base uppercase tracking-widest text-gray-300 mb-1"
            >
              {slides[current].subtitle}
            </motion.h3>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.2 }}
              className="text-2xl md:text-6xl font-bold mb-1 md:mb-3"
            >
              {slides[current].title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.1 }}
              className="text-lg md:text-xl mb-3 md:mb-6 text-gray-300"
            >
              {slides[current].desccription}
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.01 }}
              className="px-5 py-2 bg-[#111] dark:bg-[#fff] text-white dark:text-[#111] text-[10px] font-bold uppercase tracking-widest rounded-sm hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all shadow-sm cursor-pointer max-md:mb-10"
            >
              {slides[current].button}
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-4 md:bottom-6 right-4 md:right-6 flex gap-4">
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.01 }}
            onClick={() => setCurrent(index)}
            className={`relative w-20 h-12 cursor-pointer rounded-md overflow-hidden border-2 transition-all duration-300 ${index === current ? 'border-gray-100 shadow-2xs' : 'border-gray-500 hover:border-primary'}`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              priority
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
              className="object-cover opacity-70"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
