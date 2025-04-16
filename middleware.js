import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';


const JWT_SECRET = process.env.JWT_SECRET || "key is always secret rule @969" ;


 function verifyJWT(token) {
  try {
      console.log('Token verified:',jwt.verify(token, JWT_SECRET) ); // Debug logging
    return jwt.verify(token, JWT_SECRET);
    
  } catch (error) {
    return null;
  }
}


export async function middleware(request) {
  // Get token from cookies
  const token = request.cookies.get('token')?.value;
  console.log('Token:', token); // Debug logging

  // Protected routes that require authentication
  const protectedPaths = ['/dashboard', '/dashboard/expenses', '/dashboard/categories'];
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  if(isProtectedPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

    console.log('Token exists:', token); // Debug logging
        
    const payload = verifyJWT(token);
    console.log('Payload:', payload); // Debug logging
 

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