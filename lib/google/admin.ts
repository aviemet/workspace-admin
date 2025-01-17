import { google } from "googleapis"
import { GoogleAuthClient } from "./auth"
import { OrganizationalUnit, User } from "types/google"

export class AdminDirectoryService {
	private adminClient

	constructor(authClient: GoogleAuthClient) {
		this.adminClient = google.admin({
			version: "directory_v1",
			auth: authClient.getClient(),
		})
	}

	async listUsers(orgUnitPath?: string): Promise<User[]> {
		try {
			const response = await this.adminClient.users.list({
				customer: "my_customer",
				orderBy: "email",
				projection: "full",
				query: orgUnitPath ? `orgUnitPath='${orgUnitPath}'` : undefined,
			})

			return response.data.users || []
		} catch(error) {
			console.error("Error listing users:", error)
			throw new Error("Failed to list users")
		}
	}

	async listOrganizationalUnits(): Promise<OrganizationalUnit[]> {
		try {
			const response = await this.adminClient.orgunits.list({
				customerId: "my_customer",
			})

			return response.data.organizationUnits || []
		} catch(error) {
			console.error("Error listing OUs:", error)
			throw new Error("Failed to list organizational units")
		}
	}
}
