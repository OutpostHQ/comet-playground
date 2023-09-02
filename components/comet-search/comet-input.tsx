import { Input } from "../ui/input"

export function CometInput() {
  return (
    <div className=" border-t bg-default">
      <div className="mx-auto h-32 max-w-[700px]  px-5 pt-5 ">
        <Input className="text-bodyLg" placeholder="Ask a question" autoFocus />
      </div>
    </div>
  )
}
