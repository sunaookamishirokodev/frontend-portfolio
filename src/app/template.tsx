"use client";
import { ThemeProvider } from "@/components/ThemeProvider";
import { JetBrains_Mono } from "next/font/google";
import Header from "./Header";
const mainFont = JetBrains_Mono({ subsets: ["latin"], preload: true });

export default function RootTemplate({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<body className={mainFont.className} suppressHydrationWarning>
			<ThemeProvider
				attribute="data-theme"
				storageKey="theme"
				themes={["black", "light"]}
				defaultTheme="system"
				enableSystem
			>
				<Header />
				<div className="flex pt-24">
					<div className="layout">{children}</div>
				</div>
			</ThemeProvider>
		</body>
	);
}
