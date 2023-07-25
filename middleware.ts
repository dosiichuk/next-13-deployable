import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'
import { jwtVerify } from "jose";
const PUBLIC_FILE = /\.(.*)$/;

const verifyJWT = async (jwt) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );

  return payload;
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/signin") ||
    pathname.startsWith("/register") ||
    PUBLIC_FILE.test(pathname)) {
    return NextResponse.next();
  }

  const jwt = request.cookies.get(process.env.COOKIE_NAME!);
  if (!jwt) {
    request.nextUrl.pathname = "/signin";
    return NextResponse.redirect(request.nextUrl);
  }
  try {
    await verifyJWT(jwt.value);
    return NextResponse.next();
  } catch (e) {
    console.error(e);
    request.nextUrl.pathname = "/signin";
    return NextResponse.redirect(request.nextUrl);
  }
}
