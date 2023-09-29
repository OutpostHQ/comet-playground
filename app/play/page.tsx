"use client"

import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react"
import { Checkbox } from "@components/checkbox"
import { Field } from "@components/field"
import { Input } from "@components/input"
import { Popover, PopoverContent, PopoverTrigger } from "@components/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@components/select"
import { Slider } from "@components/slider"
import { Text } from "@components/text"
import { MinusCircle, Paperclip, PlusCircle, Settings } from "lucide-react"
import { v4 as uuidv4 } from "uuid"

import Header from "./_components/header"

export default function Page() {
  const [syncedQuery, setSyncedQuery] = useState("")
  const [statez, setStatez] = useState([
    { id: uuidv4() },
    { id: uuidv4() },
    { id: uuidv4() },
  ])

  const deleteTab = useCallback((id: string) => {
    setStatez((prev) => {
      return prev.filter((i) => i.id !== id)
    })
  }, [])

  const addTab = useCallback(() => {
    setStatez((prev) => [...prev, { id: uuidv4() }])
  }, [])

  return (
    <div className="flex h-screen w-screen flex-col  overflow-hidden">
      <Header />
      <main className="flex w-full flex-1 divide-x">
        {statez.map((i) => (
          <Search
            syncedQuery={syncedQuery}
            setSyncedQuery={setSyncedQuery}
            addTab={addTab}
            deleteTab={deleteTab}
            id={i.id}
            key={i.id}
          />
        ))}
      </main>
    </div>
  )
}

function Search(props: {
  id: string
  deleteTab: (num: string) => void
  addTab: () => void
  syncedQuery: string
  setSyncedQuery: Dispatch<SetStateAction<string>>
}) {
  const { id, deleteTab } = props

  const deleteSelf = useCallback(() => {
    deleteTab(id)
  }, [deleteTab, id])

  const [localQuery, setLocalQuery] = useState(props.syncedQuery)
  const [synced, setSynced] = useState(true)

  const switchSync = useCallback(() => {
    setSynced((prev) => !prev)
  }, [])

  useEffect(() => {
    if (synced) {
      setLocalQuery(props.syncedQuery)
    }
  }, [props.syncedQuery, synced])

  return (
    <div className="flex flex-1 flex-col">
      <SearchHeader addTab={props.addTab} deleteTab={deleteSelf} />
      <div className="flex-1 bg-subdued"></div>
      <div className="border-t p-2 py-8">
        <div className="flex items-end gap-5">
          <Input
            value={localQuery}
            onChange={(e) => {
              if (synced) {
                props.setSyncedQuery(e.target.value)
              } else {
                setLocalQuery(e.target.value)
              }
            }}
          />
          <Field
            className="max-w-max"
            htmlFor="sync"
            label={<Text variant="bodySm">Sync</Text>}
          >
            <Checkbox
              checked={synced}
              onCheckedChange={(prev) => switchSync()}
              className="mr-3"
            />
          </Field>
        </div>
      </div>
    </div>
  )
}

export function SearchConfig() {
  const [values, setValues] = useState({
    max_tokens: 0,
    temperature: 0,
    top_p: 0,
    frequency_penalty: 0,
    presence_penalty: 0,
  })
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className=" block">
          <Settings className="h-5 text-icon-soft" />
        </button>
      </PopoverTrigger>
      <PopoverContent side="left" align="start" className="flex flex-col gap-5">
        <Field
          htmlFor="max_tokens"
          label={<RangeHeader title="Max Tokens" value={values.max_tokens} />}
        >
          <Slider
            value={[values.max_tokens]}
            onValueChange={(v) => {
              // @ts-ignore

              setValues((prev) => ({ ...prev, max_tokens: v }))
            }}
          />
        </Field>
        <Field
          htmlFor="temperature"
          label={<RangeHeader title="Temperature" value={values.temperature} />}
        >
          <Slider
            value={[values.temperature]}
            onValueChange={(v) => {
              // @ts-ignore

              setValues((prev) => ({ ...prev, temperature: v }))
            }}
          />
        </Field>
        <Field
          htmlFor="top_p"
          label={<RangeHeader title="Top P" value={values.top_p} />}
        >
          <Slider
            value={[values.top_p]}
            onValueChange={(v) => {
              // @ts-ignore
              setValues((prev) => ({ ...prev, top_p: v }))
            }}
          />
        </Field>

        <Field
          htmlFor="frequency_penalty"
          label={
            <RangeHeader
              title="Frequency Penalty"
              value={values.frequency_penalty}
            />
          }
        >
          <Slider
            value={[values.frequency_penalty]}
            onValueChange={(v) => {
              // @ts-ignore

              setValues((prev) => ({ ...prev, frequency_penalty: v }))
            }}
          />
        </Field>
        <Field
          htmlFor="presence_penalty"
          label={
            <RangeHeader
              title="Presence Penalty"
              value={values.presence_penalty}
            />
          }
        >
          <Slider
            value={[values.presence_penalty]}
            onValueChange={(v) => {
              // @ts-ignore

              setValues((prev) => ({ ...prev, presence_penalty: v }))
            }}
          />
        </Field>
      </PopoverContent>
    </Popover>
  )
}

function RangeHeader(props: { title: string; value: any }) {
  return (
    <div className="flex items-center justify-between">
      <Text variant="bodySm">{props.title}</Text>
      <Text variant="bodySm">{props.value}</Text>
    </div>
  )
}

export function SearchHeader(props: {
  deleteTab: () => void
  addTab: () => void
}) {
  return (
    <div className="flex items-center gap-2 border-b p-2">
      <Input placeholder="Id" />

      <button
        onClick={() => {
          props.deleteTab()
        }}
        className="block"
      >
        <MinusCircle className="h-4 shrink-0" />
      </button>
      <button
        onClick={() => {
          props.addTab()
        }}
        className="block"
      >
        <PlusCircle className="h-4 shrink-0" />
      </button>
      <SearchConfig />
    </div>
  )
}
