"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { Locale } from "@/types";

interface ProjectSceneProps {
    project: {
        id: number;
        title: string;
        category: string;
        image: string;
        images?: string[]; // Optional array for multiple images
        location: string;
        year: string;
        desc: string;
    };
    index: number;
    lang: Locale;
}

export function ProjectScene({ project, index, lang }: ProjectSceneProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isRTL = lang === 'ar';
    const isEven = index % 2 === 0;
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Check if project has multiple images
    const hasMultipleImages = project.images && project.images.length > 1;

    // Scroll Animations
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Simplify or disable transforms on mobile
    const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]); // Reduced scale intensity
    const imageParallax = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [-30, 30]);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-[50vh] md:min-h-[70vh] lg:min-h-[90vh] py-12 md:py-24 flex items-center justify-center overflow-hidden bg-background transition-colors duration-500"
        >
            {/* Ambient Background Elements - Reduced on mobile */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[20%] left-[5%] w-[200px] md:w-[500px] h-[200px] md:h-[500px] bg-primary/5 rounded-full blur-[60px] md:blur-[100px] dark:opacity-100 opacity-20" />
                <div className="absolute bottom-[20%] right-[5%] w-[150px] md:w-[400px] h-[150px] md:h-[400px] bg-accent/5 rounded-full blur-[50px] md:blur-[80px] dark:opacity-100 opacity-20" />
                <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] dark:opacity-[0.02] opacity-[0.05] bg-[length:30px_30px] md:bg-[length:40px_40px]" />
            </div>

            <div className="container-custom relative z-10 w-full px-4 md:px-6">
                <div className={cn(
                    "flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-24",
                    isEven ? (isRTL ? "lg:flex-row-reverse" : "lg:flex-row") : (isRTL ? "lg:flex-row" : "lg:flex-row-reverse")
                )}>

                    {/* Image Column */}
                    <motion.div
                        className="w-full lg:w-3/5 relative group"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {/* Decorative Frame Elements - Hidden on mobile */}
                        <div className={cn(
                            "absolute -inset-4 border transition-opacity duration-700 rounded-[2rem] md:rounded-[2.5rem] opacity-0 group-hover:opacity-100 hidden md:block",
                            "dark:border-white/10 light:border-black/5",
                            isEven ? "translate-x-4 translate-y-4" : "-translate-x-4 translate-y-4"
                        )} />

                        {/* Multi-Image Layout or Single Image */}
                        {hasMultipleImages ? (
                            <div className="relative flex gap-3 md:gap-4">
                                {/* First Image - Larger */}
                                <div className="relative w-[60%] aspect-[3/4] overflow-hidden rounded-2xl md:rounded-[1.5rem] shadow-xl md:shadow-2xl transition-colors duration-500 group/img1
                                    dark:bg-secondary-dark/50 dark:shadow-black/50
                                    light:bg-neutral-100 light:shadow-neutral-200/50">
                                    <motion.div style={{ scale: isMobile ? 1 : imageScale }} className="relative h-full w-full">
                                        <Image
                                            src={project.images![0]}
                                            alt={`${project.title} - 1`}
                                            fill
                                            className="object-cover transition-all duration-700 group-hover/img1:scale-105"
                                            sizes="(max-width: 768px) 60vw, 40vw"
                                        />
                                        <div className="absolute inset-0 mix-blend-multiply group-hover/img1:bg-transparent transition-colors duration-700
                                            dark:bg-secondary-dark/20 light:bg-neutral-200/10" />
                                    </motion.div>
                                </div>

                                {/* Second Image - Smaller with offset */}
                                <div className="relative w-[45%] aspect-[3/4] overflow-hidden rounded-2xl md:rounded-[1.5rem] shadow-xl md:shadow-2xl transition-all duration-500 group/img2 -ml-[8%] mt-4 md:mt-12
                                    dark:bg-secondary-dark/50 dark:shadow-black/50 dark:border-secondary-dark border-2 md:border-4
                                    light:bg-neutral-100 light:shadow-neutral-200/50 light:border-white">
                                    <motion.div style={{ scale: isMobile ? 1 : imageScale, y: imageParallax }} className="relative h-full w-full">
                                        <Image
                                            src={project.images![1]}
                                            alt={`${project.title} - 2`}
                                            fill
                                            className="object-cover transition-all duration-700 group-hover/img2:scale-105"
                                            sizes="(max-width: 768px) 45vw, 30vw"
                                        />
                                        <div className="absolute inset-0 mix-blend-multiply group-hover/img2:bg-transparent transition-colors duration-700
                                            dark:bg-secondary-dark/20 light:bg-neutral-200/10" />
                                    </motion.div>
                                </div>
                            </div>
                        ) : (
                            /* Single Image Layout */
                            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl md:rounded-[2rem] shadow-xl md:shadow-2xl transition-colors duration-500
                                dark:bg-secondary-dark/50 dark:shadow-black/50
                                light:bg-neutral-100 light:shadow-neutral-200/50">
                                <motion.div style={{ scale: isMobile ? 1 : imageScale, y: imageParallax }} className="relative h-[110%] md:h-[120%] w-full -top-[5%] md:-top-[10%]">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-all duration-700 group-hover:grayscale-[0.5]"
                                        sizes="(max-width: 768px) 90vw, 60vw"
                                    />
                                    <div className="absolute inset-0 mix-blend-multiply group-hover:bg-transparent transition-colors duration-700
                                        dark:bg-secondary-dark/20 light:bg-neutral-200/10" />
                                </motion.div>
                            </div>
                        )}

                        {/* Mobile Title Overlay (Optional - since content col is hidden) */}
                        <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-xl border border-white/20 shadow-lg md:hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <h3 className="text-lg font-bold text-foreground">{project.title}</h3>
                            <p className="text-xs text-muted-foreground line-clamp-2">{project.desc}</p>
                        </div>

                    </motion.div>
                </div>
            </div>
        </section>
    );
}
