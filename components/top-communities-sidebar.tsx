"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Users, TrendingUp, X, Send } from "lucide-react"
import { XAF } from "@/lib/currency"

interface Community {
  id: number
  name: string
  description: string
  totalSavings: number
  members: number
  monthlyContribution: number
  growthRate: number
  requirements: string
}

const topCommunities: Community[] = [
  {
    id: 1,
    name: "Home Builders Fund",
    description: "Building dream homes together",
    totalSavings: 45000000,
    members: 156,
    monthlyContribution: 50000,
    growthRate: 12.5,
    requirements: "Minimum monthly contribution, verified income",
  },
  {
    id: 2,
    name: "Education Excellence",
    description: "Investing in our children's future",
    totalSavings: 32000000,
    members: 98,
    monthlyContribution: 25000,
    growthRate: 15.2,
    requirements: "Parents/Guardians, verified KYC",
  },
  {
    id: 3,
    name: "Business Capital Group",
    description: "Supporting entrepreneurs",
    totalSavings: 58000000,
    members: 203,
    monthlyContribution: 75000,
    growthRate: 18.7,
    requirements: "Business plan, verified income source",
  },
  {
    id: 4,
    name: "Emergency Support Circle",
    description: "Safety net for unexpected needs",
    totalSavings: 28000000,
    members: 124,
    monthlyContribution: 30000,
    growthRate: 10.3,
    requirements: "Regular contributions, verified identity",
  },
]

