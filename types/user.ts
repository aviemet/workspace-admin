export interface User {
	id: string
	primaryEmail: string
	name: {
		givenName: string
		familyName: string
		fullName: string
	}
	organizations?: Array<{
		title?: string
		department?: string
		phones?: Array<{
			type: string
			value: string
		}>
	}>
	orgUnitPath: string
	customSchemas?: {
		[key: string]: any
	}
}