// // app/api/momo/withdraw/route.ts
// import { NextResponse } from "next/server";
// import { z } from "zod";
// import { getAccessToken, initiateDisbursement } from "@/lib/momo";
// import { db } from "@/config/db";
// import { transactions, accounts } from "@/config/schema";
// import { eq } from "drizzle-orm";
// import { auth } from "@clerk/nextjs/server";

// const WithdrawBody = z.object({
//   amount: z.number().min(1),
//   phoneNumber: z.string().min(9),
//   accountId: z.string().uuid().optional(),
//   narration: z.string().max(255).optional(),
// });

// export async function POST(req: Request) {
//   try {
//     const { userId } = await auth();
//     if (!userId) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const json = await req.json();
//     const parsed = WithdrawBody.parse(json);

//     // Check account balance if accountId provided
//     if (parsed.accountId) {
//       const acc = await db
//         .select()
//         .from(accounts)
//         .where(eq(accounts.id, parsed.accountId))
//         .limit(1);

//       if (!acc || acc.length === 0) {
//         return NextResponse.json({ message: "Account not found" }, { status: 404 });
//       }

//       const accountBalance = acc[0].balance ? Number(acc[0].balance) : 0;
//       if (accountBalance < parsed.amount) {
//         return NextResponse.json({ message: "Insufficient balance" }, { status: 400 });
//       }
//     }

//     // Insert transaction row
//     const createdTransaction = await db
//       .insert(transactions)
//       .values({
//         id: crypto.randomUUID(),
//         userId,                               // ✅ userId is required
//         type: "withdrawal",
//         amount: parsed.amount,
//         account_id: parsed.accountId ?? null,
//         phone_number: parsed.phoneNumber,
//         narration: parsed.narration ?? null,
//         status: "initiated",
//         created_at: new Date(),
//         updated_at: new Date(),
//       })
//       .returning();
      

//     // Get MoMo access token
//     const token = await getAccessToken();
//     if (!token) {
//       return NextResponse.json({ message: "Failed to get MoMo token" }, { status: 500 });
//     }

//     // Call MoMo disbursement API
//     const momoResp = await initiateDisbursement({
//       token,
//       amount: parsed.amount,
//       phoneNumber: parsed.phoneNumber,
//       externalId: createdTransaction[0].id,
//       narration: parsed.narration ?? "Withdrawal",
//     });

//     // Update transaction with MoMo response & status
//     await db
//       .update(transactions)
//       .set({
//         momo_response: JSON.stringify(momoResp),
//         status: momoResp?.ok ? "processing" : "failed",
//         updated_at: new Date(),
//       })
//       .where(eq(transactions.id, createdTransaction[0].id));

//     return NextResponse.json({ ok: true, momoResp });
//   } catch (err: any) {
//     console.error("Withdraw error:", err);
//     return NextResponse.json({ message: err?.message ?? "Server error" }, { status: 500 });
//   }
// }


// {"id":"87941","variant":"standard"}
import { NextResponse } from "next/server";
import { z } from "zod";
import { getAccessToken, initiateDisbursement } from "@/lib/momo";
import { db } from "@/config/db";
import { withdrawals, transactions, accounts } from "@/config/schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

const WithdrawBody = z.object({
  amount: z.number().min(1),
  phoneNumber: z.string().min(9),
  accountId: z.string().uuid().optional(),
  narration: z.string().max(255).optional(),
});

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const json = await req.json();
    const parsed = WithdrawBody.parse(json);

    // Check account balance if accountId provided
    if (parsed.accountId) {
      const acc = await db
        .select()
        .from(accounts)
        .where(eq(accounts.id, parsed.accountId))
        .limit(1);

      if (!acc || acc.length === 0) {
        return NextResponse.json({ message: "Account not found" }, { status: 404 });
      }

      const accountBalance = acc[0].balance ? Number(acc[0].balance) : 0;
      if (accountBalance < parsed.amount) {
        return NextResponse.json({ message: "Insufficient balance" }, { status: 400 });
      }
    }

    // Step 1: Insert into withdrawals table
    const createdWithdrawal = await db
      .insert(withdrawals)
      .values({
        userId,
        accountId: parsed.accountId ?? crypto.randomUUID(), // fallback if accountId not provided
        phone: parsed.phoneNumber,
        amount: parsed.amount,
        status: "pending",
      })
      .returning();

    const withdrawalId = createdWithdrawal[0].id;

    // Step 2: Insert into transactions table
    const createdTransaction = await db
      .insert(transactions)
      .values({
        id: crypto.randomUUID(),
        userId,
        type: "withdrawal",
        amount: parsed.amount,
        account_id: parsed.accountId ?? null,
        phone_number: parsed.phoneNumber,
        narration: parsed.narration ?? null,
        status: "initiated",
        created_at: new Date(),
        updated_at: new Date(),
      })
      .returning();

    // Step 3: Get MoMo access token
    const token = await getAccessToken();
    if (!token) {
      return NextResponse.json({ message: "Failed to get MoMo token" }, { status: 500 });
    }

    // Step 4: Call MoMo disbursement API
    const momoResp = await initiateDisbursement({
      token,
      amount: parsed.amount,
      phoneNumber: parsed.phoneNumber,
      externalId: createdTransaction[0].id,
      narration: parsed.narration ?? "Withdrawal",
    });

    // Step 5: Update transaction with MoMo response & status
    await db
      .update(transactions)
      .set({
        momo_response: JSON.stringify(momoResp),
        status: momoResp?.ok ? "processing" : "failed",
        updated_at: new Date(),
      })
      .where(eq(transactions.id, createdTransaction[0].id));

    // Step 6: Update withdrawal status based on MoMo response
    await db
      .update(withdrawals)
      .set({
        status: momoResp?.ok ? "processing" : "failed",
      })
      .where(eq(withdrawals.id, withdrawalId));

    return NextResponse.json({ ok: true, momoResp, withdrawalId, transactionId: createdTransaction[0].id });
  } catch (err: any) {
    console.error("Withdraw error:", err);
    return NextResponse.json({ message: err?.message ?? "Server error" }, { status: 500 });
  }
}
