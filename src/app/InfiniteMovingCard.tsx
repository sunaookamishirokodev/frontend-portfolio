"use client";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { SiTypescript, SiSocketdotio, SiFramer, SiShadcnui, SiDaisyui } from "react-icons/si";

export function InfiniteMovingCard() {
	return (
		<div className="relative col-span-full flex flex-col items-center justify-center overflow-hidden antialiased">
			<InfiniteMovingCards
				items={[
					{
						icon: RiNextjsFill,
						name: "Next.JS",
						url: "https://nextjs.org/",
					},
					{
						icon: SiTypescript,
						name: "TypeScript",
						url: "https://www.typescriptlang.org/",
					},
					{
						icon: RiTailwindCssFill,
						name: "TailwindCSS",
						url: "https://tailwindcss.com/",
					},
					{
						icon: SiSocketdotio,
						name: "Socket.io",
						url: "https://socket.io/",
					},
					{
						icon: SiFramer,
						name: "Framer Motion",
						url: "https://www.framer.com/motion/",
					},
					{
						icon: SiShadcnui,
						name: "Shadcn UI",
						url: "https://ui.shadcn.com/",
					},
					{
						icon: SiDaisyui,
						name: "Daisy UI",
						url: "https://daisyui.com/",
					},
				]}
			/>
		</div>
	);
}
