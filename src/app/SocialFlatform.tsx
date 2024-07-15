import HoverButton from "@/classes/HoverButton";

import Link from "next/link";

import { FaDiscord, FaFacebook, FaGithub } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";

export default function SocialPlatform({
	presence,
	userStats,
}: {
	presence: Presence | null;
	userStats: GithubStats | null;
}) {
	return (
		<>
			{[
				{
					method: "Github",
					url: userStats?.userPage || (process.env.NEXT_PUBLIC_GITHUB_URL as string),
					icon: FaGithub,
					displayName: userStats?.userDisplayName || "Sunaookami Shiroko",
				},
				{
					method: "Facebook",
					url: process.env.NEXT_PUBLIC_FACEBOOK_URL as string,
					icon: FaFacebook,
					displayName: "Trung Lê (Shiroko)",
				},
				{
					method: presence?.user.displayName ?? "Discord",
					url: process.env.NEXT_PUBLIC_DISCORD_URL as string,
					icon: FaDiscord,
					displayName: "Shiroko",
				},
			].map(({ displayName, url, method, icon }, index) => {
				const Icon = icon;

				return (
					<Link
						target="blank"
						ref={(ref) => {
							if (!ref) return;
							if (window.innerWidth < 768) return;
							new HoverButton(ref);
						}}
						rel="noopener noreferrer"
						href={url}
						tabIndex={-1}
						key={index}
						className="widget flex h-full flex-col gap-3 md:aspect-square"
					>
						<div className="flex items-center gap-3">
							<Icon className="size-12" /> <span className="text-2xl">{method}</span>
						</div>
						<div>{displayName}</div>
					</Link>
				);
			})}

			<div className="col-span-full flex flex-col gap-2 md:gap-6 xl:col-span-2 xl:gap-12">
				{[
					{
						method: "E-mail (work)",
						url: process.env.NEXT_PUBLIC_EMAIL_ADDRESS as string,
						icon: MdAlternateEmail,
						displayName: "shiroko@elainateam.io",
					},
					{
						method: "E-mail (personal)",
						url: "mailto:lethanhtrung.trungle@gmail.com",
						icon: MdAlternateEmail,
						displayName: "lethanhtrung.trungle@gmail.com",
					},
				].map(({ displayName, icon, method, url }, index) => {
					const Icon = icon;

					return (
						<Link
							rel="noopener noreferrer"
							href={url}
							tabIndex={-1}
							key={index}
							className="widget flex h-full items-center gap-3"
						>
							<Icon className="size-12" />
							<div className="flex flex-col">
								<span className="text-2xl">{method}</span>
								<span>{displayName}</span>
							</div>
						</Link>
					);
				})}
			</div>
		</>
	);
}
