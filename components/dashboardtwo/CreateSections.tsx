"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { ArrowRight, Lock, Plus, Zap } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface SavingsGoal {
  id: number | string
  name: string
  description?: string
  targetAmount?: number
  amountSaved?: number
  frequency?: string
  duration?: number
  createdAt?: string
//   transactions?: Transaction[]
  title?: string // Added for potential consistency, though 'name' is used more
  status?: string // Added for savings goals
}

// Define a more specific type for SavingsGroup
interface SavingsGroup {
  id: number
  groupName: string
  description: string
  target: number
  current: number
  members: number
  monthlyTarget: number
  creatorName: string
  invitedMembers?: any[] // Assuming this might exist based on the update
  totalMembers?: number // Added based on the update
}


const CreateSections = () => {
  const router = useRouter()
  const [kycAccepted, setKycAccepted] = useState(false)
  const [savingsGroups, setSavingsGroups] = useState<SavingsGroup[]>([]) // Use the specific SavingsGroup type
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([])

  return (
    <div>
        <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-zinc-900">My Savings Goals</h2>
                <Button
                  onClick={() => router.push("/create-savings-plan")}
                  size="sm"
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Goal
                </Button>
              </div>

              {savingsGoals.length > 0 ? (
                <div className="space-y-3">
                  {savingsGoals.slice(0, 3).map((goal) => (
                    <div key={goal.id} className="bg-white rounded-xl p-4 border border-zinc-200">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <p className="font-semibold text-zinc-900 text-sm">{goal.name}</p>
                          <p className="text-xs text-zinc-500 mt-1">{goal.description}</p>
                        </div>
                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-700">
                          {goal.status || "Active"}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-zinc-600">
                          <span>Target: {(goal.targetAmount || 0)} XAF</span>
                          <span>
                            {goal.frequency} • {goal.duration}mo
                          </span>
                        </div>
                        <div className="w-full bg-zinc-200 rounded-full h-1.5">
                          <div
                            className="bg-gradient-to-r from-red-600 to-red-800 h-1.5 rounded-full"
                            style={{ width: `${(goal.amountSaved! / goal.targetAmount!) * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-red-600 font-semibold">
                          {(goal.amountSaved!)} "XAF" saved ({Math.round((goal.amountSaved! / goal.targetAmount!) * 100)}%)
                        </p>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button
                        //   onClick={() => handleSaveNow(goal)} // Changed to use handleSaveNow
                          size="sm"
                          className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-xs"
                        >
                          Save Now
                        </Button>
                        <Button
                          onClick={() => {
                            // setSelectedGoal(goal)
                            // setShowHistoryModal(true)
                          }}
                          size="sm"
                          variant="outline"
                          className="flex-1 border-red-200 text-red-600 hover:bg-red-50 text-xs"
                        >
                          View History
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-zinc-50 rounded-xl p-6 text-center border border-zinc-200">
                  <p className="text-sm text-zinc-600 mb-3">No savings goals yet</p>
                  <Button
                    onClick={() => router.push("/create-savings-plan")}
                    size="sm"
                    variant="outline"
                    className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                  >
                    Create Your First Goal
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between mt-6">
                <h2 className="text-xl font-bold text-zinc-900">Saving Groups</h2>
                <Button
                  size="sm"
                  className={`rounded-lg ${
                    kycAccepted // This condition now correctly uses the kycAccepted state
                      ? "bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white"
                      : "bg-zinc-200 text-zinc-400 cursor-not-allowed"
                  }`}
                  onClick={() => router.push("/create-savings-group")}
                  disabled={!kycAccepted} // This condition now correctly uses the kycAccepted state
                >
                  {!kycAccepted && <Lock className="w-4 h-4 mr-2" />}{" "}
                  {/* This condition now correctly uses the kycAccepted state */}
                  Create Group
                </Button>
              </div>

              {savingsGroups.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                  {savingsGroups.slice(0, 2).map((group) => (
                    <div
                      key={group.id}
                      className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="font-bold text-zinc-900">{group.groupName}</p>
                          <p className="text-xs text-zinc-500 mt-1">
                            {group.totalMembers || (group.invitedMembers?.length || 0) + 1} members
                          </p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-zinc-600">Created by: {group.creatorName}</p>
                          <p className="text-xs text-zinc-500">{group.description}</p>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button
                            size="sm"
                            className="flex-1 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white rounded-lg h-9"
                            onClick={() => router.push(`/group-details/${group.id}`)}
                          >
                            View <ArrowRight className="w-3 h-3 ml-1" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 border-zinc-200 text-zinc-700 rounded-lg h-9 bg-transparent"
                            onClick={() => router.push("/savings-groups")}
                          >
                            Manage
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-zinc-50 rounded-xl p-6 text-center border border-zinc-200">
                  <p className="text-sm text-zinc-600 mb-3">No savings groups yet</p>
                  <Button
                    onClick={() => router.push("/create-savings-group")}
                    size="sm"
                    variant="outline"
                    className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                  >
                    Create Your First Group
                  </Button>
                </div>
              )}
            </div>

            <div className="hidden lg:block space-y-4">
              <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2 mt-6">
                <Zap className="w-5 h-5 text-brand-red" />
                AI SmartSave
              </h3>
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border border-red-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1">
                    <p className="font-semibold text-zinc-900 mb-1">Get AI-Powered Savings Recommendations</p>
                    <p className="text-sm text-zinc-600">Let our AI create personalized savings plans based on your goals</p>
                  </div>
                </div>
                <Button
                  onClick={() => router.push("/ai-smartsave")}
                  className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white rounded-lg h-11 font-semibold"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Start AI SmartSave
                </Button>
              </div>
            </div>
        </div>
  )
}

export default CreateSections