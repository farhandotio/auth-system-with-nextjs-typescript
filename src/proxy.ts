import { NextResponse, type NextRequest } from 'next/server';
import { auth } from './auth';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const publicRoutes = [
    '/',
    '/login',
    '/register',
    '/api/auth',
    '/favicon.ico',
    '/_next',
    '/assets',
    '/sitemap.xml',
    '/robots.txt',
    '/manifest.json',
    '/sw.js',
  ];

  const isPublic = publicRoutes.some(
    (path) => pathname === path || pathname.startsWith(path + '/')
  );

  if (isPublic) {
    return NextResponse.next();
  }

  // Session data fetch kora (auth configuration onujayi)
  const session = await auth();

  // 1. Jodi session na thake, login-e pathabe
  if (!session || !session.user) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', request.url);
    return NextResponse.redirect(loginUrl);
  }

  const role = (session.user as any).role; // User role fetch

  // 2. Dashboard Protection Logic
  if (pathname.startsWith('/dashboard')) {
    if (pathname.startsWith('/dashboard/admin') && role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (pathname.startsWith('/dashboard/seller') && role !== 'seller') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (pathname.startsWith('/dashboard/user') && role !== 'user') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|assets|favicon.ico|manifest.json|sw.js|sitemap.xml|robots.txt).*)',
  ],
};
