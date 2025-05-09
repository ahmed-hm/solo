import Image from 'next/image';
import Link from 'next/link';

const BigEventBanner = () => {
  return (
    <section className="py-28">
      <div className="container mx-auto px-4 max-w-[1600px]">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 bg-white">
          {/* Left column with image */}
          <div className="w-full md:w-7/12">
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src="/images/events/asian-woman-man-with-winter-clothes.jpg"
                alt="Dubai Exhibition Conference"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Right column with content */}
          <div className="w-full md:w-5/12 flex flex-col gap-[35px] bg-white">
            <h5 className="font-['Montserrat'] font-bold text-base tracking-[0.625%] text-[#BDBDBD]">June 2025</h5>

            <h1 className="font-['Dancing_Script'] font-bold text-[40px] leading-[1.25em] tracking-[0.5%] text-black">
              Dubai Exhibition
              <br />
              Conference events
            </h1>

            <h4 className="font-['Montserrat'] font-normal text-[20px] leading-[1.5em] tracking-[1%] max-w-[600px] text-black">
              Watch Solo at the Dubai Exhibition Conference events
            </h4>

            <div className="flex flex-wrap gap-2.5 mt-2">
              <Link href="#" className="btn-primary uppercase tracking-[1.4%]">
                FOLLOW US
              </Link>

              <Link href="#" className="btn-outline uppercase tracking-[1.4%]">
                READ MORE
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BigEventBanner;
