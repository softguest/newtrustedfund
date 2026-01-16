import { targetGoals } from "@/config/schema";
import { db } from "@/config/db";
import { NextResponse } from "next/server";
import { createAccount } from "@/lib/account";

export async function POST(req: Request) {
  try {
    const { userId, name, targetAmount, deadline } = await req.json();

    if (!userId || !name || !targetAmount || !deadline) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 1️⃣ Create a target account using the helper
    const targetAccount = await createAccount({
      userId,
      name: `Target - ${name}`,
      type: "target",
    });

    // 2️⃣ Insert the target goal linked to this account
    await db.insert(targetGoals).values({
      userId,
      accountId: targetAccount.id,
      name,
      targetAmount,
      deadline: new Date(deadline), // convert string to Date
    });

    return NextResponse.json({
      success: true,
      accountNumber: targetAccount.accountNumber,
    });
  } catch (err) {
    console.error("TARGET ACCOUNT CREATE ERROR:", err);
    return NextResponse.json(
      { error: "Failed to create target account" },
      { status: 500 }
    );
  }
}
