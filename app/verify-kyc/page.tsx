"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Plus,
  Lock,
  ArrowRight,
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
import { Button } from "@/components/ui/button"
import { TransactionPinModal } from "@/components/transaction-pin-modal"
import { DashboardLayout } from "@/components/dashboard-layout"
import { XAF } from "@/lib/currency"
import { TopCommunitiesSidebar } from "@/components/top-communities-sidebar"
import { auth } from "@clerk/nextjs/server"

// Define a type for SavingsGoal for better type safety
interface SavingsGoal {
  id: number | string
  name: string
  description?: string
  targetAmount?: number
  amountSaved?: number
  frequency?: string
  duration?: number
  createdAt?: string
  transactions?: Transaction[]
  title?: string // Added for potential consistency, though 'name' is used more
  status?: string // Added for savings goals
}

// Define a more specific type for SavingsGroup
interface SavingsGroup {
  id: number
  groupName: string
  description: string
  target: number
  current: number
  members: number
  monthlyTarget: number
  creatorName: string
  invitedMembers?: any[] // Assuming this might exist based on the update
  totalMembers?: number // Added based on the update
}

interface Transaction {
  id: string
  date: string
  amount: number
  method: string
  status: "completed" | "pending" | "failed"
  details: string
  type?: string // Added for distinguishing top-ups etc.
}

export const dynamic = "force-dynamic"

