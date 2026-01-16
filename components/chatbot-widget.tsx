"use client"

import { useState } from "react"
import { MessageCircle, X, Send, Loader } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

const botResponses: Record<string, string> = {
  "how do i create":
    'To create a savings goal, go to "Create Savings Goal" from the dashboard, set your target amount, contribution frequency (daily/weekly/monthly), and start saving!',
  "minimum contribution":
    "The minimum contribution amount is 1,000 FCFA daily. You can set higher amounts based on your goals.",
  "join group":
    'To join a savings group, navigate to "Savings Groups", browse available groups, and click "Request to Join". The admin will approve your request.',
  "kyc verification":
    'KYC (Know Your Customer) helps us verify your identity for compliance. Go to "KYC Verification" to complete the process with your ID and address.',
  withdraw:
    'You can request withdrawals from your savings. Go to your savings goal and click "Request Withdrawal". Your request will be reviewed.',
  "ai smartsave":
    "AI SmartSave helps you create optimized savings plans. It calculates your potential earnings and suggests the best savings frequency for your goals.",
  "transaction pin":
    "Your transaction PIN is a 4-digit security code set during signup. You use it to confirm important transactions.",
  "savings groups":
    "Savings groups allow you to pool resources with others to reach collective goals. Join existing groups or create your own.",
  balance: "You can check your balance on the dashboard. It shows your total savings across all plans and groups.",
  support: "You can contact us through the Help & Support page. We have FAQs and a support team ready to assist you.",
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! 👋 I'm your AI assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    for (const [keyword, response] of Object.entries(botResponses)) {
      if (lowerMessage.includes(keyword)) {
        return response
      }
    }

    return "I'm not sure about that. You can check the Help & Support page or contact our support team for more assistance."
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate bot thinking time
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(input),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsLoading(false)
    }, 500)
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-red-600 to-red-800 text-white shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center z-40 md:bottom-20 px-0 py-[] justify-center leading-7 tracking-normal"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-24px)] h-96 bg-white rounded-xl shadow-2xl border border-zinc-200 flex flex-col z-40 md:bottom-32">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-800 text-white p-4 rounded-t-xl">
            <h3 className="font-bold text-lg">AI Support Chat</h3>
            <p className="text-xs text-red-100">Available 24/7</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-gradient-to-br from-red-600 to-red-800 text-white rounded-br-none"
                      : "bg-zinc-100 text-zinc-900 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-zinc-100 text-zinc-900 px-4 py-2 rounded-lg rounded-bl-none">
                  <Loader className="w-4 h-4 animate-spin" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-zinc-200 p-4 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1 px-3 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 text-sm"
            />
            <Button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white p-2"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
