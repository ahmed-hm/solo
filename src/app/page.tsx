import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import BannerSection from "@/components/home/BannerSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import VideoSection from "@/components/home/VideoSection";
import ProductsSection from "@/components/home/ProductsSection";
import FeaturedPosts from "@/components/home/FeaturedPosts";
import EventBanner from "@/components/home/EventBanner";
import FeaturedSection from "@/components/home/FeaturedSection";
import FigmaCategoryProducts from "@/components/home/FigmaCategoryProducts";
import BigEventBanner from "@/components/home/BigEventBanner";

export default function Home() {
  return (
    <div className="min-h-screen c-background">
      <HeroSection />
      <FeaturedProducts />
      <VideoSection />
      <ProductsSection />
      <FeaturedSection />
      <FigmaCategoryProducts />
      <BigEventBanner />
      {/* <BannerSection />
      <CategoriesSection /> */}
      <FeaturedPosts />
      {/* <EventBanner /> */}
    </div>
  );
}
