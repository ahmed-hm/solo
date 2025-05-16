'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation, useIsRTL } from '../../i18n/client';

// Import the images that were downloaded from Figma
import cafeFavorites from '@/assets/images/featured/cafe_favorites.jpg';
import floralInspired from '@/assets/images/featured/floral_inspired_flavors.jpg';
import nonAlcoholicSips1 from '@/assets/images/featured/non_alcoholic_sips_1.jpg';
import nonAlcoholicSips2 from '@/assets/images/featured/non_alcoholic_sips_2.jpg';

const FeaturedSection = ({ lng }: { lng: string }) => {
  const { t } = useTranslation(lng, 'common');
  const isRtl = useIsRTL(lng);

  return (
    <section className="w-full py-20">
      <div className={`container mx-auto px-4 flex flex-col items-start gap-[30px] ${isRtl ? 'rtl' : ''}`}>
        {/* Header */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <div className="w-5 h-10 rounded bg-[#DBB58F]"></div>
            <span className="font-['Dancing_Script'] font-semibold text-[64px] leading-[0.75em] tracking-[4%] text-[#DBB58F]">
              {t('featuredSection.title')}
            </span>
          </div>
          <span className="font-['Montserrat'] text-base font-bold text-3xl md:text-[30px] tracking-[4%] leading-[1.6em] text-black">
            {t('featuredSection.subtitle')}
          </span>
        </div>

        {/* Featured Cards Grid */}
        <div className="w-full hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[0.85fr_1.15fr] gap-[30px]">
          {/* First card - Café Favorites (Full Width) */}
          <div className="relative w-full h-[400px] md:h-[600px] rounded-[4px] overflow-hidden group">
            <Image src={cafeFavorites} alt={t('featuredSection.cafe')} fill className="object-cover" />
            <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-8">
              <div className="flex flex-col gap-4">
                <h3 className="font-['Dancing_Script'] font-semibold text-2xl md:text-[24px] leading-[1em] tracking-[3%] text-[#FAFAFA]">
                  {t('featuredSection.cafe')}
                </h3>
                <div className="flex flex-col">
                  <Link
                    href={`${lng}/blogs/turkish-salep`}
                    className="font-['Montserrat'] font-medium text-base md:text-[16px] leading-[1.5em] text-white hover:underline"
                  >
                    {t('featuredSection.discover')}
                  </Link>
                  <div className="w-full h-[1px] bg-white/50 mt-1"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Column with 2 smaller cards */}
          <div className="flex flex-col gap-[30px]">
            {/* Floral-inspired flavors card */}
            <div className="relative w-full h-[280px] rounded-[4px] overflow-hidden group">
              <Image src={floralInspired} alt={t('featuredSection.floral')} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-8">
                <div className="flex flex-col gap-4">
                  <h3 className="font-['Dancing_Script'] font-semibold text-2xl md:text-[24px] leading-[1em] tracking-[3%] text-[#FAFAFA]">
                    {t('featuredSection.floral')}
                  </h3>
                  <div className="flex flex-col">
                    <Link
                      href={`${lng}/blogs/pina-colada`}
                      className="font-['Montserrat'] font-medium text-base md:text-[16px] leading-[1.5em] text-white hover:underline"
                    >
                      {t('featuredSection.discover')}
                    </Link>
                    <div className="w-full h-[1px] bg-white/50 mt-1"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Row with Non-Alcoholic Sips cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
              {/* Non-Alcoholic Sips card 1 */}
              <div className="relative w-full h-[280px] rounded-[4px] overflow-hidden group">
                <Image src={nonAlcoholicSips1} alt={t('featuredSection.nonAlcoholic')} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-8">
                  <div className="flex flex-col gap-2">
                    <h3 className="font-['Dancing_Script'] font-semibold text-2xl md:text-[24px] leading-[1em] tracking-[3%] text-[#FAFAFA]">
                      {t('featuredSection.nonAlcoholic')}
                    </h3>
                    <div className="flex flex-col">
                      <Link
                        href={`${lng}/blogs/mojito-syrup`}
                        className="font-['Montserrat'] font-medium text-base md:text-[16px] leading-[1.5em] text-white hover:underline"
                      >
                        {t('featuredSection.discover')}
                      </Link>
                      <div className="w-full h-[1px] bg-white/50 mt-1"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Non-Alcoholic Sips card 2 (duplicate for the layout) */}
              <div className="relative w-full h-[280px] rounded-[4px] overflow-hidden group">
                <Image src={nonAlcoholicSips2} alt={t('featuredSection.nonAlcoholic')} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-8">
                  <div className="flex flex-col gap-2">
                    <h3 className="font-['Dancing_Script'] font-semibold text-2xl md:text-[24px] leading-[1em] tracking-[3%] text-[#FAFAFA]">
                      {t('featuredSection.nonAlcoholic')}
                    </h3>
                    <div className="flex flex-col">
                      <Link
                        href={`${lng}/blogs/mojito-syrup`}
                        className="font-['Montserrat'] font-medium text-base md:text-[16px] leading-[1.5em] text-white hover:underline"
                      >
                        {t('featuredSection.discover')}
                      </Link>
                      <div className="w-full h-[1px] bg-white/50 mt-1"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Featured Cards Grid - Scrollable Horizontally */}
        <div className="w-full block md:hidden overflow-x-auto pb-4 no-scrollbar">
          <div className={`flex space-x-4`} style={{ minWidth: 'min-content' }}>
            {/* First card - Café Favorites */}
            <div
              className="relative rounded-[4px] overflow-hidden flex-shrink-0"
              style={{ width: '240px', aspectRatio: '0.835' }}
            >
              <Image src={cafeFavorites} alt={t('featuredSection.cafe')} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-4">
                <div className="flex flex-col gap-2">
                  <h3 className="font-['Dancing_Script'] font-semibold text-xl leading-[1em] tracking-[3%] text-[#FAFAFA]">
                    {t('featuredSection.cafe')}
                  </h3>
                  <div className="flex flex-col">
                    <Link
                      href={`${lng}/blogs/turkish-salep`}
                      className="font-['Montserrat'] font-medium text-sm leading-[1.5em] text-white hover:underline"
                    >
                      {t('featuredSection.discover')}
                    </Link>
                    <div className="w-full h-[1px] bg-white/50 mt-1"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floral-inspired flavors card */}
            <div
              className="relative rounded-[4px] overflow-hidden flex-shrink-0"
              style={{ width: '240px', aspectRatio: '0.835' }}
            >
              <Image src={floralInspired} alt={t('featuredSection.floral')} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-4">
                <div className="flex flex-col gap-2">
                  <h3 className="font-['Dancing_Script'] font-semibold text-xl leading-[1em] tracking-[3%] text-[#FAFAFA]">
                    {t('featuredSection.floral')}
                  </h3>
                  <div className="flex flex-col">
                    <Link
                      href={`${lng}/blogs/pina-colada`}
                      className="font-['Montserrat'] font-medium text-sm leading-[1.5em] text-white hover:underline"
                    >
                      {t('featuredSection.discover')}
                    </Link>
                    <div className="w-full h-[1px] bg-white/50 mt-1"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Non-Alcoholic Sips card 1 */}
            <div
              className="relative rounded-[4px] overflow-hidden flex-shrink-0"
              style={{ width: '240px', aspectRatio: '0.835' }}
            >
              <Image src={nonAlcoholicSips1} alt={t('featuredSection.nonAlcoholic')} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-4">
                <div className="flex flex-col gap-2">
                  <h3 className="font-['Dancing_Script'] font-semibold text-xl leading-[1em] tracking-[3%] text-[#FAFAFA]">
                    {t('featuredSection.nonAlcoholic')}
                  </h3>
                  <div className="flex flex-col">
                    <Link
                      href={`${lng}/blogs/mojito-syrup`}
                      className="font-['Montserrat'] font-medium text-sm leading-[1.5em] text-white hover:underline"
                    >
                      {t('featuredSection.discover')}
                    </Link>
                    <div className="w-full h-[1px] bg-white/50 mt-1"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Non-Alcoholic Sips card 2 */}
            <div
              className="relative rounded-[4px] overflow-hidden flex-shrink-0"
              style={{ width: '240px', aspectRatio: '0.835' }}
            >
              <Image src={nonAlcoholicSips2} alt={t('featuredSection.nonAlcoholic')} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-4">
                <div className="flex flex-col gap-2">
                  <h3 className="font-['Dancing_Script'] font-semibold text-xl leading-[1em] tracking-[3%] text-[#FAFAFA]">
                    {t('featuredSection.nonAlcoholic')}
                  </h3>
                  <div className="flex flex-col">
                    <Link
                      href={`${lng}/blogs/mojito-syrup`}
                      className="font-['Montserrat'] font-medium text-sm leading-[1.5em] text-white hover:underline"
                    >
                      {t('featuredSection.discover')}
                    </Link>
                    <div className="w-full h-[1px] bg-white/50 mt-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Banner Changer - Raspberry Puree */}
        <div className="w-full relative rounded-[5px] overflow-show mt-10">
          {/* Desktop version - only visible on medium screens and up */}
          <div className="hidden md:block aspect-[3.14] relative">
            <div className="absolute inset-0">
              <Image src="/images/raspberry-bg.png" alt="Banner Background" fill className="object-cover" />
            </div>

            <div className={`absolute inset-0 flex items-center ${isRtl ? 'flex-row-reverse' : ''}`}>
              {/* Left side with raspberry image */}
              <div className="w-1/2 h-full relative flex items-center justify-end">
                <div className={`absolute bottom-[-80px] ${isRtl ? 'end-40' : 'start-40'} z-10`}>
                  <div className="relative w-[420px] h-[500px]">
                    <Image
                      src="/images/raspberry-puree.png"
                      alt={t('featuredSection.raspberryTitle')}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Content Section - Right side */}
              <div className="w-1/2 flex items-center">
                <div className="w-[512px] h-[366px] bg-[#B91635] rounded-[5px] flex items-center justify-center p-12">
                  <div className={`flex flex-col gap-[80px] w-[412px] ${isRtl ? 'text-right' : 'text-left'}`}>
                    <div className="w-full">
                      <h3 className="font-['Dancing_Script'] font-bold text-[50px] leading-[1.2em] tracking-[-1.2%] text-white mb-4">
                        {t('featuredSection.raspberryTitle')}
                      </h3>
                      <p className="font-['Montserrat'] font-normal text-[16px] leading-[1.22em] tracking-[-3.75%] text-white">
                        {t('featuredSection.raspberryDesc')}
                      </p>
                    </div>

                    <Link
                      href={`${lng}/blogs/watermelon-puree`}
                      className="bg-black text-white font-['Montserrat'] font-bold text-[24px] py-[10px] px-[28px] rounded-[28px] inline-block text-center hover:bg-black/90 transition-colors"
                    >
                      {t('featuredSection.learnMore')}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile version - only visible on small screens */}
          <div className="block md:hidden p-4">
            {/* Background image for mobile */}
            <div className="absolute inset-0">
              <Image src="/images/raspberry-bg-mobile.png" alt="Banner Background" fill className="object-cover" />
            </div>

            {/* Raspberry image without shadow effect - shifted more to the end */}
            <div
              className={`relative mx-auto w-full max-w-[280px] h-[340px] z-10 flex ${
                isRtl ? 'justify-start pe-10' : 'justify-end ps-10'
              }`}
            >
              <div className="relative w-[280px] h-[340px]">
                <Image
                  src="/images/raspberry-puree.png"
                  alt={t('featuredSection.raspberryTitle')}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Content box for mobile */}
            <div className="w-full max-w-[384px] mx-auto bg-[#B91635] rounded-[15px] flex items-center justify-center p-4 -mt-6 relative z-0">
              <div
                className={`flex flex-col gap-[16px] w-full max-w-[309px] py-4 ${isRtl ? 'text-right' : 'text-left'}`}
              >
                <div className="w-full">
                  <h3 className="font-['Dancing_Script'] font-bold text-[37px] leading-[1.2em] tracking-[-1.2%] text-white mb-3">
                    {t('featuredSection.raspberryTitle')}
                  </h3>
                  <p className="font-['Montserrat'] font-normal text-[12px] leading-[1.22em] tracking-[-3.75%] text-white">
                    {t('featuredSection.raspberryDesc')}
                  </p>
                </div>

                <Link
                  href={`${lng}/blogs/watermelon-puree`}
                  className={`bg-black text-white font-['Montserrat'] font-bold text-[21px] py-[8px] px-[21px] rounded-[21px] text-center hover:bg-black/90 transition-colors self-start mx-auto ${
                    isRtl ? 'self-end' : 'self-start'
                  }`}
                >
                  {t('featuredSection.learnMore')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
