export const config = {
	google: {
		scopes: [
			"https://www.googleapis.com/auth/admin.directory.user.readonly",
			"https://www.googleapis.com/auth/gmail.settings.basic",
		],
	},
	template: {
		maxLength: 10000,
		maxVariables: 50,
	},
}