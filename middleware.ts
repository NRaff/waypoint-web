import {
  getAuth,
  withClerkMiddleware,
} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// TODO: should check user claims here to determine if a route is admin, user
export default withClerkMiddleware((req: NextRequest) => {
  console.log("running middleware");
  const { userId } = getAuth(req);
  if (!userId) {
    console.info(
      "No authenticated user - redirecting to login",
      { req }
    );
    const signInUrl = new URL(
      "http://localhost:3000/auth/login"
    );
    // Note: this will cause an infinite loop of redirects if the condition above is always truthy
    signInUrl.searchParams.set("redirect_url", req.url);
    return NextResponse.redirect(signInUrl);
  }
  // Do anything you need in your middleware.
  return NextResponse.next();
});

// Stop Middleware running on static files like images
export const config = { matcher: "/((?!.*\\.).*)" };
