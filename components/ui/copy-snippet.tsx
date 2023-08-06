"use client"

import { useEffect, useState } from "react"
import { CheckIcon, Copy, CopyIcon } from "lucide-react"

import { cn } from "@/lib/utils/cn"

export default function CopySnippet({
  code,
  className = "",
  fullWidth = false,
  multiLine = false,
}: {
  code: string | undefined
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
        `relative min-h-[2.5rem] overflow-hidden rounded-lg border bg-default p-3 text-sm text-default ${
          fullWidth ? "w-full " : "cp-input-width "
        }` + className
      )}
    >
      <code>{code}</code>
      <button
        type="button"
        onClick={() => {
          navigator.clipboard.writeText(code || "")
          setHasCopied(true)
        }}
        className={` absolute  grid  w-10 place-items-center  bg-default transition-all duration-200 hover:bg-hovered ${
          multiLine
            ? "right-2 top-2 h-10 rounded-lg border border-transparent hover:border-default"
            : "right-0 top-0 h-full border-l border-l-transparent hover:border-l-default "
        }`}
      >
        {hasCopied ? (
          <CheckIcon size={16} className="text-icon" />
        ) : (
          <CopyIcon size={16} className="text-icon" />
        )}
      </button>
    </pre>
  )
}
