import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import ColorLanguage from "@/functions/ColorLanguage";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { FaCodeFork, FaEye } from "react-icons/fa6";

export default async function Repositories() {
	return (
		<div className="widget col-span-fdivl flex flex-col gap-5 p-0 xl:col-span-2">
			{[
				{
					name: "owo-selfbot",
					image: `/repositories/owo-selfbot.screenshot.jpg`,
				},
				{
					name: "discordbot-template-v14",
					image: `/repositories/discordbot-template-v14.screenshot.jpg`,
				},
				{
					name: "frontend-portfolio",
					image: `/repositories/frontend-portfolio.screenshot.png`,
				},
			].map(({ name, image }, index) => {
				return (
					<Repository
						key={index}
						owner="${process.env.NEXT_PUBLIC_GITHUB_USERNAME}"
						repoName={name}
						image={image}
					/>
				);
			})}
		</div>
	);
}

export async function Repository({ repoName, image }: { owner?: string; repoName: string; image: string }) {
	const res: { data: { data: GithubRepository } } = await axios.get(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/github/repository/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}/${repoName}`,
	);

	if (!res.data) {
		return (
			<div
				role="status"
				className="flex animate-pulse flex-col gap-2 space-y-2.5 rounded-xl bg-white p-2 dark:bg-black"
			>
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
				<div className="flex aspect-video h-full animate-pulse items-center justify-center rounded-lg bg-gray-300 dark:bg-gray-700">
					<svg
						className="h-10 w-10 text-gray-200 dark:text-gray-600"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 16 20"
					>
						<path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
						<path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
					</svg>
					<span className="sr-only">Loading...</span>
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
			</div>
		);
	} else {
		return (
			<CardContainer className="col-span-3">
				<CardBody className="group/card relative h-full w-full rounded-xl bg-gray-50 p-6 dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]">
					<CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark:text-white">
						{res.data.data.full_name}
					</CardItem>
					<CardItem as="p" translateZ="60" className="mt-2 text-sm text-neutral-500 dark:text-neutral-300">
						{res.data.data.description || "No description was found"}
					</CardItem>
					<CardItem translateZ="100" className="mt-4 w-full">
						<ScrollArea className="h-72 rounded-xl">
							<Image
								priority
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
							href={res.data.data.html_url}
							target="_blank"
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
									style={{ backgroundColor: ColorLanguage(res.data.data.language) }}
								/>
								<span>{res.data.data.language}</span>
							</div>
							<ul className="flex gap-4">
								{[
									{ icon: FaStar, amount: res.data.data.stargazers_count },
									{ icon: FaCodeFork, amount: res.data.data.forks_count },
									{ icon: FaEye, amount: res.data.data.watchers_count },
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
		);
	}
}
