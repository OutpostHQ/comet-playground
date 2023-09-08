import { useCallback, useState } from "react"
import { Comet } from "outpostkit"

import { useToast } from "@/components/ui/use-toast"

type Session = {
  sessionId: string
  messages: {
    from: "agent" | "human"
    text: string
    conversationId?: string | null
  }[]
}

export function useCometSession(
  comet: Comet,
  configs: any,
  userName: string | undefined,
  question: string,
  setQuestion: (question: string) => void
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

        if (comet) {
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
            const data = (await comet.prompt(
              {
                configs,
                stream,
                input: question,
                visitorId: userName || "anonymous",
                channel: "playground",
                ...(session?.sessionId
                  ? { sessionId: session?.sessionId }
                  : {}),
              },
              stream
                ? (text: string) => {
                    setIsLoading(false)
                    if (text !== "----END----") {
                      setStreamMessage((prev) => prev + text)
                    } else {
                      toast({
                        title: "Response ended abruptly",
                      })
                    }
                  }
                : undefined
            )) as {
              text: string
              conversationId: string
              sessionId: string
              usage: {
                completion_tokens: number
                prompt_tokens: number
              }
            }

            setSession((prev) => {
              setStreamMessage("")
              return {
                ...prev,
                sessionId: data?.sessionId || "",
                messages: [
                  ...(prev?.messages || []),
                  {
                    from: "agent",
                    text: data?.text,
                    conversationId: data?.conversationId,
                  },
                ],
              }
            })
            setIsLoading(false)
          } catch (e: any) {
            if (e.message === "comet.prompt is not a function") {
              setError("The Comet ID you have entered is not valid")
            } else {
              setError(e?.message || "Try again.")
              toast({ title: e.message, variant: "destructive" })
            }
            setIsLoading(false)
            setIsDisabled(false)
          }
        } else {
          toast({
            title: "Comet not initialized",
            variant: "destructive",
          })
          setIsLoading(false)
          setError(e.message)
          setIsDisabled(false)
        }
        setIsDisabled(false)
      }
    },
    [
      comet,
      configs,
      toast,
      session,
      isDisabled,
      userName,
      question,
      setQuestion,
    ]
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
