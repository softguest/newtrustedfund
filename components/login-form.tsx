"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, AlertCircle, Mail, Lock } from "lucide-react"

const DEMO_CREDENTIALS = {
  email: "demo@cstrustfunds.com",
  password: "Demo@123",
  pin: "1234",
}

export function LoginForm() {
  const router = useRouter()
  // const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // perform login here, e.g. await login({ email, password })
      // on success: router.push("/dashboard")
    } catch (err) {
      // set a user-facing error message
      setError("Invalid credentials")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-semibold text-zinc-800 md:text-zinc-800">
          Email Address
        </Label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 pl-11 bg-zinc-50 border-zinc-200 rounded-xl"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-semibold text-zinc-800 md:text-zinc-800">
          Password
        </Label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 pl-11 pr-12 bg-zinc-50 border-zinc-200 rounded-xl"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-12 text-base font-bold rounded-xl bg-brand-red md:bg-[linear-gradient(135deg,#510813_0%,#9a1026_100%)] text-white hover:opacity-90"
      >
        {isLoading ? "Signing In..." : "Sign In"}
      </Button>

      <div className="pt-2 border-t border-white/20 md:border-zinc-200 hidden md:block">
        <p className="text-xs text-zinc-500 mb-2">Demo Account (for testing):</p>
        <Button
          type="button"
          // onClick={fillDemoCredentials}
          variant="outline"
          className="w-full text-xs rounded-lg border-zinc-200 bg-transparent"
        >
          Use Demo Credentials
        </Button>
        <p className="text-xs text-zinc-400 mt-2 text-center">
          Email: demo@cstrustfunds.com | Password: Demo@123 | PIN: 1234
        </p>
      </div>
    </form>
  )
}
