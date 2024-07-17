"use client";
import ColorLanguage from "@/functions/ColorLanguage";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaCodeFork, FaEye } from "react-icons/fa6";

export default function Repository({ owner = "sunaookamishirokodev", repoName }: { owner?: string; repoName: string }) {
	const [data, setData] = useState<null | GithubRepository>(null);

	useEffect(() => {
		axios
			.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/github/repository/${owner}/${repoName}`)
			.then((res) => setData(res.data));
	}, [owner, repoName]);

	if (!data) {
		return (
			<li role="status" className="flex animate-pulse flex-col gap-2 space-y-2.5 bg-white p-2 dark:bg-black">
				<div className="flex w-full items-center">
					<div className="h-2.5 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
					<div className="ms-2 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
					<div className="ms-2 h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
				</div>
				<div className="flex w-full max-w-[480px] items-center">
					<div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700"></div>
					<div className="ms-2 h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
					<div className="ms-2 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
				</div>
				<div className="flex w-full max-w-[400px] items-center">
					<div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
					<div className="ms-2 h-2.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700"></div>
					<div className="ms-2 h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
				</div>
				<div className="flex w-full max-w-[480px] items-center">
					<div className="ms-2 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700"></div>
					<div className="ms-2 h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
					<div className="ms-2 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
				</div>
				<div className="flex w-full max-w-[440px] items-center">
					<div className="ms-2 h-2.5 w-32 rounded-full bg-gray-300 dark:bg-gray-600"></div>
					<div className="ms-2 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
					<div className="ms-2 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700"></div>
				</div>
				<span className="sr-only">Loading...</span>
			</li>
		);
	} else {
		return (
			<li className="rounded-lg bg-white p-2 md:transition-transform md:hover:scale-105 dark:bg-black">
				<Link target="blank" rel="noopener noreferrer" href={data.html_url} className="flex flex-col gap-2">
					<span className="text-2xl">{data.name}</span>
					<span className="text-md">{data.description || "No description was found"}</span>
					<div className="flex justify-between">
						<ul className="flex gap-4">
							{[
								{ icon: FaStar, amount: data.stargazers_count },
								{ icon: FaCodeFork, amount: data.forks_count },
								{ icon: FaEye, amount: data.watchers_count },
							].map(({ icon, amount }, index) => {
								const Icon = icon;

								return (
									<li key={index} className="flex items-center gap-1">
										<Icon />
										<span className="text-lg">{amount}</span>
									</li>
								);
							})}
						</ul>
						<div className="flex items-center gap-2">
							<div
								className="size-4 rounded-full"
								style={{ backgroundColor: ColorLanguage(data.language) }}
							/>
							<span>{data.language}</span>
						</div>
					</div>
				</Link>
			</li>
		);
	}
}
