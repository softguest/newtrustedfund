import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { withdrawals, accounts } from "@/config/schema";
import { z } from "zod";

const WithdrawSchema = z.object({
  accountId: z.string(),
  amount: z.number(),
  phone: z.string(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { accountId, amount, phone } = WithdrawSchema.parse(body);

    // 1. Fetch account
    const account = await db.query.accounts.findFirst({
      where: (a, { eq }) => eq(a.id, accountId),
    });

    if (!account) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 });
    }

    // Fix: convert balance to number safely
    const balance = Number(account.balance || 0);

    // 2. Compare balance
    if (balance < amount) {
      return NextResponse.json(
        { error: "Insufficient balance" },
        { status: 400 }
      );
    }

    // 3. Save withdrawal request
    const withdrawal = await db
      .insert(withdrawals)
      .values({
        userId: account.userId, 
        accountId,
        amount,
        phone,
        status: "pending",
      })
      .returning();

    return NextResponse.json({
      success: true,
      withdrawalId: withdrawal[0].id,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
