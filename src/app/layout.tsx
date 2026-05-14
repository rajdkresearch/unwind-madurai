import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { AuthProvider } from '@/components/providers/AuthProvider';
import { CartProvider } from '@/components/providers/CartProvider';
import { BookingProvider } from '@/components/providers/BookingProvider';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Unwind Madurai — Premium Private Dining & Event Space',
  description: 'Book exclusive halls and rooms for lunch, evening hangouts, and dinner in the heart of Madurai. Order from top Madurai restaurants, all served at your private space.',
  keywords: 'private dining Madurai, event space Madurai, hall booking Madurai, premium venue Madurai',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0A0A0F] text-white min-h-screen`}>
        <AuthProvider>
          <CartProvider>
            <BookingProvider>
              <Navbar />
              <main>{children}</main>
              <Footer />
            </BookingProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
