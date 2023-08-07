"use client"

import React, { useContext } from "react"
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
    <div
      className={`search__input-container`}
      style={{
        ...style,
      }}
    >
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
  const { theme, containerWidth } = useContext(SearchContext)

  return (
    <div className={`OutpostSearch ${theme === "dark" ? "dark" : ""}`}>
      <div className="dialog-content" style={{ maxWidth: containerWidth }}>
        {children}
      </div>
    </div>
  )
}

export default function SearchComponent() {
  // const { includeBranding } = useContext(SearchContext)
  return (
    <SearchContainer>
      <SearchInput />
      <SearchResultContainer />
      {/* {includeBranding && <SearchFooter />} */}
    </SearchContainer>
  )
}
