'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useTranslation } from '@/i18n/client';

const BigEventBanner = ({ lng }: { lng: string }) => {
  const { t } = useTranslation(lng, 'common');
  const [showVideo, setShowVideo] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');

  // YouTube video ID for the event
  const youtubeEmbedId = '8Ui3d9evd6o'; // Replace with your actual YouTube video ID

  const openYoutubeVideo = () => {
    setCurrentVideoUrl(`https://www.youtube.com/embed/${youtubeEmbedId}?autoplay=1`);
    setShowVideo(true);
  };

  const closeVideo = () => {
    setShowVideo(false);
    setCurrentVideoUrl('');
  };

  return (
    <section className="py-28">
      {/* Video modal */}
      {showVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80">
          <div className="relative w-full max-w-4xl">
            <button 
              onClick={closeVideo} 
              className="absolute -top-10 right-0 text-white text-2xl font-bold cursor-pointer"
              aria-label={t('events.exhibition.closeButton', 'Close video')}
            >
              ✕
            </button>
            <div className="relative pt-[56.25%]">
              <iframe
                className="absolute inset-0 w-full h-full bg-black"
                src={currentVideoUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 max-w-[1600px]">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 bg-white">
          {/* Left column with image */}
          <div className="w-full md:w-7/12">
            <div 
              className="relative aspect-[4/5] w-full overflow-hidden cursor-pointer"
              onClick={openYoutubeVideo}
            >
              <Image
                src="/images/events/asian-woman-man-with-winter-clothes.jpg"
                alt={t('events.exhibition.imageAlt')}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black flex items-center justify-center opacity-0 hover:opacity-40 transition-opacity duration-300">
                <div className="bg-white rounded-full p-4 transform scale-110 hover:scale-125 transition-transform duration-300">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5 3L19 12L5 21V3Z" fill="#DBB58F" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Right column with content */}
          <div className="w-full md:w-5/12 flex flex-col gap-[35px] bg-white p-2">
            <h5 className="font-['Montserrat'] font-bold text-base tracking-[0.625%] text-[#BDBDBD]">
              {t('events.exhibition.date')}
            </h5>

            <h1 className="font-['Dancing_Script'] font-bold text-[40px] leading-[1.25em] tracking-[0.5%] text-black">
              {t('events.exhibition.title')}
            </h1>

            <h4 className="font-['Montserrat'] font-normal text-[20px] leading-[1.5em] tracking-[1%] max-w-[600px] text-black">
              {t('events.exhibition.description')}
            </h4>

            <div className="flex flex-wrap gap-2.5 mt-2">
              <Link href="https://www.facebook.com/SOLOsolo2005" className="btn-primary uppercase tracking-[1.4%]">
                {t('events.exhibition.followButton')}
              </Link>

              <button 
                onClick={openYoutubeVideo} 
                className="btn-outline uppercase tracking-[1.4%]"
              >
                {t('events.exhibition.readMoreButton')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BigEventBanner;
