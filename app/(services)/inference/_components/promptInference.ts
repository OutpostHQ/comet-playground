import {
  streamGenericInferenceServer,
  streamOpenAIInferenceServer,
} from "outpostkit"

export const promptInference = async (
  configs: { prompt: string } & Record<string, string>,
  {
    model,
    domain,
    entrypointType,
  }: {
    model: string
    domain: string
    entrypointType: "openai" | "generic"
  },
  handleNewChunk: (chunk: string) => void | Promise<void>,
  signal: AbortSignal | undefined
) => {
  let response: string = ""
  if (entrypointType === "openai") {
    await streamOpenAIInferenceServer(
      { prompt: configs.prompt, max_tokens: 500, model },
      domain,
      "text",
      (chunk) => {
        const parsed = JSON.parse(chunk) as { choices: { text: string }[] }
        console.log(parsed)
        const text = parsed.choices[0].text
        response += text
        handleNewChunk(text)
      },
      signal
    ).then((res) => {
      console.log(res)
    })
  } else {
    await streamGenericInferenceServer(
      domain,

      { prompt: configs.prompt, max_tokens: 500 },

      (chunk) => {
        const parsed = JSON.parse(chunk) as { text: string[] }
        const text = parsed.text[0]
        response += text
        handleNewChunk(text)
      },
      signal
    ).then((res) => {
      console.log(res)
    })
  }
  return response
}
