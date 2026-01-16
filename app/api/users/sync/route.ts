import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/config/db";
import { users } from "@/config/schema";

export async function POST() {
  const clerk = await currentUser();

  if (!clerk) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await db.insert(users).values({
    id: clerk.id,
    clerkId: clerk.id,
    email: clerk.emailAddresses?.[0]?.emailAddress || "no-email@example.com",
    fullName: clerk.fullName || "No Name",
    phone: clerk.phoneNumbers?.[0]?.phoneNumber || "",
  });

  return NextResponse.json({ success: true });
}
