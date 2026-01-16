"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


export default function Home() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // useEffect(() => {
  //   if (mounted && !isLoading) {
  //     if (user) {
  //       router.push("/verify-kyc")
  //     } else {
  //       router.push("/onboarding")
  //     }
  //   }
  // }, [user, isLoading, mounted, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand-red"></div>
        <p className="mt-4 text-zinc-600">Loading...</p>
      </div>
    </div>
  )
}
