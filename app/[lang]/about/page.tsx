"use client";

import { Locale } from "@/types";
import { VisionMission } from "@/components/about/vision-mission";
import { DirectorMessage } from "@/components/about/director-message";
import { CompanyStory } from "@/components/about/company-story";
import { CoreValues } from "@/components/about/core-values";
import { Timeline } from "@/components/about/timeline";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextReveal, FadeIn } from "@/components/ui/animation-wrappers";

export default function AboutPage({ params }: { params: { lang: Locale } }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Parallax and Visual effects for the Hero
    const yHero = useTransform(scrollYProgress, [0, 0.15], [0, 120]);
    const scaleHero = useTransform(scrollYProgress, [0, 0.15], [1, 1.1]);
    const opacityOverlay = useTransform(scrollYProgress, [0, 0.1, 0.15], [0.65, 0.75, 0.9]);

    return (
        <main ref={containerRef} className="relative bg-background min-h-screen transition-colors duration-500">
            {/* Cinematic Hero Section */}
            <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
                {/* Static Background Image - Always Visible */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/about-hero.png"
                        alt="About Al-Rawasi"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Animated Overlay with Parallax */}
                <motion.div
                    style={{ y: yHero, scale: scaleHero }}
                    className="absolute inset-0 z-10"
                >
                    {/* Dynamic Overlay that darkens/lightens on scroll */}
                    <motion.div
                        style={{ opacity: opacityOverlay }}
                        className="absolute inset-0 dark:bg-secondary-dark light:bg-white dark:mix-blend-multiply light:mix-blend-overlay"
                    />
                    <div className="absolute inset-0 
                        dark:bg-gradient-to-b dark:from-transparent dark:via-secondary-dark/50 dark:to-secondary-dark
                        light:bg-gradient-to-b light:from-transparent light:via-white/50 light:to-background" />
                </motion.div>

                {/* Content */}
                <div className="container-custom relative z-30 text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <FadeIn direction="up" delay={0.2}>
                            <span className="inline-block py-2 px-6 rounded-full backdrop-blur-md border text-accent text-xs font-bold uppercase tracking-[0.4em] mb-8 shadow-2xl
                                dark:bg-white/5 dark:border-white/10
                                light:bg-primary/5 light:border-primary/10">
                                {params.lang === 'ar' ? 'من نحن' : 'Who We Are'}
                            </span>
                        </FadeIn>

                        <TextReveal
                            text={params.lang === 'ar' ? "شركاؤك في بناء المستقبل" : "Partners in Building the Future"}
                            className="text-5xl md:text-8xl font-bold font-heading tracking-tighter mb-8 leading-tight drop-shadow-2xl
                                dark:text-white light:text-foreground"
                        />

                        <FadeIn delay={0.6} className="max-w-3xl mx-auto">
                            <p className="text-lg md:text-2xl font-light leading-relaxed opacity-90 italic
                                dark:text-gray-300 light:text-muted-foreground">
                                {params.lang === 'ar'
                                    ? "نجمع بين الخبرة العريقة والرؤية المتجددة لنقدم حلولاً هندسية تليق بطموحات ليبيا الواعدة."
                                    : "Combining deep heritage with a renewed vision to deliver engineering solutions worthy of Libya's promising ambitions."}
                            </p>
                        </FadeIn>
                    </motion.div>
                </div>

                {/* Scroll Indicator (Cinematic Line) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ delay: 1, duration: 2 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
                >
                    <div className="w-[1px] h-20 bg-gradient-to-b dark:from-white light:from-primary to-transparent" />
                </motion.div>
            </section>

            {/* Vision Mission Section with Smooth Transition */}
            <section className="relative z-10">
                {/* Animated Gradient Transition from Dark/Light to Transparent */}
                <div className="absolute -top-32 left-0 right-0 h-64 pointer-events-none z-20 
                    dark:bg-gradient-to-b dark:from-secondary-dark dark:via-secondary-dark/50 dark:to-transparent
                    light:bg-gradient-to-b light:from-background light:via-background/50 light:to-transparent" />

                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <VisionMission lang={params.lang} />
                </motion.div>
            </section>

            {/* Director Message */}
            <DirectorMessage lang={params.lang} />

            {/* Company Story */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <CompanyStory lang={params.lang} />
            </motion.div>

            {/* Core Values */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <CoreValues lang={params.lang} />
            </motion.div>

            {/* Timeline */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <Timeline lang={params.lang} />
            </motion.div>
        </main>
    );
}
