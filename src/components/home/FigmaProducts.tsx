'use client';

import React from 'react';
import Image from 'next/image';
import Lottie from 'lottie-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import arrowAnimation from '../../../public/lottie/arrow-down.json';
import allProducts from '@/data/products.json';
import { useTranslation, useIsRTL } from '../../i18n/client';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

interface FigmaProductsProps {
  selectedCategory: string;
  lng: string;
}

const FigmaProducts: React.FC<FigmaProductsProps> = ({ selectedCategory, lng }) => {
  const { t } = useTranslation(lng);
  const isRtl = useIsRTL(lng);
  
  // Filter products by selected category
  const filteredProducts = allProducts.filter(product => product.category === selectedCategory);
  
  // Create refs for custom navigation
  const prevRef = React.useRef<HTMLButtonElement>(null);
  const nextRef = React.useRef<HTMLButtonElement>(null);

  return (
    <section className="w-full py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="font-['Dancing_Script'] font-semibold text-[84px] leading-[1.2em] text-black mb-3">
            {t('products.our_products', 'Our Products')}
          </h2>
          <p className="font-['Montserrat'] text-[25px] leading-[1.22em] text-black max-w-2xl">
            {t('products.explore_description', 'Explore our curated range of syrups, purees, sauces, spreads and toppings. Crafted to inspire excellence in every recipe and experience.')}
          </p>
        </div>

        {/* Products Swiper */}
        <div className="relative">
          <Swiper
            modules={[Navigation]}
            spaceBetween={32}
            slidesPerView={4}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 16
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20
              },
              968: {
                slidesPerView: 3,
                spaceBetween: 24
              },
              1200: {
                slidesPerView: 4,
                spaceBetween: 32
              }
            }}
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
            className="w-full pb-8"
          >
            {filteredProducts.map((product) => (
              <SwiperSlide key={product.id} className="w-[273px]">
                <div className="flex flex-col items-center p-4">
                  <div className="w-full h-[295px] relative mb-4 rounded-md overflow-hidden">
                    <Image 
                      src={product.imageUrl} 
                      alt={isRtl ? product.nameAr : product.name}
                      fill 
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-['Montserrat'] font-medium text-[17px] tracking-tight text-black text-center">
                      {isRtl ? product.nameAr : product.name}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button
            ref={prevRef}
            className="absolute left-1 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center shadow-md z-10 cursor-pointer"
            aria-label={t('products.previous', 'Previous product')}
          >
            <div className="w-6 h-6 rotate-90">
              <Lottie animationData={arrowAnimation} loop={true} />
            </div>
          </button>
          <button 
            ref={nextRef}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center shadow-md z-10 cursor-pointer"
            aria-label={t('products.next', 'Next product')}
          >
            <div className="w-6 h-6 rotate-270">
              <Lottie animationData={arrowAnimation} loop={true} />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FigmaProducts;