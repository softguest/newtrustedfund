// "use client";

// import { useState } from "react";
// import { toast } from "react-hot-toast";

// export default function TransferPageClient({
//   accounts,
// }: {
//   accounts: { id: string; name: string; balance: number }[];
// }) {
//   const [loading, setLoading] = useState(false);
//   const [fromAccount, setFromAccount] = useState(accounts[0]?.id || "");
//   const [toAccount, setToAccount] = useState("");
//   const [amount, setAmount] = useState("");

//   async function handleTransfer(e: React.FormEvent) {
//     e.preventDefault();

//     if (!fromAccount || !toAccount) {
//       return toast.error("Select both accounts.");
//     }

//     if (fromAccount === toAccount) {
//       return toast.error("You cannot transfer to the same account.");
//     }

//     if (!amount || Number(amount) < 50) {
//       return toast.error("Amount must be at least 50 FCFA.");
//     }

//     setLoading(true);
//     try {
//       const res = await fetch("/api/transfers", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           fromAccount,
//           toAccount,
//           amount: Number(amount),
//         }),
//       });

//       const json = await res.json();

//       if (!res.ok) {
//         toast.error(json?.message || "Transfer failed");
//       } else {
//         toast.success("Transfer successful");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Network error");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="max-w-xl mx-auto p-6 bg-white dark:bg-slate-900 rounded-xl shadow">
//       <h1 className="text-2xl font-semibold mb-4">Transfer Between Accounts</h1>

//       <form onSubmit={handleTransfer} className="space-y-4">
//         {/* FROM ACCOUNT */}
//         <div>
//           <label className="block text-sm font-medium">From Account</label>
//           <select
//             className="mt-1 block w-full rounded-md border p-2"
//             value={fromAccount}
//             onChange={(e) => setFromAccount(e.target.value)}
//           >
//             {accounts.map((acc) => (
//               <option key={acc.id} value={acc.id}>
//                 {acc.name} — {acc.balance.toLocaleString()} FCFA
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* TO ACCOUNT */}
//         <div>
//           <label className="block text-sm font-medium">To Account</label>
//           <select
//             className="mt-1 block w-full rounded-md border p-2"
//             value={toAccount}
//             onChange={(e) => setToAccount(e.target.value)}
//           >
//             <option value="">Select account</option>
//             {accounts
//               .filter((acc) => acc.id !== fromAccount)
//               .map((acc) => (
//                 <option key={acc.id} value={acc.id}>
//                   {acc.name} — {acc.balance.toLocaleString()} FCFA
//                 </option>
//               ))}
//           </select>
//         </div>

//         {/* AMOUNT */}
//         <div>
//           <label className="block text-sm font-medium">Amount</label>
//           <input
//             type="number"
//             placeholder="Enter amount"
//             className="mt-1 block w-full rounded-md border p-2"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//           />
//         </div>

//         {/* SUBMIT */}
//         <button
//           disabled={loading}
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded-md disabled:opacity-60"
//         >
//           {loading ? "Processing..." : "Transfer"}
//         </button>
//       </form>
//     </div>
//   );
// }


"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function TransferPageClient({
  accounts,
}: {
  accounts: { id: string; name: string; balance: number }[];
}) {
  const [loading, setLoading] = useState(false);
  const [fromAccount, setFromAccount] = useState(accounts[0]?.id || "");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");

  async function handleTransfer(e: React.FormEvent) {
    e.preventDefault();

    if (!fromAccount || !toAccount) {
      return toast.error("Select both accounts.");
    }

    if (fromAccount === toAccount) {
      return toast.error("You cannot transfer to the same account.");
    }

    if (!amount || Number(amount) < 50) {
      return toast.error("Amount must be at least 50 FCFA.");
    }

    setLoading(true);
    try {
      const res = await fetch("/api/transfers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fromAccount,
          toAccount,
          amount: Number(amount),
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        toast.error(json?.message || "Transfer failed");
      } else {
        toast.success("Transfer successful");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto my-8 p-6 bg-white dark:bg-slate-900 rounded-xl shadow">
      <h1 className="text-2xl font-semibold mb-4">Transfer Between Accounts</h1>

      <form onSubmit={handleTransfer} className="space-y-4">
        {/* FROM ACCOUNT */}
        <div>
          <label className="block text-sm font-medium">From Account</label>
          <select
            className="mt-1 block w-full rounded-md border p-2"
            value={fromAccount}
            onChange={(e) => setFromAccount(e.target.value)}
          >
            {accounts.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.name} — {acc.balance.toLocaleString()} FCFA
              </option>
            ))}
          </select>
        </div>

        {/* TO ACCOUNT */}
        <div>
          <label className="block text-sm font-medium">To Account</label>
          <select
            className="mt-1 block w-full rounded-md border p-2"
            value={toAccount}
            onChange={(e) => setToAccount(e.target.value)}
          >
            <option value="">Select account</option>
            {accounts
              .filter((acc) => acc.id !== fromAccount)
              .map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.name} — {acc.balance.toLocaleString()} FCFA
                </option>
              ))}
          </select>
        </div>

        {/* AMOUNT */}
        <div>
          <label className="block text-sm font-medium">Amount</label>
          <input
            type="number"
            placeholder="Enter amount"
            className="mt-1 block w-full rounded-md border p-2"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        {/* SUBMIT */}
        <Button
          disabled={loading}
          variant="destructive"
          type="submit"
          className="w-full text-white rounded-md pointer"
        >
          {loading ? "Processing..." : "Transfer"}
        </Button>
      </form>
    </div>
  );
}
