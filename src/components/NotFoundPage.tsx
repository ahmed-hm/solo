'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/i18n/client';

interface NotFoundPageProps {
  lng: string;
}

export default function NotFoundPage({ lng }: NotFoundPageProps) {
  // Use translation hook
  const { t } = useTranslation(lng);

  return (
    <div className="w-full h-full bg-[#F7F7F7] flex items-center justify-center">
      <div className="w-full h-full px-4 py-8">
        <div className="w-full h-full flex flex-col items-center rounded-[7.5px] bg-white shadow-md p-6 md:p-[22.5px] justify-center">
          {/* Illustration */}
          <div className="w-full max-w-[300px] aspect-square relative mb-6">
            <Image
              src="/images/404-illustration.svg"
              alt={t('notFound.illustration', 'Page not found illustration')}
              width={800}
              height={800}
              priority
            />
          </div>

          {/* Text Content */}
          <div className="flex flex-col items-center gap-2">
            <h1 className="font-['Montserrat'] font-bold text-2xl md:text-[30px] text-[#202020] text-center leading-[1.22]">
              {t('notFound.title', 'Page not found')}
            </h1>
            <p className="font-['Montserrat'] text-lg md:text-[27px] text-[#727272] text-center leading-[1.67]">
              {t('notFound.message', 'Sorry this page is no longer available.')}
            </p>
          </div>

          {/* Back to Home Button */}
          <div className="mt-8">
            <Link
              href={`/${lng}`}
              className="bg-[#DBB58F] text-white font-['Montserrat'] font-bold py-3 px-8 rounded hover:bg-[#c9a57f] transition-colors duration-300"
            >
              {t('notFound.backToHome', 'Back to Home')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
