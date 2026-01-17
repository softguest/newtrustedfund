// "use client";

// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
// } from "@/components/ui/card";

// type Contribution = {
//   id: string;
//   amount: string;
//   createdAt: Date | string;
//   user: {
//     fullName: string;
//   } | null;
// };

// export default function ContributionsTable({
//   contributions,
// }: {
//   contributions: Contribution[];
// }) {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Contributions</CardTitle>
//       </CardHeader>

//       <CardContent>
//         <table className="w-full text-sm">
//           <thead>
//             <tr className="border-b">
//               <th className="text-left">Amount</th>
//               <th className="text-left">User</th>
//               <th className="text-left">Date</th>
//             </tr>
//           </thead>

//           <tbody>
//             {contributions.map((c) => (
//               <tr key={c.id} className="border-b">
//                 <td>{c.amount} XAF</td>
//                 <td>{c.user?.fullName ?? "Unknown user"}</td>
//                 <td>
//                   {new Date(c.createdAt).toLocaleString()}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </CardContent>
//     </Card>
//   );
// }

"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

type Contribution = {
  id: string;
  amount: number;
  createdAt: Date | string;
  user: {
    fullName: string;
  } | null;
};

export default function ContributionsTable({
  contributions,
}: {
  contributions: Contribution[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contributions</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[500px]">
            <thead className="border-b text-muted-foreground">
              <tr>
                <th className="py-2 text-left">Amount</th>
                <th className="py-2 text-left">Member</th>
                <th className="py-2 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {contributions.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="py-6 text-center text-muted-foreground"
                  >
                    No contributions yet
                  </td>
                </tr>
              )}

              {contributions.map((c) => (
                <tr key={c.id} className="border-b last:border-0">
                  <td className="py-2 font-medium">
                    {c.amount.toLocaleString("fr-CM")} XAF
                  </td>

                  <td className="py-2">
                    {c.user?.fullName ?? "Unknown user"}
                  </td>

                  <td className="py-2 text-muted-foreground">
                    {new Date(c.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

