"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Router } from "next/router";
import { FiArrowRight } from "react-icons/fi";

interface Group {
  id: string;
  name: string;
  description?: string;
  isMember: boolean;
  memberCount: number;
}

interface GroupsListProps {
  groups: Group[];
  loading: boolean;
  onJoin: (id: string) => void;
}

export default function GroupsList({ groups, loading, onJoin }: GroupsListProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {groups.map(group => (
        // <div
        //   key={group.id}
        //   className={`border p-4 rounded-lg shadow flex flex-col justify-between ${
        //     group.isMember ? "bg-green-50 border-green-400" : "bg-white"
        //   }`}
        // >
        //   <div>
        //     <h2 className="text-xl font-semibold mb-2">{group.name}</h2>
        //     <hr className="mb-4"/>
        //     <p className="text-gray-600 mb-2">
        //       {group.description || "No description"}
        //     </p>
        //     <p className="text-sm text-gray-500">{group.memberCount} members</p>
        //   </div>

        //   <div className="flex gap-2 mt-4">
        //         <div className="flex gap-2">
        //             <Button
        //             variant="outline"
        //             disabled={group.isMember || loading}
        //             onClick={() => onJoin(group.id)}
        //             >
        //                 {group.isMember ? "Member" : "Join"}
        //             </Button>

        //             <Link href={`/dashboard/groups/${group.id}`}>
        //                 <Button variant="outline">View Group</Button>
        //             </Link>
        //         </div>
        //   </div>
        // </div>





         <div
            key={group.id}
            className="bg-white rounded-xl border border-zinc-200 p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h4 className="text-lg font-bold text-zinc-900">{group.name}</h4>
                <p className="text-sm text-zinc-500 mt-1">{group.description}</p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700">
                {/* {group.myRole} */} ###
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-xs text-zinc-500">Members</p>
                <p className="text-lg font-bold text-zinc-900">{group.memberCount}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500">Frequency</p>
                <p className="text-lg font-bold text-zinc-900">
                  {/* {group.frequency} */}
                  </p>
              </div>
              <div>
                <p className="text-xs text-zinc-500">Status</p>
                <p className="text-lg font-bold text-green-600">Active</p>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Link href={`/dashboard/groups/${group.id}`}>
                <Button
                  variant="outline"
                  className="text-xs border-zinc-200 hover:bg-zinc-50 bg-transparent"
                >
                  View Details
                </Button>
              </Link>
             
              <Button
                // onClick={() => handleSaveNow(group)}
                className="text-xs bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
              >
                Save Now
              </Button>
              <Button
                // onClick={() => setShowInviteModal(true)}
                variant="outline"
                className="text-xs border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                {/* <Link2 className="w-3 h-3 mr-1" /> */}
                Share Link
              </Button>
            </div>
          </div>
      ))}
    </div>
  );
}
