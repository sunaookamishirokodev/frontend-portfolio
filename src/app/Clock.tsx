"use client";

import { lightFormat } from "date-fns";
import { DateTime } from "luxon";
import { useEffect, useRef, useState } from "react";

const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Clock() {
	const [date, setDate] = useState<Date | null>(null);
	const [timeZoneName, setTimeZoneName] = useState<string | null>(null);
	const [diffTimeZone, setDiffTimeZone] = useState<string | null>(null);

	const hourRef = useRef<HTMLDivElement>(null);
	const minuteRef = useRef<HTMLDivElement>(null);
	const secondRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setTimeZoneName(DateTime.local().toFormat("ZZZZZ"));
		setDiffTimeZone(DateTime.local().toFormat("ZZZZ"));
	}, []);

	useEffect(() => {
		const intervalId = setInterval(() => {
			if (!hourRef.current || !minuteRef.current || !secondRef.current) return;
			const now = new Date();
			setDate(now);

			const calcDeg = (time: number, max: number) => `rotate(${(360 / max) * time}deg)`;

			hourRef.current.style.transform = calcDeg(now.getHours(), 12);
			minuteRef.current.style.transform = calcDeg(now.getMinutes(), 60);
			secondRef.current.style.transform = calcDeg(now.getSeconds(), 60);
		}, 1000);

		return () => {
			clearInterval(intervalId);
		};
	}, []);

	return (
		<section
			title="Cre: AutumnVNChino"
			className="widget col-span-full grid flex-1 select-none grid-cols-3 items-center gap-5 lg:col-span-2"
		>
			<div className="relative">
				<svg viewBox="0 0 500 500" className="fill-[#AADDFF]">
					<path d="M469.881,324.15a90.631,90.631,0,0,1,7.616-28.425l15.88-32.267c3.642-7.4,3.642-19.514,0-26.916L477.5,204.275a90.631,90.631,0,0,1-7.616-28.425L467.5,139.967c-.547-8.232-6.6-18.722-13.459-23.311l-29.885-20a90.643,90.643,0,0,1-20.809-20.809l-20-29.885C378.755,39.1,368.265,33.047,360.033,32.5L324.15,30.119A90.631,90.631,0,0,1,295.725,22.5L263.458,6.623c-7.4-3.642-19.514-3.642-26.916,0L204.275,22.5a90.631,90.631,0,0,1-28.425,7.616L139.967,32.5c-8.232.547-18.722,6.6-23.311,13.459l-20,29.885A90.643,90.643,0,0,1,75.844,96.653l-29.885,20C39.1,121.245,33.047,131.735,32.5,139.967L30.119,175.85A90.631,90.631,0,0,1,22.5,204.275L6.623,236.542c-3.642,7.4-3.642,19.514,0,26.916L22.5,295.725a90.631,90.631,0,0,1,7.616,28.425L32.5,360.033c.546,8.232,6.6,18.722,13.458,23.311l29.885,20a90.643,90.643,0,0,1,20.809,20.809l20,29.885c4.589,6.856,15.079,12.912,23.311,13.459l35.883,2.381a90.631,90.631,0,0,1,28.425,7.616l32.267,15.88c7.4,3.642,19.514,3.642,26.916,0l32.267-15.88a90.631,90.631,0,0,1,28.425-7.616l35.883-2.381c8.232-.547,18.722-6.6,23.311-13.459l20-29.885a90.643,90.643,0,0,1,20.809-20.809l29.885-20c6.856-4.589,12.912-15.079,13.458-23.311Z"></path>
				</svg>
				<div
					ref={hourRef}
					id="hour-hand"
					className="absolute bottom-0 left-[46%] right-[46%] top-0 rounded-full transition-transform"
				>
					<div className="absolute bottom-[46%] left-0 right-0 top-[24.5%] w-full rounded-full bg-blue-700" />
				</div>
				<div
					ref={minuteRef}
					id="minute-hand"
					className="absolute bottom-0 left-[46%] right-[46%] top-0 rounded-full transition-transform"
				>
					<div className="absolute bottom-[46%] left-0 right-0 top-[19.5%] w-full rounded-full bg-blue-600" />
				</div>
				<div
					ref={secondRef}
					id="second-hand"
					className="absolute bottom-0 left-[46%] right-[46%] top-0 rounded-full transition-transform"
				>
					<div className="absolute bottom-[80%] left-0 right-0 top-[12%] w-full rounded-full bg-blue-500" />
				</div>
			</div>
			<ul className="col-span-2 flex flex-col justify-center gap-2">
				<li className="sm:text-2xl md:text-3xl lg:text-2xl">
					{date ? day[date?.getDay()] : "Today"}, {date ? lightFormat(date, "dd/MM/yyyy") : "00/00/0000"}
				</li>
				<li className="flex text-4xl sm:text-6xl md:text-7xl lg:text-5xl xl:text-6xl">
					{date ? (
						<>
							<span>
								{date.getHours().toString().padStart(2, "0")}:
								{date.getMinutes().toString().padStart(2, "0")}
							</span>
							<span
								className={
									date.getSeconds() % 2 === 0
										? "text-black/50 dark:text-white/50"
										: "text-black/100 dark:text-white/100"
								}
							>
								:
							</span>
							<span className="text-black/60 dark:text-white/60">
								{date.getSeconds().toString().padStart(2, "0")}
							</span>
						</>
					) : (
						<>00:00:00</>
					)}
				</li>
				<li className="lg:text-md text-xs md:text-sm">
					{timeZoneName ? (
						<>
							{timeZoneName === "Indochina Time" ? "Same time" : timeZoneName?.split(" Time")[0]} /{" "}
							{diffTimeZone}
						</>
					) : (
						<>Loading...</>
					)}
				</li>
			</ul>
		</section>
	);
}
