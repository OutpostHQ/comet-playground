import { useDesignStore } from "@/store/store"

import { Button } from "../ui/button"
import Field from "../ui/field"
import { Input } from "../ui/input"

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
  const [theme, setTheme] = useDesignStore((state) => [
    state.theme,
    state.setTheme,
  ])
  return (
    <Field className="" htmlFor="theme" label="Theming">
      <div className="flex">
        <Button
          onClick={() => {
            setTheme("light")
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
            setTheme("dark")
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
  const [containerWidth, setContainerWidth] = useDesignStore((state) => [
    state.containerWidth,
    state.setContainerWidth,
  ])

  return (
    <Field className="" htmlFor="width" label="Container width (Desktop)">
      <Input
        value={containerWidth}
        onChange={(e) => {
          setContainerWidth(Number(e.target.value))
        }}
        fullwidth
        placeholder="default: 615px"
        defaultValue="615"
        type="number"
      />
    </Field>
  )
}

function AIPlaceholder() {
  const [AIPlaceholder, setAIPlaceholder] = useDesignStore((state) => [
    state.AIPlaceholder,
    state.setAIPlaceholder,
  ])

  return (
    <Field className="" htmlFor="width" label="AI Placeholder">
      <Input
        value={AIPlaceholder}
        onChange={(e) => {
          setAIPlaceholder(e.target.value)
        }}
        fullwidth
        placeholder="How do I use Outopst API"
        defaultValue="Search"
      />
    </Field>
  )
}

function TextSize() {
  const [textSize, setTextSize] = useDesignStore((state) => [
    state.textSize,
    state.setTextSize,
  ])

  return (
    <Field className="" htmlFor="textSize" label="Text Size">
      <div className="flex">
        <Button
          onClick={() => {
            setTextSize("small")
          }}
          className={`${textSize == "small" ? "bg-pressed" : "bg-default"}
            flex-1 rounded-r-none`}
          variant="outline"
        >
          Small
        </Button>
        <Button
          onClick={() => {
            setTextSize("medium")
          }}
          className={`${textSize == "medium" ? "bg-pressed" : "bg-default"}
            flex-1 rounded-none border-x-0`}
          variant="outline"
        >
          Medium
        </Button>
        <Button
          onClick={() => {
            setTextSize("large")
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
  const [radius, setBorderRadius] = useDesignStore((state) => [
    state.borderRadius,
    state.setBorderRadius,
  ])

  return (
    <Field className="" htmlFor="radius" label="Radius">
      <Input
        value={radius}
        onChange={(e) => {
          setBorderRadius(Number(e.target.value))
        }}
        fullwidth
        placeholder="default: 8px"
        defaultValue="8"
        type="number"
      />
    </Field>
  )
}

function DontKnowMessage() {
  const [dontKnowMessage, setDontKnowMessage] = useDesignStore((state) => [
    state.dontKnowMessage,
    state.setDontKnowMessage,
  ])

  return (
    <Field className="" htmlFor="width" label="Don't know message">
      <Input
        value={dontKnowMessage}
        onChange={(e) => {
          setDontKnowMessage(e.target.value)
        }}
        fullwidth
        placeholder="Sorry, I couldn't find anything related to your search "
        defaultValue="Sorry, I couldn't find anything related to your search "
      />
    </Field>
  )
}

function ReferenceMessage() {
  const [referenceMessage, setReferenceMessage] = useDesignStore((state) => [
    state.referenceMessage,
    state.setReferenceMessage,
  ])

  return (
    <Field className="" htmlFor="width" label="Reference message">
      <Input
        value={referenceMessage}
        onChange={(e) => {
          setReferenceMessage(e.target.value)
        }}
        fullwidth
        placeholder="Answer generated from the following pages"
        defaultValue="Answer generated from the following pages"
      />
    </Field>
  )
}
