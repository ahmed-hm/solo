'use client';

import { useIsRTL } from '@/i18n/client';
import Link from 'next/link';
import React from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  lng: string;
  className?: string;
  style?: 'blog' | 'recipe';
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, lng, className = '', style = 'recipe' }) => {
  const isRtl = useIsRTL(lng);

  if (style === 'blog') {
    return (
      <div className={`w-full bg-white rounded-[8px] py-3 px-5 ${className}`}>
        <div className={`flex items-center gap-2`}>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <span className="arrow">
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`${isRtl ? 'rotate-180' : ''}`}
                  >
                    <path d="M3.5 0.5L6.5 3.5L3.5 5.5" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}

              {item.href ? (
                <Link href={item.href} className="flex items-center gap-2">
                  {index === 0 && (
                    <span className="home-icon">
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
                    </span>
                  )}
                  <span className="font-['Montserrat'] font-bold text-[14px] leading-[24px] tracking-[0.2px] text-black whitespace-nowrap">
                    {item.label}
                  </span>
                </Link>
              ) : (
                <span className="font-['Montserrat'] font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#DBB58F] w-full overflow-hidden text-ellipsis whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  // Recipe style breadcrumb
  return (
    <div className={`w-full ${className}`}>
      <div className={`flex items-center text-sm ${isRtl ? 'flex-row-reverse' : ''}`}>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && <span className="mx-2">/</span>}

            {item.href ? (
              <Link href={item.href} className="hover:text-[#DBB58F] font-medium">
                {item.label}
              </Link>
            ) : (
              <span className="text-[#DBB58F] font-bold">{item.label}</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Breadcrumb;
