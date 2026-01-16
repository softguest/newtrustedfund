// "use client"

// import type React from "react"
// import { useEffect, useState } from "react"
// import { useRouter, usePathname } from "next/navigation"
// import {
//   Shield,
//   LogOut,
//   Home,
//   Users,
//   TrendingUp,
//   Plus,
//   Menu,
//   FileText,
//   Bell,
//   HelpCircle,
//   Settings,
//   ChevronDown,
//   X,
// } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { UserButton, useUser } from "@clerk/nextjs"
// import Link from "next/link"
// import { useClerk } from "@clerk/nextjs";


// interface DashboardLayoutProps {
//   children: React.ReactNode
//   currentBalance?: number
// }

// export function DashboardLayout({ children, currentBalance = 12450.5 }: DashboardLayoutProps) {
//   const router = useRouter()
//   const pathname = usePathname()
//   // const { user, logout, currentProfile, updateProfile } = useAuth()
//   const { user } = useUser();
//   const [sidebarOpen, setSidebarOpen] = useState(false)
//   const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
//   const [notificationOpen, setNotificationOpen] = useState(false)
//   // const [displayProfile, setDisplayProfile] = useState(currentProfile)
//   const [displayPicture, setDisplayPicture] = useState<string | null>(null)
//   const [isMounted, setIsMounted] = useState(false)
//   const { signOut } = useClerk();

//   useEffect(() => {
//     setIsMounted(true)
//   }, [])

//   // useEffect(() => {
//   //   if (!isMounted || typeof window === "undefined") return

//   //   const handleProfileUpdate = () => {
//   //     try {
//   //       const saved = localStorage.getItem("cstrustfunds_user_profile")
//   //       if (saved) {
//   //         setDisplayProfile(JSON.parse(saved))
//   //       }
//   //       const picture = localStorage.getItem("cstrustfunds_profile_picture")
//   //       setDisplayPicture(picture)
//   //     } catch (error) {
//   //       console.error("[v0] Error loading profile from localStorage:", error)
//   //     }
//   //   }
//   //   handleProfileUpdate()

//   //   window.addEventListener("storage", handleProfileUpdate)
//   //   return () => window.removeEventListener("storage", handleProfileUpdate)
//   // }, [isMounted])

//   // useEffect(() => {
//   //   if (currentProfile) {
//   //     setDisplayProfile(currentProfile)
//   //   }
//   // }, [currentProfile])

//   const routeToMenuLabel: Record<string, string> = {
//     "/verify-kyc": "Dashboard",
//     "/my-savings": "My Savings",
//     "/savings-groups": "Savings Groups",
//     "/transactions": "Transactions",
//     "/notifications": "Notifications",
//     "/create-savings-plan": "Create Savings Plan",
//     "/join-savings-group": "Join Savings Group",
//     "/ai-smartsave": "AI SmartSave",
//     "/kyc-verification": "KYC Verification",
//     "/settings": "Settings",
//     "/help-support": "Help & Support",
//   }

//   const currentMenuLabel = routeToMenuLabel[pathname] || "Dashboard"

//   const menuItems = [
//     {
//       section: "MAIN",
//       items: [
//         { label: "Dashboard", icon: Home, route: "/verify-kyc" },
//         { label: "My Savings", icon: TrendingUp, route: "/my-savings" },
//         { label: "Savings Groups", icon: Users, route: "/savings-groups" },
//         { label: "Transactions", icon: FileText, route: "/transactions" },
//         { label: "Notifications", icon: Bell, route: "/notifications" },
//       ],
//     },
//     {
//       section: "ACTIONS",
//       items: [
//         { label: "Create Savings Plan", icon: Plus, route: "/create-savings-plan" },
//         { label: "Join Savings Group", icon: Users, route: "/join-savings-group" },
//       ],
//     },
//     {
//       section: "ACCOUNT",
//       items: [
//         { label: "KYC Verification", icon: Shield, route: "/kyc-verification" },
//         { label: "Settings", icon: Settings, route: "/settings" },
//         { label: "Help & Support", icon: HelpCircle, route: "/help-support" },
//       ],
//     },
//   ]

//   const topFiveItems = menuItems[0].items

//   const handleMenuItemClick = (route: string) => {
//     router.push(route)
//     setMobileMenuOpen(false)
//   }

//   const dismissNotification = (id: number) => {
//     setNotifications(notifications.filter((n) => n.id !== id))
//   }

