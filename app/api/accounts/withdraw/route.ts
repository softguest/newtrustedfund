import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { accounts, transactions } from "@/config/schema";
import { eq, sql } from "drizzle-orm";

// Request body type
interface WithdrawRequest {
  accountId: string;
  userId: string;
  amount: number;
}

export async function POST(req: Request) {
  try {
    const body: WithdrawRequest = await req.json();
    const { accountId, userId, amount } = body;

    // 1. Fetch account
    const [acc] = await db
      .select()
      .from(accounts)
      .where(eq(accounts.id, accountId));

    if (!acc) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 });
    }

    // 2. Convert balance safely
    const currentBalance = Number(acc.balance ?? 0);

    if (currentBalance < amount) {
      return NextResponse.json({ error: "Insufficient balance" }, { status: 400 });
    }

    // 3. Perform withdrawal in a transaction
    await db.transaction(async (tx) => {
      // Decrease account balance
      await tx.execute(
        sql`UPDATE accounts
            SET balance = balance - CAST(${amount} AS NUMERIC)
            WHERE id = ${accountId}`
      );

      // Insert transaction record
      await tx.insert(transactions).values({
        userId,
        account_id: accountId,  // correct snake_case column name
        type: "withdraw",
        amount,
        status: "success",
        narration: "Withdrawal",
      });
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
