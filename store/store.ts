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
  }

  config: {
    max_tokens: number
    top_p: number
    temperature: number
    presence_penalty: number
    frequency_penalty: number
  }

  updateDesign: (key: keyof State["design"], value: string | number) => void
  updateConfig: (key: keyof State["config"], value: string | number) => void
}

export const useStore = create<State>()((set) => ({
  design: {
    theme: "light",
    containerWidth: 615,
    textSize: "medium",
    borderRadius: 8,
    dontKnowMessage: "I don't know",
    referenceMessage: "Reference",
    AIPlaceholder: "Search...",
  },

  config: {
    max_tokens: 1024,
    top_p: 1,
    temperature: 1,
    presence_penalty: 0,
    frequency_penalty: 0,
  },

  updateDesign: (key, value) =>
    set((state) => ({
      ...state,
      design: {
        ...state.design,
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
}))
