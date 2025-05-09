import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CategoryCardProps {
  name: string;
  imageUrl: string;
  description: string;
  link: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, imageUrl, description, link }) => {
  return (
    <div className="relative group overflow-hidden rounded-[10px] shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
      <div className="aspect-square w-full bg-[#F9F9F9] relative">
        {/* Replace with actual category image from Figma */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[#BDBDBD] text-sm">{imageUrl}</span>
        </div>
        
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center p-[30px] text-center">
          <h3 className="text-white font-dancing text-[48px] leading-[58px] mb-[15px]">{name}</h3>
          <p className="text-white text-[16px] leading-[24px] mb-[25px] opacity-90 font-montserrat">{description}</p>
          <Link 
            href={link}
            className="text-white border-2 border-white px-[30px] py-[12px] rounded-[5px] text-[14px] font-bold font-montserrat hover:bg-white hover:text-black transition-colors duration-300"
          >
            View Products
          </Link>
        </div>
      </div>
    </div>
  );
};

const CategoriesSection = () => {
  const categories = [
    {
      name: "Puree",
      imageUrl: "puree-category.jpg",
      description: "Premium fruit purees for smoothies, desserts, and more",
      link: "/category/puree"
    },
    {
      name: "Syrup",
      imageUrl: "syrup-category.jpg",
      description: "Delicious syrups for coffee, cocktails, and desserts",
      link: "/category/syrup"
    },
    {
      name: "Sauce",
      imageUrl: "sauce-category.jpg",
      description: "Rich sauces to enhance all your culinary creations",
      link: "/category/sauce"
    },
    {
      name: "Powder",
      imageUrl: "powder-category.jpg",
      description: "Versatile powders for baking and beverages",
      link: "/category/powder"
    },
    {
      name: "Spread",
      imageUrl: "spread-category.jpg",
      description: "Smooth spreads perfect for breakfast and desserts",
      link: "/category/spread"
    },
    {
      name: "Topping",
      imageUrl: "topping-category.jpg",
      description: "Decadent toppings for ice cream, desserts, and more",
      link: "/category/topping"
    }
  ];

  return (
    <section className="py-[100px]">
      <div className="container mx-auto px-[20px]">
        <div className="text-center mb-[60px]">
          <h2 className="font-dancing text-[84px] leading-[100px] text-center mb-[20px]">
            Our Categories
          </h2>
          <p className="font-montserrat text-[20px] leading-[30px] text-[#252B42] max-w-[780px] mx-auto">
            Explore our wide range of premium food products for all your culinary needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[30px]">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              name={category.name}
              imageUrl={category.imageUrl}
              description={category.description}
              link={category.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;