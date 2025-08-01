import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware((auth, req) => {
  const { userId, sessionClaims } = auth();
  const role = sessionClaims?.metadata?.role;
  const pathname = req.nextUrl.pathname;

  // Admin trying to access auth pages → redirect to /admin
  if (
    userId &&
    role === "admin" &&
    (pathname === "/sign-in" || pathname === "/sign-up")
  ) {
    const adminUrl = req.nextUrl.clone();
    adminUrl.pathname = "/admin";
    return NextResponse.redirect(adminUrl);
  }

  // Always return a response
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*|api|trpc).*)", // protect all pages except static files & api routes
  ],
};
