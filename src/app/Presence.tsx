"use client";

import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { FaFacebook, FaDiscord } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import Link from "next/link";

export default function Presence({ presence }: { presence: Presence | null }) {
	return (
		<div className="-mx-4 flex gap-5 rounded-md bg-colors-secondary-200 p-4 md:mx-0 dark:bg-colors-primary-200">
			{presence ? (
				<>
					<div className="relative w-1/3 md:w-[calc(100%/5.65)] xl:w-[calc(100%/6.65)]">
						<Image
							unoptimized
							src={
								presence.activity?.assets?.largeImage
									? presence.activity.assets.largeImage + "?size=4096"
									: "/shiroko_large_image_fallback.gif"
							}
							alt={presence.activity?.assets?.largeText ?? "Shiroko Large Image"}
							title={presence.activity?.assets?.largeText ?? "Shiroko Large Image"}
							width={0}
							height={0}
							sizes="100vw"
							className="w-full rounded"
						/>
						<Image
							unoptimized
							src={
								presence.activity?.assets?.smallImage
									? `${presence.activity.assets.smallImage}?size=4096`
									: "/shiroko_small_image_fallback.jpg"
							}
							alt={presence.activity?.assets?.smallText ?? "Shiroko Small Image"}
							title={presence.activity?.assets?.largeText ?? "Shiroko Small Image"}
							width={40}
							height={40}
							sizes="100vw"
							className="absolute -bottom-[10px] -right-[10px] aspect-square rounded-full"
						/>
					</div>
					<div className="flex flex-col gap-1">
						<span className="text-xs lg:text-2xl xl:text-3xl">
							{presence.activity?.name ?? "There are no activities going on"}
						</span>
						<span className="text-xs lg:text-lg xl:text-xl">{presence.activity?.state}</span>
						<span className="text-xs lg:text-lg xl:text-xl">
							{presence.activity?.details ?? "If you need help, please contact me now!"}
						</span>
						<span className="text-base md:text-lg">
							{presence.activity?.timestamps?.start ? (
								`Elapsed: ${formatDistanceToNow(presence.activity.timestamps.start)}`
							) : (
								<ul className="flex gap-3">
									<span>Contact method:</span>
									{[
										{
											title: "Facebook",
											href: process.env.NEXT_PUBLIC_FACEBOOK_URL,
											icon: FaFacebook,
										},
										{
											title: "Discord",
											href: process.env.NEXT_PUBLIC_DISCORD_URL,
											icon: FaDiscord,
										},
										{
											title: "Email",
											href: process.env.NEXT_PUBLIC_EMAIL_ADDRESS,
											icon: MdAlternateEmail,
										},
									].map(({ title, href, icon }, index) => {
										const Icon = icon;

										return (
											<li className="text-lg lg:text-3xl" key={index} title={title}>
												<Link
													href={href}
													tabIndex={-1}
													target="blank"
													rel="noopener noreferrer"
												>
													<Icon />
												</Link>
											</li>
										);
									})}
								</ul>
							)}
						</span>
					</div>
				</>
			) : (
				"No activity yet!"
			)}
		</div>
	);
}
