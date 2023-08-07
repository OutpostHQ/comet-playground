import { useStore } from "@/store/store"

import { Button } from "../ui/button"
import Field from "../ui/field"
import { Input } from "../ui/input"
import { Slider } from "../ui/slider"

export function Design() {
  return (
    <div className="h-[80vh] w-[var(--sidebar-width)]  space-y-4 overflow-y-scroll px-4 py-5 pb-10 scrollbar scrollbar-none">
      <Theme />
      <ContainerWidth />
      <AIPlaceholder />
      <TextSize />
      <Radius />
      <DontKnowMessage />
      <ReferenceMessage />
    </div>
  )
}

function Theme() {
  const [theme, update] = useStore((state) => [
    state.design.theme,
    state.updateDesign,
  ])
  return (
    <Field className="" htmlFor="theme" label="Theming">
      <div className="flex">
        <Button
          onClick={() => {
            update("theme", "light")
          }}
          variant="outline"
          className={`${
            theme == "light" ? "bg-pressed" : "bg-default"
          } flex-1 rounded-r-none border-r-0`}
        >
          Light
        </Button>
        <Button
          onClick={() => {
            update("theme", "dark")
          }}
          variant="outline"
          className={`${
            theme == "dark" ? "bg-pressed" : "bg-default"
          }  flex-1 rounded-l-none`}
        >
          Dark
        </Button>
      </div>
    </Field>
  )
}

function ContainerWidth() {
  const [containerWidth, update] = useStore((state) => [
    state.design.containerWidth,
    state.updateDesign,
  ])

  return (
    <Field className="" htmlFor="width" label="Container width (Desktop)">
      <Slider
        value={[containerWidth]}
        onValueChange={(value) => {
          update("containerWidth", Number(value))
        }}
        max={750}
        min={400}
      />
    </Field>
  )
}

function AIPlaceholder() {
  const [AIPlaceholder, update] = useStore((state) => [
    state.design.AIPlaceholder,
    state.updateDesign,
  ])

  return (
    <Field className="" htmlFor="width" label="AI Placeholder">
      <Input
        value={AIPlaceholder}
        onChange={(e) => {
          update("AIPlaceholder", e.target.value)
        }}
        fullwidth
        placeholder="How do I use Outopst API"
      />
    </Field>
  )
}

function TextSize() {
  const [textSize, update] = useStore((state) => [
    state.design.textSize,
    state.updateDesign,
  ])

  return (
    <Field className="" htmlFor="textSize" label="Text Size">
      <div className="flex">
        <Button
          onClick={() => {
            update("textSize", "small")
          }}
          className={`${textSize == "small" ? "bg-pressed" : "bg-default"}
            flex-1 rounded-r-none`}
          variant="outline"
        >
          Small
        </Button>
        <Button
          onClick={() => {
            update("textSize", "medium")
          }}
          className={`${textSize == "medium" ? "bg-pressed" : "bg-default"}
            flex-1 rounded-none border-x-0`}
          variant="outline"
        >
          Medium
        </Button>
        <Button
          onClick={() => {
            update("textSize", "large")
          }}
          className={` ${
            textSize == "large" ? "bg-pressed" : "bg-default"
          } flex-1 rounded-l-none`}
          variant="outline"
        >
          Large
        </Button>
      </div>
    </Field>
  )
}

function Radius() {
  const [radius, update] = useStore((state) => [
    state.design.borderRadius,
    state.updateDesign,
  ])

  return (
    <Field className="" htmlFor="radius" label="Radius">
      <Slider
        value={[radius]}
        onValueChange={(value) => {
          update("borderRadius", Number(value))
        }}
        max={20}
        min={0}
      />
    </Field>
  )
}

function DontKnowMessage() {
  const [dontKnowMessage, update] = useStore((state) => [
    state.design.dontKnowMessage,
    state.updateDesign,
  ])

  return (
    <Field className="" htmlFor="width" label="Don't know message">
      <Input
        value={dontKnowMessage}
        onChange={(e) => {
          update("dontKnowMessage", e.target.value)
        }}
        fullwidth
        placeholder="Sorry, I couldn't find anything related to your search "
      />
    </Field>
  )
}

function ReferenceMessage() {
  const [referenceMessage, update] = useStore((state) => [
    state.design.referenceMessage,
    state.updateDesign,
  ])

  return (
    <Field className="" htmlFor="width" label="Reference message">
      <Input
        value={referenceMessage}
        onChange={(e) => {
          update("referenceMessage", e.target.value)
        }}
        fullwidth
        placeholder="Answer generated from the following pages"
      />
    </Field>
  )
}
