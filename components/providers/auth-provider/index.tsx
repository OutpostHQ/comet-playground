import { ReactNode } from "react"
import { nextAuthOptions } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"

import AuthProvider from "./provider"

const AuthProviderWrapper = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(nextAuthOptions)

  return <AuthProvider session={session}>{children}</AuthProvider>
}

export default AuthProviderWrapper