//   const [notifications, setNotifications] = useState([
//     { id: 1, message: "Welcome to CSTrustFunds! Complete your KYC verification.", time: "2 mins ago" },
//     { id: 2, message: "Your savings goal 'Emergency Fund' reached 50% progress!", time: "1 hour ago" },
//     { id: 3, message: "New member joined your savings group.", time: "3 hours ago" },
//   ])

//   const isNewUser =
//     currentBalance === 0 && notifications.length === 1 && notifications[0]?.message.toLowerCase().includes("welcome")

//   // const displayName = displayProfile?.name || user?.name || "User"
//   // const profilePicture = isMounted ? displayProfile?.profilePicture || displayPicture : null

//   return (
//     <div className="min-h-screen bg-zinc-50 flex">
//       <div
//         className={`hidden md:flex ${sidebarOpen ? "w-64" : "w-20"} transition-all duration-300 bg-white border-r border-zinc-200 flex-col fixed h-screen`}
//       >
//         <div className="p-6 border-b border-zinc-200 space-y-4">
//           {sidebarOpen ? (
//             <button
//               onClick={() => router.push("/verify-kyc")}
//               className="mb-4 w-full hover:opacity-80 transition-opacity"
//             >
//               <img src="/images/20251229-103148.png" alt="CSTrustFunds Logo" className="w-full h-auto" />
//             </button>
//           ) : (
//             <button
//               onClick={() => router.push("/verify-kyc")}
//               className="w-10 h-10 flex items-center justify-center hover:opacity-80 transition-opacity"
//             >
//               <img src="/images/cs-logo-icon.png" alt="CS Logo" className="w-full h-full object-contain" />
//             </button>
//           )}

//           {sidebarOpen && (
//             <div className="space-y-3">
//               <button
//                 onClick={() => router.push("/settings/profile")}
//                 className="flex items-center gap-3 w-full hover:bg-zinc-50 p-2 rounded-lg transition-colors"
//               >
//                 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center text-white font-bold text-sm overflow-hidden">
//                   {!user ? (
//                     <Link href="/sign-in">
//                       <button className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700">
//                         Login
//                       </button>
//                     </Link>
//                   ) : (
//                     <div className="flex items-center gap-2">
//                       <UserButton />
//                     </div>
//                   )}
//                 </div>
//                 <div className="flex-1 text-left">
//                   {/* <p className="text-sm font-bold text-zinc-900 truncate">{user?.firstName} {user?.lastName}</p> */}
//                   {/* <p className="text-xs text-zinc-500">{user?.lastName}</p>  */}
//                 </div>
//               </button>
//               <div className="flex gap-2 text-xs">
//                 <Button
//                   onClick={() => router.push("/settings/profile")}
//                   variant="outline"
//                   size="sm"
//                   className="flex-1 h-7 rounded-lg bg-transparent border-zinc-200"
//                 >
//                   Profile
//                 </Button>
//                 <Button
//                   onClick={() => router.push("/settings/accounts")}
//                   variant="outline"
//                   size="sm"
//                   className="flex-1 h-7 rounded-lg bg-red-600 text-white border-red-600 hover:bg-red-700"
//                 >
//                   Accounts
//                 </Button>
//               </div>
//             </div>
//           )}
//         </div>

//         <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
//           {menuItems.map((menuSection) => (
//             <div key={menuSection.section} className="space-y-1">
//               {sidebarOpen && (
//                 <p className="text-xs font-bold text-zinc-400 px-4 py-2 uppercase tracking-wide">
//                   {menuSection.section}
//                 </p>
//               )}
//               {menuSection.items.map((item) => {
//                 const Icon = item.icon
//                 const isActive = currentMenuLabel === item.label
//                 return (
//                   <button
//                     key={item.label}
//                     onClick={() => router.push(item.route)}
//                     title={item.label}
//                     className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm relative group ${
//                       isActive ? "bg-red-50 text-red-600 font-semibold" : "text-zinc-600 hover:bg-zinc-100"
//                     }`}
//                   >
//                     <Icon className="w-5 h-5 flex-shrink-0" />
//                     {sidebarOpen && item.label}
//                     {!sidebarOpen && (
//                       <span className="absolute left-full ml-2 px-2 py-1 bg-zinc-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
//                         {item.label}
//                       </span>
//                     )}
//                   </button>
//                 )
//               })}
//             </div>
//           ))}
//         </nav>

//         <div className="border-t border-zinc-200 p-4">
//           <button
//             onClick={() => signOut()}
//             title="Logout"
//             className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-zinc-600 hover:bg-red-50 hover:text-red-600 transition-all text-sm font-medium relative group"
//           >
//             <LogOut className="w-5 h-5 flex-shrink-0" />
//             {sidebarOpen && "Logout"}
//             {!sidebarOpen && (
//               <span className="absolute left-full ml-2 px-2 py-1 bg-zinc-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
//                 Logout
//               </span>
//             )}
//           </button>
//         </div>
//       </div>

