"use client"

import { createContext } from "react"

import SearchComponent from "../search/search"

type SearchConfig = Partial<{
  theme: "light" | "dark"
  containerWidth: number
  AIPlaceholder: string
  textSize: "small" | "medium" | "large"
  borderRadius: number
  dontKnowMessage: string
  referenceMessage: string
}>

export const SearchContext = createContext<SearchConfig>({} as SearchConfig)

export default function Search({ config }: { config?: SearchConfig }) {
  return (
    <SearchContext.Provider value={{ ...config }}>
      <SearchComponent />
    </SearchContext.Provider>
  )
}
