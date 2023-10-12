import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { Button } from "@components/button"
import { Input } from "@components/input"
import { Inference } from "outpostkit"

import { GlobalState } from "../page"
import { SearchHeader } from "./search-header"
import { SearchOutput } from "./search-output"
import { useInferenceSession } from "./useInferenceSession"

export type GlobalInference = {
  infer: Inference
  details: any
}

export function Search(props: {
  id: string
  deleteTab: (num: string) => void
  addTab: () => void
  syncedQuery: string
  setSyncedQuery: Dispatch<SetStateAction<string>>
  globalState: GlobalState
  setGlobalState: Dispatch<SetStateAction<GlobalState>>
}) {
  const { id, deleteTab } = props
  const ref = useRef<null | HTMLDivElement>(null)

  const [localQuery, setLocalQuery] = useState(props.syncedQuery)
  const [synced, setSynced] = useState(false)

  const [configValues, setConfigValues] = useState({
    max_tokens: 16,
    temperature: 1,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
  })

  const [globalInference, setGlobalInference] = useState<GlobalInference>(
    {} as GlobalInference
  )

  const {
    isLoading,
    promptUser,
    stopGenerating,
    session,
    streamMessage,
    resetSession,
    error,
  } = useInferenceSession(
    configValues,
    localQuery,
    props.setSyncedQuery,
    globalInference,
    setGlobalInference
  )

  const deleteSelf = useCallback(() => {
    deleteTab(id)
  }, [deleteTab, id])

  const switchSync = useCallback(() => {
    // setSynced((prev) => !prev)
  }, [])

  useEffect(() => {
    if (synced) {
      setLocalQuery(props.syncedQuery)
    }
  }, [props.syncedQuery, synced])

  useEffect(() => {
    if (ref.current) {
      ref.current.scroll({ behavior: "instant", top: 10000000000 })
    }
  }, [streamMessage, localQuery])

  return (
    <div className="flex min-w-[600px] flex-1 flex-col overflow-x-auto">
      <SearchHeader
        configValues={configValues}
        setConfigValues={setConfigValues}
        addTab={props.addTab}
        deleteTab={deleteSelf}
        globalInference={globalInference}
        setGlobalInference={setGlobalInference}
      />
      <SearchOutput
        ref={ref}
        isLoading={isLoading}
        session={session}
        streamMessage={streamMessage}
        error={error}
        resetSession={resetSession}
        globalState={props.globalState}
        id={id}
      />
      <div className="relative border-t p-2 py-4">
        {isLoading || streamMessage.trim() ? (
          <Button
            onClick={stopGenerating}
            variant="outline"
            // eslint-disable-next-line tailwindcss/enforces-negative-arbitrary-values
            className="absolute -top-[52px] right-4 ml-auto w-full max-w-max bg-default hover:bg-active"
          >
            Stop generating
          </Button>
        ) : null}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (synced) {
              props.globalState.tabs.forEach((i) => {
                i.trigger(e)
              })
            } else {
              promptUser(e)
              setLocalQuery("")
              props.setSyncedQuery("")
            }
          }}
          className="flex gap-4 pr-2"
        >
          <Input
            disabled={isLoading || streamMessage.trim() !== ""}
            className="h-20 p-2 pb-10 scrollbar-none md:pr-28 lg:pr-32"
            value={localQuery}
            onChange={(e) => {
              if (synced) {
                props.setSyncedQuery(e.target.value)
              } else {
                setLocalQuery(e.target.value)
              }
            }}
          />
          {/* <div className="flex flex-col items-center gap-2">
            <Checkbox
              disabled
              checked={synced}
              // onCheckedChange={(prev) => switchSync()}
            />
            <Text variant="bodySm" className="whitespace-nowrap" color="soft">
              Sync chats
            </Text>
          </div> */}
        </form>
      </div>
    </div>
  )
}
