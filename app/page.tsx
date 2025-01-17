import Link from "next/link"
import { Button } from "@mantine/core"

const Home = () => {
	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-4xl font-bold mb-8">Google Workspace Signature Manager</h1>
			<div className="grid gap-6 md:grid-cols-2">
				<div className="p-6 border rounded-lg">
					<h2 className="text-2xl font-semibold mb-4">Templates</h2>
					<p className="text-gray-600 mb-4">
						Create and manage signature templates with variables and conditional content.
					</p>
					<Link href="/templates">
						<Button>Manage Templates</Button>
					</Link>
				</div>
				<div className="p-6 border rounded-lg">
					<h2 className="text-2xl font-semibold mb-4">Users</h2>
					<p className="text-gray-600 mb-4">
						View users and their current signatures, apply templates by organizational unit.
					</p>
					<Link href="/users">
						<Button>Manage Users</Button>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Home
