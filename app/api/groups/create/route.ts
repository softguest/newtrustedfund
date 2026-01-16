// app/api/groups/create/route.ts
import { db } from "@/config/db";
import { groups, groupMembers } from "@/config/schema";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, description, goalAmount, contributionAmount } =
    await req.json();

  const { userId } = await auth(); // from Clerk
  if (!userId) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const g = await db
    .insert(groups)
    .values({
      name,
      description,
      userId,
      goalAmount,
      contributionAmount,
    })
    .returning();

  await db.insert(groupMembers).values({
    groupId: g[0].id,
    userId,
  });

  return NextResponse.json({ success: true, group: g[0] });
}
