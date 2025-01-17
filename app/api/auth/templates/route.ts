import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { TemplateRepository } from "@/lib/templates/repository"

const templateRepo = new TemplateRepository()

export async function GET() {
	const session = await getServerSession()
	if(!session) {
		return new NextResponse("Unauthorized", { status: 401 })
	}

	try {
		const templates = await templateRepo.findAll()
		return NextResponse.json(templates)
	} catch(error) {
		console.error("Failed to fetch templates:", error)
		return new NextResponse("Internal Server Error", { status: 500 })
	}
}

export async function POST(req: Request) {
	const session = await getServerSession()
	if(!session) {
		return new NextResponse("Unauthorized", { status: 401 })
	}

	try {
		const data = await req.json()
		const template = await templateRepo.create(data)
		return NextResponse.json(template)
	} catch(error) {
		console.error("Failed to create template:", error)
		return new NextResponse("Internal Server Error", { status: 500 })
	}
}
