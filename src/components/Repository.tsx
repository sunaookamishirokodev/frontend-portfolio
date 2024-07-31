"use client";
import ColorLanguage from "@/functions/ColorLanguage";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaCodeFork, FaEye } from "react-icons/fa6";
import { toast } from "react-toastify";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { ScrollArea } from "./ui/scroll-area";

export default function Repository({
	owner = "sunaookamishirokodev",
	repoName,
	image,
}: {
	owner?: string;
	repoName: string;
	image: string;
}) {
	const [data, setData] = useState<null | GithubRepository>(null);

	useEffect(() => {
		axios
			.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/github/repository/${owner}/${repoName}`)
			.then((res) => setData(res.data.data))
			.catch((error) =>
				toast.error(error.response.data.msg, {
					toastId: "error",
				}),
			);
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
			<CardContainer className="">
				<CardBody className="group/card relative h-auto w-auto rounded-xl bg-gray-50 p-6 dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]">
					<CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark:text-white">
						{data.full_name}
					</CardItem>
					<CardItem
						as="p"
						translateZ="60"
						className="mt-2 max-w-sm text-sm text-neutral-500 dark:text-neutral-300"
					>
						{data.description || "No description was found"}
					</CardItem>
					<CardItem translateZ="100" className="mt-4 w-full">
						<ScrollArea className="h-72 rounded-xl">
							<Image
								src={image}
								width={0}
								height={0}
								sizes="100vw"
								className="w-full object-cover group-hover/card:shadow-xl"
								alt="thumbnail"
							/>
						</ScrollArea>
					</CardItem>
					<div className="mt-4 flex items-center justify-between">
						<CardItem
							translateZ={20}
							as={Link}
							href={data.html_url}
							target="__blank"
							className="rounded-xl px-4 py-2 text-sm font-normal dark:text-white"
							rel="noopener noreferrer"
						>
							Repository →
						</CardItem>
						<CardItem
							translateZ={20}
							as="button"
							className="flex items-center gap-2 rounded-xl bg-black px-4 py-2 text-xs font-bold text-white dark:bg-white dark:text-black"
						>
							<div className="flex items-center gap-2">
								<div
									className="size-4 rounded-full"
									style={{ backgroundColor: ColorLanguage(data.language) }}
								/>
								<span>{data.language}</span>
							</div>
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
											<span>{amount}</span>
										</li>
									);
								})}
							</ul>
						</CardItem>
					</div>
				</CardBody>
			</CardContainer>
			// <li className="rounded-lg bg-white p-4 md:transition-transform md:hover:scale-105 dark:bg-black">
			// 	<Link target="blank" rel="noopener noreferrer" href={data.html_url} className="flex flex-col gap-2">
			// 		<span className="text-2xl">{data.name}</span>
			// 		<span className="text-md">{data.description || "No description was found"}</span>
			// 		<Image
			// 			src={image}
			// 			alt="Screen shot"
			// 			width={0}
			// 			height={0}
			// 			className="h-auto w-full rounded-lg"
			// 			sizes="100vw"
			// 		/>
			// 		<div className="flex justify-between">
			// 			<ul className="flex gap-4">
			// 				{[
			// 					{ icon: FaStar, amount: data.stargazers_count },
			// 					{ icon: FaCodeFork, amount: data.forks_count },
			// 					{ icon: FaEye, amount: data.watchers_count },
			// 				].map(({ icon, amount }, index) => {
			// 					const Icon = icon;

			// 					return (
			// 						<li key={index} className="flex items-center gap-1">
			// 							<Icon />
			// 							<span className="text-lg">{amount}</span>
			// 						</li>
			// 					);
			// 				})}
			// 			</ul>
			// 			<div className="flex items-center gap-2">
			// 				<div
			// 					className="size-4 rounded-full"
			// 					style={{ backgroundColor: ColorLanguage(data.language) }}
			// 				/>
			// 				<span>{data.language}</span>
			// 			</div>
			// 		</div>
			// 	</Link>
			// </li>
		);
	}
}
