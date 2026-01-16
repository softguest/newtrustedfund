import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { groupMembers } from "@/config/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";

const AddMemberSchema = z.object({
  groupId: z.string(),
  userId: z.string(),
  expectedAmount: z.number().positive(),
});

export async function POST(req: Request) {
  const body = await req.json();
  const { groupId, userId, expectedAmount } = AddMemberSchema.parse(body);

  // Prevent duplicate
  const exists = await db.query.groupMembers.findFirst({
    where: (gm, { eq, and }) => and(eq(gm.groupId, groupId), eq(gm.userId, userId)),
  });
  if (exists) return NextResponse.json({ error: "Member already exists" }, { status: 400 });

  const member = await db
    .insert(groupMembers)
    .values({ groupId, userId, expectedAmount: expectedAmount.toString() })
    .returning();

  return NextResponse.json({ success: true, member: member[0] });
}
