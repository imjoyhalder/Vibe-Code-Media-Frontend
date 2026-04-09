// proxy.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  // Logic here runs before every request completes
  const { pathname } = request.nextUrl
  return NextResponse.next()
}

export const config = {
  // Matches all paths starting with /dashboard or /api
  matcher: ['/dashboard/:path*', '/api/:path*'],
}
