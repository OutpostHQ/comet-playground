"use client"

import { Aperture, UserCircle2Icon } from "lucide-react"

import { markdown } from "../markdown/markdown"
import { MarkdownParser } from "../search/parse-markdown"

export function CometOutput() {
  return (
    <div className="comet-search flex w-full flex-1 flex-col overflow-hidden bg-subdued">
      <div className="border-b px-5 py-3 text-headingLg">Outpost.AI</div>
      <div className="h-full flex-1 divide-y overflow-y-scroll pb-20 scrollbar-none  ">
        <CometQuestion />
        <CometReply />
      </div>
    </div>
  )
}

export function CometQuestion() {
  return (
    <div className="bg-hovered">
      <div className="mx-auto  max-w-[700px]  bg-hovered ">
        <div className="flex gap-4 py-5">
          <UserCircle2Icon className="h-5 w-5 shrink-0 text-icon-soft" />
          <div className="text-bodyLg">What is react js?</div>
        </div>
      </div>
    </div>
  )
}

export function CometReply() {
  return (
    <div className="bg-subdued">
      <div className=" mx-auto w-full max-w-[700px] ">
        <div className="flex gap-4  py-5">
          <Aperture className="h-5 w-5 shrink-0 text-icon-soft" />
          <div className="w-[calc(100%-20px-16px)]  space-y-4 text-bodyLg">
            <MarkdownParser answer={markdown} />
          </div>
        </div>
      </div>
    </div>
  )
}
