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
			.catch((error) => toast(error.response.data.msg));
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
				<DisplayResources path={path} data={data} />
			</ul>
		</div>
	);
}
