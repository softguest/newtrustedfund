"use client";
import { useEffect, useState } from "react";
import GroupsList from "@/components/GroupsList";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard-layout";

interface Group {
  id: string;
  name: string;
  description?: string;
  isMember: boolean;
  memberCount: number;
}

export default function AllGroupsPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/groups")
      .then(res => res.json())
      .then(setGroups);
  }, []);

  const joinGroup = async (id: string) => {
    setLoading(true);

    const res = await fetch(`/api/groups/${id}/join`, {
      method: "POST",
    });

    if (res.ok) {
      setGroups(prev =>
        prev.map(g =>
          g.id === id
            ? { ...g, isMember: true, memberCount: g.memberCount + 1 }
            : g
        )
      );
    } else {
      const data = await res.json();
      alert(data.error || "Failed to join group");
    }
    setLoading(false);
  };

  const filteredGroups = groups.filter(g =>
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold mb-4">All Groups</h1>
          <Link href="/dashboard/groups/create">
            <Button variant="destructive" className="text-white">
              Create Group
            </Button>
          </Link>
        </div>
        <input
          type="text"
          placeholder="Search groups..."
          className="border p-2 rounded w-full mb-6"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <GroupsList groups={filteredGroups} loading={loading} onJoin={joinGroup} />
      </div>
    </DashboardLayout>
  );
}
