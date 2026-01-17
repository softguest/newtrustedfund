import { db } from "@/config/db";
import { withdrawals, users, accounts, transactions } from "@/config/schema";
import { eq, sql } from "drizzle-orm";
import { Button } from "@/components/ui/button";

/* ---------------------------------------------------
    SERVER ACTION: APPROVE WITHDRAWAL
---------------------------------------------------- */
export async function approve(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;

  const w = await db.query.withdrawals.findFirst({
    where: (w, { eq }) => eq(w.id, id),
  });

  if (!w) return;
  if (w.status !== "pending") return;

  // Deduct balance
  await db
    .update(accounts)
    .set({ balance: sql`${accounts.balance} - ${w.amount}` })
    .where(eq(accounts.id, w.accountId));

  // Approve
  await db
    .update(withdrawals)
    .set({ status: "approved" })
    .where(eq(withdrawals.id, id));

  // Add transaction
  await db.insert(transactions).values({
    userId: w.userId,
    type: "withdrawal",
    amount: w.amount,
    status: "success",
  });
}

/* ---------------------------------------------------
    SERVER ACTION: REJECT WITHDRAWAL
---------------------------------------------------- */
export async function reject(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;

  await db
    .update(withdrawals)
    .set({ status: "rejected" })
    .where(eq(withdrawals.id, id));
}

/* ---------------------------------------------------
     ADMIN PAGE
---------------------------------------------------- */
export default async function AdminWithdrawalsPage() {
  const data = await db
    .select({
      id: withdrawals.id,
      amount: withdrawals.amount,
      phone: withdrawals.phone,
      status: withdrawals.status,
      createdAt: withdrawals.createdAt,
      userId: accounts.userId,
      accountId: accounts.id,
      userFirstName: users.fullName,
    })
    .from(withdrawals)
    .leftJoin(accounts, eq(withdrawals.accountId, accounts.id))
    .leftJoin(users, eq(accounts.userId, users.id))
    .where(eq(withdrawals.status, "pending"));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Pending Withdrawals</h1>

      <div className="space-y-4">
        {data.map((w) => (
          <div
            key={w.id}
            className="border p-4 rounded-lg flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{w.userFirstName}</p>
              <p>Amount: {w.amount} XAF</p>
              <p>Phone: {w.phone}</p>
              <p className="text-sm text-gray-500">
                Created:{" "}
                {w.createdAt
                  ? new Date(w.createdAt).toLocaleString()
                  : "N/A"}
              </p>
            </div>

            <div className="flex gap-2">
              {/* APPROVE */}
              <form action={approve}>
                <input type="hidden" name="id" value={w.id} />
                <Button variant="default">Approve</Button>
              </form>

              {/* REJECT */}
              <form action={reject}>
                <input type="hidden" name="id" value={w.id} />
                <Button variant="destructive" className="text-white">Reject</Button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


