"use client"

import React from "react"
import { Switch } from "@radix-ui/react-switch"

import { Button } from "../ui/button"
import Field from "../ui/field"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

export default function Sidebar() {
  return (
    <aside className="fixed bottom-6 right-6 top-[calc(var(--header-height)+24px)] w-[var(--sidebar-width)] overflow-hidden rounded-lg border border-border-default bg-surface-default shadow-cp-shadow-0.25">
      <Tabs defaultValue="design">
        <TabsList className="bg-surface-default">
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

function Design() {
  return (
    <div className="h-[80vh]  space-y-4 overflow-y-scroll px-4 py-5 pb-10 scrollbar scrollbar-none">
      <Field className="" htmlFor="theme" label="Theming">
        <div className="flex">
          <Button
            variant="outline"
            className="flex-1 rounded-r-none border-r-0"
          >
            Light
          </Button>
          <Button variant="outline" className=" flex-1 rounded-l-none">
            Dark
          </Button>
        </div>
      </Field>

      <Field className="" htmlFor="width" label="Container width (Desktop)">
        <Input
          fullwidth
          placeholder="default: 615px"
          defaultValue="615"
          type="number"
        />
      </Field>

      <Field className="" htmlFor="width" label="AI Placeholder">
        <Input
          fullwidth
          placeholder="How do I use Outopst API"
          defaultValue="How do I use Outpost API"
        />
      </Field>

      <Field className="" htmlFor="textSize" label="Text Size">
        <div className="flex">
          <Button className="flex-1 rounded-r-none" variant="outline">
            Small
          </Button>
          <Button className="flex-1 rounded-none border-x-0" variant="outline">
            Medium
          </Button>
          <Button className="flex-1 rounded-l-none" variant="outline">
            Large
          </Button>
        </div>
      </Field>

      <Field className="flex-1" htmlFor="radius" label="Radius">
        <Input fullwidth defaultValue="8" type="number" />
      </Field>
      <Field className="" htmlFor="width" label="Don't know message">
        <Input
          placeholder="Sorry, I couldn't find anything related to your search "
          defaultValue="Sorry, I couldn't find anything related to your search "
          fullwidth
        />
      </Field>
      <Field className="" htmlFor="width" label="Reference message">
        <Input
          placeholder="Answer generated from the following pages"
          defaultValue="Answer generated from the following pages"
          fullwidth
        />
      </Field>
      <div className="flex items-center justify-between">
        <Label />
        <Switch />
      </div>
    </div>
  )
}

function Model() {
  return (
    <div className="h-[80vh] overflow-y-auto px-4 py-5 pb-10 scrollbar scrollbar-none">
      two
    </div>
  )
}
