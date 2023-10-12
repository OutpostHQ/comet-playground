import { useCallback, useRef, useState } from "react"
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
    setIsLoading(false)
    setError("")
    setIsDisabled(false)
    setStreamMessage("")
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
            controller.current = new AbortController()
            const signal = controller.current.signal
            console.log(controller, signal)
            const data = await comet.prompt(
              {
                stream: true,
                input: question,
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
                : undefined,
              { signal }
            )

            setSession((prev) => {
              setStreamMessage("")
              return {
                ...prev,
                sessionId: data?.sessionId || "",
                messages: [
                  ...(prev?.messages || []),
                  {
                    from: "agent",
                    text: data?.generations[0],
                    conversationId: data?.conversationId,
                  },
                ],
              }
            })
            setIsLoading(false)
          } catch (e: any) {
            if (controller.current?.signal.aborted === false) {
              if (e.message === "comet.prompt is not a function") {
                toast({ title: "The Comet ID you have entered is not valid" })
                resetSession()
              } else {
                setError(e?.message || "Try again.")
                toast({ title: e.message, variant: "destructive" })
              }
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
      question,
      setQuestion,
      resetSession,
    ]
  )

  const stopGenerating = useCallback(() => {
    console.log(controller)
    if (controller.current) {
      controller.current.abort()
      setIsLoading(false)
      setError("")
      setIsDisabled(false)

      if (streamMessage.trim() !== "") {
        setSession((prev) => {
          let stream = streamMessage
          setStreamMessage("")
          return {
            ...prev,
            sessionId: session?.sessionId || "",
            messages: [
              ...(prev?.messages || []),
              {
                from: "agent",
                text: stream,
                conversationId: "",
              },
            ],
          }
        })
      }
    }
  }, [controller, session?.sessionId, streamMessage])

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
