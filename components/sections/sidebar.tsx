"use client"

import React from "react"
import { useStore } from "@/store/store"
import { useSession } from "next-auth/react"

import { Button } from "../ui/button"
import Field from "../ui/field"
import { Input } from "../ui/input"
import { Slider } from "../ui/slider"
import { Switch } from "../ui/switch"
import Text from "../ui/text"
import { useToast } from "../ui/use-toast"

export default function Sidebar() {
  const { toast } = useToast()
  const [createComet, cometId, comet] = useStore((state) => [
    state.createComet,
    state.api.cometId,
    state.comet,
  ])
  const session = useSession()

  return (
    <aside className="relative flex w-[var(--sidebar-width)] flex-col space-y-4 overflow-hidden overflow-y-auto border border-y-0 bg-default p-5 pb-10  scrollbar scrollbar-none">
      <div>
        <Text variant="displaySmall">Configure Model</Text>
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto  pb-16">
        <CometId />
        <Temprature />
        <TopP />
        <PresencePenalty />
        <FrequencePenalty />
        <MaxTokens />
        <Stream />
      </div>

      <div className="absolute bottom-0 right-0 w-full border-t bg-default p-4">
        <Button
          disabled={Boolean(!cometId.trim())}
          onClick={() => {
            toast({ title: "Config updated!" })
            try {
              session.status === "authenticated" &&
                createComet(session.data.user.accessToken)
            } catch (e: any) {
              console.log(e)
              toast({ title: e.message })
            }
          }}
          className="w-full"
        >
          Save
        </Button>
      </div>
    </aside>
  )
}

function CometId() {
  const [cometId, update] = useStore((state) => [
    state.api.cometId,
    state.updateAPI,
  ])

  return (
    <Field htmlFor="cometId" label="Comet ID">
      <Input
        className="focus:outline-1 focus:outline-focus focus:ring-0 active:ring-0"
        defaultValue={""}
        value={cometId}
        onChange={(e) => {
          update("cometId", e.target.value)
        }}
        fullwidth
      />
    </Field>
  )
}

function Temprature() {
  const [temperature, update] = useStore((state) => [
    state.config.temperature,
    state.updateConfig,
  ])
  return (
    <Field htmlFor="temperature" label="Temperature">
      <Slider
        value={[temperature]}
        onValueChange={(value) => {
          update("temperature", value[0])
        }}
        max={2}
        min={0}
        step={0.1}
      />
    </Field>
  )
}

function TopP() {
  const [top_p, update] = useStore((state) => [
    state.config.top_p,
    state.updateConfig,
  ])
  return (
    <Field htmlFor="top_p" label="top_p">
      <Slider
        value={[top_p]}
        onValueChange={(value) => {
          update("top_p", value[0])
        }}
        max={2}
        min={0}
        step={0.1}
      />
    </Field>
  )
}

function PresencePenalty() {
  const [presence_penalty, update] = useStore((state) => [
    state.config.presence_penalty,
    state.updateConfig,
  ])
  return (
    <Field htmlFor="presence_penalty" label="Presence Penalty">
      <Slider
        value={[presence_penalty]}
        onValueChange={(value) => {
          update("presence_penalty", value[0])
        }}
        max={2}
        min={0}
        step={0.1}
      />
    </Field>
  )
}

function FrequencePenalty() {
  const [frequency_penalty, update] = useStore((state) => [
    state.config.frequency_penalty,
    state.updateConfig,
  ])
  return (
    <Field htmlFor="frequency_penalty" label="Frequency Penalty">
      <Slider
        value={[frequency_penalty]}
        onValueChange={(value) => {
          update("frequency_penalty", value[0])
        }}
        max={2}
        min={0}
        step={0.1}
      />
    </Field>
  )
}

function MaxTokens() {
  const [max_tokens, update] = useStore((state) => [
    state.config.max_tokens,
    state.updateConfig,
  ])
  return (
    <Field htmlFor="max_tokens" label="Max Tokens">
      <Slider
        value={[max_tokens]}
        onValueChange={(value) => {
          update("max_tokens", value[0])
        }}
        max={1024}
        min={1}
        step={8}
      />
    </Field>
  )
}

function Stream() {
  const [stream, update] = useStore((state) => [
    state.config.stream,
    state.updateConfig,
  ])
  return (
    <Field htmlFor="stream" label="Stream Response">
      <Switch
        checked={stream}
        onCheckedChange={(value) => {
          update("stream", value)
        }}
      />
    </Field>
  )
}
