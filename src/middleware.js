import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // 1. If user is logged in → block access to auth pages
  if (token && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  // 2. If user is NOT logged in → protect these pages
  const protectedRoutes = ["/profile", "/ticket", "/ticket-history"];
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname === route || pathname.startsWith(route + "/")
  );

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Allow everything else
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/signup",
    "/profile/:path*",
    "/ticket",
    "/ticket-history",
    "/ticket/:path*",
    "/ticket-history/:path*",
  ],
};