"use client"

import { Moon, Sun } from "lucide-react"

import useTheme from "@/lib/hooks/useTheme"

function SwitchTheme() {
  const { theme, setTheme } = useTheme()
  return (
    <button
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark")
      }}
      className="fixed bottom-6 left-6 grid h-8 w-8 place-items-center rounded-full border bg-default shadow-0.25 "
    >
      {theme === "dark" ? <Sun size="14" /> : <Moon size="14" />}
    </button>
  )
}

export default SwitchTheme