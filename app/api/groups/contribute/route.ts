// import { NextResponse } from "next/server";
// import { db } from "@/config/db";
// import { contributions, wallets, groupMembers } from "@/config/schema";
// import { auth } from "@clerk/nextjs/server";
// import { z } from "zod";
// import { eq, sql, and } from "drizzle-orm";

// const ContributeSchema = z.object({
//   groupId: z.string(),
//   amount: z.number().positive(),
// });

// export async function POST(req: Request) {
//   try {
//     const { userId } = await auth();
//     if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//     const body = await req.json();
//     const { groupId, amount } = ContributeSchema.parse(body);

//     // Check if user is a group member
//     const member = await db.query.groupMembers.findFirst({
//       where: (m, { eq, and }) =>
//         and(eq(m.groupId, groupId), eq(m.userId, userId)),
//     });

//     if (!member) {
//       return NextResponse.json(
//         { error: "You are not a member of this group" },
//         { status: 403 }
//       );
//     }

//     // Atomic balance deduction (no transaction needed)
//     const updatedWallet = await db
//       .update(wallets)
//       .set({
//         balance: sql`${wallets.balance} - ${amount}`,
//       })
//       .where(and(
//         eq(wallets.userId, userId),
//         sql`${wallets.balance} >= ${amount}` // prevent negative
//       ))
//       .returning();

//     if (updatedWallet.length === 0) {
//       return NextResponse.json(
//         { error: "Insufficient wallet balance" },
//         { status: 400 }
//       );
//     }

//     // Create contribution record
//     const contrib = await db
//       .insert(contributions)
//       .values({
//         groupId,
//         userId,
//         amount: amount.toString(),
//       })
//       .returning();

//     return NextResponse.json({
//       success: true,
//       contribution: contrib[0],
//     });
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message }, { status: 400 });
//   }
// }


import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { contributions, accounts, groupMembers } from "@/config/schema";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { eq, and, sql } from "drizzle-orm";

const ContributeSchema = z.object({
  groupId: z.string(),
  amount: z.number().positive(),
  accountId: z.string(),
});

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { groupId, amount, accountId } = ContributeSchema.parse(body);

    // 1️⃣ Check membership
    const member = await db.query.groupMembers.findFirst({
      where: (m, { eq, and }) =>
        and(eq(m.groupId, groupId), eq(m.userId, userId)),
    });

    if (!member)
      return NextResponse.json(
        { error: "You are not a member of this group" },
        { status: 403 }
      );

    // 2️⃣ Atomic deduction from selected account
    const updatedAccount = await db
      .update(accounts)
      .set({
        balance: sql`${accounts.balance} - ${amount}`,
      })
      .where(
        and(
          eq(accounts.id, accountId),
          eq(accounts.userId, userId),
          sql`${accounts.balance} >= ${amount}`
        )
      )
      .returning();

    if (updatedAccount.length === 0) {
      return NextResponse.json(
        { error: "Insufficient account balance" },
        { status: 400 }
      );
    }

    // 3️⃣ Record contribution
    const contribution = await db
      .insert(contributions)
      .values({
        groupId,
        userId,
        accountId,
        amount: amount.toString(),
      })
      .returning();

    return NextResponse.json({
      success: true,
      contribution: contribution[0],
      account: updatedAccount[0],
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
