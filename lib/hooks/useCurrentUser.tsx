import { useSession } from "next-auth/react"

interface UserData {
  name: string
  email: string
  image: null | string
  userId: string
}

export const useCurrentUser = () => {
  const session = useSession()
  return {
    status: session.status,
    user: session.data?.user as UserData | undefined,
  }
}
