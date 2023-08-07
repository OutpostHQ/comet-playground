"use client"

import React from "react"
import { useDesignStore } from "@/store/store"

import Field from "../ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import Text from "../ui/text"
import { Design } from "./design-tab"

export default function Sidebar() {
  const state = useDesignStore((state) => state.design)

  console.log(state)
  return (
    <aside className="fixed bottom-6 right-6 top-[calc(var(--header-height)+24px)] w-[var(--sidebar-width)]  overflow-hidden rounded-lg border bg-default shadow-0.25">
      <Tabs defaultValue="design">
        <TabsList className=" border-0 border-b bg-default">
          <TabsTrigger className="px-4 py-2 font-medium" value="design">
            Design
          </TabsTrigger>
          <TabsTrigger className="px-4 py-2 font-medium" value="model">
            Model configurator
          </TabsTrigger>
        </TabsList>
        <TabsContent className="overflow-hidden border-none p-0" value="design">
          <Design />
        </TabsContent>
        <TabsContent className="overflow-auto border-none p-0" value="model">
          <Model />
        </TabsContent>
      </Tabs>
    </aside>
  )
}

/* 
"max_tokens": 16,
    "temperature": 1,
    "top_p": 1,
    "presence_penalty": 0,
    "frequency_penalty": 0
*/

function Model() {
  return (
    <div className="h-[80vh] space-y-4 overflow-y-auto px-4 py-5 pb-10 scrollbar scrollbar-none">
      <Field htmlFor="model" label="Model">
        <Select>
          <SelectTrigger>gpt-4</SelectTrigger>
          <SelectContent>
            <SelectItem value="One">One</SelectItem>
            <SelectItem value="Two">Two</SelectItem>
            <SelectItem value="Three">Three</SelectItem>
          </SelectContent>
        </Select>
      </Field>

      <Field
        htmlFor="template"
        label={
          <p className="mb-1 flex items-center gap-2">
            <Text as="span" weight="medium" className="text-soft">
              Template
            </Text>
            <span className="rounded-full border border-primary bg-primary-subdued px-2 py-0.5 text-xs">
              Pro
            </span>
          </p>
        }
      >
        <Select>
          <SelectTrigger>gpt-4</SelectTrigger>
          <SelectContent>
            <SelectItem value="One">One</SelectItem>
            <SelectItem value="Two">Two</SelectItem>
            <SelectItem value="Three">Three</SelectItem>
          </SelectContent>
        </Select>
      </Field>
    </div>
  )
}
