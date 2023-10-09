import React from "react"
import Link from "next/link"

import SwitchTheme from "@/components/ui/switch-theme"

import { AuthComponent } from "./_components/auth"
import ServiceSwitch from "./service-switch"

export default function Header() {
  return (
    <header className=" fixed inset-x-0 top-0 flex h-[60px] w-full items-center justify-between overflow-hidden border-b bg-default px-6 py-3">
      <div className="flex items-center gap-3 ">
        <Logo />
        {/* <div className="ml-1 h-5 w-0.5 skew-x-[-15deg] bg-[var(--op-text-disabled)]"></div> */}
        <ServiceSwitch />
      </div>
      <div className="flex items-center gap-5">
        <SwitchTheme />

        <AuthComponent />
      </div>
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
