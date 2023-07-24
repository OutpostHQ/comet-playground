"use client"

import { ReactNode } from "react"
import { JengaIconContext } from "@jengaicons/react"

export default function Icon({ icon }: { icon: ReactNode }) {
  return (
    <JengaIconContext.Provider
      value={{
        size: "1rem",
        color: "var(--text)",
      }}
    >
      {icon}
    </JengaIconContext.Provider>
  )
}
