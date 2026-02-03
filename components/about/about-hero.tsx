"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { Locale } from "@/types";
import { TextReveal, FadeIn } from "@/components/ui/animation-wrappers";

export function AboutHero({ lang }: { lang: Locale }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Integrated Cinematic Animation Logic (Match Projects & Services)
    const yHero = useTransform(scrollYProgress, [0, 0.2], [0, 150]);
    const scaleHero = useTransform(scrollYProgress, [0, 0.2], [1, 1.15]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.15, 0.2], [1, 0.8, 0]);
    const blurHero = useTransform(scrollYProgress, [0, 0.2], [0, 12]);

    return (
        <section ref={containerRef} className="relative h-[85vh] flex items-center justify-center overflow-hidden">
            {/* Parallax Background with Cinematic Filters */}
            <motion.div
                style={{ y: yHero, scale: scaleHero, opacity: opacityHero, filter: `blur(${blurHero}px)` }}
                className="absolute inset-0 z-0"
            >
                {/* Visual styling to match architecture theme & professional character */}
                <div className="absolute inset-0 bg-secondary-dark/65 mix-blend-multiply z-10" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary-dark/50 to-secondary-dark z-20" />

                <Image
                    src="/images/about-hero.png"
                    alt="About Al-Rawasi"
                    fill
                    className="object-cover"
                    priority
                />
            </motion.div>

            {/* Content */}
            <div className="container-custom relative z-30 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <FadeIn direction="up" delay={0.2}>
                        <span className="inline-block py-2 px-6 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-accent text-xs font-bold uppercase tracking-[0.4em] mb-8 shadow-2xl">
                            {lang === 'ar' ? 'من نحن' : 'Who We Are'}
                        </span>
                    </FadeIn>

                    <h1 className="text-5xl md:text-8xl font-bold font-heading text-white tracking-tighter mb-8 leading-tight drop-shadow-2xl">
                        <TextReveal text={lang === 'ar' ? "شركاؤك في بناء المستقبل" : "Partners in Building the Future"} />
                    </h1>

                    <FadeIn delay={0.6} className="max-w-3xl mx-auto">
                        <p className="text-lg md:text-2xl text-gray-300 font-light leading-relaxed opacity-90 italic">
                            {lang === 'ar'
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
                <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent" />
            </motion.div>
        </section>
    );
}
