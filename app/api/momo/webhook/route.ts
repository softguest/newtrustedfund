import { db } from "@/config/db";
import { momoLogs, wallets, transactions } from "@/config/schema";
import { eq, and, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { externalId, status } = data;

    // 1️⃣ Fetch MoMo log
    const logResult = await db
      .select()
      .from(momoLogs)
      .where(eq(momoLogs.externalId, externalId));

    const log = logResult[0];

    if (!log) {
      return NextResponse.json({ error: "MoMo Log not found" }, { status: 404 });
    }

    const userId = log.userId;
    const amount = log.amount;

    // 2️⃣ DUPLICATE CALLBACK PREVENTION
    if (log.status === "SUCCESSFUL") {
      return NextResponse.json({
        message: "Duplicate callback ignored — already processed",
      });
    }

    // 3️⃣ Update log status
    await db
      .update(momoLogs)
      .set({ status })
      .where(eq(momoLogs.externalId, externalId));

    if (status !== "SUCCESSFUL") {
      return NextResponse.json({
        message: "MoMo payment failed, status updated only",
      });
    }

    // 4️⃣ Fetch wallet
    const walletResult = await db
      .select()
      .from(wallets)
      .where(eq(wallets.userId, userId));

    const wallet = walletResult[0];

    if (!wallet) {
      return NextResponse.json({ error: "Wallet not found" }, { status: 404 });
    }

    // 5️⃣ Safe atomic increment using SQL
    await db
      .update(wallets)
      .set({
        balance: sql`${wallets.balance} + ${amount}`, // <-- ATOMIC
      })
      .where(eq(wallets.userId, userId));

    // 6️⃣ Update only pending transaction(s)
    await db
      .update(transactions)
      .set({ status: "success" })
      .where(
        and(eq(transactions.userId, userId), eq(transactions.status, "pending"))
      );

    return NextResponse.json({ success: true, message: "Wallet updated" });
  } catch (error) {
    console.error("MoMo Callback Error:", error);
    return NextResponse.json(
      { error: "Internal callback error" },
      { status: 500 }
    );
  }
}
