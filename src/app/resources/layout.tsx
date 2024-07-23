import type { Metadata } from "next";
import { Product, WithContext } from "schema-dts";

export const metadata: Metadata = {
	title: "Shiroko's Resources",
	description: "Valuable resources you can find here, to contribute further please contact via email",
};

const jsonLd: WithContext<Product> = {
	"@context": "https://schema.org",
	"@type": "Product",
	name: "Resources",
	description: "Valuable resources you can find here, to contribute further please contact via email",
	url: process.env.NEXT_PUBLIC_BASE_URL + "/resources",
	aggregateRating: {
		"@type": "AggregateRating",
		ratingValue: "5",
	},
};

export default function ResourcesLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			{children}
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
		</>
	);
}
