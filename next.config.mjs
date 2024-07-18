/** @type {import('next').NextConfig} */
const nextConfig = {
	crossOrigin: "anonymous",
	output: "standalone",
	async redirects() {
		return [
			{
				source: "/facebook",
				destination: process.env.NEXT_PUBLIC_FACEBOOK_URL,
				permanent: false,
			},
			{
				source: "/github",
				destination: process.env.NEXT_PUBLIC_GITHUB_URL,
				permanent: false,
			},
			{
				source: "/discord",
				destination: process.env.NEXT_PUBLIC_DISCORD_URL,
				permanent: false,
			},
		];
	},
};

export default nextConfig;
