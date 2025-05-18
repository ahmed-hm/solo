'use client';

import { useIsRTL } from '@/i18n/client';
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  lng: string;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, lng }) => {
  const isRtl = useIsRTL(lng);

  const renderPageNumbers = () => {
    const pageNumbers = [];

    // For simplicity, show all page numbers if there are few pages
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`
            min-w-[60px] h-[50px] mx-[2.5px] flex items-center justify-center rounded-[5px] border
            ${
              currentPage === i
                ? 'bg-[#DBB58F] text-white border-[#E9E9E9]'
                : 'bg-white text-[#DBB58F] border-[#E9E9E9] hover:bg-gray-50'
            } font-bold text-sm tracking-wider transition-colors`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className={`flex items-center justify-center mt-10 ${isRtl ? 'flex-row-reverse' : ''}`}>
      {/* First/Prev button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`
          min-w-[80px] h-[50px] mx-[2.5px] flex items-center justify-center rounded-[4px] border
          ${
            currentPage === 1
              ? 'bg-[#F3F3F3] text-[#BDBDBD] border-[#BDBDBD] cursor-not-allowed'
              : 'bg-[#F3F3F3] text-[#BDBDBD] border-[#BDBDBD] hover:bg-gray-200'
          } font-bold text-sm tracking-wider transition-colors`}
      >
        First
      </button>

      {/* Page numbers */}
      <div className="flex mx-0">{renderPageNumbers()}</div>

      {/* Next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`
          min-w-[80px] h-[50px] mx-[2.5px] flex items-center justify-center rounded-[5px] border
          ${
            currentPage === totalPages
              ? 'bg-white text-[#DBB58F] border-[#E8E8E8] cursor-not-allowed opacity-50'
              : 'bg-white text-[#DBB58F] border-[#E8E8E8] hover:bg-gray-50'
          } font-bold text-sm tracking-wider transition-colors`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
