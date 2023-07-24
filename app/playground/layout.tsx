import React from "react"

import Header from "@/components/sections/header"
import Sidebar from "@/components/sections/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <Sidebar />
      <main className="min-h-screen bg-surface-subdued pr-[calc(var(--sidebar-width)+24px+24px)]">
        {children}
      </main>
    </div>
  )
}
