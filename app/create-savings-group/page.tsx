"use client"

export const dynamic = "force-dynamic"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
// import { useAuth } from "@/lib/auth-context"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle } from "lucide-react"
import { formatXAF } from "@/lib/currency"
import { useUser } from "@clerk/nextjs"

export default function CreateSavingsGroupPage() {
  const router = useRouter()
  // const { user, isLoading } = useAuth()
  const {user } = useUser();
  const [currentStep, setCurrentStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [invitedMembers, setInvitedMembers] = useState<
    Array<{ email: string; name: string; status: "pending" | "accepted" }>
  >([])
  const [memberEmail, setMemberEmail] = useState("")
  const [memberName, setMemberName] = useState("")

  const [formData, setFormData] = useState({
    groupName: "",
    description: "",
    purpose: "",
    targetAmount: "",
    groupDuration: "",
    contributionAmount: "",
    frequency: "weekly",
    minMembers: "3",
    maxMembers: "20",
    startDate: "",
    rules: "",
    groupType: "general",
  })

  const [showShareModal, setShowShareModal] = useState(false)
  const [groupShareLink, setGroupShareLink] = useState("")

  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1)
  }

  // if (isLoading || !user) {
  //   return (
  //     <DashboardLayout>
  //       <div className="min-h-screen flex items-center justify-center bg-zinc-50">
  //         <div className="text-center">
  //           <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
  //           <p className="mt-4 text-zinc-600">Loading...</p>
  //         </div>
  //       </div>
  //     </DashboardLayout>
  //   )
  // }

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault()
    if (!memberEmail || !memberName) {
      alert("Please enter both name and email")
      return
    }

    if (invitedMembers.some((m) => m.email === memberEmail)) {
      alert("This member is already invited")
      return
    }

    // if (memberEmail === user.email) {
    //   alert("You cannot invite yourself")
    //   return
    // }

    setInvitedMembers([...invitedMembers, { email: memberEmail, name: memberName, status: "pending" }])
    setMemberEmail("")
    setMemberName("")
  }

  const handleRemoveMember = (email: string) => {
    setInvitedMembers(invitedMembers.filter((m) => m.email !== email))
  }

  const validateStep = () => {
    if (currentStep === 1) {
      return formData.groupName && formData.description && formData.purpose
    }
    if (currentStep === 2) {
      return formData.targetAmount && formData.groupDuration && formData.startDate
    }
    if (currentStep === 3) {
      return formData.contributionAmount && formData.frequency && formData.minMembers && formData.maxMembers
    }
    if (currentStep === 4) {
      return invitedMembers.length > 0
    }
    return true
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   if (validateStep() && invitedMembers.length > 0) {
  //     const groupId = Date.now()
  //     const newGroup = {
  //       id: groupId,
  //       ...formData,
  //       createdBy: user?.firstName
  //       creatorName: user?.lastName,
  //       members: [{ email: user.email, name: user.name, status: "accepted" }],
  //       invitedMembers: invitedMembers,
  //       createdAt: new Date().toISOString(),
  //       totalMembers: 1 + invitedMembers.length,
  //     }

  //     const existingGroups = JSON.parse(localStorage.getItem("savings_groups") || "[]")
  //     localStorage.setItem("savings_groups", JSON.stringify([...existingGroups, newGroup]))

  //     const shareLink = `${typeof window !== "undefined" ? window.location.origin : ""}/join-savings-group?id=${groupId}&code=${btoa(user.email)}`
  //     setGroupShareLink(shareLink)

  //     invitedMembers.forEach((member) => {
  //       console.log(`Invitation email sent to ${member.email}`)
  //     })

  //     setSubmitted(true)
  //     setShowShareModal(true)
  //   }
  // }

  return (
    <DashboardLayout>
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-8">
          {!submitted ? (
            <div className="max-w-3xl mx-auto">
              <div className="mb-6 md:mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-zinc-900">Create a New Savings Group</h2>
                <p className="text-sm md:text-base text-zinc-600 mt-2">
                  Build a community of savers and achieve your goals together
                </p>
              </div>

              {/* Progress Steps */}
              <div className="mb-6 md:mb-8 flex items-center justify-between overflow-x-auto">
                {[1, 2, 3, 4, 5].map((step) => (
                  <div key={step} className="flex flex-col items-center flex-1 min-w-max md:min-w-0">
                    <div
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-xs md:text-sm mb-2 transition-all ${
                        step <= currentStep
                          ? "bg-gradient-to-r from-red-600 to-red-700 text-white"
                          : "bg-zinc-200 text-zinc-600"
                      }`}
                    >
                      {step}
                    </div>
                    <p className="text-xs text-zinc-600 text-center hidden md:block">
                      {step === 1 && "Basic Info"}
                      {step === 2 && "Duration"}
                      {step === 3 && "Contributions"}
                      {step === 4 && "Members"}
                      {step === 5 && "Review"}
                    </p>
                  </div>
                ))}
              </div>

              {/* Form */}
              <form 
              // onSubmit={handleSubmit} 
              className="bg-white rounded-xl border border-zinc-200 p-4 md:p-8 space-y-6">
                {/* Step 1: Basic Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-lg md:text-xl font-bold text-zinc-900">Group Basic Information</h3>

                    <div>
                      <label className="block text-sm font-bold text-zinc-900 mb-2">Group Name</label>
                      <input
                        type="text"
                        required
                        value={formData.groupName}
                        onChange={(e) => setFormData({ ...formData, groupName: e.target.value })}
                        className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-red-600 text-sm md:text-base"
                        placeholder="e.g., Community School Fees Fund"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-zinc-900 mb-2">Group Type</label>
                      <select
                        value={formData.groupType}
                        onChange={(e) => setFormData({ ...formData, groupType: e.target.value })}
                        className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-red-600 text-sm md:text-base"
                      >
                        <option value="general">General Savings</option>
                        <option value="education">Education Fund</option>
                        <option value="health">Health Emergency Fund</option>
                        <option value="home">Home Fund</option>
                        <option value="business">Business Startup</option>
                        <option value="wedding">Wedding Fund</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-zinc-900 mb-2">Description</label>
                      <textarea
                        required
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-red-600 text-sm md:text-base"
                        placeholder="Describe your group's purpose and goals..."
                        rows={3}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-zinc-900 mb-2">Primary Purpose</label>
                      <input
                        type="text"
                        required
                        value={formData.purpose}
                        onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                        className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-red-600 text-sm md:text-base"
                        placeholder="e.g., Fund children's education fees"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Duration & Target */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-lg md:text-xl font-bold text-zinc-900">Duration & Savings Target</h3>

                    <div>
                      <label className="block text-sm font-bold text-zinc-900 mb-2">Group Target Amount (XAF)</label>
                      <input
                        type="number"
                        required
                        value={formData.targetAmount}
                        onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
                        className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-red-600 text-sm md:text-base"
                        placeholder="2000000"
                      />
                      <p className="text-xs text-zinc-500 mt-1">
                        {formData.targetAmount && formatXAF(Number.parseInt(formData.targetAmount))}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-zinc-900 mb-2">Start Date</label>
                        <input
                          type="date"
                          required
                          value={formData.startDate}
                          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                          className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-red-600 text-sm md:text-base"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-zinc-900 mb-2">Duration (Months)</label>
                        <input
                          type="number"
                          required
                          value={formData.groupDuration}
                          onChange={(e) => setFormData({ ...formData, groupDuration: e.target.value })}
                          className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-red-600 text-sm md:text-base"
                          placeholder="12"
                          min="1"
                          max="60"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Contributions */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-lg md:text-xl font-bold text-zinc-900">Contribution Settings</h3>

                    <div>
                      <label className="block text-sm font-bold text-zinc-900 mb-2">
                        Contribution Amount Per Member (XAF)
                      </label>
                      <input
                        type="number"
                        required
                        value={formData.contributionAmount}
                        onChange={(e) => setFormData({ ...formData, contributionAmount: e.target.value })}
                        className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-red-600 text-sm md:text-base"
                        placeholder="50000"
                      />
                      <p className="text-xs text-zinc-500 mt-1">
                        {formData.contributionAmount && formatXAF(Number.parseInt(formData.contributionAmount))}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-zinc-900 mb-2">Contribution Frequency</label>
                        <select
                          value={formData.frequency}
                          onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                          className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-red-600 text-sm md:text-base"
                        >
                          <option value="weekly">Weekly</option>
                          <option value="biweekly">Bi-Weekly</option>
                          <option value="monthly">Monthly</option>
                          <option value="quarterly">Quarterly</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-zinc-900 mb-2">Allow Late Contributions</label>
                        <select className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-red-600 text-sm md:text-base">
                          <option>Yes (with penalty)</option>
                          <option>No (strict deadline)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-zinc-900 mb-2">Minimum Members</label>
                        <input
                          type="number"
                          value={formData.minMembers}
                          onChange={(e) => setFormData({ ...formData, minMembers: e.target.value })}
                          className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-red-600 text-sm md:text-base"
                          min="2"
                          max="20"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-zinc-900 mb-2">Maximum Members</label>
                        <input
                          type="number"
                          value={formData.maxMembers}
                          onChange={(e) => setFormData({ ...formData, maxMembers: e.target.value })}
                          className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-red-600 text-sm md:text-base"
                          min="2"
                          max="100"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Invite Members */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <h3 className="text-lg md:text-xl font-bold text-zinc-900">Invite Members</h3>
                    <p className="text-xs md:text-sm text-zinc-600">
                      Invite members by email. They will receive an invitation and can accept to join the group.
                    </p>

                    <form onSubmit={handleAddMember} className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={memberName}
                          onChange={(e) => setMemberName(e.target.value)}
                          placeholder="Member name"
                          className="px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-red-600 text-sm"
                        />
                        <input
                          type="email"
                          value={memberEmail}
                          onChange={(e) => setMemberEmail(e.target.value)}
                          placeholder="Member email"
                          className="px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-red-600 text-sm"
                        />
                      </div>
                      <Button type="submit" className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white">
                        Add Member
                      </Button>
                    </form>

                    {invitedMembers.length > 0 && (
                      <div className="space-y-3">
                        <p className="text-sm font-bold text-zinc-900">Invited Members ({invitedMembers.length})</p>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {invitedMembers.map((member, idx) => (
                            <div
                              key={idx}
                              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 p-3 md:p-4 border border-zinc-200 rounded-lg bg-zinc-50"
                            >
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-zinc-900 truncate">{member.name}</p>
                                <p className="text-xs text-zinc-500 truncate">{member.email}</p>
                              </div>
                              <div className="flex items-center gap-3 w-full md:w-auto">
                                <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 whitespace-nowrap">
                                  {member.status === "pending" ? "Pending" : "Accepted"}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveMember(member.email)}
                                  className="text-red-600 hover:text-red-700 text-xs md:text-sm whitespace-nowrap"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {invitedMembers.length === 0 && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-3">
                        <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-bold text-yellow-900">At least 1 member required</p>
                          <p className="text-xs text-yellow-700 mt-1">
                            You must invite at least one member to create the group
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 5: Review */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <h3 className="text-lg md:text-xl font-bold text-zinc-900">Review & Group Rules</h3>

                    <div>
                      <label className="block text-sm font-bold text-zinc-900 mb-2">Group Rules & Guidelines</label>
                      <textarea
                        value={formData.rules}
                        onChange={(e) => setFormData({ ...formData, rules: e.target.value })}
                        className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-red-600 text-sm md:text-base"
                        placeholder="Define your group's rules, penalties for late payments, withdrawal conditions, etc."
                        rows={6}
                      />
                      <p className="text-xs text-zinc-500 mt-2">
                        Example: Late contributions attract 5% penalty. Members can withdraw with 30 days notice.
                        Minimum 6 months participation required.
                      </p>
                    </div>

                    <div className="space-y-4 bg-zinc-50 rounded-lg p-4 md:p-6">
                      <div>
                        <p className="text-xs text-zinc-500 font-bold">GROUP NAME</p>
                        <p className="text-base md:text-lg font-bold text-zinc-900">{formData.groupName}</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-zinc-500 font-bold">TARGET AMOUNT</p>
                          <p className="text-base md:text-lg font-bold text-zinc-900">
                            {formatXAF(Number.parseInt(formData.targetAmount))}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-zinc-500 font-bold">DURATION</p>
                          <p className="text-base md:text-lg font-bold text-zinc-900">
                            {formData.groupDuration} months
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-zinc-500 font-bold">CONTRIBUTION AMOUNT</p>
                          <p className="text-base md:text-lg font-bold text-zinc-900">
                            {formatXAF(Number.parseInt(formData.contributionAmount))}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-zinc-500 font-bold">FREQUENCY</p>
                          <p className="text-base md:text-lg font-bold text-zinc-900 capitalize">
                            {formData.frequency}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-zinc-500 font-bold">MIN MEMBERS</p>
                          <p className="text-base md:text-lg font-bold text-zinc-900">{formData.minMembers}</p>
                        </div>
                        <div>
                          <p className="text-xs text-zinc-500 font-bold">MAX MEMBERS</p>
                          <p className="text-base md:text-lg font-bold text-zinc-900">{formData.maxMembers}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500 font-bold">INVITED MEMBERS</p>
                        <p className="text-base md:text-lg font-bold text-zinc-900">{invitedMembers.length} members</p>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-bold text-green-900">Ready to create!</p>
                        <p className="text-xs text-green-700 mt-1">
                          Click "Create Group" to finalize and send invitations
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex flex-col md:flex-row gap-4 pt-6 border-t border-zinc-200">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep((prev) => prev - 1)}
                      className="md:flex-1 border-zinc-200 hover:bg-zinc-50 bg-transparent w-full"
                    >
                      Back
                    </Button>
                  )}
                  {currentStep < 5 ? (
                    <Button
                      type="button"
                      onClick={handleNextStep}
                      disabled={!validateStep()}
                      className="md:flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white disabled:opacity-50 w-full"
                    >
                      Next Step
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="md:flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white w-full"
                    >
                      Create Group
                    </Button>
                  )}
                </div>
              </form>
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-zinc-900 mb-2">Group Created Successfully!</h3>
                <p className="text-sm md:text-base text-zinc-600">
                  Your savings group "{formData.groupName}" has been created.
                </p>
                <p className="text-sm md:text-base text-zinc-600 mt-1">
                  Invitations sent to {invitedMembers.length} members.
                </p>
                <p className="text-sm md:text-base text-zinc-600 mt-4">Redirecting to Savings Groups...</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {showShareModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-zinc-900 mb-2">Group Created Successfully!</h3>
              <p className="text-sm text-zinc-600">Share this link to invite more members</p>
            </div>

            <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-4 mb-4">
              <p className="text-xs text-zinc-500 mb-2">Share Link:</p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={groupShareLink}
                  readOnly
                  className="flex-1 px-3 py-2 bg-white border border-zinc-200 rounded text-xs"
                />
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(groupShareLink)
                    alert("Link copied to clipboard!")
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs"
                >
                  Copy
                </Button>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <Button
                onClick={() => {
                  const whatsappText = encodeURIComponent(
                    `Join my savings group "${formData.groupName}"! ${groupShareLink}`,
                  )
                  window.open(`https://wa.me/?text=${whatsappText}`, "_blank")
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Share via WhatsApp
              </Button>
              <Button
                onClick={() => {
                  const subject = encodeURIComponent(`Join "${formData.groupName}" Savings Group`)
                  const body = encodeURIComponent(
                    `I've created a savings group and would love for you to join!\n\nGroup: ${formData.groupName}\nDescription: ${formData.description}\n\nClick here to join: ${groupShareLink}`,
                  )
                  window.open(`mailto:?subject=${subject}&body=${body}`)
                }}
                variant="outline"
                className="w-full"
              >
                Share via Email
              </Button>
            </div>

            <Button
              onClick={() => {
                setShowShareModal(false)
                setTimeout(() => router.push("/savings-groups"), 500)
              }}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
            >
              Go to My Groups
            </Button>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
