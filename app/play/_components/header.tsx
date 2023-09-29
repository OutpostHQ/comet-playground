"use client"

import React, { useState } from "react"
import { Input } from "@components/input"
import { Text } from "@components/text"

export default function Header() {
  const [value, setValue] = useState<number>(1)
  return (
    <header className="flex items-center gap-2 border-b px-6 py-3">
      <div className="h-6 w-6 rounded-full bg-primary"></div>
      <Text variant="headingLg" weight="semibold">
        Outpost
      </Text>
    </header>
  )
}
