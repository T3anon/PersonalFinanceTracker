import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET
  
  if (!secret) {
    console.warn('⚠️ NEXTAUTH_SECRET is not set')
  }

  const token = await getToken({ 
    req: request, 
    secret: secret || 'fallback-secret'
  })

  // Redirect to login if accessing protected routes without token
  if (!token) {
    console.log('No token found, redirecting to /login')
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/budget/:path*', '/profile/:path*', '/userhomepage/:path*']
}