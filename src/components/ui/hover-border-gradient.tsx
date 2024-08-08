"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { PropsWithChildren, useEffect, useState } from "react";

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

export function HoverBorderGradient({
	children,
	containerClassName,
	className,
	as: Tag = "button",
	duration = 1,
	clockwise = true,
	...props
}: PropsWithChildren<
	{
		as?: React.ElementType;
		containerClassName?: string;
		className?: string;
		duration?: number;
		clockwise?: boolean;
	} & React.HTMLAttributes<HTMLElement>
>) {
	const [hovered, setHovered] = useState<boolean>(false);
	const [direction, setDirection] = useState<Direction>("TOP");

	const movingMap: Record<Direction, string> = {
		TOP: "radial-gradient(20.7% 50% at 50% 0%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
		LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
		BOTTOM: "radial-gradient(20.7% 50% at 50% 100%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
		RIGHT: "radial-gradient(16.2% 41.199999999999996% at 100% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
	};

	const highlight = "radial-gradient(75% 181.15942028985506% at 50% 50%, #3275F8 0%, rgba(255, 255, 255, 0) 100%)";

	useEffect(() => {
		if (!hovered) {
			const interval = setInterval(() => {
				setDirection((prevState) => {
					const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
					const currentIndex = directions.indexOf(prevState);
					const nextIndex = clockwise
						? (currentIndex - 1 + directions.length) % directions.length
						: (currentIndex + 1) % directions.length;
					return directions[nextIndex];
				});
			}, duration * 1000);
			return () => clearInterval(interval);
		}
	}, [hovered, duration, clockwise]);
	return (
		<Tag
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			className={cn("relative", containerClassName)}
			{...props}
		>
			<div className={cn("relative z-10 w-auto p-4", className)}>{children}</div>
			<motion.div
				className="absolute inset-0 z-0 size-full flex-none overflow-hidden rounded-3xl blur-[2px]"
				initial={{ background: movingMap[direction] }}
				animate={{
					background: hovered ? [movingMap[direction], highlight] : movingMap[direction],
				}}
				transition={{ ease: "linear", duration: duration ?? 1 }}
			/>
		</Tag>
	);
}
