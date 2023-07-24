import React from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

export default function Sidebar() {
  return (
    <aside className="fixed bottom-6 right-6 top-[calc(var(--header-height)+24px)] w-[var(--sidebar-width)] overflow-hidden rounded-lg border border-border-default bg-surface-default shadow-cp-shadow-0.25">
      <Tabs defaultValue="design">
        <TabsList className="bg-surface-default">
          <TabsTrigger className="px-4 py-2 font-medium" value="design">
            Design
          </TabsTrigger>
          <TabsTrigger className="px-4 py-2 font-medium" value="model">
            Model configurator
          </TabsTrigger>
        </TabsList>
        <TabsContent className="overflow-hidden border-none p-0" value="design">
          <div className="h-[80vh] overflow-y-scroll px-4 py-5 pb-10 scrollbar scrollbar-none">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores
            culpa quae nobis, dignissimos magnam, consequuntur optio itaque
            tenetur ea adipisci porro veniam cumque sint non? Optio temporibus
            deleniti nam eligendi error eveniet quam fugiat, magni ut soluta
            ullam cum quibusdam quia modi beatae? Adipisci eligendi dolore eos
            aspernatur, itaque illum ipsum voluptatum rem ipsam iste
            consequuntur, dolorum enim fugit consectetur. Exercitationem, eaque
            voluptatibus. Cumque ad omnis dolorem ipsam optio quos, officia hic
            reiciendis impedit officiis odit, culpa incidunt porro accusantium
            commodi quia corrupti! Blanditiis aliquam eum repudiandae facilis
            corrupti expedita a harum odio, architecto unde voluptatem
            aspernatur ullam nobis! Fugit. tenetur ea adipisci porro veniam
            cumque sint non? Optio temporibus deleniti nam eligendi error
            eveniet quam fugiat, magni ut soluta ullam cum quibusdam quia modi
            beatae? Adipisci eligendi dolore eos aspernatur, itaque illum ipsum
            voluptatum rem ipsam iste consequuntur, dolorum enim fugit
            consectetur. Exercitationem, eaque voluptatibus. Cumque ad omnis
            dolorem ipsam optio quos, officia hic reiciendis impedit officiis
            odit, culpa incidunt porro accusantium commodi quia corrupti!
            Blanditiis aliquam eum repudiandae facilis corrupti expedita a harum
            odio, architecto unde voluptatem aspernatur ullam nobis! Fugit.
          </div>
        </TabsContent>
        <TabsContent className="overflow-auto border-none p-0" value="model">
          <div className="h-[80vh] overflow-y-auto px-4 py-5 pb-10 scrollbar scrollbar-none">
            two
          </div>
        </TabsContent>
      </Tabs>
    </aside>
  )
}
