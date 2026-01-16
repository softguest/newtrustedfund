"use client"

export const dynamic = "force-dynamic"

import type React from "react"
import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
// import { createClient } from "@/lib/supabase/client"
// import { useAuth } from "@/lib/auth-context"

import { Button } from "@/components/ui/button"
import { DashboardLayout } from "@/components/dashboard-layout"
import { AlertCircle, CheckCircle, Upload } from "lucide-react"
import { useUser } from "@clerk/nextjs"

type Step = "personal" | "address" | "documents" | "income" | "review"

interface FormData {
  // Personal Details
  full_name: string
  email: string
  phone: string
  title: string
  gender: string
  date_of_birth: string
  zipcode: string

  // Address
  address_line: string
  city: string
  state: string
  nationality: string

  // Documents
  government_id_type: "passport" | "national_id" | "drivers_license"
  document_front: File | null
  document_back: File | null
  passport_photo: File | null

  // Income
  income_source: string
  annual_income: string
}

export default function KYCFormPage() {
  const router = useRouter()
  const { user } = useUser()
  // const supabase = createClient()

  const [currentStep, setCurrentStep] = useState<Step>("personal")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  // const [formData, setFormData] = useState<FormData>({
  //   full_name: "",
  //   email: user?.emailAddresses || "",
  //   phone: "",
  //   title: "",
  //   gender: "",
  //   date_of_birth: "",
  //   zipcode: "",
  //   address_line: "",
  //   city: "",
  //   state: "",
  //   nationality: "Cameroon",
  //   government_id_type: "passport",
  //   document_front: null,
  //   document_back: null,
  //   passport_photo: null,
  //   income_source: "",
  //   annual_income: "",
  // })

  const [uploadedFiles, setUploadedFiles] = useState({
    document_front: false,
    document_back: false,
    passport_photo: false,
  })

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
  //   const { name, value } = e.target
  //   setFormData((prev) => ({ ...prev, [name]: value }))
  // }

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: keyof typeof uploadedFiles) => {
  //   const file = e.target.files?.[0]
  //   if (file && file.size <= 2 * 1024 * 1024) {
  //     setFormData((prev) => ({ ...prev, [fileType]: file }))
  //     setUploadedFiles((prev) => ({ ...prev, [fileType]: true }))
  //   } else {
  //     setError("File must be less than 2MB")
  //   }
  // }

  // const handleDragDrop = useCallback((e: React.DragEvent<HTMLDivElement>, fileType: keyof typeof uploadedFiles) => {
  //   e.preventDefault()
  //   const file = e.dataTransfer.files?.[0]
  //   if (file && file.size <= 2 * 1024 * 1024) {
  //     setFormData((prev) => ({ ...prev, [fileType]: file }))
  //     setUploadedFiles((prev) => ({ ...prev, [fileType]: true }))
  //   }
  // }, [])

  // const validateStep = (): boolean => {
  //   setError("")

  //   switch (currentStep) {
  //     case "personal":
  //       if (!formData.full_name || !formData.phone || !formData.title || !formData.gender || !formData.date_of_birth) {
  //         setError("Please fill in all personal details")
  //         return false
  //       }
  //       return true

  //     case "address":
  //       if (!formData.address_line || !formData.city || !formData.state) {
  //         setError("Please fill in all address fields")
  //         return false
  //       }
  //       return true

  //     case "documents":
  //       if (!formData.document_front || !formData.document_back || !formData.passport_photo) {
  //         setError("Please upload all required documents")
  //         return false
  //       }
  //       return true

  //     case "income":
  //       if (!formData.income_source || !formData.annual_income) {
  //         setError("Please provide income information")
  //         return false
  //       }
  //       return true

  //     default:
  //       return true
  //   }
  // }

  const steps: { id: Step; label: string; icon: string }[] = [
    { id: "personal", label: "Personal", icon: "👤" },
    { id: "address", label: "Address", icon: "📍" },
    { id: "documents", label: "Documents", icon: "📄" },
    { id: "income", label: "Income", icon: "💰" },
    { id: "review", label: "Review", icon: "✓" },
  ]

  // const handleNextStep = () => {
  //   if (validateStep()) {
  //     const stepIndex = steps.findIndex((s) => s.id === currentStep)
  //     if (stepIndex < steps.length - 1) {
  //       setCurrentStep(steps[stepIndex + 1].id)
  //     }
  //   }
  // }

  const handlePreviousStep = () => {
    const stepIndex = steps.findIndex((s) => s.id === currentStep)
    if (stepIndex > 0) {
      setCurrentStep(steps[stepIndex - 1].id)
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setError("")

    try {
      if (!user?.id) {
        throw new Error("User not authenticated")
      }

      // Upload files to Supabase storage
      let documentFrontUrl = ""
      let documentBackUrl = ""
      let passportPhotoUrl = ""

      // if (formData.document_front) {
      //   const { data, error: uploadError } = await supabase.storage
      //     .from("kyc_documents")
      //     .upload(`${user.id}/document_front_${Date.now()}`, formData.document_front)

      //   if (uploadError) throw uploadError
      //   documentFrontUrl = data?.path || ""
      // }

      // if (formData.document_back) {
      //   const { data, error: uploadError } = await supabase.storage
      //     .from("kyc_documents")
      //     .upload(`${user.id}/document_back_${Date.now()}`, formData.document_back)

      //   if (uploadError) throw uploadError
      //   documentBackUrl = data?.path || ""
      // }

      // if (formData.passport_photo) {
      //   const { data, error: uploadError } = await supabase.storage
      //     .from("kyc_documents")
      //     .upload(`${user.id}/passport_photo_${Date.now()}`, formData.passport_photo)

      //   if (uploadError) throw uploadError
      //   passportPhotoUrl = data?.path || ""
      // }

      // Submit KYC data
      // const { error: submitError } = await supabase.from("kyc_submissions").insert([
      //   {
      //     user_id: user.id,
      //     email: formData.email,
      //     full_name: formData.full_name,
      //     phone_number: formData.phone,
      //     date_of_birth: formData.date_of_birth,
      //     government_id_type: formData.government_id_type,
      //     address: formData.address_line,
      //     city: formData.city,
      //     country: formData.nationality,
      //     postal_code: formData.zipcode,
      //     id_document_url: documentFrontUrl,
      //     proof_of_address_url: documentBackUrl,
      //     status: "pending",
      //   },
      // ])

      // if (submitError) throw submitError

      setSuccess(true)

      // Update user KYC status
      const updatedUser = { ...user, kycSubmitted: true, kycStatus: "pending" }
      localStorage.setItem("cstrustfunds_user", JSON.stringify(updatedUser))

      setTimeout(() => {
        router.push("/verify-kyc")
      }, 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit KYC")
      console.error("[v0] KYC submission error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-2xl p-8 text-center shadow-lg">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2 text-zinc-900">KYC Submitted</h2>
            <p className="text-zinc-600 mb-2">Your verification documents have been received.</p>
            <p className="text-sm text-zinc-500 mb-6">Our team will review and notify you shortly.</p>
            <p className="text-xs text-zinc-400">Redirecting to dashboard...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 mb-2">KYC Verification</h1>
          <p className="text-zinc-600">Dashboard &gt; Account Verification</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 flex justify-between items-center">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center flex-1">
              <button
                onClick={() => {
                  const stepIndex = steps.findIndex((s) => s.id === currentStep)
                  if (index <= stepIndex) {
                    setCurrentStep(step.id)
                  }
                }}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold mb-2 transition-colors ${
                  steps.findIndex((s) => s.id === currentStep) >= index
                    ? "bg-red-600 text-white"
                    : "bg-zinc-200 text-zinc-600"
                }`}
              >
                {index + 1}
              </button>
              <span className="text-sm text-zinc-600 text-center">{step.label}</span>
              {index < steps.length - 1 && (
                <div
                  className={`h-1 w-12 my-2 ${
                    steps.findIndex((s) => s.id === currentStep) > index ? "bg-red-600" : "bg-zinc-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex gap-3 p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Form Content */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-zinc-200 mb-8">
          {/* Personal Details */}
          {currentStep === "personal" && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <span className="text-red-600 font-bold">👤</span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-zinc-900">Personal Details</h2>
                  <p className="text-sm text-zinc-600">Your personal information required for identification</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-900 mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="full_name"
                      // value={formData.full_name}
                      // onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="w-full p-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-900 mb-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      // value={formData.email}
                      disabled
                      className="w-full p-3 border border-zinc-300 rounded-lg bg-zinc-50 text-zinc-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-900 mb-1">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      // value={formData.phone}
                      // onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      className="w-full p-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-900 mb-1">Title *</label>
                    <select
                      name="title"
                      // value={formData.title}
                      // onChange={handleInputChange}
                      className="w-full p-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    >
                      <option value="">Select your title</option>
                      <option value="mr">Mr.</option>
                      <option value="ms">Ms.</option>
                      <option value="mrs">Mrs.</option>
                      <option value="dr">Dr.</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-900 mb-1">Gender *</label>
                    <select
                      name="gender"
                      // value={formData.gender}
                      // onChange={handleInputChange}
                      className="w-full p-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    >
                      <option value="">Select your gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-900 mb-1">Date of Birth *</label>
                    <input
                      type="date"
                      name="date_of_birth"
                      // value={formData.date_of_birth}
                      // onChange={handleInputChange}
                      className="w-full p-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-900 mb-1">Zipcode *</label>
                  <input
                    type="text"
                    name="zipcode"
                    // value={formData.zipcode}
                    // onChange={handleInputChange}
                    placeholder="Enter your zipcode"
                    className="w-full p-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Address */}
          {currentStep === "address" && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <span className="text-red-600 font-bold">📍</span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-zinc-900">Your Address</h2>
                  <p className="text-sm text-zinc-600">Your location information required for identification</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-900 mb-1">Address Line *</label>
                  <input
                    type="text"
                    name="address_line"
                    // value={formData.address_line}
                    // onChange={handleInputChange}
                    placeholder="Enter your street address"
                    className="w-full p-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-900 mb-1">City *</label>
                    <input
                      type="text"
                      name="city"
                      // value={formData.city}
                      // onChange={handleInputChange}
                      placeholder="Enter your city"
                      className="w-full p-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-900 mb-1">State *</label>
                    <input
                      type="text"
                      name="state"
                      // value={formData.state}
                      // onChange={handleInputChange}
                      placeholder="Enter your state"
                      className="w-full p-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-900 mb-1">Nationality *</label>
                  <input
                    type="text"
                    name="nationality"
                    // value={formData.nationality}
                    // onChange={handleInputChange}
                    className="w-full p-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Documents */}
          {currentStep === "documents" && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <span className="text-red-600 font-bold">📄</span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-zinc-900">Document Upload</h2>
                  <p className="text-sm text-zinc-600">Personal documents required for identity verification</p>
                </div>
              </div>

              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-zinc-900 mb-2">Document Types</h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Int'l Passport", value: "passport" },
                    { label: "National ID", value: "national_id" },
                    { label: "Driver's License", value: "drivers_license" },
                  ].map((type) => (
                    <button
                      key={type.value}
                      // onClick={() => setFormData((prev) => ({ ...prev, government_id_type: type.value as any }))}
                      // className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                      //   formData.government_id_type === type.value
                      //     ? "border-red-600 bg-red-50 text-red-600"
                      //     : "border-zinc-200 bg-white text-zinc-700 hover:border-red-300"
                      // }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                <h3 className="font-semibold text-zinc-900 mb-2">To avoid delays when verifying your information:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-zinc-700">
                  <li>Documents must not be expired</li>
                  <li>Pictures must be clear and not blurry</li>
                  <li>All corners must be visible</li>
                  <li>Max file size: 2MB</li>
                </ul>
              </div>

              <div className="space-y-6">
                {/* Document Front */}
                <div>
                  <label className="block text-sm font-medium text-zinc-900 mb-2">Document Front *</label>
                  <div
                    // onDrop={(e) => handleDragDrop(e, "document_front")}
                    onDragOver={(e) => e.preventDefault()}
                    className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${
                      uploadedFiles.document_front
                        ? "border-green-400 bg-green-50"
                        : "border-zinc-300 hover:border-red-400 hover:bg-red-50"
                    }`}
                  >
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      // onChange={(e) => handleFileChange(e, "document_front")}
                      className="hidden"
                      id="document_front"
                    />
                    <label htmlFor="document_front" className="cursor-pointer">
                      {uploadedFiles.document_front ? (
                        <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                      ) : (
                        <Upload className="w-12 h-12 text-zinc-400 mx-auto mb-3" />
                      )}
                      <p className="font-medium text-zinc-900">
                        {uploadedFiles.document_front ? "Document uploaded" : "Click or drag to upload"}
                      </p>
                      <p className="text-sm text-zinc-500 mt-1">PNG, JPG or PDF (max 2MB)</p>
                    </label>
                  </div>
                </div>

                {/* Document Back */}
                <div>
                  <label className="block text-sm font-medium text-zinc-900 mb-2">Document Back *</label>
                  <div
                    // onDrop={(e) => handleDragDrop(e, "document_back")}
                    onDragOver={(e) => e.preventDefault()}
                    className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${
                      uploadedFiles.document_back
                        ? "border-green-400 bg-green-50"
                        : "border-zinc-300 hover:border-red-400 hover:bg-red-50"
                    }`}
                  >
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      // onChange={(e) => handleFileChange(e, "document_back")}
                      className="hidden"
                      id="document_back"
                    />
                    <label htmlFor="document_back" className="cursor-pointer">
                      {uploadedFiles.document_back ? (
                        <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                      ) : (
                        <Upload className="w-12 h-12 text-zinc-400 mx-auto mb-3" />
                      )}
                      <p className="font-medium text-zinc-900">
                        {uploadedFiles.document_back ? "Document uploaded" : "Click or drag to upload"}
                      </p>
                      <p className="text-sm text-zinc-500 mt-1">PNG, JPG or PDF (max 2MB)</p>
                    </label>
                  </div>
                </div>

                {/* Passport Photo */}
                <div>
                  <label className="block text-sm font-medium text-zinc-900 mb-2">Passport Photo *</label>
                  <div
                    // onDrop={(e) => handleDragDrop(e, "passport_photo")}
                    onDragOver={(e) => e.preventDefault()}
                    className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${
                      uploadedFiles.passport_photo
                        ? "border-green-400 bg-green-50"
                        : "border-zinc-300 hover:border-red-400 hover:bg-red-50"
                    }`}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      // onChange={(e) => handleFileChange(e, "passport_photo")}
                      className="hidden"
                      id="passport_photo"
                    />
                    <label htmlFor="passport_photo" className="cursor-pointer">
                      {uploadedFiles.passport_photo ? (
                        <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                      ) : (
                        <Upload className="w-12 h-12 text-zinc-400 mx-auto mb-3" />
                      )}
                      <p className="font-medium text-zinc-900">
                        {uploadedFiles.passport_photo ? "Photo uploaded" : "Click or drag to upload"}
                      </p>
                      <p className="text-sm text-zinc-500 mt-1">PNG or JPG (max 2MB)</p>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Income */}
          {currentStep === "income" && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <span className="text-red-600 font-bold">💰</span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-zinc-900">Income Information</h2>
                  <p className="text-sm text-zinc-600">Financial information for compliance purposes</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-900 mb-1">Source of Income *</label>
                  <select
                    name="income_source"
                    // value={formData.income_source}
                    // onChange={handleInputChange}
                    className="w-full p-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  >
                    <option value="">Select your income source</option>
                    <option value="employment">Employment</option>
                    <option value="business">Business Owner</option>
                    <option value="freelance">Freelancer</option>
                    <option value="investment">Investment</option>
                    <option value="pension">Pension/Retirement</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-900 mb-1">Annual Income (XAF) *</label>
                  <input
                    type="number"
                    name="annual_income"
                    // value={formData.annual_income}
                    // onChange={handleInputChange}
                    placeholder="Enter your annual income"
                    className="w-full p-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Review */}
          {currentStep === "review" && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <span className="text-red-600 font-bold">✓</span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-zinc-900">Review & Submit</h2>
                  <p className="text-sm text-zinc-600">Please review all information before submission</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-zinc-50 rounded-lg p-4">
                  <h3 className="font-semibold text-zinc-900 mb-3">Personal Details</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-zinc-600">Full Name:</span>
                      <p className="font-medium text-zinc-900">
                        {/* {formData.full_name} */}
                        </p>
                    </div>
                    <div>
                      <span className="text-zinc-600">Email:</span>
                      <p className="font-medium text-zinc-900">
                        {/* {formData.email} */}
                        </p>
                    </div>
                    <div>
                      <span className="text-zinc-600">Phone:</span>
                      <p className="font-medium text-zinc-900">
                        {/* {formData.phone} */}
                        </p>
                    </div>
                    <div>
                      <span className="text-zinc-600">Date of Birth:</span>
                      <p className="font-medium text-zinc-900">
                        {/* {formData.date_of_birth} */}
                        </p>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-50 rounded-lg p-4">
                  <h3 className="font-semibold text-zinc-900 mb-3">Address</h3>
                  <div className="text-sm">
                    <p className="font-medium text-zinc-900">
                      {/* {formData.address_line} */}
                      </p>
                    <p className="text-zinc-600">
                      {/* {formData.city}, {formData.state} - {formData.zipcode} */}
                    </p>
                    <p className="text-zinc-600">
                      {/* {formData.nationality} */}
                      </p>
                  </div>
                </div>

                <div className="bg-zinc-50 rounded-lg p-4">
                  <h3 className="font-semibold text-zinc-900 mb-3">Documents</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-600">ID Type:</span>
                      <span className="font-medium text-zinc-900 capitalize">
                        {/* {formData.government_id_type} */}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-600">Document Front:</span>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-600">Document Back:</span>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-600">Passport Photo:</span>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-50 rounded-lg p-4">
                  <h3 className="font-semibold text-zinc-900 mb-3">Income</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-zinc-600">Income Source:</span>
                      <p className="font-medium text-zinc-900 capitalize">
                        {/* {formData.income_source} */}
                        </p>
                    </div>
                    <div>
                      <span className="text-zinc-600">Annual Income:</span>
                      <p className="font-medium text-zinc-900">
                        {/* {formData.annual_income} XAF */}
                        </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          {currentStep !== "personal" && (
            <Button onClick={handlePreviousStep} variant="outline" className="flex-1 border-zinc-300 bg-transparent">
              Previous
            </Button>
          )}

          {currentStep !== "review" ? (
            <Button 
            // onClick={handleNextStep} 
            className="flex-1 bg-red-600 hover:bg-red-700">
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900"
            >
              {isLoading ? "Submitting..." : "Submit KYC"}
            </Button>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
