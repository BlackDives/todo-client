/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		"./index.html",
		"./src/pages/**/*.{ts,tsx}",
		"./src/components/**/*.{ts,tsx}",
		"./src/app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
		"./@/**/*.{ts, tsx}",
	],
	// prefix: "tailwind.config.js",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
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
			screens: {
				sm: "480px",
				md: "768px",
				lg: "976px",
				xl: "1440px",
				"2xl": "1600px",
				"3xl": "2000px",
			},
			colors: {
				neutral: {
					// Gray
					50: "#f9fafb",
					100: "#f3f4f6",
					200: "#e5e7eb",
					300: "#d1d5db",
					400: "#9ca3af",
					500: "#6b7280",
					600: "#4b5563",
					700: "#374151",
					800: "#1f2937",
					900: "#111827",
				},
				primary: {
					// Indigo
					50: "#eef2ff",
					100: "#e0e7ff",
					200: "#c7d2fe",
					300: "#a5b4fc",
					400: "#818cf8",
					500: "#6366f1",
					600: "#4f46e5",
					700: "#4338ca",
					800: "#3730a3",
					900: "#312e81",
				},
				secondary: {
					// Rose
					50: "#fff1f2",
					100: "#ffe4e6",
					200: "#fecdd3",
					300: "#fda4af",
					400: "#fb7185",
					500: "#f43f5e",
					600: "#e11d48",
					700: "#be123c",
					800: "#9f1239",
					900: "#881337",
				},
			},
			fontFamily: {
				sans: ["Graphik", "sans-serif"],
				serif: ["Merriweather", "serif"],
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
}

// OLD CONFIG
// /** @type {import('tailwindcss').Config} */
// export default {
// 	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
// 	theme: {
// 		extend: {
// 			screens: {
// 				sm: "480px",
// 				md: "768px",
// 				lg: "976px",
// 				xl: "1440px",
// 			},
// 			colors: {
// 				neutral: {
// 					// Gray
// 					50: "#f9fafb",
// 					100: "#f3f4f6",
// 					200: "#e5e7eb",
// 					300: "#d1d5db",
// 					400: "#9ca3af",
// 					500: "#6b7280",
// 					600: "#4b5563",
// 					700: "#374151",
// 					800: "#1f2937",
// 					900: "#111827",
// 				},
// 				primary: {
// 					// Indigo
// 					50: "#eef2ff",
// 					100: "#e0e7ff",
// 					200: "#c7d2fe",
// 					300: "#a5b4fc",
// 					400: "#818cf8",
// 					500: "#6366f1",
// 					600: "#4f46e5",
// 					700: "#4338ca",
// 					800: "#3730a3",
// 					900: "#312e81",
// 				},
// 				secondary: {
// 					// Rose
// 					50: "#fff1f2",
// 					100: "#ffe4e6",
// 					200: "#fecdd3",
// 					300: "#fda4af",
// 					400: "#fb7185",
// 					500: "#f43f5e",
// 					600: "#e11d48",
// 					700: "#be123c",
// 					800: "#9f1239",
// 					900: "#881337",
// 				},
// 			},
// 			fontFamily: {
// 				sans: ["Graphik", "sans-serif"],
// 				serif: ["Merriweather", "serif"],
// 			},
// 			extend: {
// 				spacing: {
// 					128: "32rem",
// 					144: "36rem",
// 				},
// 				borderRadius: {
// 					"4xl": "2rem",
// 				},
// 			},
// 		},
// 	},

// 	plugins: [],
// }
