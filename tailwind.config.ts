import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#9D1F65", // Logo Magenta/Burgundy
                    light: "#B82D7A",
                    dark: "#7A1850",
                    50: "#FDF2F8",
                    100: "#FCE7F3",
                },
                secondary: {
                    DEFAULT: "#4A3F55", // Logo Dark Purple/Gray
                    light: "#6B5F78",
                    dark: "#2E2536",
                    glass: "rgba(74, 63, 85, 0.9)", // Glass effect base
                },
                accent: {
                    DEFAULT: "#C4A574", // Warm Gold accent
                    light: "#D4BA94",
                    dark: "#A88B5A",
                },
                neutral: {
                    50: "#FAFAFA",
                    100: "#F5F5F5",
                    200: "#E5E5E5",
                    300: "#D4D4D4",
                    400: "#A3A3A3",
                    500: "#737373",
                    600: "#525252",
                    700: "#404040",
                    800: "#262626",
                    900: "#171717",
                }
            },
            fontFamily: {
                sans: ["var(--font-inter)", "var(--font-cairo)", "sans-serif"],
                heading: ["var(--font-outfit)", "var(--font-tajawal)", "sans-serif"],
            },
            container: {
                center: true,
                padding: "1rem",
                screens: {
                    "2xl": "1400px",
                },
            },
            backgroundImage: {
                'hero-gradient': 'linear-gradient(135deg, #4A3F55 0%, #2E2536 100%)',
                'logo-gradient': 'linear-gradient(to right, #4A3F55, #9D1F65)',
            },
        },
    },
    plugins: [],
};
export default config;
