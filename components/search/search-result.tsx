"use client"

import { useState } from "react"

const answerText = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium quo
qui deleniti, similique sapiente possimus facilis nam obcaecati a enim
voluptas nisi Lorem ipsum dolor sit amet consectetur, adipisicing elit.
Eum assumenda `

function GeneratedFrom() {
  return (
    <div className="generatedFrom">
      <p className="generatedFrom__title">
        Answer generated from the following pages:
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
  const [answer, setAnswer] = useState(answerText)
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
