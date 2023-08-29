"use client"

import { useEffect } from "react"
import { useStore } from "@/store/store"
import { useSession } from "next-auth/react"

import Search from "./providers/search-provider"
import Sidebar from "./sections/sidebar"

export default function Playground() {
  const [design, api, comet, mergeConfigs, loadAPIConfigFromLocal, clearComet] =
    useStore((state) => [
      state.design,
      state.api,
      state.comet,
      state.mergeConfig,
      state.loadAPIConfigFromLocal,
      state.clearComet,
    ])
  const session = useSession()

  useEffect(() => {
    async function updateConfigState() {
      try {
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
      } catch (e) {
        console.error(e)
        clearComet()
      }
    }
    updateConfigState()
  }, [comet, mergeConfigs, clearComet])

  useEffect(() => {
    if (session.status === "authenticated") {
      loadAPIConfigFromLocal(session.data.user.accessToken)
    }
  }, [session, loadAPIConfigFromLocal])

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
