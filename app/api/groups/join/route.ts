import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { groupMembers } from "@/config/schema";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

const JoinSchema = z.object({
  groupId: z.string(),
});

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { groupId } = JoinSchema.parse(body);

    // Check if already member
    const existing = await db.query.groupMembers.findFirst({
      where: (gm, { eq, and }) =>
        and(eq(gm.groupId, groupId), eq(gm.userId, userId)),
    });

    if (existing) {
      return NextResponse.json({ error: "Already a member" }, { status: 400 });
    }

    const member = await db
      .insert(groupMembers)
      .values({ groupId, userId })
      .returning();

    return NextResponse.json({ success: true, member: member[0] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
