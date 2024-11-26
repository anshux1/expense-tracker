import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const pathname = req.nextUrl.pathname;

  if (token && (pathname === '/login' || pathname === "/")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!token && (pathname === '/dashboard'
    || pathname === '/transactions'
    || pathname === '/history'
    || pathname === '/settings')) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
