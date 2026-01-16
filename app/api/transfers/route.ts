// import { NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs/server";
// import { db } from "@/config/db";
// import { accounts, transactions } from "@/config/schema";
// import { eq } from "drizzle-orm";

// export async function POST(req: Request) {
//   try {
//     const { userId } = await auth();
//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const body = await req.json();
//     const { fromAccount, toAccount, amount, note } = body;

//     if (!fromAccount || !toAccount || !amount) {
//       return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
//     }

//     if (fromAccount === toAccount) {
//       return NextResponse.json({ error: "Cannot transfer to the same account" }, { status: 400 });
//     }

//     const amountNumber = Number(amount);
//     if (isNaN(amountNumber) || amountNumber <= 0) {
//       return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
//     }

//     // Fetch accounts
//     const [fromAcc] = await db.select().from(accounts).where(eq(accounts.id, fromAccount)).limit(1);
//     const [toAcc] = await db.select().from(accounts).where(eq(accounts.id, toAccount)).limit(1);

//     if (!fromAcc || !toAcc) {
//       return NextResponse.json({ error: "One or both accounts not found" }, { status: 404 });
//     }

//     // Ensure source account belongs to user
//     if (fromAcc.userId !== userId) {
//       return NextResponse.json({ error: "You do not own this account" }, { status: 403 });
//     }

//     const fromBalance = Number(fromAcc.balance || 0);
//     const toBalance = Number(toAcc.balance || 0);

//     if (fromBalance < amountNumber) {
//       return NextResponse.json({ error: "Insufficient balance" }, { status: 400 });
//     }

//     // ----- Perform transfer sequentially -----

//     // Deduct from source account
//     await db.update(accounts).set({ balance: (fromBalance - amountNumber).toString() }).where(eq(accounts.id, fromAccount));

//     // Credit destination account
//     await db.update(accounts).set({ balance: (toBalance + amountNumber).toString() }).where(eq(accounts.id, toAccount));

//     // Record debit transaction
//     await db.insert(transactions).values({
//       userId,
//       type: "transfer_debit",
//       amount: amountNumber,
//       account_id: fromAccount,
//       narration: note || `Transfer to ${toAccount}`,
//       status: "completed",
//     });

//     // Record credit transaction
//     await db.insert(transactions).values({
//       userId,
//       type: "transfer_credit",
//       amount: amountNumber,
//       account_id: toAccount,
//       narration: note || `Transfer from ${fromAccount}`,
//       status: "completed",
//     });

//     return NextResponse.json({ success: true });
//   } catch (err) {
//     console.error("TRANSFER ERROR:", err);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }
 
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/config/db";
import { accounts, transactions } from "@/config/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { fromAccount, toAccount, amount, note } = body;

    if (!fromAccount || !toAccount || !amount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (fromAccount === toAccount) {
      return NextResponse.json({ error: "Cannot transfer to the same account" }, { status: 400 });
    }

    const amountNumber = Number(amount);
    if (isNaN(amountNumber) || amountNumber <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    // Fetch accounts
    const [fromAcc] = await db.select().from(accounts).where(eq(accounts.id, fromAccount)).limit(1);
    const [toAcc] = await db.select().from(accounts).where(eq(accounts.id, toAccount)).limit(1);

    if (!fromAcc || !toAcc) {
      return NextResponse.json({ error: "One or both accounts not found" }, { status: 404 });
    }

    if (fromAcc.userId !== userId) {
      return NextResponse.json({ error: "You do not own this account" }, { status: 403 });
    }

    const fromBalance = Number(fromAcc.balance || 0);
    if (fromBalance < amountNumber) {
      return NextResponse.json({ error: "Insufficient balance" }, { status: 400 });
    }

    // Deduct from source account
    await db.update(accounts)
      .set({ balance: (fromBalance - amountNumber).toString() })
      .where(eq(accounts.id, fromAccount));

    // Credit destination account
    await db.update(accounts)
      .set({ balance: (Number(toAcc.balance || 0) + amountNumber).toString() })
      .where(eq(accounts.id, toAccount));

    // Record transaction for sender
   await db.insert(transactions).values({
    userId: userId,                // NOT user_id
    type: "transfer_debit",
    amount: amountNumber,
    account_id: fromAccount,
    fromAccountId: fromAccount,
    toAccountId: toAccount,
    narration: note || `Transfer to ${toAccount}`,
    status: "completed",
    created_at: new Date(),
    updated_at: new Date(),
  });

    // Record transaction for receiver
   await db.insert(transactions).values({
    userId: toAcc.userId,
    type: "transfer_credit",
    amount: amountNumber,
    account_id: toAccount,
    fromAccountId: fromAccount,
    toAccountId: toAccount,
    narration: note || `Transfer from ${fromAccount}`,
    status: "completed",
    created_at: new Date(),
    updated_at: new Date(),
  });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("TRANSFER ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
