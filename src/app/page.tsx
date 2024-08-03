import { Person, WithContext } from "schema-dts";
import ChartLanguage from "./ChartLanguage";
import Clock from "./Clock";
import GithubStats from "./GithubStats";
import Globe from "./Globe";
import { InfiniteMovingCard } from "./InfiniteMovingCard";
import Introduction from "./Introduction";
import Repositories from "./Repositories";
import SocialPlatform from "./SocialFlatform";

const jsonLd: WithContext<Person> = {
	"@context": "https://schema.org",
	"@type": "Person",
	additionalName: ["Sunaookami Shiroko", "Lira", "KayD"],
	name: "Lê Thành Trung",
	birthDate: "09-09-2007",
	birthPlace: "Viet Nam",
	email: "shiroko@elainateam.io",
	gender: "male",
	jobTitle: ["Developer", "Fullstack Developer"],
	sponsor: ["https://buymeacoffee.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}"],
	affiliation: ["Elaina Team"],
	alumniOf: ["Phuoc Long 1 Primary School", "Vo Thi Sau Secondary School"],
	award: [
		"Champion of the The UEH Dancing Robot Contest And Closing Of The “STEM Teaching” Training Course For Teachers And High School Students In Khanh Hoa Province In 2023",
	],
	colleague: ["Misono Mika", "Peter Tuan Anh"],
	knowsLanguage: ["Vietnamese", "English"],
	address: "Viet Nam",
	memberOf: ["Elaina Team"],
	description:
		"Hello everyone, I'm Shiroko - a normal student who likes to code, watch anime, play games and communicate with people. So you can hire me to code your website, portfolio, economy, advertising website but not 18+ or illegal. Furthermore, I am the administrator of Elaina Team - a new technology team in Vietnam and I am really happy if I can be of any help to you. Thanks for reading, have a great day!",
	image: process.env.NEXT_PUBLIC_BASE_URL + "/shiroko_seo.jpg",
	url: process.env.NEXT_PUBLIC_BASE_URL,
	sameAs: [
		process.env.NEXT_PUBLIC_FACEBOOK_URL,
		process.env.NEXT_PUBLIC_GITHUB_URL,
		process.env.NEXT_PUBLIC_DISCORD_URL,
	],
};

export default function RootPage() {
	return (
		<>
			<main className="flex flex-col gap-32 xl:gap-10">
				<Introduction />
				<div className="flex flex-col gap-2 md:grid md:grid-cols-3 md:gap-6 md:p-4 xl:grid-cols-5 xl:gap-12">
					<SocialPlatform />
					<GithubStats />
					<Clock />
					<ChartLanguage />
					<InfiniteMovingCard />
					<Globe />
					<Repositories />
				</div>
			</main>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
		</>
	);
}
