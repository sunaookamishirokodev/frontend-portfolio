import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Shiroko's Resources",
	description: "Valuable resources you can find here, to contribute further please contact via email",
};

export default function ResourcesLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
