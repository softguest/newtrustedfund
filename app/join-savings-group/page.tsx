"use client"

export const dynamic = "force-dynamic"

import { Suspense, useState } from "react"
import { useRouter } from "next/navigation"
// import { useAuth } from "@/lib/auth-context"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Search, Users, TrendingUp, Send, X } from "lucide-react"
import { XAF } from "@/lib/currency"
import { useUser } from "@clerk/nextjs"

const topCommunities = [
  {
    id: 1,
    name: "Home Builders Fund",
    description: "Building dream homes together",
    totalSavings: 45000000,
    members: 156,
    monthlyContribution: 50000,
    growthRate: 12.5,
    requirements: "Minimum monthly contribution, verified income",
    frequency: "Monthly",
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
    frequency: "Monthly",
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
    frequency: "Monthly",
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
    frequency: "Monthly",
  },
  {
    id: 5,
    name: "Wedding Fund Group",
    description: "Planning beautiful celebrations together",
    totalSavings: 18500000,
    members: 67,
    monthlyContribution: 35000,
    growthRate: 14.8,
    requirements: "Engaged couples, commitment proof",
    frequency: "Monthly",
  },
  {
    id: 6,
    name: "Healthcare Reserve",
    description: "Medical emergency preparedness fund",
    totalSavings: 42000000,
    members: 189,
    monthlyContribution: 20000,
    growthRate: 11.5,
    requirements: "Health insurance, regular contributions",
    frequency: "Bi-weekly",
  },
  {
    id: 7,
    name: "Travel & Adventure Fund",
    description: "Explore the world together",
    totalSavings: 15000000,
    members: 45,
    monthlyContribution: 40000,
    growthRate: 16.2,
    requirements: "Valid passport, travel commitment",
    frequency: "Monthly",
  },
  {
    id: 8,
    name: "Technology Innovation Group",
    description: "Funding tech startups and innovation",
    totalSavings: 52000000,
    members: 134,
    monthlyContribution: 60000,
    growthRate: 22.4,
    requirements: "Tech background preferred, verified income",
    frequency: "Monthly",
  },
]

function JoinSavingsGroupContent() {
  const router = useRouter();
  const { user} = useUser();
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [showJoinModal, setShowJoinModal] = useState(false)
  const [formData, setFormData] = useState({
    reason: "",
    monthlyIncome: "",
    occupation: "",
    commitment: "",
    referral: "",
  })

  // if (isLoading || !user) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-zinc-50">
  //       <div className="text-center">
  //         <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
  //         <p className="mt-4 text-zinc-600">Loading...</p>
  //       </div>
  //     </div>
  //   )
  // }

  const filteredGroups = topCommunities.filter(
    (group) =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // const handleJoinClick = (group) => {
  //   setSelectedGroup(group)
  //   setShowJoinModal(true)
  // }

  const handleSubmitRequest = () => {
    if (!formData.reason || !formData.monthlyIncome || !formData.occupation || !formData.commitment) {
      alert("Please fill in all required fields")
      return
    }

    // alert(
    //   `Your request to join "${selectedGroup?.name}" has been submitted for admin approval. You'll be notified once reviewed.`,
    // )

    setFormData({
      reason: "",
      monthlyIncome: "",
      occupation: "",
      commitment: "",
      referral: "",
    })
    setShowJoinModal(false)
    setSelectedGroup(null)
  }

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8 space-y-6 md:space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-900">Discover Savings Communities</h2>
            <p className="text-sm md:text-base text-zinc-600 mt-1 md:mt-2">
              Find and join a community that matches your savings goals
            </p>
          </div>
          <Button
            onClick={() => router.push("/create-savings-group")}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
          >
            Create Your Own Group
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 md:left-4 top-3 w-5 h-5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search communities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 md:pl-12 pr-4 py-3 text-base border border-zinc-200 rounded-lg focus:outline-none focus:border-red-600"
          />
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredGroups.map((group) => (
            <div
              key={group.id}
              className="bg-white rounded-xl border border-zinc-200 p-4 md:p-6 shadow-sm hover:shadow-md transition-all hover:border-red-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h4 className="text-base md:text-lg font-bold text-zinc-900">{group.name}</h4>
                  <p className="text-xs font-medium text-red-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />+{group.growthRate}% growth
                  </p>
                </div>
              </div>

              <p className="text-sm text-zinc-600 mb-4 leading-relaxed">{group.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-500">Total Savings</span>
                  <span className="font-bold text-zinc-900">{XAF(group.totalSavings)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-500 flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    Members
                  </span>
                  <span className="font-bold text-zinc-900">{group.members}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-500">Monthly Contribution</span>
                  <span className="font-bold text-red-600">{XAF(group.monthlyContribution)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-500">Frequency</span>
                  <span className="font-bold text-zinc-900">{group.frequency}</span>
                </div>
              </div>

              <div className="bg-zinc-50 rounded-lg p-3 mb-4">
                <p className="text-xs text-zinc-600">
                  <span className="font-semibold">How to save:</span> {group.frequency} contributions with auto-debit
                  option. Members can save flexibly above minimum.
                </p>
              </div>

              <Button
                // onClick={() => handleJoinClick(group)}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
              >
                Request to Join
              </Button>
            </div>
          ))}
        </div>

        {filteredGroups.length === 0 && (
          <div className="bg-white rounded-xl border border-zinc-200 p-8 md:p-12 text-center">
            <Users className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
            <p className="text-zinc-600">No communities found matching your search</p>
          </div>
        )}
      </div>

      {/* Join Request Modal */}
      {showJoinModal && selectedGroup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-zinc-200 p-6 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-zinc-900">
                  {/* {selectedGroup.name} */}
                  </h3>
                <p className="text-sm text-zinc-600 mt-1">
                  {/* {selectedGroup.description} */}
                  </p>
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
                    <p className="font-bold text-zinc-900">
                      {/* {XAF(selectedGroup.totalSavings)} */}
                      </p>
                  </div>
                  <div>
                    <p className="text-zinc-600">Members</p>
                    <p className="font-bold text-zinc-900">
                      {/* {selectedGroup.members} */}
                      </p>
                  </div>
                  <div>
                    <p className="text-zinc-600">Monthly Contribution</p>
                    <p className="font-bold text-red-600">
                      {/* {XAF(selectedGroup.monthlyContribution)} */}
                      </p>
                  </div>
                  <div>
                    <p className="text-zinc-600">Growth Rate</p>
                    <p className="font-bold text-green-600">
                      {/* +{selectedGroup.growthRate}% */}
                      </p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-red-200">
                  <p className="text-xs text-zinc-700">
                    <span className="font-semibold">Requirements:</span> 
                    {/* {selectedGroup.requirements} */}
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
    </DashboardLayout>
  )
}

export default function JoinSavingsGroupPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JoinSavingsGroupContent />
    </Suspense>
  )
}
