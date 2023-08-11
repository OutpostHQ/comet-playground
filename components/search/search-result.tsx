"use client";

import { useContext } from "react"



import { SearchContext } from "../providers/search-provider";
import { MarkdownParser } from "./parse-markdown";


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
    <p className={`searchResultContent ${hasFinished ? "typingEffect" : ""}`}>
      <MarkdownParser>{answer}</MarkdownParser>
    </p>
  )
}

function SearchResultContainer({
  answer,
  hasFinished,
  references,
}: {
  answer?: string
  hasFinished?: boolean
  references?: string[]
}) {
  return (
    <div className="searchResultContainer">
      <SearchResultContainerContent answer={answer} hasFinished={hasFinished} />
      {references && <GeneratedFrom references={references} />}
    </div>
  )
}

export default SearchResultContainer