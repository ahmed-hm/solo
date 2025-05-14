'use client';

import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import arrowAnimation from '../../../public/lottie/arrow-down.json';
import { useIsRTL } from '../../i18n/client';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface HeroSectionProps {
  lng: string;
}

const HeroSection = ({ lng = 'en' }: HeroSectionProps) => {
  const [isLeftHovered, setIsLeftHovered] = useState(false);
  const [isRightHovered, setIsRightHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const leftArrowRef = useRef<LottieRefCurrentProps>(null);
  const rightArrowRef = useRef<LottieRefCurrentProps>(null);
  const isRtl = useIsRTL(lng);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Set animation speed when refs are available
  useEffect(() => {
    if (leftArrowRef.current) {
      leftArrowRef.current.setSpeed(0.2);
    }
    if (rightArrowRef.current) {
      rightArrowRef.current.setSpeed(0.2);
    }
  }, []);

  // Handle hover effects separately to control animation speed
  useEffect(() => {
    if (isLeftHovered && leftArrowRef.current) {
      leftArrowRef.current.setSpeed(0.65);
      leftArrowRef.current.play();
    } else if (!isLeftHovered && leftArrowRef.current) {
      leftArrowRef.current.stop();
    }
  }, [isLeftHovered]);

  useEffect(() => {
    if (isRightHovered && rightArrowRef.current) {
      rightArrowRef.current.setSpeed(0.65);
      rightArrowRef.current.play();
    } else if (!isRightHovered && rightArrowRef.current) {
      rightArrowRef.current.stop();
    }
  }, [isRightHovered]);

  const slides = [
    {
      id: 1,
      backgroundImage: '/images/banner/banner-1.png',
      backgroundImageMobile: '/images/banner/banner-mobile-1.png',
      alt: 'Banner 1',
    },
    {
      id: 2,
      backgroundImage: '/images/banner/banner-2.png',
      backgroundImageMobile: '/images/banner/banner-mobile-2.png',
      alt: 'Banner 2',
    },
  ];

  return (
    <section className={`relative overflow-hidden ${isMobile ? 'aspect-[1.3458]' : 'aspect-[2.687]'}`}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{
          clickable: true,
          el: '.swiper-pagination',
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active',
        }}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        dir={isRtl ? 'rtl' : 'ltr'}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={isMobile ? slide.backgroundImageMobile : slide.backgroundImage}
                  alt={slide.alt}
                  fill
                  priority={slide.id === 1}
                  className="object-cover"
                />
              </div>

              {/* Mobile Banner Text - Based on Figma Design */}
              {isMobile && (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  {/* <h1 className="text-center text-white text-[75px] font-normal leading-[1.2em] tracking-[0.3%] font-['Dancing_Script']">
                    Easy Way
                    <br />
                    to Change
                  </h1> */}
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Arrows with Lottie Animations */}
      <div
        className={`swiper-button-prev absolute top-1/2 ${isRtl ? 'right' : 'left'}-${
          isMobile ? '[15px]' : '[40px]'
        } z-30 flex items-center justify-center transform -translate-y-1/2 cursor-pointer`}
        onMouseEnter={() => setIsLeftHovered(true)}
        onMouseLeave={() => setIsLeftHovered(false)}
      >
        <div className="w-full h-full transform rotate-90">
          <Lottie
            lottieRef={leftArrowRef}
            animationData={arrowAnimation}
            loop={true}
            autoplay={false}
            style={{ width: '100%', height: '100%', filter: 'brightness(0) invert(1)' }} // Force white color
            initialSegment={[0, 60]}
          />
        </div>
      </div>
      <div
        className={`swiper-button-next absolute top-1/2 ${isRtl ? 'left' : 'right'}-${
          isMobile ? '[15px]' : '[40px]'
        } z-30 flex items-center justify-center transform -translate-y-1/2 cursor-pointer`}
        onMouseEnter={() => setIsRightHovered(true)}
        onMouseLeave={() => setIsRightHovered(false)}
      >
        <div className="w-full h-full transform -rotate-90">
          <Lottie
            lottieRef={rightArrowRef}
            animationData={arrowAnimation}
            loop={true}
            autoplay={false}
            style={{ width: '100%', height: '100%', filter: 'brightness(0) invert(1)' }} // Force white color
            initialSegment={[0, 60]}
          />
        </div>
      </div>

      {/* Custom Pagination Dots - Adjust position for mobile */}
      <div
        className={`swiper-pagination absolute left-0 right-0 flex justify-center items-center gap-[10px] z-30 ${
          isMobile ? 'bottom-[20px]' : 'bottom-[40px]'
        }`}
      ></div>

      {/* Custom CSS for Swiper navigation and pagination */}
      <style jsx global>{`
        :root {
          --swiper-navigation-size: ${isMobile ? '60px' : '120px'};
          --swiper-theme-color: #fff;
        }

        .swiper-button-prev,
        .swiper-button-next {
          // right: -10;
          margin-top: 0px;
          width: var(--swiper-navigation-size);
          height: var(--swiper-navigation-size);
        }

        /* Updated pagination dots to match design */
        .swiper-pagination {
          position: absolute;
          text-align: center;
        }

        .swiper-pagination-bullet {
          width: ${isMobile ? '10px' : '14px'};
          height: ${isMobile ? '10px' : '14px'};
          display: inline-block;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          border: 0.6px solid #ffffff;
          opacity: 1;
          margin: 0 ${isMobile ? '3px' : '6px'};
          transition: all 0.3s ease;
        }

        .swiper-pagination-bullet-active {
          background: #ffffff;
          border: none;
          transform: scale(1.2);
          opacity: 1;
        }

        .swiper-button-prev:after,
        .swiper-button-next:after {
          display: none;
        }

        .swiper,
        .swiper-slide {
          border-radius: 0px;
        }

        /* RTL specific adjustments for Swiper */
        [dir='rtl'] .swiper-wrapper {
          direction: rtl;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
