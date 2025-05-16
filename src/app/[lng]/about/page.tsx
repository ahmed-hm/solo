import { Metadata } from 'next';
import Image from 'next/image';
import { getTranslation } from '@/i18n/server';

export const metadata: Metadata = {
  title: 'Solo - Premium Food Products | About Us',
  description: "Learn about Solo's journey, vision, and commitment to quality in the world of premium food products",
};

interface AboutPageProps {
  params: Promise<{ lng: string }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { lng } = await params;
  const { t } = await getTranslation(lng, 'common');

  return (
    <section className="w-full bg-[#EFF2F6] md:bg-white">
      <section className="w-full mt-16">
        {/* Hero Section */}
        <div className="container flex flex-col lg:flex-row items-center justify-between items-stretch">
          <div className="w-full lg:w-1/2 bg-white">
            <div className="h-[400px] md:h-[500px] w-full overflow-hidden relative">
              <Image
                src="/images/about/about-hero.jpg"
                alt={t('about.hero.imageAlt')}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col gap-6 p-6 py-auto bg-white justify-center">
            <h1 className="font-['Dancing_Script'] text-4xl md:text-5xl font-bold text-black">
              {t('about.hero.title')}
            </h1>
            <p className="text-lg md:text-xl font-['Montserrat'] text-black">{t('about.hero.description')}</p>
          </div>
        </div>
      </section>

      {/* Feature Cards Section - Mobile layout adjustment */}
      <section className="w-full bg-[#EFF2F6] md:bg-white my-8 md:my-16 py-8 md:py-16">
        <div className="container mx-auto px-4 py-10 md:py-20">
          {/* Mobile layout - stacked cards */}
          <div className="block md:hidden">
            {/* Sophisticated Card (full width on mobile) */}
            <div className="bg-white rounded-sm overflow-hidden shadow-sm mb-6 relative">
              <div className="aspect-[3/2] relative">
                <Image
                  src="/images/about/sophisticated.jpg"
                  alt={t('about.sophisticated.imageAlt')}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-0 w-full md:w-[70%] p-4 md:p-6 bg-[rgba(219,181,143,0.75)]">
                <h3 className="font-['Dancing_Script'] text-xl font-bold text-black mb-2 tracking-[0.4%]">
                  {t('about.sophisticated.title')}
                </h3>
                <p className="text-black text-sm font-['Montserrat'] leading-[1.67] tracking-[1.1%]">
                  {t('about.sophisticated.description')}
                </p>
              </div>
            </div>

            {/* Distinctive Card */}
            <div className="bg-white rounded-sm overflow-hidden shadow-sm mb-6 relative">
              <div className="aspect-[3/2] relative">
                <Image
                  src="/images/about/distinctive.jpg"
                  alt={t('about.distinctive.imageAlt')}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-0 w-full md:w-[70%] p-4 md:p-6 bg-[rgba(219,181,143,0.75)]">
                <h3 className="font-['Dancing_Script'] text-xl font-normal text-black mb-2 tracking-[1%]">
                  {t('about.distinctive.title')}
                </h3>
                <p className="text-black text-sm font-['Montserrat'] leading-[2.14] tracking-[1.43%]">
                  {t('about.distinctive.description')}
                </p>
              </div>
            </div>

            {/* Premium Card */}
            <div className="bg-white rounded-sm overflow-hidden shadow-sm mb-6 relative">
              <div className="aspect-[3/2] relative">
                <Image
                  src="/images/about/premium.jpg"
                  alt={t('about.premium.imageAlt')}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-0 w-full md:w-[70%] p-4 md:p-6 bg-[rgba(219,181,143,0.75)]">
                <h3 className="font-['Dancing_Script'] text-xl font-bold text-black mb-2 tracking-[1%]">
                  {t('about.premium.title')}
                </h3>
                <p className="text-black text-sm font-['Montserrat'] leading-[2.14] tracking-[1.43%]">
                  {t('about.premium.description')}
                </p>
              </div>
            </div>
          </div>

          {/* Desktop layout - 2 column grid */}
          <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* First column - Sophisticated Card (tall card) */}
            <div className="bg-white rounded-sm overflow-hidden shadow-sm h-full relative">
              <div className="aspect-[1/1] relative">
                <Image
                  src="/images/about/sophisticated.jpg"
                  alt={t('about.sophisticated.imageAlt')}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-0 w-[70%] p-6 bg-[rgba(219,181,143,0.75)]">
                <h3 className="font-['Dancing_Script'] text-2xl font-bold text-black mb-4 tracking-[0.4%]">
                  {t('about.sophisticated.title')}
                </h3>
                <p className="text-black text-lg font-['Montserrat'] leading-[1.67] tracking-[1.1%]">
                  {t('about.sophisticated.description')}
                </p>
              </div>
            </div>

