"use client";

import React, { useContext, useState } from "react"
import { useStore } from "@/store/store"
import { SearchIcon } from "lucide-react"

import { SearchContext } from "../providers/search-provider"
import SearchResultContainer from "./search-result"

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  errorMessage?: string
}

const SearchInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ style, ...props }, ref) => {
  const { AIPlaceholder } = useContext(SearchContext)

  return (
    <div className={`search__input-container `} style={style}>
      <SearchIcon className={`search__input-icon`} />
      <input
        placeholder={`${AIPlaceholder ? AIPlaceholder : "Search"}`}
        className={`search__input-input`}
        ref={ref}
        {...props}
      />
    </div>
  )
})

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

function SearchContainer({ children }: Props) {
  const { theme, containerWidth, borderRadius } = useContext(SearchContext)

  return (
    <div className={`OutpostSearch ${theme === "dark" ? "dark" : ""} `}>
      <div
        className="dialog-content"
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
  const [answer, setAnswer] = useState<string>()
  const [fullResponse, setFullResponse] = useState<{
    response: string
    referencePaths: string[]
  }>()
  return (
    <SearchContainer>
      <SearchInput
        onKeyDown={async (e) => {
          if (e.key === "Enter") {
            if (comet) {
              const stream = configs.stream

              const data = await comet.prompt(
                {
                  configs,
                  stream,
                  input: question,
                  visitorId: "ajeya",
                },
                stream
                  ? (text) => {
                      console.log("text:", text)
                      setAnswer(text)
                    }
                  : undefined
              )

              if (!stream) {
                setAnswer(data?.response || "No response.")
              }
              setFullResponse(data)
            }
          } else console.log("no comet.")
        }}
        onChange={(e) => {
          setQuestion(e.target.value)
        }}
        value={question}
      />
      <SearchResultContainer
        answer={answer}
        hasFinished={fullResponse && true}
        references={fullResponse?.referencePaths}
      />
      {/* {includeBranding && <SearchFooter />} */}
    </SearchContainer>
  )
}