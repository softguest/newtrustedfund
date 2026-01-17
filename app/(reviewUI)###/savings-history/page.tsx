"use client"

export const dynamic = "force-dynamic"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { XAF } from "@/lib/currency"
import { TrendingUp, Calendar, ArrowUpRight } from "lucide-react"

export default function SavingsHistoryPage() {
  const [transactions, setTransactions] = useState<any[]>([])
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savings_transactions") || "[]")
    setTransactions(saved.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()))
  }, [])

  const totalSaved = transactions.reduce((sum: number, t: any) => sum + t.amount, 0)
  const completedTransactions = transactions.filter((t: any) => t.status === "completed").length
  const thisWeekSavings = transactions.filter((t: any) => {
    const date = new Date(t.date)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    return date > weekAgo
  })

  const getPaymentMethodLabel = (method: string) => {
    const labels: { [key: string]: string } = {
      account: "Account Balance",
      mtn: "MTN Mobile Money",
      orange: "Orange Money",
      card: "Credit Card",
    }
    return labels[method] || method
  }

  const getPaymentMethodColor = (method: string) => {
    const colors: { [key: string]: string } = {
      account: "bg-blue-100 text-blue-700",
      mtn: "bg-yellow-100 text-yellow-700",
      orange: "bg-orange-100 text-orange-700",
      card: "bg-purple-100 text-purple-700",
    }
    return colors[method] || "bg-zinc-100 text-zinc-700"
  }

  return (
    <DashboardLayout>
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-zinc-900">Savings History & Progress</h2>
            <p className="text-zinc-600 mt-2">Track your savings journey and contributions</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border border-red-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-600 mb-1">Total Saved</p>
                  <p className="text-3xl font-bold text-red-600">{XAF(totalSaved)}</p>
                </div>
                <TrendingUp className="w-10 h-10 text-red-600 opacity-20" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-600 mb-1">Transactions</p>
                  <p className="text-3xl font-bold text-green-600">{completedTransactions}</p>
                </div>
                <ArrowUpRight className="w-10 h-10 text-green-600 opacity-20" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-600 mb-1">This Week</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {XAF(thisWeekSavings.reduce((sum: number, t: any) => sum + t.amount, 0))}
                  </p>
                </div>
                <Calendar className="w-10 h-10 text-blue-600 opacity-20" />
              </div>
            </div>
          </div>

          {/* Filter */}
          <div className="mb-6 flex gap-2">
            {["all", "week", "month"].map((f) => (
              <Button
                key={f}
                onClick={() => setFilter(f)}
                variant={filter === f ? "default" : "outline"}
                className={filter === f ? "bg-red-600" : "border-zinc-200"}
              >
                {f === "all" ? "All Time" : f === "week" ? "This Week" : "This Month"}
              </Button>
            ))}
          </div>

          {/* Transactions List */}
          <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden">
            {transactions.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-zinc-600">No savings transactions yet. Start saving to see your history!</p>
              </div>
            ) : (
              <div className="divide-y divide-zinc-200">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="p-6 hover:bg-zinc-50 transition">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-zinc-900">{transaction.goalId}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentMethodColor(transaction.paymentMethod)}`}
                          >
                            {getPaymentMethodLabel(transaction.paymentMethod)}
                          </span>
                          <span className="text-xs text-zinc-600">
                            {new Date(transaction.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-600">+{XAF(transaction.amount)}</p>
                        <span className="text-xs text-green-600 font-medium">Completed</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Analysis Section */}
          {transactions.length > 0 && (
            <div className="mt-8 bg-gradient-to-br from-zinc-50 to-zinc-100 rounded-xl p-6 border border-zinc-200">
              <h3 className="text-lg font-bold text-zinc-900 mb-4">Saving Frequency Analysis</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-zinc-600">Daily Saves</p>
                  <p className="text-2xl font-bold text-red-600">
                    {
                      transactions.filter((t) => {
                        const date = new Date(t.date)
                        const today = new Date()
                        return date.toDateString() === today.toDateString()
                      }).length
                    }
                  </p>
                </div>
                <div>
                  <p className="text-sm text-zinc-600">Weekly Average</p>
                  <p className="text-2xl font-bold text-red-600">
                    {Math.round(
                      transactions.length /
                        (Math.ceil(
                          (Date.now() - new Date(transactions[transactions.length - 1]?.date).getTime()) /
                            (7 * 24 * 60 * 60 * 1000),
                        ) || 1),
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-zinc-600">Average Save</p>
                  <p className="text-2xl font-bold text-red-600">{XAF(totalSaved / (transactions.length || 1))}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-600">Success Rate</p>
                  <p className="text-2xl font-bold text-red-600">100%</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
