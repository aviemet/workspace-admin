export interface SignatureTemplate {
	id: string
	name: string
	content: string
	description?: string
	ouFilter?: string[]
	variables?: string[]
	isDefault?: boolean
	createdAt: Date
	updatedAt: Date
}

export interface SignatureVariable {
	name: string
	type: "string" | "boolean" | "number"
	path: string
	description?: string
	defaultValue?: string
}

export interface TemplateValidationResult {
	isValid: boolean
	errors: string[]
	variables: SignatureVariable[]
}