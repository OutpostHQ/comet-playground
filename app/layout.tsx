import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "@/styles/globals.css"
import "@/styles/tokens.css"
import "@/styles/markdown.css"

import { Toaster } from "@/components/ui/toaster"
import AuthProvider from "@/components/providers/auth-provider"
import ThemeProvider from "@/components/providers/theme-provider"

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
    <html className="dark" suppressHydrationWarning lang="en">
      <body suppressHydrationWarning className={inter.className}>
        <AuthProvider>
          {/* <Mounted> */}
          <ThemeProvider>{children}</ThemeProvider>
          <Toaster />
          {/* </Mounted> */}
        </AuthProvider>
      </body>
    </html>
  )
}
