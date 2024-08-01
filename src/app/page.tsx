"use client";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { io } from "socket.io-client";
import ChartLanguage from "./ChartLanguage";
import Clock from "./Clock";
import GithubStats from "./GithubStats";
import Introduction from "./Introduction";
import SocialPlatform from "./SocialFlatform";
import { toast } from "react-toastify";
import { Person, WithContext } from "schema-dts";
import Globe from "./Globe";
import Repositories from "./Repositories";

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
	sponsor: ["https://buymeacoffee.com/sunaookamishirokodev"],
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
	const [presence, setPresence] = useState<null | Presence>(null);
	const [userStats, setUserStats] = useState<null | GithubStats>(null);

	useEffect(() => {
		axios
			.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/github/stats`)
			.then((res) => setUserStats(res.data.data))
			.catch((error) =>
				toast.error(error.response.data.msg, {
					toastId: "error",
				}),
			);
	}, []);

	useEffect(() => {
		const socket = io("wss://gateway.shirokodev.site/", {
			withCredentials: true,
		});

		socket.emit("getPresence");

		socket.on("updatePresence", (data) => {
			data = JSON.parse(data);
			setPresence(data);
		});

		socket.on("error", (data) => {
			console.log(data);
		});

		return () => {
			socket.disconnect();
		};
	}, []);

	return (
		<>
			<main className="flex flex-col gap-32 xl:gap-10">
				<Introduction presence={presence} />
				<div className="flex flex-col gap-2 md:grid md:grid-cols-3 md:gap-6 md:p-4 xl:grid-cols-5 xl:gap-12">
					<SocialPlatform presence={presence} userStats={userStats} />
					<GithubStats userStats={userStats} />
					<Clock />
					<ChartLanguage data={userStats} />
					<div className="col-span-full mb-10 hidden md:block xl:col-span-3">
						<Globe />
					</div>
					<Repositories userStats={userStats} />
				</div>
			</main>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
		</>
	);
}
