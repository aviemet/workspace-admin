"use client"

import { useEffect, useState } from "react"
import { User } from "@/types/user"
import { SignatureTemplate } from "@/types/template"
import { Button, Select } from "@mantine/core"

export default function UsersPage() {
	const [users, setUsers] = useState<User[]>([])
	const [templates, setTemplates] = useState<SignatureTemplate[]>([])
	const [organizationalUnits, setOrganizationalUnits] = useState<string[]>([])
	const [selectedOU, setSelectedOU] = useState<string>("")
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		Promise.all([
			fetch("/api/users").then((r) => r.json()),
			fetch("/api/templates").then((r) => r.json()),
			fetch("/api/organizational-units").then((r) => r.json()),
		]).then(([usersData, templatesData, ousData]) => {
			setUsers(usersData)
			setTemplates(templatesData)
			setOrganizationalUnits(ousData)
			setLoading(false)
		})
	}, [])

	const applySignatures = async () => {
		try {
			await fetch("/api/signatures/apply", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ orgUnitPath: selectedOU }),
			})
			// Refresh user list
			const response = await fetch("/api/users")
			const data = await response.json()
			setUsers(data)
		} catch(error) {
			console.error("Failed to apply signatures:", error)
		}
	}

	if(loading) {
		return <div>Loading...</div>
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="mb-6">
				<h1 className="text-2xl font-bold mb-4">User Signatures</h1>
				<div className="flex gap-4 items-center">
					<Select
						value={ selectedOU }
						onChange={ (e) => setSelectedOU(e.target.value) }
						className="w-64"
					>
						<option value="">All Organizational Units</option>
						{ organizationalUnits.map((ou) => (
							<option key={ ou } value={ ou }>
								{ ou }
							</option>
						)) }
					</Select>
					<Button onClick={ applySignatures }>
						Apply Signatures
					</Button>
				</div>
			</div>

			<div className="grid gap-4">
				{ users.map((user) => (
					<div
						key={ user.primaryEmail }
						className="border rounded-lg p-4"
					>
						<div className="flex justify-between items-start mb-2">
							<div>
								<h3 className="font-semibold">{ user.name.fullName }</h3>
								<p className="text-sm text-gray-600">{ user.primaryEmail }</p>
							</div>
							<span className="text-sm bg-gray-100 px-2 py-1 rounded">
								{ user.orgUnitPath }
							</span>
						</div>
						<div className="text-sm text-gray-600">
							{ user.organizations?.[0]?.title && (
								<p>Title: { user.organizations[0].title }</p>
							) }
							{ user.organizations?.[0]?.department && (
								<p>Department: { user.organizations[0].department }</p>
							) }
						</div>
					</div>
				)) }
			</div>
		</div>
	)
}