import { Dispatch, SetStateAction } from "react"

import { Input } from "../ui/input"

export function CometInput(props: {
  promptUser: any
  question: string
  setQuestion: Dispatch<SetStateAction<string>>
  isDisabled: boolean
}) {
  return (
    <div className=" border-t bg-default shadow-1">
      <form
        onSubmit={props?.promptUser}
        className="mx-auto h-32 max-w-[700px]  pt-5 "
      >
        <Input
          value={props?.question}
          onChange={(e) => props?.setQuestion(e.target.value)}
          className="placeholder:text-default/60 bg-hovered text-bodyLg "
          placeholder="Ask a question"
          autoFocus
        />
      </form>
    </div>
  )
}
