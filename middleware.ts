import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { constants } from './config/constants';

import { jwtVerify } from 'jose';

const publicPaths = ['/', '/auth/sign-in', '/auth/sign-up'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();

  const isLogoutAction =
    request.nextUrl.searchParams.get('action') === 'logout';

  if (isLogoutAction) {
    cookieStore.delete(constants.accessToken);
    return NextResponse.redirect(new URL('/', request.url));
  }

  const token = cookieStore.get(constants.accessToken)?.value;

  if (token && publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  const isPrivatePath = !publicPaths.includes(pathname);

  if (!token && isPrivatePath) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (token && isPrivatePath) {
    try {
      await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!));
    } catch {
      cookieStore.delete(constants.accessToken);
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher:
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.webm$).*)',
};
