declare namespace NodeJS {
	interface ProcessEnv {
		readonly NEXT_PUBLIC_API_BASE_URL: string;
		readonly NEXT_PUBLIC_BASE_URL: string;
		readonly NEXT_PUBLIC_FACEBOOK_URL: string;
		readonly NEXT_PUBLIC_GITHUB_URL: string;
		readonly NEXT_PUBLIC_DISCORD_URL: string;
		readonly NEXT_PUBLIC_EMAIL_ADDRESS: string;
		readonly NEXT_PUBLIC_REPOSITORY_URL: string;
	}
}
