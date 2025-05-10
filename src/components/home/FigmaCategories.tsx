'use client';

import Image from 'next/image';
import React from 'react';
// Import Swiper components and modules
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// Import Lottie player
import Lottie from 'lottie-react';
import arrowAnimation from '../../../public/lottie/arrow-down.json';

// Category types
type Category = 'Puree' | 'Syrup' | 'Sauces' | 'Powder' | 'Spreads' | 'Topping';

// Sample category images (you'll need to add these images to your public folder)
const categoryImages = {
  Puree: '/images/categories/puree.png',
  Syrup: '/images/categories/syrup.png',
  Sauces: '/images/categories/sauces.png',
  Powder: '/images/categories/powder.png',
  Spreads: '/images/categories/spreads.png',
  Topping: '/images/categories/topping.png',
};

interface FigmaCategoriesProps {
  onCategorySelect: (category: Category) => void;
  selectedCategory: Category;
}

const FigmaCategories: React.FC<FigmaCategoriesProps> = ({ onCategorySelect, selectedCategory = 'Puree' }) => {
  // List of all categories
  const categories: Category[] = ['Puree', 'Syrup', 'Sauces', 'Powder', 'Spreads', 'Topping'];

  // References for Swiper navigation
  const prevRef = React.useRef<HTMLButtonElement>(null);
  const nextRef = React.useRef<HTMLButtonElement>(null);

  return (
    <section className="w-full py-16">
      <div className="container mx-auto px-4">
        {/* Header - Categories and Browse by Category */}
        <div className="flex justify-between items-end mb-12">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <div className="w-5 h-10 rounded bg-[#DBB58F]"></div>
              <span className="font-['Dancing_Script'] font-semibold text-[64px] leading-[0.75em] tracking-[4%] text-[#DBB58F]">
                Categories
              </span>
            </div>
            <span className="font-['Montserrat'] font-bold text-3xl tracking-[4%] leading-[1.6em] text-black">
              Browse By Category
            </span>
          </div>

          {/* Navigation Arrows */}
          <div className="hidden md:flex gap-2">
            <button
              ref={prevRef}
              className="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center"
              aria-label="Previous category"
            >
              <div className="w-6 h-6 rotate-90">
                <Lottie animationData={arrowAnimation} loop={true} />
              </div>
            </button>
            <button
              ref={nextRef}
              className="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center"
              aria-label="Next category"
            >
              <div className="w-6 h-6 rotate-270">
                <Lottie animationData={arrowAnimation} loop={true} />
              </div>
            </button>
          </div>
        </div>

        {/* Categories List - Using Swiper */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={50}
          slidesPerView={'auto'}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            // @ts-expect-error - Known issue with Swiper types
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-expect-error - Known issue with Swiper types
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          className="pb-6 hide-scrollbar"
        >
          {categories.map((category) => (
            <SwiperSlide key={category} style={{ width: 'auto' }}>
              <button
                onClick={() => onCategorySelect(category)}
                className={`flex flex-col items-center gap-2 px-12 py-4 rounded-[12px] transition-all ${
                  selectedCategory === category
                    ? 'border border-[#DBB58F] text-[#DBB58F]'
                    : 'border border-black text-black'
                }`}
              >
                <div className="w-24 h-24 relative mb-2">
                  <Image src={categoryImages[category]} alt={category} fill className="object-contain" />
                </div>
                <span
                  className={`text-center font-['Montserrat'] ${
                    selectedCategory === category ? 'font-bold' : 'font-medium'
                  } text-[17px] tracking-tight`}
                >
                  {category}
                </span>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default FigmaCategories;
