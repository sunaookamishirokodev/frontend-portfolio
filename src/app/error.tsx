"use client";
import { GrResources } from "react-icons/gr";
import { BiHelpCircle } from "react-icons/bi";
import { TbReload } from "react-icons/tb";
import Link from "next/link";
import { TextRevealCard } from "@/components/ui/text-reveal-card";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	const navigations = [
		{
			icon: GrResources,
			title: "Resources",
			desc: "Source code of this website",
			href: process.env.NEXT_PUBLIC_GITHUB_SOURCE,
			action: "Go to source",
			animationClass: "animate-pulse",
		},
		{
			icon: BiHelpCircle,
			title: "Help",
			desc: "Contact me for help",
			href: process.env.NEXT_PUBLIC_EMAIL_ADDRESS,
			action: "Learn more",
			animationClass: "animate-bounce",
		},
		{
			icon: TbReload,
			title: "Reload",
			desc: "Try reloading the web",
			href: "javascript:location.reload(true)",
			action: "Try reload",
			animationClass: "animate-spin",
		},
	];

	return (
		<main>
			<div className="mx-auto flex items-center justify-start px-4 md:px-8">
				<div className="mx-auto max-w-lg">
					<div className="space-y-3 text-center">
						<TextRevealCard
							text="Error! An error occurred. Please try again later"
							revealText={error.message}
						/>
						<p>Sorry! This page had a problem processing the api from the backend.</p>
					</div>
					<div className="mt-12">
						<ul className="divide-y">
							{navigations.map(({ desc, href, icon, title, action, animationClass }, index) => {
								const Icon = icon;

								return (
									<li key={index} className="flex gap-x-4 py-6">
										<div className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black">
											<Icon className={`size-6 ${animationClass}`} />
										</div>
										<div className="space-y-1">
											<h4 className="text-xl font-semibold">{title}</h4>
											<p>{desc}</p>
											<Link
												href={href}
												className="inline-flex items-center gap-x-1 text-sm font-medium text-black/50 duration-150 hover:gap-2 hover:text-black dark:text-white/50 hover:dark:text-white"
											>
												<span>{action}</span>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 20 20"
													fill="currentColor"
													className="h-5 w-5"
												>
													<path
														fillRule="evenodd"
														d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
														clipRule="evenodd"
													/>
												</svg>
											</Link>
										</div>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</div>
		</main>
	);
}
