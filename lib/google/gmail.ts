import { google } from "googleapis"
import { GoogleAuthClient } from "./auth"

export class GmailService {
	private gmailClient

	constructor(authClient: GoogleAuthClient) {
		this.gmailClient = google.gmail({
			version: "v1",
			auth: authClient.getClient(),
		})
	}

	async updateSignature(userId: string, signature: string): Promise<void> {
		try {
			const response = await this.gmailClient.users.settings.sendAs.list({
				userId: userId,
			})

			const primaryAlias = response.data.sendAs?.find(
				alias => alias.isPrimary
			)

			if(!primaryAlias) {
				throw new Error("No primary alias found")
			}

			await this.gmailClient.users.settings.sendAs.patch({
				userId: userId,
				sendAsEmail: primaryAlias.sendAsEmail,
				requestBody: {
					signature: signature,
				},
			})
		} catch(error) {
			console.error("Error updating signature:", error)
			throw new Error("Failed to update signature")
		}
	}

	async getSignature(userId: string): Promise<string | null> {
		try {
			const response = await this.gmailClient.users.settings.sendAs.list({
				userId: userId,
			})

			const primaryAlias = response.data.sendAs?.find(
				alias => alias.isPrimary
			)

			return primaryAlias?.signature || null
		} catch(error) {
			console.error("Error getting signature:", error)
			throw new Error("Failed to get signature")
		}
	}
}
