"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function TransactionTable({ userId }: { userId: string }) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`/api/transactions?userId=${userId}`);
      const json = await res.json();
      setData(json);
      setLoading(false);
    };
    load();
  }, [userId]);

  // ✅ helper: convert DB timestamp → valid JS Date
  // const formatTxDate = (createdAt: string) => {
  //   const isoDate = createdAt
  //     .replace(" ", "T")     // YYYY-MM-DDTHH:mm:ss
  //     .slice(0, 23);         // trim microseconds → milliseconds

  //   return format(new Date(isoDate), "PPP p");
  // };

  if (loading) return <p>Loading...</p>;

  if (data.length === 0)
    return <p className="text-muted-foreground">No transactions yet</p>;

  return (
    <div className="border rounded-xl p-4 bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Transaction History</h2>

      <div className="space-y-2">
        {data.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center justify-between border-b py-3"
          >
            
            <div className="flex flex-col">
              <span className="font-medium capitalize">{tx.type}</span>
              <span className="text-xs text-gray-500">
                {/* {formatTxDate(tx.createdAt)} */}
              </span>
            </div>

            <div className="text-right">
              <span
                className={`font-semibold ${
                  tx.type === "deposit"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {tx.type === "deposit" ? "+" : "-"} {tx.amount} XAF
              </span>

              <div className="mt-1">
                <Badge
                  variant={
                    tx.status === "success"
                      ? "default"
                      : tx.status === "failed"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {tx.status}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
