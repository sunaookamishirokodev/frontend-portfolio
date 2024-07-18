import { typeFile } from "@/app/constants";
import { formatDistanceToNow, lightFormat } from "date-fns";
import Link from "next/link";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { Product, WithContext } from "schema-dts";

export default function DisplayResources({ data, path }: { data: OneDriveSharing[] | null; path?: string[] }) {
	if (!data) {
		return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => {
			return (
				<li key={index} className="grid animate-pulse grid-cols-5 shadow md:grid-cols-10 xl:grid-cols-12">
					<div className="my-5 hidden h-2.5 w-12 rounded-full bg-gray-300 md:block dark:bg-gray-700" />
					<div className="col-span-2 my-5 mb-2.5 h-2.5 max-w-32 rounded-full bg-gray-300 md:col-span-4 md:w-64 xl:col-span-7 xl:w-96 dark:bg-gray-600" />
					<div className="my-5 h-2.5 w-16 rounded-full bg-gray-200 md:col-span-2 md:w-28 xl:w-32 dark:bg-gray-700" />
					<div className="my-5 h-2.5 w-10 rounded-full bg-gray-300 md:col-span-2 md:ml-2 md:w-12 xl:col-span-1 xl:ml-0 dark:bg-gray-700" />
					<div className="my-5 h-2.5 w-10 rounded-full bg-gray-300 md:w-12 dark:bg-gray-700" />
				</li>
			);
		});
	} else {
		const jsonLd: WithContext<Product> = {
			"@context": "https://schema.org",
			"@type": "Product",
			name: path?.[path.length - 1].split("%20").join(" ") || "Resources",
			description: "Valuable resources you can find here, to contribute further please contact via email",
			url: process.env.NEXT_PUBLIC_BASE_URL + "resources",
			aggregateRating: {
				"@type": "AggregateRating",
				ratingValue: "5",
			},
			review: data.map(
				({ id, lastModifiedDateTime, name, parentId, size, type, downloadUrl, createdBy, createdDateTime }) => {
					return {
						"@type": "MediaReview",
						"@id": id,
						author: createdBy,
						datePublished: lightFormat(createdDateTime, "dd-MM-yyyy"),
						name,
						creator: createdBy,
						dateModified: lightFormat(lastModifiedDateTime, "dd-MM-yyyy"),
						url:
							process.env.NEXT_PUBLIC_BASE_URL + type === "folder"
								? "folders"
								: "files" + "/" + (path?.join("/") || ""),
						size,
						reviewRating: {
							"@type": "Rating",
							bestRating: "5",
							worstRating: "1",
						},
					};
				},
			),
		};
		return (
			<>
				{data.map(
					(
						{
							id,
							lastModifiedDateTime,
							name,
							parentId,
							size,
							type,
							downloadUrl,
							createdBy,
							createdDateTime,
						},
						index,
					) => {
						let Icon;
						if (type === "file" && ["zip", "rar", "jar"].includes(name.split(".").at(-1)!)) {
							Icon = typeFile.archive;
						} else {
							Icon = typeFile[type];
						}
						return (
							<li
								key={index}
								className="grid grid-cols-5 text-xs text-black/80 transition-all hover:text-black md:grid-cols-10 md:text-base xl:grid-cols-12 dark:text-white/80 hover:dark:text-white"
							>
								<Link
									href={`/resources/${type === "folder" ? "folders" : "files"}${path ? `/${path.join("/")}` : ""}/${name}`}
									className="col-span-4 grid grid-cols-4 md:col-span-9 md:grid-cols-9 xl:col-span-11 xl:grid-cols-11"
								>
									<span className="my-1 hidden items-center md:flex">
										<Icon />
									</span>
									<span className="col-span-2 my-2 mr-2 truncate md:col-span-4 md:mr-0 xl:col-span-7">
										{name}
									</span>
									<span className="my-2 mr-2 truncate md:col-span-2 md:mr-0">
										{formatDistanceToNow(lastModifiedDateTime)}
									</span>
									<span className="my-2 ml-2 mr-2 truncate md:col-span-2 md:mr-0 xl:col-span-1 xl:ml-0">
										{size}
									</span>
								</Link>
								<ul className="my-2 flex items-center gap-0.5">
									<li>
										{downloadUrl ? (
											<Link className="hover:scale-110" href={downloadUrl} download>
												<FaCloudDownloadAlt />
											</Link>
										) : (
											<></>
										)}
									</li>
								</ul>
							</li>
						);
					},
				)}
				<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
			</>
		);
	}
}