export default function DashboardPage() {
  const router = useRouter()
  // const { user, isLoading, fetchUser } = await auth() // Added fetchUser
  const [kycAccepted, setKycAccepted] = useState(false) // This state might be redundant now but kept for now
  const [showTransactionPin, setShowTransactionPin] = useState(false)
  const [transactionType, setTransactionType] = useState("")

  const [notifications, setNotifications] = useState<any[]>([])
  const [mainBalance, setMainBalance] = useState(500000)

  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([])
  // const [showWelcome, setShowWelcome] = useState(true)
  const [showKycModal, setShowKycModal] = useState(false) // Added for KYC verification modal
  const [hideBalance, setHideBalance] = useState(false)
  const [savingsGroups, setSavingsGroups] = useState<SavingsGroup[]>([]) // Use the specific SavingsGroup type
  const [selectedGoal, setSelectedGoal] = useState<SavingsGoal | null>(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showHistoryModal, setShowHistoryModal] = useState(false)
  const [showPINModal, setShowPINModal] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("")
  const [transactionPIN, setTransactionPIN] = useState("")
  const [paymentAmount, setPaymentAmount] = useState("")
  const [mobileNumber, setMobileNumber] = useState("")
  const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "" })
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingStep, setProcessingStep] = useState("")

  const [topUpAmount, setTopUpAmount] = useState("")
  const [isTopUpMode, setIsTopUpMode] = useState(false)

  useEffect(() => {
    const savedNotifications = localStorage.getItem("user_notifications")
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications))
    }

    const savedBalance = localStorage.getItem("user_account_balance")
    if (savedBalance) {
      setMainBalance(Number.parseFloat(savedBalance))
    }
  }, [])

  // useEffect(() => {
  //   const checkKycStatus = async () => {
  //     if (!isLoading && user && user.id) {
  //       try {
  //         const supabase = createClient()
  //         const { data, error } = await supabase
  //           .from("kyc_submissions")
  //           .select("status")
  //           .eq("user_id", user.id)
  //           .order("created_at", { ascending: false })
  //           .limit(1)
  //           .single()

  //         if (error) {
  //           console.error("Error fetching KYC status:", error)
  //           // Fallback to localStorage if Supabase fails
  //           const storedUser = localStorage.getItem("cstrustfunds_user")
  //           if (storedUser) {
  //             const parsedUser = JSON.parse(storedUser)
  //             setKycAccepted(parsedUser.kycVerified || false)
  //             if (!parsedUser.kycVerified) {
  //               setShowKycModal(true)
  //             }
  //           } else {
  //             setShowKycModal(true)
  //           }
  //         } else if (data) {
  //           const isApproved = data.status === "approved"
  //           setKycAccepted(isApproved)
  //           if (!isApproved) {
  //             setShowKycModal(true)
  //           }
  //         }
  //       } catch (e) {
  //         console.error("Unexpected error fetching KYC status:", e)
  //         // Fallback to localStorage if Supabase fails unexpectedly
  //         const storedUser = localStorage.getItem("cstrustfunds_user")
  //         if (storedUser) {
  //           const parsedUser = JSON.parse(storedUser)
  //           setKycAccepted(parsedUser.kycVerified || false)
  //           if (!parsedUser.kycVerified) {
  //             setShowKycModal(true)
  //           }
  //         } else {
  //           setShowKycModal(true)
  //         }
  //       }
  //     } else if (!isLoading && !user) {
  //       router.push("/login")
  //       return
  //     }
  //   }

  //   checkKycStatus()

  //   if (!isLoading && !user) {
  //     // This block is now handled within checkKycStatus, so this is redundant
  //     // router.push("/login")
  //     // return
  //   }
  //   const goals = JSON.parse(localStorage.getItem("savings_goals") || "[]")
  //   const groups = JSON.parse(localStorage.getItem("savings_groups") || "[]")
  //   setSavingsGoals(goals)
  //   setSavingsGroups(groups)

  //   // Removed the direct check for user.kycVerified here as it's handled by checkKycStatus
  // }, [user, isLoading, router])

  useEffect(() => {
    localStorage.setItem("user_account_balance", mainBalance.toString())
  }, [mainBalance])

  const addNotification = (title: string, message: string, type: "success" | "pending" | "failed") => {
    const newNotification = {
      id: `notif_${Date.now()}`,
      title,
      message,
      type,
      timestamp: new Date().toLocaleString(),
      // email: user?.email || "user@cstrustfunds.com",
    }
    const updatedNotifications = [newNotification, ...notifications]
    setNotifications(updatedNotifications)
    localStorage.setItem("user_notifications", JSON.stringify(updatedNotifications))
    // console.log("[v0] Email sent to:", newNotification.email, newNotification)
  }

  // if (isLoading || !user) {
  //   return (
  //     <DashboardLayout currentBalance={0}>
  //       <div className="p-4 md:p-8 flex items-center justify-center min-h-screen">
  //         <div className="text-center">
  //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
  //           <p className="text-zinc-600">Loading dashboard...</p>
  //         </div>
  //       </div>
  //     </DashboardLayout>
  //   )
  // }

  const handleTransferClick = (type: string) => {
    if (type === "Top Up") {
      setIsTopUpMode(true)
      setShowPaymentModal(true)
    } else {
      // existing transfer logic
      setSelectedGoal({ name: type, id: type }) // Mocking selection for transfer type
      setShowPaymentModal(true)
    }
  }

  const handleTransactionSuccess = () => {
    // This function is now handled by the specific payment processing logic
    // but can be used for generic success notifications if needed.
    alert(`${transactionType} completed successfully!`) // This might need refinement based on actual transactionType
    if (transactionType.includes("send")) {
      setMainBalance((prev) => prev - 500) // Placeholder deduction
    }
  }

  // Moved these inside the component but outside the return, as they are static data.
  // If this data needs to be fetched, it should be handled differently.
  const topCommunities = [
    { id: 1, name: "Home Fund", target: 50000, current: 32000, members: 5, monthlyTarget: 2500 },
    { id: 2, name: "Education Fund", target: 100000, current: 45000, members: 8, monthlyTarget: 5000 },
    { id: 3, name: "Business Capital", target: 200000, current: 78000, members: 12, monthlyTarget: 8000 },
    { id: 4, name: "Wedding Savings", target: 75000, current: 28000, members: 6, monthlyTarget: 3000 },
  ]

  // Moved handleSaveNow to be outside of the return block and to accept SavingsGoal type
  const handleSaveNow = (goal: SavingsGoal) => {
    setSelectedGoal(goal)
    setIsTopUpMode(false) // Ensure we are not in top-up mode for savings goals
    setShowPaymentModal(true)
  }

  const handleTopUpPayment = () => {
    if (!paymentAmount) {
      alert("Please enter an amount")
      return
    }
    if ((paymentMethod === "mtn" || paymentMethod === "orange") && !mobileNumber) {
      alert("Please enter your phone number")
      return
    }
    if (paymentMethod === "card" && (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv)) {
      alert("Please enter complete card details")
      return
    }
    setShowPaymentModal(false)
    setShowPINModal(true)
  }

  const dashboardContent = (
    <>
      {/* Removed the entire showWelcome section that was rendering the welcome card */}
      {/* The welcome section was at lines 205-270 in the original code */}
      {/* The showWelcome state and related logic have been removed */}

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">Main Account</h2>
        <div className="bg-gradient-to-br from-red-600 via-red-700 to-red-900 rounded-2xl p-8 text-white shadow-lg">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <p className="text-sm opacity-90">Account Balance</p>
                <button
                  onClick={() => setHideBalance(!hideBalance)}
                  className="p-1 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                  aria-label="Toggle balance visibility"
                >
                  {hideBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-4xl font-bold">{hideBalance ? "••••••" : XAF(mainBalance)}</p>
            </div>
            <CreditCard className="w-8 h-8 opacity-80" />
          </div>
          <div className="flex justify-start items-end">
            <div>
              <p className="text-xs opacity-75 mb-1">Account Type</p>
              {/* <p className="text-sm font-semibold capitalize">{user?.accountType || "Personal"} Savings</p> */}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          <Button
            onClick={() => handleTransferClick("Top Up")}
            className="h-16 bg-white border-2 border-red-600 text-zinc-900 hover:bg-red-50 rounded-lg font-semibold text-sm flex flex-col items-center justify-center p-3 transition-all duration-300 hover:scale-105 active:bg-gradient-to-br active:from-red-600 active:to-red-800 active:text-white active:border-red-800 shadow-sm hover:shadow-md"
          >
            <ArrowUpRight className="w-5 h-5 mb-1" />
            <span className="text-xs">Top Up</span>
          </Button>
          <Button
            onClick={() => router.push("/create-savings-plan")}
            className="h-16 bg-white border-2 border-red-600 text-zinc-900 hover:bg-red-50 rounded-lg font-semibold text-sm flex flex-col items-center justify-center p-3 transition-all duration-300 hover:scale-105 active:bg-gradient-to-br active:from-red-600 active:to-red-800 active:text-white active:border-red-800 shadow-sm hover:shadow-md"
          >
            <Plus className="w-5 h-5 mb-1" />
            <span className="text-xs">Create Goal</span>
          </Button>
          <Button
            onClick={() => router.push("/join-savings-group")}
            className="h-16 bg-white border-2 border-red-600 text-zinc-900 hover:bg-red-50 rounded-lg font-semibold text-sm flex flex-col items-center justify-center p-3 transition-all duration-300 hover:scale-105 active:bg-gradient-to-br active:from-red-600 active:to-red-800 active:text-white active:border-red-800 shadow-sm hover:shadow-md"
          >
            <Plus className="w-5 h-5 mb-1" />
            <span className="text-xs">Join Group</span>
          </Button>
          <Button
            onClick={() => handleTransferClick("Withdraw")}
            className="h-16 bg-white border-2 border-red-600 text-zinc-900 hover:bg-red-50 rounded-lg font-semibold text-sm flex flex-col items-center justify-center p-3 transition-all duration-300 hover:scale-105 active:bg-gradient-to-br active:from-red-600 active:to-red-800 active:text-white active:border-red-800 shadow-sm hover:shadow-md"
          >
            <Wallet className="w-5 h-5 mb-1" />
            <span className="text-xs">Withdraw</span>
          </Button>
          <Button
            onClick={() => handleTransferClick("Transfer")}
            className="h-16 bg-white border-2 border-red-600 text-zinc-900 hover:bg-red-50 rounded-lg font-semibold text-sm flex flex-col items-center justify-center p-3 transition-all duration-300 hover:scale-105 active:bg-gradient-to-br active:from-red-600 active:to-red-800 active:text-white active:border-red-800 shadow-sm hover:shadow-md"
          >
            <Send className="w-5 h-5 mb-1" />
            <span className="text-xs">Transfer</span>
          </Button>
          <Button
            onClick={() => router.push("/ai-smartsave")}
            className="h-16 bg-white border-2 border-red-600 text-zinc-900 hover:bg-red-50 rounded-lg font-semibold text-sm flex flex-col items-center justify-center p-3 transition-all duration-300 hover:scale-105 active:bg-gradient-to-br active:from-red-600 active:to-red-800 active:text-white active:border-red-800 shadow-sm hover:shadow-md"
          >
            <Zap className="w-5 h-5 mb-1" />
            <span className="text-xs">AI Insights</span>
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-zinc-900">My Savings Goals</h2>
          <Button
            onClick={() => router.push("/create-savings-plan")}
            size="sm"
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Goal
          </Button>
        </div>

        {savingsGoals.length > 0 ? (
          <div className="space-y-3">
            {savingsGoals.slice(0, 3).map((goal) => (
              <div key={goal.id} className="bg-white rounded-xl p-4 border border-zinc-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="font-semibold text-zinc-900 text-sm">{goal.name}</p>
                    <p className="text-xs text-zinc-500 mt-1">{goal.description}</p>
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-700">
                    {goal.status || "Active"}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-zinc-600">
                    <span>Target: {XAF(goal.targetAmount || 0)}</span>
                    <span>
                      {goal.frequency} • {goal.duration}mo
                    </span>
                  </div>
                  <div className="w-full bg-zinc-200 rounded-full h-1.5">
                    <div
                      className="bg-gradient-to-r from-red-600 to-red-800 h-1.5 rounded-full"
                      style={{ width: `${(goal.amountSaved! / goal.targetAmount!) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-red-600 font-semibold">
                    {XAF(goal.amountSaved!)} saved ({Math.round((goal.amountSaved! / goal.targetAmount!) * 100)}%)
                  </p>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    onClick={() => handleSaveNow(goal)} // Changed to use handleSaveNow
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-xs"
                  >
                    Save Now
                  </Button>
                  <Button
                    onClick={() => {
                      setSelectedGoal(goal)
                      setShowHistoryModal(true)
                    }}
                    size="sm"
                    variant="outline"
                    className="flex-1 border-red-200 text-red-600 hover:bg-red-50 text-xs"
                  >
                    View History
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-zinc-50 rounded-xl p-6 text-center border border-zinc-200">
            <p className="text-sm text-zinc-600 mb-3">No savings goals yet</p>
            <Button
              onClick={() => router.push("/create-savings-plan")}
              size="sm"
              variant="outline"
              className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
            >
              Create Your First Goal
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-zinc-900">Saving Groups</h2>
          <Button
            size="sm"
            className={`rounded-lg ${
              kycAccepted // This condition now correctly uses the kycAccepted state
                ? "bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white"
                : "bg-zinc-200 text-zinc-400 cursor-not-allowed"
            }`}
            onClick={() => router.push("/create-savings-group")}
            disabled={!kycAccepted} // This condition now correctly uses the kycAccepted state
          >
            {!kycAccepted && <Lock className="w-4 h-4 mr-2" />}{" "}
            {/* This condition now correctly uses the kycAccepted state */}
            Create Group
          </Button>
        </div>

        {savingsGroups.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {savingsGroups.slice(0, 2).map((group) => (
              <div
                key={group.id}
                className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-bold text-zinc-900">{group.groupName}</p>
                    <p className="text-xs text-zinc-500 mt-1">
                      {group.totalMembers || (group.invitedMembers?.length || 0) + 1} members
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-zinc-600">Created by: {group.creatorName}</p>
                    <p className="text-xs text-zinc-500">{group.description}</p>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white rounded-lg h-9"
                      onClick={() => router.push(`/group-details/${group.id}`)}
                    >
                      View <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-zinc-200 text-zinc-700 rounded-lg h-9 bg-transparent"
                      onClick={() => router.push("/savings-groups")}
                    >
                      Manage
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-zinc-50 rounded-xl p-6 text-center border border-zinc-200">
            <p className="text-sm text-zinc-600 mb-3">No savings groups yet</p>
            <Button
              onClick={() => router.push("/create-savings-group")}
              size="sm"
              variant="outline"
              className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
            >
              Create Your First Group
            </Button>
          </div>
        )}
      </div>

      <div className="hidden lg:block space-y-4">
        <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
          <Zap className="w-5 h-5 text-brand-red" />
          AI SmartSave
        </h3>
        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border border-red-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <p className="font-semibold text-zinc-900 mb-1">Get AI-Powered Savings Recommendations</p>
              <p className="text-sm text-zinc-600">Let our AI create personalized savings plans based on your goals</p>
            </div>
          </div>
          <Button
            onClick={() => router.push("/ai-smartsave")}
            className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white rounded-lg h-11 font-semibold"
          >
            <Zap className="w-4 h-4 mr-2" />
            Start AI SmartSave
          </Button>
        </div>
      </div>
    </>
  )

  return (
    <DashboardLayout currentBalance={hideBalance ? 0 : mainBalance}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 md:p-8">
        {/* Main Content - Left Side */}
        <div className="lg:col-span-2 space-y-6">
          {/* Account Balance Card */}
          {dashboardContent}

          {/* KYC Alert */}
          {showKycModal &&
            // user &&
            !kycAccepted && ( // Changed to use kycAccepted
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-lg">
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-red-100 rounded-full p-4">
                      <AlertCircle className="w-8 h-8 text-red-600" />
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-center mb-2 text-zinc-900">KYC Verification Required</h2>
                  <p className="text-center text-zinc-600 mb-6">
                    Before you can access savings features, top-up, and other services, you need to complete KYC
                    verification.
                  </p>

                  <div className="space-y-3 mb-6 bg-red-50 rounded-lg p-4">
                    <p className="text-sm text-red-800 font-semibold">Required information:</p>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• Valid government ID</li>
                      <li>• Proof of address</li>
                      <li>• Phone number verification</li>
                    </ul>
                  </div>

                  <Button
                    onClick={async () => {
                      // Added async for potential Supabase call
                      // Ideally, this would trigger a navigation to a KYC form or initiate a process.
                      // For this example, we'll simulate success and update local storage/Supabase.

                      // try {
                      //   // Use the created supabase client instance
                      //   const supabase = createClient()
                      //   const { error } = await supabase
                      //     .from("kyc_submissions")
                      //     .update({ status: "approved", reviewed_at: new Date().toISOString() })
                      //     .eq("user_id", user.id)

                      //   if (error) {
                      //     console.error("Error updating KYC status in Supabase:", error)
                      //     alert("Failed to update KYC status. Please try again later.")
                      //     return
                      //   }

                      //   // If Supabase update is successful, update local state and potentially refetch user
                      //   setKycAccepted(true)
                      //   setShowKycModal(false)
                      //   addNotification("KYC Verified", "Your account has been successfully verified!", "success")

                      //   // Optionally, refetch user data to ensure auth context is up-to-date
                      //   await fetchUser() // Assuming fetchUser updates the auth context
                      // } catch (e) {
                      //   console.error("Unexpected error during KYC update:", e)
                      //   alert("An unexpected error occurred. Please try again.")
                      // }
                    }}
                    className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white rounded-lg h-12 font-semibold"
                  >
                    Start KYC Verification
                  </Button>
                </div>
              </div>
            )}

          {/* Quick Actions */}
          {/* This section seems to be missing or replaced by the button grid */}

          {/* My Savings Goals */}
          {/* This section is already rendered within dashboardContent */}

          {/* Savings Groups */}
          {/* This section is already rendered within dashboardContent */}

          {/* Recent Transactions */}
          {/* This section seems to be missing */}
        </div>

        <div className="hidden lg:block">
          <TopCommunitiesSidebar />
        </div>
      </div>

      {/* Modals */}
      <TransactionPinModal
        isOpen={showTransactionPin}
        onClose={() => setShowTransactionPin(false)}
        onSuccess={handleTransactionSuccess}
        transactionType={transactionType}
      />

      {/* Payment Method Modal - Centered */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-zinc-900">{isTopUpMode ? "Top Up" : "Select Payment Method"}</h3>
              <button
                onClick={() => {
                  setShowPaymentModal(false)
                  setPaymentMethod("")
                  setPaymentAmount("")
                  setMobileNumber("")
                  setCardDetails({ number: "", expiry: "", cvv: "" })
                  setIsTopUpMode(false) // Reset top-up mode
                  setSelectedGoal(null) // Clear selected goal
                }}
                className="text-zinc-400 hover:text-zinc-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!paymentMethod ? (
              <div className="space-y-3">
                {/* CHANGE START */}
                {/* Removed Account Balance option - Top Up only for external methods */}
                {[
                  { id: "mtn", name: "MTN Mobile Money", icon: "📱", description: "Pay via MTN" },
                  { id: "orange", name: "Orange Money", icon: "🟠", description: "Pay via Orange" },
                  { id: "card", name: "Credit Card", icon: "💳", description: "Visa/Mastercard" },
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className="w-full p-4 border-2 border-red-600 rounded-lg hover:bg-red-50 transition text-left font-semibold text-zinc-900"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{method.icon}</span>
                      <div className="flex-1">
                        <p className="font-semibold text-zinc-900">{method.name}</p>
                        <p className="text-xs text-zinc-500">{method.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
                {/* CHANGE END */}
              </div>
            ) : (
              <div className="space-y-4">
                {/* CHANGE START */}
                {/* Conditional rendering for each payment method */}
                {paymentMethod === "mtn" && (
                  <>
                    <p className="text-sm text-zinc-600">Enter your MTN Mobile Money details</p>
                    <input
                      type="tel"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="Phone number (e.g., 237650123456)"
                      className="w-full p-3 border-2 border-red-600 rounded-lg focus:outline-none"
                    />
                    <input
                      type="number"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      placeholder="Amount in XAF"
                      className="w-full p-3 border-2 border-red-600 rounded-lg focus:outline-none"
                    />
                  </>
                )}

                {paymentMethod === "orange" && (
                  <>
                    <p className="text-sm text-zinc-600">Enter your Orange Money details</p>
                    <input
                      type="tel"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="Phone number (e.g., 237650123456)"
                      className="w-full p-3 border-2 border-red-600 rounded-lg focus:outline-none"
                    />
                    <input
                      type="number"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      placeholder="Amount in XAF"
                      className="w-full p-3 border-2 border-red-600 rounded-lg focus:outline-none"
                    />
                  </>
                )}

                {paymentMethod === "card" && (
                  <>
                    <p className="text-sm text-zinc-600">Enter your credit card details</p>
                    <input
                      type="text"
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                      placeholder="Card number (16 digits)"
                      // maxLength="16"
                      className="w-full p-3 border-2 border-red-600 rounded-lg focus:outline-none"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                        placeholder="MM/YY"
                        // maxLength="5"
                        className="p-3 border-2 border-red-600 rounded-lg focus:outline-none"
                      />
                      <input
                        type="text"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                        placeholder="CVV"
                        // maxLength="3"
                        className="p-3 border-2 border-red-600 rounded-lg focus:outline-none"
                      />
                    </div>
                    <input
                      type="number"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      placeholder="Amount in XAF"
                      className="w-full p-3 border-2 border-red-600 rounded-lg focus:outline-none"
                    />
                  </>
                )}
                {/* CHANGE END */}

                <div className="flex gap-3">
                  <Button
                    onClick={() => {
                      setShowPaymentModal(false)
                      setPaymentMethod("")
                      setPaymentAmount("")
                      setMobileNumber("")
                      setCardDetails({ number: "", expiry: "", cvv: "" })
                      setIsTopUpMode(false) // Reset top-up mode
                      setSelectedGoal(null) // Clear selected goal
                    }}
                    variant="outline"
                    className="flex-1 border-zinc-200"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={
                      isTopUpMode
                        ? handleTopUpPayment
                        : () => {
                            // Logic for saving to a goal
                            if (!paymentAmount) {
                              alert("Please enter an amount")
                              return
                            }
                            if ((paymentMethod === "mtn" || paymentMethod === "orange") && !mobileNumber) {
                              alert("Please enter your phone number")
                              return
                            }
                            if (
                              paymentMethod === "card" &&
                              (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv)
                            ) {
                              alert("Please enter complete card details")
                              return
                            }
                            setShowPaymentModal(false)
                            setShowPINModal(true)
                          }
                    }
                    className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* PIN Verification Modal */}
      {/* Update PIN verification modal to handle Top Up processing */}
      {showPINModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            {isProcessing ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mb-4"></div>
                <p className="text-lg font-semibold text-zinc-900">{processingStep}</p>
                <p className="text-sm text-zinc-500 mt-2">Please wait...</p>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-bold text-zinc-900 mb-4">Confirm {isTopUpMode ? "Top Up" : "Payment"}</h3>
                <p className="text-sm text-zinc-600 mb-4">Amount: {XAF(Number(paymentAmount) || 0)}</p>
                <p className="text-sm text-zinc-600 mb-6">Enter your 4-digit Transaction PIN</p>
                <input
                  type="password"
                  maxLength={4}
                  value={transactionPIN}
                  onChange={(e) => setTransactionPIN(e.target.value.replace(/\D/g, ""))}
                  placeholder="••••"
                  className="w-full p-3 border-2 border-red-600 rounded-lg text-center text-2xl font-bold tracking-widest mb-6 focus:outline-none"
                />
                <div className="flex gap-3">
                  <Button
                    onClick={() => {
                      setShowPINModal(false)
                      setTransactionPIN("")
                      setPaymentMethod("")
                      setPaymentAmount("")
                      setMobileNumber("")
                      setCardDetails({ number: "", expiry: "", cvv: "" })
                      setIsTopUpMode(false) // Reset top-up mode
                    }}
                    variant="outline"
                    className="flex-1 border-zinc-200"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      if (transactionPIN.length === 4) {
                        setIsProcessing(true)
                        const amount = Number(paymentAmount) || 0

                        if (isTopUpMode) {
                          // This block handles the Top Up functionality
                          if (paymentMethod === "account") {
                            // This condition is now removed from the UI, but this logic remains for completeness if it were re-added
                            if (mainBalance < amount) {
                              alert("Insufficient balance")
                              setIsProcessing(false)
                              return
                            }

                            setProcessingStep("Verifying PIN...")
                            setTimeout(() => {
                              setProcessingStep("Processing Top Up...")
                              setTimeout(() => {
                                setProcessingStep("Adding to main account...")
                                setTimeout(() => {
                                  setMainBalance((prev) => prev + amount)
                                  const userData = JSON.parse(localStorage.getItem("user_data") || "{}")
                                  userData.accountBalance = mainBalance + amount
                                  localStorage.setItem("user_data", JSON.stringify(userData))

                                  const topUpTransaction: Transaction = {
                                    id: `topup_${Date.now()}`,
                                    date: new Date().toISOString(),
                                    amount: amount,
                                    type: "top-up",
                                    method: "Account Transfer",
                                    status: "completed",
                                    details: "Direct account balance top-up",
                                  }
                                  const transactions = JSON.parse(localStorage.getItem("transactions") || "[]")
                                  transactions.push(topUpTransaction)
                                  localStorage.setItem("transactions", JSON.stringify(transactions))

                                  setIsProcessing(false)
                                  setShowPINModal(false)
                                  setTransactionPIN("")
                                  setPaymentMethod("")
                                  setPaymentAmount("")
                                  setMobileNumber("")
                                  setCardDetails({ number: "", expiry: "", cvv: "" })
                                  setIsTopUpMode(false)

                                  addNotification(
                                    "Top Up Successful",
                                    `${XAF(amount)} has been added to your main account.`,
                                    "success",
                                  )
                                  alert(
                                    `✓ Top Up Successful!\n\n${XAF(amount)} has been added to your main account balance.`,
                                  )
                                }, 1000)
                              }, 1000)
                            }, 1000)
                          } else {
                            // Top Up using external methods (MTN, Orange, Card)
                            const processingSteps = [
                              "Verifying PIN...",
                              `Connecting to ${paymentMethod === "mtn" ? "MTN" : paymentMethod === "orange" ? "Orange" : "Card Provider"}...`,
                              "Processing Top Up...",
                              "Waiting for confirmation...",
                            ]
                            let stepIndex = 0
                            const processStep = () => {
                              if (stepIndex < processingSteps.length) {
                                setProcessingStep(processingSteps[stepIndex])
                                stepIndex++
                                setTimeout(processStep, 2000)
                              } else {
                                const isSuccessful = Math.random() < 0.7 // Simulate success/failure
                                if (isSuccessful) {
                                  setMainBalance((prev) => prev + amount)
                                  const userData = JSON.parse(localStorage.getItem("user_data") || "{}")
                                  userData.accountBalance = mainBalance + amount
                                  localStorage.setItem("user_data", JSON.stringify(userData))

                                  const topUpTransaction: Transaction = {
                                    id: `topup_${Date.now()}`,
                                    date: new Date().toISOString(),
                                    amount: amount,
                                    type: "top-up",
                                    method:
                                      paymentMethod === "card"
                                        ? `Card ending in ${cardDetails.number.slice(-4)}`
                                        : paymentMethod === "mtn"
                                          ? `MTN (${mobileNumber})`
                                          : `Orange (${mobileNumber})`,
                                    status: "completed",
                                    details: `External payment top-up via ${paymentMethod}`,
                                  }
                                  const transactions = JSON.parse(localStorage.getItem("transactions") || "[]")
                                  transactions.push(topUpTransaction)
                                  localStorage.setItem("transactions", JSON.stringify(transactions))

                                  setProcessingStep("Transfer Approved ✓")
                                  setTimeout(() => {
                                    setIsProcessing(false)
                                    setShowPINModal(false)
                                    setTransactionPIN("")
                                    setPaymentMethod("")
                                    setPaymentAmount("")
                                    setMobileNumber("")
                                    setCardDetails({ number: "", expiry: "", cvv: "" })
                                    setIsTopUpMode(false)

                                    addNotification(
                                      "Top Up Confirmed",
                                      `${XAF(amount)} transfer from ${paymentMethod.toUpperCase()} approved and added to your account.`,
                                      "success",
                                    )
                                    alert(
                                      `✓ Top Up Confirmed!\n\n${XAF(amount)} has been successfully transferred and added to your main account.`,
                                    )
                                  }, 1500)
                                } else {
                                  setProcessingStep("Transfer Failed ✗")
                                  setTimeout(() => {
                                    setIsProcessing(false)
                                    setShowPINModal(false)
                                    setTransactionPIN("")
                                    setPaymentMethod("")
                                    setPaymentAmount("")
                                    setMobileNumber("")
                                    setCardDetails({ number: "", expiry: "", cvv: "" })
                                    setIsTopUpMode(false)

                                    addNotification(
                                      "Top Up Failed",
                                      `${paymentMethod.toUpperCase()} transfer of ${XAF(amount)} was declined.`,
                                      "failed",
                                    )
                                    alert(
                                      `✗ Top Up Failed!\n\nYour ${paymentMethod.toUpperCase()} transfer was not approved.\n\nPlease try again.`,
                                    )
                                  }, 1500)
                                }
                              }
                            }
                            processStep()
                          }
                        } else {
                          // This block handles saving to a goal
                          if (!selectedGoal) {
                            alert("No savings goal selected.")
                            setIsProcessing(false)
                            return
                          }

                          if (paymentMethod === "account") {
                            // Account balance saving - handled by 'handleSaveNow' calling this flow
                            if (mainBalance < amount) {
                              alert("Insufficient balance. Please try a smaller amount.")
                              setIsProcessing(false)
                              return
                            }

                            setProcessingStep("Verifying PIN...")
                            setTimeout(() => {
                              setProcessingStep("Processing payment...")
                              setTimeout(() => {
                                setProcessingStep("Deducting from account...")
                                setTimeout(() => {
                                  setMainBalance((prev) => prev - amount)
                                  const updatedGoals = savingsGoals.map((g) =>
                                    g.id === selectedGoal.id
                                      ? {
                                          ...g,
                                          amountSaved: (g.amountSaved || 0) + amount,
                                          transactions: [
                                            ...(g.transactions || []),
                                            {
                                              id: `txn_${Date.now()}`,
                                              date: new Date().toISOString(),
                                              amount: amount,
                                              method: paymentMethod,
                                              status: "completed",
                                              details: "Direct account deduction for savings",
                                              type: "savings",
                                            },
                                          ],
                                        }
                                      : g,
                                  )
                                  // setSavingsGoals(updatedGoals)
                                  localStorage.setItem("savings_goals", JSON.stringify(updatedGoals))

                                  setIsProcessing(false)
                                  setShowPINModal(false)
                                  setTransactionPIN("")
                                  setPaymentMethod("")
                                  setPaymentAmount("")
                                  setMobileNumber("")
                                  setCardDetails({ number: "", expiry: "", cvv: "" })

                                  addNotification(
                                    "Savings Confirmed",
                                    `${XAF(amount)} successfully saved to "${selectedGoal.name}". Funds locked until withdrawal date.`,
                                    "success",
                                  )
                                  alert(
                                    `✓ Payment Successful!\n\n${XAF(amount)} has been deducted and saved to your goal.\n\nYour funds are locked until ${selectedGoal.duration} months from now.\n\nYou'll receive reminders as per your ${selectedGoal.frequency} savings schedule.`,
                                  )
                                }, 1000)
                              }, 1000)
                            }, 1000)
                          } else {
                            // External payment methods for savings goals
                            const processingSteps = [
                              "Verifying PIN...",
                              `Connecting to ${paymentMethod === "mtn" ? "MTN" : paymentMethod === "orange" ? "Orange" : "Card Provider"}...`,
                              "Processing payment...",
                              "Waiting for confirmation...",
                            ]
                            let stepIndex = 0
                            const processStep = () => {
                              if (stepIndex < processingSteps.length) {
                                setProcessingStep(processingSteps[stepIndex])
                                stepIndex++
                                setTimeout(processStep, 2000)
                              } else {
                                const isSuccessful = Math.random() < 0.7 // Simulate success/failure
                                if (isSuccessful) {
                                  const updatedGoals = savingsGoals.map((g) =>
                                    g.id === selectedGoal.id
                                      ? {
                                          ...g,
                                          amountSaved: (g.amountSaved || 0) + amount,
                                          transactions: [
                                            ...(g.transactions || []),
                                            {
                                              id: `txn_${Date.now()}`,
                                              date: new Date().toISOString(),
                                              amount: amount,
                                              method: paymentMethod,
                                              status: "completed",
                                              details:
                                                paymentMethod === "card"
                                                  ? `Card ending in ${cardDetails.number.slice(-4)}`
                                                  : mobileNumber,
                                              type: "savings",
                                            },
                                          ],
                                        }
                                      : g,
                                  )
                                  // setSavingsGoals(updatedGoals)
                                  localStorage.setItem("savings_goals", JSON.stringify(updatedGoals))

                                  setProcessingStep("Transfer Approved ✓")
                                  setTimeout(() => {
                                    setIsProcessing(false)
                                    setShowPINModal(false)
                                    setTransactionPIN("")
                                    setPaymentMethod("")
                                    setPaymentAmount("")
                                    setMobileNumber("")
                                    setCardDetails({ number: "", expiry: "", cvv: "" })

                                    addNotification(
                                      "Payment Confirmed",
                                      `${XAF(amount)} transfer from ${paymentMethod.toUpperCase()} approved and saved to "${selectedGoal.name}".`,
                                      "success",
                                    )
                                    alert(
                                      `✓ Payment Confirmed!\n\n${XAF(amount)} has been successfully transferred and saved to your goal.\n\nYour funds are locked until ${selectedGoal.duration} months from now.`,
                                    )
                                  }, 1500)
                                } else {
                                  setProcessingStep("Transfer Failed ✗")
                                  setTimeout(() => {
                                    setIsProcessing(false)
                                    setShowPINModal(false)
                                    setTransactionPIN("")
                                    setPaymentMethod("")
                                    setPaymentAmount("")
                                    setMobileNumber("")
                                    setCardDetails({ number: "", expiry: "", cvv: "" })

                                    addNotification(
                                      "Payment Failed",
                                      `${paymentMethod.toUpperCase()} transfer of ${XAF(amount)} was declined. Please try again.`,
                                      "failed",
                                    )
                                    alert(
                                      `✗ Payment Failed!\n\nYour ${paymentMethod.toUpperCase()} transfer was not approved.\n\nPlease check your account and try again.`,
                                    )
                                  }, 1500)
                                }
                              }
                            }
                            processStep()
                          }
                        }
                      } else {
                        alert("Please enter a valid 4-digit PIN")
                      }
                    }}
                    className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white"
                  >
                    Confirm
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* History Modal with Download Transcript */}
      {showHistoryModal && selectedGoal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-zinc-900">{selectedGoal.name} - Savings History</h3>
              <button onClick={() => setShowHistoryModal(false)} className="text-zinc-400 hover:text-zinc-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg">
                <p className="text-xs text-zinc-600 mb-1">Total Saved</p>
                <p className="text-lg font-bold text-red-600">{XAF(selectedGoal.amountSaved || 0)}</p>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg">
                <p className="text-xs text-zinc-600 mb-1">Target</p>
                <p className="text-lg font-bold text-red-600">{XAF(selectedGoal.targetAmount || 0)}</p>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg">
                <p className="text-xs text-zinc-600 mb-1">Completion</p>
                <p className="text-lg font-bold text-red-600">
                  {Math.round(((selectedGoal.amountSaved || 0) / (selectedGoal.targetAmount || 1)) * 100)}%
                </p>
              </div>
            </div>

            <h4 className="font-semibold text-zinc-900 mb-3">Recent Transactions</h4>
            <div className="space-y-2 mb-6">
              {selectedGoal.transactions && selectedGoal.transactions.length > 0 ? (
                selectedGoal.transactions.map((txn, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-zinc-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-zinc-900">{txn.method}</p>
                      <p className="text-xs text-zinc-500">{new Date(txn.date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-red-600">{XAF(txn.amount)}</p>
                      <p className="text-xs text-green-600">✓ {txn.status}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-zinc-500">No transactions yet</p>
              )}
            </div>

            <Button
              onClick={() => {
                const transcript = `
                SAVINGS GOAL TRANSCRIPT
                =====================
                Goal: ${selectedGoal.name}
                Description: ${selectedGoal.description || "N/A"}
                Target Amount: ${XAF(selectedGoal.targetAmount || 0)}
                Total Saved: ${XAF(selectedGoal.amountSaved || 0)}
                Completion: ${Math.round(((selectedGoal.amountSaved || 0) / (selectedGoal.targetAmount || 1)) * 100)}%
                Frequency: ${selectedGoal.frequency || "N/A"}
                Duration: ${selectedGoal.duration || 0} months
                Created: ${selectedGoal.createdAt ? new Date(selectedGoal.createdAt).toLocaleDateString() : "N/A"}

                TRANSACTION HISTORY
                ===================
                ${
                  selectedGoal.transactions && selectedGoal.transactions.length > 0
                    ? selectedGoal.transactions
                        .map(
                          (txn) =>
                            `Date: ${new Date(txn.date).toLocaleDateString()} | Method: ${txn.method} | Amount: ${XAF(txn.amount)} | Status: ${txn.status}`,
                        )
                        .join("\n")
                    : "No transactions"
                }

                Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}
                `.trim()

                const element = document.createElement("a")
                element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(transcript))
                element.setAttribute("download", `${selectedGoal.name}_transcript.txt`)
                element.style.display = "none"
                document.body.appendChild(element)
                element.click()
                document.body.removeChild(element)
              }}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
            >
              Download Transcript
            </Button>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
