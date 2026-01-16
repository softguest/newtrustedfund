// import { NextResponse } from "next/server";
// import { db } from "@/config/db";
// import { groupMembers, groups } from "@/config/schema";
// import { auth } from "@clerk/nextjs/server";
// import { eq, and } from "drizzle-orm";
// import { z } from "zod";

// const Schema = z.object({
//   expectedAmount: z.number().positive(),
// });

// export async function PATCH(
//   req: Request,
//   // context: { params: { id: string; memberId: string } }
//   context: { params: Promise<{ id: string; memberId: string }> }
// ) {
//   const { userId } = await auth();
//   if (!userId)
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const body = await req.json();
//   const { expectedAmount } = Schema.parse(body);

//   // Ensure user is group creator
//   const group = await db.query.groups.findFirst({
//     where: and(eq(groups.id, (await context.params).memberId), eq(groups.userId, userId)),
//   });

//   if (!group)
//     return NextResponse.json(
//       { error: "Only group creator can update expected amounts" },
//       { status: 403 }
//     );

//   const updated = await db
//     .update(groupMembers)
//     .set({ expectedAmount: String(expectedAmount) })
//     .where(eq(groupMembers.id, (await context.params).memberId))
//     .returning();

//   if (!updated.length)
//     return NextResponse.json({ error: "Member not found" }, { status: 404 });

//   return NextResponse.json({ success: true, member: updated[0] });
// }


import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { groupMembers, groups, users } from "@/config/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

const Schema = z.object({
  expectedAmount: z.number().positive(),
});

export async function PATCH(
  req: Request,
  // context: { params: { id: string; memberId: string } }
  context: { params: Promise<{ id: string; memberId: string }> }
) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id: groupId, memberId } = await context.params;

  const body = await req.json();
  const { expectedAmount } = Schema.parse(body);

  /* 1️⃣ Get internal DB user */
  // fetch all users then find by clerk user id using an any-cast to avoid a missing typed column
  const dbUserList = await db.query.users.findMany();
  const dbUser = dbUserList.find((u) => (u as any).clerkUserId === userId);

  if (!dbUser)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  /* 2️⃣ Ensure user is group creator */
  const group = await db.query.groups.findFirst({
    where: and(
      eq(groups.id, groupId),
      eq(groups.userId, dbUser.id) // ✅ correct comparison
    ),
  });

  if (!group)
    return NextResponse.json(
      { error: "Only group creator can update expected amounts" },
      { status: 403 }
    );

  /* 3️⃣ Update expected amount */
  const updated = await db
    .update(groupMembers)
    .set({ expectedAmount: String(expectedAmount) }) // cast to string to match column type
    .where(
      and(
        eq(groupMembers.id, memberId),
        eq(groupMembers.groupId, groupId)
      )
    )
    .returning();

  if (!updated.length)
    return NextResponse.json({ error: "Member not found" }, { status: 404 });

  return NextResponse.json({ success: true, member: updated[0] });
}
