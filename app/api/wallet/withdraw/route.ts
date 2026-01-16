import { db } from "@/config/db";
import { wallets, transactions } from "@/config/schema";
import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId, amount } = await req.json();

    if (!userId || !amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    // Fetch wallet
    const walletData = await db
      .select()
      .from(wallets)
      .where(eq(wallets.userId, userId));

    const wallet = walletData[0];
    if (!wallet) {
      return NextResponse.json({ error: "Wallet not found" }, { status: 404 });
    }

    // FIX: Normalize balance (avoid null)
    const balance = wallet.balance ?? 0;

    // Check balance
    if (balance < amount) {
      return NextResponse.json(
        { error: "Insufficient balance" },
        { status: 400 }
      );
    }

    // Atomic deduction
    await db
      .update(wallets)
      .set({ balance: sql`${wallets.balance} - ${amount}` })
      .where(eq(wallets.userId, userId));

    // Create transaction
    await db.insert(transactions).values({
      userId,
      amount,
      type: "withdrawal",
      status: "success",
    });

    return NextResponse.json({
      success: true,
      message: "Withdrawal successful",
      newBalance: balance - amount,
    });
  } catch (error) {
    console.error("Withdrawal API Error:", error);
    return NextResponse.json({ error: "Withdrawal failed" }, { status: 500 });
  }
}
