import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { languages } from '@/i18n/i18n-config';
import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Solo - Premium Food Products',
  description: 'Premium syrups, purees, sauces, spreads and toppings for your culinary creations',
};

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { lng } = await params;

  return (
    <>
      <Navbar lng={lng} />
      <main>{children}</main>
      <Footer lng={lng} />
    </>
  );
}
