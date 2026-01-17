// "use client"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import {
//   Plus,
//   Lock,
//   ArrowRight,
//   CreditCard,
//   Zap,
//   Eye,
//   EyeOff,
//   X,
//   ArrowUpRight,
//   Wallet,
//   Send,
//   AlertCircle,
// } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { TransactionPinModal } from "@/components/transaction-pin-modal"
// import { DashboardLayout } from "@/components/dashboard-layout"
// import { XAF } from "@/lib/currency"
// import { TopCommunitiesSidebar } from "@/components/top-communities-sidebar"
// import { auth } from "@clerk/nextjs/server"

// // Define a type for SavingsGoal for better type safety
// interface SavingsGoal {
//   id: number | string
//   name: string
//   description?: string
//   targetAmount?: number
//   amountSaved?: number
//   frequency?: string
//   duration?: number
//   createdAt?: string
//   transactions?: Transaction[]
//   title?: string // Added for potential consistency, though 'name' is used more
//   status?: string // Added for savings goals
// }

// // Define a more specific type for SavingsGroup
// interface SavingsGroup {
//   id: number
//   groupName: string
//   description: string
//   target: number
//   current: number
//   members: number
//   monthlyTarget: number
//   creatorName: string
//   invitedMembers?: any[] // Assuming this might exist based on the update
//   totalMembers?: number // Added based on the update
// }

// interface Transaction {
//   id: string
//   date: string
//   amount: number
//   method: string
//   status: "completed" | "pending" | "failed"
//   details: string
//   type?: string // Added for distinguishing top-ups etc.
// }

// export const dynamic = "force-dynamic"

// export default function DashboardPage() {
//   const router = useRouter()
//   // const { user, isLoading, fetchUser } = await auth() // Added fetchUser
//   const [kycAccepted, setKycAccepted] = useState(false) // This state might be redundant now but kept for now
//   const [showTransactionPin, setShowTransactionPin] = useState(false)
//   const [transactionType, setTransactionType] = useState("")

//   const [notifications, setNotifications] = useState<any[]>([])
//   const [mainBalance, setMainBalance] = useState(500000)

//   const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([])
//   // const [showWelcome, setShowWelcome] = useState(true)
//   const [showKycModal, setShowKycModal] = useState(false) // Added for KYC verification modal
//   const [hideBalance, setHideBalance] = useState(false)
//   const [savingsGroups, setSavingsGroups] = useState<SavingsGroup[]>([]) // Use the specific SavingsGroup type
//   const [selectedGoal, setSelectedGoal] = useState<SavingsGoal | null>(null)
//   const [showPaymentModal, setShowPaymentModal] = useState(false)
//   const [showHistoryModal, setShowHistoryModal] = useState(false)
//   const [showPINModal, setShowPINModal] = useState(false)
//   const [paymentMethod, setPaymentMethod] = useState("")
//   const [transactionPIN, setTransactionPIN] = useState("")
//   const [paymentAmount, setPaymentAmount] = useState("")
//   const [mobileNumber, setMobileNumber] = useState("")
//   const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "" })
//   const [isProcessing, setIsProcessing] = useState(false)
//   const [processingStep, setProcessingStep] = useState("")
//   const [isTopUpMode, setIsTopUpMode] = useState(false)


//   const handleTransferClick = (type: string) => {
//     if (type === "Top Up") {
//       setIsTopUpMode(true)
//       setShowPaymentModal(true)
//     } else {
//       // existing transfer logic
//       setSelectedGoal({ name: type, id: type }) // Mocking selection for transfer type
//       setShowPaymentModal(true)
//     }
//   }

//   return (
//     <DashboardLayout currentBalance={hideBalance ? 0 : mainBalance}>
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 md:p-8">
//         {/* Main Content - Left Side */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Account Balance Card */}
//           {/* {dashboardContent} */}

