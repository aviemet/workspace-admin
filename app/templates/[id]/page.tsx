"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { SignatureTemplate } from "@/types/template"
import { TemplateForm } from "@/components/forms/template-form"

export default function EditTemplatePage() {
	const params = useParams()
	const router = useRouter()
	const [template, setTemplate] = useState<SignatureTemplate | null>(null)
	const [organizationalUnits, setOrganizationalUnits] = useState<string[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		Promise.all([
			fetch(`/api/templates/${params.id}`).then((r) => r.json()),
			fetch("/api/organizational-units").then((r) => r.json()),
		]).then(([templateData, ousData]) => {
			setTemplate(templateData)
			setOrganizationalUnits(ousData)
			setLoading(false)
		})
	}, [params.id])

	const handleSubmit = async (data: Partial<SignatureTemplate>) => {
		try {
			await fetch(`/api/templates/${params.id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			})
			router.push("/templates")
		} catch(error) {
			console.error("Failed to update template:", error)
		}
	}

	if(loading) {
		return <div>Loading...</div>
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-2xl font-bold mb-6">Edit Template</h1>
			{ template && (
				<TemplateForm
					template={ template }
					onSubmit={ handleSubmit }
					organizationalUnits={ organizationalUnits }
				/>
			) }
		</div>
	)
}