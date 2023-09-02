"use client"

import React from "react"
import { Aperture, RefreshCcw, UserCircle2Icon } from "lucide-react"

import { CometSession } from "."
import { MarkdownParser } from "../markdown/markdown-parser"
import Text from "../ui/text"
import { LoadingDots } from "./icons"

export const CometOutput = React.forwardRef<HTMLDivElement, any>(
  (
    props: {
      session: CometSession
      streamMessage: string | undefined
      isLoading: boolean
      error: string | undefined
      resetSession: any
    },
    ref
  ) => {
    return (
      <div className="comet-search flex w-full flex-1 flex-col overflow-hidden bg-subdued">
        <div className="flex items-center justify-between border-b px-5 py-3 text-headingLg">
          <Text className="text-headingLg">Outpost.AI</Text>
          <button onClick={props?.resetSession} title="Refresh conversation">
            <RefreshCcw className="h-4 w-4 text-soft" />
          </button>
        </div>
        <div
          ref={ref}
          className="h-full flex-1 divide-y overflow-y-scroll pb-20 scrollbar-none  "
        >
          {props?.session?.messages &&
            props?.session?.messages.length > 0 &&
            props?.session?.messages.map((i, index) =>
              i.from === "human" ? (
                <CometQuestion
                  key={`${i.conversationId}/${i.from}`}
                  text={i.text}
                />
              ) : (
                <CometReply
                  key={`${i.conversationId}/${i.from}`}
                  text={i.text}
                />
              )
            )}
          {props?.streamMessage && (
            <CometReplyStream stream={props?.streamMessage} />
          )}
          {props?.isLoading && <CometReplyLoading />}
          {props?.error && <CometReplyError text={props?.error} />}
        </div>
      </div>
    )
  }
)

export function CometReplyError(props: { text: string | undefined }) {
  return (
    <div className="bg-critical-subdued">
      <div className=" mx-auto w-full max-w-[700px] py-5 ">
        <Text className="text-critical">{props?.text}</Text>
      </div>
    </div>
  )
}

export function CometReplyLoading() {
  return (
    <div className="bg-subdued">
      <div className=" mx-auto w-full max-w-[700px] py-5 ">
        <div className="w-14 shrink-0 rounded-full border p-3 ">
          <LoadingDots />
        </div>
      </div>
    </div>
  )
}

export function CometReplyStream(props: { stream: string | undefined }) {
  return (
    <div className="bg-subdued">
      <div className=" mx-auto w-full max-w-[700px] ">
        <div className="flex gap-4  py-5">
          <Aperture className="h-5 w-5 shrink-0 text-icon-soft" />
          <div className="w-[calc(100%-20px-16px)]  space-y-4 text-bodyLg">
            <MarkdownParser answer={props?.stream as string} />
          </div>
        </div>
      </div>
    </div>
  )
}

CometOutput.displayName = "CometOutput"

export function CometQuestion(props: { text: string }) {
  return (
    <div className="bg-hovered [&:last-child]:border-b">
      <div className="mx-auto  max-w-[700px]  bg-hovered ">
        <div className="flex gap-4 py-5">
          <UserCircle2Icon className="h-5 w-5 shrink-0 text-icon-soft" />
          <div className="text-bodyLg">{props?.text}</div>
        </div>
      </div>
    </div>
  )
}

export function CometReply(props: { text: string }) {
  return (
    <div className="bg-subdued">
      <div className=" mx-auto w-full max-w-[700px] ">
        <div className="flex gap-4  py-5">
          <Aperture className="h-5 w-5 shrink-0 text-icon-soft" />
          <div className="w-[calc(100%-20px-16px)]  space-y-4 text-bodyLg">
            <MarkdownParser answer={props?.text} />
          </div>
        </div>
      </div>
    </div>
  )
}
