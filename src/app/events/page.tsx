import { SparklesCore } from "@/components/ui/sparkles";
import { TracingBeam } from "@/components/ui/tracing-beam";
import Image from "next/image";
import content from "@/data/events.json";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export default function EventsPage() {
	return (
		<>
			<TracingBeam className="px-6">
				<div className="flex w-full flex-col items-center justify-center overflow-hidden rounded-md">
					<h1 className="relative z-20 text-center text-3xl font-bold md:text-5xl lg:text-7xl">
						Events In My Life
					</h1>
					<div className="relative h-40 w-[40rem]">
						<div className="absolute inset-x-20 top-0 h-[2px] w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm" />
						<div className="absolute inset-x-20 top-0 h-px w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
						<div className="absolute inset-x-60 top-0 h-[5px] w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent blur-sm" />
						<div className="absolute inset-x-60 top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent" />

						<SparklesCore
							background="transparent"
							minSize={0.4}
							maxSize={1}
							particleDensity={1200}
							className="size-full"
						/>

						<div className="absolute inset-0 size-full bg-white [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,black)] dark:bg-black dark:[mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
					</div>
				</div>
				<div className="relative mx-auto max-w-2xl pt-4 antialiased">
					{content.map((item, index) => (
						<div key={index} className="mb-10">
							<h2 className="text-dark mb-4 w-fit rounded-full bg-black px-4 py-1 text-sm text-white dark:bg-white dark:text-black">
								{item.badge}
							</h2>

							<p className="mb-4 text-xl">{item.title}</p>

							<div className="prose-sm dark:prose-invert prose text-sm">
								{item?.image && (
									<HoverBorderGradient
										as="div"
										className="flex items-center space-x-2 bg-white dark:bg-black"
									>
										<Image
											sizes="100vw"
											src={item.image}
											alt="Thumbnail"
											height="0"
											width="0"
											className="aspect-square w-full rounded-lg object-cover"
										/>
									</HoverBorderGradient>
								)}
								<ul className="mt-10 flex flex-col gap-2">
									{item.description.map((v, i) => {
										return (
											<li className="first-letter:pl-2" key={i}>
												{v}
											</li>
										);
									})}
								</ul>
							</div>
						</div>
					))}
				</div>
			</TracingBeam>
		</>
	);
}
