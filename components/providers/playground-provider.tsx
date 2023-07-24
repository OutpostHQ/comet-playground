"use client"

import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react"

import useTheme from "@/lib/hooks/useTheme"

import Sidebar from "../sections/sidebar"
import Search from "./search-provider"

type SearchConfig = Partial<{
  theme: "light" | "dark"
  AIPlaceholder: string
  overlayColor: string
}>
type PlaygroundContext = {
  searchConfig: SearchConfig
  setSearchConfig: Dispatch<SetStateAction<SearchConfig>>
}

export const PlaygroundContext = createContext<PlaygroundContext>(
  {} as PlaygroundContext
)

function PlaygroundProvider({
  children,
  value,
}: {
  children: ReactNode
  value: PlaygroundContext
}) {
  return (
    <PlaygroundContext.Provider value={value}>
      {children}
    </PlaygroundContext.Provider>
  )
}

export default function Playground() {
  const [searchConfig, setSearchConfig] = useState({})
  const { theme } = useTheme()
  return (
    <div>
      <Search
        config={{
          theme: theme as "light" | "dark",
          includeBranding: "true",

          ...searchConfig,
        }}
      />
      <PlaygroundProvider value={{ searchConfig, setSearchConfig }}>
        <Sidebar />
      </PlaygroundProvider>
    </div>
  )
}
