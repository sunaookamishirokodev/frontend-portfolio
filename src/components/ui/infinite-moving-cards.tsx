"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IconType } from "react-icons/lib";

export const InfiniteMovingCards = ({
	items,
	direction = "right",
	speed = "normal",
	pauseOnHover = false,
	className,
}: {
	items: {
		icon: IconType;
		name: string;
		url: string;
	}[];
	direction?: "left" | "right";
	speed?: "fast" | "normal" | "slow";
	pauseOnHover?: boolean;
	className?: string;
}) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const scrollerRef = useRef<HTMLUListElement>(null);

	useEffect(() => {
		const getDirection = () => {
			if (containerRef.current) {
				if (direction === "left") {
					containerRef.current.style.setProperty("--animation-direction", "forwards");
				} else {
					containerRef.current.style.setProperty("--animation-direction", "reverse");
				}
			}
		};
		const getSpeed = () => {
			if (containerRef.current) {
				if (speed === "fast") {
					containerRef.current.style.setProperty("--animation-duration", "20s");
				} else if (speed === "normal") {
					containerRef.current.style.setProperty("--animation-duration", "40s");
				} else {
					containerRef.current.style.setProperty("--animation-duration", "80s");
				}
			}
		};

		if (containerRef.current && scrollerRef.current) {
			const scrollerContent = Array.from(scrollerRef.current.children);

			scrollerContent.forEach((item) => {
				const duplicatedItem = item.cloneNode(true);
				if (scrollerRef.current) {
					scrollerRef.current.appendChild(duplicatedItem);
				}
			});

			getDirection();
			getSpeed();
			setStart(true);
		}
	}, [direction, speed]);

	const [start, setStart] = useState<boolean>(false);

	return (
		<div ref={containerRef} className={cn("scroller relative z-20 overflow-hidden", className)}>
			<ul
				ref={scrollerRef}
				className={cn(
					"flex w-max min-w-full shrink-0 flex-nowrap gap-4",
					start && "animate-scroll",
					pauseOnHover && "hover:[animation-play-state:paused]",
				)}
			>
				{items.map((item, idx) => {
					const Icon = item.icon;
					return (
						<li
							className="w-[350px] max-w-full rounded-2xl bg-colors-secondary-200 md:w-[450px] dark:bg-colors-primary-200"
							key={idx}
						>
							<Link
								href={item.url}
								tabIndex={-1}
								target="_blank"
								rel="noopener noreferrer"
								className="relative flex flex-shrink-0 flex-col gap-4 px-8 py-6 text-black/50 hover:text-black dark:text-white/50 hover:dark:text-white"
							>
								<Icon className="mx-auto size-28" />
								<span className="text-center text-xl">{item.name}</span>
							</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
};
