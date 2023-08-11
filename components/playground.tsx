"use client"

import { useState } from "react"
import { useStore } from "@/store/store"

import Search from "./providers/search-provider"
import Sidebar from "./sections/sidebar"

export default function Playground() {
  const [design] = useStore((state) => [state.design, state.api])

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
