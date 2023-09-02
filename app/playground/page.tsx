import React from "react"

import { Input } from "@/components/ui/input"

export default async function Page() {
  return (
    <div className="grid h-screen grid-rows-[1fr,max-content] place-items-center overflow-hidden bg-critical px-40 pt-[60px]">
      <CometOutput />
      <CometInput />
      {/* <Playground /> */}
    </div>
  )
}

export function CometInput() {
  return (
    <div className="h-20 w-full bg-success">
      <Input />
    </div>
  )
}

export function CometOutput() {
  return (
    <div className="relative h-full w-full overflow-y-auto bg-warning">ds</div>
  )
}
