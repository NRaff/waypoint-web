import clerk from "@clerk/clerk-sdk-node";
import { User } from "@clerk/nextjs/dist/api";

const getUser = async (userId: string): Promise<User> =>
  clerk.users.getUser(userId);

const ClerkService = {
  getUser,
};

export default ClerkService;
