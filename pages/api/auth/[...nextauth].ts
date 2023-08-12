import NextAuth, {
  DefaultSession,
  DefaultUser,
  ISODateString,
  NextAuthOptions,
} from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { OAuthConfig, OAuthUserConfig } from "next-auth/providers/oauth"
import { OAuthProviderType as OPT } from "next-auth/providers/oauth-types"

declare module "next-auth" {
  export interface Session {
    user: { accessToken: string; userId: string } & DefaultSession["user"]
    expires: ISODateString
    loggedIn?: false
  }
  export interface User extends DefaultUser {
    // accessToken: string
    userId: string
  }
}

interface OutpostProfile {
  id: string
  name: string
  email: string
  image: null | string
}

function OutpostProvider(
  options: OAuthUserConfig<OutpostProfile>
): OAuthConfig<OutpostProfile> {
  return {
    id: "outpost",
    name: "outpost",
    type: "oauth",
    authorization: {
      params: { scope: "profile" },
      url: process.env.AUTHORIZATION_URL,
    },
    token: process.env.ACCESSTOKEN_URL,
    userinfo: process.env.USERINFO_URL,
    checks: ["state"],
    profile(profile) {
      return {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        image: profile.image,
        userId: profile.id,
      }
    },
    httpOptions: {
      timeout: 5000,
    },
    options,
  }
}

export const nextAuthOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  // debug: true,
  providers: [
    OutpostProvider({
      clientId: process.env.OUTPOST_CLIENT_ID as string,
      clientSecret: process.env.OUTPOST_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt(data) {
      const { token, user } = data
      if (user) {
        // token.accessToken = user.accessToken
        token.userId = user.userId
      }
      return token
    },

    async session({ token, session }) {
      if (token) {
        Object.assign(session.user, {
          userId: token.userId,
          accessToken: token.accessToken,
        })
      }
      return session
    },
  },
}

export default NextAuth(nextAuthOptions)