//           {/* KYC Alert */}
//           {showKycModal &&
//             // user &&
//             !kycAccepted && ( // Changed to use kycAccepted
//               <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//                 <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-lg">
//                   <div className="flex items-center justify-center mb-4">
//                     <div className="bg-red-100 rounded-full p-4">
//                       <AlertCircle className="w-8 h-8 text-red-600" />
//                     </div>
//                   </div>

//                   <h2 className="text-2xl font-bold text-center mb-2 text-zinc-900">KYC Verification Required</h2>
//                   <p className="text-center text-zinc-600 mb-6">
//                     Before you can access savings features, top-up, and other services, you need to complete KYC
//                     verification.
//                   </p>

//                   <div className="space-y-3 mb-6 bg-red-50 rounded-lg p-4">
//                     <p className="text-sm text-red-800 font-semibold">Required information:</p>
//                     <ul className="text-sm text-red-700 space-y-1">
//                       <li>• Valid government ID</li>
//                       <li>• Proof of address</li>
//                       <li>• Phone number verification</li>
//                     </ul>
//                   </div>

//                   <Button
//                     onClick={async () => {
//                       // Added async for potential Supabase call
//                       // Ideally, this would trigger a navigation to a KYC form or initiate a process.
//                       // For this example, we'll simulate success and update local storage/Supabase.

//                       // try {
//                       //   // Use the created supabase client instance
//                       //   const supabase = createClient()
//                       //   const { error } = await supabase
//                       //     .from("kyc_submissions")
//                       //     .update({ status: "approved", reviewed_at: new Date().toISOString() })
//                       //     .eq("user_id", user.id)

//                       //   if (error) {
//                       //     console.error("Error updating KYC status in Supabase:", error)
//                       //     alert("Failed to update KYC status. Please try again later.")
//                       //     return
//                       //   }

//                       //   // If Supabase update is successful, update local state and potentially refetch user
//                       //   setKycAccepted(true)
//                       //   setShowKycModal(false)
//                       //   addNotification("KYC Verified", "Your account has been successfully verified!", "success")

//                       //   // Optionally, refetch user data to ensure auth context is up-to-date
//                       //   await fetchUser() // Assuming fetchUser updates the auth context
//                       // } catch (e) {
//                       //   console.error("Unexpected error during KYC update:", e)
//                       //   alert("An unexpected error occurred. Please try again.")
//                       // }
//                     }}
//                     className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white rounded-lg h-12 font-semibold"
//                   >
//                     Start KYC Verification
//                   </Button>
//                 </div>
//               </div>
//             )}

//           {/* Quick Actions */}
//           {/* This section seems to be missing or replaced by the button grid */}

//           {/* My Savings Goals */}
//           {/* This section is already rendered within dashboardContent */}

//           {/* Savings Groups */}
//           {/* This section is already rendered within dashboardContent */}

//           {/* Recent Transactions */}
//           {/* This section seems to be missing */}
//         </div>

//         <div className="hidden lg:block">
//           <TopCommunitiesSidebar />
//         </div>
//       </div>

//       {/* Modals */}
//       <TransactionPinModal
//         isOpen={showTransactionPin}
//         onClose={() => setShowTransactionPin(false)}
//         onSuccess={handleTransactionSuccess}
//         transactionType={transactionType}
//       />

//       {/* Payment Method Modal - Centered */}
//       {showPaymentModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-lg font-bold text-zinc-900">{isTopUpMode ? "Top Up" : "Select Payment Method"}</h3>
//               <button
//                 onClick={() => {
//                   setShowPaymentModal(false)
//                   setPaymentMethod("")
//                   setPaymentAmount("")
//                   setMobileNumber("")
//                   setCardDetails({ number: "", expiry: "", cvv: "" })
//                   setIsTopUpMode(false) // Reset top-up mode
//                   setSelectedGoal(null) // Clear selected goal
//                 }}
//                 className="text-zinc-400 hover:text-zinc-600"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>

