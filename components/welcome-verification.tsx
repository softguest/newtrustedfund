"use client"

import * as React from "react"
import {
  Home,
  TrendingUp,
  Users,
  Receipt,
  UserCircle,
  LogOut,
  ShieldCheck,
  AlertCircle,
  MessageCircle,
  Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function WelcomeVerification() {
  const [termsAccepted, setTermsAccepted] = React.useState(false)
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="flex min-h-screen bg-zinc-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-zinc-200 flex flex-col">
        {/* User Profile */}
        <div className="p-6 border-b border-zinc-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-zinc-200 flex items-center justify-center">
              <UserCircle className="w-8 h-8 text-zinc-500" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-zinc-900">Tuma Akeh</h3>
              <p className="text-xs text-zinc-500">ID: 6898905076</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-red-600 font-semibold bg-red-50 px-3 py-2 rounded-lg border border-red-100">
            <AlertCircle className="w-3.5 h-3.5" />
            Verify KYC
          </div>
          <div className="mt-4 space-y-2">
            <Button
              size="sm"
              variant="outline"
              className="w-full justify-start text-xs font-semibold border-zinc-200 hover:bg-zinc-50 bg-transparent"
            >
              <UserCircle className="w-3.5 h-3.5 mr-2" />
              Profile
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="w-full justify-start text-xs font-semibold border-zinc-200 hover:bg-zinc-50 text-brand-red hover:text-brand-red bg-transparent"
            >
              <LogOut className="w-3.5 h-3.5 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="mb-4">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2 px-2">Main Menu</p>
            <div className="space-y-1">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-700 hover:bg-zinc-100 transition-colors"
              >
                <Home className="w-4 h-4" />
                Dashboard
              </Link>
              <Link
                href="/transactions"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-700 hover:bg-zinc-100 transition-colors"
              >
                <TrendingUp className="w-4 h-4" />
                Transactions
              </Link>
              <Link
                href="/cards"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-700 hover:bg-zinc-100 transition-colors"
              >
                <Receipt className="w-4 h-4" />
                Cards
              </Link>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2 px-2">Transfers</p>
            <div className="space-y-1">
              <Link
                href="/transfer/local"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-700 hover:bg-zinc-100 transition-colors"
              >
                <TrendingUp className="w-4 h-4" />
                Local Transfer
              </Link>
              <Link
                href="/transfer/international"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-700 hover:bg-zinc-100 transition-colors"
              >
                <Users className="w-4 h-4" />
                International Wire
              </Link>
              <Link
                href="/deposit"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-700 hover:bg-zinc-100 transition-colors"
              >
                <TrendingUp className="w-4 h-4" />
                Deposit
              </Link>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2 px-2">Services</p>
            <div className="space-y-1">
              <Link
                href="/loan"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-700 hover:bg-zinc-100 transition-colors"
              >
                <Receipt className="w-4 h-4" />
                Loan Request
              </Link>
              <Link
                href="/tax"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-700 hover:bg-zinc-100 transition-colors"
              >
                <Receipt className="w-4 h-4" />
                IRS Tax Refund
              </Link>
              <Link
                href="/history"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-700 hover:bg-zinc-100 transition-colors"
              >
                <TrendingUp className="w-4 h-4" />
                Loan History
              </Link>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2 px-2">Account</p>
            <div className="space-y-1">
              <Link
                href="/settings"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-700 hover:bg-zinc-100 transition-colors"
              >
                <UserCircle className="w-4 h-4" />
                Settings
              </Link>
              <Link
                href="/support"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-700 hover:bg-zinc-100 transition-colors"
              >
                <AlertCircle className="w-4 h-4" />
                Support Ticket
              </Link>
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-100">
          <p className="text-[10px] text-zinc-400 text-center">
            <Image src="/logo-small.png" alt="Logo" width={16} height={16} className="inline mr-1" />
            Secure Banking v1.2.0
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white border-b border-zinc-200 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <Calendar className="w-4 h-4" />
            {currentDate}
          </div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center hover:bg-red-100 transition-colors relative">
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full" />
              <span className="text-xs font-bold text-brand-red">FCFA0</span>
            </button>
            <button className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center hover:bg-zinc-200 transition-colors relative">
              <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full" />
              <AlertCircle className="w-5 h-5 text-zinc-600" />
            </button>
            <button className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center">
              <UserCircle className="w-6 h-6 text-white" />
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="p-8 max-w-6xl">
          {/* Welcome Banner */}
          <div className="bg-white rounded-2xl border border-zinc-200 p-8 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-7 h-7 text-brand-red" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-zinc-900 mb-1">Welcome to CSTrustFunds</h2>
                <p className="text-sm text-zinc-600 mb-4">Complete your account verification to access all features</p>
                <div className="bg-zinc-50 rounded-xl p-6 space-y-4 text-sm text-zinc-700 leading-relaxed">
                  <p className="font-semibold text-zinc-900">Dear Tuma Akeh Enzo,</p>
                  <p>
                    Welcome Onboard! CSTrustFunds is the market's most innovative and fastest-growing company in the
                    financial industry. We look forward to working with you to help you get the most out of our
                    financial services and realize your banking goals.
                  </p>
                  <p>
                    Here at CSTrustFunds, we are committed to providing a wide variety of savings, investment, and loan
                    products, all designed to meet your specific needs. Our services are being used by over two million
                    customers around the world.
                  </p>
                  <p>
                    Our excellent customer support team is available 24/7 to help you with any questions. You can
                    contact them at:{" "}
                    <a href="mailto:Mail@cstrustfund.com" className="text-brand-red font-semibold hover:underline">
                      Mail@cstrustfund.com
                    </a>
                    .
                  </p>
                  <p>
                    We need a little more information to complete your registration, including completing the AML/KYC
                    form. Please review our terms and conditions below before proceeding.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="bg-white rounded-2xl border border-zinc-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <Receipt className="w-5 h-5 text-brand-red" />
              <h3 className="text-lg font-bold text-zinc-900">Terms and Conditions</h3>
            </div>

            <div className="bg-zinc-50 rounded-xl p-6 max-h-96 overflow-y-auto space-y-4 text-sm text-zinc-700 leading-relaxed mb-6">
              <p className="font-semibold text-zinc-900">
                Before you can start using our online service you must agree to be bound by the conditions below. You
                must read the conditions before you decide whether to accept them. If you agree to be bound by these
                conditions, please click the I accept button below. If you click on the Decline button, you will not be
                able to continue your registration for our online services. We strongly recommend that you print a copy
                of these conditions for your reference.
              </p>

              <div>
                <h4 className="font-bold text-zinc-900 mb-2">1. DEFINITIONS</h4>
                <p>In these conditions the following words have the following meanings:</p>
                <p className="mt-2">
                  <strong>ACCOUNT</strong> means any account held in your name or names or in which you have an
                  interest, including any loan account, savings account, or investment account.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-zinc-900 mb-2">2. GENERAL TERMS</h4>
                <p>
                  CSTrustFunds does not accept responsibility for any loss you or anybody else may suffer because any
                  instructions or information you sent us are sent in error, fail to reach us or are distorted unless
                  you have been the victim of fraud.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-zinc-900 mb-2">3. LIABILITY AND RESPONSIBILITY</h4>
                <p>
                  CSTrustFunds does not accept responsibility for any loss you or anybody else may suffer because any
                  instructions or information we send you fail to reach you or are distorted unless you have been the
                  victim of fraud.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-zinc-900 mb-2">4. SECURITY AND ACCESS</h4>
                <p>
                  You must keep your password and PIN secure at all times. You must not disclose them to anyone. If you
                  believe that someone else knows your password or PIN, you must contact us immediately.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-zinc-900 mb-2">5. HOW WE CAN CHANGE THESE CONDITIONS</h4>
                <p>
                  CSTrustFunds may change these conditions for any reason by giving you written notice or by publishing
                  the change on our website.
                </p>
                <p className="mt-2">
                  We may send all written notices to you at the last e-mail address you gave us. You must let us know
                  immediately if you change your e-mail address (you can do so online), to make sure that we have your
                  current e-mail address at all times.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-zinc-900 mb-2">6. GENERAL</h4>
                <p>CSTrustFunds service is available to you if you are 18 years of age or over.</p>
              </div>

              <div>
                <h4 className="font-bold text-zinc-900 mb-2">7. KYC VERIFICATION REQUIREMENTS</h4>
                <p className="font-semibold text-brand-red">
                  Please note: Without completing KYC verification, you will NOT be able to:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>Create or join savings groups</li>
                  <li>Participate in community-based savings</li>
                  <li>Access loan and credit support features</li>
                  <li>Use advanced platform features</li>
                </ul>
                <p className="mt-2">
                  You will still have access to personal savings accounts and basic features until verification is
                  complete.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setTermsAccepted(true)}
                className="h-12 px-8 bg-brand-wine hover:opacity-90 text-white rounded-xl font-bold flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />I Accept & Proceed to Verification
              </Button>
              <Button
                variant="outline"
                className="h-12 px-6 border-zinc-300 text-zinc-600 rounded-xl font-bold hover:bg-zinc-50 bg-transparent"
              >
                <AlertCircle className="w-4 h-4 mr-2" />
                Decline
              </Button>
            </div>
          </div>

          {/* Help Section */}
          <div className="bg-white rounded-2xl border border-zinc-200 p-6 mt-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-brand-red" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-zinc-900">Need help with verification?</h4>
                <p className="text-xs text-zinc-500">
                  Our support team is available 24/7 to assist you with the verification process. Reach out with any
                  questions.
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="border-brand-red text-brand-red hover:bg-red-50 rounded-xl font-bold bg-transparent"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Contact Support
            </Button>
          </div>

          {/* Footer */}
          <footer className="mt-8 pt-6 border-t border-zinc-200 flex items-center justify-between text-xs text-zinc-500">
            <p>© 2025 CSTrustFunds. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-brand-red font-medium">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-brand-red font-medium">
                Terms of Service
              </Link>
              <Link href="/support" className="hover:text-brand-red font-medium">
                Contact Support
              </Link>
            </div>
          </footer>
        </div>
      </main>
    </div>
  )
}
