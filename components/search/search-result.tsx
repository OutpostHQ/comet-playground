"use client"

import { useContext, useState } from "react"

import { SearchContext } from "../providers/search-provider"

const answerText = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium quo
qui deleniti, similique sapiente possimus facilis nam obcaecati a enim
voluptas nisi Lorem ipsum dolor sit amet consectetur, adipisicing elit.
Eum assumenda `

function GeneratedFrom() {
  const { referenceMessage } = useContext(SearchContext)

  return (
    <div className="generatedFrom">
      <p className="generatedFrom__title">
        {referenceMessage || "Answer generated from the following pages"}:
      </p>
      <div className="generatedFrom__tabs">
        {["mdx", "project-structure", "jsx", "components", "quick-start"].map(
          (i) => (
            <p className="generatedFrom__tab" key={i}>
              {i}
            </p>
          )
        )}
      </div>
    </div>
  )
}

function SearchResultContainerContent() {
  const { dontKnowMessage } = useContext(SearchContext)

  const [answer, setAnswer] = useState(answerText)
  if (!answer) return <p className="searchResultContent">{dontKnowMessage}</p>

  return <p className="searchResultContent">{answer}</p>
}

function SearchResultContainer() {
  return (
    <div className="searchResultContainer">
      <SearchResultContainerContent />
      <GeneratedFrom />
    </div>
  )
}

export default SearchResultContainer
