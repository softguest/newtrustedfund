import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Inter, Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"

import {
  ClerkProvider,
} from '@clerk/nextjs'
import "./globals.css"

// const _geist = Geist({ subsets: ["latin"] })
// const _geistMono = Geist_Mono({ subsets: ["latin"] })
// const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["600", "700"],
//   variable: "--font-heading",
// })

export const metadata: Metadata = {
  title: "CSTrustFunds - Secure Savings Dashboard",
  description: "Better Savings for Better Tomorrow. Secure, goal-based savings built for discipline and growth.",
  generator: "v0.app",
  icons: {
    icon: "/images/cs-logo-icon.png",
    apple: "/images/cs-logo-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#c52222ff", // your brand color
          colorBackground: "#ffffffff",
          colorText: "#525252ff",
          colorInputBackground: "#020617",
          colorInputText: "#e5e7eb",
          borderRadius: "0.75rem",
          fontFamily: "Inter, sans-serif",
        },
        elements: {
          card: "bg-slate-950 border border-slate-800 shadow-xl",
          headerTitle: "text-xl font-bold text-white",
          headerSubtitle: "text-slate-400",
          formButtonPrimary:
            "bg-green-500 hover:bg-green-600 text-black font-semibold",
          socialButtonsBlockButton:
            "border border-slate-700 hover:bg-slate-800",
          formFieldInput:
            "bg-slate-950 border-slate-700 focus:ring-green-500",
          footerActionText: "text-slate-400",
          footerActionLink: "text-green-400 hover:text-green-300",
        },
      }}
      >
      <html 
      // lang="en" className={`${inter.variable} ${poppins.variable}`}
      >
        <body className={`font-sans antialiased`}>
          {children}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  )
}
