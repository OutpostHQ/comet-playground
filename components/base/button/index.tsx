import React, { ButtonHTMLAttributes } from "react"
import { cva, VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils/cn"

export interface ButtonBaseProps {
  children?: React.ReactNode
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  isLoading?: boolean
  className?: string
  icon?: React.ReactNode
}

export interface ButtonProps
  extends ButtonBaseProps,
    VariantProps<typeof buttonVariants>,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> {}

export const buttonVariants = cva(
  " disabled:opacity-50 [&>svg]:h-4 [&>svg]:w-4 disabled:pointer-events-none justify-center focus:outline-1 focus:outline-offset-1 focus:outline  flex items-center gap-2 px-4 py-2 text-bodyMd rounded-lg font-medium transition-colors duration-150 ease-in-out",
  {
    variants: {
      variant: {
        basic: "bg-default hover:bg-hovered  border",
        outline: "border bg-transparent hover:bg-hovered ",
        plain: "bg-surface border-transparent border hover:bg-hovered",
        link: "underline-offset-4 hover:underline text-primary p-0 ",
      },
      theme: {
        transparent:
          "bg-transparent hover:bg-subdued border-transparent text-default",
        primary:
          "border-default hover:bg-primary-hovered   bg-primary text-on-primary",
        critical:
          "text-on-primary border-critical hover:bg-critical-hovered  bg-critical focus:outline-critical",
        warning:
          "bg-warning text-on-primary hover:bg-warning  border-warning focus:outline-warning ",
        success:
          "text-on-primary bg-success hover:bg-success  focus:outline-success border-success ",
      },
      size: {
        default: "h-9 max-w-max",
        full: "w-full h-9",
        icon: "h-9 w-9 p-0 rounded-lg overflow-hidden",
        iconSm: "h-7 w-7 p-0 rounded-lg overflow-hidden",
        flat: "h-10 py-2 px-1",
      },
    },

    defaultVariants: {
      variant: "basic",
      theme: "primary",
      size: "default",
    },
    compoundVariants: [
      {
        variant: "basic",
        theme: "primary",
        className:
          "bg-primary border-default hover:bg-primary-hovered text-on-primary",
      },
      {
        variant: "basic",
        theme: "critical",
        className:
          "bg-critical border-critical hover:bg-critical-hovered text-on-primary",
      },
      {
        variant: "basic",
        theme: "warning",
        className:
          "bg-warning border-warning hover:bg-warning-subdued text-on-primary",
      },
      {
        variant: "basic",
        theme: "success",
        className:
          "bg-success border-success hover:bg-success-subdued text-on-primary",
      },
      // outline compound variants
      {
        variant: "outline",
        theme: "primary",
        className: "bg-surface hover:bg-subdued text-default",
      },
    ],
  }
)

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      theme,
      variant,
      className,
      leftIcon,
      rightIcon,
      size = "default",
      icon,
      ...restProps
    },
    ref
  ) => {
    if (icon) {
      return (
        <button
          ref={ref}
          type="button"
          className={cn(
            buttonVariants({ theme, size: "icon", variant, className }),
            "[&>svg]:h-4",
            className
          )}
          {...restProps}
        >
          {icon}
        </button>
      )
    }

    return (
      <button
        ref={ref}
        type="button"
        className={cn(buttonVariants({ variant, theme, size, className }))}
        {...restProps}
      >
        {leftIcon && leftIcon}
        {!icon && children}
        {rightIcon && rightIcon}
      </button>
    )
  }
)

Button.displayName = "Button"
