import { db } from "@/config/db";
import { accounts, transactions } from "@/config/schema";
import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";

export async function POST(req: Request) {
  const { userId, goalId, accountId, amount } = await req.json();

  await db.transaction(async (tx) => {
    await tx.execute(
      sql`UPDATE accounts SET balance = balance + ${amount} WHERE id = ${accountId}`
    );

    await tx.insert(transactions).values({
      userId,
      account_id: accountId, // match schema property name
      type: "goal_contribution",
      amount,
      narration: "Contribution to target goal", // match schema property name
    });

  });

  return NextResponse.json({ success: true });
}
