import { getAuth } from "@clerk/nextjs/server";
import { UserPersister } from "backend/users/users-persister";
import { NextApiRequest } from "next";
import ClerkService from "./clerk-service";

const getOrCreateAuthenticatedUser = async (
  request: NextApiRequest
) => {
  const { userId } = getAuth(request);
  if (!userId) {
    console.error("No user found for request", {
      request,
    });
    throw new Error("User not Found");
  }
  const clerkUser = await ClerkService.getUser(userId);
  return UserPersister.upsertUser({
    name: `${clerkUser.firstName} ${clerkUser.lastName}`,
    email:
      clerkUser.emailAddresses.find(
        (email) => email.id === clerkUser.primaryEmailAddressId
      )?.emailAddress ?? null,
    authenticationId: clerkUser.id,
  });
};

const AuthController = {
  getOrCreateAuthenticatedUser,
};

export default AuthController;
