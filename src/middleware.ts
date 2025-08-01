import { authMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: ["/", "/about", "/how-it-works"],
  
  afterAuth(auth, req) {
    // If admin is logging in (accessing auth pages), redirect to admin dashboard
    if (auth.userId && 
        auth.sessionClaims?.metadata?.role === "admin" && 
        (req.url.includes("/sign-in") || req.url.includes("/sign-up"))) {
      return NextResponse.redirect(new URL('/admin', req.url));
    }
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};