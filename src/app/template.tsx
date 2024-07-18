"use client";
import { ThemeProvider } from "@/components/ThemeProvider";
import { JetBrains_Mono } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import { useTheme } from "next-themes";
const mainFont = JetBrains_Mono({ subsets: ["latin"] });
export default function RootTemplate({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { theme } = useTheme();

	return (
		<body className={mainFont.className} suppressHydrationWarning>
			<ThemeProvider
				attribute="data-theme"
				storageKey="theme"
				themes={["black", "light"]}
				defaultTheme="black"
				enableSystem
			>
				<Header />
				<div className="flex pt-24">
					<div className="layout">{children}</div>
				</div>
			</ThemeProvider>
			<ToastContainer
				autoClose={5000}
				closeButton={true}
				newestOnTop={true}
				pauseOnHover={true}
				theme={theme === "light" ? "light" : "dark"}
				draggable={true}
			/>
		</body>
	);
}
