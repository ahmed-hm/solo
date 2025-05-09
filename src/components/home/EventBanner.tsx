import React from 'react';
import Link from 'next/link';

const EventBanner = () => {
  return (
    <section className="py-[120px] bg-black text-white">
      <div className="container mx-auto px-[20px]">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-2/3 mb-[40px] md:mb-0">
            <h2 className="font-dancing text-[60px] leading-[72px] mb-[20px]">
              Join Us at Dubai Exhibition Conference
            </h2>
            <p className="font-montserrat text-[18px] leading-[30px] max-w-[680px] text-white opacity-90 mb-[30px]">
              We're excited to showcase our premium products at the upcoming Dubai Exhibition Conference. 
              Visit our booth to experience the rich flavors of Solo and discover exclusive offers.
            </p>
            <div className="flex flex-wrap gap-[30px]">
              <div className="flex flex-col">
                <span className="text-primary-color text-[32px] font-bold font-montserrat leading-[38px]">23-25</span>
                <span className="text-white opacity-80 font-montserrat text-[16px]">June, 2025</span>
              </div>
              <div className="flex flex-col">
                <span className="text-primary-color text-[32px] font-bold font-montserrat leading-[38px]">Dubai</span>
                <span className="text-white opacity-80 font-montserrat text-[16px]">Exhibition Centre</span>
              </div>
              <div className="flex flex-col">
                <span className="text-primary-color text-[32px] font-bold font-montserrat leading-[38px]">Booth</span>
                <span className="text-white opacity-80 font-montserrat text-[16px]">A12, Hall 3</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <Link 
              href="/events/dubai-exhibition" 
              className="bg-primary-color hover:bg-secondary-color text-white px-[35px] py-[18px] rounded-full font-bold text-[16px] transition-colors duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.2)]"
            >
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventBanner;