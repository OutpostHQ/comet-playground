import { Comet } from "outpostkit"
import { create } from "zustand"

type State = {
  design: {
    theme: "light" | "dark"
    containerWidth: number
    AIPlaceholder: string
    textSize: "small" | "medium" | "large"
    borderRadius: number
    dontKnowMessage: string
    referenceMessage: string
    includeBranding: boolean
  }

  config: {
    max_tokens: number
    top_p: number
    temperature: number
    presence_penalty: number
    frequency_penalty: number
    stream: boolean
  }
  api: {
    cometId: string
    key: string
  }
  comet: Comet | undefined

  mergeConfig: (new_configs: Partial<State["config"]>) => void
  updateAPI: (key: keyof State["api"], value: string) => void
  updateDesign: (key: keyof State["design"], value: string | number) => void
  updateConfig: (
    key: keyof State["config"],
    value: string | number | boolean
  ) => void
  clearComet: () => void
  createComet: () => void
  loadAPIConfigFromLocal: () => void
}

export const useStore = create<State>()((set) => ({
  design: {
    theme: "light",
    containerWidth: 615,
    textSize: "medium",
    borderRadius: 8,
    dontKnowMessage: "I don't know",
    referenceMessage: "Answer generated from the following pages",
    AIPlaceholder: "Search...",
    includeBranding: false,
  },

  config: {
    max_tokens: 1024,
    top_p: 1,
    temperature: 1,
    presence_penalty: 0,
    frequency_penalty: 0,
    stream: false,
  },
  api: {
    cometId: "",
    key: "",
  },
  comet: undefined,

  updateDesign: (key, value) =>
    set((state) => ({
      ...state,
      design: {
        ...state.design,
        [key]: value,
      },
    })),
  loadAPIConfigFromLocal: () => {
    const localAPIKey = localStorage.getItem("apiKey")
    const localCometId = localStorage.getItem("cometId")
    if (localAPIKey && localCometId) {
      set((state) => ({
        ...state,
        api: {
          cometId: localCometId,
          key: localAPIKey,
        },
        comet: new Comet(localAPIKey, localCometId),
      }))
    }
  },
  updateAPI: (key, value) =>
    set((state) => ({
      ...state,
      api: {
        ...state.api,
        [key]: value,
      },
    })),
  updateConfig: (key, value) =>
    set((state) => ({
      ...state,
      config: {
        ...state.config,
        [key]: value,
      },
    })),
  mergeConfig: (new_configs) =>
    set((state) => ({
      ...state,
      config: {
        ...state.config,
        ...new_configs,
      },
    })),
  clearComet: () => {
    set((state) => ({
      ...state,
      comet: undefined,
    }))
    localStorage.removeItem("apiKey")
    localStorage.removeItem("cometId")
  },
  createComet: () => {
    set((state) => {
      localStorage.setItem("apiKey", state.api.key)
      localStorage.setItem("cometId", state.api.cometId)
      return {
        ...state,
        comet: new Comet(state.api.key, state.api.cometId),
      }
    })
  },
}))
