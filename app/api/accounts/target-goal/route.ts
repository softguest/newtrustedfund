import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/config/db";
import { accounts, targetGoals } from "@/config/schema";
import { eq, and } from "drizzle-orm";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1. Fetch ONLY target-type accounts owned by user
    const results = await db
      .select({
        accountId: accounts.id,
        accountName: accounts.name,
        accountType: accounts.type,
        balance: accounts.balance,

        goalId: targetGoals.id,
        goalName: targetGoals.name,
        targetAmount: targetGoals.targetAmount,
        deadline: targetGoals.deadline,
      })
      .from(accounts)
      .leftJoin(
        targetGoals,
        eq(targetGoals.accountId, accounts.id)
      )
      .where(
        and(
          eq(accounts.userId, userId),
          eq(accounts.type, "target")
        )
      );

    return NextResponse.json(results);
  } catch (error) {
    console.error("FETCH TARGET ACCOUNTS ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch target accounts" },
      { status: 500 }
    );
  }
}
