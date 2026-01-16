import { db } from "@/config/db";
import { accounts, transactions } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = await req.json();

  const userAccounts = await db.select().from(accounts).where(eq(accounts.userId, userId));

  const recentTx = await db
    .select()
    .from(transactions)
    .where(eq(transactions.userId, userId))
    .limit(10);

  return NextResponse.json({
    accounts: userAccounts,
    transactions: recentTx
  });
}
