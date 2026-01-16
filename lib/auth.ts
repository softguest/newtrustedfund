// lib/auth.ts

import { auth, clerkClient } from "@clerk/nextjs/server";

export async function getCurrentUser() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  // If you only need the ID:
  // return { id: userId };

  // If you need full profile:
  const client = await clerkClient();
  const user = await client.users.getUser(userId);

  return {
    id: user.id,
    email: user.emailAddresses[0]?.emailAddress,
    phone: user.phoneNumbers[0]?.phoneNumber,
    firstName: user.firstName,
    lastName: user.lastName,
  };
}
