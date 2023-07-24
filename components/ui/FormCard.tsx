import { DetailedHTMLProps, FormHTMLAttributes, ReactNode } from "react"

import { cn } from "@/lib/utils"

export default function FormCard({
  children,
  className = "",
  ...otherProps
}: DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>) {
  return (
    <form
      className={cn(
        `rounded-lg border border-border-default bg-surface-default p-5 shadow-cp-shadow ` +
          className
      )}
      {...otherProps}
    >
      {children}
    </form>
  )
}
