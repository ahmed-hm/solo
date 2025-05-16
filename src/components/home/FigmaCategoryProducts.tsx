'use client';

import React, { useState, useEffect } from 'react';
import FigmaCategories from './FigmaCategories';
import FeaturedProducts from './FeaturedProducts';

// Product data - updated with new structure
const productData = [
  // Puree category products
  { id: '1', name: 'Blue Berry', imageUrl: '/images/products/blue berry.png', category: 'Puree' },
  { id: '2', name: 'Blue Raspberry', imageUrl: '/images/products/Blue rassberry.png', category: 'Puree' },
  { id: '3', name: 'Cherry', imageUrl: '/images/products/Cherry.png', category: 'Puree' },
  { id: '4', name: 'Lemon', imageUrl: '/images/products/Lemon.png', category: 'Puree' },
  { id: '5', name: 'Mango', imageUrl: '/images/products/Mango.png', category: 'Puree' },
  { id: '6', name: 'Passion', imageUrl: '/images/products/Passion.png', category: 'Puree' },
  { id: '7', name: 'Coconut', imageUrl: '/images/products/coconut.png', category: 'Puree' },
  { id: '8', name: 'Green Apple', imageUrl: '/images/products/green apple.png', category: 'Puree' },
  { id: '9', name: 'Kiwi', imageUrl: '/images/products/kiwi.png', category: 'Puree' },
  { id: '10', name: 'Mix Berry', imageUrl: '/images/products/mix berry.png', category: 'Puree' },
  { id: '11', name: 'Peach', imageUrl: '/images/products/peach.png', category: 'Puree' },
  { id: '12', name: 'Pineapple', imageUrl: '/images/products/pinable.png', category: 'Puree' },
  { id: '13', name: 'Raspberry', imageUrl: '/images/products/rasberry.png', category: 'Puree' },
  { id: '14', name: 'Strawberry', imageUrl: '/images/products/strawberry.png', category: 'Puree' },
  { id: '15', name: 'Watermelon', imageUrl: '/images/products/watermelon.png', category: 'Puree' },
  { id: '16', name: 'Hibiscus', imageUrl: '/images/products/كركدية.png', category: 'Puree' },
  
  // Syrup category products
  { id: '17', name: 'Energy', imageUrl: '/images/products/Energy.png', category: 'Syrup' },
  { id: '18', name: 'Blackberry', imageUrl: '/images/products/blackberry.png', category: 'Syrup' },
  { id: '19', name: 'Blue', imageUrl: '/images/products/blue.png', category: 'Syrup' },
  { id: '20', name: 'Blueberry', imageUrl: '/images/products/blueberry.png', category: 'Syrup' },
  { id: '21', name: 'Ice Tea', imageUrl: '/images/products/ice tea.png', category: 'Syrup' },
  { id: '22', name: 'Passion', imageUrl: '/images/products/passion.png', category: 'Syrup' },
  { id: '23', name: 'Peach', imageUrl: '/images/products/peach.png', category: 'Syrup' },
  { id: '24', name: 'Raspberry', imageUrl: '/images/products/ras berry.png', category: 'Syrup' },
  { id: '25', name: 'Strawberry', imageUrl: '/images/products/strawberry.png', category: 'Syrup' },
  { id: '26', name: 'Watermelon', imageUrl: '/images/products/بطيخ.png', category: 'Syrup' },
  { id: '27', name: 'Hazelnut', imageUrl: '/images/products/بندق.png', category: 'Syrup' },
  { id: '28', name: 'Coconut', imageUrl: '/images/products/جوز_هند.png', category: 'Syrup' },
  { id: '29', name: 'Pomegranate', imageUrl: '/images/products/رمان.png', category: 'Syrup' },
  { id: '30', name: 'Vanilla', imageUrl: '/images/products/فانيليا.png', category: 'Syrup' },
  { id: '31', name: 'Peanut', imageUrl: '/images/products/فول سوداني.png', category: 'Syrup' },
  { id: '32', name: 'Sugar Cane', imageUrl: '/images/products/قصب السكر.png', category: 'Syrup' },
  { id: '33', name: 'Caramel', imageUrl: '/images/products/كراميل.png', category: 'Syrup' },
  { id: '34', name: 'Cherry', imageUrl: '/images/products/كريز.png', category: 'Syrup' },
  { id: '35', name: 'Mojito', imageUrl: '/images/products/موهيتو.png', category: 'Syrup' },
  
  // Sauces category products
  { id: '36', name: 'Dulce de Leche Sauce', imageUrl: '/images/products/Dulce de lache sauce.png', category: 'Sauces' },
  { id: '37', name: 'Caramel Sauce', imageUrl: '/images/products/carmel sauce.png', category: 'Sauces' },
  { id: '38', name: 'Dark Chocolate', imageUrl: '/images/products/dark chocolate.png', category: 'Sauces' },
  { id: '39', name: 'White Chocolate Sauce', imageUrl: '/images/products/white chocalte sauce.png', category: 'Sauces' },
  
  // Powder category products
  { id: '40', name: 'Matcha', imageUrl: '/images/products/Matcha.png', category: 'Powder' },
  { id: '41', name: 'Moca Powder', imageUrl: '/images/products/Moca powder.png', category: 'Powder' },
  { id: '42', name: 'Chocolate Powder', imageUrl: '/images/products/choclate powder.png', category: 'Powder' },
  { id: '43', name: 'Coffee Base', imageUrl: '/images/products/coffe base.png', category: 'Powder' },
  { id: '44', name: 'Latte Powder', imageUrl: '/images/products/latee powder.png', category: 'Powder' },
  { id: '45', name: 'Turkish Sahalb', imageUrl: '/images/products/turkish sahalb.png', category: 'Powder' },
  { id: '46', name: 'Vanilla', imageUrl: '/images/products/vanilia.png', category: 'Powder' },
  
  // Spreads category products
  { id: '47', name: 'Pistachio Premium 1KG', imageUrl: '/images/products/1 KG Pistachio Premium.png', category: 'Spreads' },
  { id: '48', name: 'Pistachio Regular 1KG', imageUrl: '/images/products/1 KG Pistachio Regular.png', category: 'Spreads' },
  { id: '49', name: 'Speculoos 1KG', imageUrl: '/images/products/1 KG Speculoos.png', category: 'Spreads' },
  { id: '50', name: 'Spread 3', imageUrl: '/images/products/3.png', category: 'Spreads' },
  { id: '51', name: 'Pistachio Premium', imageUrl: '/images/products/Pistachio Premium.png', category: 'Spreads' },
  { id: '52', name: 'Pistachio Regular', imageUrl: '/images/products/Pistachio Regular.png', category: 'Spreads' },
  
  // Topping category products
  { id: '53', name: 'Chocolate Sauce', imageUrl: '/images/products/صوص شيكولاته.png', category: 'Topping' },
  { id: '54', name: 'Caramel Sauce', imageUrl: '/images/products/صوص كراميل.png', category: 'Topping' },
  
  // Mini Topping category products
  { id: '55', name: 'Blueberry Sauce', imageUrl: '/images/products/صوص توت ازرق.png', category: 'Mini Topping' },
  { id: '56', name: 'Chocolate Sauce', imageUrl: '/images/products/صوص شيكولاته.png', category: 'Mini Topping' },
  { id: '57', name: 'Strawberry Sauce', imageUrl: '/images/products/صوص فراولة.png', category: 'Mini Topping' },
  { id: '58', name: 'Caramel Sauce', imageUrl: '/images/products/صوص كراميل.png', category: 'Mini Topping' },
  
  // Mini Coffee category products
  { id: '59', name: 'Hot Chocolate', imageUrl: '/images/products/Hot Choclate.png', category: 'Mini Coffee' },
  { id: '60', name: 'Pure COCOA', imageUrl: '/images/products/Pure COCOA.png', category: 'Mini Coffee' }
];

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
