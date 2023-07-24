"use client"

import { createContext } from "react"

import SearchComponent from "../search/search"

type SearchTheme = "light" | "dark"
type SearchSize = "small" | "base"

type SearchConfig = Partial<{
  theme: SearchTheme
  size: SearchSize
  borderRadius: string
  overlayColor: string
  dontKnowMessage: string
  DocPlaceholder: string
  AIPlaceholder: string
  includeBranding: string
}>

export const SearchContext = createContext<SearchConfig>({} as SearchConfig)

export default function Search({ config }: { config?: SearchConfig }) {
  return (
    <SearchContext.Provider value={{ ...config }}>
      <SearchComponent />
    </SearchContext.Provider>
  )
}
