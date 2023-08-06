import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils/cn"

const buttonVariants = cva(
  "inline-flex items-center gap-2 justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none   disabled:opacity-50 disabled:pointer-events-none outline-offset-transparent ",
  {
    variants: {
      variant: {
        default: "bg-primary text-on-primary hover:bg-primary-hovered",
        critical: "bg-critical text-on-primary hover:bg-critical-hovered",
        outline: "border hover:bg-hovered ",
        link: "underline-offset-4 hover:underline text-primary p-0 ",
      },
      size: {
        flat: "h-10 py-2 px-1",
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-lg",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        type="button"
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
