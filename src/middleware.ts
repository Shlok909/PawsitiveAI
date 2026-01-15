import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Allow requests for auth pages, static files, and API routes
  if (
    pathname.startsWith('/signin') ||
    pathname.startsWith('/signup') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname === '/'
  ) {
    return NextResponse.next()
  }

  // Redirect non-authenticated users to the sign-in page
  // The actual authentication check will happen in a client component layout
  const sessionCookie = request.cookies.get('firebase-auth-session');
  
  // This is a simplified check. A real app would verify the session cookie.
  // We rely on client-side checks in AppLayout for the actual protection.
  if (!sessionCookie && !pathname.startsWith('/dashboard')) {
      // Allow access to the dashboard path server-side so the client-side redirect can happen
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
