"use client"

import type React from "react"
import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import {
  Shield,
  LogOut,
  Home,
  Users,
  TrendingUp,
  Plus,
  Menu,
  FileText,
  Bell,
  DollarSignIcon,
  HelpCircle,
  Settings,
  ChevronDown,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { UserButton, useUser } from "@clerk/nextjs"
import Link from "next/link"
import { useClerk } from "@clerk/nextjs"

interface DashboardLayoutProps {
  children: React.ReactNode
  currentBalance?: number
}

export function DashboardLayout({
  children,
  currentBalance = 12450.5,
}: DashboardLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { user } = useUser()
  const { signOut } = useClerk()

  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)

  const [notifications, setNotifications] = useState([
    { id: 1, message: "Welcome to CSTrustFunds! Complete your KYC verification.", time: "2 mins ago" },
    { id: 2, message: "Your savings goal 'Emergency Fund' reached 50% progress!", time: "1 hour ago" },
    { id: 3, message: "New member joined your savings group.", time: "3 hours ago" },
  ])

  const routeToMenuLabel: Record<string, string> = {
    // "/verify-kyc": "Dashboard",
    // "/my-savings": "My Savings",
    // "/savings-groups": "Savings Groups",
    // "/transactions": "Transactions",
    // "/notifications": "Notifications",
    // "/create-savings-plan": "Create Savings Plan",
    // "/join-savings-group": "Join Savings Group",
    // "/ai-smartsave": "AI SmartSave",
    // "/kyc-verification": "KYC Verification",
    // "/settings": "Settings",
    // "/help-support": "Help & Support",
    "/verify-kyc": "Dashboard",
    "/dashboard/savings": "My Savings",
    "/dashboard/groups": "Savings Groups",
    "/dashboard/transactions": "Transactions",
    "/dashboard/notifications": "Notifications",
    "/dashboard/create-savings-plan": "Create Savings Plan",
    "/dashboard/jgroups": "Join Savings Group",
    "/dashboard/withdraw": "Withdraw Funds",
    "/dashboard/ai-smartsave": "AI SmartSave",
    "/dashboard/kyc-verification": "KYC Verification",
    "/dashboard/settings": "Settings",
    "/dashboard/help-support": "Help & Support",
  }

  const currentMenuLabel = routeToMenuLabel[pathname] || "Dashboard"

  const menuItems = [
    {
      section: "MAIN",
      items: [
        { label: "Dashboard", icon: Home, route: "/verify-kyc" },
        { label: "My Savings", icon: TrendingUp, route: "/dashboard/savings" },
        { label: "Savings Groups", icon: Users, route: "/dashboard/groups" },
        { label: "Transactions", icon: FileText, route: "/dashboard/transactions" },
        { label: "Notifications", icon: Bell, route: "/dashboard/notifications" },
      ],
    },
    {
      section: "ACTIONS",
      items: [
        { label: "Create Savings Plan", icon: Plus, route: "/dashboard/create-savings-plan" },
        { label: "Join Savings Group", icon: Users, route: "/dashboard/groups" },
        { label: "Withdraw Funds", icon: DollarSignIcon, route: "/dashboard/withdraw" },
      ],
    },
    {
      section: "ACCOUNT",
      items: [
        { label: "KYC Verification", icon: Shield, route: "/dashboard/kyc-verification" },
        { label: "Settings", icon: Settings, route: "/dashboard/settings" },
        { label: "Help & Support", icon: HelpCircle, route: "/dashboard/help-support" },
      ],
    },
  ]

  const dismissNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <div className="min-h-screen bg-zinc-50 relative">
      {/* ================= SIDEBAR (DESKTOP) ================= */}
      <aside
        className={`hidden md:flex fixed inset-y-0 left-0 bg-white border-r border-zinc-200 flex-col
        transition-[width] duration-300 ease-in-out will-change-[width] z-40
        ${sidebarOpen ? "w-64" : "w-20"}`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-zinc-200">
          <button onClick={() => router.push("/verify-kyc")}>
            {sidebarOpen ? (
              <img src="/images/20251229-103148.png" className="w-full" />
            ) : (
              <img src="/images/cs-logo-icon.png" className="w-10 h-10" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          {menuItems.map((section) => (
            <div key={section.section} className="mb-6">
              {sidebarOpen && (
                <p className="px-4 py-2 text-xs font-bold text-zinc-400">
                  {section.section}
                </p>
              )}
              {section.items.map((item) => {
                const Icon = item.icon
                const isActive = currentMenuLabel === item.label
                return (
                  <button
                    key={item.label}
                    onClick={() => router.push(item.route)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                    ${isActive ? "bg-red-50 text-red-600 font-semibold" : "text-zinc-600 hover:bg-zinc-100"}`}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    {sidebarOpen && item.label}
                  </button>
                )
              })}
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-zinc-200">
          <button
            onClick={() => signOut()}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 text-zinc-600 hover:text-red-600"
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && "Logout"}
          </button>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <div
        className="hidden md:flex flex-col min-h-screen transition-[margin-left] duration-300 ease-in-out"
        style={{ marginLeft: sidebarOpen ? "16rem" : "5rem" }}
      >
        {/* Topbar */}
        <header className="sticky top-0 z-30 bg-white border-b border-zinc-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-zinc-100 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setNotificationOpen(!notificationOpen)}
                className="relative p-2 hover:bg-zinc-100 rounded-lg"
              >
                <Bell className="w-5 h-5" />
                {notifications.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full" />
                )}
              </button>

              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 p-2 hover:bg-zinc-100 rounded-lg"
              >
                <UserButton />
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 min-h-0 m-8 overflow-y-auto p-4">
          {children}
        </main>
      </div>

      {/* ================= MOBILE LAYOUT ================= */}
      <div className="md:hidden flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 bg-white border-b px-4 py-3 flex justify-between">
          <button onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
          <img src="/images/20251229-103148.png" className="h-10" />
          <Bell className="w-5 h-5" />
        </header>

        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>

      {/* ================= MOBILE DRAWER ================= */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="fixed left-0 top-0 h-full w-80 bg-white z-50 shadow-xl flex flex-col">
            <div className="p-6 border-b flex justify-between">
              <UserButton />
              <button onClick={() => setMobileMenuOpen(false)}>
                <X />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-4">
              {menuItems.map((section) => (
                <div key={section.section} className="mb-6">
                  <p className="text-xs text-zinc-400 mb-2">{section.section}</p>
                  {section.items.map((item) => {
                    const Icon = item.icon
                    return (
                      <button
                        key={item.label}
                        onClick={() => {
                          router.push(item.route)
                          setMobileMenuOpen(false)
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-zinc-100"
                      >
                        <Icon className="w-5 h-5" />
                        {item.label}
                      </button>
                    )
                  })}
                </div>
              ))}
            </nav>

            <div className="p-4 border-t">
              <button
                onClick={() => signOut()}
                className="w-full flex items-center gap-3 px-4 py-3 bg-red-50 text-red-600 rounded-lg"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </aside>
        </>
      )}
    </div>
  )
}
