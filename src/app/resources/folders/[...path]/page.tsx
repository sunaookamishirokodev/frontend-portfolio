"use client";
import { typeFile } from "@/app/constants";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCloudDownloadAlt } from "react-icons/fa";

export default function ResourcesFoldersPage({ params: { path } }: { params: { path: string[] } }) {
	const [data, setData] = useState<OneDriveSharing[] | null>(null);

	useEffect(() => {
		axios
			.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/microsoft/resources/folders/${path.join("/")}`)
			.then((res) => setData(res.data));
	}, [path]);

	return (
		<div className="widget flex flex-col">
			<div className="grid grid-cols-12 border-b">
				<span className="mb-2">Type</span>
				<span className="col-span-7 mb-2">Name</span>
				<span className="col-span-2 mb-2">Last modified</span>
				<span className="mb-2">Size</span>
				<span className="mb-2">Actions</span>
			</div>
			<ul>
				{!data
					? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => {
							return (
								<li key={index} className="grid animate-pulse grid-cols-12 shadow">
									<div className="my-5 h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700" />
									<div className="col-span-7 my-5 mb-2.5 h-2.5 w-96 rounded-full bg-gray-300 dark:bg-gray-600" />
									<div className="col-span-2 my-5 h-2.5 w-32 rounded-full bg-gray-200 dark:bg-gray-700" />
									<div className="my-5 h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700" />
									<div className="my-5 h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700" />
								</li>
							);
						})
					: data.map(({ id, lastModifiedDateTime, name, parentId, size, type, downloadUrl }, index) => {
							let Icon;
							if (
								type === "file" &&
								["zip", "rar"].includes(name.split(".")[name.split(".").length - 1])
							) {
								Icon = typeFile.archive;
							} else {
								Icon = typeFile[type];
							}

							return (
								<li
									key={index}
									className="grid grid-cols-12 text-black/80 transition-all hover:text-black dark:text-white/80 hover:dark:text-white"
								>
									<Link
										href={`/resources/${type === "folder" ? "folders" : "files"}/${path.join("/")}/${name}`}
										className="col-span-11 grid grid-cols-11"
									>
										<span className="my-1 flex items-center">
											<Icon />
										</span>
										<span className="col-span-7 my-1">{name}</span>
										<span className="col-span-2 my-1">
											{formatDistanceToNow(lastModifiedDateTime)}
										</span>
										<span className="my-1">{size}</span>
									</Link>

									<ul className="my-1 flex items-center gap-0.5">
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
						})}
			</ul>
		</div>
	);
}
