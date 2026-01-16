// import { db } from "@/config/db";
// import { groupMembers, contributions, users, groups } from "@/config/schema";
// import { auth } from "@clerk/nextjs/server";
// import { eq, sql } from "drizzle-orm";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(
//   req: NextRequest,
//   context: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { id } = await context.params;
//     const session = await auth();
//     const userId = session?.userId;

//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     /* -------- GROUP -------- */
//     const group = await db.query.groups.findFirst({
//       where: (g, { eq }) => eq(g.id, id),
//     });

//     if (!group) {
//       return NextResponse.json({ error: "Group not found" }, { status: 404 });
//     }

//     /* -------- MEMBERS -------- */
//     const members = await db
//       .select({
//         id: groupMembers.id,
//         userId: groupMembers.userId,
//         joinedAt: groupMembers.joinedAt,
//         userName: users.fullName,
//         userEmail: users.email,
//       })
//       .from(groupMembers)
//       .leftJoin(users, eq(users.id, groupMembers.userId))
//       .where(eq(groupMembers.groupId, id));

//     /* -------- CONTRIBUTIONS -------- */
//     const contributionLogs = await db
//       .select()
//       .from(contributions)
//       .where(eq(contributions.groupId, id));

//     /* -------- MY CONTRIBUTION -------- */
//     const myContribution = contributionLogs
//       .filter((c) => c.userId === userId)
//       .reduce((sum, c) => sum + Number(c.amount), 0);

//     const expected =
//       members.length > 0
//         ? Number(group.goalAmount) / members.length
//         : 0;

//     const progress =
//       expected > 0 ? Math.min((myContribution / expected) * 100, 100) : 0;

//     return NextResponse.json({
//       group,
//       members,
//       contributions: contributionLogs,
//       myStats: {
//         contributed: myContribution,
//         expected,
//         progress,
//       },
//     });
//   } catch (err) {
//     console.error("GET /api/groups/[id] error:", err);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }

import { db } from "@/config/db";
import { groups, groupMembers, contributions, users } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const session = await auth();
    const userId = session?.userId;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const group = await db.query.groups.findFirst({
      where: (g, { eq }) => eq(g.id, id),
    });

    if (!group) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    const members = await db
      .select({
        memberId: groupMembers.id,
        userId: groupMembers.userId,
        expectedAmount: groupMembers.expectedAmount,
        joinedAt: groupMembers.joinedAt,
        userName: users.fullName,
        userEmail: users.email,
      })
      .from(groupMembers)
      .leftJoin(users, eq(users.id, groupMembers.userId))
      .where(eq(groupMembers.groupId, id));

    const contributionLogs = await db
      .select()
      .from(contributions)
      .where(eq(contributions.groupId, id));

    const myMember = members.find((m) => m.userId === userId);

    if (!myMember) {
      return NextResponse.json(
        { error: "Not a group member" },
        { status: 403 }
      );
    }

    const myContribution = contributionLogs
      .filter((c) => c.userId === userId)
      .reduce((sum, c) => sum + Number(c.amount), 0);

    const expected = Number(myMember.expectedAmount);

    const progress =
      expected > 0 ? Math.min((myContribution / expected) * 100, 100) : 0;

    return NextResponse.json({
      group,
      members,
      contributions: contributionLogs,
      myStats: {
        contributed: myContribution,
        expected,
        progress,
      },
    });
  } catch (err) {
    console.error("GET /api/groups/[id] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
