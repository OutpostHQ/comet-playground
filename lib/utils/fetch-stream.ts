export const API_V1_URL: string = "https://api.outpost.run/v1"
export const PROMPT_STREAM_RESPONSE_PREFIX = "----RESPONSE----"
//REMOVE ME WHEN STREAMING IS FIXED
export const streamPromptWithNativeFetch = (
  cometId: string,
  apiKey: string,
  payload: any,
  handleNewText?: (token: string) => void | Promise<void>
) => {
  return new Promise<{ response: string; referencePaths: string[] }>(
    (resolve, reject) => {
      ;(async () => {
        const response = await fetch(`${API_V1_URL}/comets/${cometId}/prompt`, {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
            Accept: "text/plain, application/json",
          },
        })
        if (response.ok) {
          if (!response.body) return reject("No response body found.")
          const reader = response.body.getReader()
          let responsePrefixReceived = false
          let responseText: string = ""
          const textDecoder = new TextDecoder()
          let done: boolean = false,
            value: Uint8Array | undefined
          while (!done) {
            ;({ done, value } = await reader.read())
            if (value) {
              let chunk = textDecoder.decode(value)
              if (
                !responsePrefixReceived &&
                chunk.includes(PROMPT_STREAM_RESPONSE_PREFIX)
              ) {
                const splitChunks = chunk.split(PROMPT_STREAM_RESPONSE_PREFIX)
                if (splitChunks.length === 2) {
                  handleNewText?.(splitChunks[0])
                  responseText = responseText.concat(splitChunks[1] ?? "")
                } else return reject("Could not parse the response")
                responsePrefixReceived = true
              } else if (responsePrefixReceived) {
                responseText = responseText.concat(chunk)
              } else {
                handleNewText?.(chunk)
              }
            }
            if (done) {
              try {
                return resolve(
                  JSON.parse(responseText) as {
                    response: string
                    referencePaths: string[]
                  }
                )
              } catch (e) {
                return reject("Could not parse the response")
              }
            }
          }
        } else {
          return reject(`Request failed.`)
        }
      })()
    }
  )
}
