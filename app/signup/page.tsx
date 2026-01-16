import { CheckCircle2 } from "lucide-react"
import Image from "next/image"
import { SignupForm } from "@/components/signup-form"

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* DESKTOP VIEW */}
      <div className="hidden md:flex min-h-screen">
        {/* LEFT SECTION: Red Side */}
        <section className="relative w-[45%] flex flex-col items-center justify-center p-16 text-white overflow-hidden">
          {/* Specific Gradient Background */}
          <div className="absolute inset-0 z-0 bg-[linear-gradient(135deg,#510813_0%,#9a1026_100%)]" />

          <div className="relative z-20 w-full max-w-lg flex flex-col items-start text-left">
            {/* All White Logo */}
            <div className="mb-10 w-full max-w-[320px]">
              <Image
                src="/images/20251229-104326.png"
                alt="ConerStone TrustFunds"
                width={500}
                height={150}
                className="w-full h-auto object-contain mx-12"
                priority
              />
            </div>

            {/* Revised Copy */}
            <div className="mb-10">
              <p className="text-base text-white/80 leading-relaxed font-sans max-w-md">
                Create your CSTrustFunds account in minutes and begin a disciplined, goal-driven savings journey built
                for individuals and communities.
              </p>
            </div>

            {/* Features with Checkmarks */}
            <div className="space-y-8 w-full">
              <SignupFeature
                title="Secure Savings Platform"
                description="Bank-grade security and strict safeguards designed to protect your money and your goals."
              />
              <SignupFeature
                title="Goal-Based & Group Savings"
                description="Save for personal milestones or join trusted savings groups with clear targets and timelines."
              />
              <SignupFeature
                title="24/7 Access, Any Device"
                description="Track progress, manage plans, and monitor growth anytime from mobile or web."
              />
              <SignupFeature
                title="AI SmartSave Assistant"
                description="Get intelligent insights, savings projections, and guidance tailored to your income and goals."
              />
            </div>
          </div>
        </section>

        {/* RIGHT SECTION: White Side */}
        <section className="w-[55%] flex items-center justify-center p-12 bg-[#F8F9FB]">
          <div className="w-full max-w-2xl">
            <SignupForm />
          </div>
        </section>
      </div>

      {/* MOBILE VIEW */}
      <div className="md:hidden min-h-screen flex flex-col items-center justify-start p-4 bg-white overflow-y-auto">
        <div className="w-full flex items-center justify-center py-6">
          <SignupForm />
        </div>
      </div>
    </main>
  )
}

function SignupFeature({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex items-start gap-4 group">
      <div className="shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mt-1 group-hover:bg-white/30 transition-all">
        <CheckCircle2 className="w-4 h-4 text-white" />
      </div>
      <div>
        <h4 className="text-sm font-bold text-white mb-1">{title}</h4>
        <p className="text-xs text-white/70 leading-relaxed font-sans">{description}</p>
      </div>
    </div>
  )
}
