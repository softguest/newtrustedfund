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
    <ClerkProvider>
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
