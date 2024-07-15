import type { Config } from "tailwindcss";
import daisyui from "daisyui";

export const colors = {
	"primary-100": "#121113",
	"primary-200": "#0a0a0a",
	"secondary-100": "#f7f7f2",
	"secondary-200": "#fafaf9",
	main: "#678AB7",
	online: "#22c55e",
	idle: "#facc15",
	dnd: "#dc2626",
	offline: "#a8a29e",
};

const config: Config = {
	darkMode: ["selector", '[data-theme="black"]'],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: { colors },
			spacing: {
				"custom-2xl": "1320px",
				"custom-xl": "1140px",
				"custom-lg": "960px",
				"custom-md": "720px",
				"custom-sm": "540px",
				"custom-2sm": "100%",
			},
		},
	},
	plugins: [daisyui],
	daisyui: {
		themes: ["black", "light"],
	},
};
export default config;
