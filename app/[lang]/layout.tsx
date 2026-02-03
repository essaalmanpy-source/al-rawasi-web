import { Inter, Outfit, Cairo, Tajawal } from "next/font/google"; // Note: In manual implementation, these imports work if deps are installed.
import "@/app/globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Locale } from "@/types";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { AnimationProvider } from "@/components/providers/animation-provider";
import { AIAssistant } from "@/components/ui/ai-assistant";

// Font configurations
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const cairo = Cairo({ subsets: ["arabic"], variable: "--font-cairo" });
const tajawal = Tajawal({ weight: ["400", "500", "700"], subsets: ["arabic"], variable: "--font-tajawal" });

export const metadata = {
    title: "Al-Rawasi Engineering Consultants",
    description: "Professional Engineering & Urban Planning Services in Libya",
};

import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { lang: Locale };
}) {
    const lang = params.lang || 'ar';
    const dir = lang === 'ar' ? 'rtl' : 'ltr';

    // Choose fonts based on language
    const fontClass = lang === 'ar'
        ? `${cairo.variable} ${tajawal.variable} font-sans`
        : `${inter.variable} ${outfit.variable} font-sans`;

    return (
        <html lang={lang} dir={dir} suppressHydrationWarning>
            <body className={fontClass}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    forcedTheme="light"
                    disableTransitionOnChange
                >
                    <AnimationProvider>
                        <SmoothScroll>
                            <Header lang={lang} />
                            <main className="min-h-screen pt-20">
                                {children}
                            </main>
                            <Footer lang={lang} />
                            <AIAssistant lang={lang} />
                        </SmoothScroll>
                    </AnimationProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}

