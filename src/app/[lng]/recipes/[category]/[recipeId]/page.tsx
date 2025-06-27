'use client';

import Breadcrumb from '@/components/layout/Breadcrumb';
import recipesData from '@/data/recipes.json';
import { useIsRTL, useTranslation } from '@/i18n/client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface PageProps {
  params: Promise<{
    lng: string;
    category: string;
    recipeId: string;
  }>;
}

interface Category {
  id: string;
  name: string;
  nameAr: string;
  imageUrl: string;
  description: string;
  descriptionAr: string;
}

interface Recipe {
  id: string;
  name: string;
  nameAr: string;
  imageUrl: string;
  ingredients: string[];
  ingredientsAr: string[];
  trending: boolean;
  detailedIngredients?: {
    '9oz'?: string[];
    '12oz'?: string[];
    '16oz'?: string[];
  };
  detailedIngredientsAr?: {
    '9oz'?: string[];
    '12oz'?: string[];
    '16oz'?: string[];
  };
}

export default function RecipeDetailPage({ params }: PageProps) {
  const { lng, category, recipeId } = React.use(params);

  const { t } = useTranslation(lng);
  const isRtl = useIsRTL(lng);
  const router = useRouter();

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [categoryInfo, setCategoryInfo] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<'12oz' | '16oz'>('12oz');

  useEffect(() => {
    // Find category info
    const categoryData = recipesData.categories.find((c) => c.id === category);
    if (!categoryData) {
      // Category not found, redirect to recipes page
      router.push(`/${lng}/recipes`);
      return;
    }
    setCategoryInfo(categoryData);

    // Get recipes for this category
    const categoryRecipes = recipesData.recipes[category as keyof typeof recipesData.recipes] || [];
    const recipeData = categoryRecipes.find((r) => r.id === recipeId);

    if (!recipeData) {
      // Recipe not found, redirect to category page
      router.push(`/${lng}/recipes/${category}`);
      return;
    }

    setRecipe(recipeData);
    setLoading(false);
  }, [category, recipeId, lng, router]);

  const handlePrintRecipe = () => {
    window.print();
  };

  if (loading || !recipe || !categoryInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#DBB58F]"></div>
      </div>
    );
  }

  // Instructions are manually added since they're not in the data
  const instructions = [
    t('recipes.instructions.add_ingredients', 'Add all ingredients to the blender together.'),
    `${t('recipes.instructions.glassware', 'Glassware')} ${selectedSize === '12oz' ? '12 oz' : '16 oz'} ${t(
      'recipes.instructions.cup',
      'cup'
    )}`,
  ];

  // Prepare breadcrumb items
  const breadcrumbItems = [
    { label: t('nav.home', 'Home'), href: `/${lng}` },
    { label: t('recipes.title', 'Recipes'), href: `/${lng}/recipes` },
    { label: isRtl ? categoryInfo.nameAr : categoryInfo.name, href: `/${lng}/recipes/${category}` },
    { label: isRtl ? recipe.nameAr : recipe.name },
  ];

  return (
    <main className="min-h-screen py-12 bg-[#FAFAFA]">
      <div className="container mx-auto px-4">
        {/* Use the reusable Breadcrumb component */}
        <div className="print:hidden">
          <Breadcrumb items={breadcrumbItems} lng={lng} style="blog" className="mb-8" />
        </div>

        {/* Recipe Content - Product Card Style */}
        <div className="bg-white rounded-lg overflow-hidden print:shadow-none print:rounded-none">
          {/* Print-only attribution header */}
          <div className="hidden print:block border-b border-gray-200 pb-3 mb-4">
            <div className="text-center">
              <h2 className="font-['Montserrat'] font-bold text-lg text-black mb-1">
                {t('title', 'Solo Sauce')}
              </h2>
              <p className="font-['Montserrat'] text-sm text-gray-600">
                {t('recipes.printedFrom', 'Printed from')} www.solo-sauce.com
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 print:grid-cols-2">
            {/* Recipe Image */}
            <div className="relative aspect-square bg-white print:aspect-auto print:h-64">
              <Image
                src={recipe.imageUrl}
                alt={isRtl ? recipe.nameAr : recipe.name}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Recipe Details */}
            <div className="flex flex-col p-4 md:p-6 gap-4 print:p-6">
              <span className="font-['Montserrat'] font-bold text-3xl md:text-4xl text-black print:text-2xl">
                {isRtl ? recipe.nameAr : recipe.name}
              </span>

              {/* Size Options */}
              <div className="flex items-center gap-4 print:mb-4">
                {/* Print-only selected size indicator */}
                <div className="hidden print:block">
                  <span className="font-['Montserrat'] font-medium text-base text-black">
                    {t('recipes.selectedSize', 'Selected Size:')} {selectedSize === '12oz' ? '12 OZ' : '16 OZ'}
                  </span>
                </div>

                {/* Interactive radio buttons - hidden in print */}
                <div className="print:hidden flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-full border ${
                        selectedSize === '12oz' ? 'border-[#DBB58F] bg-white' : 'border-[#E4E4E4] bg-[#E4E4E4]'
                      }`}
                      onClick={() => setSelectedSize('12oz')}
                      role="radio"
                      aria-checked={selectedSize === '12oz'}
                    >
                      {selectedSize === '12oz' && (
                        <div className="w-2 h-2 mx-auto my-[3px] rounded-full bg-[#DBB58F]"></div>
                      )}
                    </div>
                    <span className="font-['Montserrat'] text-base text-black">12 OZ</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-full border ${
                        selectedSize === '16oz' ? 'border-[#DBB58F] bg-white' : 'border-[#E4E4E4] bg-[#E4E4E4]'
                      }`}
                      onClick={() => setSelectedSize('16oz')}
                      role="radio"
                      aria-checked={selectedSize === '16oz'}
                    >
                      {selectedSize === '16oz' && (
                        <div className="w-2 h-2 mx-auto my-[3px] rounded-full bg-[#DBB58F]"></div>
                      )}
                    </div>
                    <span className="font-['Montserrat'] text-base text-black">16 OZ</span>
                  </div>
                </div>
              </div>

              {/* Ingredients */}
              <div className="mt-2">
                <h3 className="font-['Montserrat'] font-medium text-base text-black mb-2 print:block hidden">
                  {t('recipes.ingredients', 'Ingredients:')}
                </h3>
                <div className="font-['Montserrat'] text-sm text-black">
                  <ul className="list-disc pl-5 space-y-1">
                    {recipe.detailedIngredients &&
                      (isRtl
                        ? recipe.detailedIngredientsAr?.[selectedSize]
                        : recipe.detailedIngredients[selectedSize]
                      )?.map((ingredient: string, index: number) => (
                        <li key={index} className="font-['Montserrat'] leading-relaxed tracking-wide">
                          {ingredient}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>

              {/* Instructions */}
              <div className="mt-2">
                <div className="font-['Montserrat'] text-sm text-black">
                  <p className="font-medium mb-2">{t('recipes.instructions.title', 'Instructions:')}</p>
                  {instructions.map((instruction, index) => (
                    <p key={index} className="leading-relaxed tracking-wide">
                      {instruction}
                    </p>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 flex flex-wrap gap-4 print:hidden">
                <button
                  onClick={handlePrintRecipe}
                  className="inline-flex items-center justify-center px-5 py-3 bg-[#DBB58F] text-white font-['Montserrat'] font-bold text-sm rounded-md hover:bg-[#c9a57f] transition-colors duration-300"
                >
                  {t('recipes.printSave', 'Print and Save Recipe')}
                </button>

                <Link
                  href={`/${lng}/recipes/${category}`}
                  className="inline-flex items-center justify-center px-5 py-3 border border-[#DBB58F] text-[#DBB58F] font-['Montserrat'] font-medium text-sm rounded-md hover:bg-[#f8f3ee] transition-colors duration-300"
                >
                  {t('recipes.backToCategory', 'Back to all recipes')}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-12 py-8 print:hidden">
          <div className="container mx-auto">
            <div className="mb-8">
              <span className="font-['Montserrat'] font-bold text-2xl md:text-3xl text-black">
                {t('recipes.relatedProducts', 'Related Products to this item')}
              </span>
            </div>

            {/* Get related products from the same category (limit to 4) */}
            {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
              {recipesData.recipes[category as keyof typeof recipesData.recipes]
                .filter((r) => r.id !== recipeId)
                .slice(0, 4)
                .map((relatedRecipe) => (
                  <Link
                    href={`/${lng}/recipes/${category}/${relatedRecipe.id}`}
                    key={relatedRecipe.id}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col items-center">
                      <div className="relative w-full aspect-square">
                        <Image
                          src={relatedRecipe.imageUrl}
                          alt={isRtl ? relatedRecipe.nameAr : relatedRecipe.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="p-4 text-center">
                        <h4 className="font-['Montserrat'] font-bold text-lg text-black">
                          {isRtl ? relatedRecipe.nameAr : relatedRecipe.name}
                        </h4>
                      </div>
                    </div>
                  </Link>
                ))}
            </div> */}
          </div>
        </div>
      </div>
    </main>
  );
}
