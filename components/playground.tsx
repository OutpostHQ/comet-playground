"use client";

import { useEffect } from "react"
import { useStore } from "@/store/store"

import Search from "./providers/search-provider"
import Sidebar from "./sections/sidebar"

export default function Playground() {
  const [design, api, comet, mergeConfigs, loadAPIConfigFromLocal] = useStore(
    (state) => [
      state.design,
      state.api,
      state.comet,
      state.mergeConfig,
      state.loadAPIConfigFromLocal,
    ]
  )

  useEffect(() => {
    async function updateConfigState() {
      if (comet) {
        const newConfigs = await comet.getCometInfo().then((data: any) => {
          return {
            stream: data.configs?.stream,
            max_tokens: data.configs?.max_tokens,
            top_p: data.configs?.top_p,
            temperature: data.configs?.temprature,
            presence_penalty: data.configs?.presence_penalty,
            frequency_penalty: data.configs?.frequency_penalty,
          }
        })
        mergeConfigs(newConfigs)
      }
    }
    updateConfigState()
  }, [comet, mergeConfigs])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(loadAPIConfigFromLocal, [])

  return (
    <div>
      <Search
        config={{
          ...design,
          ...api,
        }}
      />
      <Sidebar />
    </div>
  )
}