import { auth } from "@clerk/nextjs/server";
import { db } from "@/config/db";
import { accounts } from "@/config/schema";
import { eq } from "drizzle-orm";
import WithdrawPageClient from "./WithdrawPage";
import { DashboardLayout } from "@/components/dashboard-layout";

export default async function Withdraw() {
  const { userId } = await auth();

  if (!userId) {
    return <div className="p-6">You must be logged in.</div>;
  }

  // Fetch accounts
  const userAccountsRaw = await db
    .select()
    .from(accounts)
    .where(eq(accounts.userId, userId));

  // 🔥 FIX: Convert balance (string | null) → number
  const userAccounts = userAccountsRaw.map((acc) => ({
    id: acc.id,
    name: acc.name,
    balance: Number(acc.balance ?? 0), // Convert safely
  }));

  return (
    <DashboardLayout>
      <WithdrawPageClient accounts={userAccounts} />
    </DashboardLayout>
);
}
