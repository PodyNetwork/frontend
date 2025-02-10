import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/yuzu3/eligibility')) {
    if (!request.headers.get('host')?.includes('testnet')) {
      return NextResponse.redirect('https://pody.network/404')
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/yuzu/eligibility/:path*',
}