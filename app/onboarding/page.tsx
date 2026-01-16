"use client"

export const dynamic = "force-dynamic"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Image from "next/image"

const slides = [
  {
    title: "Personal Goal Saving",
    description: "Set and achieve your financial goals with smart savings plans tailored to your needs.",
    video: "/images/saving.webm",
    color: "text-white",
  },
  {
    title: "Investment & Growth",
    description: "Watch your money grow with secure investment options and competitive returns.",
    video: "/images/manage-20money.webm",
    color: "text-white",
  },
  {
    title: "Loans & Credit Support",
    description: "Access flexible loans and credit facilities to support your financial journey.",
    video: "/images/revenue.webm",
    color: "text-white",
  },
  {
    title: "AI SmartSave Assistant",
    description: "Get personalized saving recommendations powered by intelligent AI technology.",
    video: "/images/ai-powered-20marketing-20tools-20abstract.webm",
    color: "text-white",
  },
]

export default function OnboardingPage() {
  const [showSplash, setShowSplash] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showButton, setShowButton] = useState(false)
  const router = useRouter()
  const touchStartX = useRef<number>(0)
  const touchEndX = useRef<number>(0)

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setShowSplash(false)
    }, 2500)
    return () => clearTimeout(splashTimer)
  }, [])

  useEffect(() => {
    if (!showSplash) {
      const timer = setTimeout(() => {
        setShowButton(true)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [showSplash])

  useEffect(() => {
    if (!showSplash) {
      const timer = setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [currentSlide, showSplash])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX
    handleSwipe()
  }

  const handleSwipe = () => {
    const swipeDistance = touchStartX.current - touchEndX.current
    const minSwipeDistance = 50

    if (swipeDistance > minSwipeDistance) {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    } else if (swipeDistance < -minSwipeDistance) {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    }
  }

  const handleStartNow = () => {
    router.push("/login")
  }

  const handleSkip = () => {
    router.push("/login")
  }

  return (
    <>
      {showSplash && (
        <div className="h-screen w-screen bg-[linear-gradient(135deg,#510813_0%,#9a1026_100%)] flex items-center justify-center md:hidden overflow-hidden fixed inset-0 z-50">
          <div className="animate-splash-logo">
            <Image
              src="/images/20251229-104326.png"
              alt="CSTrustFunds"
              width={400}
              height={120}
              className="w-96 h-auto object-contain"
              priority
            />
          </div>
        </div>
      )}

      {!showSplash && (
        <div
          className="h-screen w-screen bg-[linear-gradient(135deg,#510813_0%,#9a1026_100%)] flex flex-col md:hidden overflow-hidden fixed inset-0 z-50"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex items-center justify-between p-4 pt-6 flex-shrink-0 animate-slide-down">
            <div className="w-56">
              <Image
                src="/images/20251229-104326.png"
                alt="CSTrustFunds"
                width={300}
                height={90}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
            <button
              onClick={handleSkip}
              className="text-white hover:text-white text-sm font-medium px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 backdrop-blur-sm"
            >
              Skip
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center px-6 animate-fade-in overflow-hidden">
            <div className="w-full max-w-sm">
              {slides.map((slide, index) => {
                const isActive = index === currentSlide
                return (
                  <div
                    key={index}
                    className={`transition-all duration-500 ${
                      isActive ? "opacity-100 scale-100 relative" : "opacity-0 scale-95 absolute pointer-events-none"
                    }`}
                  >
                    <div className="flex items-center justify-center mb-8">
                      <div className="relative">
                        <div className="absolute inset-0 -m-6 opacity-50">
                          <div className="w-64 h-64 bg-white/5 rounded-full" />
                        </div>
                        <div className="relative bg-white/15 backdrop-blur-sm p-8 rounded-3xl shadow-2xl">
                          <video
                            key={slide.video}
                            src={slide.video}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="auto"
                            className="w-56 h-56 object-contain"
                            // style={{
                            //   imageRendering: "high-quality",
                            // }}
                            onError={(e) => {
                              console.log("[v0] Video load error:", slide.video)
                            }}
                            onLoadedData={() => {
                              console.log("[v0] Video loaded successfully:", slide.video)
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="text-center space-y-3">
                      <h2 className="text-2xl font-bold text-white text-balance">{slide.title}</h2>
                      <p className="text-white/90 text-base leading-relaxed text-pretty px-2">{slide.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="flex justify-center gap-2 mb-4 flex-shrink-0 animate-fade-in">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="px-6 pb-6 flex justify-center flex-shrink-0 animate-fade-in">
            <Button
              onClick={handleStartNow}
              size="lg"
              className={`bg-white text-brand-red hover:bg-white/90 font-semibold text-lg px-8 py-3 rounded-xl shadow-lg transition-all duration-500 hover:shadow-xl ${
                showButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{
                animation: "subtlePulse 2s ease-in-out infinite",
              }}
            >
              Start Now
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      )}

      {/* Desktop fallback message */}
      <div className="hidden md:flex min-h-screen items-center justify-center bg-brand-red">
        <div className="text-center text-white p-8">
          <h1 className="text-2xl font-bold mb-4">Mobile Experience Only</h1>
          <p className="text-white/80 mb-6">This onboarding experience is designed for mobile devices.</p>
          <Button onClick={() => router.push("/login")} size="lg" className="bg-white text-brand-red hover:bg-white/90">
            Continue to Login
          </Button>
        </div>
      </div>
    </>
  )
}
