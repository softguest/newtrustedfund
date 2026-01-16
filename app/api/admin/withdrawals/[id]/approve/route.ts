import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { withdrawals, accounts, transactions } from "@/config/schema";
import { eq, sql } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { withdrawalId } = await req.json();

    const w = await db.query.withdrawals.findFirst({
      where: (w, { eq }) => eq(w.id, withdrawalId),
    });

    if (!w) return NextResponse.json({ error: "Not found" }, { status: 404 });

    if (w.status !== "pending")
      return NextResponse.json({ error: "Already processed" }, { status: 400 });

    // Decrease balance atomically
    await db
      .update(accounts)
      .set({
        balance: sql`${accounts.balance} - ${w.amount}`,
      })
      .where(eq(accounts.id, w.accountId));

    // Update withdrawal
    await db
      .update(withdrawals)
      .set({ status: "approved" })
      .where(eq(withdrawals.id, withdrawalId));

    // Add transaction log
    await db.insert(transactions).values({
      userId: w.userId,
      type: "withdrawal",
      amount: w.amount,
      status: "success",
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
