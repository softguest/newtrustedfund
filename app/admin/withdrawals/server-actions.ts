"use server";

import { db } from "@/config/db";
import { withdrawals, accounts, transactions, users } from "@/config/schema";
import { eq, sql } from "drizzle-orm";

/* ---------------------------------------------------
   FETCH WITHDRAWALS
---------------------------------------------------- */
export async function getPendingWithdrawals() {
  return await db
    .select({
      withdrawalId: withdrawals.id,
      amount: withdrawals.amount,
      phone: withdrawals.phone,
      status: withdrawals.status,
      createdAt: withdrawals.createdAt,
      accountId: accounts.id,
      userId: withdrawals.userId,
      fullName: users.fullName,
    })
    .from(withdrawals)
    .leftJoin(accounts, eq(withdrawals.accountId, accounts.id))
    .leftJoin(users, eq(withdrawals.userId, users.id))
    .where(eq(withdrawals.status, "pending"));
}

/* ---------------------------------------------------
   APPROVE ACTION
---------------------------------------------------- */
export async function approve(id: string) {
  try {
    const w = await db.query.withdrawals.findFirst({
      where: (x, { eq }) => eq(x.id, id),
    });

    if (!w) return { error: "Withdrawal not found" };
    if (w.status !== "pending") return { error: "Already processed" };

    await db
      .update(accounts)
      .set({ balance: sql`${accounts.balance} - ${w.amount}` })
      .where(eq(accounts.id, w.accountId));

    await db
      .update(withdrawals)
      .set({ status: "approved" })
      .where(eq(withdrawals.id, id));

    await db.insert(transactions).values({
      userId: w.userId,
      type: "withdrawal",
      amount: w.amount,
      status: "success",
    });

    return { success: "Withdrawal approved successfully" };
  } catch (err) {
    console.log("APPROVE ERROR:", err);
    return { error: "Internal server error" };
  }
}

/* ---------------------------------------------------
   REJECT ACTION
---------------------------------------------------- */
export async function reject(id: string) {
  try {
    await db
      .update(withdrawals)
      .set({ status: "rejected" })
      .where(eq(withdrawals.id, id));

    return { success: "Withdrawal rejected successfully" };
  } catch (err) {
    console.log("REJECT ERROR:", err);
    return { error: "Internal server error" };
  }
}
