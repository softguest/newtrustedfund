import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { groupMembers } from "@/config/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";

const UpdateExpectedSchema = z.object({
  expectedAmount: z.number().positive(),
});

export async function PATCH(
    req: Request, 
    context: { params: Promise<{ id: string }> }
)   {
  const body = await req.json();
  const { expectedAmount } = UpdateExpectedSchema.parse(body);

  const { id } = await context.params;
  const updated = await db
    .update(groupMembers)
    .set({ expectedAmount: String(expectedAmount) })
    .where(eq(groupMembers.id, id))
    .returning();

  if (!updated.length) return NextResponse.json({ error: "Member not found" }, { status: 404 });

  return NextResponse.json({ success: true, member: updated[0] });
}
