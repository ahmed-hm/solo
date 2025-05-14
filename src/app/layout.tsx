import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Solo - Premium Food Products',
  description: 'Premium syrups, purees, sauces, spreads and toppings for your culinary creations',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}