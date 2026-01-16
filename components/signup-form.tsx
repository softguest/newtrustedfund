"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  User,
  ChevronRight,
  Mail,
  Building2,
  ShieldCheck,
  Phone,
  Globe,
  Lock,
  Eye,
  EyeOff,
  ChevronLeft,
  CreditCard,
  Users,
  Check,
  X,
  FileText,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { cn } from "@/lib/utils"
// import { useAuth } from "@/lib/auth-context"
import { countries } from "@/lib/countries"
import { generateOTP, sendOTPEmail } from "@/lib/email-service"

const STEPS = ["Personal Info", "Contact Details", "Account Setup", "Security"]

function validatePassword(password: string) {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  }

  const passed = Object.values(checks).filter(Boolean).length
  let strength: "weak" | "medium" | "strong" = "weak"

  if (passed >= 4) strength = "strong"
  else if (passed >= 2) strength = "medium"

  return { checks, strength, passed }
}

export function SignupForm() {
  const router = useRouter()
  // const { signup } = useAuth()
  const [currentStep, setCurrentStep] = React.useState(1)
  const [showPin, setShowPin] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  const [selectedAccountType, setSelectedAccountType] = React.useState<string>("personal")
  const [showMoreAccounts, setShowMoreAccounts] = React.useState(false)

  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [termsAccepted, setTermsAccepted] = React.useState(false)
  const [pin, setPin] = React.useState("")

  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    userId: "",
  })

  const handleNext = () => setCurrentStep((s) => Math.min(s + 1, STEPS.length))
  const handleBack = () => setCurrentStep((s) => Math.max(s - 1, 1))

  const isStepComplete = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName.trim() !== "" && formData.lastName.trim() !== "" && formData.username.trim() !== ""
      case 2:
        return formData.email.trim() !== "" && formData.phone.trim() !== "" && formData.country.trim() !== ""
      case 3:
        return selectedAccountType !== "" && pin.length === 4
      case 4:
        return (
          password !== "" &&
          confirmPassword !== "" &&
          passwordsMatch &&
          passwordValidation.strength === "strong" &&
          termsAccepted
        )
      default:
        return false
    }
  }

  const passwordValidation = validatePassword(password)
  const passwordsMatch = password === confirmPassword && confirmPassword !== ""

  const handleSubmit = async () => {
    if (formData.firstName && formData.lastName && formData.email && password && selectedAccountType && pin) {
      const otp = generateOTP()
      await sendOTPEmail(formData.email, otp)

      // Store user data as pending
      // signup({
      //   name: `${formData.firstName} ${formData.lastName}`,
      //   email: formData.email,
      //   userId: formData.userId,
      //   accountType: selectedAccountType,
      //   pin,
      //   password,
      // })

      // Redirect to email verification page
      router.push(`/verify-email?email=${encodeURIComponent(formData.email)}`)
    }
  }

  return (
    <div className="bg-white rounded-[2rem] shadow-xl shadow-zinc-200/50 p-6 md:p-12 border border-zinc-100 w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-3">
        <h2 className="text-xl md:text-2xl font-bold text-zinc-900 font-heading">Create Your Account</h2>
        <span className="text-xs md:text-sm font-medium text-zinc-400">
          Step {currentStep} of {STEPS.length}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-zinc-100 rounded-full mb-4 relative overflow-hidden">
        <div
          className="h-full transition-all duration-500 ease-in-out bg-[rgba(180,0,27,1)]"
          style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
        />
      </div>

      {/* Steps Navigation Labels */}
      <div className="hidden md:flex items-center justify-between mb-6">
        {STEPS.map((step, index) => (
          <div key={step} className="flex-1 text-center">
            <span
              className={cn(
                "text-[10px] font-bold uppercase tracking-wider transition-colors",
                currentStep >= index + 1 ? "text-brand-red" : "text-zinc-400",
              )}
            >
              {step}
            </span>
          </div>
        ))}
      </div>

      <div className={cn("md:min-h-[400px]", "max-h-[50vh] md:max-h-none overflow-y-auto min-h-[320px]")}>
        {currentStep === 1 && (
          <div className="space-y-5 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center border border-red-100">
                <User className="w-8 h-8 text-brand-red" />
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold text-zinc-800">Personal Information</h3>
              <p className="text-sm text-zinc-500 mt-1">
                Please provide your legal name as it appears on official documents
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-xs font-bold text-zinc-800 uppercase tracking-tight ml-1">
                  Legal First Name *
                </Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <Input
                    id="firstName"
                    placeholder="John"
                    className="h-12 pl-11 bg-zinc-50 border-zinc-200 focus:ring-brand-red focus:border-brand-red rounded-xl"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-xs font-bold text-zinc-800 uppercase tracking-tight ml-1">
                  Legal Last Name *
                </Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <Input
                    id="lastName"
                    placeholder="Smith"
                    className="h-12 pl-11 bg-zinc-50 border-zinc-200 focus:ring-brand-red focus:border-brand-red rounded-xl"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="username" className="text-xs font-bold text-zinc-800 uppercase tracking-tight ml-1">
                  Username *
                </Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <Input
                    id="username"
                    placeholder="fred99"
                    className="h-12 pl-11 bg-zinc-50 border-zinc-200 focus:ring-brand-red focus:border-brand-red rounded-xl"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-5 md:space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center border border-red-100">
                <Mail className="w-8 h-8 text-brand-red" />
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold text-zinc-800">Contact Information</h3>
              <p className="text-sm text-zinc-500 mt-1">
                We'll use these details to communicate with you about your account
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-bold text-zinc-800 uppercase tracking-tight ml-1">
                  Email Address *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.smith@example.com"
                    className="h-12 pl-11 bg-zinc-50 border-zinc-200 rounded-xl"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-xs font-bold text-zinc-800 uppercase tracking-tight ml-1">
                  Phone Number *
                </Label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (234) 567-8901"
                    className="h-12 pl-11 bg-zinc-50 border-zinc-200 rounded-xl"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country" className="text-xs font-bold text-zinc-800 uppercase tracking-tight ml-1">
                  Country *
                </Label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none z-10" />
                  <select
                    id="country"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="h-12 pl-11 pr-4 w-full bg-zinc-50 border border-zinc-200 rounded-xl appearance-none cursor-pointer text-zinc-900 focus:ring-2 focus:ring-brand-red focus:border-brand-red transition-all"
                  >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.flag} {country.name} ({country.code})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-5 md:space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center border border-red-100">
                <Building2 className="w-8 h-8 text-brand-red" />
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold text-zinc-800">Account Setup</h3>
              <p className="text-sm text-zinc-500 mt-1">Choose your account type and set up your transaction PIN</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="text-xs font-bold text-zinc-800 uppercase tracking-tight ml-1">Account Type *</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setSelectedAccountType("personal")}
                    className={`flex items-center gap-4 p-4 border-2 rounded-2xl text-left transition-all ${
                      selectedAccountType === "personal"
                        ? "border-brand-red bg-red-50"
                        : "border-zinc-100 bg-zinc-50 hover:border-zinc-200"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        selectedAccountType === "personal" ? "bg-red-100" : "bg-zinc-200"
                      }`}
                    >
                      <CreditCard
                        className={`w-6 h-6 ${selectedAccountType === "personal" ? "text-brand-red" : "text-zinc-500"}`}
                      />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-zinc-900">Personal Goal Saving</p>
                      <p className="text-xs text-zinc-500">Save for your personal goals</p>
                    </div>
                    {selectedAccountType === "personal" && <Check className="w-5 h-5 text-brand-red ml-auto" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedAccountType("group")}
                    className={`flex items-center gap-4 p-4 border-2 rounded-2xl text-left transition-all ${
                      selectedAccountType === "group"
                        ? "border-brand-red bg-red-50"
                        : "border-zinc-100 bg-zinc-50 hover:border-zinc-200"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        selectedAccountType === "group" ? "bg-red-100" : "bg-zinc-200"
                      }`}
                    >
                      <Users
                        className={`w-6 h-6 ${selectedAccountType === "group" ? "text-brand-red" : "text-zinc-500"}`}
                      />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-zinc-900">Community Savings</p>
                      <p className="text-xs text-zinc-500">Save with a group</p>
                    </div>
                    {selectedAccountType === "group" && <Check className="w-5 h-5 text-brand-red ml-auto" />}
                  </button>
                </div>

                {!showMoreAccounts && (
                  <button
                    type="button"
                    onClick={() => setShowMoreAccounts(true)}
                    className="text-brand-red text-xs md:text-sm font-bold flex items-center gap-1 hover:underline ml-1"
                  >
                    Show more account types
                    <ChevronRight className="w-3 h-3 rotate-90" />
                  </button>
                )}

                {showMoreAccounts && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-zinc-200 mt-4">
                    <button
                      type="button"
                      onClick={() => setSelectedAccountType("loans")}
                      className={`flex items-center gap-4 p-4 border-2 rounded-2xl text-left transition-all ${
                        selectedAccountType === "loans"
                          ? "border-brand-red bg-red-50"
                          : "border-zinc-100 bg-zinc-50 hover:border-zinc-200"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          selectedAccountType === "loans" ? "bg-red-100" : "bg-zinc-200"
                        }`}
                      >
                        <FileText
                          className={`w-6 h-6 ${selectedAccountType === "loans" ? "text-brand-red" : "text-zinc-500"}`}
                        />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-zinc-900">Loans & Credit</p>
                        <p className="text-xs text-zinc-500">Access credit support</p>
                      </div>
                      {selectedAccountType === "loans" && <Check className="w-5 h-5 text-brand-red ml-auto" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedAccountType("investment")}
                      className={`flex items-center gap-4 p-4 border-2 rounded-2xl text-left transition-all ${
                        selectedAccountType === "investment"
                          ? "border-brand-red bg-red-50"
                          : "border-zinc-100 bg-zinc-50 hover:border-zinc-200"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          selectedAccountType === "investment" ? "bg-red-100" : "bg-zinc-200"
                        }`}
                      >
                        <TrendingUp
                          className={`w-6 h-6 ${
                            selectedAccountType === "investment" ? "text-brand-red" : "text-zinc-500"
                          }`}
                        />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-zinc-900">Investment Portfolio</p>
                        <p className="text-xs text-zinc-500">Build your portfolio</p>
                      </div>
                      {selectedAccountType === "investment" && <Check className="w-5 h-5 text-brand-red ml-auto" />}
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="pin" className="text-xs font-bold text-zinc-800 uppercase tracking-tight ml-1">
                  Transaction PIN (4 digits) *
                </Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <Input
                    id="pin"
                    type={showPin ? "text" : "password"}
                    maxLength={4}
                    placeholder="••••"
                    value={pin}
                    onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                    className="h-12 pl-11 bg-zinc-50 border-zinc-200 rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                  >
                    {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[10px] text-zinc-400 mt-2 px-1">
                  Your PIN will be required to authorize transactions. Remember it, you will need it any time you sign
                  in.
                </p>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-5 md:space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center border border-red-100">
                <ShieldCheck className="w-8 h-8 text-brand-red" />
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold text-zinc-800">Secure Your Account</h3>
              <p className="text-sm text-zinc-500 mt-1">Create a strong password to protect your account</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="pass" className="text-xs font-bold text-zinc-800 uppercase tracking-tight ml-1">
                  Password *
                </Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <Input
                    id="pass"
                    type={showPassword ? "text" : "password"}
                    placeholder="CNhkJfbMiZs28U4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 pl-11 bg-zinc-50 border-zinc-200 rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {password && (
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-wide">
                        Password strength:
                      </span>
                      <span
                        className={cn(
                          "text-[10px] font-bold uppercase tracking-wide",
                          passwordValidation.strength === "strong" && "text-green-600",
                          passwordValidation.strength === "medium" && "text-amber-600",
                          passwordValidation.strength === "weak" && "text-red-600",
                        )}
                      >
                        {passwordValidation.strength}
                      </span>
                    </div>
                    <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full transition-all duration-300 rounded-full",
                          passwordValidation.strength === "strong" && "bg-green-500",
                          passwordValidation.strength === "medium" && "bg-amber-500",
                          passwordValidation.strength === "weak" && "bg-red-500",
                        )}
                        style={{ width: `${(passwordValidation.passed / 4) * 100}%` }}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2">
                        {passwordValidation.checks.length ? (
                          <Check className="w-3.5 h-3.5 text-green-600" />
                        ) : (
                          <X className="w-3.5 h-3.5 text-zinc-300" />
                        )}
                        <span
                          className={cn(
                            "text-[10px]",
                            passwordValidation.checks.length ? "text-green-600 font-semibold" : "text-zinc-400",
                          )}
                        >
                          At least 8 characters
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {passwordValidation.checks.uppercase ? (
                          <Check className="w-3.5 h-3.5 text-green-600" />
                        ) : (
                          <X className="w-3.5 h-3.5 text-zinc-300" />
                        )}
                        <span
                          className={cn(
                            "text-[10px]",
                            passwordValidation.checks.uppercase ? "text-green-600 font-semibold" : "text-zinc-400",
                          )}
                        >
                          At least one uppercase letter
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {passwordValidation.checks.number ? (
                          <Check className="w-3.5 h-3.5 text-green-600" />
                        ) : (
                          <X className="w-3.5 h-3.5 text-zinc-300" />
                        )}
                        <span
                          className={cn(
                            "text-[10px]",
                            passwordValidation.checks.number ? "text-green-600 font-semibold" : "text-zinc-400",
                          )}
                        >
                          At least one number
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {passwordValidation.checks.special ? (
                          <Check className="w-3.5 h-3.5 text-green-600" />
                        ) : (
                          <X className="w-3.5 h-3.5 text-zinc-300" />
                        )}
                        <span
                          className={cn(
                            "text-[10px]",
                            passwordValidation.checks.special ? "text-green-600 font-semibold" : "text-zinc-400",
                          )}
                        >
                          At least one special character
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPass" className="text-xs font-bold text-zinc-800 uppercase tracking-tight ml-1">
                  Confirm Password *
                </Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <Input
                    id="confirmPass"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-12 pl-11 bg-zinc-50 border-zinc-200 rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {confirmPassword && !passwordsMatch && (
                  <div className="flex items-center gap-2 mt-2">
                    <X className="w-3.5 h-3.5 text-red-600" />
                    <span className="text-[10px] text-red-600 font-semibold">Passwords do not match</span>
                  </div>
                )}
              </div>

              <div className="flex items-start space-x-3 pt-2">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                  className="mt-1 border-zinc-300 data-[state=checked]:bg-brand-red data-[state=checked]:border-brand-red"
                />
                <label
                  htmlFor="terms"
                  className="text-xs md:text-sm font-medium text-zinc-500 leading-relaxed cursor-pointer"
                >
                  I agree to the{" "}
                  <Link href="/terms" className="text-brand-red font-bold hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-brand-red font-bold hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between gap-4 mt-6 md:mt-8">
        {currentStep > 1 ? (
          <Button
            variant="outline"
            onClick={handleBack}
            className="h-12 px-6 border-zinc-200 text-zinc-600 rounded-xl font-bold flex items-center gap-2 hover:bg-zinc-50 bg-transparent"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
        ) : (
          <div />
        )}

        <Button
          onClick={currentStep === STEPS.length ? handleSubmit : handleNext}
          disabled={!isStepComplete()}
          className="h-12 px-8 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-bold flex items-center gap-2 group transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          {currentStep === STEPS.length ? (
            <>
              <ShieldCheck className="w-4 h-4" />
              Create Account
            </>
          ) : (
            <>
              Next
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
