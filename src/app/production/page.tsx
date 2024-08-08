import { HeroParallax } from "@/components/ui/hero-parallax";
import products from "@/data/repositories.json";

export default function ProductionPage() {
	return (
		<div className="absolute inset-0 top-24">
			<HeroParallax
				description="The products that I have made, hope you will like and support it. Don't forget that I can also create your own values. So do not hesitate to contact me to work with me."
				titleTop="My production"
				titleBottom="Developer by me"
				products={products}
			/>
		</div>
	);
}
