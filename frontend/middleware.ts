import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // NOTE: In a real app, check cookies for authToken.
  // Here, just redirect if accessing /dashboard without a token.
  const url = request.nextUrl;
  if (url.pathname.startsWith('/dashboard')) {
    // This is where you'd check for a cookie-based token.
    // For this example, just allow.
    // If not authenticated, redirect:
    // return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
