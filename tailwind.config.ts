import type { Config } from "tailwindcss";

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

const config = {
	darkMode: ["selector", '[data-theme="black"]'],
	content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: { colors },
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [require("tailwindcss-animate"), require("daisyui")],
	daisyui: {
		themes: ["black", "light"],
	},
} satisfies Config;

export default config;
