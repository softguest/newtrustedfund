import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { momoLogs, transactions, users, accounts } from "@/config/schema";
import { v4 as uuid } from "uuid";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    // --------------------------------------------
    // 1. AUTHENTICATION
    // --------------------------------------------
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // --------------------------------------------
    // 2. ENSURE USER EXISTS IN DB
    // --------------------------------------------
    const existing = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    if (!existing) {
      return NextResponse.json(
        {
          error:
            "User not found in DB. Create user record after Clerk registration.",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------
    // 3. PARSE BODY
    // --------------------------------------------
    const { phone, amount, accountId } = await req.json();

    if (!phone || phone.length < 8) {
      return NextResponse.json(
        { error: "Invalid phone number" },
        { status: 400 }
      );
    }

    const amt = Number(amount);

    if (!amt || amt <= 0) {
      return NextResponse.json(
        { error: "Invalid deposit amount" },
        { status: 400 }
      );
    }

    if (!accountId) {
      return NextResponse.json(
        { error: "Select an account to deposit into" },
        { status: 400 }
      );
    }

    // --------------------------------------------
    // 4. VERIFY ACCOUNT BELONGS TO USER
    // --------------------------------------------
    const userAccount = await db.query.accounts.findFirst({
      where: eq(accounts.id, accountId),
    });

    if (!userAccount || userAccount.userId !== userId) {
      return NextResponse.json(
        { error: "Account not found or does not belong to user" },
        { status: 403 }
      );
    }

    // --------------------------------------------
    // 5. GENERATE MoMo IDs
    // --------------------------------------------
    const momoReference = uuid();
    const externalId = uuid();

    // --------------------------------------------
    // 6. GENERATE TOKEN
    // --------------------------------------------
    const tokenRes = await fetch(`${process.env.MOMO_COLLECTION_URL}/token/`, {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": process.env.MOMO_SUBSCRIPTION_KEY!,
        Authorization: `Basic ${Buffer.from(
          `${process.env.MOMO_USER_ID}:${process.env.MOMO_API_KEY}`
        ).toString("base64")}`,
      },
    });

    const tokenData = await tokenRes.json();
    const accessToken = tokenData?.access_token;

    if (!accessToken) {
      return NextResponse.json(
        { error: "Failed to generate MoMo token" },
        { status: 500 }
      );
    }

    // --------------------------------------------
    // 7. SEND REQUESTTO PAY (RTP)
    // --------------------------------------------
    const rtpRes = await fetch(
      `${process.env.MOMO_COLLECTION_URL}/v1_0/requesttopay`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-Reference-Id": momoReference,
          "X-Target-Environment": "sandbox",
          "Ocp-Apim-Subscription-Key": process.env.MOMO_SUBSCRIPTION_KEY!,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amt.toString(),
          currency: "EUR",
          externalId,
          payer: {
            partyIdType: "MSISDN",
            partyId: phone,
          },
          payerMessage: "Deposit",
          payeeNote: "Wallet Funding",
        }),
      }
    );

    if (!rtpRes.ok) {
      const err = await rtpRes.text();
      console.log("MoMo RTP error:", err);
      return NextResponse.json(
        { error: "MoMo request failed" },
        { status: 500 }
      );
    }

    // --------------------------------------------
    // 8. SAVE MOMO LOG
    // --------------------------------------------
    await db.insert(momoLogs).values({
      userId,
      externalId,
      phone,
      amount: amt,
      status: "pending",
    });

    // --------------------------------------------
    // 9. SAVE TRANSACTION ROW (correct names!)
    // --------------------------------------------
    await db.insert(transactions).values({
      userId, // your schema uses `userId` not `user_id`
      account_id: accountId,
      amount: amt,
      type: "deposit",
      status: "pending",
      phone_number: phone,
      momoReference,
      narration: "Mobile Money Deposit",
    });

    // --------------------------------------------
    // 10. INCREMENT USER ACCOUNT BALANCE
    //      (Do this BEFORE MoMo callback because sandbox has no callback)
    // --------------------------------------------
    const newBalance = Number(userAccount.balance ?? 0) + amt;

    await db
      .update(accounts)
      .set({ balance: String(newBalance) })  
      .where(eq(accounts.id, accountId));

    // --------------------------------------------
    // 11. RESPONSE
    // --------------------------------------------
    return NextResponse.json({
      success: true,
      message:
        "Deposit created. Approve the Mobile Money payment prompt on your phone.",
      momoReference,
      newBalance,
    });
  } catch (error) {
    console.log("DEPOSIT API ERROR:", error);
    return NextResponse.json(
      { error: "Deposit failed. Try again later." },
      { status: 500 }
    );
  }
}
