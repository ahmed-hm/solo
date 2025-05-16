import React from 'react';
import Image from 'next/image';
import { getTranslation } from '@/i18n/server';

export default async function SoloCorePageComponent({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = await params;
  const { t } = await getTranslation(lng, 'common');

  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section based on Figma design */}
      <section className="relative w-full">
        <div className="relative w-full h-[500px]">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/solo-core/solo-core-bg.jpg"
              alt={t('soloCore.hero.imageAlt')}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
            {/* Dark Overlay - matches the Figma gradient filter */}
            <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-50"></div>
          </div>

          {/* Content Container */}
          <div className="relative z-10 max-w-[1050px] mx-auto flex flex-col items-center justify-center h-full px-4 py-[112px]">
            <div className="flex flex-col items-center px-6 py-10 md:px-[80px] md:py-[80px] gap-[30px] border-[3px] border-[#ECECEC]">
              <div className="flex flex-col items-center gap-[10px]">
                <h1 className="font-['Montserrat'] font-bold text-3xl md:text-[40px] text-center text-white leading-tight tracking-[0.2px]">
                  {t('soloCore.hero.title')}
                </h1>
                <p className="font-['Montserrat'] font-bold text-sm text-white text-center max-w-[800px] leading-[1.43] tracking-[0.2px] mt-4">
                  {t('soloCore.hero.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="w-full py-16">
        <div className="max-w-[1080px] mx-auto">
          {/* Desktop View */}
          <div className="hidden md:flex md:flex-row justify-center gap-8 md:gap-[215px] px-4">
            {/* Left Column - Text and Image */}
            <div className="flex flex-col gap-[80px] py-6 flex-1 max-w-[50%]">
              <div className="flex flex-col gap-6 w-full">
                <h2 className="font-['Montserrat'] font-bold text-3xl md:text-[40px] text-black leading-tight tracking-[0.2px]">
                  {t('soloCore.mission.title')}
                </h2>
                <p className="font-['Montserrat'] font-normal text-sm text-black leading-[1.43] tracking-[0.2px]">
                  {t('soloCore.mission.description')}
                </p>
              </div>
              <div className="relative w-full aspect-[0.759] rounded-2xl overflow-hidden">
                <Image
                  src="/images/solo-core/mission-image-1.jpg"
                  alt={t('soloCore.mission.imageAlt')}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="relative flex-1 max-w-[50%] aspect-[0.759] rounded-xl overflow-hidden mb-32">
              <Image
                src="/images/solo-core/mission-image-2.jpg"
                alt={t('soloCore.mission.imageAlt')}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
          
          {/* Mobile View */}
          <div className="flex flex-col md:hidden px-4">
            <div className="flex flex-col gap-[15px] mb-[15px]">
              <h2 className="font-['Montserrat'] font-bold text-[40px] text-black leading-[1.22] tracking-[0.24%]">
                {t('soloCore.mission.title')}
              </h2>
              <p className="font-['Montserrat'] font-normal text-[14.7px] text-black leading-[1.22] tracking-[0.65%]">
                {t('soloCore.mission.description')}
              </p>
            </div>
            
            {/* Updated: Images side by side instead of stacked */}
            <div className="flex flex-row gap-[15px]">
              <div className="relative w-1/2 aspect-[0.759] rounded-[7.6px] overflow-hidden">
                <Image
                  src="/images/solo-core/mission-image-1.jpg"
                  alt={t('soloCore.mission.imageAlt')}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="relative w-1/2 aspect-[0.759] rounded-[4.75px] overflow-hidden">
                <Image
                  src="/images/solo-core/mission-image-2.jpg"
                  alt={t('soloCore.mission.imageAlt')}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="w-full py-16 bg-white">
        <div className="max-w-[1080px] mx-auto">
          {/* Desktop View */}
          <div className="hidden md:flex md:flex-row justify-center gap-8 md:gap-[60px] px-4">
            {/* Left Column - Images */}
            <div className="flex-1 max-w-[50%]">
              <div className="flex flex-row gap-16 h-[670px]">
                <div className="relative flex-1 rounded-[10px] overflow-hidden">
                  <Image
                    src="/images/solo-core/vision-image-1.jpg"
                    alt={t('soloCore.vision.imageAlt')}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="relative flex-1 rounded-[10px] overflow-hidden">
                  <Image
                    src="/images/solo-core/vision-image-2.jpg"
                    alt={t('soloCore.vision.imageAlt')}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Text and Image */}
            <div className="flex flex-col gap-[80px] py-6 flex-1 max-w-[50%]">
              <div className="flex flex-col gap-6 w-full max-w-[381px]">
                <h2 className="font-['Montserrat'] font-bold text-3xl md:text-[40px] text-black leading-tight tracking-[0.2px]">
                  {t('soloCore.vision.title')}
                </h2>
                <p className="font-['Montserrat'] font-normal text-sm text-black leading-[1.43] tracking-[0.2px]">
                  {t('soloCore.vision.description')}
                </p>
              </div>
              <div className="relative w-full aspect-[0.759] rounded-[16px] overflow-hidden">
                <Image
                  src="/images/solo-core/vision-image-3.jpg"
                  alt={t('soloCore.vision.imageAlt')}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
          
          {/* Mobile View */}
          <div className="flex flex-col md:hidden px-4">
            <div className="flex flex-col gap-[15px] mb-[15px]">
              <h2 className="font-['Montserrat'] font-bold text-[40px] text-black leading-[1.22] tracking-[0.52%]">
                {t('soloCore.vision.title')}
              </h2>
              <p className="font-['Montserrat'] font-normal text-[14.7px] text-black leading-[1.43] tracking-[1.43%]">
                {t('soloCore.vision.description')}
              </p>
            </div>
            
            {/* Mobile horizontal scrolling image container */}
            <div className="flex flex-row overflow-x-auto gap-[15px] w-full pb-4 scrollbar-hide">
              <div className="relative min-w-[300px] rounded-[16.8px] h-[400px] overflow-hidden">
                <Image
                  src="/images/solo-core/vision-image-3.jpg"
                  alt={t('soloCore.vision.imageAlt')}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="flex flex-row gap-[15px]">
                <div className="relative min-w-[200px] rounded-[7.52px] h-[400px] overflow-hidden">
                  <Image
                    src="/images/solo-core/vision-image-1.jpg"
                    alt={t('soloCore.vision.imageAlt')}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="relative min-w-[200px] rounded-[7.52px] h-[400px] overflow-hidden">
                  <Image
                    src="/images/solo-core/vision-image-2.jpg"
                    alt={t('soloCore.vision.imageAlt')}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="w-full py-16">
        <div className="max-w-[1080px] mx-auto">
          {/* Desktop View */}
          <div className="hidden md:flex md:flex-row justify-center gap-8 md:gap-[215px] px-4">
            {/* Left Column - Text and Image */}
            <div className="flex flex-col gap-[80px] py-6 flex-1">
              <div className="flex flex-col gap-6 w-full max-w-[381px]">
                <h2 className="font-['Montserrat'] font-bold text-3xl md:text-[40px] text-black leading-tight tracking-[0.2px]">
                  {t('soloCore.values.title')}
                </h2>
                <p className="font-['Montserrat'] font-normal text-sm text-black leading-[1.43] tracking-[1.43%]">
                  {t('soloCore.values.innovation')}
                  <br />
                  {t('soloCore.values.quality')}
                  <br />
                  {t('soloCore.values.sustainability')}
                  <br />
                  {t('soloCore.values.consistency')}
                </p>
              </div>
              <div className="relative w-full rounded-[16px] overflow-hidden aspect-[0.759]">
                <Image
                  src="/images/solo-core/values-image-1.jpg"
                  alt={t('soloCore.values.imageAlt')}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="relative flex-1 rounded-[10px] overflow-hidden aspect-[0.759] mb-32">
              <Image
                src="/images/solo-core/values-image-2.jpg"
                alt={t('soloCore.values.imageAlt')}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
          
          {/* Mobile View */}
          <div className="flex flex-col md:hidden px-4">
            <div className="flex flex-col gap-[15px] mb-[15px]">
              <h2 className="font-['Montserrat'] font-bold text-[40px] text-black leading-[1.22] tracking-[0.24%]">
                {t('soloCore.values.title')}
              </h2>
              <p className="font-['Montserrat'] font-normal text-[14.7px] text-black leading-[1.22] tracking-[0.65%]">
                {t('soloCore.values.innovation')}
                <br />
                {t('soloCore.values.quality')}
                <br />
                {t('soloCore.values.sustainability')}
                <br />
                {t('soloCore.values.consistency')}
              </p>
            </div>
            
            {/* Updated: Images side by side instead of stacked */}
            <div className="flex flex-row gap-[15px]">
              <div className="relative w-1/2 aspect-[0.759] rounded-[7.6px] overflow-hidden">
                <Image
                  src="/images/solo-core/values-image-1.jpg"
                  alt={t('soloCore.values.imageAlt')}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="relative w-1/2 aspect-[0.759] rounded-[4.75px] overflow-hidden">
                <Image
                  src="/images/solo-core/values-image-2.jpg"
                  alt={t('soloCore.values.imageAlt')}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
