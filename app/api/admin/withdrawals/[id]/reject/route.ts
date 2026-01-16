import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { withdrawals } from "@/config/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { withdrawalId } = await req.json();

    await db
      .update(withdrawals)
      .set({ status: "rejected" })
      .where(eq(withdrawals.id, withdrawalId));

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
