import React from "react"

import { Input } from "@/components/ui/input"
import Text from "@/components/ui/text"
import Sidebar from "@/components/sections/sidebar"

export default async function Page() {
  return (
    <div className="grid h-screen grid-rows-[1fr,max-content] place-items-center overflow-hidden px-40 pt-[60px]">
      <CometOutput />
      <CometInput />
      <Sidebar />
    </div>
  )
}

export function CometInput() {
  return (
    <div className="h-32 w-full  border px-5 pt-5 ">
      <Input placeholder="Ask a question" autoFocus />
    </div>
  )
}

export function CometOutput() {
  return (
    <div className="relative  h-full w-full overflow-hidden border-x bg-default ">
      <Text
        variant="displaySmall"
        weight="semibold"
        className="border-b px-5 py-3"
      >
        Outpost.AI
      </Text>
      <div className="h-full overflow-y-auto p-5 pb-20 scrollbar-none">
        eligendi, consequatur cupiditate animi sequi enim, ipsam unde incidunt
        provident dolorum eaque eum optio maxime aspernatur harum. Expedita
        ullam harum iure possimus quo aut? Porro, sunt quas. Velit praesentium
        minima repudiandae, nemo in nam? Dolore maiores, aliquam illum expedita
        pariatur placeat nisi dicta optio molestias nihil suscipit quae quaerat
        unde odio facere similique eveniet aperiam quo asperiores.
      </div>
    </div>
  )
}
