'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslation } from '../../i18n/client';
import Link from 'next/link';

interface ProductsSectionProps {
  lng: string;
}

const ProductsSection: React.FC<ProductsSectionProps> = ({ lng }) => {
  const { t } = useTranslation(lng);

  return (
    <section className="w-full py-20">
      <div className="container mx-auto px-4 flex flex-col items-center gap-[30px]">
        {/* Heading section */}
        <div className="flex flex-col items-center gap-[10px] max-w-[1176px]">
          <h2 className="font-['Dancing_Script'] font-semibold text-5xl md:text-7xl lg:text-[84px] leading-[1.2] text-black text-center">
            {t('products.welcome', 'Welcome to Solo World')}
          </h2>
          <p className="text-lg md:text-2xl lg:text-[25px] leading-[1.219] text-black text-center w-full">
            {t(
              'products.welcome_description',
              'Where premium quality meets boundless creativity. Crafting syrups, purees, sauces, and toppings that elevate every sip and culinary creation.'
            )}
          </p>
        </div>

        {/* Call to action button */}
        <Link href={`/${lng}/recipes`}>
          <button className="border border-[#0D0D0D] px-8 py-3 mt-2 cursor-pointer">
            <span className="font-['Montserrat'] font-bold text-base tracking-[-2.5%] text-[#0D0D0D]">
              {t('products.view_all', 'View All')}
            </span>
          </button>
        </Link>

        {/* Product images - Mobile: horizontal scroll, Desktop: staggered layout */}
        <div className="relative w-full max-w-[1350px]">
          {/* Mobile view with horizontal scroll */}
          <div className="md:hidden w-full overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 pb-4 ps-4 w-max">
              <div className="h-auto w-[280px] relative overflow-hidden" style={{ aspectRatio: '0.824' }}>
                <Image
                  src="/images/video-thumbnail-1.jpg"
                  alt={t('products.product_thumbnail', 'Solo product')}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="h-auto w-[280px] relative overflow-hidden" style={{ aspectRatio: '0.824' }}>
                <Image
                  src="/images/video-thumbnail-2.jpg"
                  alt={t('products.product_thumbnail', 'Solo product')}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="h-auto w-[280px] relative overflow-hidden" style={{ aspectRatio: '0.824' }}>
                <Image
                  src="/images/video-thumbnail-1.jpg"
                  alt={t('products.product_thumbnail', 'Solo product')}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Desktop view (original implementation) */}
          <div className="hidden md:flex justify-center items-start w-full">
            {/* First image - positioned lower */}
            <div className="h-[521px] w-[60%] aspect-[1/1] relative overflow-hidden mt-[80px]">
              <Image
                src="/images/video-thumbnail-1.jpg"
                alt={t('products.product_thumbnail', 'Solo product')}
                fill
                className="object-cover"
              />
            </div>

            {/* Middle image - elevated */}
            <div className="h-[521px] w-[60%] aspect-[1/1] relative overflow-hidden mx-[3%] z-10">
              <Image
                src="/images/video-thumbnail-2.jpg"
                alt={t('products.product_thumbnail', 'Solo product')}
                fill
                className="object-cover"
              />
            </div>

            {/* Third image - positioned lower */}
            <div className="h-[521px] w-[60%] aspect-[1/1] relative overflow-hidden mt-[80px]">
              <Image
                src="/images/video-thumbnail-1.jpg"
                alt={t('products.product_thumbnail', 'Solo product')}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
