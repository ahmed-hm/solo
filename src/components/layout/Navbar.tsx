"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <header className="sticky top-0 bg-white shadow-[0_4px_10px_rgba(0,0,0,0.05)] z-50">
      <div className="container mx-auto px-[20px] h-[100px] flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image 
              src="/images/logo.svg"
              alt="Solo Logo"
              width={180}
              height={60}
              priority
            />
          </Link>
        </div>
        
        <nav className="hidden lg:flex items-center space-x-[40px]">
          <Link href="/" className="text-black font-montserrat font-medium text-[16px] leading-[24px] hover:text-primary-color transition duration-300">
            Home
          </Link>
          <div className="flex items-center">
            <Link href="/about" className="text-black font-montserrat font-medium text-[16px] leading-[24px] hover:text-primary-color transition duration-300">
              About Us
            </Link>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-[6px]">
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex items-center">
            <Link href="/marketplace" className="text-primary-color font-montserrat font-bold text-[16px] leading-[24px]">
              Marketplace
            </Link>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-[6px]">
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex items-center">
            <Link href="/recipes" className="text-black font-montserrat font-medium text-[16px] leading-[24px] hover:text-primary-color transition duration-300">
              Recipes
            </Link>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-[6px]">
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex items-center">
            <Link href="/loyalty" className="text-black font-montserrat font-medium text-[16px] leading-[24px] hover:text-primary-color transition duration-300">
              Loyalty Program
            </Link>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-[6px]">
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex items-center">
            <Link href="/partners" className="text-black font-montserrat font-medium text-[16px] leading-[24px] hover:text-primary-color transition duration-300">
              Our Success Partners
            </Link>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-[6px]">
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <Link href="/jobs" className="text-black font-montserrat font-medium text-[16px] leading-[24px] hover:text-primary-color transition duration-300">
            Join Our Team
          </Link>
        </nav>
        
        <div className="flex items-center gap-[15px]">
          <div className="flex items-center">
            <span className="text-black font-montserrat font-medium text-[14px] mr-[8px]">English</span>
            <div className="w-[24px] h-[24px] relative">
              <div className="absolute inset-0 bg-[#F2F2F2] rounded-full flex items-center justify-center text-[10px] font-medium">
                EN
              </div>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <button className="lg:hidden w-[24px] h-[24px] flex flex-col justify-center items-center">
            <span className="w-[24px] h-[2px] bg-black mb-[5px]"></span>
            <span className="w-[24px] h-[2px] bg-black mb-[5px]"></span>
            <span className="w-[24px] h-[2px] bg-black"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;