import BigEventBanner from '@/components/home/BigEventBanner';
import FeaturedPosts from '@/components/home/FeaturedPosts';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import FeaturedSection from '@/components/home/FeaturedSection';
import FigmaCategories from '@/components/home/FigmaCategories';
import FigmaCategoryProducts from '@/components/home/FigmaCategoryProducts';
import FigmaProducts from '@/components/home/FigmaProducts';
import HeroSection from '@/components/home/HeroSection';
import ProductsSection from '@/components/home/ProductsSection';
import VideoSection from '@/components/home/VideoSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Solo - Premium Food Products | Home',
  description: 'Premium syrups, purees, sauces, spreads and toppings for your culinary creations',
};

interface HomeProps {
  params: Promise<{ lng: string }>;
}

export default async function Home({ params }: HomeProps) {
  const { lng } = await params;

  return (
    <>
      <HeroSection lng={lng} />
      <FeaturedProducts title="Best Selling Products" lng={lng} />
      <VideoSection lng={lng} />
      <ProductsSection lng={lng} />
      <FeaturedSection lng={lng} />
      <FigmaCategoryProducts lng={lng} />
      <BigEventBanner lng={lng} />
      <FeaturedPosts lng={lng} />
    </>
  );
}
