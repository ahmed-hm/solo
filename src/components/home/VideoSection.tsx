'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectCards } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';

const VideoSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const videoItems = [
    {
      id: 1,
      src: '/images/video-thumbnail-1.png',
      alt: 'Video thumbnail 1',
    },
    {
      id: 2,
      src: '/images/video-thumbnail-2.png',
      alt: 'Video thumbnail 2',
    },
  ];

  return (
    <section className="w-full py-20 bg-gradient-to-b from-[#DBB58F] via-[#B08566] to-[#EFD8B5]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-[30px] max-w-[1232px] mx-auto">
          {/* Left column with text content */}
          <div className="w-full lg:w-[438px] flex flex-col gap-4 text-center lg:text-left">
            <h2 className="font-['Dancing_Script'] font-bold text-5xl lg:text-[64px] leading-[1.2] text-white">
              Watch our latest
              <br />
              Videos
            </h2>
            <p className="text-white text-sm tracking-[1.4%] leading-[1.43] lg:w-full">
              Showing off what Solo products can do in the delicious culinary world.
            </p>
            <button className="mt-2 bg-black text-white rounded-full px-8 py-3 font-bold tracking-[0.4%] text-xl lg:text-2xl mx-auto lg:mx-0 lg:self-start">
              Learn More!
            </button>
          </div>

          {/* Right column with stacked video cards */}
          <div className="w-full lg:w-auto relative cards-container-outer">
            {/* Black circular border */}
            <div className="absolute w-full h-full border-8 lg:border-[44px] border-black rounded-full -z-0"></div>

            <div className="relative z-10 p-4">
              <div className="w-full max-w-[600px] mx-auto">
                <Swiper
                  effect={'cards'}
                  grabCursor={true}
                  modules={[EffectCards, Pagination]}
                  className="mySwiper"
                  onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                  pagination={{
                    el: '.swiper-pagination',
                    clickable: true,
                    renderBullet: (index, className) => {
                      return `<span class="${className} ${
                        index === activeIndex ? 'bg-black' : 'bg-[rgba(255,255,255,0.5)] border border-white'
                      } w-3 h-3 rounded-full"></span>`;
                    },
                  }}
                  cardsEffect={{
                    slideShadows: false,
                    perSlideOffset: 10,
                    perSlideRotate: 0,
                    rotate: false,
                  }}
                >
                  {videoItems.map((video) => (
                    <SwiperSlide key={video.id} className="rounded-lg overflow-hidden">
                      <div className="relative aspect-video">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-[14.5%] to-[rgba(56,56,56,0.84)] z-10"></div>
                        <Image
                          src={video.src}
                          alt={video.alt}
                          width={600}
                          height={338}
                          className="w-full h-auto"
                          priority
                        />
                        <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-10 z-20">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M5 3L19 12L5 21V3Z" fill="#DBB58F" />
                          </svg>
                        </button>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>

        {/* Custom pagination dots */}
        <div className="swiper-pagination flex justify-center items-center gap-[5px] mt-8"></div>
      </div>

      {/* Custom styles to enhance the cards effect */}
      <style jsx global>{`
        .cards-container-outer {
          padding: 20px 0;
        }

        .swiper {
          width: 100%;
          border-radius: 12px;
        }

        .swiper-slide {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
          // background-color: white;
        }

        /* Ensure cards effect has proper visuals */
        .swiper-cards .swiper-slide {
          width: 100% !important;
          transition: all 0.3s ease;
        }

        /* Override Swiper's default transform for inactive slides to make them appear stacked */
        // .swiper-cards .swiper-slide:not(.swiper-slide-active) {
        //   transform: translateY(-8px) scale(0.95) !important;
        //   opacity: 0.8;
        // }

        .swiper-cards .swiper-slide-prev {
          transform: translateY(-16px) scale(0.9) !important;
          opacity: 0.0;
        }
      `}</style>
    </section>
  );
};

export default VideoSection;
