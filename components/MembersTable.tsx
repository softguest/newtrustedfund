// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";

// interface MemberRow {
//   memberId: string;
//   userId: string;
//   name: string | null;
//   email: string | null;
//   expected: number;
//   contributed: number;
//   remaining: number;
//   status: "COMPLETED" | "ON_TRACK" | "BEHIND";
// }

// interface MembersTableProps {
//   members: MemberRow[];
//   groupId: string;
//   isCreator: boolean;
// }

// export default function MembersTable({
//   members,
//   groupId,
//   isCreator,
// }: MembersTableProps) {
//   const [values, setValues] = useState<Record<string, number>>({});

//   async function save(memberId: string) {
//     const expectedAmount = values[memberId];
//     if (!expectedAmount || expectedAmount <= 0) {
//       alert("Enter a valid amount");
//       return;
//     }

//     const res = await fetch(
//       `/api/groups/${groupId}/members/${memberId}/expected-amount`,
//       {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ expectedAmount }),
//       }
//     );

//     const data = await res.json();
//     if (!res.ok) return alert(data.error || "Failed to update");

//     alert("Expected amount updated");
//   }

//   const statusStyles = {
//     COMPLETED: "bg-green-100 text-green-700",
//     ON_TRACK: "bg-yellow-100 text-yellow-700",
//     BEHIND: "bg-red-100 text-red-700",
//   };

//   return (
//     <div className="w-full space-y-4">
//       {/* ---------- Desktop Table ---------- */}
//       <div className="hidden md:block overflow-x-auto rounded-2xl border border-white/20 bg-white/40 backdrop-blur-xl shadow-sm">
//         <table className="w-full text-sm">
//           <thead className="bg-gray-100/60">
//             <tr>
//               <th className="p-3 text-left">Member</th>
//               <th className="p-3 text-center">Expected</th>
//               <th className="p-3 text-center">Contributed</th>
//               <th className="p-3 text-center">Remaining</th>
//               <th className="p-3 text-center">Status</th>
//               {isCreator && <th className="p-3 text-center">Action</th>}
//             </tr>
//           </thead>

//           <tbody>
//             {members.map((m) => (
//               <tr
//                 key={m.memberId}
//                 className="border-t border-gray-200/60 hover:bg-white/30 transition"
//               >
//                 <td className="p-3">
//                   <div className="font-semibold text-gray-800">
//                     {m.name ?? "—"}
//                   </div>
//                   <div className="text-xs text-gray-500">{m.email}</div>
//                 </td>

//                 <td className="p-3 text-center">
//                   {isCreator ? (
//                     <input
//                       type="number"
//                       defaultValue={m.expected}
//                       className="w-24 rounded-lg border px-2 py-1 text-sm focus:ring-1 focus:ring-red-500"
//                       onChange={(e) =>
//                         setValues((v) => ({
//                           ...v,
//                           [m.memberId]: Number(e.target.value),
//                         }))
//                       }
//                     />
//                   ) : (
//                     <span className="font-medium">
//                       {m.expected.toLocaleString()}
//                     </span>
//                   )}
//                 </td>

//                 <td className="p-3 text-center">
//                   {m.contributed.toLocaleString()}
//                 </td>

//                 <td className="p-3 text-center">
//                   {m.remaining.toLocaleString()}
//                 </td>

//                 <td className="p-3 text-center">
//                   <span
//                     className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[m.status]}`}
//                   >
//                     {m.status.replace("_", " ")}
//                   </span>
//                 </td>

//                 {isCreator && (
//                   <td className="p-3 text-center">
//                     <Button
//                       size="sm"
//                       variant="outline"
//                       onClick={() => save(m.memberId)}
//                     >
//                       Save
//                     </Button>
//                   </td>
//                 )}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* ---------- Mobile Cards ---------- */}
//       <div className="md:hidden space-y-3">
//         {members.map((m) => (
//           <div
//             key={m.memberId}
//             className="rounded-2xl bg-white/40 backdrop-blur-xl border border-white/20 p-4 shadow-sm space-y-3"
//           >
//             <div>
//               <p className="font-semibold text-gray-800">
//                 {m.name ?? "—"}
//               </p>
//               <p className="text-xs text-gray-500">{m.email}</p>
//             </div>

