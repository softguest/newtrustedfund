import { db } from "@/config/db";
import { groups, groupMembers } from "@/config/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, sql } from "drizzle-orm";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    // 1️⃣ Fetch all groups
    const allGroups = await db.select().from(groups);

    // 2️⃣ Fetch memberships of current user
    const memberships = await db
      .select({ groupId: groupMembers.groupId })
      .from(groupMembers)
      .where(eq(groupMembers.userId, userId));

    const membershipSet = new Set(memberships.map(m => m.groupId));

    // 3️⃣ Count members per group
    const memberCounts = await db
      .select({
        groupId: groupMembers.groupId,
        count: sql<number>`count(${groupMembers.userId})`.as("count"),
      })
      .from(groupMembers)
      .groupBy(groupMembers.groupId);

    const memberCountMap = new Map(memberCounts.map(m => [m.groupId, m.count]));

    // 4️⃣ Combine
    const groupsWithStatus = allGroups.map(g => ({
      ...g,
      isMember: membershipSet.has(g.id),
      memberCount: memberCountMap.get(g.id) || 0,
    }));

    return new Response(JSON.stringify(groupsWithStatus), { status: 200 });
  } catch (error) {
    console.error("GET /api/groups error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch groups" }), { status: 500 });
  }
}
