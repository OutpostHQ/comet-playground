import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "@/styles/globals.css"
import "@/styles/search.css"
import "@/styles/tokens.css"

import AuthProvider from "@/components/providers/auth-provider"

import Mounted from "./mounted"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Outpost playground",
  description: "Outpost Ai playground",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className="light" suppressHydrationWarning lang="en">
      <body suppressHydrationWarning className={inter.className}>
        <AuthProvider>
          <Mounted>{children}</Mounted>
        </AuthProvider>
      </body>
    </html>
  )
}
