"use client"

export const dynamic = "force-dynamic"

import { DashboardLayout } from "@/components/dashboard-layout"
import { useUser } from "@clerk/nextjs";
// import { useAuth } from "@/lib/auth-context"
import { ArrowUpRight, ArrowDownLeft } from "lucide-react"

export default function TransactionsPage() {
  // const { user, isLoading } = useAuth()
    const {user} = useUser();
 
  // if (isLoading || !user) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-zinc-50">
  //       <div className="text-center">
  //         <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
  //         <p className="mt-4 text-zinc-600">Loading...</p>
  //       </div>
  //     </div>
  //   )
  // }

  const transactions = [
    {
      id: 1,
      type: "deposit",
      description: "Deposit to School Fund",
      amount: 50000,
      date: "2025-01-15",
      status: "completed",
    },
    {
      id: 2,
      type: "transfer",
      description: "Transfer to Emergency Fund",
      amount: 25000,
      date: "2025-01-14",
      status: "completed",
    },
    {
      id: 3,
      type: "withdrawal",
      description: "Withdrawal from Home Fund",
      amount: 100000,
      date: "2025-01-13",
      status: "pending",
    },
    {
      id: 4,
      type: "deposit",
      description: "Group Contribution",
      amount: 10000,
      date: "2025-01-12",
      status: "completed",
    },
    {
      id: 5,
      type: "transfer",
      description: "Transfer to Savings Goal",
      amount: 15000,
      date: "2025-01-11",
      status: "completed",
    },
  ]

  return (
    <DashboardLayout>
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-zinc-200 px-4 md:px-8 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-zinc-900">History</h1>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-8 space-y-8">
            {/* Page Title and Subtitle */}
            <div>
              <h2 className="text-3xl font-bold text-zinc-900">Transaction History</h2>
              <p className="text-zinc-600 mt-2">View all your recent transactions</p>
            </div>

            {/* Transactions Table - Desktop and Mobile responsive */}
            <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-sm">
              {/* Desktop View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-zinc-50 border-b border-zinc-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-zinc-900">Type</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-zinc-900">Description</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-zinc-900">Amount</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-zinc-900">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-zinc-900">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="border-b border-zinc-200 hover:bg-zinc-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {tx.type === "deposit" ? (
                              <ArrowDownLeft className="w-5 h-5 text-green-600" />
                            ) : tx.type === "withdrawal" ? (
                              <ArrowUpRight className="w-5 h-5 text-red-600" />
                            ) : (
                              <ArrowUpRight className="w-5 h-5 text-blue-600" />
                            )}
                            <span className="capitalize text-sm font-medium text-zinc-900">{tx.type}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-zinc-600">{tx.description}</td>
                        <td className="px-6 py-4 text-sm font-bold text-zinc-900">{tx.amount.toLocaleString()} FCFA</td>
                        <td className="px-6 py-4 text-sm text-zinc-600">{tx.date}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`text-xs font-semibold px-3 py-1 rounded-full ${
                              tx.status === "completed" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            {tx.status === "completed" ? "Completed" : "Pending"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile View */}
              <div className="md:hidden">
                {transactions.map((tx) => (
                  <div key={tx.id} className="border-b border-zinc-200 p-4 hover:bg-zinc-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {tx.type === "deposit" ? (
                          <ArrowDownLeft className="w-5 h-5 text-green-600" />
                        ) : tx.type === "withdrawal" ? (
                          <ArrowUpRight className="w-5 h-5 text-red-600" />
                        ) : (
                          <ArrowUpRight className="w-5 h-5 text-blue-600" />
                        )}
                        <div>
                          <p className="font-semibold text-sm text-zinc-900 capitalize">{tx.type}</p>
                          <p className="text-xs text-zinc-500">{tx.date}</p>
                        </div>
                      </div>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          tx.status === "completed" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {tx.status === "completed" ? "Done" : "Pending"}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-600 mb-2">{tx.description}</p>
                    <p className="text-lg font-bold text-zinc-900">{tx.amount.toLocaleString()} FCFA</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
