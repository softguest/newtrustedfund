"use client"

import { useState } from "react"
// import { useAuth } from "@/lib/auth-context"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, Lock } from "lucide-react"

interface TransactionPinModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  transactionType: string
}

export function TransactionPinModal({ isOpen, onClose, onSuccess, transactionType }: TransactionPinModalProps) {
  // const { verifyPin } = useAuth()
  const [pin, setPin] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleVerifyPin = async () => {
    if (!pin) {
      setError("Please enter your transaction PIN")
      return
    }

    setIsLoading(true)
    setError("")

    // try {
    //   if (verifyPin(pin)) {
    //     onSuccess()
    //     setPin("")
    //     onClose()
    //   } else {
    //     setError("Invalid PIN. Please try again.")
    //     setPin("")
    //   }
    // } finally {
    //   setIsLoading(false)
    // }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-brand-red" />
            Verify Transaction
          </DialogTitle>
          <DialogDescription>
            Enter your 4-digit transaction PIN to complete this {transactionType.toLowerCase()}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="pin" className="text-sm font-bold text-zinc-800">
              Transaction PIN
            </Label>
            <Input
              id="pin"
              type="password"
              placeholder="••••"
              maxLength={4}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
              className="h-12 bg-zinc-50 border-zinc-200 rounded-xl text-center text-2xl tracking-widest"
              autoFocus
            />
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button
              onClick={handleVerifyPin}
              disabled={isLoading || pin.length !== 4}
              className="flex-1 bg-brand-red hover:bg-brand-dark text-white"
            >
              {isLoading ? "Verifying..." : "Verify"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
