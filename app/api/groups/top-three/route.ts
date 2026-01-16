import { db } from "@/config/db";
import { groups, groupMembers } from "@/config/schema";
import { desc, sql, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const topGroups = await db
      .select({
        id: groups.id,
        name: groups.name,
        description: groups.description,
        memberCount: sql<number>`COUNT(${groupMembers.groupId})`,
      })
      .from(groups)
      .leftJoin(groupMembers, eq(groupMembers.groupId, groups.id))
      .groupBy(groups.id)
      .orderBy(desc(sql`COUNT(${groupMembers.groupId})`))
      .limit(3);

    return NextResponse.json(topGroups);
  } catch (err) {
    console.error("TOP GROUPS API ERROR:", err);
    return NextResponse.json(
      { error: "Failed to fetch top groups" },
      { status: 500 }
    );
  }
}
