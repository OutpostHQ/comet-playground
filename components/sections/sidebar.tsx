"use client"

import React, { useCallback, useContext } from "react"
import { Switch } from "@radix-ui/react-switch"

import { PlaygroundContext } from "../providers/playground-provider"
import { Button } from "../ui/button"
import Field from "../ui/field"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import Text from "../ui/text"

export default function Sidebar() {
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

function Design() {
  const { searchConfig, setSearchConfig } = useContext(PlaygroundContext)

  const handleValueChange = useCallback(
    (key: keyof typeof searchConfig, value: string) => {
      setSearchConfig((prev) => {
        return { ...prev, [key]: value }
      })
    },
    [setSearchConfig]
  )

  console.log(searchConfig)
  return (
    <div className="h-[80vh] w-[var(--sidebar-width)]  space-y-4 overflow-y-scroll px-4 py-5 pb-10 scrollbar scrollbar-none">
      <Field className="" htmlFor="theme" label="Theming">
        <div className="flex">
          <Button
            onClick={() => {
              handleValueChange("theme", "light")
            }}
            variant="outline"
            className={`${
              !searchConfig?.theme || searchConfig.theme == "light"
                ? "bg-pressed"
                : "bg-default"
            } flex-1 rounded-r-none border-r-0`}
          >
            Light
          </Button>
          <Button
            onClick={() => {
              handleValueChange("theme", "dark")
            }}
            variant="outline"
            className={`${
              searchConfig?.theme == "dark" ? "bg-pressed" : "bg-default"
            }  flex-1 rounded-l-none`}
          >
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
          onChange={(e) => {
            handleValueChange("AIPlaceholder", e.target.value)
          }}
          fullwidth
          placeholder="How do I use Outopst API"
          defaultValue="Search"
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
