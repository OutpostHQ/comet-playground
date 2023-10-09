"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils/cn"

export default function ServiceSwitch() {
  const path = usePathname()
  return (
    <div className="flex h-full items-center justify-between rounded-lg bg-active p-1 text-bodySm">
      <Link
        className={cn(
          ` block rounded-lg px-4 py-2 text-soft ${
            path === "/play" ? " bg-default text-default" : ""
          }`
        )}
        href="/play"
      >
        Comet
      </Link>
      <Link
        className={cn(
          ` block rounded-lg px-4 py-2 text-soft ${
            path === "/play/inference" ? "bg-default text-default" : ""
          }`
        )}
        href="/play/inference"
      >
        Inference Endpoints
      </Link>
    </div>
  )
}
