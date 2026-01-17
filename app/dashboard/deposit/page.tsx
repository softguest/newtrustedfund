"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DepositPage() {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [accountId, setAccountId] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Load user accounts
  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/accounts");
      const data = await res.json();
      setAccounts(data.accounts || []);
    };
    load();
  }, []);

  const handleDeposit = async () => {
    setMessage("");
    setLoading(true);

    const res = await fetch("/api/momo/deposit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, amount, accountId }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) setMessage("Deposit request sent. Approve on your phone.");
    else setMessage(data.error || "Error occurred");
  };

  return (
    <div className="flex justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Deposit with MTN MoMo</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            placeholder="Enter MTN MoMo Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <Input
            placeholder="Enter Amount (XAF)"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          {/* Account Selector */}
          <select
            className="w-full border rounded p-2"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
          >
            <option value="">Select Account</option>
            {accounts.map((acc: any) => (
              <option key={acc.id} value={acc.id}>
                {acc.name} ({acc.type}) — {acc.balance} XAF
              </option>
            ))}
          </select>

          <Button className="w-full bg-destructive text-white" disabled={loading} onClick={handleDeposit}>
            {loading ? "Processing…" : "Deposit"}
          </Button>

          {message && <p className="text-sm">{message}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
