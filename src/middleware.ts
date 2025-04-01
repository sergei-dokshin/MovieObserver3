import { NextResponse, NextRequest } from 'next/server';

// еренаправляем пользователя с '/events' на '/events/all'
export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/events/all', request.url));
}

export const config = {
  matcher: ['/events']
};
