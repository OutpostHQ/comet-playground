import { Dispatch, SetStateAction, useCallback, useRef, useState } from "react"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

import { useToast } from "@/components/ui/use-toast"

import { promptInference } from "./promptInference"
import { GlobalInference } from "./search"

dayjs.extend(relativeTime)

export type InferenceSession = {
  sessionId: string
  messages: {
    from: "agent" | "human"
    text: string
    conversationId?: string | null
    latency?: string
    tokens?: number
  }[]
}

export function useInferenceSession(
  configs: any,
  question: string,
  setQuestion: (question: string) => void,
  globalInference: GlobalInference,
  setGlobalInference: Dispatch<SetStateAction<GlobalInference>>
) {
  const [session, setSession] = useState({} as InferenceSession)
  const [isLoading, setIsLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const { toast } = useToast()
  const [streamMessage, setStreamMessage] = useState("")

  const [error, setError] = useState<any>()
  const resetSession = useCallback(() => {
    setSession({} as InferenceSession)
    setIsLoading(false)
    setError("")
    setIsDisabled(false)
    setStreamMessage("")
    // toast({ title: "session has been reset" })
  }, [])

  let controller = useRef<null | AbortController>(null)

  const promptUser = useCallback(
    async function (e: any) {
      e.preventDefault()

      if (!isDisabled) {
        if (question == "") {
          toast({
            title: "Please enter a question",
            variant: "destructive",
          })
          return
        }
        setIsLoading(true)
        setQuestion("")
        setError(undefined)
        setIsDisabled(true)
        const messageSentTime = dayjs(Date.now())
        if (globalInference.infer.inferenceId != undefined) {
          setSession((prev) => {
            return {
              sessionId: prev?.sessionId || "",
              messages: [
                ...(prev?.messages || []),
                {
                  from: "human",
                  text: question,
                  conversationId: "1",
                },
              ],
            }
          })

          try {
            controller.current = new AbortController()
            const signal = controller.current.signal
            console.log(controller, signal)

            const data = await promptInference(
              {
                prompt: question,
              },
              globalInference.details,
              (text: string) => {
                setIsLoading(false)
                setStreamMessage((prev) => prev + text)
              },
              signal
            )

            setSession((prev: any) => {
              setStreamMessage("")
              return {
                ...prev,
                messages: [
                  ...(prev?.messages || []),
                  {
                    from: "agent",
                    text: data,
                    tokens: data.length,
                    latency: dayjs(Date.now()).diff(messageSentTime, "seconds"),
                  },
                ],
              }
            })

            setIsLoading(false)
          } catch (e: any) {
            if (e.message === "comet.prompt is not a function") {
              setError("The Inference ID you have entered is not valid")
            } else {
              setError(e?.message || "Try again.")
              toast({ title: e.message, variant: "destructive" })
            }
            setIsLoading(false)
            setIsDisabled(false)
          }
        } else {
          toast({
            title: "Inference not initialized",
            variant: "destructive",
          })
          setIsLoading(false)
          setError(e.message)
          setIsDisabled(false)
        }
        setIsDisabled(false)
      }
    },
    [toast, isDisabled, question, setQuestion, globalInference]
  )

  const stopGenerating = useCallback(() => {
    console.log(controller)
    if (controller.current) {
      controller.current.abort()
      setIsLoading(false)
      setError("")
      setIsDisabled(false)
      // if (streamMessage.trim() !== "") {
      //   setSession((prev) => {
      //     let stream = streamMessage
      //     return {
      //       ...prev,
      //       sessionId: session?.sessionId || "",
      //       messages: [
      //         ...(prev?.messages || []),
      //         {
      //           from: "agent",
      //           text: stream,
      //           conversationId: "",
      //         },
      //       ],
      //     }
      //   })
      // }
      setStreamMessage("")
    }
  }, [controller])

  return {
    isLoading,
    error,
    session,
    promptUser,
    isDisabled,
    streamMessage,
    resetSession,
    stopGenerating,
  }
}
