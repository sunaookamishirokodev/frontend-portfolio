import { MetadataRoute } from "next";
import { colors } from "../../tailwind.config";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "Shiroko's Portfolio",
		short_name: "Shiroko's Website",
		description:
			"Hello everyone, I'm Shiroko - a normal student who likes to code, watch anime, play games and communicate with people. So you can hire me to code your website, portfolio, economy, advertising website but not 18+ or illegal. Furthermore, I am the administrator of Elaina Team - a new technology team in Vietnam and I am really happy if I can be of any help to you. Thanks for reading, have a great day!",
		start_url: "/",
		display: "standalone",
		background_color: colors.main,
		icons: [
			{
				src: "/favicon.ico",
				sizes: "any",
				type: "image/x-icon",
			},
		],
	};
}
