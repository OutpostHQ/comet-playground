import { create } from "zustand"

type State = {
  theme: "light" | "dark"
  containerWidth: number
  AIPlaceholder: string
  textSize: "small" | "medium" | "large"
  borderRadius: number
  dontKnowMessage: string
  referenceMessage: string
}

type Action = {
  setTheme: (theme: "light" | "dark") => void
  setContainerWidth: (width: number) => void
  setTextSize: (size: "small" | "medium" | "large") => void
  setBorderRadius: (radius: number) => void
  setDontKnowMessage: (message: string) => void
  setReferenceMessage: (message: string) => void
  setAIPlaceholder: (message: string) => void
}

export const useDesignStore = create<State & Action>()((set) => ({
  theme: "light",
  containerWidth: 400,
  textSize: "medium",
  borderRadius: 8,
  dontKnowMessage: "I don't know",
  referenceMessage: "Reference",
  setTheme: (theme) => set({ theme }),
  setContainerWidth: (containerWidth) => set({ containerWidth }),
  setTextSize: (textSize) => set({ textSize }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setDontKnowMessage: (dontKnowMessage) => set({ dontKnowMessage }),
  setReferenceMessage: (referenceMessage) => set({ referenceMessage }),
  AIPlaceholder: "Search...",
  setAIPlaceholder: (AIPlaceholder) => set({ AIPlaceholder }),
}))
