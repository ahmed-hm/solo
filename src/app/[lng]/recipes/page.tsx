'use client';

import RecipeCategories from '@/components/recipes/RecipeCategories';
import TrendyRecipes from '@/components/recipes/TrendyRecipes';
import React from 'react';

interface PageProps {
  params: Promise<{
    lng: string;
  }>;
}

export default function RecipesPage({ params }: PageProps) {
  // Unwrap params using React.use()
  const { lng } = React.use(params);

  return (
    <main className="min-h-screen">
      {/* Trendy Recipes Section */}
      <TrendyRecipes lng={lng} />

      {/* Recipe Categories Section with pagination */}
      <RecipeCategories lng={lng} />
    </main>
  );
}
