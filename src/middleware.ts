import { authMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: ["/", "/about", "/how-it-works"],

  afterAuth(auth, req) {
    try {
      const role = auth.sessionClaims?.metadata?.role ?? "";

      // If the user is an admin and tries to access sign-in/up, redirect to admin dashboard
      if (
        auth.userId &&
        role === "admin" &&
        (req.url.includes("/sign-in") || req.url.includes("/sign-up"))
      ) {
        return NextResponse.redirect(new URL("/admin", req.url));
      }

      // Allow normal flow for all other cases
      return NextResponse.next();
    } catch (error) {
      console.error("Middleware error:", error);
      return new Response("Middleware Internal Error", { status: 500 });
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
