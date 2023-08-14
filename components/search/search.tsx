"use client";

import React, {
  KeyboardEventHandler,
  useCallback,
  useContext,
  useState,
} from "react"
import { useStore } from "@/store/store"
import { SearchIcon } from "lucide-react"



import { streamPromptWithNativeFetch } from "@/lib/utils/fetch-stream"



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
  const [answer, setAnswer] = useState<string>("")
  const [fullResponse, setFullResponse] = useState<{
    response: string
    referencePaths: string[]
  }>()
  const [isDisabled, setDisable] = useState(false)
  const [error, setError] = useState<string | undefined>()

  return (
    <SearchContainer>
      <SearchInput
        aria-disabled={isDisabled}
        onKeyUp={useCallback(
          async function (e: { key: string }) {
            //todo: maybe dont check diabled here.
            // add it in the search input props
            if (e.key === "Enter" && !isDisabled) {
              if (comet) {
                const stream = configs.stream
                setAnswer("")
                setFullResponse(undefined)
                setError(undefined)
                setDisable(true)
                try {
                  const data = await comet.prompt(
                    {
                      configs,
                      stream,
                      input: question,
                      visitorId: "ajeya",
                    },
                    stream
                      ? (text: string) => {
                          setAnswer((current) => current + text)
                        }
                      : undefined
                  )

                  if (!stream) {
                    setAnswer(data?.response || "No response.")
                  }
                  setFullResponse(data)
                } catch (e: any) {
                  setError(e?.message || "Try again.")
                }
              } else setError("No Comet Instance found.")

              setDisable(false)
            }
          },
          [ comet, configs, isDisabled, question]
        )}
        onChange={(e) => {
          setQuestion(e.target.value)
        }}
        value={question}
      />
      <SearchResultContainer
        answer={answer}
        error={error}
        hasFinished={fullResponse && true}
        references={Array.from(new Set(fullResponse?.referencePaths))}
      />
      {/* {includeBranding && <SearchFooter />} */}
    </SearchContainer>
  )
}