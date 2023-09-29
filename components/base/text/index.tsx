import { ElementType, HTMLAttributes, useMemo } from "react"
import { cva, VariantProps } from "class-variance-authority"

const textVariants = cva("", {
  variants: {
    /***  bodySm: "12px",
      - bodyMd: "14px",
      - bodyLg: "16px",
      - bodyXl: "18px",
      - headingXs: "12px",
      - headingSm: "14px",
      - headingMd: "16px",
      - headingLg: "20px",
      - headingXl: "24px",
      - heading2Xl: "28px",
      - heading3Xl: "32px",
      - heading4Xl: "40px",
      - heading5Xl: "56px",
    * 
    */
    variant: {
      bodySm: "text-bodySm leading-bodySm",
      bodyMd: "text-bodyMd leading-bodyMd",
      bodyLg: "text-bodyLg leading-bodyLg",
      bodyXl: "text-bodyXl leading-bodyXl",
      headingXs: "text-headingXs leading-headingXs",
      headingSm: "text-headingSm leading-headingSm",
      headingMd: "text-headingMd leading-headingMd",
      headingLg: "text-headingLg leading-headingLg",
      headingXl: "text-headingXl leading-headingXl",
      heading2Xl: "text-heading2Xl leading-heading2Xl",
      heading3Xl: "text-heading3Xl leading-heading3Xl",
      heading4Xl: "text-heading4Xl leading-heading4Xl",
      heading5Xl: "text-heading5Xl leading-heading5Xl",
    },
    color: {
      default: "text-default",
      strong: "text-strong",
      soft: "text-soft",
      primary: "text-primary",
      critical: "text-critical",
      success: "text-success",
      warning: "text-warning",
      disabled: "text-disabled",
    },
    weight: {
      light: "font-light",
      base: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    variant: "bodyMd",
    color: "default",
    weight: "base",
  },
})

export interface TextProps
  extends VariantProps<typeof textVariants>,
    Omit<HTMLAttributes<HTMLParagraphElement>, "color"> {
  as?: ElementType
}

export function Text(props: TextProps) {
  const { variant, as, weight, color, className = "", ...restProps } = props
  const Comp = useMemo(() => {
    if (as) {
      return as
    }
    switch (variant) {
      case "bodySm":
      case "bodyMd":
      case "bodyLg":
      case "bodyXl":
        return "p"

      case "headingXs":
      case "headingSm":
        return "h6"

      case "headingMd":
        return "h5"

      case "headingLg":
        return "h4"

      case "headingXl":
      case "heading2Xl":
        return "h3"

      case "heading3Xl":
      case "heading4Xl":
        return "h2"

      case "heading5Xl":
        return "h1"
      default:
        return "p"
    }
  }, [variant, as])
  return (
    <Comp
      className={textVariants({ variant, color, weight }) + " " + className}
      {...restProps}
    />
  )
}