//             {!paymentMethod ? (
//               <div className="space-y-3">
//                 {/* CHANGE START */}
//                 {/* Removed Account Balance option - Top Up only for external methods */}
//                 {[
//                   { id: "mtn", name: "MTN Mobile Money", icon: "📱", description: "Pay via MTN" },
//                   { id: "orange", name: "Orange Money", icon: "🟠", description: "Pay via Orange" },
//                   { id: "card", name: "Credit Card", icon: "💳", description: "Visa/Mastercard" },
//                 ].map((method) => (
//                   <button
//                     key={method.id}
//                     onClick={() => setPaymentMethod(method.id)}
//                     className="w-full p-4 border-2 border-red-600 rounded-lg hover:bg-red-50 transition text-left font-semibold text-zinc-900"
//                   >
//                     <div className="flex items-center gap-3">
//                       <span className="text-2xl">{method.icon}</span>
//                       <div className="flex-1">
//                         <p className="font-semibold text-zinc-900">{method.name}</p>
//                         <p className="text-xs text-zinc-500">{method.description}</p>
//                       </div>
//                     </div>
//                   </button>
//                 ))}
//                 {/* CHANGE END */}
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {/* CHANGE START */}
//                 {/* Conditional rendering for each payment method */}
//                 {paymentMethod === "mtn" && (
//                   <>
//                     <p className="text-sm text-zinc-600">Enter your MTN Mobile Money details</p>
//                     <input
//                       type="tel"
//                       value={mobileNumber}
//                       onChange={(e) => setMobileNumber(e.target.value)}
//                       placeholder="Phone number (e.g., 237650123456)"
//                       className="w-full p-3 border-2 border-red-600 rounded-lg focus:outline-none"
//                     />
//                     <input
//                       type="number"
//                       value={paymentAmount}
//                       onChange={(e) => setPaymentAmount(e.target.value)}
//                       placeholder="Amount in XAF"
//                       className="w-full p-3 border-2 border-red-600 rounded-lg focus:outline-none"
//                     />
//                   </>
//                 )}

//                 {paymentMethod === "orange" && (
//                   <>
//                     <p className="text-sm text-zinc-600">Enter your Orange Money details</p>
//                     <input
//                       type="tel"
//                       value={mobileNumber}
//                       onChange={(e) => setMobileNumber(e.target.value)}
//                       placeholder="Phone number (e.g., 237650123456)"
//                       className="w-full p-3 border-2 border-red-600 rounded-lg focus:outline-none"
//                     />
//                     <input
//                       type="number"
//                       value={paymentAmount}
//                       onChange={(e) => setPaymentAmount(e.target.value)}
//                       placeholder="Amount in XAF"
//                       className="w-full p-3 border-2 border-red-600 rounded-lg focus:outline-none"
//                     />
//                   </>
//                 )}

//                 {paymentMethod === "card" && (
//                   <>
//                     <p className="text-sm text-zinc-600">Enter your credit card details</p>
//                     <input
//                       type="text"
//                       value={cardDetails.number}
//                       onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
//                       placeholder="Card number (16 digits)"
//                       // maxLength="16"
//                       className="w-full p-3 border-2 border-red-600 rounded-lg focus:outline-none"
//                     />
//                     <div className="grid grid-cols-2 gap-3">
//                       <input
//                         type="text"
//                         value={cardDetails.expiry}
//                         onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
//                         placeholder="MM/YY"
//                         // maxLength="5"
//                         className="p-3 border-2 border-red-600 rounded-lg focus:outline-none"
//                       />
//                       <input
//                         type="text"
//                         value={cardDetails.cvv}
//                         onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
//                         placeholder="CVV"
//                         // maxLength="3"
//                         className="p-3 border-2 border-red-600 rounded-lg focus:outline-none"
//                       />
//                     </div>
//                     <input
//                       type="number"
//                       value={paymentAmount}
//                       onChange={(e) => setPaymentAmount(e.target.value)}
//                       placeholder="Amount in XAF"
//                       className="w-full p-3 border-2 border-red-600 rounded-lg focus:outline-none"
//                     />
//                   </>
//                 )}
//                 {/* CHANGE END */}

