import { Dispatch, SetStateAction, useCallback, useState } from "react"

import { useToast } from "@/components/ui/use-toast"

import { promptInference } from "./promptInference"
import { GlobalInference } from "./search"

type Session = {
  sessionId: string
  messages: {
    from: "agent" | "human"
    text: string
    conversationId?: string | null
  }[]
}

export function useInferenceSession(
  configs: any,
  question: string,
  setQuestion: (question: string) => void,
  globalInference: GlobalInference,
  setGlobalInference: Dispatch<SetStateAction<GlobalInference>>
) {
  const [session, setSession] = useState({} as Session)
  const [isLoading, setIsLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const { toast } = useToast()
  const [streamMessage, setStreamMessage] = useState("")

  const [error, setError] = useState<any>()

  const resetSession = useCallback(() => {
    setSession({} as Session)
    // toast({ title: "session has been reset" })
  }, [])

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

        if (globalInference.infer.inferenceId != undefined) {
          const stream = configs.stream
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
            const data = await promptInference(
              {
                prompt: question,
              },
              globalInference.details,
              (text: string) => {
                setIsLoading(false)
                setStreamMessage((prev) => prev + text)
              }
            )

            setSession((prev) => {
              setStreamMessage("")
              return {
                ...prev,
                messages: [
                  ...(prev?.messages || []),
                  {
                    from: "agent",
                    text: data,
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
    [configs, toast, isDisabled, question, setQuestion, globalInference]
  )

  return {
    isLoading,
    error,
    session,
    promptUser,
    isDisabled,
    streamMessage,
    resetSession,
  }
}
