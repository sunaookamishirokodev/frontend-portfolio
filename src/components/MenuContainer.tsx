"use client";
import { MenuState, UserData } from "@/app/template";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useContext } from "react";
import { FaHome } from "react-icons/fa";
import { GiSkills } from "react-icons/gi";
import { GrResources } from "react-icons/gr";
import { MdOutlineArrowCircleRight } from "react-icons/md";
import { IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getDefaultAvatarName, getUserMedia } from "@/functions/User";
import axios from "axios";
import { useToast } from "./ui/use-toast";

const ToggleThemeButton = dynamic(() => import("@/components/ToggleThemeButton"), { ssr: false });

export default function MenuContainer() {
	const { isOpen, setIsOpen } = useContext(MenuState);
	const { user, setUser } = useContext(UserData);
	const pathname = usePathname();
	const { toast } = useToast();

	return (
		<>
			<section
				aria-label="menu"
				className={`fixed bottom-0 right-0 top-0 z-[10000] flex flex-col bg-colors-secondary-200 p-6 transition-transform will-change-transform dark:divide-black dark:bg-colors-primary-200 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
			>
				<div className="flex items-center justify-between gap-2 border-b pb-5 dark:border-b-white/20">
					<div className="flex">
						<ToggleThemeButton />
					</div>
					<MdOutlineArrowCircleRight onClick={() => setIsOpen(false)} className="size-10 cursor-pointer" />
				</div>
				{user ? (
					<Link href={"/profile/@me"} className="my-0.5 mt-2 flex min-w-56 gap-2" tabIndex={-1}>
						{user.avatar ? (
							<Image
								src={getUserMedia(user.avatar)}
								alt={`${user.username} avatar`}
								width={40}
								height={40}
								className="rounded-full"
							/>
						) : (
							<div className="flex size-10 rounded-full bg-[#d9d9d9] dark:bg-[#353535]">
								<span className="m-auto">{getDefaultAvatarName(user.display_name)}</span>
							</div>
						)}
						<div className="flex items-center text-xl">
							<span>{user.display_name}</span>
						</div>
					</Link>
				) : (
					<div className="my-0.5 mt-2 flex gap-2 text-sm">
						<div className="text-white-60">Not logged in yet,</div>
						<Link
							href={`${process.env.NEXT_PUBLIC_SSO_BASE_URL}?redirect_uri=${process.env.NEXT_PUBLIC_BASE_URL}${pathname}`}
							className="cursor-pointer text-black/75 hover:text-black dark:text-white/75 dark:hover:text-white"
						>
							login now!
						</Link>
					</div>
				)}
				<ul className="flex flex-col gap-2 pt-5 text-xl">
					{[
						{ href: "/", label: "Home", icon: FaHome },
						{ href: "/skills", label: "Skills", icon: GiSkills },
						{ href: "/resources", label: "Resources", icon: GrResources },
						...(user ? [{ href: "/settings", label: "Settings", icon: IoSettingsOutline }] : []),
					].map(({ href, label, icon }, index) => {
						const Icon = icon;

						return (
							<li key={index}>
								<Link
									href={href}
									tabIndex={-1}
									className="flex origin-left items-center gap-3 md:transition-transform md:hover:scale-110"
								>
									<Icon />
									<span>{label}</span>
								</Link>
							</li>
						);
					})}
				</ul>
				<button
					tabIndex={-1}
					onClick={async () => {
						try {
							await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/authentication/common/logout`, {
								withCredentials: true,
							});

							setUser(null);
							setIsOpen(false);
							toast({
								title: "Logout successfully",
								variant: "success",
							});
						} catch (error: any) {
							setIsOpen(false);

							toast({
								title: "Something went wrong",
								description: error.response?.data?.msg,
								variant: "destructive",
							});
						}
					}}
					className={`mt-auto flex origin-left items-center gap-3 text-xl md:transition-transform md:hover:scale-110 ${user ? "block" : "hidden"}`}
				>
					<IoLogOutOutline />
					<span>Logout</span>
				</button>
			</section>
			<div
				onClick={() => setIsOpen(false)}
				className={`fixed bottom-0 left-0 right-0 top-0 z-[9999] bg-black/70 ${isOpen ? "block" : "hidden"}`}
			/>
		</>
	);
}