//                 <div className="flex gap-3">
//                   <Button
//                     onClick={() => {
//                       setShowPaymentModal(false)
//                       setPaymentMethod("")
//                       setPaymentAmount("")
//                       setMobileNumber("")
//                       setCardDetails({ number: "", expiry: "", cvv: "" })
//                       setIsTopUpMode(false) // Reset top-up mode
//                       setSelectedGoal(null) // Clear selected goal
//                     }}
//                     variant="outline"
//                     className="flex-1 border-zinc-200"
//                   >
//                     Back
//                   </Button>
//                   <Button
//                     // onClick={
//                     //   isTopUpMode
//                     //     ? handleTopUpPayment
//                     //     : () => {
//                     //         // Logic for saving to a goal
//                     //         if (!paymentAmount) {
//                     //           alert("Please enter an amount")
//                     //           return
//                     //         }
//                     //         if ((paymentMethod === "mtn" || paymentMethod === "orange") && !mobileNumber) {
//                     //           alert("Please enter your phone number")
//                     //           return
//                     //         }
//                     //         if (
//                     //           paymentMethod === "card" &&
//                     //           (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv)
//                     //         ) {
//                     //           alert("Please enter complete card details")
//                     //           return
//                     //         }
//                     //         setShowPaymentModal(false)
//                     //         setShowPINModal(true)
//                     //       }
//                     // }
//                     className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white"
//                   >
//                     Continue
//                   </Button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* PIN Verification Modal */}
//       {/* Update PIN verification modal to handle Top Up processing */}
//       {showPINModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl p-6 w-full max-w-md">
//             {isProcessing ? (
//               <div className="text-center py-8">
//                 <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mb-4"></div>
//                 <p className="text-lg font-semibold text-zinc-900">{processingStep}</p>
//                 <p className="text-sm text-zinc-500 mt-2">Please wait...</p>
//               </div>
//             ) : (
//               <>
//                 <h3 className="text-lg font-bold text-zinc-900 mb-4">Confirm {isTopUpMode ? "Top Up" : "Payment"}</h3>
//                 <p className="text-sm text-zinc-600 mb-4">Amount: {XAF(Number(paymentAmount) || 0)}</p>
//                 <p className="text-sm text-zinc-600 mb-6">Enter your 4-digit Transaction PIN</p>
//                 <input
//                   type="password"
//                   maxLength={4}
//                   value={transactionPIN}
//                   onChange={(e) => setTransactionPIN(e.target.value.replace(/\D/g, ""))}
//                   placeholder="••••"
//                   className="w-full p-3 border-2 border-red-600 rounded-lg text-center text-2xl font-bold tracking-widest mb-6 focus:outline-none"
//                 />
//                 <div className="flex gap-3">
//                   <Button
//                     onClick={() => {
//                       setShowPINModal(false)
//                       setTransactionPIN("")
//                       setPaymentMethod("")
//                       setPaymentAmount("")
//                       setMobileNumber("")
//                       setCardDetails({ number: "", expiry: "", cvv: "" })
//                       setIsTopUpMode(false) // Reset top-up mode
//                     }}
//                     variant="outline"
//                     className="flex-1 border-zinc-200"
//                   >
//                     Cancel
//                   </Button>
//                   <Button
//                     onClick={() => {
//                       if (transactionPIN.length === 4) {
//                         setIsProcessing(true)
//                         const amount = Number(paymentAmount) || 0

//                         if (isTopUpMode) {
//                           // This block handles the Top Up functionality
//                           if (paymentMethod === "account") {
//                             // This condition is now removed from the UI, but this logic remains for completeness if it were re-added
//                             if (mainBalance < amount) {
//                               alert("Insufficient balance")
//                               setIsProcessing(false)
//                               return
//                             }

