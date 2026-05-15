'use client';
import { IUser } from '@/models/user.model';
import { usePathname } from 'next/navigation';
import React from 'react';
import Link from 'next/link';
import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiGithub,
  FiMail,
  FiMapPin,
  FiPhone,
} from 'react-icons/fi';

const Footer = ({ user }: { user: IUser | null }) => {
  const pathname = usePathname();

  const hideNavbarPaths = ['/login', '/register'];
  const isDashboard = pathname?.startsWith('/dashboard');
  const isAuthPage = hideNavbarPaths.includes(pathname);

  if (isAuthPage || isDashboard) {
    return null;
  }

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-[#0a0a0a] border-t border-[#eee] dark:border-[#111] transition-colors duration-300">
      <div className="mx-auto px-4 pt-12 pb-8 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4 md:col-span-2">
            <h2
              className="text-lg font-bold tracking-widest uppercase text-[#111] dark:text-white"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Gadget BDs
            </h2>
            <p className="text-[12px] text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs">
              Premium tech solutions and gadgets delivered to your doorstep. Elevating your digital
              lifestyle with quality and trust.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <FiFacebook size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <FiInstagram size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <FiTwitter size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <FiGithub size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6 text-[#111] dark:text-white">
              Shop
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/products"
                  className="text-[12px] text-gray-500 hover:text-primary transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-[12px] text-gray-500 hover:text-primary transition-colors"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/featured"
                  className="text-[12px] text-gray-500 hover:text-primary transition-colors"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  href="/offers"
                  className="text-[12px] text-gray-500 hover:text-primary transition-colors"
                >
                  Special Offers
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6 text-[#111] dark:text-white">
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-[12px] text-gray-500 hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[12px] text-gray-500 hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-[12px] text-gray-500 hover:text-primary transition-colors"
                >
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-[12px] text-gray-500 hover:text-primary transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6 text-[#111] dark:text-white">
              Get in Touch
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FiMapPin className="text-primary mt-1" size={14} />
                <span className="text-[12px] text-gray-500">
                  Satkhira, Khulna,
                  <br />
                  Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="text-primary" size={14} />
                <span className="text-[12px] text-gray-500">+880 1XXX-XXXXXX</span>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="text-primary" size={14} />
                <span className="text-[12px] text-gray-500">support@gadgetbds.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#eee] dark:border-[#111] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-medium uppercase tracking-widest text-gray-400">
            © {currentYear} Gadget BDs. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <p className="text-[9px] font-bold uppercase tracking-tighter text-gray-400">
              Design by Farhan
            </p>
            <div className="flex gap-3">
              <div className="h-5 w-8 bg-gray-100 dark:bg-[#1a1a1a] rounded opacity-50" />
              <div className="h-5 w-8 bg-gray-100 dark:bg-[#1a1a1a] rounded opacity-50" />
              <div className="h-5 w-8 bg-gray-100 dark:bg-[#1a1a1a] rounded opacity-50" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
