import { db } from "@/config/db";
import { accounts } from "@/config/schema";
import { eq } from "drizzle-orm";

/**
 * Generates a unique account number like AC-12345678
 */
async function generateUniqueAccountNumber(): Promise<string> {
  while (true) {
    const random = Math.floor(10000000 + Math.random() * 90000000);
    const accNumber = `AC-${random}`;

    const existing = await db
      .select()
      .from(accounts)
      .where(eq(accounts.accountNumber, accNumber));

    if (existing.length === 0) return accNumber;
  }
}

/**
 * Create a new account for a user with a unique account number
 */
export async function createAccount({
  userId,
  name,
  type,
  balance = "0",
}: {
  userId: string;
  name: string;
  type: string;
  balance?: string;
}) {
  const accountNumber = await generateUniqueAccountNumber();

  const [account] = await db
    .insert(accounts)
    .values({
      userId,
      name,
      type,
      balance,
      accountNumber,
    })
    .returning();

  return account;
}
