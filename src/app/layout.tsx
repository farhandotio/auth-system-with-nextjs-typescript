import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Provider from '@/Provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'GadgetBDs - Latest Gadgets and Technology News',
  description:
    'GadgetBDs is a website that provides information about the latest gadgets and technology news. We cover a wide range of topics, including smartphones, laptops, gaming, and more. Our goal is to help our readers stay informed about the latest trends in technology and make informed decisions when it comes to purchasing gadgets.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
