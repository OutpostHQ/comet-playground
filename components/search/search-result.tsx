"use client"

import { useContext } from "react"

import { SearchContext } from "../providers/search-provider"
import { MarkdownParser } from "./parse-markdown"

function GeneratedFrom({ references }: { references: string[] }) {
  const { referenceMessage } = useContext(SearchContext)
  return (
    <div className="generatedFrom">
      <p className="generatedFrom__title">
        {referenceMessage || "Answer generated from the following pages"}:
      </p>
      <div className="generatedFrom__tabs">
        {references.map((i) => (
          <p className="generatedFrom__tab" key={i}>
            {i}
          </p>
        ))}
      </div>
    </div>
  )
}

function SearchResultContainerContent({
  answer,
  hasFinished,
}: {
  answer?: string
  hasFinished?: boolean
}) {
  if (answer === undefined)
    return <p className="searchResultContent">Go ahead, ask a question...</p>

  return (
    <div
      className={`searchResultContent scrollbar-thin scrollbar-track-transparent scrollbar-thumb-transparent ${
        hasFinished ? "typingEffect" : ""
      }`}
    >
      <MarkdownParser answer={answer} />
    </div>
  )
}

function SearchResultContainer({
  answer,
  hasFinished,
  references,
  error,
}: {
  error?: string
  answer?: string
  hasFinished?: boolean
  references?: string[]
}) {
  return (
    <div className="searchResultContainer">
      {error ? (
        <div className="searchResultContent">
          <div className="rounded-md bg-[#ff6666] p-2 text-[#000000]">
            {error}
          </div>
        </div>
      ) : (
        <>
          <SearchResultContainerContent
            answer={answer}
            hasFinished={hasFinished}
          />
          {/* {references && references?.length > 0 && (
            <GeneratedFrom references={references} />
          )} */}
        </>
      )}
    </div>
  )
}

export default SearchResultContainer
