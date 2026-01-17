"use client"

export const dynamic = "force-dynamic"

import type React from "react"

import { DashboardLayout } from "@/components/dashboard-layout"
import { useState } from "react"
import { ChevronRight, Mail, Send } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HelpSupportPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const [ticketForm, setTicketForm] = useState({ email: "", subject: "", message: "" })
  const [ticketSubmitted, setTicketSubmitted] = useState(false)

  const faqs = [
    {
      id: 1,
      question: "How do I create a savings plan?",
      answer:
        "Navigate to 'Create Savings Goal' from the dashboard, fill in your plan details including target amount, due date, and daily contribution, then submit. Your plan will be created and you can start contributing immediately.",
    },
    {
      id: 2,
      question: "What is the minimum contribution amount?",
      answer:
        "The minimum daily contribution is 1,000 FCFA. You can set higher daily amounts based on your savings goals.",
    },
    {
      id: 3,
      question: "How do I join a savings group?",
      answer:
        "Go to 'Savings Groups', browse available groups, and click 'Request to Join'. The group administrator will review your request and approve your membership.",
    },
    {
      id: 4,
      question: "What is KYC verification?",
      answer:
        "KYC (Know Your Customer) is a verification process to comply with financial regulations. You'll need to verify your identity, address, and income source.",
    },
    {
      id: 5,
      question: "Can I withdraw from my savings plan?",
      answer:
        "Locked savings cannot be withdrawn until the maturity date. Active savings can be withdrawn with a 30-day notice penalty.",
    },
    {
      id: 6,
      question: "How secure is my account?",
      answer:
        "Your account is protected by encryption and your transaction PIN. We follow industry best practices for data security.",
    },
  ]

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTicketSubmitted(true)
    setTimeout(() => {
      setTicketForm({ email: "", subject: "", message: "" })
      setTicketSubmitted(false)
    }, 3000)
  }

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8 max-w-4xl space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Help & Support</h1>
          <p className="text-zinc-600 mt-2">Find answers and get assistance</p>
        </div>

        {/* FAQ Section */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-zinc-900">Frequently Asked Questions</h2>
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-white rounded-xl border border-zinc-200 overflow-hidden">
              <button
                onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                className="w-full flex items-start justify-between p-6 hover:bg-zinc-50 transition-colors text-left"
              >
                <h3 className="font-bold text-zinc-900 flex-1">{faq.question}</h3>
                <ChevronRight
                  className={`w-5 h-5 text-zinc-400 flex-shrink-0 ml-4 transition-transform ${
                    openFAQ === faq.id ? "rotate-90" : ""
                  }`}
                />
              </button>
              {openFAQ === faq.id && (
                <div className="px-6 pb-6 border-t border-zinc-200">
                  <p className="text-zinc-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Support Ticket Form */}
        <div className="bg-white rounded-xl border border-zinc-200 p-6 space-y-4">
          <h2 className="text-xl font-bold text-zinc-900">Submit a Support Ticket</h2>
          {ticketSubmitted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <p className="text-green-700 font-semibold">✓ Ticket submitted successfully!</p>
              <p className="text-green-600 text-sm mt-1">Our team will respond within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleTicketSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={ticketForm.email}
                  onChange={(e) => setTicketForm({ ...ticketForm, email: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">Subject</label>
                <input
                  type="text"
                  value={ticketForm.subject}
                  onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="What is your issue?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">Message</label>
                <textarea
                  value={ticketForm.message}
                  onChange={(e) => setTicketForm({ ...ticketForm, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 resize-none"
                  placeholder="Describe your issue in detail..."
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Submit Ticket
              </Button>
            </form>
          )}
        </div>

        {/* Contact Info */}
        <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl border border-red-200 p-6 space-y-3">
          <h3 className="text-lg font-bold text-zinc-900">Direct Contact</h3>
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-red-600" />
            <p className="text-zinc-700">
              Email: <span className="font-semibold">support@cstrustfund.com</span>
            </p>
          </div>
          <p className="text-sm text-zinc-600">
            We respond to all support emails within 24 hours during business days.
          </p>
        </div>
      </div>
    </DashboardLayout>
  )
}
