import { AlertCircle, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DashboardPage() {
  const isKYCVerified = false // This would come from user context/state

  return (
    <div className="min-h-screen bg-zinc-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-zinc-900 mb-8">Dashboard</h1>

        {/* KYC Alert Banner */}
        {!isKYCVerified && (
          <div className="bg-amber-50 border-l-4 border-brand-wine rounded-lg p-6 mb-8">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-brand-wine flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h2 className="font-bold text-zinc-900 mb-2">KYC Verification Required</h2>
                <p className="text-sm text-zinc-600 mb-4">
                  To access all features including creating or joining savings groups and communities, you need to
                  complete your KYC verification. This is required for regulatory compliance and your security.
                </p>
                <Link href="/verify-kyc">
                  <Button className="bg-brand-wine hover:opacity-90 text-white rounded-lg font-bold">
                    Complete Verification
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Restricted Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Personal Savings */}
          <div className="bg-white rounded-xl shadow-sm border border-zinc-100 p-6">
            <h3 className="font-bold text-zinc-900 mb-2">Personal Savings</h3>
            <p className="text-sm text-zinc-600 mb-4">Create and manage your personal savings goals</p>
            <Button className="w-full bg-brand-wine hover:opacity-90 text-white rounded-lg font-bold">
              Get Started
            </Button>
          </div>

          {/* Savings Group - RESTRICTED */}
          <div
            className={`bg-white rounded-xl shadow-sm border border-zinc-100 p-6 ${!isKYCVerified ? "opacity-60" : ""}`}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-zinc-900">Savings Group</h3>
              {!isKYCVerified && <Lock className="w-4 h-4 text-brand-wine" />}
            </div>
            <p className="text-sm text-zinc-600 mb-4">Save together with friends and family</p>
            <Button
              disabled={!isKYCVerified}
              className="w-full bg-zinc-200 text-zinc-600 rounded-lg font-bold cursor-not-allowed"
            >
              {!isKYCVerified ? "Verify to Unlock" : "Create Group"}
            </Button>
          </div>

          {/* Community Savings - RESTRICTED */}
          <div
            className={`bg-white rounded-xl shadow-sm border border-zinc-100 p-6 ${!isKYCVerified ? "opacity-60" : ""}`}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-zinc-900">Community Savings</h3>
              {!isKYCVerified && <Lock className="w-4 h-4 text-brand-wine" />}
            </div>
            <p className="text-sm text-zinc-600 mb-4">Join trusted community-based savings</p>
            <Button
              disabled={!isKYCVerified}
              className="w-full bg-zinc-200 text-zinc-600 rounded-lg font-bold cursor-not-allowed"
            >
              {!isKYCVerified ? "Verify to Unlock" : "Join Community"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
