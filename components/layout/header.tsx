import { Button } from "@mantine/core"
import { useRouter } from "next/router"

export function Header() {
	const router = useRouter()

	return (
		<header className="border-b">
			<div className="container mx-auto flex h-16 items-center justify-between px-4">
				<h1 className="text-lg font-semibold">Signature Manager</h1>
				<nav className="space-x-4">
					<Button
						variant="ghost"
						onClick={ () => router.push("/templates") }
						className={ router.pathname === "/templates" ? "bg-accent" : "" }
					>
						Templates
					</Button>
					<Button
						variant="ghost"
						onClick={ () => router.push("/users") }
						className={ router.pathname === "/users" ? "bg-accent" : "" }
					>
						Users
					</Button>
				</nav>
			</div>
		</header>
	)
}
