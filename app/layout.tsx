import type { Metadata } from "next"
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from "@mantine/core"
import { theme } from "@/theme"

import "@mantine/core/styles.css"

export const metadata: Metadata = {
	title: "Signature App",
	description: "Manage Google Workspace Signatures",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" { ...mantineHtmlProps }>
			<head>
				<ColorSchemeScript />
			</head>
			<body>
				<MantineProvider theme={ theme }>
					{ children }
				</MantineProvider>
			</body>
		</html>
	)
}
