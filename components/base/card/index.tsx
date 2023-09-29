import React, { HTMLProps } from "react"
import { Text } from "@components/text"

import { cn } from "@/lib/utils/cn"

export interface CardProps extends HTMLProps<HTMLDivElement> {
  title?: string
  description?: string
  cardBodyStyles?: string
  cardContentStyles?: string
  footer?: React.ReactNode
  cardfooterStyles?: string
}

export default function Card(props: CardProps) {
  const {
    title,
    description,
    className = "",
    cardBodyStyles = "",
    cardContentStyles = " space-y-5 ",
    cardfooterStyles = "",
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
      <div className={cn("p-5", cardBodyStyles)}>
        {(title || description) && (
          <div className={`${props?.children && "mb-4"} space-y-4`}>
            {props.title && (
              <Text variant="headingLg" weight="semibold">
                {props.title}
              </Text>
            )}
            {props.description && <Text>{props.description}</Text>}
          </div>
        )}
        <div className={cn(cardContentStyles)}>{props.children}</div>
      </div>
      {footer && (
        <div
          className={cn("border-t  bg-subdued px-5 py-3 ", cardfooterStyles)}
        >
          {footer}
        </div>
      )}
    </div>
  )
}
