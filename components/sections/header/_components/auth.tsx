"use client"

import { useCallback } from "react"
import { signIn, signOut } from "next-auth/react"

import { useCurrentUser } from "@/lib/hooks/useCurrentUser"
import { Button } from "@/components/ui/button"
import Text from "@/components/ui/text"

export const AuthComponent = () => {
  const { status } = useCurrentUser()

  if (status === "authenticated") return <OutpostLogoutButton />
  if (status === "unauthenticated") return <OutpostLoginButton />

  return <Text>Loading...</Text>
}

export const OutpostLoginButton = () => {
  const handleSignIn = useCallback(() => {
    signIn("outpost")
      .then((data) => console.log("Signin Success", data))
      .catch((err) => console.error("Signin failed", err))
  }, [])

  return (
    <Button className="flex h-9 gap-2 py-2" onClick={handleSignIn}>
      <span className=" bg-white h-5 w-5 rounded-full border"></span>
      <span>Login with outpost</span>
    </Button>
  )
}

export const OutpostLogoutButton = () => {
  const handleSignOut = useCallback(() => {
    signOut()
  }, [])

  return (
    <Button className="flex h-9 gap-2 py-2" onClick={handleSignOut}>
      <span className=" bg-white h-5 w-5 rounded-full border"></span>
      <span>Signout</span>
    </Button>
  )
}
