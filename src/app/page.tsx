import BigEventBanner from '@/components/home/BigEventBanner';
import FeaturedPosts from '@/components/home/FeaturedPosts';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import FeaturedSection from '@/components/home/FeaturedSection';
import FigmaCategoryProducts from '@/components/home/FigmaCategoryProducts';
import HeroSection from '@/components/home/HeroSection';
import ProductsSection from '@/components/home/ProductsSection';
import VideoSection from '@/components/home/VideoSection';

export default function Home() {
  return (
    <div className="min-h-screen c-background">
      <HeroSection />
      <FeaturedProducts title="Best Selling Products" />
      <VideoSection />
      <ProductsSection />
      <FeaturedSection />
      <FigmaCategoryProducts />
      <BigEventBanner />
      <FeaturedPosts />
    </div>
  );
}
