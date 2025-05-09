import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const BannerSection = () => {
  return (
    <section className="py-[80px]">
      <div className="container mx-auto px-[20px]">
        <div className="relative rounded-[10px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
          {/* The background gradient from Figma */}
          <div className="h-[480px] bg-gradient-to-r from-[#DBB58F] to-[#B08566]">
            <div className="absolute inset-0 flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 p-[30px] md:p-[60px] flex flex-col justify-center text-white">
                <h2 className="font-dancing text-[64px] leading-[76px] mb-[20px]">
                  Premium Raspberry Puree
                </h2>
                <p className="font-montserrat text-[18px] leading-[30px] mb-[40px] max-w-[480px]">
                  Experience the rich, authentic flavor of our premium Raspberry Puree, perfect for smoothies, cocktails, and desserts.
                </p>
                <div>
                  <Link href="/product/raspberry-puree" className="border-2 border-white text-white py-[15px] px-[40px] rounded-[5px] font-montserrat font-bold text-[14px] hover:bg-white hover:text-primary-color transition duration-300">
                    Shop Now
                  </Link>
                </div>
              </div>
              <div className="w-full md:w-1/2 relative flex items-center justify-center p-[30px]">
                {/* Placeholder for product image that would be replaced with the exact image from Figma */}
                <div className="w-[340px] h-[340px] bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-white opacity-70 font-montserrat">Product Image</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;