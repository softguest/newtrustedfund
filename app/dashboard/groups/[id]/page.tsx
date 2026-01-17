import MembersTable from "@/components/MembersTable";
import ContributionsTable from "@/components/ContributionsTable";
import GroupProgress from "@/components/groups/GroupProgress";
import ContributionsChart from "@/components/groups/ContributionsChart";
import MyContributionCard from "@/components/groups/MyContributionCard";

import { db } from "@/config/db";
import { groups, groupMembers, contributions, users } from "@/config/schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FiArrowRight } from "react-icons/fi";
import { DashboardLayout } from "@/components/dashboard-layout";

export default async function GroupDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const session = await auth();
  const userId = session?.userId;
  if (!userId) throw new Error("Unauthorized");

  /* ---------- GROUP ---------- */
  const group = await db
    .select({
      id: groups.id,
      name: groups.name,
      description: groups.description,
      goalAmount: groups.goalAmount,
      creatorName: users.fullName,
      creatorId: groups.userId,
    })
    .from(groups)
    .leftJoin(users, eq(groups.userId, users.id))
    .where(eq(groups.id, id))
    .limit(1)
    .then((res) => res[0]);

  if (!group) throw new Error("Group not found");

  const isCreator = group.creatorId === userId;

  /* ---------- MEMBERS ---------- */
  const members = await db
    .select({
      memberId: groupMembers.id,
      userId: users.id,
      name: users.fullName,
      email: users.email,
      expectedAmount: groupMembers.expectedAmount,
      joinedAt: groupMembers.joinedAt,
    })
    .from(groupMembers)
    .leftJoin(users, eq(groupMembers.userId, users.id))
    .where(eq(groupMembers.groupId, id));

  /* ---------- CONTRIBUTIONS ---------- */
  const contributionsList = await db
    .select({
      id: contributions.id,
      amount: contributions.amount,
      createdAt: contributions.createdAt,
      userId: contributions.userId,
      user: {
        id: users.id,
        fullName: users.fullName,
      },
    })
    .from(contributions)
    .leftJoin(users, eq(contributions.userId, users.id))
    .where(eq(contributions.groupId, id));

  const totalRaised = contributionsList.reduce(
    (sum, c) => sum + Number(c.amount),
    0
  );

  const memberStats = members.map((member) => {
    const contributed = contributionsList
      .filter((c) => c.userId === member.userId)
      .reduce((sum, c) => sum + Number(c.amount), 0);

    const expected = Number(member.expectedAmount);
    const remaining = Math.max(expected - contributed, 0);

    let status: "COMPLETED" | "ON_TRACK" | "BEHIND" = "BEHIND";
    if (contributed >= expected) status = "COMPLETED";
    else if (contributed >= expected * 0.5) status = "ON_TRACK";

    return {
      ...member,
      contributed,
      expected,
      remaining,
      status,
      progress:
        expected > 0
          ? Math.min((contributed / expected) * 100, 100)
          : 0,
    };
  });

  const myMember = members.find((m) => m.userId === userId);
  if (!myMember) throw new Error("You are not a member of this group");

  const myContribution = contributionsList
    .filter((c) => c.userId === userId)
    .reduce((sum, c) => sum + Number(c.amount), 0);

  const expectedAmount = Number(myMember.expectedAmount);
  const myProgress =
    expectedAmount > 0
      ? Math.min((myContribution / expectedAmount) * 100, 100)
      : 0;

  /* ---------- UI ---------- */
  return (
    <DashboardLayout>
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-8">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">{group.name}</h1>
          <p className="text-gray-500 max-w-xl">{group.description}</p>
          <p className="text-xs text-gray-400">
            Created by <span className="font-medium">{group.creatorName}</span>
          </p>
        </div>

        <Link href={`/dashboard/groups/${group.id}/contribute`} className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white flex items-center gap-2">
            Contribute
            <FiArrowRight />
          </Button>
        </Link>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-white/30 backdrop-blur-xl border border-white/20 shadow p-4">
          <GroupProgress goal={Number(group.goalAmount)} raised={totalRaised} />
        </div>

        <div className="rounded-2xl bg-white/30 backdrop-blur-xl border border-white/20 shadow p-4">
          <MyContributionCard
            contributed={myContribution}
            expected={expectedAmount}
            percentage={myProgress}
            remaining={Math.max(expectedAmount - myContribution, 0)}
            status={
              myContribution >= expectedAmount
                ? "COMPLETED"
                : myProgress >= 50
                ? "ON_TRACK"
                : "BEHIND"
            }
          />
        </div>
      </div>

      {/* MEMBERS */}
      <div className="rounded-2xl bg-white/30 backdrop-blur-xl border border-white/20 shadow p-4">
        <MembersTable
          groupId={group.id}
          isCreator={isCreator}
          members={memberStats.map((m) => ({ ...m, userId: m.userId ?? "" }))}
        />
      </div>

      {/* CONTRIBUTIONS */}
      <div className="rounded-2xl bg-white/30 backdrop-blur-xl border border-white/20 shadow p-4">
        <ContributionsTable
          contributions={contributionsList.map((c) => ({
            ...c,
            amount: Number(c.amount),
            createdAt: c.createdAt ?? new Date(),
          }))}
        />
      </div>
    </div>
    </DashboardLayout>
  );
}
