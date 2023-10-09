"use client"

import React, { useCallback, useState } from "react"
import { v4 as uuidv4 } from "uuid"

import Header from "./_components/header"
import { Search } from "./_components/search"

export type GlobalState = {
  tabs: {
    id: string
    sync: boolean
    trigger: any
  }[]
}

const defaultState = {
  tabs: [
    {
      id: uuidv4(),
      sync: true,
      trigger: () => {},
    },
    {
      id: uuidv4(),
      sync: true,
      trigger: () => {},
    },
  ],
}
export default function Page() {
  const [syncedQuery, setSyncedQuery] = useState("")
  const [globalState, setGlobalState] = useState<GlobalState>(defaultState)

  const deleteTab = useCallback(
    (id: string) => {
      if (globalState.tabs.length > 1) {
        setGlobalState((prev) => {
          const newTabs = prev.tabs.filter((i) => i.id !== id)
          return { ...prev, tabs: newTabs }
        })
      }
    },
    [globalState.tabs.length]
  )

  const addTab = useCallback(() => {
    if (globalState.tabs.length === 4) {
      return
    }

    setGlobalState((prev) => ({
      ...prev,
      tabs: [
        ...prev.tabs,
        {
          id: uuidv4(),
          sync: true,
          trigger: () => {},
        },
      ],
    }))
  }, [globalState.tabs.length])

  return (
    <div className="flex h-screen w-screen flex-col  overflow-hidden">
      <Header />
      <main className="flex w-full flex-1 divide-x overflow-hidden">
        {globalState.tabs.map((i) => (
          <Search
            syncedQuery={syncedQuery}
            setSyncedQuery={setSyncedQuery}
            addTab={addTab}
            deleteTab={deleteTab}
            id={i.id}
            key={i.id}
            globalState={globalState}
            setGlobalState={setGlobalState}
          />
        ))}
      </main>
    </div>
  )
}
