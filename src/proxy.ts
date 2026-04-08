// /src/proxy.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 1. Define Route Groups
const PRIVATE_ROUTES = ['/dashboard', '/profile'];
const AUTH_ROUTES = ['/login', '/register'];

/**
 * Next.js 16 Proxy Function
 * Intercepts requests before they reach your pages or API routes.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 2. Authentication Check
  const token = request.cookies.get('token')?.value;
  const isAuthenticated = !!token;

  // 3. Specific Proxy/Redirect Logic
  // Example: Redirecting legacy /about paths to /home
  if (pathname.startsWith('/about')) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  // 4. Protection Logic for Private Routes
  const isPrivateRoute = PRIVATE_ROUTES.some(route => pathname.startsWith(route));
  if (isPrivateRoute && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname); // Redirect back after login
    return NextResponse.redirect(loginUrl);
  }

  // 5. Logic for Auth Routes (Login/Register)
  // Prevent logged-in users from seeing the login page
  const isAuthRoute = AUTH_ROUTES.some(route => pathname.startsWith(route));
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Allow the request to proceed to the app
  return NextResponse.next();
}

/**
 * 6. Proxy Configuration Matcher
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - common image formats (svg, png, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};