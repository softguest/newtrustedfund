"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export const dynamic = "force-dynamic"

export default function SecuritySettingsPage() {
  const router = useRouter()
  const [settings, setSettings] = useState({
    twoFactorAuth: false,
    hideBalance: false,
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedSettings = localStorage.getItem("cstrustfunds_settings")
      if (savedSettings) {
        const saved = JSON.parse(savedSettings)
        setSettings({ ...settings, ...saved })
      }
    }
  }, [])

  const handleSettingsChange = (key: string, value: boolean) => {
    const updatedSettings = { ...settings, [key]: value }
    setSettings(updatedSettings)
    if (typeof window !== "undefined") {
      localStorage.setItem("cstrustfunds_settings", JSON.stringify(updatedSettings))
      window.dispatchEvent(new Event("storage"))
    }
  }

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
          <h1 className="text-3xl font-bold text-zinc-900">Security & Privacy</h1>
          <p className="text-zinc-600 mt-2">Manage your account security settings</p>
        </div>

        <div className="bg-white rounded-xl border border-zinc-200 p-8 space-y-4">
          <label className="flex items-center gap-4 p-4 border border-zinc-200 rounded-lg hover:bg-zinc-50 cursor-pointer transition-all">
            <input
              type="checkbox"
              checked={settings.twoFactorAuth}
              onChange={(e) => handleSettingsChange("twoFactorAuth", e.target.checked)}
              className="w-5 h-5 accent-red-600 rounded"
            />
            <div className="flex-1">
              <div className="font-bold text-zinc-900">Two-Factor Authentication</div>
              <p className="text-sm text-zinc-600">Add extra security to your account</p>
            </div>
          </label>
          <label className="flex items-center gap-4 p-4 border border-zinc-200 rounded-lg hover:bg-zinc-50 cursor-pointer transition-all">
            <input
              type="checkbox"
              checked={settings.hideBalance}
              onChange={(e) => handleSettingsChange("hideBalance", e.target.checked)}
              className="w-5 h-5 accent-red-600 rounded"
            />
            <div className="flex-1">
              <div className="font-bold text-zinc-900">Hide Account Balance</div>
              <p className="text-sm text-zinc-600">Hide your balance from the dashboard</p>
            </div>
          </label>
          <Button className="w-full border-2 border-red-600 text-red-600 hover:bg-red-50 bg-transparent mt-4">
            Change Password
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
