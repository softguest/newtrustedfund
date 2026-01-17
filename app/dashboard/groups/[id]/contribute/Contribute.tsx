//  "use client";

// import { Button } from "@/components/ui/button";

// export default function Contribute({ groupId }: { groupId: string }) {
//   async function handleContribute(e: any) {
//     e.preventDefault();

//     const value = Number(e.target.amount.value);
//     if (!value || value <= 0) return alert("Enter a valid amount");

//     const res = await fetch("/api/groups/contribute", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ groupId, amount: value }),
//       });

//     const data = await res.json();
//     if (!res.ok) return alert(data.error || "Failed to contribute");

//     alert("Contribution added!");
//   }

//   return (
//     <div className="flex justify-center p-6">
//       <div>
//         <h4>Enter Amount to Contribute to this group.</h4>
//           <form onSubmit={handleContribute} className="mt-4 m-w-32 space-y-2">
//             <input
//               type="number"
//               name="amount"
//               min="100"
//               className="w-full border p-2"
//               placeholder="Enter amount"
//             />
//             <Button className="w-full bg-destructive text-white p-2">Contribute</Button>
//           </form>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface Account {
  id: string;
  name: string;
  type: "savings" | "current";
  balance: string;
}

export default function Contribute({ groupId }: { groupId: string }) {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [accountId, setAccountId] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    fetch("/api/accounts")
      .then(res => res.json())
      .then(data => {
        setAccounts(data.accounts); // ✅ FIX
      });
  }, []);


  async function handleContribute(e: React.FormEvent) {
    e.preventDefault();

    if (!accountId) return alert("Select an account");
    const value = Number(amount);
    if (!value || value <= 0) return alert("Enter a valid amount");

    const res = await fetch("/api/groups/contribute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        groupId,
        amount: value,
        accountId,
      }),
    });

    const data = await res.json();
    if (!res.ok) return alert(data.error || "Failed to contribute");

    alert("Contribution successful 🎉");
    setAmount("");
  }

  return (
    <div className="flex justify-center p-6">
      <form onSubmit={handleContribute} className="space-y-4 w-80">
        <h4 className="font-semibold text-lg">Contribute to Group</h4>

        <select
          value={accountId}
          onChange={e => setAccountId(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">Select account</option>
          {accounts.map(acc => (
            <option key={acc.id} value={acc.id}>
              {acc.name} ({acc.type}) — {acc.balance} XAF
            </option>
          ))}
        </select>

        <input
          type="number"
          min="100"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="w-full border p-2 rounded"
          placeholder="Enter amount"
        />

        <Button className="w-full bg-destructive text-white">
          Contribute
        </Button>
      </form>
    </div>
  );
}
