"use client"

import React, { ReactNode } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      defaultTheme="light"
      disableTransitionOnChange
      enableSystem
      attribute="class"
    >
      {children}
    </NextThemesProvider>
  )
}
