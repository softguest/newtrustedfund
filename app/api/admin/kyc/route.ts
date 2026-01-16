import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { users } from "@/config/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const pending = await db
      .select()
      .from(users)
      .where(eq(users.kycStatus, "pending"));

    return NextResponse.json(pending);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch KYC users" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId, action } = await req.json();

    if (!["approved", "rejected"].includes(action)) {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    await db
      .update(users)
      .set({ kycStatus: action })
      .where(eq(users.id, userId));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}
