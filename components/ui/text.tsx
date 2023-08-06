import React, { CSSProperties, ElementType, ReactNode, useMemo } from "react"

import { cn } from "@/lib/utils/cn"

type CPTextWeight = "light" | "base" | "medium" | "semibold" | "bold"
type CPTextVariants =
  | "caption"
  | "subheading"
  | "base"
  | "heading"
  | "displaySmall"
  | "displayMedium"
  | "displayLarge"

type CPTextProps = {
  children: ReactNode | string
  weight?: CPTextWeight
  variant?: CPTextVariants
  style?: CSSProperties
  as?: ElementType
  className?: string
}

type sharedType = {
  lineHeight: string
  fontSize: string
  as: ElementType
}

// styles local to text components
const textVariants: { [key: string]: sharedType } = {
  caption: {
    fontSize: "0.75rem",
    lineHeight: "1rem",
    as: "p",
  },

  subheading: {
    fontSize: "0.75rem",
    lineHeight: "1.5rem",
    as: "p",
  },

  base: {
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    as: "p",
  },

  heading: {
    fontSize: "1rem",
    lineHeight: "1.5rem",
    as: "h3",
  },

  displaySmall: {
    fontSize: "1.25rem",
    lineHeight: "1.75rem",
    as: "h3",
  },

  displayMedium: {
    fontSize: "1.5rem",
    lineHeight: "2rem",
    as: "h2",
  },

  displayLarge: {
    fontSize: "1.75rem",
    lineHeight: "2rem",
    as: "h1",
  },
}

export default function Text({
  children,
  weight = "base",
  variant = "base",
  style = {},
  className = "",
  as,
  ...otherProps
}: CPTextProps) {
  let fontWeight =
    weight === "bold"
      ? "700"
      : weight === "semibold"
      ? "600"
      : weight === "medium"
      ? "500"
      : weight === "light"
      ? "300"
      : "400"

  const resultingStyles = useMemo(() => {
    return {
      ...textVariants[variant],
      fontWeight,
      textTransform: variant === "subheading" ? "uppercase" : "",
      ...style,
    }
  }, [style, variant, fontWeight])

  const TextElement = as ? as : textVariants[variant].as || "p"

  return (
    <TextElement
      className={cn("text-default " + className)}
      style={resultingStyles}
      {...otherProps}
    >
      {children}
    </TextElement>
  )
}
