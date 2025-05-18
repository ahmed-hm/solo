'use client';

import React, { useRef, useState, TouchEvent, useEffect } from 'react';
import Image from 'next/image';
import Lottie from 'lottie-react';
import arrowAnimation from '../../../public/lottie/arrow-down.json';
// Import translation hook
import { useTranslation } from '../../i18n/client';
// Import products data
import allProducts from '@/data/products.json';

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
        allProducts.find(p => p.category === 'Puree' && p.name.includes('Berry')),
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

  // Rest of the component remains the same
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
          <h2 className="font-['Dancing_Script'] font-semibold text-[42px] md:text-[84px] leading-[1.2em] text-black mb-2 md:mb-3">
            {title ? t(`products.${title.toLowerCase().replace(/\s+/g, '_')}`, title) : t('products.featured', 'Featured Products')}
          </h2>
          {subtitle && (
            <p className="font-['Montserrat'] text-base md:text-[25px] leading-[1.22em] text-black max-w-5xl">
              {t(`products.${subtitle.toLowerCase().replace(/\s+/g, '_')}`, subtitle)}
            </p>
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
