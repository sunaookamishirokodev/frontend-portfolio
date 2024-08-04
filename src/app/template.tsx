"use client";
import MenuContainer from "@/components/MenuContainer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { JetBrains_Mono } from "next/font/google";
import Image from "next/image";
import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import ScrollToTop from "react-scroll-to-top";
import Header from "./Header";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { ToastAction } from "@radix-ui/react-toast";
export const MenuState = createContext<{ isOpen: boolean; setIsOpen: Dispatch<SetStateAction<boolean>> }>({
	isOpen: false,
	setIsOpen: () => false,
});

export const UserData = createContext<{
	user: HiddenPasswordUser | null;
	setUser: Dispatch<SetStateAction<HiddenPasswordUser | null>>;
}>({
	user: null,
	setUser: () => null,
});
const mainFont = JetBrains_Mono({ subsets: ["latin"] });

export default function RootTemplate({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [user, setUser] = useState<HiddenPasswordUser | null>(null);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const { toast } = useToast();

	useEffect(() => {
		axios
			.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/@me`, { withCredentials: true })
			.then((res) => {
				console.log(res.data.data);
				setUser(res.data.data);
			})
			.catch((error) => {
				if (error.response.status !== 401) {
					toast({
						title: "Something went wrong",
						description: error.response?.data?.msg,
						action: (
							<ToastAction onClick={() => location.reload()} altText="Reload">
								Reload
							</ToastAction>
						),
						variant: "destructive",
					});
				}
			});
	}, [toast]);

	return (
		<body className={mainFont.className} suppressHydrationWarning>
			<ThemeProvider attribute="data-theme" storageKey="theme" themes={["black", "light"]} defaultTheme="black">
				<UserData.Provider value={{ user, setUser }}>
					<MenuState.Provider value={{ isOpen, setIsOpen }}>
						<Header />
						<div className="flex pt-24">
							<div className="layout">{children}</div>
						</div>
						<Toaster />
						<MenuContainer />
					</MenuState.Provider>
				</UserData.Provider>
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
