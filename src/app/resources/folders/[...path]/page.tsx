"use client";
import DisplayResources from "@/components/DisplayResources";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ResourcesFoldersPage({ params: { path } }: { params: { path: string[] } }) {
	const [data, setData] = useState<OneDriveSharing[] | null>(null);

	useEffect(() => {
		axios
			.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/microsoft/resources/folders/${path.join("/")}`)
			.then((res) => setData(res.data.data))
			.catch((error) => {
				toast.error(error.response.data.msg, {
					toastId: "error",
				});
				setTimeout(() => history.back(), 5000);
			});
	}, [path]);

	return (
		<>
			<div className="widget flex flex-col">
				<div className="grid grid-cols-5 border-b text-xs md:grid-cols-10 md:text-base xl:grid-cols-12">
					<span title="Type" className="mb-2 hidden md:inline-block">
						Type
					</span>
					<span title="Name" className="col-span-2 mb-2 md:col-span-4 xl:col-span-7">
						Name
					</span>
					<span title="Last modified" className="mb-2 mr-2 truncate md:col-span-2 md:mr-0">
						Last modified
					</span>
					<span title="Size" className="mb-2 ml-2 md:col-span-2 xl:col-span-1 xl:ml-0">
						Size
					</span>
					<span title="Actions" className="mb-2">
						Actions
					</span>
				</div>
				<ul>
					<DisplayResources path={path} data={data} />
				</ul>
			</div>
		</>
	);
}
