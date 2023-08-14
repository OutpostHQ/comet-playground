import { useSession } from "next-auth/react"

export const useAccessToken = () => {
  const session = useSession()

  return session?.data?.user?.accessToken as string
}
