import { ReactNode, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

export function FramerLink({
  href,
  children,
  isActive = false,
  direction = "horizontal",
  selectedHighlight = false,
  className = "",
  hoverTransition = false,
  ...otherProps
}: {
  href: string
  children: ReactNode
  isActive?: boolean
  direction?: "horizontal" | "vertical"
  selectedHighlight?: boolean
  className?: string
  hoverTransition?: boolean
}) {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <motion.div
      layout
      layoutRoot
      style={{
        paddingBottom: direction === "horizontal" ? "0" : "7px",
        position: "relative",
        paddingLeft: direction === "horizontal" ? "7px" : " 0",
      }}
    >
      {/* BORDER COLOR AND TRANSITION */}
      {isActive && (
        <motion.div
          layout
          layoutId="border"
          transition={{
            layout: {
              duration: 0.14,
              ease: "easeOut",
            },
          }}
          style={{
            content: "",
            height: direction === "vertical" ? "3px" : "80%",
            width: direction === "vertical" ? "90%" : "3px",
            bottom: direction === "vertical" ? "0" : "10%",
            left: direction === "vertical" ? "5%" : "0",
            position: "absolute",
            borderRadius: "4px",
            background: "var(--op-surface-primary)",
            zIndex: "0",
          }}
        />
      )}

      {/* tab should have a background if it is selected  */}
      {isActive && selectedHighlight && (
        <motion.div
          layout
          layoutId="selected"
          transition={{
            layout: {
              duration: 0.14,
              ease: "easeOut",
            },
          }}
          style={{
            height: "80%",
            width: "calc(100% - 8px)",
            top: "10%",
            left: "8px",
            content: "",
            position: "absolute",
            borderRadius: "8px",
            background: "var(--op-surface-hovered)",
            opacity: "1",
            zIndex: "0",
          }}
        />
      )}

      {isHovering && hoverTransition ? (
        <motion.span
          layout
          className="highlight"
          layoutId="highlight"
          transition={{
            layout: {
              duration: 0.14,
              ease: "easeOut",
            },
          }}
          style={{
            height: "80%",
            width: "calc(100% - 8px)",
            top: direction === "vertical" ? "" : "10%",
            left: direction === "vertical" ? "4px" : "",
            content: "",
            position: "absolute",
            borderRadius: "8px",
            background: "var(--op-surface-hovered)",
            opacity: "1",
            zIndex: "0",
          }}
        />
      ) : null}

      <Link
        onMouseEnter={() => {
          setIsHovering(true)
        }}
        onMouseLeave={() => {
          setIsHovering(false)
        }}
        className={className}
        style={{
          fontWeight: isActive ? "500" : "400",
          color: isActive ? "var(--op-text)" : "var(--op-text-soft)",
          position: "relative",
          padding: direction === "vertical" ? "0.5rem 1rem" : "0.75rem 1rem",
          borderRadius: "0.5rem",
          display: direction === "vertical" ? "inline-block" : "block",
          fontSize: "14px",
          zIndex: "100",
        }}
        href={href}
        {...otherProps}
      >
        {/* BACKGROUND COLOR AND hover TRANSITION */}
        {children}
      </Link>
    </motion.div>
  )
}