//                             setProcessingStep("Verifying PIN...")
//                             setTimeout(() => {
//                               setProcessingStep("Processing Top Up...")
//                               setTimeout(() => {
//                                 setProcessingStep("Adding to main account...")
//                                 setTimeout(() => {
//                                   setMainBalance((prev) => prev + amount)
//                                   const userData = JSON.parse(localStorage.getItem("user_data") || "{}")
//                                   userData.accountBalance = mainBalance + amount
//                                   localStorage.setItem("user_data", JSON.stringify(userData))

//                                   const topUpTransaction: Transaction = {
//                                     id: `topup_${Date.now()}`,
//                                     date: new Date().toISOString(),
//                                     amount: amount,
//                                     type: "top-up",
//                                     method: "Account Transfer",
//                                     status: "completed",
//                                     details: "Direct account balance top-up",
//                                   }
//                                   const transactions = JSON.parse(localStorage.getItem("transactions") || "[]")
//                                   transactions.push(topUpTransaction)
//                                   localStorage.setItem("transactions", JSON.stringify(transactions))

//                                   setIsProcessing(false)
//                                   setShowPINModal(false)
//                                   setTransactionPIN("")
//                                   setPaymentMethod("")
//                                   setPaymentAmount("")
//                                   setMobileNumber("")
//                                   setCardDetails({ number: "", expiry: "", cvv: "" })
//                                   setIsTopUpMode(false)

//                                   // addNotification(
//                                   //   "Top Up Successful",
//                                   //   `${XAF(amount)} has been added to your main account.`,
//                                   //   "success",
//                                   // )
//                                   alert(
//                                     `✓ Top Up Successful!\n\n${XAF(amount)} has been added to your main account balance.`,
//                                   )
//                                 }, 1000)
//                               }, 1000)
//                             }, 1000)
//                           } else {
//                             // Top Up using external methods (MTN, Orange, Card)
//                             const processingSteps = [
//                               "Verifying PIN...",
//                               `Connecting to ${paymentMethod === "mtn" ? "MTN" : paymentMethod === "orange" ? "Orange" : "Card Provider"}...`,
//                               "Processing Top Up...",
//                               "Waiting for confirmation...",
//                             ]
//                             let stepIndex = 0
//                             const processStep = () => {
//                               if (stepIndex < processingSteps.length) {
//                                 setProcessingStep(processingSteps[stepIndex])
//                                 stepIndex++
//                                 setTimeout(processStep, 2000)
//                               } else {
//                                 const isSuccessful = Math.random() < 0.7 // Simulate success/failure
//                                 if (isSuccessful) {
//                                   setMainBalance((prev) => prev + amount)
//                                   const userData = JSON.parse(localStorage.getItem("user_data") || "{}")
//                                   userData.accountBalance = mainBalance + amount
//                                   localStorage.setItem("user_data", JSON.stringify(userData))

//                                   const topUpTransaction: Transaction = {
//                                     id: `topup_${Date.now()}`,
//                                     date: new Date().toISOString(),
//                                     amount: amount,
//                                     type: "top-up",
//                                     method:
//                                       paymentMethod === "card"
//                                         ? `Card ending in ${cardDetails.number.slice(-4)}`
//                                         : paymentMethod === "mtn"
//                                           ? `MTN (${mobileNumber})`
//                                           : `Orange (${mobileNumber})`,
//                                     status: "completed",
//                                     details: `External payment top-up via ${paymentMethod}`,
//                                   }
//                                   const transactions = JSON.parse(localStorage.getItem("transactions") || "[]")
//                                   transactions.push(topUpTransaction)
//                                   localStorage.setItem("transactions", JSON.stringify(transactions))

