"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Locale } from "@/types";
import { ArrowUpRight } from "lucide-react";

interface ProjectsGridProps {
    projects: {
        id: number;
        image: string;
        title?: string; // Optional title
    }[];
    lang: Locale;
}

export function ProjectsGrid({ projects, lang }: ProjectsGridProps) {
    const [shuffledProjects, setShuffledProjects] = useState<typeof projects>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-10%" });
    const isRTL = lang === 'ar';

    useEffect(() => {
        // Fisher-Yates shuffle algorithm
        const shuffle = (array: typeof projects) => {
            const shuffled = [...array];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled.slice(0, 12); // Limit to 12 items
        };

        setShuffledProjects(shuffle(projects));
    }, [projects]);

    // Use projects as fallback during initial render to prevent hydration flicker
    const displayItems = shuffledProjects.length > 0 ? shuffledProjects : projects;

    return (
        <section className="relative py-24 transition-colors duration-500
            dark:bg-gradient-to-b dark:from-secondary-dark dark:to-black
            light:bg-white light:border-t light:border-border/10">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px]" />
            </div>

            <div className="container-custom relative z-10" ref={containerRef}>
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full text-accent text-xs font-bold uppercase tracking-[0.2em] mb-4 
                            dark:bg-white/5 dark:border-white/10
                            light:bg-primary/5 light:border-primary/10">
                            {lang === 'ar' ? "المزيد من الأعمال" : "More Works"}
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4 text-foreground">
                            {lang === 'ar' ? "معرض المشاريع" : "Project Gallery"}
                        </h2>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {displayItems.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative aspect-[4/3] rounded-2xl overflow-hidden transition-all duration-300
                                dark:bg-white/5 dark:border-white/5
                                light:bg-neutral-50 light:border-border/50 light:shadow-sm"
                        >
                            {/* Image */}
                            <Image
                                src={project.image}
                                alt={project.title || "Project Image"}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110 will-change-transform"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Content appearing on hover - Hidden for image-only view */}
                            {/* {project.title && (
                                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-bold text-lg text-white font-heading">
                                            {project.title}
                                        </h3>
                                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                            <ArrowUpRight className="w-4 h-4 text-white" />
                                        </div>
                                    </div>
                                </div>
                            )} */}

                            {/* Hover Border Effect */}
                            <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 rounded-2xl transition-colors duration-500" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
