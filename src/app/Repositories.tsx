import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import ColorLanguage from "@/functions/ColorLanguage";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { FaCodeFork, FaEye } from "react-icons/fa6";
import { instance } from "./actions";

export default async function Repositories() {
	return (
		<div className="widget col-span-full grid w-full grid-cols-1 gap-5 lg:grid-cols-2 xl:col-span-1 xl:grid-cols-1 2xl:col-span-2">
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
				return <Repository key={index} repoName={name} image={image} />;
			})}
		</div>
	);
}

export async function Repository({ repoName, image }: { repoName: string; image: string }) {
	const res: { data: { data: GithubRepository } } = await instance.get(
		`/github/repository/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}/${repoName}`,
	);

	return (
		<CardContainer>
			<CardBody className="group/card relative h-full rounded-xl bg-gray-50 p-6 dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]">
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
