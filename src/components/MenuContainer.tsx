"use client";
import { MenuState } from "@/app/template";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useContext } from "react";
import { FaHome } from "react-icons/fa";
import { GiSkills } from "react-icons/gi";
import { GrResources } from "react-icons/gr";
import { MdOutlineArrowCircleRight } from "react-icons/md";

const ToggleThemeButton = dynamic(() => import("@/components/ToggleThemeButton"), { ssr: false });

export default function MenuContainer() {
	const { isOpen, setIsOpen } = useContext(MenuState);
	return (
		<>
			<section
				aria-label="menu"
				className={`fixed bottom-0 right-0 top-0 z-[10000] bg-colors-secondary-200 p-6 transition-transform will-change-transform dark:divide-black dark:bg-colors-primary-200 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
			>
				<ul id="tools" className="flex items-center justify-between gap-2 border-b pb-5 dark:border-b-white/20">
					<div className="flex">
						<ToggleThemeButton />
					</div>
					<MdOutlineArrowCircleRight onClick={() => setIsOpen(false)} className="size-10 cursor-pointer" />
				</ul>
				<div className="my-0.5 flex gap-2 text-sm">
					<div className="text-white-60">Not logged in yet,</div>
					<Link href={"/login"} className="cursor-pointer text-white/75 hover:text-white">
						login now!
					</Link>
				</div>
				<ul className="flex flex-col gap-2 pt-5 text-xl">
					{[
						{ href: "/", label: "Home", icon: FaHome },
						// { href: "/skills", label: "Skills", icon: GiSkills },
						{ href: "/resources", label: "Resources", icon: GrResources },
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
			</section>
			<div
				onClick={() => setIsOpen(false)}
				className={`fixed bottom-0 left-0 right-0 top-0 z-[9999] bg-black/70 ${isOpen ? "block" : "hidden"}`}
			/>
		</>
	);
}
