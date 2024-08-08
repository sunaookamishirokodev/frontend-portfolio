import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
	title: "Shiroko's Production",
	description: "All my products, hope you will like and support them",
};

export default function ResourcesLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return <>{children}</>;
}
