import copy from "clipboard-copy"

export const copyToClipBoard = (text: string) => {
  return copy(text)
}
