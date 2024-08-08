import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
	title: "Shiroko's Events",
	description: "Memorable events in my life",
};

export default function ResourcesLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return <>{children}</>;
}
