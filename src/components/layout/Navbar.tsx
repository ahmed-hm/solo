'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useTranslation, useIsRTL } from '../../i18n/client';
import LanguageSwitcher from './LanguageSwitcher';

interface NavbarProps {
  lng: string;
}

const Navbar = ({ lng = 'en' }: NavbarProps) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation(lng);
  const isRtl = useIsRTL(lng);

  const toggleDropdown = (menuId: string) => {
    if (activeDropdown === menuId) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(menuId);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleMobileSubmenu = (menuId: string) => {
    if (mobileSubmenuOpen === menuId) {
      setMobileSubmenuOpen(null);
    } else {
      setMobileSubmenuOpen(menuId);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 bg-white shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)] z-50 py-4 lg:p-4">
      <div className="container mx-auto px-[15px] py-[12px] lg:px-[20px] lg:py-[27px] flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link href={`/${lng}`} className="flex items-center">
            <Image
              src="/images/logo.svg"
              alt="Solo Logo"
              width={180}
              height={70}
              className="w-[150px] h-auto lg:w-[260px]"
              priority
            />
          </Link>
        </div>

        {/* Navigation Menu - Apply RTL-aware classes */}
        <nav ref={navRef} className={`hidden lg:flex items-center gap-[25px] ${isRtl ? 'flex-row-reverse' : ''}`}>
          <Link
            href={`/${lng}`}
            className={`text-[#DBB58F] font-['Montserrat'] font-bold text-[17px] leading-[20.7px] tracking-[-0.6px]`}
          >
            {t('nav.home')}
          </Link>
          <div className={`flex items-center gap-[3px] relative ${isRtl ? 'flex-row-reverse' : ''}`}>
            <Link
              href={`/${lng}/about`}
              className="text-black font-['Montserrat'] font-medium text-[17px] leading-[20.7px] tracking-[-0.6px] hover:text-[#DBB58F] transition duration-300"
            >
              {t('nav.aboutUs')}
            </Link>
            <button
              onClick={() => toggleDropdown('about')}
              className="focus:outline-none h-full"
              aria-label="Toggle About Us dropdown menu"
            >
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1 1L5 5L9 1"
                  stroke="#252B42"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {activeDropdown === 'about' && (
              <div
                className={`absolute top-full ${
                  isRtl ? 'right-0' : 'left-0'
                } mt-2 w-[178px] bg-white shadow-md flex flex-col z-10`}
              >
                <div className="w-full py-1">
                  <hr className="border-[#DBB58F] border-t-[5px]" />
                </div>
                <div className="flex flex-col gap-[10px] p-[10px]">
                  <Link
                    href={`/${lng}/about`}
                    className="text-black font-['Montserrat'] font-medium text-[14px] hover:text-[#DBB58F] transition duration-300"
                  >
                    {t('nav.ourStory')}
                  </Link>
                  <Link
                    href={`/${lng}/solo-core`}
                    className="text-black font-['Montserrat'] font-medium text-[14px] hover:text-[#DBB58F] transition duration-300"
                  >
                    {t('nav.coreOfSolo')}
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div className={`flex items-center gap-[3px] relative ${isRtl ? 'flex-row-reverse' : ''}`}>
            <Link
              href={`/${lng}/recipes`}
              className="text-black font-['Montserrat'] font-medium text-[17px] leading-[20.7px] tracking-[-0.6px] hover:text-[#DBB58F] transition duration-300"
            >
              {t('nav.recipes')}
            </Link>
          </div>
          <div className={`flex items-center gap-[3px] relative ${isRtl ? 'flex-row-reverse' : ''}`}>
            <Link
              href={`/${lng}/partners`}
              className="text-black font-['Montserrat'] font-medium text-[17px] leading-[20.7px] tracking-[-0.6px] hover:text-[#DBB58F] transition duration-300"
            >
              {t('nav.partners')}
            </Link>
            <button
              onClick={() => toggleDropdown('partners')}
              className="focus:outline-none"
              aria-label="Toggle Partners dropdown menu"
            >
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1 1L5 5L9 1"
                  stroke="#252B42"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {activeDropdown === 'partners' && (
              <div
                className={`absolute top-full ${
                  isRtl ? 'right-0' : 'left-0'
                } mt-2 w-[178px] bg-white shadow-md flex flex-col z-10`}
              >
                <div className="w-full py-1">
                  <hr className="border-[#DBB58F] border-t-[5px]" />
                </div>
                <div className="flex flex-col gap-[10px] p-[10px]">
                  <Link
                    href={`/${lng}/partners`}
                    className="text-black font-['Montserrat'] font-medium text-[14px] hover:text-[#DBB58F] transition duration-300"
                  >
                    {t('nav.clients')}
                  </Link>
                  <Link
                    href={`/${lng}/countries`}
                    className="text-black font-['Montserrat'] font-medium text-[14px] hover:text-[#DBB58F] transition duration-300"
                  >
                    {t('nav.countries')}
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Language Selector and Menu Button */}
        <div className={`flex items-center gap-[10px] lg:gap-[20px]`}>
          {/* Language switcher */}
          <LanguageSwitcher lng={lng} />

          {/* Mobile menu button */}
          <button
            className="lg:hidden flex flex-col justify-center items-center focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0.726624 0.536545H18.7266V2.53654H0.726624V0.536545ZM0.726624 7.53654H18.7266V9.53654H0.726624V7.53654ZM0.726624 14.5365H18.7266V16.5365H0.726624V14.5365Z"
                fill="black"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay - also make RTL-aware */}
      {mobileMenuOpen && (
        <div className={`fixed top-0 right-0 left-0 bg-white z-50 overflow-y-auto lg:hidden shadow-md h-full`}>
          {/* Menu Header */}
          <div className="flex justify-between items-center p-4 bg-black text-white border-b border-gray-700">
            <span className="text-lg font-['Montserrat'] font-medium">{t('nav.menu')}</span>
            <button onClick={toggleMobileMenu} className="focus:outline-none text-white" aria-label="Close menu">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Menu Items - Apply RTL-aware styles */}
          <div className="p-4 flex flex-col gap-5">
            {/* Home with icon */}
            <Link href={`/${lng}`} className="flex items-center gap-3" onClick={toggleMobileMenu}>
              <div className="w-6 h-6 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5 10.5V20H19V10.5"
                    stroke="#DBB58F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 3L2 12H22L12 3Z"
                    stroke="#DBB58F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-[#DBB58F] font-['Montserrat'] font-medium text-[16px]">{t('nav.home')}</span>
            </Link>

            {/* About Us with icon and dropdown */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path d="M12 8V12" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path
                        d="M12 16H12.01"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <button
                    onClick={() => toggleMobileSubmenu('about')}
                    className="text-black font-['Montserrat'] font-medium text-[16px] focus:outline-none text-left"
                  >
                    {t('nav.aboutUs')}
                  </button>
                </div>
                <button onClick={() => toggleMobileSubmenu('about')} className="focus:outline-none">
                  {mobileSubmenuOpen === 'about' ? (
                    <svg width="24" height="24" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M13.0938 26.4682C5.94665 26.4682 0.153076 20.6746 0.153076 13.5274C0.153076 6.38026 5.94665 0.586685 13.0938 0.586685C20.241 0.586685 26.0346 6.38026 26.0346 13.5274C26.0346 20.6746 20.241 26.4682 13.0938 26.4682ZM13.0938 23.88C15.8395 23.88 18.4727 22.7893 20.4142 20.8478C22.3557 18.9063 23.4464 16.2731 23.4464 13.5274C23.4464 10.7817 22.3557 8.14853 20.4142 6.20704C18.4727 4.26555 15.8395 3.17483 13.0938 3.17483C10.3481 3.17483 7.71492 4.26555 5.77343 6.20704C3.83194 8.14853 2.74122 10.7817 2.74122 13.5274C2.74122 16.2731 3.83194 18.9063 5.77343 20.8478C7.71492 22.7893 10.3481 23.88 13.0938 23.88V23.88ZM6.62345 12.2334H19.5642V14.8215H6.62345V12.2334Z"
                        fill="black"
                      />
                    </svg>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M11.7996 12.2333V7.05704H14.3878V12.2333H19.5641V14.8215H14.3878V19.9978H11.7996V14.8215H6.62333V12.2333H11.7996ZM13.0937 26.4682C5.94653 26.4682 0.152954 20.6746 0.152954 13.5274C0.152954 6.38024 5.94653 0.58667 13.0937 0.58667C20.2409 0.58667 26.0344 6.38024 26.0344 13.5274C26.0344 20.6746 20.2409 26.4682 13.0937 26.4682ZM13.0937 23.88C15.8394 23.88 18.4726 22.7893 20.4141 20.8478C22.3556 18.9063 23.4463 16.2731 23.4463 13.5274C23.4463 10.7817 22.3556 8.14851 20.4141 6.20702C18.4726 4.26554 15.8394 3.17482 13.0937 3.17482C10.348 3.17482 7.7148 4.26554 5.77331 6.20702C3.83182 8.14851 2.7411 10.7817 2.7411 13.5274C2.7411 16.2731 3.83182 18.9063 5.77331 20.8478C7.7148 22.7893 10.348 23.88 13.0937 23.88V23.88Z"
                        fill="black"
                      />
                    </svg>
                  )}
                </button>
              </div>

              {/* About Us Submenu */}
              {mobileSubmenuOpen === 'about' && (
                <div className="flex flex-col gap-4 px-9">
                  <Link
                    href={`/${lng}/about`}
                    className="text-black font-['Montserrat'] font-medium text-[15px] flex items-center justify-between"
                    onClick={toggleMobileMenu}
                  >
                    <span>{t('nav.ourStory')}</span>
                    <svg
                      width="7"
                      height="13"
                      viewBox="0 0 7 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={isRtl ? 'rotate-180' : ''}
                    >
                      <path d="M6.75476 6.05632L0.754761 12.0563V0.0563202L6.75476 6.05632Z" fill="black" />
                    </svg>
                  </Link>
                  <Link
                    href={`/${lng}/solo-core`}
                    className="text-black font-['Montserrat'] font-medium text-[15px] flex items-center justify-between"
                    onClick={toggleMobileMenu}
                  >
                    <span>{t('nav.coreOfSolo')}</span>
                    <svg
                      width="7"
                      height="13"
                      viewBox="0 0 7 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={isRtl ? 'rotate-180' : ''}
                    >
                      <path d="M6.75476 6.05632L0.754761 12.0563V0.0563202L6.75476 6.05632Z" fill="black" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>

            {/* Recipes with icon */}
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M2 6H22V18H2V6Z"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 10C12.5523 10 13 9.55228 13 9C13 8.44772 12.5523 8 12 8C11.4477 8 11 8.44772 11 9C11 9.55228 11.4477 10 12 10Z"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17 10C17.5523 10 18 9.55228 18 9C18 8.44772 17.5523 8 17 8C16.4477 8 16 8.44772 16 9C16 9.55228 16.4477 10 17 10Z"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 10C7.55228 10 8 9.55228 8 9C8 8.44772 7.55228 8 7 8C6.44772 8 6 8.44772 6 9C6 9.55228 6.44772 10 7 10Z"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <Link
                href={`/${lng}/recipes`}
                className="text-black font-['Montserrat'] font-medium text-[16px]"
                onClick={toggleMobileMenu}
              >
                {t('nav.recipes')}
              </Link>
            </div>

            {/* Our Success Partners with icon and dropdown */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M23 21V19C22.9986 17.1771 21.765 15.5857 20 15.13"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16 3.13C17.7699 3.58317 19.0078 5.17799 19.0078 7.005C19.0078 8.83201 17.7699 10.4268 16 10.88"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <button
                    onClick={() => toggleMobileSubmenu('partners')}
                    className="text-black font-['Montserrat'] font-medium text-[16px] focus:outline-none text-left"
                  >
                    {t('nav.partners')}
                  </button>
                </div>
                <button onClick={() => toggleMobileSubmenu('partners')} className="focus:outline-none">
                  {mobileSubmenuOpen === 'partners' ? (
                    <svg width="24" height="24" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M13.0938 26.4682C5.94665 26.4682 0.153076 20.6746 0.153076 13.5274C0.153076 6.38026 5.94665 0.586685 13.0938 0.586685C20.241 0.586685 26.0346 6.38026 26.0346 13.5274C26.0346 20.6746 20.241 26.4682 13.0938 26.4682ZM13.0938 23.88C15.8395 23.88 18.4727 22.7893 20.4142 20.8478C22.3557 18.9063 23.4464 16.2731 23.4464 13.5274C23.4464 10.7817 22.3557 8.14853 20.4142 6.20704C18.4727 4.26555 15.8395 3.17483 13.0938 3.17483C10.3481 3.17483 7.71492 4.26555 5.77343 6.20704C3.83194 8.14853 2.74122 10.7817 2.74122 13.5274C2.74122 16.2731 3.83194 18.9063 5.77343 20.8478C7.71492 22.7893 10.3481 23.88 13.0938 23.88V23.88ZM6.62345 12.2334H19.5642V14.8215H6.62345V12.2334Z"
                        fill="black"
                      />
                    </svg>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M11.7996 12.2333V7.05704H14.3878V12.2333H19.5641V14.8215H14.3878V19.9978H11.7996V14.8215H6.62333V12.2333H11.7996ZM13.0937 26.4682C5.94653 26.4682 0.152954 20.6746 0.152954 13.5274C0.152954 6.38024 5.94653 0.58667 13.0937 0.58667C20.2409 0.58667 26.0344 6.38024 26.0344 13.5274C26.0344 20.6746 20.2409 26.4682 13.0937 26.4682ZM13.0937 23.88C15.8394 23.88 18.4726 22.7893 20.4141 20.8478C22.3556 18.9063 23.4463 16.2731 23.4463 13.5274C23.4463 10.7817 22.3556 8.14851 20.4141 6.20702C18.4726 4.26554 15.8394 3.17482 13.0937 3.17482C10.348 3.17482 7.7148 4.26554 5.77331 6.20702C3.83182 8.14851 2.7411 10.7817 2.7411 13.5274C2.7411 16.2731 3.83182 18.9063 5.77331 20.8478C7.7148 22.7893 10.348 23.88 13.0937 23.88V23.88Z"
                        fill="black"
                      />
                    </svg>
                  )}
                </button>
              </div>

              {/* Partners Submenu */}
              {mobileSubmenuOpen === 'partners' && (
                <div className="flex flex-col gap-4 px-9">
                  <Link
                    href={`/${lng}/partners`}
                    className="text-black font-['Montserrat'] font-medium text-[15px] flex items-center justify-between"
                    onClick={toggleMobileMenu}
                  >
                    <span>{t('nav.clients')}</span>
                    <svg
                      width="7"
                      height="13"
                      viewBox="0 0 7 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={isRtl ? 'rotate-180' : ''}
                    >
                      <path d="M6.75476 6.05632L0.754761 12.0563V0.0563202L6.75476 6.05632Z" fill="black" />
                    </svg>
                  </Link>
                  <Link
                    href={`/${lng}/countries`}
                    className="text-black font-['Montserrat'] font-medium text-[15px] flex items-center justify-between"
                    onClick={toggleMobileMenu}
                  >
                    <span>{t('nav.countries')}</span>
                    <svg
                      width="7"
                      height="13"
                      viewBox="0 0 7 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={isRtl ? 'rotate-180' : ''}
                    >
                      <path d="M6.75476 6.05632L0.754761 12.0563V0.0563202L6.75476 6.05632Z" fill="black" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
