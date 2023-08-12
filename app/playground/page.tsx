import React from "react"
import { nextAuthOptions } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"

import Playground from "@/components/playground"

export default async function Page() {
  const session = await getServerSession(nextAuthOptions)

  return (
    <div className="grid min-h-screen place-items-center">
      <Playground />
    </div>
  )
}
