import { db } from "@/config/db";
import { users } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { createAccount } from "@/lib/account"; // make sure path is correct

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();

    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const email = user.primaryEmailAddress?.emailAddress;
    const fullName = user.fullName || "";
    const clerkId = user.id;
    const phone = user.phoneNumbers?.[0]?.phoneNumber || "";

    if (!email) {
      return NextResponse.json(
        { error: "User must have an email" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existing = await db
      .select()
      .from(users)
      .where(eq(users.id, clerkId));

    if (existing.length > 0) {
      return NextResponse.json(existing[0]);
    }

    // Create user
    const [createdUser] = await db
      .insert(users)
      .values({
        id: clerkId,
        clerkId,
        email,
        fullName,
        phone,
        status: "pending",
      })
      .returning();

    // Create Current Account using helper
    const currentAccount = await createAccount({
      userId: clerkId,
      name: "Current Account",
      type: "current",
    });

    // Create Savings Account using helper
    const savingsAccount = await createAccount({
      userId: clerkId,
      name: "Savings Account",
      type: "savings",
    });

    return NextResponse.json({
      user: createdUser,
      message: "User created with Current & Savings accounts",
      accounts: {
        current: currentAccount.accountNumber,
        savings: savingsAccount.accountNumber,
      },
    });
  } catch (e) {
    console.error("USER CREATE ERROR:", e);
    return NextResponse.json(
      { error: "Internal error creating user" },
      { status: 500 }
    );
  }
}
