import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: process.env.NEXT_PUBLIC_BASE_URL!,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 1,
		},
		{
			url: process.env.NEXT_PUBLIC_BASE_URL + "resources",
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 0.9,
		},
	];
}
