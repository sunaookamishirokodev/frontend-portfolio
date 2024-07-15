"use client";

import dynamic from "next/dynamic";

const RadialBar = dynamic(() => import("@ant-design/plots").then((mod) => mod.RadialBar), { ssr: false });

export default function ChartLanguage({ data }: { data: GithubStats | null }) {
	if (!data) {
		return (
			<div
				role="status"
				className="col-span-3 flex h-full w-full animate-pulse items-center justify-center rounded-lg bg-gray-300 dark:bg-gray-700"
			>
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
		);
	} else {
		const result: { language: string; score: number; type: string }[] = [];
		Object.keys(data.languageStatistics).forEach((key) => {
			result.push({ language: key, score: data.languageStatistics[key], type: "Language used" });
		});

		Object.keys(data.languageRepositories).forEach((key) => {
			result.push({
				language: key,
				score: data.languageRepositories[key],
				type: "Repositories used",
			});
		});

		result.sort((a, b) => a.score - b.score);

		return (
			<RadialBar
				className="widget"
				data={result}
				xField="language"
				yField="score"
				theme="classicDark"
				group={true}
				colorField="type"
			/>
		);
	}
}