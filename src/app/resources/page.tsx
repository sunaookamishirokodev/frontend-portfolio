"use client";

import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegFolder, FaRegFile } from "react-icons/fa";

const typeFile = {
	folder: FaRegFolder,
	file: FaRegFile,
};

export default function ResourcesPage() {
	const [data, setData] = useState<OneDriveSharing[] | null>(null);

	useEffect(() => {
		axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/microsoft/resources/folder/`).then((res) => {
			console.log(res.data);
			setData(res.data);
		});
	}, []);

	return (
		<div className="widget flex flex-col">
			<div className="grid grid-cols-12 border-b">
				<span className="mb-2">Type</span>
				<span className="col-span-8 mb-2">Name</span>
				<span className="col-span-2 mb-2">Last modified</span>
				<span>Size</span>
			</div>
			<ul>
				{!data
					? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => {
							return (
								<li key={index} className="grid animate-pulse grid-cols-12 shadow">
									<div className="my-5 h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700" />
									<div className="col-span-8 my-5 mb-2.5 h-2.5 w-96 rounded-full bg-gray-300 dark:bg-gray-600" />
									<div className="col-span-2 my-5 h-2.5 w-32 rounded-full bg-gray-200 dark:bg-gray-700" />
									<div className="my-5 h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700" />
								</li>
							);
						})
					: data.map(({ id, lastModifiedDateTime, name, parentId, size, type }, index) => {
							const Icon = typeFile[type];

							return (
								<li key={index}>
									<Link href={`/resources/${name}`} className="grid grid-cols-12">
										<span className="my-1 flex items-center">
											<Icon />
										</span>
										<span className="col-span-8 my-1">{name}</span>
										<span className="col-span-2 my-1">
											{formatDistanceToNow(lastModifiedDateTime)}
										</span>
										<span>{size}</span>
									</Link>
								</li>
							);
						})}
			</ul>
		</div>
	);
}
