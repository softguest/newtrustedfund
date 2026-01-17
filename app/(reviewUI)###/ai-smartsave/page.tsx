"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
// import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import {
  LogOut,
  Home,
  TrendingUp,
  Users,
  FileText,
  Bell,
  Menu,
  ChevronDown,
  Plus,
  Shield,
  Settings,
  HelpCircle,
  Calculator,
  CheckCircle,
  Target,
} from "lucide-react"
import { XAF } from "@/lib/currency"
import { useUser } from "@clerk/nextjs"

export default function AISmartSavePage() {
  const router = useRouter()
  const { user } = useUser()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)

  const [goalAmount, setGoalAmount] = useState(100000)
  const [currentSavings, setCurrentSavings] = useState(25000)
  const [contributionAmount, setContributionAmount] = useState(5000)
  const [frequency, setFrequency] = useState("daily")
  const [showProjection, setShowProjection] = useState(false)
  const [projection, setProjection] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [goalName, setGoalName] = useState("")

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

  // const handleLogout = () => {
  //   logout()
  //   router.push("/")
  // }

  const calculateProjection = () => {
    let daysPerPeriod = 1
    if (frequency === "weekly") daysPerPeriod = 7
    else if (frequency === "monthly") daysPerPeriod = 30
    else if (frequency === "bi-weekly") daysPerPeriod = 14

    const remainingAmount = goalAmount - currentSavings
    const totalDailyContribution = contributionAmount / daysPerPeriod
    const daysNeeded = Math.ceil(remainingAmount / totalDailyContribution)
    const daysMonthsWeeks =
      frequency === "daily"
        ? `${daysNeeded} days`
        : frequency === "weekly"
          ? `${Math.ceil(daysNeeded / 7)} weeks`
          : frequency === "bi-weekly"
            ? `${Math.ceil(daysNeeded / 14)} bi-weeks`
            : `${Math.ceil(daysNeeded / 30)} months`

    const interestRate = 0.05
    const monthlyRate = interestRate / 12
    const months = daysNeeded / 30
    const projectedWithInterest = currentSavings * Math.pow(1 + monthlyRate, months) + contributionAmount * months
    const interestEarned = Math.max(0, projectedWithInterest - currentSavings - contributionAmount * months)

    const proj = {
      timeframe: daysMonthsWeeks,
      daysNeeded,
      projectedFinal: currentSavings + remainingAmount + interestEarned,
      interestEarned: Math.round(interestEarned),
      totalContributions: remainingAmount,
    }

    // setProjection(proj)
    setShowProjection(true)
  }

  const createGoal = () => {
    if (!goalName.trim()) {
      alert("Please enter a goal name")
      return
    }

    alert(`✓ Savings Goal "${goalName}" created successfully and added to your dashboard!`)
    setShowCreateModal(false)
    setGoalName("")
    setShowProjection(false)
  }

  const menuItems = [
    { label: "Dashboard", icon: Home, href: "/verify-kyc" },
    { label: "My Savings", icon: TrendingUp, href: "/my-savings" },
    { label: "Savings Groups", icon: Users, href: "/savings-groups" },
    { label: "Transactions", icon: FileText, href: "/transactions" },
    { label: "Notifications", icon: Bell, href: "/notifications" },
    { label: "Create Savings Plan", icon: Plus, href: "/create-savings-plan" },
    { label: "Join Savings Group", icon: Users, href: "/join-savings-group" },
    { label: "Create Savings Goal", icon: Target, href: "/ai-smartsave", active: true },
    { label: "KYC Verification", icon: Shield, href: "/kyc-verification" },
    { label: "Settings", icon: Settings, href: "/settings" },
    { label: "Help & Support", icon: HelpCircle, href: "/help-support" },
  ]

  return (
    <div className="flex h-screen bg-zinc-50">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "w-64" : "w-20"} transition-all duration-300 bg-white border-r border-zinc-200 flex flex-col fixed h-screen`}
      >
        <div className="p-6 border-b border-zinc-200">
          {sidebarOpen ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white font-bold text-sm">
                C
              </div>
              <span className="font-bold text-sm">CSTrustFunds</span>
            </div>
          ) : (
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white font-bold">
              C
            </div>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.label}
                onClick={() => router.push(item.href)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm ${
                  item.active ? "bg-red-50 text-red-600 font-semibold" : "text-zinc-600 hover:bg-zinc-100"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && item.label}
              </button>
            )
          })}
        </nav>

        <div className="border-t border-zinc-200 p-4">
          <button
            // onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-zinc-600 hover:bg-red-50 hover:text-red-600 transition-all text-sm font-medium"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && "Logout"}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`${sidebarOpen ? "ml-64" : "ml-20"} flex-1 flex flex-col transition-all duration-300`}>
        {/* Header */}
        <div className="bg-white border-b border-zinc-200 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-zinc-100 rounded-lg transition-all"
            >
              <Menu className="w-5 h-5 text-zinc-600" />
            </button>
            <h1 className="text-xl font-bold text-zinc-900">Create Savings Goal</h1>
          </div>
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-zinc-100 transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center text-white font-bold text-sm">
                {user?.firstName?.charAt(0).toUpperCase()}
              </div>
              <ChevronDown className="w-4 h-4 text-zinc-600" />
            </button>
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-zinc-200 z-10">
                <button className="w-full text-left px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50">Profile</button>
                <button className="w-full text-left px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50">Settings</button>
                <button
                  // onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8 space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Target className="w-8 h-8 text-red-600" />
                <h2 className="text-3xl font-bold text-zinc-900">Create Your Savings Goal</h2>
              </div>
              <p className="text-zinc-600 mt-2 ml-11">
                Use our AI-powered calculator to plan your savings, set realistic targets, and track your progress
                towards your financial goals.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calculator Form */}
              <div className="bg-white rounded-xl border border-zinc-200 p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <Calculator className="w-6 h-6 text-red-600" />
                  <h3 className="text-xl font-bold text-zinc-900">Savings Calculator</h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-semibold text-zinc-700 mb-2 block">Goal Amount (XAF)</label>
                    <input
                      type="number"
                      value={goalAmount}
                      onChange={(e) => setGoalAmount(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                      placeholder="Enter goal amount"
                    />
                    <p className="text-xs text-zinc-500 mt-1">{XAF(goalAmount)}</p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-zinc-700 mb-2 block">Current Savings (XAF)</label>
                    <input
                      type="number"
                      value={currentSavings}
                      onChange={(e) => setCurrentSavings(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                      placeholder="Enter current savings"
                    />
                    <p className="text-xs text-zinc-500 mt-1">{XAF(currentSavings)}</p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-zinc-700 mb-2 block">Contribution Amount (XAF)</label>
                    <input
                      type="number"
                      value={contributionAmount}
                      onChange={(e) => setContributionAmount(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                      placeholder="Enter contribution amount"
                    />
                    <p className="text-xs text-zinc-500 mt-1">{XAF(contributionAmount)}</p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-zinc-700 mb-2 block">Contribution Frequency</label>
                    <select
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value)}
                      className="w-full px-4 py-3 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="bi-weekly">Bi-weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>

                  <Button
                    onClick={calculateProjection}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 rounded-lg font-semibold"
                  >
                    <Calculator className="w-4 h-4 mr-2" />
                    Calculate Projection
                  </Button>
                </div>
              </div>

              {/* Projection Results */}
              {showProjection && projection && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-red-600 via-red-700 to-red-900 rounded-xl p-8 text-white shadow-lg">
                    <h3 className="text-xl font-bold mb-6">Your Savings Projection</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm opacity-90">Time to Goal</p>
                          <p className="text-3xl font-bold mt-2">
                            {/* {projection.timeframe} */}
                            </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm opacity-90">Days Required</p>
                          <p className="text-2xl font-bold mt-2">
                            {/* {projection.daysNeeded} */}
                            </p>
                        </div>
                      </div>

                      <div className="border-t border-red-400 border-opacity-30 pt-4 space-y-3">
                        <div className="flex justify-between">
                          <span className="opacity-90">Projected Final Amount</span>
                          <span className="font-bold">
                            {/* {XAF(Math.round(projection.projectedFinal))} */}
                            </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="opacity-90">Total Contributions</span>
                          <span className="font-bold">
                            {/* {XAF(projection.totalContributions)} */}
                            </span>
                        </div>
                        <div className="flex justify-between bg-red-500 bg-opacity-30 rounded-lg px-3 py-2">
                          <span>Interest Earned (5% APY)</span>
                          <span className="font-bold">
                            {/* {XAF(projection.interestEarned)} */}
                            </span>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={() => setShowCreateModal(true)}
                      className="w-full mt-6 bg-white text-red-600 hover:bg-zinc-100 font-semibold rounded-lg py-2"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Create This Goal
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Create Goal Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-xl">
            <h3 className="text-xl font-bold text-zinc-900 mb-4">Name Your Savings Goal</h3>
            <input
              type="text"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
              placeholder="e.g., Emergency Fund, Vacation, New Phone"
              className="w-full px-4 py-3 border border-zinc-200 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <div className="flex gap-3">
              <Button
                onClick={() => {
                  setShowCreateModal(false)
                  setGoalName("")
                }}
                variant="outline"
                className="flex-1 border-zinc-200 text-zinc-700"
              >
                Cancel
              </Button>
              <Button
                onClick={createGoal}
                className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
              >
                Create Goal
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
