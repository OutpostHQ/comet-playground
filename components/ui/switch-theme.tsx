"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

function SwitchTheme() {
  const { theme, setTheme } = useTheme()
  return (
    <button
      onClick={() => {
        if (theme === "light") {
          setTheme("dark")
        } else {
          setTheme("light")
        }
      }}
      className=" grid h-8 w-8 place-items-center rounded-full border bg-default shadow-0.25 "
    >
      {theme === "dark" ? <Sun size="14" /> : <Moon size="14" />}
    </button>
  )
}

export default SwitchTheme
