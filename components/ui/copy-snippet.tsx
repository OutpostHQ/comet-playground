"use client"

import { useEffect, useState } from "react"
import { CheckIcon, Copy, CopyIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export default function CopySnippet({
  code,
  className = "",
  fullWidth = false,
  multiLine = false,
}: {
  code: string
  className?: string
  fullWidth?: boolean
  multiLine?: boolean
}) {
  const [hasCopied, setHasCopied] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [hasCopied])

  return (
    <pre
      className={cn(
        `relative min-h-[2.5rem] overflow-hidden rounded-lg border border-border-default bg-surface-default p-3 text-sm text-foreground-default ${
          fullWidth ? "w-full " : "cp-input-width "
        }` + className
      )}
    >
      <code>{code}</code>
      <button
        onClick={() => {
          navigator.clipboard.writeText(code)
          setHasCopied(true)
        }}
        className={` absolute  grid  w-10 place-items-center  bg-surface-default transition-all duration-200 hover:bg-surface-hovered ${
          multiLine
            ? "right-2 top-2 h-10 rounded-lg border border-surface-default hover:border-border-default"
            : "right-0 top-0 h-full border-l border-l-surface-default hover:border-l-border-default "
        }`}
      >
        {hasCopied ? (
          <CheckIcon size={16} className="text-icon-default" />
        ) : (
          <CopyIcon size={16} className="text-icon-default" />
        )}
      </button>
    </pre>
  )
}
