'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslation, useIsRTL } from '@/i18n/client';
import { useParams } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function CountriesPage() {
  // Use useParams hook to access route parameters
  const params = useParams();
  const lng = params.lng as string;

  // Use the client-side translation hook with the lng from params
  const { t } = useTranslation(lng);
  const isRtl = useIsRTL(lng);

  // Refs for custom navigation
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  // State for progress bar
  const [progress, setProgress] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const [swiperInitialized, setSwiperInitialized] = useState(false);
  // State for checking if screen is mobile
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile on mount and resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);

    // Clean up
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Update navigation when swiper is initialized
  useEffect(() => {
    if (swiperInitialized && swiperRef.current && prevRef.current && nextRef.current) {
      // Update the navigation elements
      swiperRef.current.navigation.update();

      // Function to manually handle prev/next clicks
      const handlePrevClick = () => {
        if (swiperRef.current) {
          swiperRef.current.slidePrev();
        }
      };

      const handleNextClick = () => {
        if (swiperRef.current) {
          swiperRef.current.slideNext();
        }
      };

      // Add event listeners
      prevRef.current.addEventListener('click', handlePrevClick);
      nextRef.current.addEventListener('click', handleNextClick);

      // Clean up
      return () => {
        if (prevRef.current && nextRef.current) {
          prevRef.current.removeEventListener('click', handlePrevClick);
          nextRef.current.removeEventListener('click', handleNextClick);
        }
      };
    }
  }, [swiperInitialized]);

  const countries = [
    {
      name: 'Saudi Arabia',
      image: '/images/countries/saudi-arabia-clean.jpg',
      bgColor: 'bg-[#DBB58F]',
    },
    {
      name: 'Jordan',
      image: '/images/countries/jordan-clean.jpg',
      bgColor: 'bg-[#DBB58F]',
    },
    {
      name: 'Oman',
      image: '/images/countries/oman-clean.jpg',
      bgColor: 'bg-[#DBB58F]',
    },
    {
      name: 'Kuwait',
      image: '/images/countries/kuwait-clean.jpg',
      bgColor: 'bg-[#DBB58F]',
    },
    {
      name: 'Bahrain',
      image: '/images/countries/bahrain-clean.jpg',
      bgColor: 'bg-[#DBB58F]',
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Top Banner with upcoming country */}
      <div className="w-full bg-[#252B42] relative aspect-[1.1] md:aspect-[2.26]">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/countries/banner-background.jpg"
            alt={t('countries.emirates_background', 'Emirates background')}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 h-full flex items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-4 md:gap-12">
            <span className="text-white font-['Montserrat'] font-bold text-2xl md:text-5xl text-center max-w-[900px] tracking-[0.333%]">
              <span className="font-['Dancing_Script'] text-3xl md:text-7xl">
                {t('countries.solo_sauce', 'Solo Sauce')}
              </span>{' '}
              {t('countries.coming_soon_in', 'is coming soon in')} {t('countries.emirates', 'Emirates')}
            </span>
            <div className="max-w-[845px]">
              <p className="text-white font-['Montserrat'] font-bold text-base md:text-3xl text-center tracking-[0.667%]">
                {t('countries.making_its_way', 'Solo is making its way to Emirates. Stay tuned there soon.')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 15 Years Banner */}
      <div className="w-full py-[15px] md:py-[30px] flex justify-center items-center">
        <div className="container mx-auto mx-4">
          <div className="w-full flex justify-center bg-white py-10 px-20">
            <Image
              src="/images/countries/15-years.jpg"
              alt={t('countries.15_years_alt', '15 Years of Solo')}
              width={1300}
              height={200}
              className="w-auto h-auto"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="w-full py-6 md:py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 justify-items-center bg-white">
            <div className="card-item w-full max-w-[110px] md:w-[200px] py-4 md:py-8 flex flex-col items-center bg-white">
              <div className="w-8 h-8 md:w-12 md:h-12 mb-2 flex items-center justify-center">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 50 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="md:w-[50px] md:h-[50px]"
                >
                  <path
                    d="M25.0003 45.8334C13.4941 45.8334 4.16699 36.5063 4.16699 25.0001C4.16699 13.4938 13.4941 4.16675 25.0003 4.16675C36.5066 4.16675 45.8337 13.4938 45.8337 25.0001C45.8337 36.5063 36.5066 45.8334 25.0003 45.8334ZM38.2399 33.2334V33.0147C38.2399 31.0938 38.2399 30.2167 36.8816 29.4397C36.445 29.1922 35.9965 28.9662 35.5378 28.7626C34.7732 28.4147 34.267 28.1876 33.5837 27.1876C33.5021 27.0688 33.4215 26.9494 33.342 26.8293C32.6232 25.7355 32.1045 24.948 30.1295 25.2605C26.2441 25.8772 25.9566 26.5605 25.7857 27.7147L25.7587 27.9042C25.5066 29.5917 25.4607 30.1584 26.1649 30.898C28.8003 33.6626 30.3795 35.6563 30.8587 36.823C31.092 37.3918 31.692 39.1147 31.2795 40.8188C33.8083 39.8116 36.0592 38.2136 37.8441 36.1584C38.0732 35.3793 38.2399 34.4084 38.2399 33.2334ZM25.0003 7.9855C20.1732 7.9855 15.8128 9.998 12.717 13.2272C13.0857 13.4834 13.4066 13.8438 13.6274 14.3397C14.0524 15.2917 14.0524 16.273 14.0524 17.1417C14.0524 17.8251 14.0524 18.4751 14.2712 18.9438C14.5712 19.5855 15.867 19.8605 17.0107 20.098C17.4212 20.1855 17.842 20.273 18.2253 20.3792C19.2795 20.6709 20.0962 21.6188 20.7482 22.3792C21.0191 22.6938 21.4212 23.1584 21.6232 23.2751C21.7274 23.2001 22.0628 22.8355 22.2274 22.2376C22.3566 21.7792 22.3191 21.3751 22.1337 21.1542C20.967 19.7793 21.0316 17.1334 21.392 16.1563C21.9587 14.6167 23.7295 14.7313 25.0253 14.8147C25.5087 14.8459 25.9628 14.8772 26.3045 14.8334C27.6003 14.6709 28.0003 12.698 28.2816 12.3126C28.8899 11.4792 30.7524 10.223 31.9066 9.448C29.7326 8.48132 27.3795 7.98302 25.0003 7.9855Z"
                    fill="#DBB58F"
                  />
                </svg>
              </div>
              <span className="text-black font-['Montserrat'] font-bold text-sm md:text-2xl text-center mb-1 md:mb-2">
                {t('countries.presence', 'Presence')}
              </span>
              <span className="text-black font-['Montserrat'] font-bold text-sm md:text-2xl leading-[10px] md:leading-[20px] text-center">
                5
              </span>
            </div>

            <div className="card-item w-full max-w-[110px] md:w-[200px] py-4 md:py-8 flex flex-col items-center bg-white">
              <div className="w-8 h-8 md:w-12 md:h-12 mb-2 flex items-center justify-center">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 50 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="md:w-[50px] md:h-[50px]"
                >
                  <path
                    d="M43.7497 39.5833H47.9163V43.75H2.08301V39.5833H6.24967V8.33333C6.24967 7.7808 6.46917 7.25089 6.85987 6.86019C7.25057 6.46949 7.78047 6.25 8.33301 6.25H29.1663C29.7189 6.25 30.2488 6.46949 30.6395 6.86019C31.0302 7.25089 31.2497 7.7808 31.2497 8.33333V39.5833H35.4163V18.75H41.6663C42.2189 18.75 42.7488 18.9695 43.1395 19.3602C43.5302 19.7509 43.7497 20.2808 43.7497 20.8333V39.5833ZM14.583 22.9167V27.0833H22.9163V22.9167H14.583ZM14.583 14.5833V18.75H22.9163V14.5833H14.583Z"
                    fill="#DBB58F"
                  />
                </svg>
              </div>
              <span className="text-black font-['Montserrat'] font-bold text-sm md:text-2xl text-center mb-1 md:mb-2">
                {t('countries.factories', 'Factories')}
              </span>
              <span className="text-black font-['Montserrat'] font-bold text-sm md:text-2xl leading-[10px] md:leading-[20px] text-center">
                3
              </span>
            </div>

            <div className="card-item w-full max-w-[110px] md:w-[200px] py-4 md:py-8 flex flex-col items-center bg-white">
              <div className="w-8 h-8 md:w-12 md:h-12 mb-2 flex items-center justify-center">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 50 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="md:w-[50px] md:h-[50px]"
                >
                  <path
                    d="M35.4163 16.6667H41.6663L47.9163 25.1167V37.5001H43.6768C43.4291 39.2382 42.5626 40.8286 41.2365 41.9791C39.9104 43.1297 38.2137 43.7631 36.458 43.7631C34.7023 43.7631 33.0056 43.1297 31.6795 41.9791C30.3534 40.8286 29.4869 39.2382 29.2393 37.5001H18.6768C18.4291 39.2382 17.5626 40.8286 16.2365 41.9791C14.9104 43.1297 13.2137 43.7631 11.458 43.7631C9.70234 43.7631 8.00563 43.1297 6.67951 41.9791C5.35339 40.8286 4.48692 39.2382 4.23926 37.5001H2.08301V12.5001C2.08301 11.9475 2.3025 11.4176 2.6932 11.0269C3.0839 10.6362 3.61381 10.4167 4.16634 10.4167H33.333C33.8855 10.4167 34.4154 10.6362 34.8061 11.0269C35.1968 11.4176 35.4163 11.9475 35.4163 12.5001V16.6667ZM35.4163 20.8334V27.0834H43.7497V26.4897L39.5663 20.8334H35.4163Z"
                    fill="#DBB58F"
                  />
                </svg>
              </div>
              <span className="text-black font-['Montserrat'] font-bold text-sm md:text-2xl text-center mb-1 md:mb-2">
                {t('countries.distributors', 'Distributors')}
              </span>
              <span className="text-black font-['Montserrat'] font-bold text-sm md:text-2xl leading-[10px] md:leading-[20px] text-center">
                {t('countries.distributors_count', '+500')}
              </span>
            </div>

            <div className="card-item w-full max-w-[110px] md:w-[200px] py-4 md:py-8 flex flex-col items-center bg-white">
              <div className="w-8 h-8 md:w-12 md:h-12 mb-2 flex items-center justify-center">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 50 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="md:w-[50px] md:h-[50px]"
                >
                  <path
                    d="M22.917 4.27075V27.0833H45.7295C44.6857 37.6103 35.8024 45.8333 25.0003 45.8333C13.4941 45.8333 4.16699 36.5062 4.16699 24.9999C4.16699 14.1978 12.3899 5.3145 22.917 4.27075ZM27.0837 4.27075C31.8649 4.75241 36.3327 6.87163 39.7307 10.2696C43.1286 13.6675 45.2478 18.1354 45.7295 22.9166H27.0837V4.27075Z"
                    fill="#DBB58F"
                  />
                </svg>
              </div>
              <span className="text-black font-['Montserrat'] font-bold text-sm md:text-2xl text-center mb-1 md:mb-2">
                {t('countries.market_share', 'Market share')}
              </span>
              <span className="text-black font-['Montserrat'] font-bold text-sm md:text-2xl leading-[10px] md:leading-[20px] text-center">
                {t('countries.market_share_percent', '70%')}
              </span>
            </div>

            <div className="card-item w-full max-w-[110px] md:w-[200px] py-4 md:py-8 flex flex-col items-center bg-white col-span-2 md:col-span-1 mx-auto">
              <div className="w-8 h-8 md:w-12 md:h-12 mb-2 flex items-center justify-center">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 46 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="md:w-[46px] md:h-[50px]"
                >
                  <path
                    d="M38.2798 32.5747H3.76345V47.4785H23.0668L20.5317 45.3322L22.6825 42.7925L25.22 44.9457L23.0668 47.4785H38.2821L38.2798 32.5747ZM6.42135 46.2303L3.89077 44.0771L6.03938 41.5443L8.57905 43.6951L6.42135 46.2303ZM8.76549 39.8026L6.22809 37.654L8.38124 35.1189L10.9141 37.2721L8.76549 39.8026ZM35.1536 39.8026L32.6207 37.654L34.767 35.1189L37.3067 37.2721L35.1536 39.8026ZM2.33104 6.43445L0.841797 1.71434L6.28721 0L7.7719 4.72011L2.33104 6.43445ZM37.1021 8.95594L34.9603 13.0531C32.3183 12.9053 29.715 14.2649 28.4099 16.7614L26.3227 20.7721L20.5658 31.788L16.7733 19.7035L15.4159 15.3858C14.5679 12.7029 12.2419 10.9045 9.61584 10.5884L8.23346 6.17525L2.78577 7.88732L4.17043 12.2982C2.19917 14.0626 1.31244 16.866 2.16279 19.5557L3.51562 23.8689L6.03028 31.8721H20.5317H20.5976H36.204L38.6368 27.1975L39.3826 25.7696V48.1879H2.65845V25.1717H0.841797V50H41.1992V25.1717H39.694L40.7286 23.1913C42.0291 20.6926 41.6517 17.7732 40.0215 15.6973L42.161 11.5934L37.1021 8.95594ZM8.33577 30.3738L5.71879 23.7665L14.4474 20.2787L18.1853 30.3738H8.33577ZM34.7034 30.2215H24.0854L29.5331 20.2355L37.8251 24.1144L34.7034 30.2215ZM45.1554 5.85467L42.8681 10.2451L37.8024 7.60311L40.0919 3.21495L45.1554 5.85467Z"
                    fill="#DBB58F"
                  />
                </svg>
              </div>
              <span className="text-black font-['Montserrat'] font-bold text-sm md:text-2xl text-center mb-1 md:mb-2">
                {t('countries.bottles_sold', 'Bottles Sold')}
              </span>
              <span className="text-black font-['Montserrat'] font-bold text-sm md:text-2xl leading-[10px] md:leading-[20px] text-center">
                {t('countries.bottles_count', '+800M')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Countries Section - Using Swiper */}
      <div className="w-full py-6 md:py-10 mb-6 md:mb-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            {/* Swiper Container */}
            <div className="w-full mb-6 md:mb-10">
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={isMobile ? 16 : 32}
                slidesPerView="auto"
                centeredSlides={false}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                  setSwiperInitialized(true);
                }}
                onProgress={(swiper, progress) => {
                  setProgress(progress);
                }}
                navigation={false} // Disable built-in navigation
                className="w-full"
                dir={isRtl ? 'rtl' : 'ltr'}
              >
                <SwiperSlide style={{ width: 'auto' }}>
                  <h2 className="font-['Dancing_Script'] font-bold text-3xl md:text-6xl text-black px-2 md:px-4 max-w-[280px] md:max-w-[500px]">
                    {t('countries.explore_heading', 'Explore the countries where Solo Sauce is available.')}
                  </h2>
                </SwiperSlide>

                {countries.map((country, index) => (
                  <SwiperSlide key={index} style={{ width: 'auto' }}>
                    <div className="relative w-[190px] h-[453px] md:w-[466px] md:h-[466px] rounded-[25px] md:rounded-[40px] overflow-hidden">
                      <Image
                        src={country.image}
                        alt={t(`countries.${country.name.toLowerCase().replace(/\s+/g, '_')}`, country.name)}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 flex justify-center items-end pb-[40px] md:pb-[66px]">
                        <div className="bg-[rgba(0,0,0,0.5)] px-6 md:px-12 py-2 md:py-3 rounded-[6px] md:rounded-[10px] w-[182px] md:w-[448px] flex justify-center">
                          <h3 className="font-['Dancing_Script'] font-bold text-3xl md:text-6xl text-white">
                            {t(`countries.${country.name.toLowerCase().replace(/\s+/g, '_')}`, country.name)}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Controls Section */}
            <div className="flex items-center justify-center gap-4 md:gap-8 w-full max-w-[1300px]">
              <div className="w-full max-w-[800px] md:max-w-[1100px] h-6 md:h-10 bg-[#E4E4E4] rounded-[10px] md:rounded-[20px] relative">
                <div
                  className={`absolute ${
                    isRtl ? 'right-0' : 'left-0'
                  } top-0 bottom-0 bg-[#DBB58F] rounded-[10px] md:rounded-[20px] transition-all duration-300`}
                  style={{ width: `${progress * 100}%` }}
                ></div>
              </div>

              <div className="flex gap-[30px] md:gap-[60px]">
                <div
                  ref={prevRef}
                  className={`bg-[#DBB58F] w-8 h-8 md:w-12 md:h-12 rounded flex items-center justify-center cursor-pointer hover:bg-[#c9a47e] active:bg-[#b8946e] transition-colors duration-300 ${
                    isRtl ? 'rotate-180' : ''
                  }`}
                  aria-label={t('common.scroll_left', 'Scroll left')}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="md:w-[16px] md:h-[16px]"
                  >
                    <path
                      d="M12.6667 8H3.33337"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.00004 12.6667L3.33337 8.00004L8.00004 3.33337"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div
                  ref={nextRef}
                  className={`bg-[#DBB58F] w-8 h-8 md:w-12 md:h-12 rounded flex items-center justify-center cursor-pointer hover:bg-[#c9a47e] active:bg-[#b8946e] transition-colors duration-300 ${
                    isRtl ? 'rotate-180' : ''
                  }`}
                  aria-label={t('common.scroll_right', 'Scroll right')}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="md:w-[16px] md:h-[16px]"
                  >
                    <path
                      d="M3.33337 8H12.6667"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.00004 3.33337L12.6667 8.00004L8.00004 12.6667"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
