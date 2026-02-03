import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                    light: "#B82D7A",
                    dark: "#7A1850",
                    50: "#FDF2F8",
                    100: "#FCE7F3",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                    light: "#6B5F78",
                    dark: "#2E2536",
                    glass: "rgba(74, 63, 85, 0.9)", // Glass effect base
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                    light: "#D4BA94",
                    dark: "#A88B5A",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
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
                'hero-gradient': 'linear-gradient(135deg, #F7F7F7 0%, #FFFFFF 100%)',
                'logo-gradient': 'linear-gradient(to right, #9D1F65, #C4A574)',
            },
        },
    },
    plugins: [],
};
export default config;
