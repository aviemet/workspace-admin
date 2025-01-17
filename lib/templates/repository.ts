import { SignatureTemplate } from "types/template"
import { PrismaClient } from "@prisma/client"

export class TemplateRepository {
	private prisma: PrismaClient

	constructor() {
		this.prisma = new PrismaClient()
	}

	async create(template: Omit<SignatureTemplate, "id" | "createdAt" | "updatedAt">): Promise<SignatureTemplate> {
		return this.prisma.signatureTemplate.create({
			data: {
				...template,
				variables: template.variables || [],
				ouFilter: template.ouFilter || [],
			},
		})
	}

	async update(id: string, template: Partial<SignatureTemplate>): Promise<SignatureTemplate> {
		return this.prisma.signatureTemplate.update({
			where: { id },
			data: template,
		})
	}

	async delete(id: string): Promise<void> {
		await this.prisma.signatureTemplate.delete({
			where: { id },
		})
	}

	async findById(id: string): Promise<SignatureTemplate | null> {
		return this.prisma.signatureTemplate.findUnique({
			where: { id },
		})
	}

	async findAll(): Promise<SignatureTemplate[]> {
		return this.prisma.signatureTemplate.findMany({
			orderBy: { name: "asc" },
		})
	}

	async findByOrgUnit(orgUnitPath: string): Promise<SignatureTemplate[]> {
		return this.prisma.signatureTemplate.findMany({
			where: {
				OR: [
					{ ouFilter: { hasEvery: [orgUnitPath] } },
					{ ouFilter: { isEmpty: true } },
				],
			},
			orderBy: { name: "asc" },
		})
	}
}
