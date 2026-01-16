"use client"

import { useEffect, useState } from "react"
// import { createClient } from "@/lib/supabase/client"
import { Check, X, Eye } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

export const dynamic = "force-dynamic"

interface KYCSubmission {
  id: string
  full_name: string
  email: string
  phone_number: string
  government_id_type: string
  address: string
  city: string
  country: string
  postal_code: string
  status: "pending" | "approved" | "rejected"
  submitted_at: string
  reviewed_at?: string
  rejection_reason?: string
  user_id: string
  id_document_url?: string
  proof_of_address_url?: string
  passport_photo_url?: string
}

export default function KYCApprovalsPage() {
  const [submissions, setSubmissions] = useState<KYCSubmission[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedSubmission, setSelectedSubmission] = useState<KYCSubmission | null>(null)
  const [rejectReason, setRejectReason] = useState("")
  const [isRejecting, setIsRejecting] = useState(false)

  // useEffect(() => {
  //   fetchSubmissions()
  // }, [])

  // const fetchSubmissions = async () => {
  //   try {
  //     const supabase = createClient()
  //     const { data, error } = await supabase
  //       .from("kyc_submissions")
  //       .select("*")
  //       .order("submitted_at", { ascending: false })

  //     if (error) throw error
  //     setSubmissions(data || [])
  //   } catch (err) {
  //     console.error("[v0] Failed to fetch submissions:", err)
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  // const handleApprove = async (id: string) => {
  //   try {
  //     const supabase = createClient()
  //     const { error } = await supabase
  //       .from("kyc_submissions")
  //       .update({ status: "approved", reviewed_at: new Date().toISOString() })
  //       .eq("id", id)

  //     if (error) throw error
  //     fetchSubmissions()
  //     setSelectedSubmission(null)
  //   } catch (err) {
  //     console.error("[v0] Failed to approve:", err)
  //   }
  // }

  // const handleReject = async (id: string) => {
  //   if (!rejectReason.trim()) {
  //     alert("Please provide a rejection reason")
  //     return
  //   }

  //   setIsRejecting(true)
  //   try {
  //     const supabase = createClient()
  //     const { error } = await supabase
  //       .from("kyc_submissions")
  //       .update({
  //         status: "rejected",
  //         rejection_reason: rejectReason,
  //         reviewed_at: new Date().toISOString(),
  //       })
  //       .eq("id", id)

  //     if (error) throw error
  //     fetchSubmissions()
  //     setSelectedSubmission(null)
  //     setRejectReason("")
  //   } catch (err) {
  //     console.error("[v0] Failed to reject:", err)
  //   } finally {
  //     setIsRejecting(false)
  //   }
  // }

  if (isLoading) {
    return (
      <DashboardLayout currentBalance={0}>
        <div className="p-4 md:p-8 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-zinc-600">Loading KYC submissions...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  const pendingCount = submissions.filter((s) => s.status === "pending").length
  const approvedCount = submissions.filter((s) => s.status === "approved").length
  const rejectedCount = submissions.filter((s) => s.status === "rejected").length

  return (
    <DashboardLayout currentBalance={0}>
      <div className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-zinc-900 mb-8">KYC Approvals</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-700 font-semibold">Pending Review</p>
              <p className="text-3xl font-bold text-yellow-600">{pendingCount}</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-700 font-semibold">Approved</p>
              <p className="text-3xl font-bold text-green-600">{approvedCount}</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-700 font-semibold">Rejected</p>
              <p className="text-3xl font-bold text-red-600">{rejectedCount}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full">
              <thead className="bg-zinc-50 border-b border-zinc-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-900">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-900">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-900">ID Type</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-900">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-900">Submitted</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {submissions.map((submission) => (
                  <tr key={submission.id} className="hover:bg-zinc-50">
                    <td className="px-4 py-3 text-sm text-zinc-900">{submission.full_name}</td>
                    <td className="px-4 py-3 text-sm text-zinc-600">{submission.email}</td>
                    <td className="px-4 py-3 text-sm text-zinc-600">{submission.government_id_type}</td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          submission.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : submission.status === "rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-zinc-600">
                      {new Date(submission.submitted_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-sm space-x-2">
                      <button
                        onClick={() => setSelectedSubmission(submission)}
                        className="inline-flex items-center gap-1 px-2 py-1 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {submission.status === "pending" && (
                        <>
                          <button
                            // onClick={() => handleApprove(submission.id)}
                            className="inline-flex items-center gap-1 px-2 py-1 text-green-600 hover:bg-green-50 rounded"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setSelectedSubmission(submission)}
                            className="inline-flex items-center gap-1 px-2 py-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Detail Modal */}
          {selectedSubmission && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6 text-zinc-900">{selectedSubmission.full_name}</h2>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-sm text-zinc-600 mb-1">Email</p>
                    <p className="font-semibold text-zinc-900">{selectedSubmission.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-600 mb-1">Phone</p>
                    <p className="font-semibold text-zinc-900">{selectedSubmission.phone_number}</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-600 mb-1">ID Type</p>
                    <p className="font-semibold text-zinc-900">{selectedSubmission.government_id_type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-600 mb-1">Status</p>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        selectedSubmission.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : selectedSubmission.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {selectedSubmission.status.charAt(0).toUpperCase() + selectedSubmission.status.slice(1)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-600 mb-1">City</p>
                    <p className="font-semibold text-zinc-900">{selectedSubmission.city}</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-600 mb-1">Country</p>
                    <p className="font-semibold text-zinc-900">{selectedSubmission.country}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-zinc-600 mb-2">Full Address</p>
                  <p className="font-semibold text-zinc-900">{selectedSubmission.address}</p>
                </div>

                {selectedSubmission.status === "rejected" && selectedSubmission.rejection_reason && (
                  <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-sm text-red-800 font-semibold">Rejection Reason:</p>
                    <p className="text-sm text-red-700 mt-1">{selectedSubmission.rejection_reason}</p>
                  </div>
                )}

                {selectedSubmission.status === "pending" && (
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-zinc-900 mb-2">
                      Rejection Reason (if rejecting)
                    </label>
                    <textarea
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                      placeholder="Explain why this submission is being rejected..."
                      className="w-full p-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                      rows={3}
                    />
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setSelectedSubmission(null)
                      setRejectReason("")
                    }}
                    className="flex-1 bg-zinc-200 hover:bg-zinc-300 text-zinc-900 rounded-lg p-2 font-semibold"
                  >
                    Close
                  </button>
                  {selectedSubmission.status === "pending" && (
                    <>
                      <button
                        // onClick={() => handleReject(selectedSubmission.id)}
                        disabled={isRejecting}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-lg p-2 font-semibold disabled:opacity-50"
                      >
                        {isRejecting ? "Rejecting..." : "Reject"}
                      </button>
                      <button
                        // onClick={() => handleApprove(selectedSubmission.id)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-lg p-2 font-semibold"
                      >
                        Approve
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
