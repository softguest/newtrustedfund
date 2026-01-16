import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { withdrawals, accounts, users } from "@/config/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const pending = await db
      .select({
        id: withdrawals.id,
        amount: withdrawals.amount,
        phone: withdrawals.phone,
        status: withdrawals.status,
        createdAt: withdrawals.createdAt,
        accountId: withdrawals.accountId,
        userName: users?.fullName,
        userEmail: users.email,
        accountType: accounts.type,
        accountBalance: accounts.balance,
      })
      .from(withdrawals)
      .innerJoin(accounts, eq(accounts.id, withdrawals.accountId))
      .innerJoin(users, eq(users.id, accounts.userId))
      .where(eq(withdrawals.status, "pending"));

    return NextResponse.json(pending);
  } catch (err) {
    console.error("Admin Fetch Pending Withdrawals Error:", err);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