export function TopCommunitiesSidebar() {
  const [showJoinModal, setShowJoinModal] = useState(false)
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null)
  const [formData, setFormData] = useState({
    reason: "",
    monthlyIncome: "",
    occupation: "",
    commitment: "",
    referral: "",
  })

  const handleJoinClick = (community: Community) => {
    setSelectedCommunity(community)
    setShowJoinModal(true)
  }

  const handleSubmitRequest = () => {
    if (!formData.reason || !formData.monthlyIncome || !formData.occupation || !formData.commitment) {
      alert("Please fill in all required fields")
      return
    }

    // Submit to admin for approval
    alert(
      `Your request to join "${selectedCommunity?.name}" has been submitted for admin approval. You'll be notified once reviewed.`,
    )

    // Reset form
    setFormData({
      reason: "",
      monthlyIncome: "",
      occupation: "",
      commitment: "",
      referral: "",
    })
    setShowJoinModal(false)
    setSelectedCommunity(null)
  }

  return (
    <>
      <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm sticky top-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-zinc-900">Top Saving Communities</h3>
          <TrendingUp className="w-5 h-5 text-red-600" />
        </div>

        <div className="space-y-4">
          {topCommunities.map((community) => (
            <div
              key={community.id}
              className="border border-zinc-200 rounded-xl p-4 hover:border-red-200 hover:bg-red-50/50 transition-all cursor-pointer"
              onClick={() => handleJoinClick(community)}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-bold text-sm text-zinc-900">{community.name}</h4>
                <span className="text-xs font-semibold text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />+{community.growthRate}%
                </span>
              </div>

              <p className="text-xs text-zinc-600 mb-3">{community.description}</p>

              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-500">Total Savings</span>
                  <span className="font-bold text-zinc-900">{XAF(community.totalSavings)}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-500 flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    Members
                  </span>
                  <span className="font-bold text-zinc-900">{community.members}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-500">Monthly</span>
                  <span className="font-bold text-red-600">{XAF(community.monthlyContribution)}</span>
                </div>
              </div>

              <div className="bg-zinc-50 rounded-lg px-3 py-2 mb-3">
                <p className="text-xs text-zinc-600">
                  <span className="font-semibold">How to save:</span> Monthly contributions with auto-debit option.
                  Members can save flexibly above minimum.
                </p>
              </div>

              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  handleJoinClick(community)
                }}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-xs h-8"
              >
                Request to Join
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-zinc-200">
          <p className="text-xs text-zinc-500 text-center">All communities are verified and monitored for security</p>
        </div>
      </div>

      {/* Join Request Modal */}
      {showJoinModal && selectedCommunity && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-zinc-200 p-6 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-zinc-900">{selectedCommunity.name}</h3>
                <p className="text-sm text-zinc-600 mt-1">{selectedCommunity.description}</p>
              </div>
              <Button onClick={() => setShowJoinModal(false)} variant="ghost" size="sm" className="rounded-full">
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-6 space-y-6">
              {/* Community Details */}
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 border border-red-200">
                <h4 className="font-bold text-sm text-zinc-900 mb-3">Community Overview</h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-zinc-600">Total Savings</p>
                    <p className="font-bold text-zinc-900">{XAF(selectedCommunity.totalSavings)}</p>
                  </div>
                  <div>
                    <p className="text-zinc-600">Members</p>
                    <p className="font-bold text-zinc-900">{selectedCommunity.members}</p>
                  </div>
                  <div>
                    <p className="text-zinc-600">Monthly Contribution</p>
                    <p className="font-bold text-red-600">{XAF(selectedCommunity.monthlyContribution)}</p>
                  </div>
                  <div>
                    <p className="text-zinc-600">Growth Rate</p>
                    <p className="font-bold text-green-600">+{selectedCommunity.growthRate}%</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-red-200">
                  <p className="text-xs text-zinc-700">
                    <span className="font-semibold">Requirements:</span> {selectedCommunity.requirements}
                  </p>
                </div>
              </div>

              {/* Application Form */}
              <div className="space-y-4">
                <h4 className="font-bold text-zinc-900">Join Request Form</h4>
                <p className="text-sm text-zinc-600">
                  Complete the form below. Admin will review and approve your request.
                </p>

                <div>
                  <label className="text-sm font-semibold text-zinc-700 block mb-2">
                    Why do you want to join this community? <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    placeholder="Explain your savings goals and how this community aligns with them..."
                    className="w-full px-4 py-3 border border-zinc-200 rounded-lg focus:outline-none focus:border-red-600 resize-none h-24 text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-zinc-700 block mb-2">
                    Monthly Income (XAF) <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.monthlyIncome}
                    onChange={(e) => setFormData({ ...formData, monthlyIncome: e.target.value })}
                    placeholder="Enter your monthly income"
                    className="w-full px-4 py-3 border border-zinc-200 rounded-lg focus:outline-none focus:border-red-600 text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-zinc-700 block mb-2">
                    Occupation <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.occupation}
                    onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                    placeholder="Your occupation or profession"
                    className="w-full px-4 py-3 border border-zinc-200 rounded-lg focus:outline-none focus:border-red-600 text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-zinc-700 block mb-2">
                    Can you commit to monthly contributions? <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={formData.commitment}
                    onChange={(e) => setFormData({ ...formData, commitment: e.target.value })}
                    className="w-full px-4 py-3 border border-zinc-200 rounded-lg focus:outline-none focus:border-red-600 text-sm"
                  >
                    <option value="">Select an option</option>
                    <option value="yes-full">Yes, full monthly amount</option>
                    <option value="yes-flexible">Yes, but need flexible schedule</option>
                    <option value="partial">Partial contributions initially</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-zinc-700 block mb-2">Referral Code (Optional)</label>
                  <input
                    type="text"
                    value={formData.referral}
                    onChange={(e) => setFormData({ ...formData, referral: e.target.value })}
                    placeholder="Enter referral code if you have one"
                    className="w-full px-4 py-3 border border-zinc-200 rounded-lg focus:outline-none focus:border-red-600 text-sm"
                  />
                </div>
              </div>

              {/* Important Notes */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h5 className="font-semibold text-sm text-blue-900 mb-2">Important Notes:</h5>
                <ul className="text-xs text-blue-800 space-y-1 list-disc list-inside">
                  <li>Your request will be reviewed by community admin within 24-48 hours</li>
                  <li>You'll receive a notification once your request is approved or declined</li>
                  <li>Approved members must complete payment setup within 7 days</li>
                  <li>All information provided will be kept confidential</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button onClick={() => setShowJoinModal(false)} variant="outline" className="flex-1">
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitRequest}
                  className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit Request
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
