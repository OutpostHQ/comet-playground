import { ComponentProps, ElementType, ReactNode } from "react"

import { cn } from "@/lib/utils"

type TCardOwnProps<T extends ElementType> = {
  className?: string
  id?: string
  children: ReactNode
  as?: T
}

type CardProps<T extends ElementType> = TCardOwnProps<T> &
  Omit<ComponentProps<T>, keyof TCardOwnProps<T>>

const Card = <T extends ElementType = "div">({
  children,
  className = "",
  id = "",
  as,
}: CardProps<T>) => {
  const Comp = as || "div"
  return (
    <Comp
      className={cn(
        `overflow-hidden rounded-lg border border-border-default bg-surface-default p-5 shadow-cp-shadow ` +
          className
      )}
      id={id}
    >
      {children}
    </Comp>
  )
}

export default Card
