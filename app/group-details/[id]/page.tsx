"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
// import { useAuth } from "@/lib/auth-context"
import { formatXAF } from "@/lib/currency"
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
  Zap,
  UserPlus,
  ArrowLeft,
  Send,
  Check,
  AlertCircle,
  Calendar,
  MessageSquare,
  DollarSign,
  Phone,
  CreditCard,
} from "lucide-react"
import { useUser } from "@clerk/nextjs"

export default function GroupDetailsPage() {
  const router = useRouter()
  const params = useParams()
  // const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [contributionAmount, setContributionAmount] = useState("")
  const [withdrawalRequest, setWithdrawalRequest] = useState("")
  const [showContributionModal, setShowContributionModal] = useState(false)
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [showPaymentMethodModal, setShowPaymentMethodModal] = useState(false)
  const [showPaymentDetails, setShowPaymentDetails] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("")
  const [showPayoutInfo, setShowPayoutInfo] = useState(false)
  const [showMessageAdmin, setShowMessageAdmin] = useState(false)
  const [showLeaveGroup, setShowLeaveGroup] = useState(false)

  const groupId = params.id

  // Mock group data
  const groupData = {
    id: groupId,
    name: "School Fees Fund",
    description: "Collective savings for children's education",
    totalSaved: 2500000,
    targetAmount: 5000000,
    members: 12,
    frequency: "Daily",
    contributionAmount: 50000,
    status: "active",
    myRole: "Member",
    createdDate: "Jan 15, 2024",
    nextContributionDate: "Dec 22, 2024",
    payoutDate: "March 15, 2025",
  }

  // Mock members with deposit status (no amounts shown)
  const members = [
    { id: 1, name: "John Doe", hasDeposited: true, joinDate: "Jan 15, 2024" },
    { id: 2, name: "Jane Smith", hasDeposited: true, joinDate: "Jan 20, 2024" },
    { id: 3, name: "Peter Okonkwo", hasDeposited: false, joinDate: "Feb 5, 2024" },
    { id: 4, name: "Maria Garcia", hasDeposited: true, joinDate: "Feb 10, 2024" },
    { id: 5, name: "Ahmed Hassan", hasDeposited: true, joinDate: "Feb 15, 2024" },
    { id: 6, name: "Amara Diop", hasDeposited: false, joinDate: "Feb 20, 2024" },
    { id: 7, name: "Kwesi Mensah", hasDeposited: true, joinDate: "Mar 1, 2024" },
    { id: 8, name: "Fatima Tall", hasDeposited: true, joinDate: "Mar 5, 2024" },
  ]

  const menuItems = [
    { label: "Dashboard", icon: Home, href: "/verify-kyc" },
    { label: "My Savings", icon: TrendingUp, href: "/my-savings" },
    { label: "Savings Groups", icon: Users, href: "/savings-groups", active: true },
    { label: "Transactions", icon: FileText, href: "/transactions" },
    { label: "Notifications", icon: Bell, href: "/notifications" },
    { label: "Create Savings Plan", icon: Plus, href: "/create-savings-plan" },
    { label: "Join Savings Group", icon: UserPlus, href: "/join-savings-group" },
    { label: "AI SmartSave", icon: Zap, href: "/ai-smartsave" },
    { label: "KYC Verification", icon: Shield, href: "/kyc-verification" },
    { label: "Settings", icon: Settings, href: "/settings" },
    { label: "Help & Support", icon: HelpCircle, href: "/help-support" },
  ]

  // const handleLogout = () => {
  //   logout()
  //   router.push("/")
  // }
    const {user} = useUser();

  const handleContribution = () => {
    if (!contributionAmount || Number.parseFloat(contributionAmount) <= 0) {
      alert("Please enter a valid amount")
      return
    }
    setSuccessMessage(`Contribution of ${formatXAF(Number.parseFloat(contributionAmount))} recorded successfully!`)
    setShowSuccessModal(true)
    setShowPaymentDetails(false)
    setShowPaymentMethodModal(false)
    setContributionAmount("")
  }

  const handleWithdrawalRequest = () => {
    if (!withdrawalRequest || Number.parseFloat(withdrawalRequest) <= 0) {
      alert("Please enter a valid amount")
      return
    }
    setSuccessMessage(
      `Withdrawal request of ${formatXAF(Number.parseFloat(withdrawalRequest))} submitted to admin for approval!`,
    )
    setShowSuccessModal(true)
    setShowWithdrawalModal(false)
    setWithdrawalRequest("")
  }

  const progressPercentage = (groupData.totalSaved / groupData.targetAmount) * 100

  return (
    <div className="flex h-screen bg-zinc-50">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } transition-all duration-300 bg-white border-r border-zinc-200 flex flex-col fixed h-screen`}
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
            <button
              onClick={() => router.push("/savings-groups")}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <h1 className="text-xl font-bold text-zinc-900">{groupData.name}</h1>
          </div>
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-zinc-100 transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center text-white font-bold text-sm">
                {user?.firstName?.charAt(0).toUpperCase()} {user?.lastName?.charAt(0).toUpperCase()}
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
            {/* Group Header Section */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl text-white p-8">
              <div className="grid grid-cols-2 gap-8 mb-8 md:grid-cols-4">
                <div>
                  <p className="text-red-100 text-sm mb-2">Total Saved</p>
                  <p className="font-bold text-2xl">{formatXAF(groupData.totalSaved)}</p>
                </div>
                <div>
                  <p className="text-red-100 text-sm mb-2">Target</p>
                  <p className="font-bold text-2xl">{formatXAF(groupData.targetAmount)}</p>
                </div>
                <div>
                  <p className="text-red-100 text-sm mb-2">Members</p>
                  <p className="font-bold text-2xl">{groupData.members}</p>
                </div>
                <div>
                  <p className="text-red-100 text-sm mb-2">Frequency</p>
                  <p className="font-bold text-2xl">{groupData.frequency}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex justify-between mb-2">
                  <p className="text-red-100 text-sm">Progress</p>
                  <p className="text-red-100 text-sm font-semibold">{Math.round(progressPercentage)}%</p>
                </div>
                <div className="w-full bg-red-500 rounded-full h-2">
                  <div
                    className="bg-white rounded-full h-2 transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-zinc-200">
              <div className="flex gap-8">
                {["Overview", "Members", "Activity", "Messages"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                    className={`pb-4 font-semibold text-sm transition-all border-b-2 ${
                      activeTab === tab.toLowerCase()
                        ? "text-red-600 border-red-600"
                        : "text-zinc-600 border-transparent hover:text-zinc-900"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Group Info */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Group Details Card */}
                  <div className="bg-white rounded-xl border border-zinc-200 p-6">
                    <h3 className="text-lg font-bold text-zinc-900 mb-4">Group Information</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between pb-4 border-b border-zinc-100">
                        <p className="text-zinc-600">Description</p>
                        <p className="text-zinc-900 font-semibold">{groupData.description}</p>
                      </div>
                      <div className="flex justify-between pb-4 border-b border-zinc-100">
                        <p className="text-zinc-600">Required Savings</p>
                        <p className="text-zinc-900 font-semibold">{formatXAF(groupData.contributionAmount)} Daily</p>
                      </div>
                      <div className="flex justify-between pb-4 border-b border-zinc-100">
                        <p className="text-zinc-600">Your Role</p>
                        <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                          {groupData.myRole}
                        </span>
                      </div>
                      <div className="flex justify-between pb-4 border-b border-zinc-100">
                        <p className="text-zinc-600">Created Date</p>
                        <p className="text-zinc-900 font-semibold">{groupData.createdDate}</p>
                      </div>
                      <div className="flex justify-between pb-4 border-b border-zinc-100">
                        <p className="text-zinc-600">Payout Date</p>
                        <p className="text-zinc-900 font-semibold text-red-600">{groupData.payoutDate}</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-zinc-600">Next Contribution</p>
                        <p className="text-zinc-900 font-semibold">{groupData.nextContributionDate}</p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      onClick={() => setShowPaymentMethodModal(true)}
                      className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white h-12 text-base"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Save Now
                    </Button>
                    <Button
                      onClick={() => setShowPayoutInfo(true)}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white h-12 text-base"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Payout Date
                    </Button>
                    <Button
                      onClick={() => setShowMessageAdmin(true)}
                      className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white h-12 text-base"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Message Admin
                    </Button>
                    <Button
                      onClick={() => setShowLeaveGroup(true)}
                      className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white h-12 text-base"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Leave Group
                    </Button>
                  </div>
                </div>

                {/* Right Column - Quick Stats */}
                <div className="space-y-4">
                  <div className="bg-white rounded-xl border border-zinc-200 p-6">
                    <h4 className="font-bold text-zinc-900 mb-4">Your Contributions</h4>
                    <p className="text-2xl font-bold text-red-600">{formatXAF(200000)}</p>
                    <p className="text-xs text-zinc-500 mt-2">4 contributions made</p>
                  </div>

                  <div className="bg-white rounded-xl border border-zinc-200 p-6">
                    <h4 className="font-bold text-zinc-900 mb-4">Group Status</h4>
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-green-600 text-sm">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Members Tab */}
            {activeTab === "members" && (
              <div className="bg-white rounded-xl border border-zinc-200 p-6">
                <h3 className="text-lg font-bold text-zinc-900 mb-6">Group Members</h3>
                <div className="space-y-3">
                  {members.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-4 bg-zinc-50 rounded-lg border border-zinc-100 hover:border-zinc-200 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-bold text-sm">
                          {member.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-zinc-900">{member.name}</p>
                          <p className="text-xs text-zinc-500">Joined {member.joinDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {member.hasDeposited ? (
                          <div className="flex items-center gap-1 bg-green-100 px-3 py-1 rounded-full">
                            <Check className="w-4 h-4 text-green-600" />
                            <span className="text-xs font-semibold text-green-700">Deposited</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
                            <AlertCircle className="w-4 h-4 text-yellow-600" />
                            <span className="text-xs font-semibold text-yellow-700">Pending</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Activity Tab */}
            {activeTab === "activity" && (
              <div className="bg-white rounded-xl border border-zinc-200 p-6">
                <h3 className="text-lg font-bold text-zinc-900 mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  {[
                    { user: "You", action: "made a contribution", amount: formatXAF(50000), date: "Today" },
                    { user: "John Doe", action: "made a contribution", amount: formatXAF(50000), date: "Yesterday" },
                    {
                      user: "Jane Smith",
                      action: "requested withdrawal",
                      amount: formatXAF(100000),
                      date: "2 days ago",
                    },
                    {
                      user: "Peter Okonkwo",
                      action: "joined the group",
                      amount: null,
                      date: "1 week ago",
                    },
                  ].map((activity, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 bg-zinc-50 rounded-lg border border-zinc-100"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        <div>
                          <p className="text-sm font-semibold text-zinc-900">
                            {activity.user} {activity.action}
                          </p>
                          <p className="text-xs text-zinc-500">{activity.date}</p>
                        </div>
                      </div>
                      {activity.amount && <p className="font-bold text-zinc-900">{activity.amount}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Messages Tab */}
            {activeTab === "messages" && (
              <div className="bg-white rounded-xl border border-zinc-200 p-6">
                <h3 className="text-lg font-bold text-zinc-900 mb-6">Group Messages</h3>
                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                  {[
                    {
                      user: "Admin",
                      message: "Welcome to our group! Please make regular contributions.",
                      date: "Today 10:00 AM",
                    },
                    {
                      user: "John Doe",
                      message: "Thanks! Looking forward to reaching our savings goal.",
                      date: "Today 10:30 AM",
                    },
                    { user: "Jane Smith", message: "When is the next payout?", date: "Today 11:00 AM" },
                    {
                      user: "Admin",
                      message: "Payout is scheduled for March 15, 2025. Keep saving!",
                      date: "Today 11:15 AM",
                    },
                  ].map((msg, idx) => (
                    <div key={idx} className="flex gap-3 p-3 bg-zinc-50 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {msg.user.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-zinc-900">{msg.user}</p>
                        <p className="text-sm text-zinc-700 break-words">{msg.message}</p>
                        <p className="text-xs text-zinc-500 mt-1">{msg.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-red-600"
                  />
                  <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Payment Method Modal */}
      {showPaymentMethodModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-zinc-900 mb-4">Save to Group</h3>
            <p className="text-sm text-zinc-600 mb-6">
              Select payment method to save {formatXAF(groupData.contributionAmount)}
            </p>

            <div className="space-y-3 mb-6">
              <Button
                onClick={() => {
                  setSelectedPaymentMethod("account")
                  setShowPaymentDetails(true)
                }}
                className="w-full justify-start bg-white border-2 border-red-600 text-zinc-900 hover:bg-red-50 h-12"
              >
                <DollarSign className="w-5 h-5 mr-3 text-red-600" />
                Main Account Balance
              </Button>
              <Button
                onClick={() => {
                  setSelectedPaymentMethod("mtn")
                  setShowPaymentDetails(true)
                }}
                className="w-full justify-start bg-white border-2 border-yellow-500 text-zinc-900 hover:bg-yellow-50 h-12"
              >
                <Phone className="w-5 h-5 mr-3 text-yellow-500" />
                MTN Mobile Money
              </Button>
              <Button
                onClick={() => {
                  setSelectedPaymentMethod("orange")
                  setShowPaymentDetails(true)
                }}
                className="w-full justify-start bg-white border-2 border-orange-600 text-zinc-900 hover:bg-orange-50 h-12"
              >
                <Phone className="w-5 h-5 mr-3 text-orange-600" />
                Orange Money
              </Button>
              <Button
                onClick={() => {
                  setSelectedPaymentMethod("card")
                  setShowPaymentDetails(true)
                }}
                className="w-full justify-start bg-white border-2 border-blue-600 text-zinc-900 hover:bg-blue-50 h-12"
              >
                <CreditCard className="w-5 h-5 mr-3 text-blue-600" />
                Credit Card
              </Button>
            </div>

            <Button onClick={() => setShowPaymentMethodModal(false)} variant="outline" className="w-full">
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Payment Details Modal */}
      {showPaymentDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-zinc-900 mb-4">
              {selectedPaymentMethod === "account"
                ? "Save from Account"
                : selectedPaymentMethod === "mtn"
                  ? "MTN Mobile Money"
                  : selectedPaymentMethod === "orange"
                    ? "Orange Money"
                    : "Credit Card"}
            </h3>

            <div className="space-y-4">
              {selectedPaymentMethod === "account" && (
                <>
                  <div>
                    <label className="text-sm font-semibold text-zinc-700 block mb-2">Amount (XAF)</label>
                    <input
                      type="number"
                      value={contributionAmount}
                      onChange={(e) => setContributionAmount(e.target.value)}
                      // placeholder={groupData.contributionAmount}
                      className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-red-600"
                    />
                  </div>
                  <p className="text-xs text-zinc-500">Current Balance: {formatXAF(250000)}</p>
                </>
              )}

              {(selectedPaymentMethod === "mtn" || selectedPaymentMethod === "orange") && (
                <>
                  <div>
                    <label className="text-sm font-semibold text-zinc-700 block mb-2">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+237 XXX XXX XXX"
                      className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-red-600"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-zinc-700 block mb-2">Amount (XAF)</label>
                    <input
                      type="number"
                      value={contributionAmount}
                      onChange={(e) => setContributionAmount(e.target.value)}
                      // placeholder={groupData.contributionAmount}
                      className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-red-600"
                    />
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-xs text-blue-800">
                      You will receive a prompt on your phone to authorize this transaction.
                    </p>
                  </div>
                </>
              )}

              {selectedPaymentMethod === "card" && (
                <>
                  <div>
                    <label className="text-sm font-semibold text-zinc-700 block mb-2">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      // maxLength="19"
                      className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-red-600"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-semibold text-zinc-700 block mb-2">Expiry</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-red-600"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-zinc-700 block mb-2">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        // maxLength="3"
                        className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-red-600"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-zinc-700 block mb-2">Amount (XAF)</label>
                    <input
                      type="number"
                      value={contributionAmount}
                      onChange={(e) => setContributionAmount(e.target.value)}
                      // placeholder={groupData.contributionAmount}
                      className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-red-600"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                onClick={() => {
                  setShowPaymentDetails(false)
                  setShowPaymentMethodModal(true)
                  setContributionAmount("")
                }}
                variant="outline"
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={handleContribution}
                className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Withdrawal Modal */}
      {showWithdrawalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-zinc-900 mb-4">Request Withdrawal</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-zinc-700 block mb-2">Amount (XAF)</label>
                <input
                  type="number"
                  value={withdrawalRequest}
                  onChange={(e) => setWithdrawalRequest(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-red-600"
                />
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-xs text-yellow-800">
                  Withdrawals require admin approval. You will be notified once processed.
                </p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button
                onClick={() => {
                  setShowWithdrawalModal(false)
                  setWithdrawalRequest("")
                }}
                variant="outline"
                className="flex-1 bg-transparent border-zinc-200"
              >
                Cancel
              </Button>
              <Button
                onClick={handleWithdrawalRequest}
                className="flex-1 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white"
              >
                Request
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-zinc-900 mb-2">Success!</h3>
            <p className="text-zinc-600 mb-6">{successMessage}</p>
            <Button
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
            >
              Close
            </Button>
          </div>
        </div>
      )}

      {/* Payout Info Modal */}
      {showPayoutInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-zinc-900 mb-4">Payout Information</h3>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-zinc-600 mb-2">Next Payout Date</p>
                <p className="text-3xl font-bold text-red-600">March 15, 2025</p>
              </div>
              <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-4">
                <p className="text-sm text-zinc-600 mb-2">Expected in Account</p>
                <p className="text-lg font-bold text-zinc-900">{formatXAF(1500000)}</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-800">
                  All group savings will be transferred directly to your main account on the payout date.
                </p>
              </div>
            </div>
            <Button
              onClick={() => setShowPayoutInfo(false)}
              className="w-full mt-6 bg-gradient-to-r from-red-600 to-red-700 text-white"
            >
              Close
            </Button>
          </div>
        </div>
      )}

      {/* Message Admin Modal */}
      {showMessageAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-zinc-900 mb-4">Message Admin</h3>
            <p className="text-sm text-zinc-600 mb-4">Request early payout or ask questions about the group</p>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-zinc-700 block mb-2">Subject</label>
                <select className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-red-600">
                  <option>Request Early Payout</option>
                  <option>Question about Group</option>
                  <option>Other Issue</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-zinc-700 block mb-2">Message</label>
                <textarea
                  placeholder="Write your message..."
                  className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-red-600 min-h-24 resize-none"
                ></textarea>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button onClick={() => setShowMessageAdmin(false)} variant="outline" className="flex-1">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setShowMessageAdmin(false)
                  alert("Message sent to admin!")
                }}
                className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white"
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Leave Group Modal */}
      {showLeaveGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-zinc-900 mb-4">Leave Group?</h3>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-yellow-800">
                Your savings will be held in escrow until the admin releases them on the payout date. You will still
                receive your share.
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-zinc-600">
                Current Savings: <span className="font-bold text-zinc-900">{formatXAF(200000)}</span>
              </p>
              <p className="text-sm text-zinc-600">
                Will be released: <span className="font-bold text-red-600">March 15, 2025</span>
              </p>
            </div>

            <div className="flex gap-3 mt-6">
              <Button onClick={() => setShowLeaveGroup(false)} variant="outline" className="flex-1">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setShowLeaveGroup(false)
                  alert("You have left the group. Your savings will be released on the payout date.")
                }}
                className="flex-1 bg-gradient-to-r from-orange-600 to-orange-700 text-white"
              >
                Confirm Leave
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
