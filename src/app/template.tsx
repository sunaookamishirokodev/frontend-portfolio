"use client";
import { ThemeProvider } from "@/components/ThemeProvider";
import { useTheme } from "next-themes";
import { JetBrains_Mono } from "next/font/google";
import { ToastContainer } from "react-toastify";
import Header from "./Header";
import MenuContainer from "@/components/MenuContainer";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import ScrollToTop from "react-scroll-to-top";
import Image from "next/image";
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
			<ScrollToTop
				smooth
				viewBox="0 0 24 24"
				title="Scroll to top"
				className="rounded-full fill-black dark:fill-white"
				component={
					<Image
						height={0}
						width={0}
						src={"/shiroko_logo_circle.png"}
						alt="Shiroko Logo Circle"
						sizes="100vw"
						className="h-auto w-full"
					/>
				}
			/>
		</body>
	);
}
