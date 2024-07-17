import Image from "next/image";
import { AiOutlineIssuesClose } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import { FaCodeCommit, FaCodeFork, FaCodePullRequest } from "react-icons/fa6";
import { RiGitRepositoryCommitsLine, RiGitRepositoryLine } from "react-icons/ri";

export default function GithubStats({ userStats }: { userStats: GithubStats | null }) {
	return (
		<div className="widget text-md md:text-md grid grid-cols-3 justify-between gap-5">
			<ul className="col-span-2">
				{[
					{
						label: "Total stars",
						amount: userStats?.totalStars,
						icon: FaStar,
					},
					{
						label: "Total forks",
						amount: userStats?.totalForks,
						icon: FaCodeFork,
					},

					{
						label: "Total issues",
						amount: userStats?.totalIssues,
						icon: AiOutlineIssuesClose,
					},
					{
						label: "Total PRs",
						amount: userStats?.totalPullRequests,
						icon: FaCodePullRequest,
					},
					{
						label: "Total commits",
						amount: userStats?.totalCommitContributions,
						icon: FaCodeCommit,
					},
					{
						label: "Contributed to",
						amount: userStats?.totalRepositoriesContributedTo,
						icon: RiGitRepositoryCommitsLine,
					},
					{
						label: "Own repositories",
						amount: userStats?.totalOwnRepositories,
						icon: RiGitRepositoryLine,
					},
				].map(({ amount, icon, label }, index) => {
					const Icon = icon;

					return (
						<li key={index} className="flex items-center">
							<Icon className="mr-1" />
							<span>{label}</span>:<strong className="ml-1">{amount ?? "calculating"}</strong>
						</li>
					);
				})}
			</ul>
			<Image
				src={userStats?.userAvatarUrl || "/shiroko_github_avatar_fallback.jpg"}
				unoptimized
				width={0}
				height={0}
				sizes="100vw"
				alt={userStats?.userAvatarUrl ? "Shiroko Github Avatar" : "Shiroko Github Avatar Fallback"}
				className="col-span-1 h-auto w-full rounded-lg"
			/>
		</div>
	);
}
