import React from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import Text from "@/components/ui/text"

export default function Header() {
  return (
    <header className=" fixed inset-x-0 top-0 flex w-full items-center justify-between border-b bg-default px-6 py-3">
      <div className="flex items-center gap-3 ">
        <Logo />
        <div className="ml-1 h-6 w-0.5 skew-x-[-15deg] bg-pressed"></div>
        <Text weight="semibold" variant="displayMedium">
          AI
        </Text>
      </div>
      <Button className="flex h-9 gap-2 py-2">
        <span className=" bg-white h-5 w-5 rounded-full border"></span>
        <span>Login with outpost</span>
      </Button>
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
