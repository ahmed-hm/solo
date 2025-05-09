'use client';

import React from 'react';
import Image from 'next/image';
import Lottie from 'lottie-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import arrowAnimation from '../../../public/lottie/arrow-down.json';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// Define the Product type
interface Product {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
}

// Sample product data - this would typically come from an API or CMS
const productData: Product[] = [
  { id: '1', name: 'Blue Berry Puree', imageUrl: '/images/products/blueberry.png', category: 'Puree' },
  { id: '2', name: 'Blue Raspberry Puree', imageUrl: '/images/products/blueraspberry.png', category: 'Puree' },
  { id: '3', name: 'Cherry Puree', imageUrl: '/images/products/cherry.png', category: 'Puree' },
  { id: '4', name: 'Mix Berry', imageUrl: '/images/products/mixberry.png', category: 'Puree' },
  { id: '5', name: 'Pineapple', imageUrl: '/images/products/pineapple.png', category: 'Puree' },
  { id: '6', name: 'Hibiscus', imageUrl: '/images/products/hibiscus.png', category: 'Puree' },
  { id: '7', name: 'Vanilla Syrup', imageUrl: '/images/products/vanilla.png', category: 'Syrup' },
  { id: '8', name: 'Hazelnut Syrup', imageUrl: '/images/products/hazelnut.png', category: 'Syrup' },
  { id: '9', name: 'Chocolate Sauce', imageUrl: '/images/products/chocolate.png', category: 'Sauces' },
  { id: '10', name: 'Caramel Sauce', imageUrl: '/images/products/caramel.png', category: 'Sauces' },
  { id: '11', name: 'Matcha Powder', imageUrl: '/images/products/matcha.png', category: 'Powder' },
  { id: '12', name: 'Cocoa Powder', imageUrl: '/images/products/cocoa.png', category: 'Powder' },
  { id: '13', name: 'Almond Spread', imageUrl: '/images/products/almond.png', category: 'Spreads' },
  { id: '14', name: 'Honey Topping', imageUrl: '/images/products/honey.png', category: 'Topping' },
];

interface FigmaProductsProps {
  selectedCategory: string;
}

const FigmaProducts: React.FC<FigmaProductsProps> = ({ selectedCategory }) => {
  // Filter products by selected category
  const filteredProducts = productData.filter(product => product.category === selectedCategory);
  
  // Create refs for custom navigation
  const prevRef = React.useRef<HTMLDivElement>(null);
  const nextRef = React.useRef<HTMLDivElement>(null);

  return (
    <section className="w-full py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="font-['Dancing_Script'] font-semibold text-[84px] leading-[1.2em] text-black mb-3">
            Our Products
          </h2>
          <p className="font-['Montserrat'] text-[25px] leading-[1.22em] text-black max-w-2xl">
            Explore our curated range of syrups, purees, sauces, spreads and toppings. 
            Crafted to inspire excellence in every recipe and experience.
          </p>
        </div>

        {/* Products Swiper */}
        <div className="relative">
          <Swiper
            modules={[Navigation]}
            spaceBetween={32}
            slidesPerView={4}
            breakpoints={{
              // when window width is >= 320px
              320: {
                slidesPerView: 1,
                spaceBetween: 16
              },
              // when window width is >= 640px
              640: {
                slidesPerView: 2,
                spaceBetween: 20
              },
              // when window width is >= 968px
              968: {
                slidesPerView: 3,
                spaceBetween: 24
              },
              // when window width is >= 1200px
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
                      alt={product.name} 
                      fill 
                      className="object-contain"
                    />
                  </div>
                  <h3 className="font-['Montserrat'] font-bold text-[17px] tracking-tight text-black text-center">
                    {product.name}
                  </h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <div 
            ref={prevRef}
            className="absolute left-1 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center shadow-md z-10 cursor-pointer"
          >
            <div className="w-6 h-6 rotate-90">
              <Lottie animationData={arrowAnimation} loop={true} />
            </div>
          </div>
          <div 
            ref={nextRef}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center shadow-md z-10 cursor-pointer"
          >
            <div className="w-6 h-6 rotate-270">
              <Lottie animationData={arrowAnimation} loop={true} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FigmaProducts;