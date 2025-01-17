"use client"

import { useEffect, useState } from "react"
import { SignatureTemplate } from "@/types/template"
import { Button } from "@mantine/core"
import Link from "next/link"

export default function TemplatesPage() {
	const [templates, setTemplates] = useState<SignatureTemplate[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetchTemplates()
	}, [])

	const fetchTemplates = async () => {
		try {
			const response = await fetch("/api/templates")
			const data = await response.json()
			setTemplates(data)
		} catch(error) {
			console.error("Failed to fetch templates:", error)
		} finally {
			setLoading(false)
		}
	}

	const handleDelete = async (id: string) => {
		if(!confirm("Are you sure you want to delete this template?")) return

		try {
			await fetch(`/api/templates/${id}`, { method: "DELETE" })
			await fetchTemplates()
		} catch(error) {
			console.error("Failed to delete template:", error)
		}
	}

	if(loading) {
		return <div>Loading...</div>
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Signature Templates</h1>
				<Link href="/templates/new">
					<Button>Create Template</Button>
				</Link>
			</div>

			<div className="grid gap-4">
				{ templates.map((template) => (
					<div
						key={ template.id }
						className="border rounded-lg p-4 flex justify-between items-start"
					>
						<div>
							<h3 className="font-semibold mb-2">{ template.name }</h3>
							<p className="text-sm text-gray-600 mb-2">
								{ template.description || "No description" }
							</p>
							{ template.isDefault && (
								<span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
									Default Template
								</span>
							) }
						</div>
						<div className="space-x-2">
							<Link href={ `/templates/${template.id}` }>
								<Button variant="outline" size="sm">
									Edit
								</Button>
							</Link>
							<Button
								variant="destructive"
								size="sm"
								onClick={ () => handleDelete(template.id) }
							>
								Delete
							</Button>
						</div>
					</div>
				)) }

				{ templates.length === 0 && (
					<p className="text-center text-gray-600 py-8">
						No templates found. Create your first template to get started.
					</p>
				) }
			</div>
		</div>
	)
}
