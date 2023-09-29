"use client"

import React, { useEffect, useRef, useState } from "react"
import { useStore } from "@/store/store"
import { useSession } from "next-auth/react"
import { Comet } from "outpostkit"

import { useCometSession } from "@/lib/hooks/useCometSession"

import { CometInput } from "./comet-input"
import { CometOutput } from "./comet-output"

export type CometSession = {
  sessionId: string
  messages: {
    from: "agent" | "human"
    text: string
    conversationId?: string | null
  }[]
}

export default function CometSearch() {
  const [comet, configs] = useStore((store) => [store.comet, store.config])
  const [question, setQuestion] = useState("")
  const { data: user } = useSession()
  const ref = useRef<null | HTMLDivElement>(null)

  const {
    isLoading,
    promptUser,
    session,
    isDisabled,
    streamMessage,
    resetSession,
    error,
  } = useCometSession(comet as Comet, configs, question, setQuestion)

  useEffect(() => {
    if (ref.current) {
      ref.current.scroll({ behavior: "instant", top: 10000000000 })
    }
  }, [streamMessage, question])

  return (
    <div className="flex h-full flex-1 flex-col bg-success">
      <CometOutput
        ref={ref}
        isLoading={isLoading}
        session={session}
        streamMessage={streamMessage}
        error={error}
        resetSession={resetSession}
      />
      <CometInput
        question={question}
        setQuestion={setQuestion}
        promptUser={promptUser}
        isDisabled={isDisabled}
      />
    </div>
  )
}
