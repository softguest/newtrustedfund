import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { momoLogs, transactions, accounts } from "@/config/schema";
import { eq, sql } from "drizzle-orm";

// MTN will POST the transaction status here
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      externalId,   // Your own unique ID
      status,       // SUCCESSFUL, FAILED, PENDING
      amount
    } = body;

    // 1. Get DB record for this MoMo transaction
    const momo = await db.query.momoLogs.findFirst({
      where: (m, { eq }) => eq(m.externalId, externalId),
    });

    if (!momo) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
    }

    // Update momo log
    await db
      .update(momoLogs)
      .set({ status })
      .where(eq(momoLogs.externalId, externalId));

    // If payment failed → stop
    if (status !== "SUCCESSFUL") {
      await db
        .update(transactions)
        .set({ status: "failed" })
        .where(eq(transactions.momoReference, momo.externalId));

      return NextResponse.json({ message: "Payment failed" });
    }

    // 2. Payment succeeded → update wallet balance
    await db
      .update(accounts)
      .set({
        balance: sql`${accounts.balance} + ${amount}`
      })
      .where(eq(accounts.userId, momo.userId));

    // 3. Mark transaction as completed
    await db
      .update(transactions)
      .set({ status: "success" })
      .where(eq(transactions.momoReference, momo.externalId));

    return NextResponse.json({ message: "Deposit completed" });

  } catch (err) {
    console.error("MoMo callback error:", err);
    return NextResponse.json(
      { error: "Callback error" },
      { status: 500 }
    );
  }
}
