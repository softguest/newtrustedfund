import { db } from "@/config/db";
import { kyc } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// 1. Define request body schema
const patchKycSchema = z.object({
  status: z.enum(["approved", "rejected"]),
  rejectionReason: z.string().optional(),
  adminId: z.string(),
});

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Await params
    const { id } = await context.params;

    // Parse and validate request body
    const body = await req.json();
    const parsed = patchKycSchema.parse(body);

    if (parsed.status === "rejected" && !parsed.rejectionReason) {
      return NextResponse.json(
        { error: "rejectionReason is required when status is rejected" },
        { status: 400 }
      );
    }

    const updated = await db
      .update(kyc)
      .set({
        status: parsed.status,
        reviewedAt: new Date(),
        reviewedBy: parsed.adminId,
        rejectionReason:
          parsed.status === "rejected" ? parsed.rejectionReason : null,
      })
      .where(eq(kyc.id, id))
      .returning();

    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
