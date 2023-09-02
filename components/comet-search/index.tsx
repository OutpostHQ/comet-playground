import React from "react"

import { CometInput } from "./comet-input"
import { CometOutput } from "./comet-output"

export default function CometSearch() {
  return (
    <div className="flex h-full flex-1 flex-col bg-success">
      <CometOutput />
      <CometInput />
    </div>
  )
}
