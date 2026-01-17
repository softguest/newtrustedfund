"use client";

import { useEffect, useState } from "react";
import {
  CreditCard,
  Zap,
  Eye,
  EyeOff,
  X,
  ArrowUpRight,
  Wallet,
  Send,
  AlertCircle,
} from "lucide-react"

interface StatsCardProps {
  title: string;
  balance: number;
  change: string;
  chartData?: number[];
  loading?: boolean;
}

export default function StatsCard({
  title,
  balance,
  change,
  chartData = [],
  loading,
}: StatsCardProps) {
  const [animatedBalance, setAnimatedBalance] = useState(0);
  const isPositive = change.startsWith("+");

  useEffect(() => {
    if (loading) return;

    let start = 0;
    const end = balance;
    const duration = 900;
    const steps = 60;
    const step = (end - start) / steps;
    let current = start;

    const counter = setInterval(() => {
      current += step;
      if (current >= end) {
        current = end;
        clearInterval(counter);
      }
      setAnimatedBalance(Math.floor(current));
    }, duration / steps);

    return () => clearInterval(counter);
  }, [balance, loading]);

  /* ---------- Skeleton ---------- */
  if (loading) {
    return (
      <div className="relative w-full rounded-2xl border border-white/20 bg-white/30 p-4 backdrop-blur-xl animate-pulse">
        <div className="h-4 w-1/3 rounded bg-white/40 mb-4" />
        <div className="h-7 w-1/2 rounded bg-white/40 mb-4" />
        <div className="h-4 w-1/4 rounded bg-white/40 mb-4" />
        <div className="h-16 rounded bg-white/40" />
      </div>
    );
  }

  const chartArray = chartData.length
    ? chartData.map((value, i) => ({ name: i, value }))
    : [5, 10, 5, 20, 8, 15].map((value, i) => ({ name: i, value }));

  return (
    // <div
    //   className="
    //     group relative w-full rounded-2xl
    //     border border-white/20
    //     bg-red-700 backdrop-blur-xl
    //     bg-gradient-to-br from-red-500/10 via-transparent to-transparent opacity-100
    //     p-4 sm:p-5
    //     shadow-[0_8px_30px_rgba(0,0,0,0.06)]
    //     transition-all duration-300
    //     hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]
    //   "
    // >
    //   {/* Glow border */}
    //   <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

    //   {/* Title */}
    //   <h3 className="relative z-10 text-sm font-medium text-white">
    //     {title}
    //   </h3>

    //   {/* Balance */}
    //   <p className="relative z-10 mt-1 text-4xl sm:text-4xl font-bold text-white tracking-tight">
    //     {animatedBalance.toLocaleString()}
    //     <span className="ml-1 text-sm font-medium text-white">XAF</span>
    //   </p>

    //   {/* Trend */}
    //   <div className="relative z-10 mt-1 flex items-center gap-1 text-sm">
    //     {isPositive ? (
    //       <FiArrowUpRight className="text-emerald-500" />
    //     ) : (
    //       <FiArrowDownRight className="text-red-500" />
    //     )}
    //     <span className={isPositive ? "text-emerald-500" : "text-red-500"}>
    //       {change}
    //     </span>
    //   </div>

    //   {/* Chart */}
    //   <div className="relative z-10 mt-3 h-16 w-full">
    //   </div>
    // </div>
    <div className="bg-gradient-to-br from-red-600 via-red-700 to-red-900 rounded-2xl p-8 text-white shadow-lg">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <p className="text-sm opacity-90">Account Balance</p>
                <button
                  // onClick={() => setHideBalance(!hideBalance)}
                  className="p-1 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                  aria-label="Toggle balance visibility"
                >
                  {animatedBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-4xl font-bold">{animatedBalance} FCFA</p>
            </div>
            <CreditCard className="w-8 h-8 opacity-80" />
          </div>
          <div className="flex justify-start items-end">
            <div>
              <p className="text-xs opacity-75 mb-1">Account Type</p>
              <p className="text-sm font-semibold capitalize">
                {/* {accountType || "Personal"} */}
                 Savings</p>
            </div>
          </div>
        </div>
  );
}
