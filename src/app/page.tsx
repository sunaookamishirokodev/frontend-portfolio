"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Repository from "../components/Repository";
import ChartLanguage from "./ChartLanguage";
import Clock from "./Clock";
import GithubStats from "./GithubStats";
import Introduction from "./Introduction";
import SocialPlatform from "./SocialFlatform";

export default function RootPage() {
	const [presence, setPresence] = useState<null | Presence>(null);
	const [userStats, setUserStats] = useState<null | GithubStats>(null);

	useEffect(() => {
		axios
			.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/github/stats`)
			.then((res) => setUserStats(res.data))
			.then(console.error);
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
		<main className="flex flex-col gap-32 xl:gap-0">
			<Introduction presence={presence} />
			<div className="flex flex-col gap-2 md:grid md:grid-cols-3 md:gap-6 md:p-4 xl:grid-cols-5 xl:gap-12">
				<SocialPlatform presence={presence} userStats={userStats} />
				<div className="col-span-full flex flex-col gap-2 md:gap-6 xl:col-span-2 xl:gap-12">
					<GithubStats userStats={userStats} />
					<Clock />
				</div>
				<div className="col-span-3">
					<ChartLanguage data={userStats} />
				</div>
				<ul className="widget col-span-full flex flex-col gap-5 xl:col-span-2">
					{["owo-selfbot", "discordbot-template-v14"].map((repoName, index) => {
						return <Repository key={index} owner={userStats?.username} repoName={repoName} />;
					})}
				</ul>
			</div>
		</main>
	);
}