//       <div
//         className={`hidden md:flex md:${sidebarOpen ? "ml-64" : "ml-20"} flex-1 flex-col transition-all duration-300 w-full`}
//       >
//         <div className="bg-white border-b border-zinc-200 px-6 py-4 sticky top-0 z-20">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-6">
//               <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-zinc-100 rounded-lg">
//                 <Menu className="w-5 h-5 text-zinc-600" />
//               </button>
//               <div></div>
//             </div>
//             <div className="flex items-center gap-4">
//               <div className="relative">
//                 <button
//                   onClick={() => setNotificationOpen(!notificationOpen)}
//                   className="p-2 hover:bg-zinc-100 rounded-lg relative transition-all"
//                 >
//                   <Bell className="w-5 h-5 text-zinc-600" />
//                   {notifications.length > 0 && (
//                     <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
//                   )}
//                 </button>

//                 {notificationOpen && (
//                   <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-zinc-200 z-30 max-h-96 overflow-y-auto">
//                     <div className="p-4 border-b border-zinc-200">
//                       <h3 className="font-bold text-zinc-900">Notifications</h3>
//                     </div>
//                     {notifications.length > 0 ? (
//                       <div className="divide-y divide-zinc-200">
//                         {notifications.map((notif) => (
//                           <div key={notif.id} className="p-4 hover:bg-zinc-50 flex justify-between items-start gap-3">
//                             <div className="flex-1">
//                               <p className="text-sm text-zinc-900">{notif.message}</p>
//                               <p className="text-xs text-zinc-500 mt-1">{notif.time}</p>
//                             </div>
//                             <button
//                               onClick={() => dismissNotification(notif.id)}
//                               className="text-zinc-400 hover:text-zinc-600"
//                             >
//                               <X className="w-4 h-4" />
//                             </button>
//                           </div>
//                         ))}
//                       </div>
//                     ) : (
//                       <div className="p-4 text-center text-sm text-zinc-500">No notifications</div>
//                     )}
//                   </div>
//                 )}
//               </div>

//               <button onClick={() => router.push("/help-support")} className="p-2 hover:bg-zinc-100 rounded-lg">
//                 <HelpCircle className="w-5 h-5 text-zinc-600" />
//               </button>

//               <div className="relative">
//                 <button
//                   onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
//                   className="flex items-center gap-2 p-2 hover:bg-zinc-100 rounded-lg"
//                 >
//                   <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center text-white text-sm font-bold overflow-hidden">
//                     {!user ? (
//                       <Link href="/sign-in">
//                         <button className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700">
//                           Login
//                         </button>
//                       </Link>
//                     ) : (
//                       <div className="flex items-center gap-2">
//                         <UserButton />
//                       </div>
//                     )}
//                   </div>
//                   <ChevronDown className="w-4 h-4 text-zinc-600" />
//                 </button>
//                 {profileDropdownOpen && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg border border-zinc-200 shadow-lg z-30">
//                     <button
//                       onClick={() => router.push("/settings/profile")}
//                       className="w-full text-left px-4 py-2 hover:bg-zinc-50 text-sm"
//                     >
//                       Profile
//                     </button>
//                     <button
//                       onClick={() => router.push("/settings/accounts")}
//                       className="w-full text-left px-4 py-2 hover:bg-zinc-50 text-sm"
//                     >
//                       Accounts
//                     </button>
//                     <hr className="my-1" />
//                     <button
//                       onClick={() => signOut()}
//                       className="w-full text-left px-4 py-2 hover:bg-red-50 text-sm text-red-600"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="flex-1 overflow-y-auto">{children}</div>
//       </div>

//       <div className="md:hidden w-full flex flex-col h-screen">
//         <div className="bg-white border-b border-zinc-200 px-4 py-3 flex items-center justify-between sticky top-0 z-20">
//           <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 hover:bg-zinc-100 rounded-lg">
//             <Menu className="w-6 h-6 text-zinc-600" />
//           </button>
//           <button
//             onClick={() => router.push("/verify-kyc")}
//             className="flex-1 ml-2 hover:opacity-80 transition-opacity"
//           >
//             <img src="/images/20251229-103148.png" alt="CSTrustFunds Logo" className="h-16" />
//           </button>
//           <div className="flex items-center gap-4">
//             <div className="relative">
//               <button
//                 onClick={() => setNotificationOpen(!notificationOpen)}
//                 className="p-2 hover:bg-zinc-100 rounded-lg relative"
//               >
//                 <Bell className="w-5 h-5 text-zinc-600" />
//                 {notifications.length > 0 && (
//                   <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
//                 )}
//               </button>

