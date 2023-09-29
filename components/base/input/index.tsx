import React from "react"
import { Text } from "@components/text"

import { cn } from "@/lib/utils/cn"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  fullwidth?: boolean
  errorMessage?: string
}

export const InputErrorMessage = ({ message }: { message?: string }) => {
  return message?.trim() ? (
    <Text className="mt-2" variant="bodySm" color="critical">
      {message}
    </Text>
  ) : null
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, errorMessage, fullwidth = false, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          type={type}
          className={cn(
            ` flex  h-9 w-full rounded-lg border bg-input px-3  py-2 text-bodyMd outline-none ring-focus ring-offset-transparent file:mr-2  file:h-auto  file:rounded-md file:border  file:bg-default file:px-3 file:py-1 placeholder:text-disabled focus:outline-none focus:ring-2 focus-visible:outline-none active:outline-none active:ring-2 disabled:cursor-not-allowed disabled:opacity-70 [&[type="file"]]:h-auto [&[type="file"]]:border-none`,
            className
          )}
          ref={ref}
          {...props}
        />
        <InputErrorMessage message={errorMessage} />
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
