export interface GoogleCredentials {
	clientId: string
	clientSecret: string
	redirectUri: string
	refreshToken?: string
}

export interface OrganizationalUnit {
	id: string
	name: string
	path: string
	parentOrgUnitPath?: string
	description?: string
}