'use client';

import React from 'react';
import { useTranslation } from '@/i18n/client';

interface MobileFilterOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  lng: string;
  filters: {
    beverageType: string;
    servedHow: string;
    flavorType: string;
    glassType: string;
  };
  onFilterChange: (filterType: string, value: string) => void;
  onApplyFilters: () => void;
  onResetFilters: () => void;
}

const MobileFilterOverlay: React.FC<MobileFilterOverlayProps> = ({
  isOpen,
  onClose,
  lng,
  filters,
  onFilterChange,
  onApplyFilters,
  onResetFilters,
}) => {
  const { t } = useTranslation(lng);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
      <div className="bg-white h-full w-full sm:max-w-[295px] ml-auto flex flex-col animate-slide-in-right">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="font-['Dancing_Script'] font-semibold text-3xl text-black">
            {t('recipes.filters.title', 'Filter')}
          </h2>
          <button onClick={onClose} className="text-black text-2xl font-bold">
            ✕
          </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          <h3 className="font-['Montserrat'] text-xl text-black mb-6">{t('recipes.filters.filterBy', 'Filter By')}</h3>

          <div className="flex flex-col space-y-6">
            {/* Beverage Type Filter */}
            <div className="border border-[#DBB58F] rounded-md px-4 py-4">
              <select
                className="w-full text-sm font-['Montserrat'] text-black bg-white cursor-pointer"
                value={filters.beverageType}
                onChange={(e) => onFilterChange('beverageType', e.target.value)}
              >
                <option value="">{t('recipes.filters.beverageType', 'Beverage Type')}</option>
                <option value="blended cold">{t('recipes.filters.blendedCold', 'Blended Cold')}</option>
                <option value="hot">{t('recipes.filters.hot', 'Hot')}</option>
                <option value="cold mixed">{t('recipes.filters.coldMixed', 'Cold Mixed')}</option>
              </select>
            </div>

            {/* Served How Filter */}
            <div className="border border-[#DBB58F] rounded-md px-4 py-4">
              <select
                className="w-full text-sm font-['Montserrat'] text-black bg-white cursor-pointer"
                value={filters.servedHow}
                onChange={(e) => onFilterChange('servedHow', e.target.value)}
              >
                <option value="">{t('recipes.filters.servedHow', 'Served How')}</option>
                <option value="in a blender">{t('recipes.filters.inBlender', 'In a Blender')}</option>
                <option value="in a mug">{t('recipes.filters.inMug', 'In a Mug')}</option>
                <option value="in a cup with ice">{t('recipes.filters.inCupWithIce', 'In a Cup with Ice')}</option>
              </select>
            </div>

            {/* Solo Flavors (Flavor Type) Filter */}
            <div className="border border-[#DBB58F] rounded-md px-4 py-4">
              <select
                className="w-full text-sm font-['Montserrat'] text-black bg-white cursor-pointer"
                value={filters.flavorType}
                onChange={(e) => onFilterChange('flavorType', e.target.value)}
              >
                <option value="">{t('recipes.filters.flavorType', 'Solo Flavors')}</option>
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

            {/* Glass Type Filter */}
            <div className="border border-[#DBB58F] rounded-md px-4 py-4">
              <select
                className="w-full text-sm font-['Montserrat'] text-black bg-white cursor-pointer"
                value={filters.glassType}
                onChange={(e) => onFilterChange('glassType', e.target.value)}
              >
                <option value="">{t('recipes.filters.glassType', 'Glass')}</option>
                <option value="blender cup">{t('recipes.filters.blenderCup', 'Blender Cup')}</option>
                <option value="mug">{t('recipes.filters.mug', 'Mug')}</option>
                <option value="highball glass">{t('recipes.filters.highballGlass', 'Highball Glass')}</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-6 pt-3 border-t border-gray-100">
          <div className="flex flex-row space-x-3">
            <button
              onClick={onApplyFilters}
              className="flex-1 bg-[#DBB58F] text-white font-bold text-lg py-4 rounded-md hover:bg-[#c9a57f] transition-colors"
            >
              {t('recipes.filters.apply', 'Apply')}
            </button>
            <button
              onClick={onResetFilters}
              className="flex-1 bg-black text-white font-bold text-lg py-4 rounded-md hover:bg-gray-800 transition-colors"
            >
              {t('recipes.filters.clearAll', 'Clear All')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileFilterOverlay;
