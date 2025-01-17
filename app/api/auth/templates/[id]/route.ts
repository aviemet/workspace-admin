import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { TemplateRepository } from "@/lib/templates/repository"

const templateRepo = new TemplateRepository()

export async function GET(
	req: Request,
	{ params }: { params: { id: string } }
) {
	const session = await getServerSession()
	if(!session) {
		return new NextResponse("Unauthorized", { status: 401 })
	}

	try {
		const template = await templateRepo.findById(params.id)
		if(!template) {
			return new NextResponse("Not Found", { status: 404 })
		}
		return NextResponse.json(template)
	} catch(error) {
		console.error("Failed to fetch template:", error)
		return new NextResponse("Internal Server Error", { status: 500 })
	}
}

export async function PUT(
	req: Request,
	{ params }: { params: { id: string } }
) {
	const session = await getServerSession()
	if(!session) {
		return new NextResponse("Unauthorized", { status: 401 })
	}

	try {
		const data = await req.json()
		const template = await templateRepo.update(params.id, data)
		return NextResponse.json(template)
	} catch(error) {
		console.error("Failed to update template:", error)
		return new NextResponse("Internal Server Error", { status: 500 })
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { id: string } }
) {
	const session = await getServerSession()
	if(!session) {
		return new NextResponse("Unauthorized", { status: 401 })
	}

	try {
		await templateRepo.delete(params.id)
		return new NextResponse(null, { status: 204 })
	} catch(error) {
		console.error("Failed to delete template:", error)
		return new NextResponse("Internal Server Error", { status: 500 })
	}
}