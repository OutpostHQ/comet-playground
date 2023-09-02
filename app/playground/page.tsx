import React from "react"

import CometSearch from "@/components/comet-search"
import Sidebar from "@/components/sections/sidebar"

export default async function Page() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-warning pt-[60px]">
      <CometSearch />
      <Sidebar />
    </div>
  )
}
