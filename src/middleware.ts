import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/yuzu/eligibility')) {
    if (!request.headers.get('host')?.includes('testnet')) {
      return NextResponse.redirect('https://pody.network/')
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/yuzu/eligibility/:path*',
}