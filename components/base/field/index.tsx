import React, { ReactNode } from "react"
import { Label } from "@components/label"
import { Text } from "@components/text"

import { cn } from "@/lib/utils/cn"

export function Field({
  label,
  children,
  htmlFor,
  className = "",
  labelStyles = "",
  errorMessage,
}: {
  children: ReactNode
  label: string | ReactNode
  errorMessage?: string
  htmlFor: string
  className?: string
  labelStyles?: string
}) {
  return (
    <div className={cn("w-full space-y-2 " + className)}>
      <Label className={labelStyles} htmlFor={htmlFor}>
        {label}
      </Label>
      <div>{children}</div>
      {errorMessage && (
        <Text variant="bodySm" color="critical">
          {errorMessage}
        </Text>
      )}
    </div>
  )
}
