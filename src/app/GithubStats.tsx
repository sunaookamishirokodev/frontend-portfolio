import Image from "next/image";
import { AiOutlineIssuesClose } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import { FaCodeCommit, FaCodeFork, FaCodePullRequest } from "react-icons/fa6";
import { RiGitRepositoryCommitsLine, RiGitRepositoryLine } from "react-icons/ri";
import { instance } from "./actions";

export default async function GithubStats() {
	const stats: { data: { data: GithubStats } } = await instance.get(
		`/github/stats/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}`,
	);

	const user: { data: { data: GithubUser } } = await instance.get(
		`/github/user/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}`,
	);

	return (
		<div className="widget col-span-full grid grid-cols-3 items-center justify-between gap-5 text-lg md:text-lg lg:col-span-2 xl:text-base">
			<ul className="col-span-2">
				{[
					{
						label: "Total stars",
						amount: stats.data.data.totalStars,
						icon: FaStar,
					},
					{
						label: "Total forks",
						amount: stats.data.data.totalForks,
						icon: FaCodeFork,
					},
					{
						label: "Total issues",
						amount: stats.data.data.totalIssues,
						icon: AiOutlineIssuesClose,
					},
					{
						label: "Total PRs",
						amount: stats.data.data.totalPullRequests,
						icon: FaCodePullRequest,
					},
					{
						label: "Total commits",
						amount: stats.data.data.totalCommitContributions,
						icon: FaCodeCommit,
					},
					{
						label: "Contributed to",
						amount: stats.data.data.totalRepositoriesContributedTo,
						icon: RiGitRepositoryCommitsLine,
					},
					{
						label: "Own repositories",
						amount: stats.data.data.totalOwnRepositories,
						icon: RiGitRepositoryLine,
					},
				].map(({ amount, icon, label }, index) => {
					const Icon = icon;
					return (
						<li key={index} className="flex items-center">
							<Icon className="mr-1" />
							<span>{label}</span>:<strong className="ml-1">{amount}</strong>
						</li>
					);
				})}
			</ul>
			<Image
				src={user.data.data.avatar_url || "/shiroko_github_avatar_fallback.jpg"}
				unoptimized
				width={0}
				height={0}
				sizes="100vw"
				alt={user.data.data ? "Shiroko Github Avatar" : "Shiroko Github Avatar Fallback"}
				className="col-span-1 h-auto w-full rounded-lg"
			/>
		</div>
	);
}
