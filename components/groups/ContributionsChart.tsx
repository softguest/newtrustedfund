"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ContributionsChart({ contributions }: any) {
  const data = contributions.map((c: any) => ({
    name: c.userId.slice(0, 6),
    amount: Number(c.amount),
  }));

  return (
    <div className="bg-white p-4 rounded-lg shadow h-64">
      <h3 className="text-lg font-semibold">Contributions</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
