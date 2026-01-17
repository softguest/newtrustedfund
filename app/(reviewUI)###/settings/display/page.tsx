"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Moon, Globe, ArrowLeft } from "lucide-react"

export const dynamic = "force-dynamic"

export default function DisplaySettingsPage() {
  const router = useRouter()
  const [settings, setSettings] = useState({
    darkMode: false,
    language: "en",
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

  const handleSettingsChange = (key: string, value: any) => {
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
          <h1 className="text-3xl font-bold text-zinc-900">Display Settings</h1>
          <p className="text-zinc-600 mt-2">Customize how the app looks</p>
        </div>

        <div className="bg-white rounded-xl border border-zinc-200 p-8 space-y-4">
          <label className="flex items-center gap-4 p-4 border border-zinc-200 rounded-lg hover:bg-zinc-50 cursor-pointer transition-all">
            <input
              type="checkbox"
              checked={settings.darkMode}
              onChange={(e) => handleSettingsChange("darkMode", e.target.checked)}
              className="w-5 h-5 accent-red-600 rounded"
            />
            <div className="flex-1">
              <div className="font-bold text-zinc-900 flex items-center gap-2">
                <Moon className="w-4 h-4" />
                Dark Mode
              </div>
              <p className="text-sm text-zinc-600">Enable dark theme</p>
            </div>
          </label>
          <div className="p-4 border border-zinc-200 rounded-lg">
            <label className="block text-sm font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Language
            </label>
            <select
              value={settings.language}
              onChange={(e) => handleSettingsChange("language", e.target.value)}
              className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-red-600"
            >
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="es">Spanish</option>
              <option value="pt">Portuguese</option>
            </select>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
