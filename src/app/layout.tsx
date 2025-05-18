import { isRTL } from '@/i18n/i18n-config';
import type { Metadata } from 'next';
import { Dancing_Script, Montserrat } from 'next/font/google';
import React from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Solo - Premium Food Products',
  description: 'Premium syrups, purees, sauces, spreads and toppings for your culinary creations',
};

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
interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}

export default function RootLayout({ children, params }: RootLayoutProps) {
  const { lng } = React.use(params);

  // Determine text direction based on the language
  const dir = isRTL(lng) ? 'rtl' : 'ltr';

  return (
    <html lang={lng} dir={dir}>
      <body className={`${montserrat.variable} ${dancingScript.variable} antialiased`}>{children}</body>
    </html>
  );
}
