import { Input } from "../ui/input"

export function CometInput() {
  return (
    <div className=" border-t bg-default shadow-1">
      <div className="mx-auto h-32 max-w-[700px]  pt-5 ">
        <Input
          className="placeholder:text-default/60 bg-hovered text-bodyLg "
          placeholder="Ask a question"
          autoFocus
        />
      </div>
    </div>
  )
}