//               {notificationOpen && (
//                 <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-zinc-200 z-30 max-h-80 overflow-y-auto">
//                   <div className="p-4 border-b border-zinc-200">
//                     <h3 className="font-bold text-zinc-900">Notifications</h3>
//                   </div>
//                   {notifications.length > 0 ? (
//                     <div className="divide-y divide-zinc-200">
//                       {notifications.map((notif) => (
//                         <div key={notif.id} className="p-4 hover:bg-zinc-50 flex justify-between items-start gap-3">
//                           <div className="flex-1">
//                             <p className="text-sm text-zinc-900">{notif.message}</p>
//                             <p className="text-xs text-zinc-500 mt-1">{notif.time}</p>
//                           </div>
//                           <button
//                             onClick={() => dismissNotification(notif.id)}
//                             className="text-zinc-400 hover:text-zinc-600"
//                           >
//                             <X className="w-4 h-4" />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="p-4 text-center text-sm text-zinc-500">No notifications</div>
//                   )}
//                 </div>
//               )}
//             </div>
//             <button onClick={() => router.push("/help-support")} className="p-2 hover:bg-zinc-100 rounded-lg">
//               <HelpCircle className="w-5 h-5 text-zinc-600" />
//             </button>
//           </div>
//         </div>

//         <div className="flex-1 overflow-y-auto pb-20">{children}</div>

//         {mobileMenuOpen && (
//           <>
//             <div
//               className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
//               onClick={() => setMobileMenuOpen(false)}
//             ></div>

//             <div className="fixed left-0 top-0 h-screen w-80 bg-white shadow-lg z-40 overflow-y-auto flex flex-col md:hidden">
//               <div className="p-6 border-b border-zinc-200 space-y-4">
//                 <div className="flex items-center justify-between">
//                   <button
//                     onClick={() => {
//                       router.push("/settings/profile")
//                       setMobileMenuOpen(false)
//                     }}
//                     className="flex items-center gap-3 hover:bg-zinc-50 p-2 rounded-lg transition-colors"
//                   >
//                     <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center text-white font-bold text-lg overflow-hidden">
//                       {!user ? (
//                         <Link href="/sign-in">
//                           <button className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700">
//                             Login
//                           </button>
//                         </Link>
//                       ) : (
//                         <div className="flex items-center gap-2">
//                           <UserButton />
//                         </div>
//                       )}
//                     </div>
//                     <div>
//                       {/* <p className="text-sm font-bold text-zinc-900">{user?.firstName} {user?.lastName}</p> */}
//                       {/* <p className="text-xs text-zinc-500">{user?.lastName}</p> */}
//                     </div>
//                   </button>
//                   <button onClick={() => setMobileMenuOpen(false)} className="p-1 hover:bg-zinc-100 rounded-lg">
//                     <X className="w-5 h-5 text-zinc-600" />
//                   </button>
//                 </div>

//                 <div className="flex gap-2 text-sm">
//                   <Button
//                     onClick={() => {
//                       router.push("/settings/profile")
//                       setMobileMenuOpen(false)
//                     }}
//                     variant="outline"
//                     size="sm"
//                     className="flex-1 h-8 rounded-lg bg-transparent border-zinc-200"
//                   >
//                     Profile
//                   </Button>
//                   <Button
//                     onClick={() => {
//                       router.push("/settings/accounts")
//                       setMobileMenuOpen(false)
//                     }}
//                     variant="outline"
//                     size="sm"
//                     className="flex-1 h-8 rounded-lg bg-red-600 text-white border-red-600 hover:bg-red-700"
//                   >
//                     Accounts
//                   </Button>
//                 </div>
//               </div>

//               <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
//                 {menuItems.map((menuSection) => (
//                   <div key={menuSection.section} className="space-y-2">
//                     <p className="text-xs font-bold text-zinc-400 px-2 uppercase tracking-wide">
//                       {menuSection.section}
//                     </p>
//                     {menuSection.items.map((item) => {
//                       const Icon = item.icon
//                       const isActive = currentMenuLabel === item.label
//                       return (
//                         <button
//                           key={item.label}
//                           onClick={() => handleMenuItemClick(item.route)}
//                           className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm ${
//                             isActive ? "bg-red-50 text-red-600 font-semibold" : "text-zinc-600 hover:bg-zinc-100"
//                           }`}
//                         >
//                           <Icon className="w-5 h-5" />
//                           {item.label}
//                         </button>
//                       )
//                     })}
//                   </div>
//                 ))}
//               </nav>

