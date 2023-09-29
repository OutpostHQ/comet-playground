"use client"

import React, { useCallback, useEffect, useState } from "react"
import { useStore } from "@/store/store"
import { Text } from "@components/text"
import {
  Aperture,
  RefreshCcw,
  ThumbsDown,
  ThumbsUp,
  UserCircle2Icon,
} from "lucide-react"

import { useToast } from "@/components/ui/use-toast"
import { CometSession } from "@/components/comet-search"
import { LoadingDots } from "@/components/comet-search/icons"
import { MarkdownParser } from "@/components/markdown/markdown-parser"

export const SearchOutput = React.forwardRef<HTMLDivElement, any>(
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
      <div className="flex w-full flex-1 flex-col overflow-hidden bg-subdued">
        {props?.session?.messages?.length > 0 && (
          <div className="flex items-center justify-between border-b px-5 py-3 text-headingLg">
            <button
              className="ml-auto block"
              onClick={props?.resetSession}
              title="Refresh conversation"
            >
              <RefreshCcw className="h-4 w-4 text-soft" />
            </button>
          </div>
        )}
        <div
          ref={ref}
          className="h-full flex-1 divide-y overflow-y-scroll pb-8 scrollbar-none  "
        >
          {props?.session?.messages &&
            props?.session?.messages.length > 0 &&
            props?.session?.messages.map((i, index) =>
              i.from === "human" ? (
                <SearchQuestion
                  key={`${i.conversationId}/${i.from}`}
                  text={i.text}
                />
              ) : (
                <SearchReply
                  key={`${i.conversationId}/${i.from}`}
                  text={i.text}
                  conversationId={i.conversationId}
                />
              )
            )}
          {props?.streamMessage && (
            <SearchReplyStream stream={props?.streamMessage} />
          )}
          {props?.isLoading && <SearchReplyLoading />}
          {props?.error && <SearchReplyError text={props?.error} />}
        </div>
      </div>
    )
  }
)

export function SearchReplyError(props: { text: string | undefined }) {
  return (
    <div className="bg-critical-subdued px-4">
      <div className=" mx-auto w-full max-w-[700px] py-5 ">
        <Text className="text-critical">{props?.text}</Text>
      </div>
    </div>
  )
}

export function SearchReplyLoading() {
  return (
    <div className="bg-subdued px-4">
      <div className=" mx-auto w-full max-w-[700px] py-5 ">
        <div className="w-14 shrink-0 rounded-full border p-3 ">
          <LoadingDots />
        </div>
      </div>
    </div>
  )
}

export function SearchReplyStream(props: { stream: string | undefined }) {
  return (
    <div className="bg-subdued px-4">
      <div className=" mx-auto w-full max-w-[700px] ">
        <div className="flex gap-4  py-5">
          <Aperture className="h-5 w-5 shrink-0 text-icon-soft" />
          <div className="w-[calc(100%-20px-16px)]  space-y-4 text-bodyMd">
            <MarkdownParser answer={props?.stream as string} />
          </div>
        </div>
      </div>
    </div>
  )
}

SearchOutput.displayName = "CometOutput"

export function SearchQuestion(props: { text: string }) {
  return (
    <div className="bg-hovered px-4 [&:last-child]:border-b">
      <div className="mx-auto  max-w-[700px]  bg-hovered ">
        <div className="flex gap-4 py-5">
          <UserCircle2Icon className="h-5 w-5 shrink-0 text-icon-soft" />
          <div className="text-bodyMd">{props?.text}</div>
        </div>
      </div>
    </div>
  )
}

export function SearchReply(props: {
  text: string
  conversationId: string | undefined | null
}) {
  const [isCopied, setIsCopied] = useState(false)

  const [vote, setVote] = useState<true | false | null>(null)
  const [hasVoted, setHasVoted] = useState(false)
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const [comet] = useStore((store) => [store.comet, store.config])
  const [feedbackString, setFeedbackString] = useState("")
  useEffect(() => {
    setTimeout(() => {
      if (isCopied) {
        setIsCopied(false)
      }
    }, 2000)
  }, [isCopied])

  const takeFeedback = useCallback(
    async (body: { vote?: boolean; feedback?: string }) => {
      try {
        const res = await comet?.takeConversationFeedback({
          conversationId: props?.conversationId as string,
          ...body,
        })
        if (body.vote === true || body.vote === false) {
          setVote(body.vote)
        }
        setHasVoted(true)
        setOpen(false)
        toast({ title: "Feedback submitted" })
      } catch (e: any) {
        toast({
          title: "There was an error while submitting your feedback",
          description: `${e?.message}`,
        })
      }
    },

    [comet, props?.conversationId, toast]
  )

  return (
    <div className=" group bg-subdued px-4">
      <div className="relative mx-auto w-full max-w-[700px] ">
        <div className="flex gap-4  py-5">
          <Aperture className="h-5 w-5 shrink-0 text-icon-soft" />
          <div className="w-[calc(100%-20px-16px)]  space-y-4 text-bodyMd">
            <MarkdownParser answer={props?.text} />
          </div>
        </div>
        <div className="absolute -right-24 top-5 z-[10000] flex gap-3 opacity-0 group-hover:opacity-100">
          {/* <button
            onClick={() => {
              setIsCopied(true)
              navigator.clipboard.writeText(props?.text)
            }}
          >
            {isCopied ? (
              <CheckIcon className="h-5 w-5 text-icon-soft" />
            ) : (
              <Copy className="h-5 w-5 text-icon-soft" />
            )}
          </button> */}
          {/* <button
            className="disabled:opacity-50"
            onClick={() => {
              if (hasVoted) return
              takeFeedback({ vote: true })
            }}
            disabled={hasVoted}
          >
            <ThumbsUp
              className={`h-5 w-5  ${
                hasVoted && vote === true
                  ? "fill-black stroke-transparent"
                  : "text-icon-soft"
              }`}
            />
          </button>
          <button
            className="disabled:opacity-50"
            onClick={() => {
              if (hasVoted) return
              takeFeedback({ vote: false })
            }}
            disabled={hasVoted}
          >
            <ThumbsDown
              className={`h-5 w-5  ${
                hasVoted && vote === false
                  ? "fill-black stroke-transparent"
                  : "text-icon-soft"
              }`}
            />
          </button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button disabled={hasVoted} className="disabled:opacity-50">
                <HelpCircle className="h-5 w-5 text-icon-soft " />
              </button>
            </DialogTrigger>
            <DialogContent>
              <div className="p-5">
                <Text variant="bodySm" weight="semibold">
                  Feedback
                </Text>
                <Input
                  value={feedbackString}
                  onChange={(e) => {
                    setFeedbackString(e.target.value)
                  }}
                  className="mt-2"
                  placeholder="Add any suggestions you might have!"
                />
              </div>
              <div className="flex justify-end border-t px-5 py-3">
                <Button
                  onClick={() => {
                    feedbackString.trim() !== ""
                      ? takeFeedback({ feedback: feedbackString })
                      : null
                  }}
                >
                  Send feedback
                </Button>
              </div>
            </DialogContent>
          </Dialog> */}
        </div>
      </div>
    </div>
  )
}
