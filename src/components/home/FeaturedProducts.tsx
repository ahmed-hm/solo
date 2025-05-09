'use client';

import React, { useRef, useState, TouchEvent } from 'react';
import Image from 'next/image';
import Lottie from 'lottie-react';
import arrowAnimation from '../../../public/lottie/arrow-down.json';

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
}

const FeaturedProducts: React.FC<ProductsProps> = ({
  title = 'Best Selling Products',
  subtitle = '',
  products = [
    {
      id: '1',
      name: 'Hibiscus',
      imageUrl: '/images/products/hibiscus.png',
    },
    {
      id: '2',
      name: 'Blueberry',
      imageUrl: '/images/products/blueberry.png',
    },
    {
      id: '3',
      name: 'Blue Curacao',
      imageUrl: '/images/products/blueraspberry.png',
    },
    {
      id: '4',
      name: 'Turkish Sahalb',
      imageUrl: '/images/products/cherry.png',
    },
    {
      id: '5',
      name: 'Premium Spread Pistachio',
      imageUrl: '/images/products/mixberry.png',
    },
    {
      id: '6',
      name: 'Pure COCOA',
      imageUrl: '/images/products/pineapple.png',
    },
  ],
  filterByCategory,
}) => {
  // Filter products by category if specified
  const displayProducts = filterByCategory
    ? products.filter((product) => product.category === filterByCategory)
    : products;

  // Ref for the scrollable container
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // State for touch swipe functionality
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px) required for swipe action
  const minSwipeDistance = 50;

  // Scroll functions
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      // Smaller scroll amount for mobile
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

  // Touch handlers for swipe functionality
  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null); // Reset on touch start
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
          <h2 className="font-['Dancing_Script'] font-semibold text-[42px] md:text-[84px] leading-[1.2em] text-black mb-2 md:mb-3">{title}</h2>
          {subtitle && (
            <p className="font-['Montserrat'] text-base md:text-[25px] leading-[1.22em] text-black max-w-5xl">{subtitle}</p>
          )}
        </div>

        {/* Products Scrollable Container */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto space-x-4 md:space-x-8 pb-6 md:pb-8 scrollbar-hide scroll-smooth overflow-hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {displayProducts.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-[130px] md:w-[273px]">
                <div className="flex flex-col items-center p-2 md:p-4">
                  <div className="w-full h-[130px] md:h-[295px] relative mb-2 md:mb-4 rounded-md overflow-hidden">
                    <Image src={product.imageUrl} alt={product.name} fill className="object-contain" />
                  </div>
                  <span className="font-['Montserrat'] font-bold text-[11px] md:text-[17px] tracking-tight text-black text-center">
                    {product.name}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Custom Navigation Buttons */}
          <div
            onClick={() => scroll('left')}
            className="w-12 h-12 md:w-16 md:h-16 rotate-90 absolute left-0 md:left-1 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer"
          >
            <Lottie animationData={arrowAnimation} loop={true} />
          </div>
          <div
            onClick={() => scroll('right')}
            className="w-12 h-12 md:w-16 md:h-16 rotate-270 absolute right-0 md:right-1 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer"
          >
            <Lottie animationData={arrowAnimation} loop={true} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
