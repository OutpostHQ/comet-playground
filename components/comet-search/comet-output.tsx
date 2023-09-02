import { Aperture, UserCircle2Icon } from "lucide-react"

import Text from "../ui/text"

export function CometOutput() {
  return (
    <div className="flex w-full flex-1 flex-col overflow-hidden bg-subdued">
      <div className="border-b px-5 py-3 text-headingLg">Outpost.AI</div>
      <div className="h-full flex-1 divide-y overflow-y-scroll pb-20 scrollbar-none  ">
        <CometQuestion />
        <CometReply />
      </div>
    </div>
  )
}

export function CometQuestion() {
  return (
    <div className=" bg-hovered">
      <div className="mx-auto flex max-w-[700px] gap-4 py-5">
        <UserCircle2Icon className="h-5 w-5 shrink-0 text-icon-soft" />
        <Text variant="heading" className="">
          What is react js?
        </Text>
      </div>
    </div>
  )
}

export function CometReply() {
  return (
    <div className="  bg-subdued ">
      <div className="mx-auto flex max-w-[700px] gap-4 py-5">
        <Aperture className="h-5 w-5 shrink-0 text-icon-soft" />
        <Text variant="heading" className=" ">
          eligendi, consequatur cupiditate animi sequi enim, ipsam unde incidunt
          provident dolorum eaque eum optio maxime aspernatur harum. Expedita
          ullam harum iure possimus quo aut? Porro, sunt quas. Velit praesentium
          minima repudiandae, nemo in nam? Dolore maiores, aliquam illum
          expedita pariatur placeat nisi dicta optio molestias nihil suscipit
          quae quaerat unde odio facere similique eveniet aperiam quo
          asperiores.
        </Text>
      </div>
    </div>
  )
}
