"use client"

export const dynamic = "force-dynamic"

import { useState } from "react"
import { useRouter } from "next/navigation"
// import { useAuth } from "@/lib/auth-context"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { UserPlus, Link2, Copy, Check, DollarSign, Phone, CreditCard } from "lucide-react"
import { useUser } from "@clerk/nextjs"

export default function SavingsGroupsPage() {
  const router = useRouter()
  // const { user, isLoading } = useAuth()
  const {user} = useUser();
  const [showJoinModal, setShowJoinModal] = useState(false)
  const [showPaymentMethodModal, setShowPaymentMethodModal] = useState(false)
  const [showPaymentDetails, setShowPaymentDetails] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("")
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)
  const [selectedGroupForContribution, setSelectedGroupForContribution] = useState(null)
  const [contributionAmount, setContributionAmount] = useState("")

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

  const savingsGroups = [
    {
      id: 1,
      name: "School Fees Fund",
      description: "Collective savings for children's education",
      members: 12,
      frequency: "Weekly",
      status: "active",
      myRole: "Member",
    },
    {
      id: 2,
      name: "Home Fund Group",
      description: "Building a dream home together",
      members: 8,
      frequency: "Bi-weekly",
      status: "active",
      myRole: "Admin",
    },
    {
      id: 3,
      name: "Emergency Fund Collective",
      description: "Supporting each other in emergencies",
      members: 15,
      frequency: "Monthly",
      status: "active",
      myRole: "Member",
    },
  ]

  const availableGroups = [
    {
      id: 101,
      name: "Wedding Fund Group",
      description: "Planning beautiful celebrations",
      members: 5,
      frequency: "Monthly",
    },
    {
      id: 102,
      name: "Business Startup Fund",
      description: "Supporting entrepreneurs",
      members: 7,
      frequency: "Weekly",
    },
    {
      id: 103,
      name: "Healthcare Emergency Fund",
      description: "Medical expenses support",
      members: 10,
      frequency: "Bi-weekly",
    },
  ]

  // const generateInviteLink = (groupId) => {
  //   return `${window.location.origin}/join-group/${groupId}?invite=${Math.random().toString(36).substr(2, 9)}`
  // }

  // const copyToClipboard = (text) => {
  //   navigator.clipboard.writeText(text)
  //   setCopiedLink(true)
  //   setTimeout(() => setCopiedLink(false), 2000)
  // }

  // const handleSaveNow = (group) => {
  //   setSelectedGroupForContribution(group)
  //   setShowPaymentMethodModal(true)
  // }

  // const handlePaymentMethodSelect = (method) => {
  //   setSelectedPaymentMethod(method)
  //   setShowPaymentDetails(true)
  // }

  // const handleContribution = () => {
  //   if (!contributionAmount || Number.parseFloat(contributionAmount) <= 0) {
  //     alert("Please enter a valid amount")
  //     return
  //   }
  //   alert(`Contribution of ${contributionAmount} XAF recorded successfully for ${selectedGroupForContribution.name}!`)
  //   setShowPaymentDetails(false)
  //   setShowPaymentMethodModal(false)
  //   setContributionAmount("")
  //   setSelectedGroupForContribution(null)
  // }

  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-zinc-900">My Savings Groups</h2>
            <p className="text-zinc-600 mt-2">Manage and participate in group savings</p>
          </div>
          <Button
            onClick={() => router.push("/create-savings-group")}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
          >
            Create Group
          </Button>
        </div>

        {/* My Groups */}
        <div>
          <h3 className="text-xl font-bold text-zinc-900 mb-6">Active Groups</h3>
          <div className="space-y-4">
            {savingsGroups.map((group) => (
              <div
                key={group.id}
                className="bg-white rounded-xl border border-zinc-200 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-zinc-900">{group.name}</h4>
                    <p className="text-sm text-zinc-500 mt-1">{group.description}</p>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700">
                    {group.myRole}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-zinc-500">Members</p>
                    <p className="text-lg font-bold text-zinc-900">{group.members}</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500">Frequency</p>
                    <p className="text-lg font-bold text-zinc-900">{group.frequency}</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500">Status</p>
                    <p className="text-lg font-bold text-green-600">Active</p>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Button
                    onClick={() => router.push(`/group-details/${group.id}`)}
                    variant="outline"
                    className="text-xs border-zinc-200 hover:bg-zinc-50 bg-transparent"
                  >
                    View Details
                  </Button>
                  <Button
                    // onClick={() => handleSaveNow(group)}
                    className="text-xs bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
                  >
                    Save Now
                  </Button>
                  <Button
                    onClick={() => setShowInviteModal(true)}
                    variant="outline"
                    className="text-xs border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    <Link2 className="w-3 h-3 mr-1" />
                    Share Link
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Available Groups */}
        <div>
          <h3 className="text-xl font-bold text-zinc-900 mb-6">Available Groups to Join</h3>
          <div className="space-y-4">
            {availableGroups.map((group) => (
              <div
                key={group.id}
                className="bg-white rounded-xl border border-zinc-200 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-zinc-900">{group.name}</h4>
                    <p className="text-sm text-zinc-500 mt-1">{group.description}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-zinc-500">Members</p>
                    <p className="text-lg font-bold text-zinc-900">{group.members}</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500">Frequency</p>
                    <p className="text-lg font-bold text-zinc-900">{group.frequency}</p>
                  </div>
                </div>
                <Button
                  onClick={() => setShowJoinModal(true)}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white w-full"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Request to Join
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Invite Link Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-zinc-900 mb-4">Share Group Invite Link</h3>
            <p className="text-sm text-zinc-600 mb-4">Share this link to invite others to join the group:</p>

            <div className="bg-zinc-50 rounded-lg p-4 mb-4 flex items-center justify-between">
              <input
                type="text"
                readOnly
                // value={generateInviteLink(1)}
                className="flex-1 bg-transparent text-xs text-zinc-700 truncate"
              />
              <Button 
              // onClick={() => copyToClipboard(generateInviteLink(1))} 
              variant="ghost" 
              className="ml-2">
                {copiedLink ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>

            <p className="text-xs text-zinc-500 mb-4">
              Registered members can join directly. Non-registered members will be prompted to create an account first.
            </p>

            <Button
              onClick={() => setShowInviteModal(false)}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
            >
              Close
            </Button>
          </div>
        </div>
      )}

      {/* Payment Method Modal */}
      {showPaymentMethodModal && selectedGroupForContribution && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-zinc-900 mb-4">Save to Group</h3>
            <p className="text-sm text-zinc-600 mb-6">
              Select payment method for 
              {/* {selectedGroupForContribution.name} */}
              </p>

            <div className="space-y-3 mb-6">
              <Button
                // onClick={() => handlePaymentMethodSelect("account")}
                className="w-full justify-start bg-white border-2 border-red-600 text-zinc-900 hover:bg-red-50 h-12"
              >
                <DollarSign className="w-5 h-5 mr-3 text-red-600" />
                Main Account Balance
              </Button>
              <Button
                // onClick={() => handlePaymentMethodSelect("mtn")}
                className="w-full justify-start bg-white border-2 border-yellow-500 text-zinc-900 hover:bg-yellow-50 h-12"
              >
                <Phone className="w-5 h-5 mr-3 text-yellow-500" />
                MTN Mobile Money
              </Button>
              <Button
                // onClick={() => handlePaymentMethodSelect("orange")}
                className="w-full justify-start bg-white border-2 border-orange-600 text-zinc-900 hover:bg-orange-50 h-12"
              >
                <Phone className="w-5 h-5 mr-3 text-orange-600" />
                Orange Money
              </Button>
              <Button
                // onClick={() => handlePaymentMethodSelect("card")}
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
      {showPaymentDetails && selectedPaymentMethod && (
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
                      placeholder="Enter amount"
                      className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-red-600"
                    />
                  </div>
                  <p className="text-xs text-zinc-500">Current Balance: 250,000 XAF</p>
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
                      placeholder="Enter amount"
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
                      placeholder="Enter amount"
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
                // onClick={handleContribution}
                className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Join Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-zinc-900 mb-4">Request to Join Group</h3>
            <p className="text-zinc-600 mb-6">
              Your request has been submitted. The group admin will review and approve your membership soon.
            </p>
            <Button
              onClick={() => setShowJoinModal(false)}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
