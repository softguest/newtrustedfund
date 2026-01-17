"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { ArrowLeft } from "lucide-react"

export const dynamic = "force-dynamic"

export default function NotificationsSettingsPage() {
  const router = useRouter()
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
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
          <h1 className="text-3xl font-bold text-zinc-900">Notifications</h1>
          <p className="text-zinc-600 mt-2">Manage your notification preferences</p>
        </div>

        <div className="bg-white rounded-xl border border-zinc-200 p-8 space-y-4">
          <label className="flex items-center gap-4 p-4 border border-zinc-200 rounded-lg hover:bg-zinc-50 cursor-pointer transition-all">
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) => handleSettingsChange("emailNotifications", e.target.checked)}
              className="w-5 h-5 accent-red-600 rounded"
            />
            <div className="flex-1">
              <div className="font-bold text-zinc-900">Email Notifications</div>
              <p className="text-sm text-zinc-600">Receive important updates via email</p>
            </div>
          </label>
          <label className="flex items-center gap-4 p-4 border border-zinc-200 rounded-lg hover:bg-zinc-50 cursor-pointer transition-all">
            <input
              type="checkbox"
              checked={settings.pushNotifications}
              onChange={(e) => handleSettingsChange("pushNotifications", e.target.checked)}
              className="w-5 h-5 accent-red-600 rounded"
            />
            <div className="flex-1">
              <div className="font-bold text-zinc-900">Push Notifications</div>
              <p className="text-sm text-zinc-600">Receive alerts on your device</p>
            </div>
          </label>
          <label className="flex items-center gap-4 p-4 border border-zinc-200 rounded-lg hover:bg-zinc-50 cursor-pointer transition-all">
            <input
              type="checkbox"
              checked={settings.smsNotifications}
              onChange={(e) => handleSettingsChange("smsNotifications", e.target.checked)}
              className="w-5 h-5 accent-red-600 rounded"
            />
            <div className="flex-1">
              <div className="font-bold text-zinc-900">SMS Notifications</div>
              <p className="text-sm text-zinc-600">Get important updates via SMS</p>
            </div>
          </label>
        </div>
      </div>
    </DashboardLayout>
  )
}
