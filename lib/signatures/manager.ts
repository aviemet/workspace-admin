// lib/signatures/manager.ts
import { User } from "types/user"
import { SignatureTemplate } from "types/template"
import { AdminDirectoryService } from "lib/google/admin"
import { GmailService } from "lib/google/gmail"
import { TemplateEngine } from "lib/templates/engine"
import { TemplateRepository } from "lib/templates/repository"

export class SignatureManager {
	constructor(
		private adminService: AdminDirectoryService,
		private gmailService: GmailService,
		private templateRepo: TemplateRepository
	) {}

	async applySignatures(orgUnitPath?: string): Promise<void> {
		const users = await this.adminService.listUsers(orgUnitPath)
		const errors: Error[] = []

		for(const user of users) {
			try {
				await this.applyUserSignature(user)
			} catch(error) {
				errors.push(new Error(`Failed to update signature for ${user.primaryEmail}: ${error.message}`))
			}
		}

		if(errors.length > 0) {
			throw new AggregateError(errors, "Failed to update some signatures")
		}
	}

	private async applyUserSignature(user: User): Promise<void> {
		const templates = await this.templateRepo.findByOrgUnit(user.orgUnitPath)

		// Find the first matching template or default template
		const template = templates.find(t => !t.ouFilter?.length) || templates.find(t => t.isDefault)

		if(!template) {
			throw new Error("No matching template found")
		}

		const signature = TemplateEngine.render(template.content, user)
		await this.gmailService.updateSignature(user.primaryEmail, signature)
	}

	async previewSignature(templateId: string, user: User): Promise<string> {
		const template = await this.templateRepo.findById(templateId)
		if(!template) {
			throw new Error("Template not found")
		}

		return TemplateEngine.render(template.content, user)
	}

	async validateTemplate(template: SignatureTemplate): Promise<boolean> {
		const validation = TemplateEngine.validateTemplate(template.content)
		return validation.isValid
	}
}

// Create a singleton instance for dependency injection
export const createSignatureManager = (
	adminService: AdminDirectoryService,
	gmailService: GmailService
) => {
	const templateRepo = new TemplateRepository()
	return new SignatureManager(adminService, gmailService, templateRepo)
}
