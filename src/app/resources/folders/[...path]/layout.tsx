import { Metadata } from "next";

export function generateMetadata({ params: { path } }: { params: { path: string[] } }): Metadata {
	return {
		title: `Shiroko's Resources - ${path[path.length - 1]}`,
	};
}

export default function ResourcesFoldersLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
