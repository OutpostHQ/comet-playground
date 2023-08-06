"use client"

import { useState } from "react"
import { Moon, Sun } from "lucide-react"

function SwitchTheme() {
  const [theme, setTheme] = useState("light")
  return (
    <button
      onClick={() => {
        if (theme === "light") {
          setTheme("dark")
          document.documentElement.classList.add("dark")
        } else {
          setTheme("light")
          document.documentElement.classList.remove("dark")
        }
      }}
      className="fixed bottom-6 left-6 grid h-8 w-8 place-items-center rounded-full border bg-default shadow-0.25 "
    >
      {theme === "dark" ? <Sun size="14" /> : <Moon size="14" />}
    </button>
  )
}

export default SwitchTheme
