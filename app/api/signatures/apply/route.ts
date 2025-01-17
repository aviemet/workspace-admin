import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { GoogleAuthClient } from "@/lib/google/auth"
import { AdminDirectoryService } from "@/lib/google/admin"
import { GmailService } from "@/lib/google/gmail"
import { createSignatureManager } from "@/lib/signatures/manager"

export async function POST(req: Request) {
	const session = await getServerSession()
	if(!session) {
		return new NextResponse("Unauthorized", { status: 401 })
	}

	try {
		const { orgUnitPath } = await req.json()

		const authClient = new GoogleAuthClient({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
			refreshToken: session.accessToken as string,
		})

		const adminService = new AdminDirectoryService(authClient)
		const gmailService = new GmailService(authClient)
		const signatureManager = createSignatureManager(adminService, gmailService)

		await signatureManager.applySignatures(orgUnitPath)

		return new NextResponse(null, { status: 204 })
	} catch(error) {
		console.error("Failed to apply signatures:", error)
		return new NextResponse("Internal Server Error", { status: 500 })
	}
}