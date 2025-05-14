import type { Metadata } from 'next';
import '../globals.css';
import { Montserrat, Dancing_Script } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { languages, isRTL } from '@/i18n/i18n-config';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

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

  // Determine text direction based on the language
  const dir = isRTL(lng) ? 'rtl' : 'ltr';

  return (
    <html lang={lng} dir={dir}>
      <body className={`${montserrat.variable} ${dancingScript.variable} antialiased`}>
        <Navbar lng={lng} />
        <main>{children}</main>
        <Footer lng={lng} />
      </body>
    </html>
  );
}
