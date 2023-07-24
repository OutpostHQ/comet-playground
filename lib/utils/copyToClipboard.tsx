import copy from "clipboard-copy"

export const copyToClipBoard = (text: string) => {
  console.log(text)
  return copy(text)
}
