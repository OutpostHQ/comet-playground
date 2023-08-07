import React, { ReactNode } from "react"

import { cn } from "@/lib/utils/cn"

import { Label } from "./label"
import Text from "./text"

function Field({
  label,
  children,
  errorMessage,
  htmlFor,
  className = "",
  labelStyles = "",
}: {
  children: ReactNode
  label: string | ReactNode
  errorMessage?: string
  htmlFor: string
  className?: string
  labelStyles?: string
}) {
  return (
    <div className={cn("space-y-1 " + className)}>
      <Label
        className={cn("text-sm font-medium text-soft", labelStyles)}
        htmlFor={htmlFor}
      >
        {label}
      </Label>
      <div>{children}</div>
    </div>
  )
}

export default Field
