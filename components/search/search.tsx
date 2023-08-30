"use client"

import React, {
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { useStore } from "@/store/store"
import { ArrowRight, RefreshCcw, SearchIcon } from "lucide-react"
import { useSession } from "next-auth/react"
import { Comet } from "outpostkit"

import { useCometSession } from "@/lib/hooks/useCometSession"

import { SearchContext } from "../providers/search-provider"
import { LoadingDots } from "./icons"
import { MarkdownParser } from "./parse-markdown"

export interface Props extends React.HTMLProps<HTMLInputElement> {
  errorMessage?: string
  isSearching: boolean
  setIsSearching: React.Dispatch<SetStateAction<boolean>>
  resetSession: () => void
  sessionId: string
  promptUser: (e: any) => void
}

const SearchInput = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      style,
      isSearching,
      promptUser,
      setIsSearching,
      sessionId,
      resetSession,
      ...props
    },
    ref
  ) => {
    const { AIPlaceholder } = useContext(SearchContext)

    return (
      <div
        className={`relative flex h-[52px] items-center gap-3 border-b px-4`}
        style={style}
      >
        {!sessionId && (
          <form
            onSubmit={promptUser}
            className="flex w-full items-center gap-3"
          >
            <SearchIcon className={`w-4 shrink-0 stroke-black`} />
            <input
              autoFocus
              placeholder={`${AIPlaceholder ? AIPlaceholder : "Search"}`}
              className={`w-full text-[black] outline-none`}
              ref={ref}
              {...props}
            />
          </form>
        )}
        <div className="absolute right-4 flex  items-center justify-end gap-3">
          <button className="p-2" onClick={resetSession}>
            <RefreshCcw className="ml-auto block h-4" />
          </button>
          <div className=" flex items-center gap-1 rounded-lg bg-active p-1">
            <button
              className={`rounded-lg px-2 py-1 text-[black] ${
                !isSearching ? "bg-default shadow-0.25" : ""
              }`}
              onClick={() => {
                setIsSearching(false)
              }}
            >
              Ask
            </button>
            <button
              onClick={() => {
                setIsSearching(true)
              }}
              disabled
              className={`rounded-lg px-2 py-1 text-[black] disabled:opacity-25 ${
                isSearching ? "bg-default shadow-0.25" : ""
              }`}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    )
  }
)

SearchInput.displayName = "SearchInput"

function SearchFooter() {
  return (
    <div className="footer">
      <p>
        Powered by{" "}
        <a href="#" target="_blank">
          Outpost
        </a>
      </p>
    </div>
  )
}

function SearchContainer({ children }: { children: ReactNode }) {
  const { theme, containerWidth, borderRadius } = useContext(SearchContext)

  return (
    <div className={`OutpostSearch ${theme === "dark" ? "dark" : ""} `}>
      <div
        className="dialog-content relative pb-[76px]"
        style={{
          maxWidth: containerWidth,
          width: containerWidth,
          borderRadius,
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default function SearchComponent() {
  // const { includeBranding } = useContext(SearchContext)
  const [comet, configs] = useStore((store) => [store.comet, store.config])
  const [question, setQuestion] = useState("")

  const { data: user } = useSession()
  // const takeFeedback = useCallback(
  //   async (vote: boolean) => {
  //     const res = await comet?.takeConversationFeedback({
  //       conversationId: "",
  //       feedback: "",
  //       vote,
  //     })
  //     console.log(res)
  //   },
  //   [comet]
  // )

  const {
    isLoading,
    promptUser,
    session,
    isDisabled,
    streamMessage,
    resetSession,
    error,
  } = useCometSession(
    comet as Comet,
    configs,
    user?.user?.name || "",
    question,
    setQuestion
  )

  console.log(session)
  const ref = useRef<null | HTMLDivElement>(null)
  useEffect(() => {
    if (ref.current) {
      ref.current.scroll({ behavior: "instant", top: 10000000000 })
    }
  }, [streamMessage, question])

  return (
    <SearchContainer>
      <SearchInput
        promptUser={promptUser}
        resetSession={resetSession}
        isSearching={false}
        setIsSearching={() => {}}
        aria-disabled={isDisabled}
        onChange={(e: any) => {
          setQuestion(e.target.value)
        }}
        sessionId={session.sessionId}
        value={question}
      />

      <div
        ref={ref}
        className=" h-[var(--result-container-height)]   scroll-mb-10 scroll-pb-10 overflow-y-auto p-5  scrollbar-thin "
      >
        <div className=" space-y-5">
          {session?.messages &&
            session?.messages.length > 0 &&
            session?.messages.map((i, index) => (
              <div key={index} className="space-y-5">
                {i.from === "human" ? (
                  <div
                    className={` ml-auto w-max max-w-[70%] rounded-lg bg-hovered   p-3 text-[black]`}
                  >
                    {i?.text}
                  </div>
                ) : (
                  <div
                    className={` mr-auto w-max max-w-[70%] space-y-5 rounded-lg bg-hovered   p-3 text-[black]`}
                  >
                    <MarkdownParser answer={i?.text} />
                  </div>
                )}
              </div>
            ))}
          {isLoading && (
            <div className="w-14 shrink-0 rounded-lg bg-hovered p-3 text-[black]">
              <LoadingDots />
            </div>
          )}
          {streamMessage && (
            <div className="w-max max-w-[70%] snap-end rounded-lg bg-hovered p-3 text-[#000]">
              <MarkdownParser answer={streamMessage} />
            </div>
          )}
        </div>
        {session.sessionId && (
          <form
            onSubmit={promptUser}
            className="absolute inset-x-0 bottom-0 h-[76px] w-full bg-default p-5"
          >
            <div className="relative h-full w-full">
              <input
                autoFocus
                value={question}
                onChange={(e: any) => {
                  setQuestion(e.target.value)
                }}
                placeholder="Ask your question..."
                className="mt-auto h-9 w-full rounded-lg border p-2 text-[#000] outline-none"
              />
              <button
                onClick={promptUser}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                <ArrowRight className="h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
      {/* {includeBranding && <SearchFooter />} */}
    </SearchContainer>
  )
}
