"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ContributionForm({ groupId }: { groupId: string }) {
  const [amount, setAmount] = useState("");

  const handleSubmit = async () => {
    const res = await fetch(`/api/groups/${groupId}/contribute`, {
      method: "POST",
      body: JSON.stringify({
        amount: Number(amount),
        userId: "REPLACE_USER_ID", // TODO: plug Clerk
      }),
    });

    if (res.ok) {
      setAmount("");
      alert("Contribution added!");
    } else {
      alert("Error");
    }
  };

  return (
    <div className="border p-4 rounded-lg space-y-4">
      <Input
        type="number"
        placeholder="Amount (XAF)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <Button onClick={handleSubmit}>Contribute</Button>
    </div>
  );
}
