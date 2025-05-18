'use client';

import { useTranslation, useIsRTL } from '@/i18n/client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import recipeData from '@/data/recipes.json';
import Pagination from '@/components/recipes/Pagination';
import Breadcrumb from '@/components/layout/Breadcrumb';
import MobileFilterOverlay from '@/components/recipes/MobileFilterOverlay';

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
  beverageType: string;
  servedHow: string;
  flavorType: string;
  glassType: string;
  detailedIngredients: {
    [key: string]: string[]; // This allows for different size variations like '9oz', '12oz', '16oz'
  };
  detailedIngredientsAr: {
    [key: string]: string[];
  };
  preparationMethod: string;
  preparationMethodAr: string;
}

interface PageProps {
  params: Promise<{
    lng: string;
    category: string;
  }>;
}

export default function RecipeCategoryPage({ params }: PageProps) {
  // Unwrap params using React.use()
  const { lng, category } = React.use(params);

  const { t } = useTranslation(lng);
  const isRtl = useIsRTL(lng);
  const router = useRouter();

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [categoryInfo, setCategoryInfo] = useState<Category | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const recipesPerPage = 12;
  const [selectedBeverageType, setSelectedBeverageType] = useState('');
  const [selectedServed, setSelectedServed] = useState('');
  const [selectedFlavor, setSelectedFlavor] = useState('');
  const [selectedGlass, setSelectedGlass] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    // Find category info
    const categoryData = recipeData.categories.find((c) => c.id === category);
    if (!categoryData) {
      // Category not found, redirect to recipes page
      router.push(`/${lng}/recipes`);
      return;
    }
    setCategoryInfo(categoryData);

    // Get recipes for this category
    const categoryRecipes = recipeData.recipes[category as keyof typeof recipeData.recipes] || [];
    setRecipes(categoryRecipes);
    setFilteredRecipes(categoryRecipes);

    // Calculate total pages
    setTotalPages(Math.ceil(categoryRecipes.length / recipesPerPage));
  }, [category, lng, router]);

  // Apply filters
  useEffect(() => {
    let result = [...recipes];

    if (selectedBeverageType) {
      result = result.filter((recipe) => recipe.beverageType === selectedBeverageType);
    }

    if (selectedServed) {
      result = result.filter((recipe) => recipe.servedHow === selectedServed);
    }

    if (selectedFlavor) {
      result = result.filter((recipe) => recipe.flavorType === selectedFlavor);
    }

    if (selectedGlass) {
      result = result.filter((recipe) => recipe.glassType === selectedGlass);
    }

    setFilteredRecipes(result);
    setTotalPages(Math.ceil(result.length / recipesPerPage));
    setCurrentPage(1); // Reset to first page when filters change
  }, [recipes, selectedBeverageType, selectedServed, selectedFlavor, selectedGlass]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setSelectedBeverageType('');
    setSelectedServed('');
    setSelectedFlavor('');
    setSelectedGlass('');
    setFilteredRecipes(recipes);
    setCurrentPage(1);
  };

  const handleFilterChange = (filterType: string, value: string) => {
    switch (filterType) {
      case 'beverageType':
        setSelectedBeverageType(value);
        break;
      case 'servedHow':
        setSelectedServed(value);
        break;
      case 'flavorType':
        setSelectedFlavor(value);
        break;
      case 'glassType':
        setSelectedGlass(value);
        break;
    }
  };

  const handleApplyFilters = () => {
    setIsMobileFilterOpen(false);
    // Filters are already applied through useEffect
  };

  const handleMobileResetFilters = () => {
    handleReset();
    setIsMobileFilterOpen(false);
  };

  // Get current page recipes
  const getCurrentPageRecipes = () => {
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    return filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  };

  if (!categoryInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#DBB58F]"></div>
      </div>
    );
  }

  // Prepare breadcrumb items
  const breadcrumbItems = [
    { label: t('nav.home', 'Home'), href: `/${lng}` },
    { label: t('recipes.title', 'Recipes'), href: `/${lng}/recipes` },
    { label: isRtl ? categoryInfo.nameAr : categoryInfo.name },
  ];

  return (
    <main className="min-h-screen py-12 flex flex-col items-center">
      {/* Mobile Filter Overlay */}
      <MobileFilterOverlay
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        lng={lng}
        filters={{
          beverageType: selectedBeverageType,
          servedHow: selectedServed,
          flavorType: selectedFlavor,
          glassType: selectedGlass,
        }}
        onFilterChange={handleFilterChange}
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleMobileResetFilters}
      />

      {/* Breadcrumb Navigation */}
      <div className="w-full max-w-7xl px-4 mb-8">
        <Breadcrumb items={breadcrumbItems} lng={lng} style="blog" className="mb-8" />
      </div>

      {/* Header Section */}
      <div className="w-full max-w-7xl px-4 mb-12">
        <div className="flex flex-col">
          <h1 className="font-['Dancing_Script'] font-semibold text-[42px] md:text-[84px] leading-[1.2em] text-black mb-4">
            {isRtl ? categoryInfo.nameAr : categoryInfo.name}
          </h1>
          <p className="font-['Montserrat'] font-semibold text-base md:text-2xl text-black max-w-4xl leading-[1.22em]">
            {t('recipes.chooseText', 'Choose Solo for great flavors')}
          </p>
          <p className="font-['Montserrat'] text-base md:text-xl text-black max-w-4xl mt-4 leading-[1.22em]">
            {t(
              'recipes.descriptionText',
              'Our flavors are well-balanced, full-flavored, and memorable— without that lingering artificial aftertaste— perfect for your beverages.'
            )}
          </p>
        </div>
      </div>

      {/* Filter Row */}
      <div className="w-full max-w-7xl p-4 mb-12 bg-white">
        {/* Mobile Filter Button - Only visible on mobile */}
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="md:hidden flex items-center justify-center gap-2 w-full py-3 mb-4 bg-gray-100 rounded-md text-black font-medium"
        >
          {t('recipes.filters.filterRecipes', 'Filter Recipes')}
          <svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2.81836 0.564697L7.81836 5.5647L12.8184 0.564697L14.8184 1.5647L7.81836 8.5647L0.818359 1.5647L2.81836 0.564697Z"
              fill="black"
            />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
          <div className="text-black font-['Montserrat'] font-bold text-sm">
            {t('recipes.showingResults', 'Showing all')} {filteredRecipes.length} {t('recipes.results', 'results')}
          </div>
          {/* Desktop Filters - Hidden on mobile */}
          <div className="hidden md:flex flex-wrap gap-3">
            <div className="border border-[#DBB58F] rounded-md px-4 py-2">
              <select
                className="text-sm font-['Montserrat'] text-black bg-white cursor-pointer min-w-[140px]"
                value={selectedBeverageType}
                onChange={(e) => setSelectedBeverageType(e.target.value)}
              >
                <option value="">{t('recipes.filters.beverageType', 'Beverage Type')}</option>
                <option value="blended cold">{t('recipes.filters.blendedCold', 'Blended Cold')}</option>
                <option value="hot">{t('recipes.filters.hot', 'Hot')}</option>
                <option value="cold mixed">{t('recipes.filters.coldMixed', 'Cold Mixed')}</option>
              </select>
            </div>

            <div className="border border-[#DBB58F] rounded-md px-4 py-2">
              <select
                className="text-sm font-['Montserrat'] text-black bg-white cursor-pointer min-w-[140px]"
                value={selectedServed}
                onChange={(e) => setSelectedServed(e.target.value)}
              >
                <option value="">{t('recipes.filters.servedHow', 'Served How')}</option>
                <option value="in a blender">{t('recipes.filters.inBlender', 'In a Blender')}</option>
                <option value="in a mug">{t('recipes.filters.inMug', 'In a Mug')}</option>
                <option value="in a cup with ice">{t('recipes.filters.inCupWithIce', 'In a Cup with Ice')}</option>
              </select>
            </div>

            <div className="border border-[#DBB58F] rounded-md px-4 py-2">
              <select
                className="text-sm font-['Montserrat'] text-black bg-white cursor-pointer min-w-[140px]"
                value={selectedFlavor}
                onChange={(e) => setSelectedFlavor(e.target.value)}
              >
                <option value="">{t('recipes.filters.flavorType', 'Flavor Type')}</option>
                <option value="berry">{t('recipes.filters.berry', 'Berry')}</option>
                <option value="tropical">{t('recipes.filters.tropical', 'Tropical')}</option>
                <option value="citrus">{t('recipes.filters.citrus', 'Citrus')}</option>
                <option value="chocolate">{t('recipes.filters.chocolate', 'Chocolate')}</option>
                <option value="white chocolate">{t('recipes.filters.whiteChocolate', 'White Chocolate')}</option>
                <option value="caramel">{t('recipes.filters.caramel', 'Caramel')}</option>
                <option value="coffee">{t('recipes.filters.coffee', 'Coffee')}</option>
                <option value="tea/herbal">{t('recipes.filters.teaHerbal', 'Tea/Herbal')}</option>
                <option value="specialty">{t('recipes.filters.specialty', 'Specialty')}</option>
              </select>
            </div>

            <div className="border border-[#DBB58F] rounded-md px-4 py-2">
              <select
                className="text-sm font-['Montserrat'] text-black bg-white cursor-pointer min-w-[140px]"
                value={selectedGlass}
                onChange={(e) => setSelectedGlass(e.target.value)}
              >
                <option value="">{t('recipes.filters.glassType', 'Glass Type')}</option>
                <option value="blender cup">{t('recipes.filters.blenderCup', 'Blender Cup')}</option>
                <option value="mug">{t('recipes.filters.mug', 'Mug')}</option>
                <option value="highball glass">{t('recipes.filters.highballGlass', 'Highball Glass')}</option>
              </select>
            </div>

            <button
              onClick={handleReset}
              className="bg-[#DBB58F] text-white font-bold text-sm px-5 py-2 rounded-md hover:bg-[#c9a57f] transition-colors"
            >
              {t('recipes.filters.reset', 'Reset Filters')}
            </button>
          </div>
        </div>
      </div>

      {/* Recipe Grid */}
      <div className="w-full max-w-7xl px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {getCurrentPageRecipes().map((recipe) => (
            <div key={recipe.id} className="flex flex-col items-center">
              <Link href={`/${lng}/recipes/${category}/${recipe.id}`} className="group">
                <div className="relative w-[273px] h-[273px] rounded-md overflow-hidden mb-5">
                  <Image
                    src={recipe.imageUrl}
                    alt={isRtl ? recipe.nameAr : recipe.name}
                    fill
                    className="object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-['Montserrat'] font-bold text-xl md:text-2xl text-black text-center tracking-tight leading-tight">
                  {isRtl ? recipe.nameAr : recipe.name}
                </h3>
              </Link>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} lng={lng} />
          </div>
        )}
      </div>
    </main>
  );
}
