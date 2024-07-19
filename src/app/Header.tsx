"use client";
import Image from "next/image";
import Link from "next/link";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { TbMenuDeep } from "react-icons/tb";
import { MenuState } from "./template";

export default function Header() {
	const { isOpen, setIsOpen } = useContext(MenuState);

	return (
		<section className="fixed z-50 flex h-20 w-full justify-between bg-white p-4 dark:bg-black">
			<Link href={"/"} tabIndex={-1} className="flex items-center md:text-2xl xl:text-3xl">
				<span>Shir</span>
				<Image
					draggable={false}
					loading="eager"
					priority
					src="/shiroko_logo.jpg"
					alt="Shiroko Logo"
					width={0}
					height={0}
					sizes="100vw"
					className="h-2/5 w-auto rounded-full md:h-2/3"
				/>
				<span>ko</span>
			</Link>
			{/* <label className="input hidden items-center gap-2 rounded-xl border-black/50 focus-within:border-black focus-within:outline-none md:flex dark:border-white/50 focus-within:dark:border-white">
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
			</label> */}
			<div className="flex items-center">
				<TbMenuDeep className="size-7 cursor-pointer md:size-10" onClick={() => setIsOpen(!isOpen)} />
			</div>
		</section>
	);
}
