'use client';

import React, { useRef, useState, TouchEvent, useEffect } from 'react';
import Image from 'next/image';
import Lottie from 'lottie-react';
import arrowAnimation from '../../../public/lottie/arrow-down.json';
import { useTranslation, useIsRTL } from '../../i18n/client';
import allProducts from '@/data/products.json';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Define the Product type
interface Product {
  id: string;
  name: string;
  nameAr: string;
  imageUrl: string;
  category?: string;
}

interface ProductsProps {
  title?: string;
  subtitle?: string;
  products?: Product[];
  filterByCategory?: string;
  lng: string;
}

const FeaturedProducts: React.FC<ProductsProps> = ({
  title = '',
  subtitle = '',
  products = [],
  filterByCategory,
  lng,
}) => {
  const { t } = useTranslation(lng);
  const isRtl = useIsRTL(lng);

  // Use default products from JSON file if no products provided
  const [defaultProducts, setDefaultProducts] = useState<Product[]>([]);
  const defaultsSetRef = useRef(false);

  useEffect(() => {
    if (products.length === 0 && !defaultsSetRef.current) {
      const featured = [
        allProducts.find((p) => p.category === 'Powder' && p.name.includes('Mocha Powder')),
        allProducts.find((p) => p.category === 'Powder' && p.name.includes('Matcha')),
        allProducts.find((p) => p.category === 'Topping' && p.name.includes('Caramel Sauce')),
        allProducts.find((p) => p.category === 'Topping' && p.name.includes('Chocolate Sauce')),
        allProducts.find((p) => p.category === 'Syrup' && p.name.includes('Passion')),
        allProducts.find((p) => p.category === 'Puree' && p.name.includes('Raspberry')),
        allProducts.find((p) => p.category === 'Puree' && p.name.includes('Mango')),
        allProducts.find((p) => p.category === 'Syrup' && p.name.includes('Strawberry')),
        allProducts.find((p) => p.category === 'Syrup' && p.name.includes('Caramel')),
        allProducts.find((p) => p.category === 'Syrup' && p.name.includes('Vanilla')),
      ].filter(Boolean) as Product[];

      setDefaultProducts(featured);
      defaultsSetRef.current = true;
    }
  }, [products.length]);

  const displayProducts = filterByCategory
    ? products.filter((product) => product.category === filterByCategory)
    : products.length > 0
    ? products
    : defaultProducts;

  // State for Swiper instance
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  // Mobile scroll function for touch swipe
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 150 : 300;
      const newScrollLeft =
        direction === 'left'
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  };

  // Desktop Swiper navigation handlers
  const handlePrev = () => {
    if (swiper) {
      swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiper) {
      swiper.slideNext();
    }
  };

  // Touch handlers for mobile swipe functionality
  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      scroll('right');
    }
    if (isRightSwipe) {
      scroll('left');
    }
  };

  return (
    <section className="w-full py-8 md:py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-6 md:mb-12">
          <h2 className="font-['Dancing_Script'] font-semibold text-[42px] md:text-[84px] leading-[1.2em] text-black mb-2 md:mb-3">
            {title
              ? t(`products.${title.toLowerCase().replace(/\s+/g, '_')}`, title)
              : t('products.featured', 'Featured Products')}
          </h2>
          {subtitle && (
            <p className="font-['Montserrat'] text-base md:text-[25px] leading-[1.22em] text-black max-w-5xl">
              {t(`products.${subtitle.toLowerCase().replace(/\s+/g, '_')}`, subtitle)}
            </p>
          )}
        </div>

        {/* Products Container */}
        <div className="relative">
          {/* Desktop view with Swiper - Visible on md screens and above */}
          <div className="hidden md:block">
            <Swiper
              modules={[Navigation, Pagination]}
              slidesPerView={5}
              spaceBetween={32}
              grabCursor={true}
              onSwiper={setSwiper}
              className="max-w-[1400px] mx-auto"
              dir={isRtl ? 'rtl' : 'ltr'}
              key={isRtl ? 'rtl' : 'ltr'} // Force re-render when direction changes
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 8,
                },
                640: {
                  slidesPerView: 2.5,
                  spaceBetween: 12,
                },
                968: {
                  slidesPerView: 3.9,
                  spaceBetween: 16,
                },
                1200: {
                  slidesPerView: 5,
                  spaceBetween: 32,
                },
              }}
            >
              {displayProducts.map((product) => (
                <SwiperSlide key={product.id}>
                  <div className="flex flex-col items-center p-2 md:p-4">
                    <div className="w-full h-[130px] md:h-[295px] relative mb-2 md:mb-4 rounded-md overflow-hidden">
                      <Image
                        src={product.imageUrl}
                        alt={isRtl ? product.nameAr : product.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="font-['Montserrat'] font-medium md:text-[17px] tracking-tight text-black text-center">
                        {isRtl ? product.nameAr : product.name}
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Desktop Navigation Buttons */}
            <div
              ref={prevRef}
              onClick={handlePrev}
              className={`w-12 h-12 md:w-16 md:h-16 absolute ${isRtl ? 'right-0 md:right-1 rotate-270' : 'left-0 md:left-1 rotate-90'} top-1/2 transform -translate-y-1/2 z-10 cursor-pointer`}
            >
              <Lottie animationData={arrowAnimation} loop={true} />
            </div>
            <div
              ref={nextRef}
              onClick={handleNext}
              className={`w-12 h-12 md:w-16 md:h-16 absolute ${isRtl ? 'left-0 md:left-1 rotate-90' : 'right-0 md:right-1 rotate-270'} top-1/2 transform -translate-y-1/2 z-10 cursor-pointer`}
            >
              <Lottie animationData={arrowAnimation} loop={true} />
            </div>
          </div>

          {/* Mobile view (scrollable horizontal) - Visible on screens below md */}
          <div className="md:hidden">
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto space-x-4 pb-6 scrollbar-hide scroll-smooth select-none"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {displayProducts.map((product) => (
                <div key={product.id} className="flex-shrink-0 w-[130px]">
                  <div className="flex flex-col items-center p-2">
                    <div className="w-full h-[130px] relative mb-2 rounded-md overflow-hidden">
                      <Image
                        src={product.imageUrl}
                        alt={isRtl ? product.nameAr : product.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="font-['Montserrat'] font-medium text-[11px] tracking-tight text-black text-center">
                        {isRtl ? product.nameAr : product.name}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Navigation Buttons */}
            <div
              onClick={() => scroll('left')}
              className="w-12 h-12 rotate-90 absolute left-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer"
            >
              <Lottie animationData={arrowAnimation} loop={true} />
            </div>
            <div
              onClick={() => scroll('right')}
              className="w-12 h-12 rotate-270 absolute right-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer"
            >
              <Lottie animationData={arrowAnimation} loop={true} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
