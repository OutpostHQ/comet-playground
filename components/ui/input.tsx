import React from "react"

import { cn } from "@/lib/utils/cn"

import Text from "./text"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  fullwidth?: boolean
  errorMessage?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, errorMessage, fullwidth = false, ...props }, ref) => {
    return (
      <>
        <input
          type={type}
          className={cn(
            `text-sm file:text-sm flex h-10  w-full rounded-lg border bg-default px-3 py-2  outline-none ring-focus ring-offset-transparent file:border-0 file:bg-default file:px-3 file:font-medium placeholder:text-disabled focus:outline-none focus:ring-2 focus-visible:outline-none active:outline-none active:ring-2 disabled:cursor-not-allowed disabled:opacity-70 `,
            className
          )}
          ref={ref}
          {...props}
        />
        {errorMessage?.trim() && (
          <Text as="span" variant="caption" className="text-critical">
            {errorMessage}
          </Text>
        )}
      </>
    )
  }
)
Input.displayName = "Input"

export { Input }
