import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignatureTemplate } from "@/types/template"
import { Button, TextInput, MultiSelect } from "@mantine/core"

interface TemplateFormProps {
	template?: SignatureTemplate
	onSubmit: (data: Partial<SignatureTemplate>) => Promise<void>
	organizationalUnits: string[]
}

export function TemplateForm({ template, onSubmit, organizationalUnits }: TemplateFormProps) {
	const form = useForm<Partial<SignatureTemplate>>({
		defaultValues: template || {
			name: "",
			content: "",
			ouFilter: [],
			isDefault: false,
		},
	})

	return (
		<form onSubmit={ form.handleSubmit(onSubmit) } className="space-y-6">
			<div className="space-y-4">
				<TextInput
					label="Template Name"
					{ ...form.register("name") }
					error={ form.formState.errors.name?.message }
				/>

				<div className="space-y-2">
					<label className="text-sm font-medium">Content</label>
					<textarea
						{ ...form.register("content") }
						className="min-h-[200px] w-full rounded-md border p-2"
					/>
					{ form.formState.errors.content && (
						<p className="text-sm text-red-500">{ form.formState.errors.content.message }</p>
					) }
				</div>

				<MultiSelect
					label="Organizational Units"
					data={ organizationalUnits.map(ou => ({ label: ou, value: ou })) }
					{ ...form.register("ouFilter") }
				/>

				<label className="flex items-center space-x-2">
					<input
						type="checkbox"
						{ ...form.register("isDefault") }
						className="rounded border-gray-300"
					/>
					<span className="text-sm">Set as default template</span>
				</label>
			</div>

			<Button type="submit">
				{ template ? "Update Template" : "Create Template" }
			</Button>
		</form>
	)
}
