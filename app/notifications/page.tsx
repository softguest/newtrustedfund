"use client"

export const dynamic = "force-dynamic"

import { useState } from "react"
import { useRouter } from "next/navigation"
// import { useAuth } from "@/lib/auth-context"
import { DashboardLayout } from "@/components/dashboard-layout"
import { XAF } from "@/lib/currency"
import { X, Check, Bell } from "lucide-react"

export default function NotificationsPage() {
  const router = useRouter()
  // const { user, isLoading } = useAuth()

  const [selectedNotification, setSelectedNotification] = useState<number | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [depositAmount, setDepositAmount] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [joinGroupConfirm, setJoinGroupConfirm] = useState(false)

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Deposit Successful",
      message: "Your deposit of 50,000 XAF has been processed",
      time: "2 hours ago",
      type: "success",
      actionType: null,
    },
    {
      id: 2,
      title: "Group Invitation",
      message: "You've been invited to join 'Wedding Fund Group'",
      time: "5 hours ago",
      type: "info",
      actionType: "join_group",
      groupName: "Wedding Fund Group",
      groupId: "grp_001",
    },
    {
      id: 3,
      title: "Contribution Reminder",
      message: "Your weekly contribution of 5,000 XAF is due tomorrow",
      time: "1 day ago",
      type: "warning",
      actionType: "make_deposit",
      groupName: "School Fund",
      amount: 5000,
    },
    {
      id: 4,
      title: "Goal Milestone",
      message: "You've reached 50% of your School Fund goal!",
      time: "2 days ago",
      type: "success",
      actionType: "view_details",
    },
    {
      id: 5,
      title: "New Recommendation",
      message: "AI SmartSave suggests increasing your daily contribution",
      time: "3 days ago",
      type: "info",
      actionType: null,
    },
  ])

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

  const handleNotificationAction = (notif: any) => {
    setSelectedNotification(notif.id)
    if (notif.actionType === "join_group") {
      setJoinGroupConfirm(true)
    } else if (notif.actionType === "make_deposit") {
      setShowModal(true)
      setDepositAmount(notif.amount?.toString() || "")
    } else if (notif.actionType === "view_details") {
      router.push("/my-savings")
    }
  }

  const handleJoinGroup = () => {
    const notif = notifications.find((n) => n.id === selectedNotification)
    setSuccessMessage(`Successfully joined ${notif?.groupName}!`)
    // setNotifications(
    //   notifications.map((n) =>
    //     n.id === selectedNotification
    //       ? { ...n, actionType: null, type: "success", message: `You are now a member of ${n.groupName}` }
    //       : n,
    //   ),
    // )
    setJoinGroupConfirm(false)
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const handleMakeDeposit = () => {
    if (!depositAmount || Number.parseFloat(depositAmount) <= 0) {
      alert("Please enter a valid amount")
      return
    }
    const notif = notifications.find((n) => n.id === selectedNotification)
    setSuccessMessage(`Deposit of ${XAF(Number.parseFloat(depositAmount))} to ${notif?.groupName} completed!`)
    // setNotifications(
    //   notifications.map((n) =>
    //     n.id === selectedNotification
    //       ? {
    //           ...n,
    //           actionType: null,
    //           type: "success",
    //           message: `Deposit of ${XAF(Number.parseFloat(depositAmount))} completed`,
    //         }
    //       : n,
    //   ),
    // )
    setShowModal(false)
    setDepositAmount("")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const removeNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8 space-y-4 md:space-y-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-900">Notifications</h2>
          <p className="text-sm md:text-base text-zinc-600 mt-1 md:mt-2">Stay updated with your savings journey</p>
        </div>

        {successMessage && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 md:p-4 flex items-start gap-3">
            <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-green-900">{successMessage}</p>
            </div>
          </div>
        )}

        {notifications.length === 0 ? (
          <div className="bg-white rounded-xl border border-zinc-200 p-8 md:p-12 text-center">
            <Bell className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
            <p className="text-zinc-600">No notifications at this time</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`bg-white rounded-lg border p-3 md:p-4 flex items-start justify-between ${
                  notif.type === "success"
                    ? "border-green-200 bg-green-50"
                    : notif.type === "warning"
                      ? "border-amber-200 bg-amber-50"
                      : "border-blue-200 bg-blue-50"
                }`}
              >
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-zinc-900 truncate">{notif.title}</h4>
                  <p className="text-sm text-zinc-600 mt-1 leading-relaxed">{notif.message}</p>
                  <p className="text-xs text-zinc-500 mt-2">{notif.time}</p>

                  {notif.actionType && (
                    <div className="flex gap-2 mt-3">
                      {notif.actionType === "join_group" && (
                        <button
                          onClick={() => handleNotificationAction(notif)}
                          className="px-3 md:px-4 py-2 bg-red-600 text-white text-xs md:text-sm rounded-lg hover:bg-red-700 transition-colors font-medium"
                        >
                          Join Group
                        </button>
                      )}
                      {notif.actionType === "make_deposit" && (
                        <button
                          onClick={() => handleNotificationAction(notif)}
                          className="px-3 md:px-4 py-2 bg-red-600 text-white text-xs md:text-sm rounded-lg hover:bg-red-700 transition-colors font-medium"
                        >
                          Make Deposit
                        </button>
                      )}
                      {notif.actionType === "view_details" && (
                        <button
                          onClick={() => handleNotificationAction(notif)}
                          className="px-3 md:px-4 py-2 bg-red-600 text-white text-xs md:text-sm rounded-lg hover:bg-red-700 transition-colors font-medium"
                        >
                          View Details
                        </button>
                      )}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => removeNotification(notif.id)}
                  className="ml-2 md:ml-4 p-1 hover:bg-white rounded transition-colors flex-shrink-0"
                >
                  <X className="w-4 h-4 text-zinc-400" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Join Group Confirmation Modal */}
      {joinGroupConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 md:p-6 max-w-md w-full mx-4 space-y-4">
            <h3 className="text-lg font-bold text-zinc-900">Join Savings Group</h3>
            <p className="text-sm md:text-base text-zinc-600">
              Are you sure you want to join {notifications.find((n) => n.id === selectedNotification)?.groupName}?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setJoinGroupConfirm(false)}
                className="flex-1 px-4 py-2 text-sm md:text-base border border-zinc-300 text-zinc-700 rounded-lg hover:bg-zinc-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleJoinGroup}
                className="flex-1 px-4 py-2 text-sm md:text-base bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Join Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Deposit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 md:p-6 max-w-md w-full mx-4 space-y-4">
            <h3 className="text-lg font-bold text-zinc-900">Make Deposit</h3>
            <p className="text-sm text-zinc-600">
              Deposit to {notifications.find((n) => n.id === selectedNotification)?.groupName}
            </p>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700">Amount (XAF)</label>
              <input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none text-base"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowModal(false)
                  setDepositAmount("")
                }}
                className="flex-1 px-4 py-2 text-sm md:text-base border border-zinc-300 text-zinc-700 rounded-lg hover:bg-zinc-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleMakeDeposit}
                className="flex-1 px-4 py-2 text-sm md:text-base bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Confirm Deposit
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
