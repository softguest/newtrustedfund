import { db } from "@/config/db";
import { accounts, transactions } from "@/config/schema";
import { eq, desc } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

export async function getUserAccounts() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const userAccounts = await db
    .select()
    .from(accounts)
    .where(eq(accounts.userId, userId));

  return userAccounts.map(acc => ({
    ...acc,
    type: acc.type.toLowerCase(),
    balance: Number(acc.balance ?? 0),
  }));
}

export async function getRecentTransactions() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const logs = await db
    .select()
    .from(transactions)
    .where(eq(transactions.userId, userId))
    .orderBy(desc(transactions.created_at))
    .limit(5);

  return logs;
}
