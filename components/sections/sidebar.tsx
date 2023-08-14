"use client";

import React from "react";
import { useStore } from "@/store/store";
import { useSession } from "next-auth/react";



import { Button } from "../ui/button";
import Field from "../ui/field";
import { Input } from "../ui/input";
import { Slider } from "../ui/slider";
import { Switch } from "../ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Design } from "./design-tab";


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

function CometId() {
  const [cometId, update] = useStore((state) => [
    state.api.cometId,
    state.updateAPI,
  ])

  return (
    <Field htmlFor="cometId" label="Comet ID">
      <Input
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
function Model() {
  const [config, comet, clearComet, createComet] = useStore((state) => [
    state.config,
    state.comet,
    state.clearComet,
    state.createComet,
  ])
  const session = useSession()

  return comet ? (
    <div className="h-[80vh] space-y-4 overflow-y-auto px-4 py-5 pb-10 scrollbar scrollbar-none">
      <Temprature />
      <TopP />
      <PresencePenalty />
      <FrequencePenalty />
      <MaxTokens />
      <Stream />
      <pre>{JSON.stringify(config, undefined, 2)}</pre>
      <Button onClick={clearComet}>Edit API configs.</Button>{" "}
    </div>
  ) : (
    <div className="h-[80vh] space-y-4 overflow-y-auto px-4 py-5 pb-10 scrollbar scrollbar-none">
      <CometId />
      <Button
        onClick={() => {
          try {
            session.status === "authenticated" &&
              createComet(session.data.user.accessToken)
          } catch (e) {
            console.log(e)
          }
        }}
      >
        Use API configs
      </Button>
    </div>
  )
}