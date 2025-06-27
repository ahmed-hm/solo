'use client';

import React, { useRef, useState, TouchEvent, useEffect } from 'react';
import Image from 'next/image';
import Lottie from 'lottie-react';
import arrowAnimation from '../../../public/lottie/arrow-down.json';
// Import translation hook
import { useTranslation } from '../../i18n/client';
// Import products data
import allProducts from '@/data/products.json';
// Import Swiper components
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
  imageUrl: string;
  category?: string;
}

interface ProductsProps {
  title?: string;
  subtitle?: string;
  products?: Product[];
  filterByCategory?: string;
  lng: string; // Add language prop
}

const FeaturedProducts: React.FC<ProductsProps> = ({
  title = '',
  subtitle = '',
  products = [],
  filterByCategory,
  lng,
}) => {
  // Initialize translation hook
  const { t } = useTranslation(lng);

  // Use default products from JSON file if no products provided
  const [defaultProducts, setDefaultProducts] = useState<Product[]>([]);

  // Initialize with some featured products if no specific products are provided
  // Use a ref to track if we already set the default products to avoid infinite loops
  const defaultsSetRef = useRef(false);

  useEffect(() => {
    // Only set the default products once and only if needed
    if (products.length === 0 && !defaultsSetRef.current) {
      // Get a mix of products from different categories for featured display
      const featured = [
        allProducts.find(p => p.category === 'Puree' && p.name.includes('Blueberry')),
        allProducts.find(p => p.category === 'Syrup' && p.name.includes('Blue')),
        allProducts.find(p => p.category === 'Powder' && p.name.includes('Turkish')),
        allProducts.find(p => p.category === 'Spreads' && p.name.includes('Pistachio')),
        allProducts.find(p => p.category === 'Sauces'),
        allProducts.find(p => p.category === 'Mini Coffee'),
      ].filter(Boolean) as Product[];

      setDefaultProducts(featured);
      defaultsSetRef.current = true;
    }
  }, []); // Empty dependency array to run only once on mount

  // Filter products by category if specified
  const displayProducts = filterByCategory
    ? products.filter((product) => product.category === filterByCategory)
    : products.length > 0 ? products : defaultProducts;

  // State for Swiper instance
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  // State for mobile touch swipe functionality
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Minimum swipe distance (in px) required for swipe action
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
            {title ? t(`products.${title.toLowerCase().replace(/\s+/g, '_')}`, title) : t('products.featured', 'Featured Products')}
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
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 8
                },
                640: {
                  slidesPerView: 2.5,
                  spaceBetween: 12
                },
                968: {
                  slidesPerView: 3.9,
                  spaceBetween: 16
                },
                1200: {
                  slidesPerView: 5,
                  spaceBetween: 32
                }
              }}
            >
              {displayProducts.map((product) => (
                <SwiperSlide key={product.id}>
                  <div className="flex flex-col items-center p-2 md:p-4">
                    <div className="w-full h-[130px] md:h-[295px] relative mb-2 md:mb-4 rounded-md overflow-hidden">
                      <Image 
                        src={product.imageUrl} 
                        alt={t(`products.${product.name.toLowerCase().replace(/\s+/g, '_')}`, product.name)} 
                        fill 
                        className="object-contain" 
                      />
                    </div>
                    <span className="font-['Montserrat'] font-bold text-[11px] md:text-[17px] tracking-tight text-black text-center">
                      {t(`products.${product.name.toLowerCase().replace(/\s+/g, '_')}`, product.name)}
                    </span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Desktop Navigation Buttons */}
            <div
              ref={prevRef}
              onClick={handlePrev}
              className="w-12 h-12 md:w-16 md:h-16 rotate-90 absolute left-0 md:left-1 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer"
            >
              <Lottie animationData={arrowAnimation} loop={true} />
            </div>
            <div
              ref={nextRef}
              onClick={handleNext}
              className="w-12 h-12 md:w-16 md:h-16 rotate-270 absolute right-0 md:right-1 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer"
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
                        alt={t(`products.${product.name.toLowerCase().replace(/\s+/g, '_')}`, product.name)} 
                        fill 
                        className="object-contain" 
                      />
                    </div>
                    <span className="font-['Montserrat'] font-bold text-[11px] tracking-tight text-black text-center">
                      {t(`products.${product.name.toLowerCase().replace(/\s+/g, '_')}`, product.name)}
                    </span>
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
