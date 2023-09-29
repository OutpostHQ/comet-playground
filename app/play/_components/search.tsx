import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { useStore } from "@/store/store"
import { Checkbox } from "@components/checkbox"
import { Input } from "@components/input"
import { Text } from "@components/text"
import { Comet } from "outpostkit"

import { useCometSession } from "@/lib/hooks/useCometSession"

import { GlobalState } from "../page"
import { SearchHeader } from "./search-header"
import { SearchOutput } from "./search-output"

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

  const [comet] = useStore((store) => [store.comet])
  const [localQuery, setLocalQuery] = useState(props.syncedQuery)
  const [synced, setSynced] = useState(false)

  const [configValues, setConfigValues] = useState({
    max_tokens: 0,
    temperature: 0,
    top_p: 0,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
  })

  const { isLoading, promptUser, session, streamMessage, resetSession, error } =
    useCometSession(
      comet as Comet,
      configValues,
      localQuery,
      props.setSyncedQuery
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

  useEffect(() => {
    const newTabs = props.globalState.tabs.map((i) => ({
      ...i,
      trigger: (e: any) => {
        promptUser(e)
      },
    }))

    props.setGlobalState((prev) => {
      return { ...prev, tabs: newTabs }
    })
  }, [])

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <SearchHeader
        configValues={configValues}
        setConfigValues={setConfigValues}
        addTab={props.addTab}
        deleteTab={deleteSelf}
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
      <div className="border-t p-2 py-8">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (synced) {
              props.globalState.tabs.forEach((i) => {
                i.trigger(e)
              })
            } else {
              promptUser(e)
            }
          }}
          className="flex gap-4 pr-2"
        >
          <Input
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
