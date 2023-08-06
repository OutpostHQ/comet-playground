import React from "react"

import { cn } from "@/lib/utils/cn"

export default function PageContainer({
  children,
  fullWidth = false,
  className = "",
}: {
  children?: React.ReactNode
  fullWidth?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        `${fullWidth ? "100%" : "container px-5 md:pt-12 xl:pb-20"} `,
        className
      )}
    >
      {children}
    </div>
  )
}
