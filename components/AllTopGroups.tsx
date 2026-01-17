'use client';
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FiEye } from "react-icons/fi";
import { TrendingUp } from "lucide-react";

interface Group {
  id: string;
  name: string;
  description?: string;
  isMember?: boolean;
  memberCount: number;
}

export default function AllTopGroups() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/groups/top-three")
      .then(res => res.json())
      .then(setGroups);
  }, []); 

  return (
    <div className="pb-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="text-sm sm:text-3xl md:text-2xl font-bold text-gray-800">
          Top Saving Communities
        </div>
        <div>
          <Link href="/dashboard/groups/create">
            <Button
              variant="destructive"
              className="text-white bg-red-600 hover:bg-red-700 shadow-md transition-all cursor-pointer"
            >
              Create Group
            </Button>
          </Link>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Search groups..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="
            w-full rounded-2xl border border-white/20 bg-white/30 
            backdrop-blur-xl p-3 shadow-[0_8px_30px_rgba(0,0,0,0.06)]
            focus:outline-none focus:ring-2 focus:ring-red-500 transition
          "
        />
      </div>

      {/* Top Groups List */}
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
        {groups.length === 0 ? (
          <p className="text-gray-500 col-span-full text-center py-10">
            No top groups available.
          </p>
        ) : (
          groups.map(group => (
            // <div
            //   key={group.id}
            //   className="
            //     relative flex flex-col justify-between w-full rounded-2xl
            //     border border-white/20 bg-white/30 backdrop-blur-xl
            //     p-4 shadow-[0_8px_30px_rgba(0,0,0,0.06)]
            //     transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]
            //   "
            // >
            //   {/* Glow overlay */}
            //   <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            //   <div className="relative z-10">
            //     <h2 className="text-lg font-bold text-gray-800">{group.name}</h2>
            //     <hr className="my-2 border-gray-300" />
            //     {group.description && (
            //       <p className="text-sm text-gray-600 mt-1">{group.description}</p>
            //     )}
            //     <p className="text-xs text-gray-500 mt-2">
            //       {group.memberCount} member{group.memberCount !== 1 ? 's' : ''}
            //     </p>
            //     {group.isMember ? (
            //       <span className="mt-2 inline-block text-sm font-medium text-green-600">
            //         Member
            //       </span>
            //     ) : (
            //       <Button className="mt-2 text-sm px-3 py-1 text-white" variant="destructive">
            //         <Link className="flex items-center" href={`/dashboard/groups/${group.id}`}>
            //           <FiEye className="inline mr-1 text-white" />
            //           <div>Browse Group</div>
            //         </Link>
            //       </Button>
            //     )}
            //   </div>
            // </div>

            <div
              key={group.id}
              className="border border-zinc-200 rounded-xl p-4 hover:border-red-200 hover:bg-red-50/50 transition-all cursor-pointer"
              // onClick={() => handleJoinClick(group)}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-bold text-sm text-zinc-900">{group.name}</h4>
                <span className="text-xs font-semibold text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {/* +{group.growthRate}% */}
                </span>
              </div>

              <p className="text-xs text-zinc-600 mb-3">{group.description}</p>

              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-500">Total Savings</span>
                  <span className="font-bold text-zinc-900">
                    {/* {(group.totalSavings)}  */}
                    XAF
                    </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-500 flex items-center gap-1">
                    {/* <Users className="w-3 h-3" /> */}
                    Members
                  </span>
                  <span className="font-bold text-zinc-900">{group.memberCount}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-500">Monthly</span>
                  <span className="font-bold text-red-600">
                    {/* {(group.monthlyContribution)}  */}
                    XAF</span>
                </div>
              </div>

              <div className="bg-zinc-50 rounded-lg px-3 py-2 mb-3">
                <p className="text-xs text-zinc-600">
                  <span className="font-semibold">How to save:</span> Monthly contributions with auto-debit option.
                  Members can save flexibly above minimum.
                </p>
              </div>
              <Link className="flex items-center" href={`/dashboard/groups/${group.id}`}>
                <Button
                  // onClick={(e) => {
                  //   e.stopPropagation()
                  //   handleJoinClick(group)
                  // }}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-xs h-8"
                >
                  Request to Join
                </Button>
              </Link>
            </div>
          ))
        )}
      </div>
      <div className="mt-4 pt-4 border-t border-zinc-200">
          <p className="text-xs text-zinc-500 text-center">All communities are verified and monitored for security</p>
        </div>
    </div>
  );
}
