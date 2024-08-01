"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartConfig = {
	views: {
		label: "Page Views",
	},
	score: {
		label: "Score",
	},
	repositories: {
		label: "Repositories",
	},
} satisfies ChartConfig;

export default function ChartLanguage({ data }: { data: GithubStats | null }) {
	const [activeChart, setActiveChart] = useState<keyof typeof chartConfig>("score");
	const [results, setResults] = useState<{ language: string; score: number; repositories: number }[]>([]);

	useEffect(() => {
		if (data) {
			const result: { language: string; score: number; repositories: number }[] = [];

			Object.keys(data.languageStatistics).forEach((key) => {
				result.push({
					language: key,
					score: data.languageStatistics[key],
					repositories: data.languageRepositories[key],
				});
			});

			result.sort((a, b) => a.score - b.score);

			setResults(result);
		}
	}, [data]);

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
		return (
			<Card className="widget col-span-3 bg-black">
				<CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
					<div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
						<CardTitle>Languages used chart</CardTitle>
						<CardDescription>Showing total languages and repositories used it</CardDescription>
					</div>
					<div className="flex">
						{["score", "repositories"].map((key, index) => {
							const chart = key as keyof typeof chartConfig;
							return (
								<button
									key={index}
									data-active={activeChart === chart}
									className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
									onClick={() => setActiveChart(chart)}
								>
									<span className="text-muted-foreground text-xs">{chartConfig[chart].label}</span>
									<span className="text-lg font-bold leading-none sm:text-3xl">
										{results
											.reduce((acc, curr) => acc + curr[key as "score" | "repositories"], 0)
											.toLocaleString()}
									</span>
								</button>
							);
						})}
					</div>
				</CardHeader>
				<CardContent className="px-2 sm:p-6">
					<ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full xl:h-[100px]">
						<BarChart
							accessibilityLayer={false}
							data={results}
							margin={{
								left: 12,
								right: 12,
							}}
						>
							<CartesianGrid vertical={false} />
							<XAxis
								dataKey="language"
								tickLine={false}
								axisLine={false}
								tickMargin={8}
								minTickGap={0}
								allowDataOverflow
								tickFormatter={(value: string) => value.slice(0, 5)}
							/>
							<ChartTooltip
								content={
									<ChartTooltipContent
										hideIndicator
										className="w-[150px] bg-black text-white dark:bg-white dark:text-black"
										nameKey="languageName"
										labelFormatter={(value) => value}
									/>
								}
							/>
							<Bar
								dataKey={activeChart}
								className="fill-colors-primary-200 dark:fill-colors-secondary-200"
							/>
						</BarChart>
					</ChartContainer>
				</CardContent>
			</Card>
		);
	}
}
