import { db } from "@/config/db";
import { groupMembers } from "@/config/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, and } from "drizzle-orm";

interface RouteContext {
  params: Promise<{ id: string }>; // params is a Promise in Next 16
}

export async function POST(req: Request, context: RouteContext) {
  try {
    // Unwrap params
    const { id: groupId } = await context.params;

    if (!groupId) {
      return new Response(JSON.stringify({ error: "Group ID is required" }), { status: 400 });
    }

    // Auth
    const { userId } = await auth();
    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    // Check if already a member
    const exists = await db.query.groupMembers.findFirst({
      where: and(
        eq(groupMembers.groupId, groupId),
        eq(groupMembers.userId, userId)
      ),
    });

    if (exists) {
      return new Response(JSON.stringify({ error: "You are already a member of this group" }), { status: 400 });
    }

    // Insert membership
    await db.insert(groupMembers).values({ groupId, userId });

    return new Response(JSON.stringify({ success: true, message: "Joined group successfully" }), { status: 200 });
  } catch (error) {
    console.error("POST /api/groups/[id]/join error:", error);
    return new Response(JSON.stringify({ error: "Failed to join group" }), { status: 500 });
  }
}
