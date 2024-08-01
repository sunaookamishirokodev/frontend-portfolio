"use client";
import { ThemeProvider } from "@/components/ThemeProvider";
import { useTheme } from "next-themes";
import { JetBrains_Mono } from "next/font/google";
import { ToastContainer } from "react-toastify";
import Header from "./Header";
import MenuContainer from "@/components/MenuContainer";
import { createContext, Dispatch, SetStateAction, useState } from "react";
export const MenuState = createContext<{ isOpen: boolean; setIsOpen: Dispatch<SetStateAction<boolean>> }>({
	isOpen: false,
	setIsOpen: () => false,
});
const mainFont = JetBrains_Mono({ subsets: ["latin"] });

export default function RootTemplate({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { theme } = useTheme();
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<body className={mainFont.className} suppressHydrationWarning>
			<ThemeProvider attribute="data-theme" storageKey="theme" themes={["black", "light"]} defaultTheme="black">
				<MenuState.Provider value={{ isOpen, setIsOpen }}>
					<Header />
					<div className="flex pt-24">
						<div className="layout">{children}</div>
					</div>
					<ToastContainer
						position="top-right"
						autoClose={5000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						theme={theme === "black" ? "light" : "dark"}
					/>
					<MenuContainer />
				</MenuState.Provider>
			</ThemeProvider>
		</body>
	);
}
