"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
// import { useAuth } from "@/lib/auth-context"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { CheckCircle, Upload, FileText, DollarSign, Shield } from "lucide-react"

export const dynamic = "force-dynamic"

export default function KYCVerificationPage() {
  const router = useRouter()
  // const { user, isLoading } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Identity Verification
    idType: "",
    idNumber: "",
    idDocument: null,
    // Address Verification
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    proofOfAddress: null,
    // Income Verification
    employmentStatus: "",
    monthlyIncome: "",
    incomeProof: null,
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

  const kycSteps = [
    {
      step: 1,
      title: "Identity Verification",
      description: "Upload government-issued ID",
      status: currentStep > 1 ? "completed" : currentStep === 1 ? "active" : "pending",
      icon: FileText,
    },
    {
      step: 2,
      title: "Address Verification",
      description: "Provide proof of residence",
      status: currentStep > 2 ? "completed" : currentStep === 2 ? "active" : "pending",
      icon: Shield,
    },
    {
      step: 3,
      title: "Income Verification",
      description: "Verify your income source",
      status: currentStep > 3 ? "completed" : currentStep === 3 ? "active" : "pending",
      icon: DollarSign,
    },
    {
      step: 4,
      title: "Final Review",
      description: "Awaiting final approval",
      status: currentStep === 4 ? "active" : "pending",
      icon: CheckCircle,
    },
  ]

  const handleFileChange = (field: string, file: File | null) => {
    setFormData((prev) => ({ ...prev, [field]: file }))
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    } else {
      // Submit form
      router.push("/verify-kyc")
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">ID Type</label>
              <select
                value={formData.idType}
                onChange={(e) => handleInputChange("idType", e.target.value)}
                className="w-full px-4 py-3 text-base border border-zinc-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
              >
                <option value="">Select ID Type</option>
                <option value="national_id">National ID</option>
                <option value="passport">Passport</option>
                <option value="drivers_license">Driver's License</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">ID Number</label>
              <input
                type="text"
                value={formData.idNumber}
                onChange={(e) => handleInputChange("idNumber", e.target.value)}
                placeholder="Enter your ID number"
                className="w-full px-4 py-3 text-base border border-zinc-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Upload ID Document</label>
              <div className="border-2 border-dashed border-zinc-300 rounded-lg p-6 text-center hover:border-red-600 transition-colors">
                <Upload className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
                <input
                  type="file"
                  onChange={(e) => handleFileChange("idDocument", e.target.files?.[0] || null)}
                  className="hidden"
                  id="id-document"
                  accept="image/*,.pdf"
                />
                <label htmlFor="id-document" className="cursor-pointer">
                  <span className="text-sm text-red-600 font-medium">Click to upload</span>
                  <p className="text-xs text-zinc-500 mt-1">PNG, JPG or PDF (max. 5MB)</p>
                </label>
              </div>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Address Line 1</label>
              <input
                type="text"
                value={formData.addressLine1}
                onChange={(e) => handleInputChange("addressLine1", e.target.value)}
                placeholder="Street address"
                className="w-full px-4 py-3 text-base border border-zinc-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Address Line 2 (Optional)</label>
              <input
                type="text"
                value={formData.addressLine2}
                onChange={(e) => handleInputChange("addressLine2", e.target.value)}
                placeholder="Apartment, suite, etc."
                className="w-full px-4 py-3 text-base border border-zinc-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  placeholder="City"
                  className="w-full px-4 py-3 text-base border border-zinc-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">State</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  placeholder="State"
                  className="w-full px-4 py-3 text-base border border-zinc-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Postal Code</label>
              <input
                type="text"
                value={formData.postalCode}
                onChange={(e) => handleInputChange("postalCode", e.target.value)}
                placeholder="Postal code"
                className="w-full px-4 py-3 text-base border border-zinc-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Proof of Address</label>
              <div className="border-2 border-dashed border-zinc-300 rounded-lg p-6 text-center hover:border-red-600 transition-colors">
                <Upload className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
                <input
                  type="file"
                  onChange={(e) => handleFileChange("proofOfAddress", e.target.files?.[0] || null)}
                  className="hidden"
                  id="proof-of-address"
                  accept="image/*,.pdf"
                />
                <label htmlFor="proof-of-address" className="cursor-pointer">
                  <span className="text-sm text-red-600 font-medium">Click to upload</span>
                  <p className="text-xs text-zinc-500 mt-1">Utility bill, bank statement, etc.</p>
                </label>
              </div>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Employment Status</label>
              <select
                value={formData.employmentStatus}
                onChange={(e) => handleInputChange("employmentStatus", e.target.value)}
                className="w-full px-4 py-3 text-base border border-zinc-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
              >
                <option value="">Select Status</option>
                <option value="employed">Employed</option>
                <option value="self_employed">Self-Employed</option>
                <option value="unemployed">Unemployed</option>
                <option value="retired">Retired</option>
                <option value="student">Student</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Monthly Income (XAF)</label>
              <input
                type="number"
                value={formData.monthlyIncome}
                onChange={(e) => handleInputChange("monthlyIncome", e.target.value)}
                placeholder="Enter monthly income"
                className="w-full px-4 py-3 text-base border border-zinc-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Proof of Income</label>
              <div className="border-2 border-dashed border-zinc-300 rounded-lg p-6 text-center hover:border-red-600 transition-colors">
                <Upload className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
                <input
                  type="file"
                  onChange={(e) => handleFileChange("incomeProof", e.target.files?.[0] || null)}
                  className="hidden"
                  id="income-proof"
                  accept="image/*,.pdf"
                />
                <label htmlFor="income-proof" className="cursor-pointer">
                  <span className="text-sm text-red-600 font-medium">Click to upload</span>
                  <p className="text-xs text-zinc-500 mt-1">Payslip, tax return, etc.</p>
                </label>
              </div>
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-4 text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
            <h3 className="text-xl font-bold text-zinc-900">Review Your Information</h3>
            <p className="text-sm text-zinc-600">
              Please review all the information you've provided. Once submitted, your KYC verification will be processed
              within 24-48 hours.
            </p>
            <div className="bg-zinc-50 rounded-lg p-4 text-left space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600">ID Type:</span>
                <span className="font-medium text-zinc-900">{formData.idType || "Not provided"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600">ID Number:</span>
                <span className="font-medium text-zinc-900">{formData.idNumber || "Not provided"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600">Address:</span>
                <span className="font-medium text-zinc-900">
                  {formData.addressLine1 ? `${formData.addressLine1}, ${formData.city}` : "Not provided"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600">Employment:</span>
                <span className="font-medium text-zinc-900">{formData.employmentStatus || "Not provided"}</span>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const progress = (currentStep / 4) * 100

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8 space-y-6 md:space-y-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-900">KYC Verification</h2>
          <p className="text-sm md:text-base text-zinc-600 mt-1 md:mt-2">
            Complete your verification to unlock all features
          </p>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-xl border border-zinc-200 p-4 md:p-8">
          <div className="mb-6 md:mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base md:text-lg font-bold text-zinc-900">Verification Progress</h3>
              <span className="text-xl md:text-2xl font-bold text-red-600">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-zinc-200 rounded-full h-2 md:h-3">
              <div
                className="bg-gradient-to-r from-red-600 to-red-700 h-2 md:h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Steps Indicator */}
          <div className="grid grid-cols-4 gap-2 md:gap-4 mb-6 md:mb-8">
            {kycSteps.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.step} className="flex flex-col items-center gap-2">
                  <div
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all ${
                      item.status === "completed"
                        ? "bg-green-100"
                        : item.status === "active"
                          ? "bg-red-100"
                          : "bg-zinc-100"
                    }`}
                  >
                    {item.status === "completed" ? (
                      <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                    ) : (
                      <Icon
                        className={`w-5 h-5 md:w-6 md:h-6 ${item.status === "active" ? "text-red-600" : "text-zinc-400"}`}
                      />
                    )}
                  </div>
                  <span className="text-xs text-center text-zinc-600 hidden md:block">{item.title}</span>
                </div>
              )
            })}
          </div>

          {/* Current Step Content */}
          <div className="mb-6 md:mb-8">
            <h3 className="text-lg md:text-xl font-bold text-zinc-900 mb-2">{kycSteps[currentStep - 1].title}</h3>
            <p className="text-sm text-zinc-600 mb-4 md:mb-6">{kycSteps[currentStep - 1].description}</p>
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3">
            {currentStep > 1 && (
              <Button
                onClick={handlePrevious}
                variant="outline"
                className="flex-1 border-zinc-200 hover:bg-zinc-50 bg-transparent"
              >
                Previous
              </Button>
            )}
            <Button
              onClick={handleNext}
              className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
            >
              {currentStep === 4 ? "Submit for Review" : "Next Step"}
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
