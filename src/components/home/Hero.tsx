import React from 'react';
import Slider from '../Slider';
import Image from 'next/image';
// Apnar image-gulo import kore nin
// import sideImg1 from '@/public/side-banner-1.jpg';
// import sideImg2 from '@/public/side-banner-2.jpg';

const Hero = () => {
  return (
    <section className="grid grid-cols-1 max-md:grid-rows-3 md:grid-cols-5 min-h-[70vh] w-full border-b border-[#eee] dark:border-[#222]">
      {/* Main Slider Section */}
      <div className="w-full h-full max-md:row-span-2 md:col-span-3 border-r border-[#eee] dark:border-[#222]">
        <Slider />
      </div>

      {/* Side Banners Section */}
      <div className="w-full h-full md:col-span-2 flex md:flex-col">
        {/* Top/Left Side Image */}
        <div className="w-full h-full relative group overflow-hidden dark:border-[#222]">
          <Image
            src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=1000&auto=format&fit=crop" // Placeholder URL
            alt="New Arrivals"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
          {/* Overlay text - Optiona */}
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300 flex flex-col justify-end p-4 md:p-6">
            <span className="text-white text-[10px] font-bold uppercase tracking-widest bg-primary px-2 rounded-sm py-1 w-fit mb-2">
              New Arrival
            </span>
            <h3
              className="text-white text-lg font-bold uppercase tracking-tighter"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Premium Gadgets
            </h3>
          </div>
        </div>

        {/* Bottom/Right Side Image */}
        <div className="w-full h-full relative group overflow-hidden border-l border-[#eee] dark:border-[#222] md:border-l-0">
          <Image
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop" // Placeholder URL
            alt="Summer Sale"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300 flex flex-col justify-end p-4 md:p-6">
            <span className="text-white text-[10px] font-bold uppercase tracking-widest bg-[#111] rounded-sm dark:bg-white dark:text-[#111] px-2 py-1 w-fit mb-2">
              Limited Edition
            </span>
            <h3
              className="text-white text-lg font-bold uppercase tracking-tighter"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Audio Series
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
