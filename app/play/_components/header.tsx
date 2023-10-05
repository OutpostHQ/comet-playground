import React, { useState } from "react"
import { Text } from "@components/text"

import { OutpostLoginButton } from "@/components/sections/header/_components/auth"

export default function Header() {
  return (
    <header className=" flex items-center justify-between border-b px-6 py-3">
      <div className="flex  items-center gap-2">
        <div className="h-6 w-6 rounded-full bg-primary"></div>
        <Text variant="headingLg" weight="semibold">
          Outpost
        </Text>
      </div>
      <OutpostLoginButton />
    </header>
  )
}
