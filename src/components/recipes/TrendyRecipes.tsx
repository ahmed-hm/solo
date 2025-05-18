'use client';

import recipeData from '@/data/recipes.json';
import { useIsRTL, useTranslation } from '@/i18n/client';
import Lottie from 'lottie-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { TouchEvent, useRef, useState } from 'react';
import arrowAnimation from '../../../public/lottie/arrow-down.json';

interface TrendyRecipesProps {
  lng: string;
}

const TrendyRecipes: React.FC<TrendyRecipesProps> = ({ lng }) => {
  const { t } = useTranslation(lng);
  const isRtl = useIsRTL(lng);

  // Updated to use categoryData for display
  const [categories] = useState(recipeData.categories);

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
    <section className="w-full py-8 md:py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-6 md:mb-12">
          <h2 className="font-['Dancing_Script'] font-semibold text-[42px] md:text-[84px] leading-[1.2em] text-black mb-2 md:mb-3">
            {t('recipes.trendy', 'Trendy Recipes')}
          </h2>
        </div>

        {/* Recipes Scrollable Container */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto space-x-4 md:space-x-8 pb-6 md:pb-8 scrollbar-hide scroll-smooth overflow-hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {categories.map((category) => (
              <div key={category.id} className="flex-shrink-0 w-[180px] md:w-[300px]">
                <Link href={`/${lng}/recipes/${category.id}`} className="group">
                  <div className="flex flex-col items-center">
                    <div className="w-full h-[180px] md:h-[300px] relative mb-2 md:mb-4">
                      <Image
                        src={category.imageUrl}
                        alt={isRtl ? category.nameAr : category.name}
                        fill
                        className="object-contain group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <span className="font-['Montserrat'] font-bold text-[16px] md:text-[20px] tracking-tight text-black text-center">
                      {isRtl ? category.nameAr : category.name}
                    </span>
                  </div>
                </Link>
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
            className="w-12 h-12 md:w-16 md:h-16 -rotate-90 absolute right-0 md:right-1 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer"
          >
            <Lottie animationData={arrowAnimation} loop={true} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendyRecipes;
