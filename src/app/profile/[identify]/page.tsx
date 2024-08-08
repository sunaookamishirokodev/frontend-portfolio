"use client";
import { getDefaultAvatarName, getUserMedia } from "@/functions/User";
import axios from "axios";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SettingsPage({ params: { identify } }: { params: { identify: string } }) {
	const [user, setUser] = useState<HiddenPasswordUser | null | undefined>(undefined);

	useEffect(() => {
		axios
			.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${identify}`, { withCredentials: true })
			.then((res) => setUser(res.data.data))
			.catch((error) => {
				if (error.response.status !== 400) {
					setUser(null);
				}
			});
	}, [identify]);

	if (user === null) {
		return (
			<div className="absolute inset-0 flex h-screen items-center justify-center">
				<div className="flex flex-col items-center">
					<h1 className="text-3xl font-bold text-blue-600 lg:text-6xl">404</h1>

					<h6 className="mb-2 text-center text-2xl font-bold md:text-3xl">
						<span className="text-red-500">Oops!</span> User not found
					</h6>

					<p className="mb-4 text-center text-gray-500 md:text-lg">
						The user you’re searching for doesn’t exist.
					</p>

					<Link href="/" className="group relative h-10 w-40 overflow-hidden rounded-md bg-blue-600">
						<span className="line absolute inset-0 text-center leading-10 transition duration-500 group-hover:translate-x-40">
							Back to home
						</span>
						<div className="absolute inset-0 flex -translate-x-40 items-center justify-center text-white transition duration-500 group-hover:translate-x-0">
							🏘️
						</div>
					</Link>
				</div>
			</div>
		);
	}

	if (!user) {
		return <></>;
	}

	return (
		<main>
			<div className="relative">
				{user?.banner ? (
					<Image
						src={getUserMedia(user.banner)}
						alt="User banner"
						width={0}
						sizes="100vw"
						height={0}
						className="h-[200px] w-full rounded-b-3xl object-cover object-center"
					/>
				) : (
					<div className="h-[200px] w-full rounded-b-3xl bg-black dark:bg-white"></div>
				)}
				<div className="absolute -bottom-[40%] left-[5%] flex items-end gap-5">
					{user?.avatar ? (
						<Image
							src={getUserMedia(user.avatar)}
							alt={`${user.username} avatar`}
							width={0}
							height={0}
							className="size-[150px] rounded-full object-cover object-center"
						/>
					) : (
						<div className="flex size-[150px] rounded-full bg-[#d9d9d9] ring-8 ring-white dark:bg-[#353535] dark:ring-black">
							<span className="m-auto text-7xl">{getDefaultAvatarName(user?.display_name)}</span>
						</div>
					)}
					<div>
						<div className="flex items-center gap-3">
							<span>{user.username}</span>
							<div
								className={`${user.status ? "block" : "hidden"} size-2 rounded-full bg-black dark:bg-white`}
							></div>
							<span>{user.status || ""}</span>
						</div>
						<span className="text-5xl">{user.display_name}</span>
					</div>
				</div>
			</div>
			<div className="mt-40 grid grid-cols-12">
				<div className="col-span-5">
					<div className="widget relative">
						<span className="absolute -top-4 text-2xl">Introduction</span>
						<ul className="mt-5">
							<li className="">
								<span>Join since: </span>
								<span>{format(user.create_at, "dd/MM/yyyy")}</span>
							</li>
							<li className="flex flex-col">
								<span>Biography:</span>
								<span>{user.biography || ""}</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</main>
	);
}
