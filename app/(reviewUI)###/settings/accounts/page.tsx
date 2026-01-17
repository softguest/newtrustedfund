"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
// import { useAuth } from "@/lib/auth-context"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Plus, ArrowLeft, LogOut } from "lucide-react"
import { useUser } from "@clerk/nextjs"

export const dynamic = "force-dynamic"

export default function AccountsSettingsPage() {
  const router = useRouter()
  // const { user, logout, switchAccount } = useAuth()
  const {user} = useUser();
  const [subProfiles, setSubProfiles] = useState<any[]>([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newAccount, setNewAccount] = useState({ name: "", type: "child" })
  const [currentProfile, setCurrentProfile] = useState("main")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cstrustfunds_sub_profiles")
      if (saved) setSubProfiles(JSON.parse(saved))
    }
  }, [])

  const handleCreateAccount = () => {
    if (newAccount.name.trim()) {
      const account = {
        id: `acc-${Date.now()}`,
        name: newAccount.name,
        type: newAccount.type,
        createdAt: new Date().toISOString(),
      }
      const updated = [...subProfiles, account]
      setSubProfiles(updated)
      if (typeof window !== "undefined") {
        localStorage.setItem("cstrustfunds_sub_profiles", JSON.stringify(updated))
        window.dispatchEvent(new Event("storage"))
      }
      setNewAccount({ name: "", type: "child" })
      setShowCreateModal(false)
    }
  }

  const handleSwitchProfile = (profileId: string) => {
    setCurrentProfile(profileId)
    // switchAccount(profileId)
    localStorage.setItem("cstrustfunds_current_account", profileId)
    window.dispatchEvent(new Event("storage"))
  }

  // const handleCreateNewAccount = () => {
  //   logout()
  //   router.push("/signup")
  // }

  // const handleLogout = () => {
  //   logout()
  //   router.push("/")
  // }

  return (
    <DashboardLayout>
      <div className="max-w-2xl space-y-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Settings
        </button>

        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Accounts & Profiles</h1>
          <p className="text-zinc-600 mt-2">Manage your accounts and sub-profiles</p>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-zinc-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-zinc-900">Your Accounts</h2>
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-semibold"
              >
                <Plus className="w-4 h-4" />
                Create Account
              </button>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => handleSwitchProfile("main")}
                className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                  currentProfile === "main" ? "border-red-600 bg-red-50" : "border-zinc-200 hover:border-red-300"
                }`}
              >
                <div className="font-bold text-zinc-900">
                  {/* {user?.name} */}
                  </div>
                <div className="text-xs text-zinc-500">Main Account 
                  {/* (ID: {user?.userId}) */}
                  </div>
              </button>

              {subProfiles.map((profile) => (
                <button
                  key={profile.id}
                  onClick={() => handleSwitchProfile(profile.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                    currentProfile === profile.id ? "border-red-600 bg-red-50" : "border-zinc-200 hover:border-red-300"
                  }`}
                >
                  <div className="font-bold text-zinc-900">{profile.name}</div>
                  <div className="text-xs text-zinc-500">
                    {profile.type} • Created {new Date(profile.createdAt).toLocaleDateString()}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-zinc-200 p-6 space-y-3">
            <h2 className="text-lg font-bold text-zinc-900">Account Actions</h2>
            <Button
              // onClick={handleCreateNewAccount}
              variant="outline"
              className="w-full border-2 border-zinc-200 hover:border-red-300 bg-transparent"
            >
              Create New Main Account
            </Button>
            <Button
              // onClick={handleLogout}
              className="w-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Create Account Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full space-y-4">
              <h3 className="text-lg font-bold text-zinc-900">Create New Account</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Account Name"
                  value={newAccount.name}
                  onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
                  className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-red-600"
                />
                <select
                  value={newAccount.type}
                  onChange={(e) => setNewAccount({ ...newAccount, type: e.target.value })}
                  className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-red-600"
                >
                  <option value="child">Child Account</option>
                  <option value="partner">Partner Account</option>
                  <option value="business">Business Account</option>
                  <option value="investment">Investment Account</option>
                  <option value="loan">Loan Account</option>
                </select>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-all font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateAccount}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-semibold"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
