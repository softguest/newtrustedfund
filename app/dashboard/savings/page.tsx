"use client"

export const dynamic = "force-dynamic"

import { DashboardLayout } from "@/components/dashboard-layout"
// import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { XAF } from "@/lib/currency"
import { TrendingUp, Plus, Zap, Lock, CheckCircle, Users } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SavingsPage() {
  // const { user, isLoading } = useAuth()
  const router = useRouter()

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

  const menuItems = [
    { label: "Dashboard", icon: TrendingUp, href: "/verify-kyc" },
    { label: "My Savings", icon: TrendingUp, href: "/my-savings", active: true },
    { label: "Savings Groups", icon: Users, href: "#" },
    { label: "Transactions", icon: Users, href: "#" },
    { label: "Notifications", icon: Users, href: "#" },
  ]

  const summaryCards = [
    { label: "Total Saved", value: XAF(45250), currency: "", icon: TrendingUp },
    { label: "Active Savings Plans", value: "3", currency: "Plans", icon: CheckCircle },
    { label: "Locked Savings", value: XAF(18500), currency: "", icon: Lock },
  ]

  const savingsPlans = [
    {
      id: 1,
      name: "School Fees 2026",
      purpose: "Children education",
      targetAmount: 500000,
      amountSaved: 245000,
      dailyContribution: 5000,
      status: "active",
      dueDate: "2026-09-01",
    },
    {
      id: 2,
      name: "Emergency Fund",
      purpose: "Emergency savings",
      targetAmount: 200000,
      amountSaved: 125000,
      dailyContribution: 2000,
      status: "active",
      dueDate: "2025-12-31",
    },
    {
      id: 3,
      name: "Business Expansion",
      purpose: "Grow my business",
      targetAmount: 1000000,
      amountSaved: 400000,
      dailyContribution: 10000,
      status: "locked",
      dueDate: "2025-06-30",
    },
  ]

  const groupSavings = [
    {
      id: 1,
      name: "Home Fund Group",
      purpose: "Building our dream home",
      members: 8,
      frequency: "Weekly",
      status: "active",
    },
    {
      id: 2,
      name: "Education Collective",
      purpose: "Supporting students",
      members: 12,
      frequency: "Bi-weekly",
      status: "active",
    },
    {
      id: 3,
      name: "Wedding Fund",
      purpose: "Planning celebration",
      members: 5,
      frequency: "Monthly",
      status: "pending",
    },
  ]

  const progressPercentage = (saved: number, target: number) => Math.round((saved / target) * 100)

  return (
    <DashboardLayout>
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-zinc-200 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-zinc-900">My Savings</h1>
          </div>
          <div className="flex items-center gap-4">{/* Profile Dropdown */}</div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-8">
            {/* Page Title and Subtitle */}
            <div>
              <h2 className="text-3xl font-bold text-zinc-900">My Savings</h2>
              <p className="text-zinc-600 mt-2">Track your progress and stay disciplined with your goals.</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {summaryCards.map((card, idx) => {
                const Icon = card.icon
                return (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 rounded-2xl p-6 text-white shadow-lg"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-sm font-medium opacity-90">{card.label}</p>
                        <p className="text-3xl font-bold mt-2">{card.value}</p>
                        <p className="text-xs opacity-75 mt-1">{card.currency}</p>
                      </div>
                      <Icon className="w-8 h-8 opacity-75" />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Primary Actions */}
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => router.push("/create-savings-plan")}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-2 rounded-lg font-medium"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Savings Goal
              </Button>
              <Button
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50 px-6 py-2 rounded-lg font-medium bg-transparent"
              >
                <Users className="w-4 h-4 mr-2" />
                Join a Savings Group
              </Button>
              <Button variant="ghost" className="text-zinc-600 hover:bg-zinc-100 px-6 py-2 rounded-lg font-medium">
                <Zap className="w-4 h-4 mr-2" />
                AI SmartSave
              </Button>
            </div>

            {/* Personal Savings Section */}
            <div>
              <h3 className="text-xl font-bold text-zinc-900 mb-6">My Personal Savings Plans</h3>
              <div className="space-y-4">
                {savingsPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className="bg-white rounded-xl border border-zinc-200 p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h4 className="text-lg font-bold text-zinc-900">{plan.name}</h4>
                          <span
                            className={`text-xs font-semibold px-3 py-1 rounded-full ${
                              plan.status === "active"
                                ? "bg-green-100 text-green-700"
                                : plan.status === "locked"
                                  ? "bg-amber-100 text-amber-700"
                                  : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {plan.status === "active" ? "Active" : plan.status === "locked" ? "Locked" : "Completed"}
                          </span>
                        </div>
                        <p className="text-sm text-zinc-500 mt-1">{plan.purpose}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-zinc-500">Target Amount</p>
                        <p className="text-lg font-bold text-zinc-900">{XAF(plan.targetAmount)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500">Amount Saved</p>
                        <p className="text-lg font-bold text-red-600">{XAF(plan.amountSaved)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500">Daily Contribution</p>
                        <p className="text-lg font-bold text-zinc-900">{XAF(plan.dailyContribution)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500">Progress</p>
                        <p className="text-lg font-bold text-green-600">
                          {progressPercentage(plan.amountSaved, plan.targetAmount)}%
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="w-full bg-zinc-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-red-600 to-red-700 h-2 rounded-full transition-all"
                          style={{ width: `${progressPercentage(plan.amountSaved, plan.targetAmount)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" className="text-xs border-zinc-200 hover:bg-zinc-50 bg-transparent">
                        View Details
                      </Button>
                      {plan.status === "active" && (
                        <Button
                          variant="outline"
                          className="text-xs border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                        >
                          Top Up
                        </Button>
                      )}
                      <Button variant="ghost" className="text-xs text-zinc-600 hover:bg-zinc-100">
                        <Zap className="w-3 h-3 mr-1" />
                        AI Advice
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Group Savings Section */}
            <div>
              <h3 className="text-xl font-bold text-zinc-900 mb-6">My Group Savings</h3>
              <div className="space-y-4">
                {groupSavings.map((group) => (
                  <div
                    key={group.id}
                    className="bg-white rounded-xl border border-zinc-200 p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h4 className="text-lg font-bold text-zinc-900">{group.name}</h4>
                          <span
                            className={`text-xs font-semibold px-3 py-1 rounded-full ${
                              group.status === "active" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {group.status === "active" ? "Active Member" : "Pending Approval"}
                          </span>
                        </div>
                        <p className="text-sm text-zinc-500 mt-1">{group.purpose}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-zinc-500">Members</p>
                        <p className="text-lg font-bold text-zinc-900">{group.members}</p>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500">Contribution Frequency</p>
                        <p className="text-lg font-bold text-zinc-900">{group.frequency}</p>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500">Status</p>
                        <p className="text-lg font-bold text-red-600">{group.status}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" className="text-xs border-zinc-200 hover:bg-zinc-50 bg-transparent">
                        View Group
                      </Button>
                      <Button variant="outline" className="text-xs border-zinc-200 hover:bg-zinc-50 bg-transparent">
                        View Rules
                      </Button>
                      {group.status === "active" && (
                        <Button variant="ghost" className="text-xs text-red-600 hover:bg-red-50">
                          Leave Group
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI SmartSave Panel */}
            <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-2xl p-8 border border-red-200">
              <div className="flex items-start gap-4">
                <Zap className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-zinc-900">SmartSave AI</h3>
                  <p className="text-sm text-zinc-600 mt-2">
                    Based on your activity, you could save {XAF(50000)} by increasing your daily contribution to{" "}
                    {XAF(7000)}.
                  </p>
                  <Button className="mt-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-2 rounded-lg font-medium">
                    Get Smart Advice
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
