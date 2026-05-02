import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  // Block login/signup if already logged in
  if (token && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  // Protected routes
  const protectedRoutes = ["/profile", "/ticket", "/ticket-history"];

  const isProtectedRoute = protectedRoutes.some(route =>
    pathname === route || pathname.startsWith(route + "/")
  );

  // Admin routes
  const adminRoutes = ["/admin"];

  const isAdminRoute = adminRoutes.some(route =>
    pathname === route || pathname.startsWith(route + "/")
  );

  // Guest protection
  if (!token && (isProtectedRoute || isAdminRoute)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Admin-only pages
  if (isAdminRoute && token?.role !== "admin") {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  // Block admin from ticket-history
  if (
    token?.role === "admin" &&
    (pathname === "/ticket-history" ||
      pathname.startsWith("/ticket-history/") || (pathname === "/ticket" ||
      pathname.startsWith("/ticket/") ))
  ) {
    return NextResponse.redirect(new URL("/admin/dashboard/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/signup",
    "/profile/:path*",
    "/ticket/:path*",
    "/ticket-history/:path*",
    "/admin/:path*",
  ],
};