import Image from "next/image";
import TypeIt from "typeit-react";
import Presence from "./Presence";

const colors = {
	online: "ring-colors-online",
	idle: "ring-colors-idle",
	dnd: "ring-colors-dnd",
	offline: "ring-colors-offline",
};

export default function Introduction({ presence }: { presence: Presence | null }) {
	return (
		<section className="flex flex-col gap-10 p-4 xl:flex-row">
			<Image
				unoptimized
				src={presence?.user.avatar ? presence.user.avatar + "?size=4096" : "/shiroko_avatar.jpg"}
				alt="Shiroko Avatar"
				width={0}
				height={0}
				draggable={false}
				className={`relative z-50 size-full rounded-full ring-8 xl:size-64 ${colors[presence?.user.status?.type || "offline"]}`}
				sizes="100vw"
				priority
			/>

			<div className="flex-1 select-none">
				<div className="relative flex justify-center text-xl md:justify-normal md:text-4xl xl:text-5xl">
					<div className="absolute bottom-full z-[1] h-full w-full bg-white dark:bg-black"></div>
					<span className="text-violet-500">Console</span>.<span className="text-green-500">log</span>
					<span className="text-orange-500">(</span>
					<span className="text-yellow-500">&quot;</span>
					<span className="animate-move">
						<h1 className="en">Hello World!</h1>
						<h1 className="vi">Xin chào!</h1>
						<h1 className="jp">こんにちは!</h1>
					</span>
					<span className="text-yellow-500">&quot;</span>
					<span className="text-orange-500">)</span>
					<div className="absolute left-0 top-1/3 w-full bg-white text-sm md:text-2xl xl:text-4xl dark:bg-black">
						<div className="py-2 text-center md:text-start">
							<span>I&apos;m</span> <span className="text-blue-500">Shiroko</span> - a{" "}
							<TypeIt
								className="text-highlight"
								as="span"
								getBeforeInit={(instance) => {
									return instance
										.type("normal studecq")
										.pause(750)
										.delete(1)
										.pause(50)
										.delete(1)
										.pause(500)
										.type("nt")
										.pause(2500)
										.delete(7)
										.pause(250)
										.type("fullsnack developer")
										.pause(150)
										.move(-13)
										.delete(1)
										.type("t")
										.pause(150)
										.move(13)
										.pause(750)
										.delete(19)
										.pause(250)
										.type("bot discord co der")
										.pause(150)
										.move(-3)
										.delete(1)
										.pause(150)
										.move(3)
										.pause(750);
								}}
								options={{
									loop: true,
									loopDelay: 7500,
									startDelete: true,
									waitUntilVisible: true,
								}}
							/>
						</div>
						<Presence presence={presence} />
					</div>
				</div>
			</div>
		</section>
	);
}
