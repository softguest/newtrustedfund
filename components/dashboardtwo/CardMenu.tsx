"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { ArrowUpRight, Plus, Send, Wallet, Zap } from 'lucide-react'
import { useRouter } from 'next/navigation'


const CardMenu = () => {
  const router = useRouter()
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showHistoryModal, setShowHistoryModal] = useState(false)
  const [showPINModal, setShowPINModal] = useState(false) 
// const [selectedGoal, setSelectedGoal] = useState<SavingsGoal | null>(null)

  const [topUpAmount, setTopUpAmount] = useState("")
  const [isTopUpMode, setIsTopUpMode] = useState(false)
    const handleTransferClick = (type: string) => {
        if (type === "Top Up") {
        setIsTopUpMode(true)
        setShowPaymentModal(true)
        } else {
        // existing transfer logic
        // setSelectedGoal({ name: type, id: type }) // Mocking selection for transfer type
        setShowPaymentModal(true)
        }
    }

    // const handleTransactionSuccess = () => {
    //     // This function is now handled by the specific payment processing logic
    //     // but can be used for generic success notifications if needed.
    //     alert(`${transactionType} completed successfully!`) // This might need refinement based on actual transactionType
    //     if (transactionType.includes("send")) {
    //     setMainBalance((prev) => prev - 500) // Placeholder deduction
    //     }
    // }

  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          <Button
            onClick={() => handleTransferClick("Top Up")}
            className="h-16 bg-white border-2 border-red-600 text-zinc-900 hover:bg-red-50 rounded-lg font-semibold text-sm flex flex-col items-center justify-center p-3 transition-all duration-300 hover:scale-105 active:bg-gradient-to-br active:from-red-600 active:to-red-800 active:text-white active:border-red-800 shadow-sm hover:shadow-md"
          >
            <ArrowUpRight className="w-5 h-5 mb-1" />
            <span className="text-xs">Top Up</span>
          </Button>
          <Button
            onClick={() => router.push("/create-savings-plan")}
            className="h-16 bg-white border-2 border-red-600 text-zinc-900 hover:bg-red-50 rounded-lg font-semibold text-sm flex flex-col items-center justify-center p-3 transition-all duration-300 hover:scale-105 active:bg-gradient-to-br active:from-red-600 active:to-red-800 active:text-white active:border-red-800 shadow-sm hover:shadow-md"
          >
            <Plus className="w-5 h-5 mb-1" />
            <span className="text-xs">Create Goal</span>
          </Button>
          <Button
            onClick={() => router.push("/join-savings-group")}
            className="h-16 bg-white border-2 border-red-600 text-zinc-900 hover:bg-red-50 rounded-lg font-semibold text-sm flex flex-col items-center justify-center p-3 transition-all duration-300 hover:scale-105 active:bg-gradient-to-br active:from-red-600 active:to-red-800 active:text-white active:border-red-800 shadow-sm hover:shadow-md"
          >
            <Plus className="w-5 h-5 mb-1" />
            <span className="text-xs">Join Group</span>
          </Button>
          <Button
            onClick={() => handleTransferClick("Withdraw")}
            className="h-16 bg-white border-2 border-red-600 text-zinc-900 hover:bg-red-50 rounded-lg font-semibold text-sm flex flex-col items-center justify-center p-3 transition-all duration-300 hover:scale-105 active:bg-gradient-to-br active:from-red-600 active:to-red-800 active:text-white active:border-red-800 shadow-sm hover:shadow-md"
          >
            <Wallet className="w-5 h-5 mb-1" />
            <span className="text-xs">Withdraw</span>
          </Button>
          <Button
            onClick={() => handleTransferClick("Transfer")}
            className="h-16 bg-white border-2 border-red-600 text-zinc-900 hover:bg-red-50 rounded-lg font-semibold text-sm flex flex-col items-center justify-center p-3 transition-all duration-300 hover:scale-105 active:bg-gradient-to-br active:from-red-600 active:to-red-800 active:text-white active:border-red-800 shadow-sm hover:shadow-md"
          >
            <Send className="w-5 h-5 mb-1" />
            <span className="text-xs">Transfer</span>
          </Button>
          <Button
            onClick={() => router.push("/ai-smartsave")}
            className="h-16 bg-white border-2 border-red-600 text-zinc-900 hover:bg-red-50 rounded-lg font-semibold text-sm flex flex-col items-center justify-center p-3 transition-all duration-300 hover:scale-105 active:bg-gradient-to-br active:from-red-600 active:to-red-800 active:text-white active:border-red-800 shadow-sm hover:shadow-md"
          >
            <Zap className="w-5 h-5 mb-1" />
            <span className="text-xs">AI Insights</span>
          </Button>
        </div>
  )
}

export default CardMenu