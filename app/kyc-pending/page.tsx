"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
// import { useAuth } from "@/lib/auth-context"
import { DashboardLayout } from "@/components/dashboard-layout"
import { CheckCircle, XCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useUser } from "@clerk/nextjs"
// import { createClient } from "@/lib/supabase/client"

export const dynamic = "force-dynamic"

interface KYCStatus {
  status: "pending" | "approved" | "rejected"
  submitted_at: string
  reviewed_at?: string
  rejection_reason?: string
}

export default function KYCPendingPage() {
  const { user } = useUser();
  const router = useRouter()
  // const { user, fetchUser } = useAuth()

  const [kycStatus, setKycStatus] = useState<KYCStatus | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [lastChecked, setLastChecked] = useState<Date | null>(null)

  useEffect(() => {
    const checkKYCStatus = async () => {
      // if (!user?.email) {
      //   router.push("/login")
      //   return
      // }

      // try {
      //   // const supabase = createClient()
      //   const { data, error } = await supabase
      //     .from("kyc_submissions")
      //     .select("status, submitted_at, reviewed_at, rejection_reason")
      //     // .eq("email", user.email)
      //     .order("submitted_at", { ascending: false })
      //     .limit(1)
      //     .single()

      //   if (error && error.code !== "PGRST116") {
      //     console.error("[v0] Error fetching KYC status:", error)
      //   }

      //   if (data) {
      //     setKycStatus(data as KYCStatus)
      //     setLastChecked(new Date())

      //     // If approved, update auth context and redirect
      //     if (data.status === "approved") {
      //       // await fetchUser()
      //       router.push("/verify-kyc")
      //     }
      //   }
      // } catch (err) {
      //   console.error("[v0] Unexpected error:", err)
      // } finally {
      //   setIsLoading(false)
      // }
    }

    checkKYCStatus()

    // Poll for status updates every 5 seconds
    const interval = setInterval(checkKYCStatus, 5000)
    return () => clearInterval(interval)
  }, [user?.emailAddresses, 
    router, 
    // fetchUser
  ])

  if (isLoading) {
    return (
      <DashboardLayout currentBalance={0}>
        <div className="p-4 md:p-8 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-zinc-600">Loading KYC status...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout currentBalance={0}>
      <div className="p-4 md:p-8 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-zinc-900 mb-8">KYC Verification Status</h1>

        {kycStatus?.status === "pending" && (
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-8">
            <div className="flex items-center mb-6">
              <Clock className="w-12 h-12 text-yellow-600 mr-4" />
              <div>
                <h2 className="text-2xl font-bold text-yellow-900">Verification in Progress</h2>
                <p className="text-sm text-yellow-700 mt-1">Your KYC documents are being reviewed</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 mb-6 space-y-4">
              <p className="text-zinc-700">
                Thank you for submitting your KYC documents. Our admin team is reviewing your information.
              </p>
              <p className="text-sm text-zinc-600">
                We typically review submissions within 24-48 hours. You can check back here for updates.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <p className="text-sm text-blue-900">
                  <strong>Last checked:</strong> {lastChecked?.toLocaleTimeString()}
                </p>
                <p className="text-xs text-blue-700 mt-2">Status updates every 5 seconds</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => router.push("/kyc-form")}
                variant="outline"
                className="flex-1 border-yellow-200 text-yellow-700 hover:bg-yellow-50"
              >
                Review Submission
              </Button>
              <Button
                onClick={() => router.push("/verify-kyc")}
                className="flex-1 bg-gradient-to-r from-red-600 to-red-700"
              >
                Back to Dashboard
              </Button>
            </div>
          </div>
        )}

        {kycStatus?.status === "approved" && (
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8">
            <div className="flex items-center mb-6">
              <CheckCircle className="w-12 h-12 text-green-600 mr-4" />
              <div>
                <h2 className="text-2xl font-bold text-green-900">KYC Verified Successfully</h2>
                <p className="text-sm text-green-700 mt-1">Your account is now fully verified</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 mb-6">
              <p className="text-zinc-700 mb-4">
                Congratulations! Your KYC verification has been approved. You now have full access to all features.
              </p>
              <ul className="space-y-2 text-sm text-zinc-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Create savings goals
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Top up your account
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Join or create savings groups
                </li>
              </ul>
            </div>

            <Button
              onClick={() => router.push("/verify-kyc")}
              className="w-full bg-gradient-to-r from-green-600 to-green-700"
            >
              Continue to Dashboard
            </Button>
          </div>
        )}

        {kycStatus?.status === "rejected" && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8">
            <div className="flex items-center mb-6">
              <XCircle className="w-12 h-12 text-red-600 mr-4" />
              <div>
                <h2 className="text-2xl font-bold text-red-900">KYC Verification Rejected</h2>
                <p className="text-sm text-red-700 mt-1">Your submission needs revision</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 mb-6">
              <p className="text-zinc-700 mb-4">
                Unfortunately, your KYC submission was rejected for the following reason:
              </p>
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                <p className="text-sm text-red-900 font-semibold">{kycStatus.rejection_reason}</p>
              </div>
              <p className="text-sm text-zinc-600">
                Please review the information and submit again with the required corrections.
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => router.push("/kyc-form")}
                className="flex-1 bg-gradient-to-r from-red-600 to-red-700"
              >
                Submit Again
              </Button>
              <Button onClick={() => router.push("/verify-kyc")} variant="outline" className="flex-1 border-red-200">
                Back
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