//                                   setProcessingStep("Transfer Approved ✓")
//                                   setTimeout(() => {
//                                     setIsProcessing(false)
//                                     setShowPINModal(false)
//                                     setTransactionPIN("")
//                                     setPaymentMethod("")
//                                     setPaymentAmount("")
//                                     setMobileNumber("")
//                                     setCardDetails({ number: "", expiry: "", cvv: "" })
//                                     setIsTopUpMode(false)

//                                     // addNotification(
//                                     //   "Top Up Confirmed",
//                                     //   `${XAF(amount)} transfer from ${paymentMethod.toUpperCase()} approved and added to your account.`,
//                                     //   "success",
//                                     // )
//                                     alert(
//                                       `✓ Top Up Confirmed!\n\n${XAF(amount)} has been successfully transferred and added to your main account.`,
//                                     )
//                                   }, 1500)
//                                 } else {
//                                   setProcessingStep("Transfer Failed ✗")
//                                   setTimeout(() => {
//                                     setIsProcessing(false)
//                                     setShowPINModal(false)
//                                     setTransactionPIN("")
//                                     setPaymentMethod("")
//                                     setPaymentAmount("")
//                                     setMobileNumber("")
//                                     setCardDetails({ number: "", expiry: "", cvv: "" })
//                                     setIsTopUpMode(false)

//                                     // addNotification(
//                                     //   "Top Up Failed",
//                                     //   `${paymentMethod.toUpperCase()} transfer of ${XAF(amount)} was declined.`,
//                                     //   "failed",
//                                     // )
//                                     alert(
//                                       `✗ Top Up Failed!\n\nYour ${paymentMethod.toUpperCase()} transfer was not approved.\n\nPlease try again.`,
//                                     )
//                                   }, 1500)
//                                 }
//                               }
//                             }
//                             processStep()
//                           }
//                         } else {
//                           // This block handles saving to a goal
//                           if (!selectedGoal) {
//                             alert("No savings goal selected.")
//                             setIsProcessing(false)
//                             return
//                           }

//                           if (paymentMethod === "account") {
//                             // Account balance saving - handled by 'handleSaveNow' calling this flow
//                             if (mainBalance < amount) {
//                               alert("Insufficient balance. Please try a smaller amount.")
//                               setIsProcessing(false)
//                               return
//                             }

//                             setProcessingStep("Verifying PIN...")
//                             setTimeout(() => {
//                               setProcessingStep("Processing payment...")
//                               setTimeout(() => {
//                                 setProcessingStep("Deducting from account...")
//                                 setTimeout(() => {
//                                   setMainBalance((prev) => prev - amount)
//                                   const updatedGoals = savingsGoals.map((g) =>
//                                     g.id === selectedGoal.id
//                                       ? {
//                                           ...g,
//                                           amountSaved: (g.amountSaved || 0) + amount,
//                                           transactions: [
//                                             ...(g.transactions || []),
//                                             {
//                                               id: `txn_${Date.now()}`,
//                                               date: new Date().toISOString(),
//                                               amount: amount,
//                                               method: paymentMethod,
//                                               status: "completed",
//                                               details: "Direct account deduction for savings",
//                                               type: "savings",
//                                             },
//                                           ],
//                                         }
//                                       : g,
//                                   )
//                                   // setSavingsGoals(updatedGoals)
//                                   localStorage.setItem("savings_goals", JSON.stringify(updatedGoals))

//                                   setIsProcessing(false)
//                                   setShowPINModal(false)
//                                   setTransactionPIN("")
//                                   setPaymentMethod("")
//                                   setPaymentAmount("")
//                                   setMobileNumber("")
//                                   setCardDetails({ number: "", expiry: "", cvv: "" })

