import React from "react"
import Link from "next/link"

import Text from "@/components/ui/text"

import { AuthComponent } from "./_components/auth"

export default function Header() {
  return (
    <header className=" fixed inset-x-0 top-0 flex h-[60px] w-full items-center justify-between overflow-hidden border-b bg-default px-6 py-3">
      <div className="flex items-center gap-3 ">
        <Logo />
        <div className="ml-1 h-6 w-0.5 skew-x-[-15deg] bg-pressed"></div>
        <Text weight="semibold" variant="displayMedium">
          AI
        </Text>
      </div>
      <AuthComponent />
    </header>
  )
}

function Logo() {
  return (
    <Link
      href="/playground"
      className="block h-9 w-9 rounded-full bg-gradient-to-br from-primary to-secondary"
    ></Link>
  )
}
