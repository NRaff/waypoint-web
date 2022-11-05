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

// todo: authenticate user from clerk and upsert user on backend when loading home page
export default withClerkMiddleware((request: NextRequest) => {
  return handleRequest(request);
});

// Stop Middleware running on static files like images
export const config = { matcher: "/((?!.*\\.).*)" };
