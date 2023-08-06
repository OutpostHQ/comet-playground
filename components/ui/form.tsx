import React, { HTMLProps } from "react"

import { cn } from "@/lib/utils/cn"

import { Button, ButtonProps } from "./button"
import Text from "./text"

export interface FormProps extends HTMLProps<HTMLFormElement> {
  title?: string
  description?: string
  submitButtonProps?: ButtonProps
  submitLabel?: string
  footer?: React.ReactNode
  bodyStyles?: string
  footerStyles?: string
}

export default function Form(props: FormProps) {
  const {
    title,
    description,
    submitButtonProps,
    submitLabel,
    footer,
    children,
    className,
    footerStyles,
    bodyStyles,
    ...formProps
  } = props
  return (
    <form
      className={cn(
        "overflow-hidden rounded-lg border  bg-default shadow-0.25",
        className
      )}
      {...formProps}
    >
      <div className="p-5 ">
        <div className="mb-4 space-y-4">
          <Text variant="displayMedium" weight="semibold">
            {title}
          </Text>
          <Text>{description}</Text>
        </div>
        <div className={cn(bodyStyles)}>{children}</div>
      </div>
      <div
        className={cn(
          "flex justify-end border-t bg-subdued px-5 py-3",
          footerStyles
        )}
      >
        {!footer ? (
          <Button type="submit" variant="outline" {...submitButtonProps}>
            {submitLabel ? submitLabel : "Save"}
          </Button>
        ) : (
          footer
        )}
      </div>
    </form>
  )
}
