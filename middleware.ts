import {
  getAuth,
  withClerkMiddleware,
} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// TODO: should check user claims here to determine if a route is admin, user
const isServingAuthPage = (request: NextRequest) =>
  request.url.includes("auth");

const redirectToAuth = (request: NextRequest) => {
  const signInUrl = new URL("/auth/login", request.url);
  signInUrl.searchParams.set("redirect_url", request.url);
  return NextResponse.redirect(signInUrl);
};

const hasUserForAuth = (request: NextRequest) => {
  const { userId } = getAuth(request);
  if (userId) {
    console.info("User available for request", {
      userId,
    });
    return userId;
  }
  return null;
};

const handleRequest = (request: NextRequest) => {
  if (isServingAuthPage(request)) {
    console.info("Serving auth page", { url: request.url });
  } else if (!hasUserForAuth(request)) {
    return redirectToAuth(request);
  }
  console.info("Completed middleware");
  return NextResponse.next();
};

export default withClerkMiddleware((request: NextRequest) => {
  console.log("running middleware");
  return handleRequest(request);
  // const { userId } = getAuth(req);
  // if (!isServingAuthPage(req)) {
  //   console.log("Request does not include sign-in");
  //   if (!userId) {
  //     console.info(
  //       "No authenticated user - redirecting to login"
  //     );
  //     const signInUrl = new URL("/auth/login", req.url);
  //     // Note: this will cause an infinite loop of redirects if the condition above is always truthy
  //     signInUrl.searchParams.set("redirect_url", req.url);
  //     return NextResponse.redirect(signInUrl);
  //   }
  // }
  // // Do anything you need in your middleware.
  // return NextResponse.next();
});

// Stop Middleware running on static files like images
export const config = { matcher: "/((?!.*\\.).*)" };
