"use client"

import React from "react"

import SwitchTheme from "@/components/ui/switch-theme"
import Header from "@/components/sections/header"
import Sidebar from "@/components/sections/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <main className="min-h-screen bg-subdued pr-[calc(var(--sidebar-width)+24px+24px)]">
        {children}
      </main>
      <SwitchTheme />
    </div>
  )
}
