import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { GoogleAuthClient } from "@/lib/google/auth"
import { AdminDirectoryService } from "@/lib/google/admin"

export async function GET() {
	const session = await getServerSession()
	if(!session) {
		return new NextResponse("Unauthorized", { status: 401 })
	}

	try {
		const authClient = new GoogleAuthClient({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
			refreshToken: session.accessToken as string,
		})

		const adminService = new AdminDirectoryService(authClient)
		const ous = await adminService.listOrganizationalUnits()

		return NextResponse.json(ous.map(ou => ou.path))
	} catch(error) {
		console.error("Failed to fetch OUs:", error)
		return new NextResponse("Internal Server Error", { status: 500 })
	}
}