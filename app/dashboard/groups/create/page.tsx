// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";

// export default function CreateGroupPage() {
//   const [loading, setLoading] = useState(false);

//   async function createGroup(e: any) {
//     e.preventDefault();
//     setLoading(true);

//     const res = await fetch("/api/groups/create", {
//       method: "POST",
//       body: JSON.stringify({
//         name: e.target.name.value,
//         description: e.target.description.value,
//         userId: "YOUR_USER_ID",
//       }),
//     });

//     const data = await res.json();
//     setLoading(false);
//     alert("Group created!");
//   }

//   return (
//     <form onSubmit={createGroup} className="p-6 max-w-lg mx-auto space-y-3">
//       <input
//         name="name"
//         placeholder="Group Name"
//         className="border p-2 w-full"
//       />
//       <textarea
//         name="description"
//         placeholder="Description"
//         className="border p-2 w-full"
//       />
//       <Button disabled={loading}>{loading ? "..." : "Create Group"}</Button>
//     </form>
//   );
// }

"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardLayout } from "@/components/dashboard-layout";

export default function CreateGroupPage() {
  const [loading, setLoading] = useState(false);

  async function createGroup(e: any) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/groups/create", {
      method: "POST",
      body: JSON.stringify({
        name: e.target.name.value,
        description: e.target.description.value,
        goalAmount: Number(e.target.goalAmount.value),
        contributionAmount: Number(e.target.contributionAmount.value),
      }),
    });

    setLoading(false);
    alert("Group created");
  }

  return (
    <DashboardLayout>
    <form onSubmit={createGroup} className="p-6 max-w-lg mx-auto space-y-3">
      <Input name="name" placeholder="Group Name" />
      <Input name="description" placeholder="Description" />
      <Input name="goalAmount" type="number" placeholder="Goal Amount (XAF)" />
      <Input
        name="contributionAmount"
        type="number"
        placeholder="Contribution per member (XAF)"
      />
      <Button className="w-full text-white" variant="destructive" disabled={loading}>{loading ? "..." : "Create Group"}</Button>
    </form>
    </DashboardLayout>
  );
}
