'use client';

import React, { useState, useEffect } from 'react';
import FigmaCategories from './FigmaCategories';
import FeaturedProducts from './FeaturedProducts';
import productData from '@/data/products.json';

// Category type - updated to match the new structure
type Category = 'Puree' | 'Syrup' | 'Sauces' | 'Powder' | 'Spreads' | 'Topping' | 'Mini Topping' | 'Mini Coffee';

interface FigmaCategoryProductsProps {
  lng: string; // Add language prop
}

const FigmaCategoryProducts: React.FC<FigmaCategoryProductsProps> = ({ lng }) => {
  // State to track the selected category
  const [selectedCategory, setSelectedCategory] = useState<Category>('Puree');
  // State to track if the device is mobile
  const [isMobile, setIsMobile] = useState(false);

  // Effect to check screen size on mount and when window resizes
  useEffect(() => {
    // Function to check if screen width is mobile
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is commonly used as the breakpoint for mobile
    };

    // Check on mount
    checkIsMobile();

    // Add resize listener
    window.addEventListener('resize', checkIsMobile);

    // Clean up
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Handler for category selection
  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      {/* Categories Section */}
      <FigmaCategories selectedCategory={selectedCategory} onCategorySelect={handleCategorySelect} lng={lng} />

      {/* Products Section - conditionally pass title and subtitle based on screen size */}
      <FeaturedProducts
        title={!isMobile ? 'Our Products' : undefined}
        subtitle={
          !isMobile
            ? lng === 'en'
              ? 'Explore our curated range of syrups, purees, sauces, spreads and toppings. Crafted to inspire excellence in every recipe and experience.'
              : 'اكتشف منتجات صولو المتنوعة من السيرابات، البيوريه الصوصات، السبريد و التوبينج. صُممت لتلهم التميز في كل وصفة وكل تجربة.'
            : undefined
        }
        products={productData}
        filterByCategory={selectedCategory}
        lng={lng}
      />
    </div>
  );
};

export default FigmaCategoryProducts;
