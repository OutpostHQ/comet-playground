import { Aperture, User, UserCircle, UserCircle2Icon } from "lucide-react"

import Text from "../ui/text"

export function CometOutput() {
  return (
    <div className="flex w-full flex-1 flex-col bg-default">
      <Text
        variant="displaySmall"
        weight="semibold"
        className="border-b px-5 py-3 text-soft"
      >
        Outpost.AI
      </Text>
      <div className=" h-full  flex-1 overflow-y-auto pb-20  scrollbar-none">
        <div className="messages w-full ">
          <div className="border-b bg-subdued">
            <div className="mx-auto flex max-w-[700px] gap-4 py-5">
              <UserCircle2Icon className="h-5 w-5 shrink-0 text-icon-soft" />
              <Text variant="heading" className="">
                What is react js?
              </Text>
            </div>
          </div>
          <div className=" border-b bg-default">
            <div className="mx-auto flex max-w-[700px] gap-4 py-5">
              <Aperture className="h-5 w-5 shrink-0 text-icon-soft" />
              <Text variant="heading" className=" ">
                eligendi, consequatur cupiditate animi sequi enim, ipsam unde
                incidunt provident dolorum eaque eum optio maxime aspernatur
                harum. Expedita ullam harum iure possimus quo aut? Porro, sunt
                quas. Velit praesentium minima repudiandae, nemo in nam? Dolore
                maiores, aliquam illum expedita pariatur placeat nisi dicta
                optio molestias nihil suscipit quae quaerat unde odio facere
                similique eveniet aperiam quo asperiores.
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
