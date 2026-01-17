"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";

const WithdrawSchema = z.object({
  amount: z.number().min(100, "Minimum withdrawal is 100"),
  phoneNumber: z
    .string()
    .regex(/^\+?\d{9,15}$/, "Enter a valid phone number (include country code)"),
  accountId: z.string().uuid().optional(),
  narration: z.string().max(255).optional(),
});

type WithdrawFormValues = z.infer<typeof WithdrawSchema>;

export default function WithdrawPageClient({
  accounts,
}: {
  accounts: { id: string; name: string; balance: number }[];
}) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WithdrawFormValues>({
    resolver: zodResolver(WithdrawSchema),
    defaultValues: {
      amount: undefined as any,
      phoneNumber: "",
      accountId: accounts?.[0]?.id,
      narration: "",
    },
  });

  async function onSubmit(data: WithdrawFormValues) {
    setLoading(true);
    try {
      const res = await fetch("/api/momo/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok) {
        toast.error(json?.message || "Withdrawal failed");
      } else {
        toast.success("Withdrawal initiated. Check history.");
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-slate-900 rounded-2xl shadow">
      <h1 className="text-2xl font-semibold mb-4">Withdraw via MTN MoMo</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* ACCOUNT DROPDOWN */}
        <div>
          <label className="block text-sm font-medium">From account</label>

          <select
            {...register("accountId")}
            className="mt-1 block w-full rounded-md border p-2"
          >
            {accounts && accounts.length > 0 ? (
              accounts.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.name} — {acc.balance.toLocaleString()}
                </option>
              ))
            ) : (
              <option value="">No accounts available</option>
            )}
          </select>
        </div>

        {/* PHONE */}
        <div>
          <label className="block text-sm font-medium">Phone number (recipient)</label>
          <input
            {...register("phoneNumber")}
            placeholder="+2376XXXXXXXX"
            className="mt-1 block w-full rounded-md border p-2"
          />
          {errors.phoneNumber && (
            <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>
          )}
        </div>

        {/* AMOUNT */}
        <div>
          <label className="block text-sm font-medium">Amount</label>
          <input
            type="number"
            {...register("amount", { valueAsNumber: true })}
            placeholder="1000"
            className="mt-1 block w-full rounded-md border p-2"
          />
          {errors.amount && (
            <p className="text-sm text-red-500">{errors.amount.message}</p>
          )}
        </div>

        {/* NARRATION */}
        <div>
          <label className="block text-sm font-medium">Narration (optional)</label>
          <input
            {...register("narration")}
            placeholder="Withdrawal for rent"
            className="mt-1 block w-full rounded-md border p-2"
          />
        </div>

        {/* SUBMIT */}
        <div>
          <Button
            disabled={loading}
            type="submit"
            variant="destructive"
            className="w-full text-white rounded-md"
          >
            {loading ? "Initiating..." : "Initiate Withdrawal"}
          </Button>
        </div>
        {/* <button type="submit">this is SUBMIT</button> */}
      </form>
    </div>
  );
}
