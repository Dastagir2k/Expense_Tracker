import { NextResponse } from 'next/server';
import { verifyJWT } from './lib/jwt';

export async function middleware(request) {
  // Get token from cookies
  const token = request.cookies.get('token')?.value;

  // Protected routes that require authentication
  const protectedPaths = ['/dashboard', '/expenses', '/categories'];
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedPath) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const payload = verifyJWT(token);
    if (!payload) {
      // Clear invalid token and redirect to login
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('token');
      return response;
    }
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/expenses/:path*',
    '/categories/:path*'
  ]
};