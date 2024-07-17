"use client";

import { useEffect, useState } from "react";

export default function ErrorPreviewer({ message }: { message: string }) {
	const [countDown, setCountDown] = useState<number>(5);

	useEffect(() => {
		const timeoutID = setTimeout(() => {
			if (countDown <= 0) {
				clearTimeout(timeoutID);
				history.back();
				return;
			}
			setCountDown(countDown - 1);
		}, 1000);

		return () => {
			clearTimeout(timeoutID);
		};
	}, [countDown]);

	return (
		<div className="widget flex h-[500px] flex-col items-center justify-center">
			<span>{message}</span>
			<span>Back to previous page in {countDown}</span>
		</div>
	);
}