//                                   // addNotification(
//                                   //   "Savings Confirmed",
//                                   //   `${XAF(amount)} successfully saved to "${selectedGoal.name}". Funds locked until withdrawal date.`,
//                                   //   "success",
//                                   // )
//                                   alert(
//                                     `✓ Payment Successful!\n\n${XAF(amount)} has been deducted and saved to your goal.\n\nYour funds are locked until ${selectedGoal.duration} months from now.\n\nYou'll receive reminders as per your ${selectedGoal.frequency} savings schedule.`,
//                                   )
//                                 }, 1000)
//                               }, 1000)
//                             }, 1000)
//                           } else {
//                             // External payment methods for savings goals
//                             const processingSteps = [
//                               "Verifying PIN...",
//                               `Connecting to ${paymentMethod === "mtn" ? "MTN" : paymentMethod === "orange" ? "Orange" : "Card Provider"}...`,
//                               "Processing payment...",
//                               "Waiting for confirmation...",
//                             ]
//                             let stepIndex = 0
//                             const processStep = () => {
//                               if (stepIndex < processingSteps.length) {
//                                 setProcessingStep(processingSteps[stepIndex])
//                                 stepIndex++
//                                 setTimeout(processStep, 2000)
//                               } else {
//                                 const isSuccessful = Math.random() < 0.7 // Simulate success/failure
//                                 if (isSuccessful) {
//                                   const updatedGoals = savingsGoals.map((g) =>
//                                     g.id === selectedGoal.id
//                                       ? {
//                                           ...g,
//                                           amountSaved: (g.amountSaved || 0) + amount,
//                                           transactions: [
//                                             ...(g.transactions || []),
//                                             {
//                                               id: `txn_${Date.now()}`,
//                                               date: new Date().toISOString(),
//                                               amount: amount,
//                                               method: paymentMethod,
//                                               status: "completed",
//                                               details:
//                                                 paymentMethod === "card"
//                                                   ? `Card ending in ${cardDetails.number.slice(-4)}`
//                                                   : mobileNumber,
//                                               type: "savings",
//                                             },
//                                           ],
//                                         }
//                                       : g,
//                                   )
//                                   // setSavingsGoals(updatedGoals)
//                                   localStorage.setItem("savings_goals", JSON.stringify(updatedGoals))

//                                   setProcessingStep("Transfer Approved ✓")
//                                   setTimeout(() => {
//                                     setIsProcessing(false)
//                                     setShowPINModal(false)
//                                     setTransactionPIN("")
//                                     setPaymentMethod("")
//                                     setPaymentAmount("")
//                                     setMobileNumber("")
//                                     setCardDetails({ number: "", expiry: "", cvv: "" })

//                                     // addNotification(
//                                     //   "Payment Confirmed",
//                                     //   `${XAF(amount)} transfer from ${paymentMethod.toUpperCase()} approved and saved to "${selectedGoal.name}".`,
//                                     //   "success",
//                                     // )
//                                     alert(
//                                       `✓ Payment Confirmed!\n\n${XAF(amount)} has been successfully transferred and saved to your goal.\n\nYour funds are locked until ${selectedGoal.duration} months from now.`,
//                                     )
//                                   }, 1500)
//                                 } else {
//                                   setProcessingStep("Transfer Failed ✗")
//                                   setTimeout(() => {
//                                     setIsProcessing(false)
//                                     setShowPINModal(false)
//                                     setTransactionPIN("")
//                                     setPaymentMethod("")
//                                     setPaymentAmount("")
//                                     setMobileNumber("")
//                                     setCardDetails({ number: "", expiry: "", cvv: "" })

//                                     // addNotification(
//                                     //   "Payment Failed",
//                                     //   `${paymentMethod.toUpperCase()} transfer of ${XAF(amount)} was declined. Please try again.`,
//                                     //   "failed",
//                                     // )
//                                     alert(
//                                       `✗ Payment Failed!\n\nYour ${paymentMethod.toUpperCase()} transfer was not approved.\n\nPlease check your account and try again.`,
//                                     )
//                                   }, 1500)
//                                 }
//                               }
//                             }
//                             processStep()
//                           }
//                         }
//                       } else {
//                         alert("Please enter a valid 4-digit PIN")
//                       }
//                     }}
//                     className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white"
//                   >
//                     Confirm
//                   </Button>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       )}

