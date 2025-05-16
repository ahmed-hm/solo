'use client';

import Image from 'next/image';
import React from 'react';
import { useParams } from 'next/navigation';
import { useTranslation, useIsRTL } from '@/i18n/client';

export default function PartnersPage() {
  // Get language from URL params
  const params = useParams();
  const lng = params.lng as string;
  
  // Use translation hook
  const { t } = useTranslation(lng);
  const isRtl = useIsRTL(lng);
  
  // Organizing partner logos into 12 rows of 7 logos each (84 total) to match the Figma design
  const partnerLogoRows = [
    // Row 1
    [1, 2, 3, 4, 5, 6, 7],
    // Row 2
    [8, 9, 10, 11, 12, 13, 14],
    // Row 3
    [15, 16, 17, 18, 19, 20, 21],
    // Row 4
    [22, 23, 24, 25, 26, 27, 28],
    // Row 5
    [29, 30, 31, 32, 33, 34, 35],
    // Row 6
    [36, 37, 38, 39, 40, 41, 42],
    // Row 7
    [43, 44, 45, 46, 47, 48, 49],
    // Row 8
    [50, 51, 52, 53, 54, 55, 56],
    // Row 9
    [57, 58, 59, 60, 61, 62, 63],
    // Row 10
    [64, 65, 66, 67, 68, 69, 70],
    // Row 11
    [71, 72, 73, 74, 75, 76, 77],
    // Row 12
    [78, 79, 80, 81, 82, 83, 84],
  ];

  // Create a flattened array of all logos
  const allLogos = partnerLogoRows.flat();

  return (
    <main className={`bg-[#EFF2F6] min-h-screen ${isRtl ? 'rtl' : ''}`}>
      {/* Join Us Section */}
      <section
        className="w-full max-w-[1336px] mx-auto flex justify-center bg-white mt-10"
        style={{ padding: '30px 0' }}
      >
        <div className="flex flex-col items-center max-w-md text-center px-4">
          <h2 className="text-5xl md:text-[60px] font-bold font-['Dancing_Script'] mb-4 text-black">{t('partners.join_us', 'Join Us')}</h2>
          <p className="text-sm leading-tight mb-6 tracking-wider text-black px-4">
            {t('partners.join_us_description', 'Use Solo Sauce products within your brand. All you have to do is contact us and we will respond to you as soon as possible.')}
          </p>
          <div className="flex flex-wrap gap-2.5 justify-center">
            <button className="bg-[#DBB58F] text-white px-10 py-[15px] font-bold text-sm tracking-wider rounded shadow-sm">
              {t('common.contact_us', 'Contact Us')}
            </button>
            <button className="border border-[#DBB58F] text-[#DBB58F] px-10 py-[15px] font-bold text-sm tracking-wider rounded shadow-sm">
              {t('common.learn_more', 'Learn More')}
            </button>
          </div>
        </div>
      </section>

      {/* Title Section */}
      <section className="mx-auto max-w-[1336px] flex bg-white justify-center items-center my-8 w-full" style={{ padding: '30px 0' }}>
        <h1 className="text-7xl md:text-[84px] font-semibold font-['Dancing_Script'] text-black text-center">
          {t('partners.our_clients', 'Our Clients')}
        </h1>
      </section>

      {/* Partners Grid - Desktop View (hidden on mobile) */}
      <section className="hidden md:flex flex-col items-center w-full max-w-[1336px] mx-auto bg-white mb-8">
        <div className="w-full p-4 flex flex-col gap-5">
          {partnerLogoRows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-wrap justify-center gap-5">
              {row.map((logoNum) => (
                <div
                  key={logoNum}
                  className="flex items-center justify-center bg-white rounded-md w-[150px] h-[100px]"
                >
                  <Image
                    src={`/images/partners/partner-logo-${logoNum}.png`}
                    alt={t('partners.partner_logo_alt', 'Partner Logo {{number}}', { number: logoNum })}
                    width={120}
                    height={80}
                    className="object-contain max-w-full max-h-full"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Partners Grid - Mobile View (3 per row, hidden on desktop) */}
      <section className="md:hidden flex flex-col items-center w-full max-w-[1336px] mx-auto bg-white">
        <div className="w-full px-4 flex flex-col gap-5">
          <div className="grid grid-cols-3 gap-3">
            {allLogos.map((logoNum) => (
              <div key={logoNum} className="flex items-center justify-center bg-white p-3 rounded-md aspect-square">
                <Image
                  src={`/images/partners/partner-logo-${logoNum}.png`}
                  alt={t('partners.partner_logo_alt', 'Partner Logo {{number}}', { number: logoNum })}
                  width={90}
                  height={60}
                  className="object-contain max-w-full max-h-full"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
