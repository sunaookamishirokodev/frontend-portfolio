import type { Metadata } from "next";
import "./globals.css";

const { NEXT_PUBLIC_FACEBOOK_URL, NEXT_PUBLIC_BASE_URL } = process.env;

export const metadata: Metadata = {
	metadataBase: new URL(NEXT_PUBLIC_BASE_URL!),
	title: "Shiroko's Profile",
	description: "Hey guys! Welcome to my website:3",
	applicationName: "Personal Portfolio",
	authors: {
		url: NEXT_PUBLIC_FACEBOOK_URL,
		name: "Trung Lê (Shiroko)",
	},
	generator: "NextJS TailwinCSS TypeScript",
	keywords: ["Shiroko", "Shiroko Dev", "Sunaookami Shiroko", "Personal Website", "Personal Portfolio", "Profile"],
	referrer: "origin-when-cross-origin",
	// verification: {
	// 	google: String(process.env.GOOGLE_KEY),
	// 	other: {
	// 		"dmca-site-verification": String(process.env.DMCA_KEY),
	// 	},
	// },
	publisher: "Sunaookami Shiroko",
	creator: "Sunaookami Shiroko",
	formatDetection: {
		address: false,
		telephone: false,
	},
	openGraph: {
		title: "Shiroko's Profile",
		description: "Hey guys! Welcome to my website:3",
		url: NEXT_PUBLIC_BASE_URL,
		siteName: "me.shirokodev.site",
		locale: "vi_VN",
		countryName: "Vietnam",
		images: [
			{
				url: "/shiroko_seo.jpg",
				alt: "Shiroko Background SEO",
			},
		],
		type: "website",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			{children}
		</html>
	);
}
