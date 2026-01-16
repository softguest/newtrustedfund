import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { accounts } from "@/config/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function GET() {
  const { userId } = await auth();

  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const list = await db.query.accounts.findMany({
    where: eq(accounts.userId, userId),
  });

  return NextResponse.json({ accounts: list });
}
