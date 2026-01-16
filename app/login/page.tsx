"use client"

import type React from "react"

import { Target, Users, Landmark, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* DESKTOP VIEW */}
      <div className="hidden md:flex min-h-screen">
        {/* LEFT SECTION: Red Side */}
        <section className="relative w-[55%] flex flex-col items-center justify-center p-16 text-white overflow-hidden">
          <div className="absolute inset-0 z-0 bg-[linear-gradient(135deg,#510813_0%,#9a1026_100%)]" />

          <div className="relative z-20 w-full max-w-2xl flex flex-col items-center text-center">
            <div className="mb-12 w-full max-w-[400px]">
              <Image
                src="/images/20251229-104326.png"
                alt="CSTrustFunds"
                width={500}
                height={150}
                className="w-full h-auto object-contain"
                priority
              />
            </div>

            <div className="max-w-md mb-16">
              <p className="text-sm md:text-base text-white/90 leading-relaxed font-sans tracking-wide">
                CSTrustFunds Provides Purpose-driven savings for people, families, and communities
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-12 gap-y-10 w-full max-w-xl px-4">
              <FeatureItem icon={<Target className="w-5 h-5" />} label="Personal Goal Saving" />
              <FeatureItem icon={<Users className="w-5 h-5" />} label="Community & Group Savings" />
              <FeatureItem icon={<Landmark className="w-5 h-5" />} label="Loans & Credit Support" />
              <FeatureItem icon={<Sparkles className="w-5 h-5" />} label="AI SmartSave Assistant" />
            </div>
          </div>
        </section>

        {/* RIGHT SECTION: White Side */}
        <section className="w-[45%] flex items-center justify-center p-12 bg-white">
          <div className="w-full max-w-md">
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-zinc-900 mb-2">Sign In</h2>
              <p className="text-zinc-500 font-sans">Access your CSTrustFunds dashboard.</p>
            </div>

            <LoginForm />

            <div className="mt-8 text-center">
              <p className="text-sm text-zinc-500">
                New to the platform?{" "}
                <Link href="/signup" className="font-bold text-brand-red hover:text-brand-dark">
                  Get Started
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* MOBILE VIEW */}
      <div className="md:hidden h-screen flex flex-col items-center justify-center p-6 bg-white overflow-hidden">
        <div className="w-full max-w-sm mx-auto flex flex-col h-full justify-center">
          {/* Logo at top */}
          <div className="mb-6 w-full max-w-[200px] mx-auto">
            <Image
              src="/images/20251229-103148.png"
              alt="CSTrustFunds"
              width={500}
              height={150}
              className="w-full h-auto object-contain"
              priority
            />
          </div>

          <div className="mb-6">
            <h2 className="font-bold text-zinc-900 text-center text-xl">Sign into Your Dashboard</h2>
          </div>

          <div className="mb-4">
            <LoginForm />
          </div>

          <div className="text-center pt-2">
            <p className="text-sm text-zinc-600 mb-3">New to the platform?</p>
            <Link
              href="/signup"
              className="block w-full py-3 px-6 rounded-xl bg-white border-2 border-zinc-200 hover:border-zinc-300 transition-all"
            >
              <span className="text-brand-red font-bold text-base">Get Started</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

function FeatureItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-4 text-left group">
      <div className="shrink-0 w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 group-hover:bg-white/25 transition-all">
        {icon}
      </div>
      <span className="text-sm font-semibold text-white/95">{label}</span>
    </div>
  )
}
