"use client"
import { useRouter } from "next/navigation"
// import { useAuth } from "@/lib/auth-context"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Upload, Bell, Lock, Eye, Smartphone, HelpCircle, ChevronRight } from "lucide-react"
import { useUser } from "@clerk/nextjs"

export const dynamic = "force-dynamic"

export default function SettingsPage() {
  const router = useRouter()
  const { user } = useUser()

  const settingsMenu = [
    {
      id: "profile",
      icon: Upload,
      label: "Edit Profile",
      description: "Update your personal information",
      path: "/settings/profile",
    },
    {
      id: "notifications",
      icon: Bell,
      label: "Notifications",
      description: "Manage notification preferences",
      path: "/settings/notifications",
    },
    {
      id: "security",
      icon: Lock,
      label: "Security & Privacy",
      description: "Change password, two-factor auth",
      path: "/settings/security",
    },
    {
      id: "display",
      icon: Eye,
      label: "Display Settings",
      description: "Theme, language, and appearance",
      path: "/settings/display",
    },
    {
      id: "accounts",
      icon: Smartphone,
      label: "Accounts & Profiles",
      description: "Manage accounts and sub-profiles",
      path: "/settings/accounts",
    },
    {
      id: "help",
      icon: HelpCircle,
      label: "Help & Support",
      description: "Get help and support",
      path: "/help-support",
    },
  ]

  // if (isLoading || !user) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
  //     </div>
  //   )
  // }

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8">
        <div className="max-w-4xl space-y-4 md:space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-zinc-900">Settings</h1>
            <p className="text-sm md:text-base text-zinc-600 mt-1 md:mt-2">Manage your account and preferences</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {settingsMenu.map((item) => (
              <button
                key={item.id}
                onClick={() => router.push(item.path)}
                className="p-4 rounded-lg border-2 border-zinc-200 bg-white hover:border-red-300 hover:bg-red-50 transition-all text-left"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <item.icon className="w-5 h-5 text-zinc-600 flex-shrink-0" />
                      <h3 className="font-bold text-sm md:text-base text-zinc-900 truncate">{item.label}</h3>
                    </div>
                    <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">{item.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-zinc-400 flex-shrink-0" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
