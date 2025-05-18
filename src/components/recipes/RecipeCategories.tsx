'use client';

import recipeData from '@/data/recipes.json';
import { useIsRTL, useTranslation } from '@/i18n/client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface RecipeCategoriesProps {
  lng: string;
}

const RecipeCategories = ({ lng }: RecipeCategoriesProps) => {
  const { t } = useTranslation(lng);
  const isRtl = useIsRTL(lng);
  const [categories] = useState(recipeData.categories);

  return (
    <section className="w-full py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10 md:mb-16">
          <h1 className="font-['Dancing_Script'] font-semibold text-[42px] md:text-[84px] leading-[1.2em] text-black mb-2 md:mb-4">
            {t('recipes.title', 'Recipes')}
          </h1>
        </div>

        {/* Recipe Categories */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 ${isRtl ? 'directionRTL' : ''}`}>
          {categories.map((category) => (
            <div key={category.id} className="flex flex-col items-center text-center">
              <Link href={`/${lng}/recipes/${category.id}`} className="group transition-all duration-300">
                <div className="relative w-[160px] h-[160px] md:w-[220px] md:h-[220px] mx-auto mb-3 md:mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={category.imageUrl}
                    alt={isRtl ? category.nameAr : category.name}
                    fill
                    className="object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <span className="font-['Montserrat'] font-bold text-base md:text-[22px] text-black mb-1">
                  {isRtl ? category.nameAr : category.name}
                </span>
                {/* Maintain space but remove text content */}
                <div className="font-['Montserrat'] text-sm md:text-base text-gray-600 px-2 h-[3em] md:h-[3.2em]">
                  &nbsp;
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecipeCategories;
