import { db } from "@/config/db";
import { accounts, transactions } from "@/config/schema";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { accountId, amount, userId } = await req.json();

  await db.transaction(async (tx) => {
    // Update account balance
    await tx.execute(
      sql`UPDATE accounts SET balance = balance + ${amount} WHERE id = ${accountId}`
    );

    // Insert transaction log (match schema column names!)
    await tx.insert(transactions).values({
      userId,          
      account_id: accountId, 
      type: "deposit",
      amount,
      narration: "Deposit into account", 
    });

  });

  return NextResponse.json({ success: true });
}