            {/* Second column - Distinctive and Premium Cards (stacked) */}
            <div className="flex flex-col gap-4 h-full">
              {/* Distinctive Card */}
              <div className="bg-white rounded-sm overflow-hidden shadow-sm flex-1 relative">
                <div className="w-full h-full relative">
                  <Image
                    src="/images/about/distinctive.jpg"
                    alt={t('about.distinctive.imageAlt')}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute bottom-0 left-0 w-[70%] p-6 bg-[rgba(219,181,143,0.75)]">
                  <h3 className="font-['Dancing_Script'] text-xl font-normal text-black mb-2 tracking-[1%]">
                    {t('about.distinctive.title')}
                  </h3>
                  <p className="text-black text-sm font-['Montserrat'] leading-[2.14] tracking-[1.43%]">
                    {t('about.distinctive.description')}
                  </p>
                </div>
              </div>

              {/* Premium Card */}
              <div className="bg-white rounded-sm overflow-hidden shadow-sm flex-1 relative">
                <div className="w-full h-full relative">
                  <Image
                    src="/images/about/premium.jpg"
                    alt={t('about.premium.imageAlt')}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute bottom-0 left-0 w-[70%] p-6 bg-[rgba(219,181,143,0.75)]">
                  <h3 className="font-['Dancing_Script'] text-xl font-bold text-black mb-2 tracking-[1%]">
                    {t('about.premium.title')}
                  </h3>
                  <p className="text-black text-sm font-['Montserrat'] leading-[2.14] tracking-[1.43%]">
                    {t('about.premium.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exceptional Section - Mobile adjustments */}
      <section className="w-full bg-white py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-10 lg:gap-20">
            <div className="w-full lg:w-1/2 relative">
              <div className="h-[300px] md:h-[400px] lg:h-[500px] w-full overflow-hidden rounded-lg relative">
                <Image
                  src="/images/about/exceptional.jpg"
                  alt={t('about.exceptional.imageAlt')}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/10"></div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 flex flex-col gap-4 md:gap-6 my-6 md:my-0">
              <h2 className="font-['Dancing_Script'] text-3xl md:text-4xl font-bold text-[#252B42]">
                {t('about.exceptional.title')}
              </h2>
              <p className="text-[#737373] text-base md:text-lg">{t('about.exceptional.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section - Mobile adjustments */}
      <section className="w-full py-8 md:py-16">
        <div className="px-4 md:px-0">
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 lg:gap-16 py-8 bg-[#FAFAFA]">
            {/* Certification logos */}
            <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
              <Image
                src="/images/about/certifications/halal-logo.svg"
                alt={t('about.certifications.halal')}
                width={60}
                height={60}
                className="md:w-[80px] md:h-[80px]"
              />
            </div>
            <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
              <Image
                src="/images/about/certifications/fssc-22000-logo.svg"
                alt={t('about.certifications.fssc')}
                width={60}
                height={60}
                className="md:w-[80px] md:h-[80px]"
              />
            </div>
            <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
              <Image
                src="/images/about/certifications/iso-45001-logo.svg"
                alt={t('about.certifications.iso45001')}
                width={60}
                height={60}
                className="md:w-[80px] md:h-[80px]"
              />
            </div>
            <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
              <Image
                src="/images/about/certifications/iso-9001-logo.svg"
                alt={t('about.certifications.iso9001')}
                width={60}
                height={60}
                className="md:w-[80px] md:h-[80px]"
              />
            </div>
            <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
              <Image
                src="/images/about/certifications/iso-9001-2015-logo.svg"
                alt={t('about.certifications.iso90012015')}
                width={60}
                height={60}
                className="md:w-[80px] md:h-[80px]"
              />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
