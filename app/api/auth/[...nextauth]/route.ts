import { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"

const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
			authorization: {
				params: {
					scope: "https://www.googleapis.com/auth/admin.directory.user.readonly https://www.googleapis.com/auth/gmail.settings.basic",
				},
			},
		}),
	],
	callbacks: {
		async jwt({ token, account }) {
			if(account) {
				token.accessToken = account.access_token
				token.refreshToken = account.refresh_token
			}
			return token
		},
		async session({ session, token }) {
			session.accessToken = token.accessToken
			return session
		},
	},
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }