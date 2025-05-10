'use client';

import React, { useState, useEffect } from 'react';
import FigmaCategories from './FigmaCategories';
import FeaturedProducts from './FeaturedProducts';

// Product data - moved from FigmaProducts to make it accessible here
const productData = [
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

// Category type from FigmaCategories
type Category = 'Puree' | 'Syrup' | 'Sauces' | 'Powder' | 'Spreads' | 'Topping';

const FigmaCategoryProducts = () => {
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
      <FigmaCategories selectedCategory={selectedCategory} onCategorySelect={handleCategorySelect} />

      {/* Products Section - conditionally pass title and subtitle based on screen size */}
      <FeaturedProducts
        title={!isMobile ? "Our Products" : undefined}
        subtitle={!isMobile ? "Explore our curated range of syrups, purees, sauces, spreads and toppings. Crafted to inspire excellence in every recipe and experience." : undefined}
        products={productData}
        filterByCategory={selectedCategory}
      />
    </div>
  );
};

export default FigmaCategoryProducts;
