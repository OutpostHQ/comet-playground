import React, { HTMLProps } from "react"

import { cn } from "@/lib/utils/cn"

import Text from "./text"

export interface CardProps extends HTMLProps<HTMLDivElement> {
  title?: string
  description?: string
  footer?: React.ReactNode
  bodyStyles?: string
  footerStyles?: string
}

export default function Card(props: CardProps) {
  const {
    title,
    description,
    className = "",
    bodyStyles = "",
    footerStyles = "",
    footer,
    children,
    ...cardProps
  } = props

  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border bg-default shadow-0.25",
        className
      )}
      {...cardProps}
    >
      <div className={cn("p-5 ", bodyStyles)}>
        {props.title && (
          <Text variant="displayMedium" weight="semibold">
            {props.title}
          </Text>
        )}
        {props.description && <Text>{props.description}</Text>}
        {props.children}
      </div>
      {footer && (
        <div className={cn("border-t  bg-subdued px-5 py-3 ", footerStyles)}>
          {footer}
        </div>
      )}
    </div>
  )
}
