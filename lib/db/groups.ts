import { db } from "@/config/db";
import { groups, groupMembers } from "@/config/schema";
import { eq } from "drizzle-orm";

export async function getUserGroups(userId: string) {
  // Groups user created
  const created = await db
    .select()
    .from(groups)
    .where(eq(groups.userId, userId));

  // Groups user joined
  const joined = await db
    .select({
      group: groups,
    })
    .from(groupMembers)
    .leftJoin(groups, eq(groupMembers.groupId, groups.id))
    .where(eq(groupMembers.userId, userId));

  return {
    createdGroups: created,
    joinedGroups: joined.map((row) => row.group),
  };
}
