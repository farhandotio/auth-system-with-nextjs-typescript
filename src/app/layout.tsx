import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Provider from '@/Provider';
import connectDB from '@/lib/connectDB';
import { auth } from '@/auth';
import User from '@/models/user.model';
import EditRoleAndPhone from '@/components/EditRoleAndPhone';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EditSellerDetails from '@/components/EditSellerDetails';
import StoreProvider from '@/store/StoreProvider';
import InitHooks from '@/InitHooks';

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await connectDB();
  const session = await auth();
  const user = await User.findById(session?.user?.id);

  const incomplete = !user?.role || !user?.phone || (!user?.phone && user?.role === 'user');

  const isSellerMissingDetails =
    user?.role === 'seller' && (!user?.shopName || !user?.shopAddress || !user?.shopType);

  const plainUser = JSON.parse(JSON.stringify(user));

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-[#fafafa] dark:bg-[#0a0a0a] dark:text-[#fafafa] text-[#0a0a0a] transition-colors duration-300"
        suppressHydrationWarning
      >
        <Provider>
          <StoreProvider>
            <InitHooks />
            {user && incomplete ? (
              <EditRoleAndPhone />
            ) : user?.role === 'seller' && isSellerMissingDetails ? (
              <EditSellerDetails />
            ) : (
              <>
                <Navbar user={plainUser} />
                {children}
                <Footer user={plainUser} />
              </>
            )}
          </StoreProvider>
        </Provider>
      </body>
    </html>
  );
}
