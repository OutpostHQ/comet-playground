"use client"

import { useStore } from "@/store/store"

import Search from "./providers/search-provider"
import Sidebar from "./sections/sidebar"

export default function Playground() {
  const [design] = useStore((state) => [state.design])
  return (
    <div>
      <Search
        config={{
          ...design,
        }}
      />
      <Sidebar />
    </div>
  )
}
