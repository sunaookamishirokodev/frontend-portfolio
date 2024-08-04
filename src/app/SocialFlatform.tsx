import Link from "next/link";
import { FaDiscord, FaFacebook, FaGithub } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";

export default function SocialPlatform() {
	return (
		<ul className="widget col-span-full flex flex-col gap-3 lg:col-span-2 2xl:col-span-3">
			{[
				{
					method: "Github",
					url: process.env.NEXT_PUBLIC_GITHUB_URL,
					icon: FaGithub,
					displayName: "Sunaookami Shiroko",
				},
				{
					method: "Facebook",
					url: process.env.NEXT_PUBLIC_FACEBOOK_URL,
					icon: FaFacebook,
					displayName: "Sunaookami Shiroko",
				},
				{
					method: "Discord",
					url: process.env.NEXT_PUBLIC_DISCORD_URL,
					icon: FaDiscord,
					displayName: "Sunaookami Shiroko",
				},
				{
					method: "E-mail (work)",
					url: process.env.NEXT_PUBLIC_EMAIL_ADDRESS,
					icon: MdAlternateEmail,
					displayName: "shiroko@elainateam.io",
				},
				{
					method: "E-mail (personal)",
					url: "mailto:lethanhtrung.trungle@gmail.com",
					icon: MdAlternateEmail,
					displayName: "lethanhtrung.trungle",
				},
			].map(({ displayName, url, method, icon }, index) => {
				const Icon = icon;

				return (
					<li key={index}>
						<Link
							target="blank"
							rel="noopener noreferrer"
							className="flex w-max items-center gap-2 text-sm transition-transform md:text-lg lg:origin-left lg:hover:scale-105"
							tabIndex={-1}
							href={url}
						>
							<Icon className="size-5" /> <span>[ {method} ]</span> <span>{displayName}</span>
						</Link>
					</li>
				);
			})}
		</ul>
	);
}
