"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-[80px]">
      <div className="container mx-auto px-[20px]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[40px]">
          {/* Copyright section */}
          <div className="md:col-span-3 flex flex-col items-center md:items-start">
            <div className="flex items-center gap-[10px] mb-[20px]">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 1.75C5.45 1.75 1.75 5.45 1.75 10C1.75 14.55 5.45 18.25 10 18.25C14.55 18.25 18.25 14.55 18.25 10C18.25 5.45 14.55 1.75 10 1.75ZM10 16.75C6.25 16.75 3.25 13.75 3.25 10C3.25 6.25 6.25 3.25 10 3.25C13.75 3.25 16.75 6.25 16.75 10C16.75 13.75 13.75 16.75 10 16.75Z" fill="white"/>
                <path d="M10.75 6.25H9.25V10.75H13.75V9.25H10.75V6.25Z" fill="white"/>
              </svg>
              <span className="text-white text-[16px] font-montserrat opacity-70">Solo-Sauce 2025. All right reserved</span>
            </div>
          </div>

          {/* Newsletter section */}
          <div className="md:col-span-3">
            <div className="flex flex-col gap-[15px]">
              <div className="mb-[10px]">
                <div className="text-white text-[20px] font-medium font-montserrat mb-[5px]">Subscribe</div>
                <div className="text-white text-[16px] font-montserrat opacity-70">Get 10% off your first order</div>
              </div>
              <div className="flex items-center border border-white rounded-[8px] overflow-hidden">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-transparent text-white px-[15px] py-[12px] flex-grow outline-none placeholder:text-white placeholder:opacity-40 font-montserrat text-[14px]" 
                />
                <button className="p-[12px]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4L3 11L10 14M20 4L13 21L10 14M20 4L10 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Support section */}
          <div className="md:col-span-2">
            <h3 className="text-white text-[20px] font-medium font-montserrat mb-[20px]">Support</h3>
            <div className="flex flex-col gap-[15px]">
              <p className="text-white text-[16px] font-montserrat opacity-70 leading-[24px]">
                The Industrial Zone, Industrial Area, New Cairo 3, Cairo Governorate 4716125, Cairo, Egypt
              </p>
              <p className="text-white text-[16px] font-montserrat opacity-70">solomodern1@gmail.com</p>
              <p className="text-white text-[16px] font-montserrat opacity-70">+201022607004</p>
            </div>
          </div>

          {/* Quick Links section */}
          <div className="md:col-span-2">
            <h3 className="text-white text-[20px] font-medium font-montserrat mb-[20px]">Quick Link</h3>
            <div className="flex flex-col gap-[15px]">
              <Link href="/privacy" className="text-white text-[16px] font-montserrat opacity-70 hover:text-primary-color hover:opacity-100 transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white text-[16px] font-montserrat opacity-70 hover:text-primary-color hover:opacity-100 transition-colors duration-300">
                Terms Of Use
              </Link>
              <Link href="/faq" className="text-white text-[16px] font-montserrat opacity-70 hover:text-primary-color hover:opacity-100 transition-colors duration-300">
                FAQ
              </Link>
              <Link href="/careers" className="text-white text-[16px] font-montserrat opacity-70 hover:text-primary-color hover:opacity-100 transition-colors duration-300">
                Careers
              </Link>
              <Link href="/contact" className="text-white text-[16px] font-montserrat opacity-70 hover:text-primary-color hover:opacity-100 transition-colors duration-300">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Social Media QR section */}
          <div className="md:col-span-2">
            <h3 className="text-white text-[20px] font-medium font-montserrat mb-[20px]">Scan to social media</h3>
            <div className="flex flex-col items-center">
              <p className="text-white text-[14px] font-montserrat opacity-70 mb-[10px]">All Links in one QR</p>
              <div className="bg-white p-[15px] rounded-[8px] w-[140px] h-[140px] flex items-center justify-center">
                {/* Replace with actual QR code image */}
                <div className="text-black text-[12px] font-montserrat">QR Code</div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center mt-[60px] gap-[20px]">
          <a href="#" className="w-[44px] h-[44px] flex items-center justify-center rounded-full bg-white bg-opacity-10 hover:bg-primary-color transition-colors duration-300">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.3334 10.0001C18.3334 5.40008 14.6 1.66675 10 1.66675C5.40002 1.66675 1.66669 5.40008 1.66669 10.0001C1.66669 14.1001 4.53335 17.5001 8.33335 18.1667V12.5001H6.66669V10.0001H8.33335V7.91675C8.33335 6.30841 9.64169 5.00008 11.25 5.00008H13.3334V7.50008H11.6667C11.2084 7.50008 10.8334 7.87508 10.8334 8.33341V10.0001H13.3334V12.5001H10.8334V18.2917C15.0834 17.9167 18.3334 14.3334 18.3334 10.0001Z" fill="white"/>
            </svg>
          </a>
          <a href="#" className="w-[44px] h-[44px] flex items-center justify-center rounded-full bg-white bg-opacity-10 hover:bg-primary-color transition-colors duration-300">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.1667 5.00008C18.5 5.33341 17.75 5.58341 17 5.66675C17.8333 5.16675 18.4167 4.41675 18.6667 3.50008C17.9167 3.91675 17.0833 4.25008 16.25 4.41675C15.5833 3.66675 14.5833 3.16675 13.5 3.16675C11.4167 3.16675 9.75 4.83341 9.75 6.91675C9.75 7.25008 9.75 7.58341 9.83333 7.83341C6.66667 7.66675 3.91667 6.16675 2.08333 3.91675C1.75 4.58341 1.58333 5.16675 1.58333 5.91675C1.58333 7.25008 2.25 8.41675 3.25 9.08341C2.66667 9.08341 2.08333 8.91675 1.58333 8.66675C1.58333 8.66675 1.58333 8.66675 1.58333 8.75008C1.58333 10.5834 2.83333 12.0834 4.5 12.4167C4.16667 12.5001 3.83333 12.5834 3.5 12.5834C3.25 12.5834 3 12.5834 2.75 12.5001C3.25 14.0001 4.58333 15.0834 6.16667 15.0834C4.91667 16.0834 3.33333 16.6667 1.58333 16.6667C1.25 16.6667 0.916667 16.6667 0.583333 16.5834C2.16667 17.6667 4.08333 18.2501 6.08333 18.2501C13.4167 18.2501 17.4167 12.0834 17.4167 6.75008C17.4167 6.58341 17.4167 6.33341 17.4167 6.16675C18.1667 5.58341 18.75 4.83341 19.1667 5.00008Z" fill="white"/>
            </svg>
          </a>
          <a href="#" className="w-[44px] h-[44px] flex items-center justify-center rounded-full bg-white bg-opacity-10 hover:bg-primary-color transition-colors duration-300">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 5.58333C7.5 5.58333 5.58333 7.58333 5.58333 10C5.58333 12.5 7.5 14.4167 10 14.4167C12.4167 14.4167 14.4167 12.5 14.4167 10C14.4167 7.58333 12.4167 5.58333 10 5.58333ZM10 12.75C8.41667 12.75 7.16667 11.5833 7.16667 10C7.16667 8.41667 8.33333 7.25 10 7.25C11.5833 7.25 12.75 8.41667 12.75 10C12.75 11.5833 11.5833 12.75 10 12.75ZM14.5833 4.25C14 4.25 13.5833 4.66667 13.5833 5.16667C13.5833 5.66667 14 6.08333 14.5 6.08333C15 6.08333 15.4167 5.66667 15.4167 5.16667C15.4167 4.66667 15 4.25 14.5833 4.25ZM17.5 6.08333C17.4167 4.66667 17.0833 3.41667 16.0833 2.41667C15.0833 1.41667 13.8333 1.08333 12.4167 1C10.9167 0.916667 7 0.916667 5.5 1C4.08333 1.08333 2.91667 1.41667 1.83333 2.41667C0.833333 3.41667 0.5 4.66667 0.416667 6.08333C0.333333 7.58333 0.333333 11.5 0.416667 13C0.5 14.4167 0.833333 15.5833 1.83333 16.6667C2.91667 17.6667 4.08333 18 5.5 18.0833C7 18.1667 10.9167 18.1667 12.4167 18.0833C13.8333 18 15.0833 17.6667 16.0833 16.6667C17.0833 15.5833 17.4167 14.4167 17.5 13C17.5833 11.5 17.5833 7.58333 17.5 6.08333ZM15.6667 14.5833C15.3333 15.4167 14.6667 16 13.9167 16.3333C12.6667 16.8333 10 16.75 10 16.75C9.91667 16.75 7.25 16.8333 6.08333 16.3333C5.25 16 4.66667 15.4167 4.25 14.5833C3.75 13.4167 3.83333 10.75 3.83333 10C3.83333 9.91667 3.75 7.25 4.25 6.08333C4.58333 5.25 5.25 4.66667 6.08333 4.25C7.25 3.75 9.91667 3.83333 10 3.83333C10 3.83333 12.6667 3.75 13.9167 4.25C14.6667 4.58333 15.3333 5.25 15.6667 6.08333C16.1667 7.25 16.0833 9.91667 16.0833 10C16.0833 10 16.1667 13.4167 15.6667 14.5833Z" fill="white"/>
            </svg>
          </a>
          <a href="#" className="w-[44px] h-[44px] flex items-center justify-center rounded-full bg-white bg-opacity-10 hover:bg-primary-color transition-colors duration-300">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.16667 2.5C4.16667 3.58333 3.25 4.5 2.16667 4.5C1.08333 4.5 0.166672 3.58333 0.166672 2.5C0.166672 1.41667 1.08334 0.5 2.16667 0.5C3.25 0.5 4.16667 1.41667 4.16667 2.5ZM4.16667 6.16667H0.166672V17.5H4.16667V6.16667ZM10.8333 6.16667H6.83334V17.5H10.8333V11.5C10.8333 7.75 15.8333 7.5 15.8333 11.5V17.5H19.8333V10.0833C19.8333 3.83333 12.5 4.08333 10.8333 7.25V6.16667Z" fill="white"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;