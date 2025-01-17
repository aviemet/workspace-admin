import { google } from "googleapis"
import { GoogleCredentials } from "types/google"

export class GoogleAuthClient {
	private oauth2Client

	constructor(credentials: GoogleCredentials) {
		this.oauth2Client = new google.auth.OAuth2(
			credentials.clientId,
			credentials.clientSecret,
			credentials.redirectUri
		)

		if(credentials.refreshToken) {
			this.oauth2Client.setCredentials({
				refresh_token: credentials.refreshToken,
			})
		}
	}

	async getAccessToken(): Promise<string> {
		const { token } = await this.oauth2Client.getAccessToken()
		if(!token) throw new Error("Failed to get access token")
		return token
	}

	getClient() {
		return this.oauth2Client
	}
}
