import { Metadata } from "next";

export function generateMetadata({ params: { identify } }: { params: { identify: string } }): Metadata {
	return {
		title: `Shiroko's Profile - ${identify}`,
	};
}

export default function ResourcesFoldersLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
