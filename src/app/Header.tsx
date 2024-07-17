"use client";
import { ToggleThemeButton } from "@/components/ToggleThemeButton";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaHome } from "react-icons/fa";
import { TbMenuDeep } from "react-icons/tb";
import { GiSkills } from "react-icons/gi";
import { GrResources } from "react-icons/gr";
import { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

	return (
		<section className="fixed z-[99999] flex h-20 w-full justify-between bg-white p-4 dark:bg-black">
			<Link href={"/"} tabIndex={-1} className="flex items-center">
				<div>
					<span className="mr-1">&lt;</span>
					<span>Shir</span>
				</div>
				<Image
					draggable={false}
					loading="eager"
					priority
					src="/shiroko_logo.jpg"
					alt="Shiroko Logo"
					width={0}
					height={0}
					sizes="100vw"
					className="h-2/5 w-auto rounded-full md:h-1/3"
				/>
				<div>
					<span>ko</span>
					<span className="ml-1">&gt;</span>
				</div>
			</Link>
			<label className="input hidden items-center gap-2 rounded-xl border-black/50 focus-within:border-black focus-within:outline-none md:flex dark:border-white/50 focus-within:dark:border-white">
				<input type="text" className="grow" placeholder="Search" />
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 16 16"
					fill="currentColor"
					className="h-4 w-4 opacity-70"
				>
					<path
						fillRule="evenodd"
						d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
						clipRule="evenodd"
					/>
				</svg>
			</label>
			<div className="flex items-center gap-1 md:gap-2">
				<span>&lt;</span>
				<Link
					href={process.env.NEXT_PUBLIC_REPOSITORY_URL as string}
					target="blank"
					rel="noopener noreferrer"
					tabIndex={-1}
				>
					<FaGithub className="size-6 md:size-8" />
				</Link>
				<HiOutlineSearch className="size-6 md:hidden" />
				<ToggleThemeButton />
				<div className="group relative">
					<TbMenuDeep
						className="size-7 cursor-pointer md:size-8"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					/>
					<ul
						className={`${isMenuOpen && "fade-in -translate-x-1/2"} group-hover:fade-in absolute mt-4 flex translate-x-full flex-col gap-1 rounded-lg bg-colors-primary-100 p-4 text-white transition-transform before:absolute before:-top-4 before:left-0 before:block before:h-4 before:w-full group-hover:-translate-x-1/2 dark:bg-colors-secondary-100 dark:text-black`}
					>
						{[
							{ href: "/", label: "Home", icon: FaHome },
							{ href: "/skills", label: "Skills", icon: GiSkills },
							{ href: "/resources", label: "Resources", icon: GrResources },
						].map(({ href, label, icon }, index) => {
							const Icon = icon;

							return (
								<li key={index}>
									<Link
										href={href}
										tabIndex={-1}
										className="flex items-center gap-1 md:transition-transform md:hover:scale-110"
									>
										<Icon />
										<span>{label}</span>
									</Link>
								</li>
							);
						})}
					</ul>
				</div>
				<span>/&gt;</span>
			</div>
		</section>
	);
}
