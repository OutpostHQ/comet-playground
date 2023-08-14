import { Comet } from "outpostkit";
import { create } from "zustand";





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
  }
  comet: Comet | undefined
  error: string | undefined

  mergeConfig: (new_configs: Partial<State["config"]>) => void
  updateAPI: (key: keyof State["api"], value: string) => void
  updateDesign: (key: keyof State["design"], value: string | number) => void
  updateConfig: (
    key: keyof State["config"],
    value: string | number | boolean
  ) => void
  clearComet: () => void
  createComet: (accessToken: string) => void
  clearError: () => void
  setError: (e: string) => void
  loadAPIConfigFromLocal: (accessToken: string) => void
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
  },
  error: undefined,
  comet: undefined,

  updateDesign: (key, value) =>
    set((state) => ({
      ...state,
      design: {
        ...state.design,
        [key]: value,
      },
    })),
  loadAPIConfigFromLocal: async (accessToken: string) => {
    if (typeof window === undefined)
      throw new Error("Cannot load on the server")

    const localCometId = localStorage.getItem("cometId")
    if (localCometId) {
      set((state) => ({
        ...state,
        api: {
          cometId: localCometId,
        },
        comet: new Comet(accessToken, localCometId),
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
    localStorage.removeItem("cometId")
  },
  clearError: () => {
    set((state) => ({
      ...state,
      error: undefined,
    }))
  },
  setError: (e: string) => {
    set((state) => ({
      ...state,
      error: e,
    }))
  },
  createComet: (accessToken: string) => {
    set((state) => {
      if (!state.api.cometId) throw new Error("Invalid Comet ID")
      localStorage.setItem("cometId", state.api.cometId)
      return {
        ...state,
        comet: new Comet(accessToken, state.api.cometId),
      }
    })
  },
}))