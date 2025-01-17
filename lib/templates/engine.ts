import { User } from "types/user"
import { SignatureTemplate, SignatureVariable, TemplateValidationResult } from "types/template"

export class TemplateEngine {
	private static readonly VARIABLE_REGEX = /\{\{\s*([^}]+)\s*\}\}/g
	private static readonly CONDITIONAL_REGEX = /@if\s+([^}]+)\s*\{([^@]+)\s*@endif/g

	static render(template: string, user: User): string {
		// First process conditionals
		let processedTemplate = template.replace(
			this.CONDITIONAL_REGEX,
			(match, condition, content) => {
				const trimmedCondition = condition.trim()
				const value = this.evaluateCondition(trimmedCondition, user)
				return value ? content.trim() : ""
			}
		)

		// Then process variables
		return processedTemplate.replace(
			this.VARIABLE_REGEX,
			(match, variable) => {
				const value = this.getVariableValue(variable.trim(), user)
				return value || ""
			}
		)
	}

	static validateTemplate(content: string): TemplateValidationResult {
		const errors: string[] = []
		const variables: SignatureVariable[] = []
		const seenVariables = new Set<string>()

		// Extract and validate variables
		let match
		while((match = this.VARIABLE_REGEX.exec(content)) !== null) {
			const variablePath = match[1].trim()

			if(!seenVariables.has(variablePath)) {
				seenVariables.add(variablePath)
				variables.push({
					name: variablePath.split(".").pop() || variablePath,
					type: "string",
					path: variablePath,
				})
			}
		}

		// Validate conditionals
		while((match = this.CONDITIONAL_REGEX.exec(content)) !== null) {
			const condition = match[1].trim()
			if(!this.isValidCondition(condition)) {
				errors.push(`Invalid condition: ${condition}`)
			}
		}

		return {
			isValid: errors.length === 0,
			errors,
			variables,
		}
	}

	private static evaluateCondition(condition: string, user: User): boolean {
		const parts = condition.split(".")
		let value: any = user

		for(const part of parts) {
			value = value?.[part]
		}

		return !!value
	}

	private static getVariableValue(path: string, user: User): string | undefined {
		const parts = path.split(".")
		let value: any = user

		for(const part of parts) {
			value = value?.[part]
			if(value === undefined) return undefined
		}

		return value?.toString()
	}

	private static isValidCondition(condition: string): boolean {
		const validPaths = [
			"name",
			"organizations",
			"customSchemas",
			"orgUnitPath",
		]

		const path = condition.split(".")[0]
		return validPaths.includes(path)
	}
}
