// "use client";

// import { useState, useEffect } from "react";
// import { useSignIn, useSignUp } from "@clerk/nextjs";
// import { Button } from "@/components/ui/button";


// export default function AuthPage() {
//   const [mode, setMode] = useState<"login" | "signup" | "verify">("login");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [code, setCode] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const { signIn, setActive: setActiveSignIn } = useSignIn();
//   const { signUp, setActive: setActiveSignUp } = useSignUp();

//   const handleGoogle = async () => {
//     if (!signIn) return;
//     await signIn.authenticateWithRedirect({
//       strategy: "oauth_google",
//       redirectUrl: "/sso-callback",
//       redirectUrlComplete: "/dashboard",
//     });
//   };

//   const handleSubmit = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       if (mode === "login") {
//         const res = await signIn?.create({ identifier: email, password });
//         if (res?.status === "complete") {
//           // setActiveSignIn may be undefined depending on the Clerk hook return type,
//           // so guard the call with optional chaining to avoid invoking undefined.
//           await setActiveSignIn?.({ session: res.createdSessionId });
//           location.href = "/dashboard";
//         }
//       }

//       if (mode === "signup") {
//         const res = await signUp?.create({ emailAddress: email, password });
//         await signUp?.prepareEmailAddressVerification({ strategy: "email_code" });
//         setMode("verify");
//       }

//       if (mode === "verify") {
//         const res = await signUp?.attemptEmailAddressVerification({ code });
//         if (res?.status === "complete") {
//           await setActiveSignUp?.({ session: res.createdSessionId });
//           location.href = "/dashboard";
//         }
//       }
//     } catch (err: any) {
//       setError(err?.errors?.[0]?.message || "Authentication failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="relative min-h-screen bg-gradient-to-br from-white via-slate-100 to-red-200 text-slate-900 overflow-hidden">
//       {/* <ThreeBackground /> */}
//       <div className="flex grid grid-cols-1 md:grid-cols-2 min-h-screen">
//         <div className="hidden md:flex items-center justify-center bg-red-600 text-white p-10 space-x-2">
//           {/* Right side can be used for additional graphics or left empty */}
//           <div className="h-8 w-8 bg-white rounded-full mb-4" />
//           <h1 className="text-4xl font-extrabold mb-4">TrustFund</h1>
//         </div>
//         <div className="">
//           <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
//             <div
//               // initial={{ opacity: 0, y: 40 }}
//               // animate={{ opacity: 1, y: 0 }}
//               // transition={{ duration: 0.8 }}
//               className="w-full max-w-md rounded-3xl border border-white/60 bg-white/70 backdrop-blur-xl p-8 shadow-2xl"
//             >
//               <div className="mb-8 text-center">
//                 <h1 className="text-3xl font-bold">
//                   {mode === "login" && "Welcome Back"}
//                   {mode === "signup" && "Create Account with"}
//                   {mode === "verify" && "Verify Email"}
//                 </h1>
//                 <h1 className="text-2xl font-bold text-red-600">TrustFund</h1>
//                 <p className="mt-2 text-sm text-slate-600">
//                   {mode === "verify"
//                     ? "Enter the verification code sent to your email"
//                     : "Secure access to your dashboard"}
//                 </p>
//               </div>

//               <div className="space-y-4">
//                 {mode !== "verify" && (
//                   <input
//                     type="email"
//                     placeholder="Email address"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400"
//                   />
//                 )}

//                 {mode !== "verify" && (
//                   <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400"
//                   />
//                 )}

//                 {mode === "verify" && (
//                   <input
//                     type="text"
//                     placeholder="Verification code"
//                     value={code}
//                     onChange={(e) => setCode(e.target.value)}
//                     className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400"
//                   />
//                 )}

//                 {error && (
//                   <p className="rounded-lg bg-red-100 px-3 py-2 text-sm text-red-600">
//                     {error}
//                   </p>
//                 )}

//                 <Button
//                   // whileHover={{ scale: 1.03 }}
//                   // whileTap={{ scale: 0.97 }}
//                   disabled={loading}
//                   onClick={handleSubmit}
//                   className="w-full rounded-xl bg-red-600 py-3 font-semibold text-white shadow-lg disabled:opacity-60"
//                 >
//                   {loading
//                     ? "Processing..."
//                     : mode === "login"
//                     ? "Sign In"
//                     : mode === "signup"
//                     ? "Create Account"
//                     : "Verify Email"}
//                 </Button>

//                 {mode !== "verify" && (
//                   <button
//                     onClick={handleGoogle}
//                     className="w-full rounded-xl border bg-white py-3 font-medium shadow hover:bg-slate-50"
//                   >
//                     Continue with Google
//                   </button>
//                 )}
//               </div>

//               <div className="mt-6 text-center text-sm text-slate-600">
//                 {mode === "login" && (
//                   <button onClick={() => setMode("signup")} className="text-indigo-600 hover:underline">
//                     Don’t have an account? Sign up
//                   </button>
//                 )}
//                 {mode === "signup" && (
//                   <button onClick={() => setMode("login")} className="text-indigo-600 hover:underline">
//                     Already have an account? Sign in
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSignIn } from "@clerk/nextjs"
import { FcGoogle } from "react-icons/fc"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Eye, EyeOff, AlertCircle, Mail, Lock } from "lucide-react"

export function LoginForm() {
  const router = useRouter()
  const { signIn, setActive } = useSignIn()
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const res = await signIn?.create({
        identifier: email,
        password,
      })

      if (res?.status === "complete") {
        await setActive?.({ session: res.createdSessionId })
        router.push("/dashboard")
      }
    } catch (err: any) {
      setError(err?.errors?.[0]?.message || "Invalid email or password")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogle = async () => {
  await signIn?.authenticateWithRedirect({
    strategy: "oauth_google",
    redirectUrl: "/sso-callback",
    redirectUrlComplete: "/dashboard",
  })
}

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
      {/* Sign-In with Google  */}
      <Button
        type="button"
        onClick={handleGoogle}
        variant="outline"
        className="w-full h-12 rounded-xl border-zinc-200 bg-white hover:bg-zinc-50 flex items-center justify-center gap-3"
      >
        <FcGoogle className="text-lg" />
        Continue with Google
      </Button>


      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-semibold text-zinc-800">
          Email Address
        </Label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 pl-11 bg-zinc-50 border-zinc-200 rounded-xl"
            required
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-semibold text-zinc-800">
          Password
        </Label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 pl-11 pr-12 bg-zinc-50 border-zinc-200 rounded-xl"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-12 text-base font-bold rounded-xl bg-brand-red md:bg-[linear-gradient(135deg,#510813_0%,#9a1026_100%)] text-white hover:opacity-90"
      >
        {isLoading ? "Signing In..." : "Sign In"}
      </Button>
    </form>
  )
}
