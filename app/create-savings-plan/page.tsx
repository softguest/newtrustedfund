"use client"

export const dynamic = "force-dynamic"

import { useState } from "react"
import { useRouter } from "next/navigation"
// import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { DashboardLayout } from "@/components/dashboard-layout"
import { XAF } from "@/lib/currency"
import { TrendingUp, Calendar, Zap, Smartphone, CreditCard } from "lucide-react"
import { useUser } from "@clerk/nextjs"

export default function CreateSavingsPlanPage() {
  const router = useRouter()
  // const { user, isLoading, verifyPin } = useAuth()
  const {user} = useUser();
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    goalTitle: "",
    description: "",
    targetAmount: "",
    frequency: "monthly",
    duration: "6",
  })
  const [calculations, setCalculations] = useState<any>(null)
  const [submitted, setSubmitted] = useState(false)
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("")
  const [savingAmount, setSavingAmount] = useState("")
  const [showPinModal, setShowPinModal] = useState(false)
  const [pinInput, setPinInput] = useState("")
  const [pinError, setPinError] = useState("")

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

  const calculateProjectedSavings = () => {
    const targetAmount = Number.parseFloat(formData.targetAmount) || 0
    const durationMonths = Number.parseInt(formData.duration) || 6

    // Calculate number of periods based on frequency
    let periodsPerMonth = 1
    let periodLabel = "month"

    if (formData.frequency === "daily") {
      periodsPerMonth = 30
      periodLabel = "day"
    } else if (formData.frequency === "weekly") {
      periodsPerMonth = 4.33
      periodLabel = "week"
    } else if (formData.frequency === "bi-weekly") {
      periodsPerMonth = 2.17
      periodLabel = "2 weeks"
    } else if (formData.frequency === "monthly") {
      periodsPerMonth = 1
      periodLabel = "month"
    }

    // Calculate total periods
    const totalPeriods = durationMonths * periodsPerMonth

    // Calculate required savings per period
    const requiredPerPeriod = targetAmount > 0 ? targetAmount / totalPeriods : 0

    const projections = {
      requiredPerPeriod: requiredPerPeriod,
      totalPeriods: Math.round(totalPeriods),
      periodLabel: periodLabel,
      month1: requiredPerPeriod * Math.min(periodsPerMonth, totalPeriods),
      month3: requiredPerPeriod * Math.min(periodsPerMonth * 3, totalPeriods),
      month6: requiredPerPeriod * Math.min(periodsPerMonth * 6, totalPeriods),
      month12: requiredPerPeriod * Math.min(periodsPerMonth * 12, totalPeriods),
      targetAmount: targetAmount,
    }

    setCalculations(projections)
  }

  const handleNextStep = () => {
    if (step === 1) {
      if (formData.goalTitle && formData.description) {
        setStep(2)
      }
    }
  }

  const handleCalculate = () => {
    if (formData.targetAmount) {
      calculateProjectedSavings()
    }
  }

  const handleCreateGoal = () => {
    const newGoal = {
      id: Date.now(),
      name: formData.goalTitle,
      description: formData.description,
      targetAmount: Number.parseFloat(formData.targetAmount),
      amountSaved: 0,
      requiredPerPeriod: calculations.requiredPerPeriod,
      frequency: formData.frequency,
      duration: formData.duration,
      status: "active",
      createdAt: new Date().toISOString(),
      projections: calculations,
    }

    // Get existing goals
    const existingGoals = JSON.parse(localStorage.getItem("savings_goals") || "[]")
    existingGoals.push(newGoal)
    localStorage.setItem("savings_goals", JSON.stringify(existingGoals))

    setSubmitted(true)
    setTimeout(() => {
      router.push("/verify-kyc")
    }, 2000)
  }

  const handleSaveNow = () => {
    setSavingAmount(String(calculations.requiredPerPeriod))
    setShowSaveModal(true)
  }

  // const handleVerifyPin = () => {
  //   if (!verifyPin(pinInput)) {
  //     setPinError("Invalid PIN. Please try again.")
  //     return
  //   }

  //   // Save transaction
  //   const newTransaction = {
  //     id: Date.now(),
  //     goalId: formData.goalTitle,
  //     amount: Number.parseFloat(savingAmount),
  //     paymentMethod: selectedPaymentMethod,
  //     status: "completed",
  //     date: new Date().toISOString(),
  //   }

  //   const existingTransactions = JSON.parse(localStorage.getItem("savings_transactions") || "[]")
  //   existingTransactions.push(newTransaction)
  //   localStorage.setItem("savings_transactions", JSON.stringify(existingTransactions))

  //   setShowPinModal(false)
  //   setShowSaveModal(false)

  //   // Show success notification
  //   setTimeout(() => {
  //     alert("Savings locked until withdrawal date. You'll receive reminders based on your frequency.")
  //   }, 500)
  // }

  return (
    <DashboardLayout>
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          {!submitted ? (
            <div className="max-w-3xl mx-auto">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-zinc-900">Create Savings Goal</h2>
                <p className="text-zinc-600 mt-2">
                  Set up a personalized savings goal and visualize your progress over time
                </p>
              </div>

              {/* Step Indicator */}
              <div className="flex items-center gap-4 mb-8">
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                    step === 1 ? "bg-red-100 text-red-700" : "bg-zinc-100 text-zinc-500"
                  }`}
                >
                  <span className="font-bold">1</span>
                  <span className="text-sm">Goal Details</span>
                </div>
                <div className="flex-1 h-1 bg-zinc-200"></div>
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                    step === 2 ? "bg-red-100 text-red-700" : "bg-zinc-100 text-zinc-500"
                  }`}
                >
                  <span className="font-bold">2</span>
                  <span className="text-sm">Savings Plan</span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-zinc-200 p-8 shadow-sm space-y-6">
                {step === 1 ? (
                  <>
                    <div>
                      <label className="block text-sm font-bold text-zinc-900 mb-2">Goal Title *</label>
                      <input
                        type="text"
                        required
                        value={formData.goalTitle}
                        onChange={(e) => setFormData({ ...formData, goalTitle: e.target.value })}
                        className="w-full px-4 py-3 border border-zinc-200 rounded-lg focus:outline-none focus:border-red-600"
                        placeholder="e.g., Emergency Fund, New Car, Wedding..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-zinc-900 mb-2">Goal Description *</label>
                      <textarea
                        required
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-3 border border-zinc-200 rounded-lg focus:outline-none focus:border-red-600"
                        placeholder="Describe what you're saving for and why it matters to you..."
                        rows={4}
                      />
                      <p className="text-xs text-zinc-500 mt-1">
                        A clear description helps you stay motivated and committed to your goal
                      </p>
                    </div>

                    <Button
                      onClick={handleNextStep}
                      disabled={!formData.goalTitle || !formData.description}
                      className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3"
                    >
                      Continue to Savings Plan
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-zinc-900 mb-2">Target Amount (XAF) *</label>
                        <input
                          type="number"
                          required
                          value={formData.targetAmount}
                          onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
                          className="w-full px-4 py-3 border border-zinc-200 rounded-lg focus:outline-none focus:border-red-600"
                          placeholder="500000"
                        />
                        <p className="text-xs text-zinc-500 mt-1">How much do you want to save?</p>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-zinc-900 mb-2">Savings Duration *</label>
                        <select
                          value={formData.duration}
                          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                          className="w-full px-4 py-3 border border-zinc-200 rounded-lg focus:outline-none focus:border-red-600"
                        >
                          <option value="1">1 Month</option>
                          <option value="3">3 Months</option>
                          <option value="6">6 Months</option>
                          <option value="12">12 Months</option>
                          <option value="24">24 Months</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-zinc-900 mb-2">How often will you save? *</label>
                      <select
                        value={formData.frequency}
                        onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                        className="w-full px-4 py-3 border border-zinc-200 rounded-lg focus:outline-none focus:border-red-600"
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="bi-weekly">Bi-weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                      <p className="text-xs text-zinc-500 mt-1">
                        We'll calculate how much you need to save each period
                      </p>
                    </div>

                    <Button
                      onClick={handleCalculate}
                      disabled={!formData.targetAmount}
                      variant="outline"
                      className="w-full border-red-200 text-red-600 hover:bg-red-50 bg-transparent py-3"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Calculate Required Savings
                    </Button>

                    {calculations && (
                      <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border border-red-200 space-y-6">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-red-600" />
                          <h3 className="font-bold text-zinc-900 text-lg">Your Savings Plan</h3>
                        </div>

                        <div className="bg-white rounded-lg p-6 space-y-4 border-2 border-red-600">
                          <div className="text-center">
                            <p className="text-sm text-zinc-600 mb-2">
                              Required savings per {calculations.periodLabel}
                            </p>
                            <p className="text-4xl font-bold text-red-600">{XAF(calculations.requiredPerPeriod)}</p>
                          </div>
                          <div className="pt-4 border-t border-zinc-200 text-center">
                            <p className="text-xs text-zinc-600">Total periods: {calculations.totalPeriods}</p>
                            <p className="text-xs text-zinc-600">Target: {XAF(calculations.targetAmount)}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="bg-white rounded-lg p-4">
                            <p className="text-xs text-zinc-600 mb-1">After 1 Month</p>
                            <p className="text-lg font-bold text-red-600">{XAF(calculations.month1)}</p>
                          </div>
                          <div className="bg-white rounded-lg p-4">
                            <p className="text-xs text-zinc-600 mb-1">After 3 Months</p>
                            <p className="text-lg font-bold text-red-600">{XAF(calculations.month3)}</p>
                          </div>
                          <div className="bg-white rounded-lg p-4">
                            <p className="text-xs text-zinc-600 mb-1">After 6 Months</p>
                            <p className="text-lg font-bold text-red-600">{XAF(calculations.month6)}</p>
                          </div>
                          <div className="bg-white rounded-lg p-4">
                            <p className="text-xs text-zinc-600 mb-1">After 12 Months</p>
                            <p className="text-lg font-bold text-red-600">{XAF(calculations.month12)}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-4">
                      <Button
                        onClick={handleCreateGoal}
                        disabled={!calculations}
                        className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Create Savings Goal
                      </Button>
                      <Button
                        onClick={() => setStep(1)}
                        variant="outline"
                        className="flex-1 border-zinc-200 hover:bg-zinc-50 bg-transparent py-3"
                      >
                        Back
                      </Button>
                    </div>

                    {calculations && (
                      <div className="grid grid-cols-2 gap-4">
                        <Button onClick={handleSaveNow} className="bg-green-600 hover:bg-green-700 text-white py-3">
                          <Smartphone className="w-4 h-4 mr-2" />
                          Save Now
                        </Button>
                        <Button
                          onClick={() => router.push("/savings-history")}
                          variant="outline"
                          className="border-zinc-200 hover:bg-zinc-50 bg-transparent py-3"
                        >
                          <TrendingUp className="w-4 h-4 mr-2" />
                          View History
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 mb-2">Goal Created Successfully!</h3>
                <p className="text-zinc-600">Your savings goal has been created. Redirecting to dashboard...</p>
              </div>
            </div>
          )}
        </div>

        {showSaveModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-zinc-900">How would you like to pay?</h3>
                <p className="text-sm text-zinc-600 mt-1">Amount: {XAF(Number.parseFloat(savingAmount))}</p>
              </div>

              <div className="space-y-3">
                <div
                  onClick={() => setSelectedPaymentMethod("account")}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                    selectedPaymentMethod === "account" ? "border-red-600 bg-red-50" : "border-zinc-200"
                  }`}
                >
                  <p className="font-semibold text-zinc-900">Main Account Balance</p>
                  <p className="text-sm text-zinc-600">Deduct from your account</p>
                </div>

                <div
                  onClick={() => setSelectedPaymentMethod("mtn")}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                    selectedPaymentMethod === "mtn" ? "border-red-600 bg-red-50" : "border-zinc-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-yellow-500" />
                    <div>
                      <p className="font-semibold text-zinc-900">MTN Mobile Money</p>
                      <p className="text-sm text-zinc-600">Send from your MTN account</p>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => setSelectedPaymentMethod("orange")}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                    selectedPaymentMethod === "orange" ? "border-red-600 bg-red-50" : "border-zinc-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="font-semibold text-zinc-900">Orange Money</p>
                      <p className="text-sm text-zinc-600">Send from your Orange account</p>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => setSelectedPaymentMethod("card")}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                    selectedPaymentMethod === "card" ? "border-red-600 bg-red-50" : "border-zinc-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-semibold text-zinc-900">Credit Card</p>
                      <p className="text-sm text-zinc-600">Pay with your credit card</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => {
                    setShowSaveModal(false)
                    setSelectedPaymentMethod("")
                  }}
                  variant="outline"
                  className="flex-1 border-zinc-200"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    if (selectedPaymentMethod) {
                      setShowSaveModal(false)
                      setShowPinModal(true)
                    }
                  }}
                  disabled={!selectedPaymentMethod}
                  className="flex-1 bg-gradient-to-r from-red-600 to-red-700"
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        )}

        {showPinModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-zinc-900">Enter Transaction PIN</h3>
                <p className="text-sm text-zinc-600 mt-1">Required to confirm your saving</p>
              </div>

              <div>
                <input
                  type="password"
                  maxLength={4}
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value.slice(-4))
                    setPinError("")
                  }}
                  className="w-full px-4 py-3 border-2 border-zinc-200 rounded-lg focus:outline-none focus:border-red-600 text-center text-2xl tracking-widest"
                  placeholder="••••"
                />
                {pinError && <p className="text-sm text-red-600 mt-2">{pinError}</p>}
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => {
                    setShowPinModal(false)
                    setPinInput("")
                    setPinError("")
                  }}
                  variant="outline"
                  className="flex-1 border-zinc-200"
                >
                  Cancel
                </Button>
                <Button
                  // onClick={handleVerifyPin}
                  disabled={pinInput.length !== 4}
                  className="flex-1 bg-gradient-to-r from-red-600 to-red-700"
                >
                  Verify
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
