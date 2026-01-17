"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
// import { useAuth } from "@/lib/auth-context"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Upload, ArrowLeft } from "lucide-react"

export const dynamic = "force-dynamic"

export default function ProfileSettingsPage() {
  const router = useRouter()
  // const { user, isLoading, updateProfile } = useAuth()
  const [profilePicture, setProfilePicture] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", location: "" })

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const pic = localStorage.getItem("cstrustfunds_profile_picture")
  //     if (pic) setProfilePicture(pic)

  //     const savedProfile = localStorage.getItem("cstrustfunds_user_profile")
  //     if (savedProfile) {
  //       setFormData(JSON.parse(savedProfile))
  //     } else if (user) {
  //       setFormData({ name: user.name || "", email: user.email || "", phone: "", location: "" })
  //     }
  //   }
  // }, [user])

  // if (isLoading || !user) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
  //     </div>
  //   )
  // }

  const handleProfilePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setProfilePicture(result)
        if (typeof window !== "undefined") {
          localStorage.setItem("cstrustfunds_profile_picture", result)
          window.dispatchEvent(new Event("storage"))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveProfile = () => {
    if (typeof window !== "undefined") {
      const profileData = { ...formData, profilePicture }
      localStorage.setItem("cstrustfunds_user_profile", JSON.stringify(profileData))
      window.dispatchEvent(new Event("storage"))
      // updateProfile(profileData)
      router.push("/settings")
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
          <h1 className="text-3xl font-bold text-zinc-900">Edit Profile</h1>
          <p className="text-zinc-600 mt-2">Update your personal information</p>
        </div>

        <div className="bg-white rounded-xl border border-zinc-200 p-8 space-y-6">
          <div className="flex items-center gap-6 pb-6 border-b border-zinc-200">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center text-white font-bold text-2xl overflow-hidden border-2 border-zinc-200">
              {/* {profilePicture ? ( */}
                {/* <img src={profilePicture || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" /> */}
              {/* ) : ( */}
                {/* user.name?.charAt(0).toUpperCase() */}
              {/* )} */}
            </div>
            <div>
              <label className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer transition-all">
                <Upload className="w-4 h-4" />
                <span>Upload Picture</span>
                <input type="file" accept="image/*" onChange={handleProfilePictureUpload} className="hidden" />
              </label>
              <p className="text-xs text-zinc-500 mt-2">JPG, PNG or GIF. Max 5MB</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-zinc-900 mb-2">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-red-600"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-zinc-900 mb-2">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-red-600"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-zinc-900 mb-2">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-red-600"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-zinc-900 mb-2">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-red-600"
              />
            </div>
            <Button
              onClick={handleSaveProfile}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white w-full"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
