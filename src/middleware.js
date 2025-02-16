import { NextResponse } from 'next/server';

export function middleware(request) {
  const authCookie = request.cookies.get('auth');
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin/');

  if (isAdminRoute && !authCookie) {
    // Redirect to login if accessing admin route without auth
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  // If authenticated and trying to access login page, redirect to admin dashboard
  if (authCookie && request.nextUrl.pathname === '/admin') {
    return NextResponse.redirect(new URL('/admin/orders', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
  ]
};