//               <div className="border-t border-zinc-200 p-4">
//                 <button
//                   onClick={() => signOut()}
//                   className="w-full flex items-center gap-3 px-4 py-3 cursor-pointer rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all text-sm font-medium"
//                 >
//                   <LogOut className="w-5 h-5" />
//                   Logout
//                 </button>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   )
// }


"use client"

import type React from "react"
import { useEffect, useState } from "react"
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
  HelpCircle,
  Settings,
  ChevronDown,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { UserButton, useUser, useClerk } from "@clerk/nextjs"
import Link from "next/link"

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

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [notificationOpen, setNotificationOpen] = useState(false)

  // ✅ CENTRAL LOGOUT HANDLER (IMPORTANT)
  const handleLogout = async () => {
    setProfileDropdownOpen(false)
    setMobileMenuOpen(false)
    setSidebarOpen(false)
    setNotificationOpen(false)

    await signOut({
      redirectUrl: "/sign-in",
    })
  }

  const routeToMenuLabel: Record<string, string> = {
    "/verify-kyc": "Dashboard",
    "/my-savings": "My Savings",
    "/savings-groups": "Savings Groups",
    "/transactions": "Transactions",
    "/notifications": "Notifications",
    "/create-savings-plan": "Create Savings Plan",
    "/join-savings-group": "Join Savings Group",
    "/ai-smartsave": "AI SmartSave",
    "/kyc-verification": "KYC Verification",
    "/settings": "Settings",
    "/help-support": "Help & Support",
  }

  const currentMenuLabel = routeToMenuLabel[pathname] || "Dashboard"

  const menuItems = [
    {
      section: "MAIN",
      items: [
        { label: "Dashboard", icon: Home, route: "/verify-kyc" },
        { label: "My Savings", icon: TrendingUp, route: "/my-savings" },
        { label: "Savings Groups", icon: Users, route: "/savings-groups" },
        { label: "Transactions", icon: FileText, route: "/transactions" },
        { label: "Notifications", icon: Bell, route: "/notifications" },
      ],
    },
    {
      section: "ACTIONS",
      items: [
        { label: "Create Savings Plan", icon: Plus, route: "/create-savings-plan" },
        { label: "Join Savings Group", icon: Users, route: "/join-savings-group" },
      ],
    },
    {
      section: "ACCOUNT",
      items: [
        { label: "KYC Verification", icon: Shield, route: "/kyc-verification" },
        { label: "Settings", icon: Settings, route: "/settings" },
        { label: "Help & Support", icon: HelpCircle, route: "/help-support" },
      ],
    },
  ]

  const [notifications, setNotifications] = useState([
    { id: 1, message: "Welcome to CSTrustFunds! Complete your KYC verification.", time: "2 mins ago" },
    { id: 2, message: "Your savings goal reached 50% progress!", time: "1 hour ago" },
  ])

  const dismissNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex">
      {/* ================= DESKTOP SIDEBAR ================= */}
      <div className="hidden md:flex w-64 bg-white border-r border-zinc-200 flex-col fixed h-screen">
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((section) => (
            <div key={section.section}>
              <p className="text-xs font-bold text-zinc-400 px-4 py-2 uppercase">
                {section.section}
              </p>
              {section.items.map((item) => {
                const Icon = item.icon
                const isActive = currentMenuLabel === item.label
                return (
                  <button
                    key={item.label}
                    onClick={() => router.push(item.route)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm ${
                      isActive
                        ? "bg-red-50 text-red-600 font-semibold"
                        : "text-zinc-600 hover:bg-zinc-100"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </button>
                )
              })}
            </div>
          ))}
        </nav>

        {/* LOGOUT */}
        <div className="border-t p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 md:ml-64">
        {/* TOP BAR */}
        <div className="bg-white border-b px-6 py-4 flex justify-between items-center sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button onClick={() => setNotificationOpen(!notificationOpen)}>
              <Bell className="w-5 h-5 text-zinc-600" />
            </button>
          </div>

          {/* PROFILE DROPDOWN */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2"
            >
              <UserButton />
              <ChevronDown className="w-4 h-4" />
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg border shadow">
                <button
                  onClick={() => router.push("/settings/profile")}
                  className="w-full px-4 py-2 text-left hover:bg-zinc-50"
                >
                  Profile
                </button>
                <hr />
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}