//             <div className="grid grid-cols-2 gap-2 text-sm">
//               <Stat label="Expected" value={m.expected.toLocaleString()} />
//               <Stat label="Contributed" value={m.contributed.toLocaleString()} />
//               <Stat label="Remaining" value={m.remaining.toLocaleString()} />
//               <div className="flex justify-end">
//                 <span
//                   className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[m.status]}`}
//                 >
//                   {m.status.replace("_", " ")}
//                 </span>
//               </div>
//             </div>

//             {isCreator && (
//               <div className="flex gap-2">
//                 <input
//                   type="number"
//                   defaultValue={m.expected}
//                   className="flex-1 rounded-lg border px-3 py-2 text-sm"
//                   onChange={(e) =>
//                     setValues((v) => ({
//                       ...v,
//                       [m.memberId]: Number(e.target.value),
//                     }))
//                   }
//                 />
//                 <Button size="sm" onClick={() => save(m.memberId)}>
//                   Save
//                 </Button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// /* ---------- Small Stat ---------- */
// function Stat({ label, value }: { label: string; value: string }) {
//   return (
//     <div>
//       <p className="text-xs text-gray-500">{label}</p>
//       <p className="font-medium text-gray-800">{value}</p>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface MemberRow {
  memberId: string;
  userId: string;
  name: string | null;
  email: string | null;
  expected: number;
  contributed: number;
  remaining: number;
  status: "COMPLETED" | "ON_TRACK" | "BEHIND";
}

interface MembersTableProps {
  members: MemberRow[];
  groupId: string;
  isCreator: boolean;
}

export default function MembersTable({
  members,
  groupId,
  isCreator,
}: MembersTableProps) {
  const [values, setValues] = useState<Record<string, number>>(
    Object.fromEntries(members.map((m) => [m.memberId, m.expected]))
  );

  const [loading, setLoading] = useState<string | null>(null);

  async function save(memberId: string) {
    const expectedAmount = values[memberId];
    if (!expectedAmount || expectedAmount <= 0) return;

    try {
      setLoading(memberId);

      const res = await fetch(
        `/api/groups/${groupId}/members/${memberId}/expected-amount`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ expectedAmount }),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(null);
    }
  }

  function format(amount: number) {
    return amount.toLocaleString("fr-CM");
  }

  return (
    <div className="rounded-lg border bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead className="bg-muted text-muted-foreground">
            <tr>
              <th className="p-3 text-left">Member</th>
              <th className="p-3 text-center">Expected</th>
              <th className="p-3 text-center">Contributed</th>
              <th className="p-3 text-center">Remaining</th>
              <th className="p-3 text-center">Status</th>
              {isCreator && <th className="p-3 text-right">Action</th>}
            </tr>
          </thead>

          <tbody>
            {members.map((m) => {
              const hasChanged = values[m.memberId] !== m.expected;

              return (
                <tr key={m.memberId} className="border-t">
                  <td className="p-3">
                    <div className="font-medium">
                      {m.name ?? "Unnamed member"}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {m.email}
                    </div>
                  </td>

                  <td className="p-3 text-center">
                    {isCreator ? (
                      <input
                        type="number"
                        value={values[m.memberId]}
                        className="w-28 rounded border px-2 py-1 text-sm"
                        onChange={(e) =>
                          setValues((v) => ({
                            ...v,
                            [m.memberId]: Number(e.target.value),
                          }))
                        }
                      />
                    ) : (
                      <span>{format(m.expected)} XAF</span>
                    )}
                  </td>

                  <td className="p-3 text-center">
                    {format(m.contributed)} XAF
                  </td>

                  <td className="p-3 text-center font-medium">
                    {format(m.remaining)} XAF
                  </td>

                  <td className="p-3 text-center">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        m.status === "COMPLETED"
                          ? "bg-green-100 text-green-700"
                          : m.status === "ON_TRACK"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {m.status.replace("_", " ")}
                    </span>
                  </td>

                  {isCreator && (
                    <td className="p-3 text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={!hasChanged || loading === m.memberId}
                        onClick={() => save(m.memberId)}
                      >
                        {loading === m.memberId && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Save
                      </Button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
