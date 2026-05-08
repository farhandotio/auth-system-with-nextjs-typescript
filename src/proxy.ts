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

  // const session = await auth();

  // if (!session) {
  //   const loginUrl = new URL('/login', request.url);
  //   loginUrl.searchParams.set('callbackUrl', request.url);
  //   return NextResponse.redirect(loginUrl);
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|assets|favicon.ico|manifest.json|sw.js|sitemap.xml|robots.txt).*)',
  ],
};