//       {/* History Modal with Download Transcript */}
//       {showHistoryModal && selectedGoal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-lg font-bold text-zinc-900">{selectedGoal.name} - Savings History</h3>
//               <button onClick={() => setShowHistoryModal(false)} className="text-zinc-400 hover:text-zinc-600">
//                 <X className="w-5 h-5" />
//               </button>
//             </div>

//             <div className="grid grid-cols-3 gap-4 mb-6">
//               <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg">
//                 <p className="text-xs text-zinc-600 mb-1">Total Saved</p>
//                 <p className="text-lg font-bold text-red-600">{XAF(selectedGoal.amountSaved || 0)}</p>
//               </div>
//               <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg">
//                 <p className="text-xs text-zinc-600 mb-1">Target</p>
//                 <p className="text-lg font-bold text-red-600">{XAF(selectedGoal.targetAmount || 0)}</p>
//               </div>
//               <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg">
//                 <p className="text-xs text-zinc-600 mb-1">Completion</p>
//                 <p className="text-lg font-bold text-red-600">
//                   {Math.round(((selectedGoal.amountSaved || 0) / (selectedGoal.targetAmount || 1)) * 100)}%
//                 </p>
//               </div>
//             </div>

//             <h4 className="font-semibold text-zinc-900 mb-3">Recent Transactions</h4>
//             <div className="space-y-2 mb-6">
//               {selectedGoal.transactions && selectedGoal.transactions.length > 0 ? (
//                 selectedGoal.transactions.map((txn, idx) => (
//                   <div key={idx} className="flex items-center justify-between p-3 bg-zinc-50 rounded-lg">
//                     <div>
//                       <p className="text-sm font-medium text-zinc-900">{txn.method}</p>
//                       <p className="text-xs text-zinc-500">{new Date(txn.date).toLocaleDateString()}</p>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-sm font-bold text-red-600">{XAF(txn.amount)}</p>
//                       <p className="text-xs text-green-600">✓ {txn.status}</p>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-sm text-zinc-500">No transactions yet</p>
//               )}
//             </div>

//             <Button
//               onClick={() => {
//                 const transcript = `
//                 SAVINGS GOAL TRANSCRIPT
//                 =====================
//                 Goal: ${selectedGoal.name}
//                 Description: ${selectedGoal.description || "N/A"}
//                 Target Amount: ${XAF(selectedGoal.targetAmount || 0)}
//                 Total Saved: ${XAF(selectedGoal.amountSaved || 0)}
//                 Completion: ${Math.round(((selectedGoal.amountSaved || 0) / (selectedGoal.targetAmount || 1)) * 100)}%
//                 Frequency: ${selectedGoal.frequency || "N/A"}
//                 Duration: ${selectedGoal.duration || 0} months
//                 Created: ${selectedGoal.createdAt ? new Date(selectedGoal.createdAt).toLocaleDateString() : "N/A"}

//                 TRANSACTION HISTORY
//                 ===================
//                 ${
//                   selectedGoal.transactions && selectedGoal.transactions.length > 0
//                     ? selectedGoal.transactions
//                         .map(
//                           (txn) =>
//                             `Date: ${new Date(txn.date).toLocaleDateString()} | Method: ${txn.method} | Amount: ${XAF(txn.amount)} | Status: ${txn.status}`,
//                         )
//                         .join("\n")
//                     : "No transactions"
//                 }

//                 Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}
//                 `.trim()

//                 const element = document.createElement("a")
//                 element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(transcript))
//                 element.setAttribute("download", `${selectedGoal.name}_transcript.txt`)
//                 element.style.display = "none"
//                 document.body.appendChild(element)
//                 element.click()
//                 document.body.removeChild(element)
//               }}
//               className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
//             >
//               Download Transcript
//             </Button>
//           </div>
//         </div>
//       )}
//     </DashboardLayout>
//   )
// }
