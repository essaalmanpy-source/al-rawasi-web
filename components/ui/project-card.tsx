"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
    title: string;
    category: string;
    image: string;
    location: string;
    year: string;
    index: number;
    className?: string;
}

export function ProjectCard({
    title,
    category,
    image,
    location,
    year,
    index,
    className
}: ProjectCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    // 3D Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.21, 0.47, 0.32, 0.98] // Custom easing
            }}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className={cn(
                "group relative h-[450px] w-full min-w-[320px] md:min-w-[400px] cursor-none rounded-3xl transition-all duration-500",
                "dark:bg-secondary-dark/5 light:bg-neutral-100",
                className
            )}
        >
            {/* Standard Shadow */}
            <div className="absolute inset-4 rounded-3xl bg-black/20 blur-xl transition-all duration-500 group-hover:bg-primary/20 group-hover:blur-2xl"
                style={{ transform: "translateZ(-50px)" }}
            />

            <div
                className="absolute inset-0 overflow-hidden rounded-3xl border backdrop-blur-sm transition-all duration-500
                    dark:border-white/10 dark:bg-secondary-dark/40
                    light:border-border/50 light:bg-white/60"
                style={{ transform: "translateZ(0px)" }}
            >
                {/* Background Image */}
                <div className="absolute inset-0 h-full w-full">
                    <div className="absolute inset-0 bg-secondary-dark/20 mix-blend-overlay z-10" />
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0 grayscale-[0.3]"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 transition-opacity duration-500 
                        dark:bg-gradient-to-t dark:from-secondary-dark dark:via-secondary-dark/60 dark:to-transparent dark:opacity-80 dark:group-hover:opacity-70
                        light:bg-gradient-to-t light:from-white light:via-white/40 light:to-transparent light:opacity-90 light:group-hover:opacity-85"
                    />
                </div>

                {/* Content Container - 3D Popout */}
                <div
                    className="absolute inset-0 flex flex-col justify-end p-8"
                    style={{ transform: "translateZ(60px)" }}
                >
                    {/* Top Tag */}
                    <div className="absolute top-8 left-8 overflow-hidden rounded-full border px-4 py-1.5 backdrop-blur-md transition-colors
                        dark:border-white/20 dark:bg-black/20 light:border-primary/20 light:bg-primary/5">
                        <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider dark:text-white/90 light:text-primary">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                            {category}
                        </span>
                    </div>

                    {/* Main Text Info */}
                    <div className="transform transition-transform duration-500 group-hover:translate-y-[-10px]">
                        <div className="mb-4 flex items-center justify-between border-b border-border/20 pb-4">
                            <div>
                                <h3 className="text-3xl font-bold mb-1 font-heading dark:text-white light:text-foreground">{title}</h3>
                                <div className="flex items-center gap-4 text-sm dark:text-gray-300 light:text-neutral-600">
                                    <span className="flex items-center gap-1">
                                        <MapPin className="w-3.5 h-3.5 text-accent" />
                                        {location}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Hidden Description Reveal */}
                        <div className="h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:h-12 group-hover:opacity-100">
                            <p className="text-sm dark:text-gray-300 light:text-neutral-600 line-clamp-2">
                                A flagship engineering project demonstrating structural innovation and sustainability.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    {/* Corner Accent */}
                    <div className="absolute top-6 right-6 h-12 w-12 border-t-2 border-r-2 border-accent/50 rounded-tr-xl" />
                    <div className="absolute bottom-6 left-6 h-12 w-12 border-b-2 border-l-2 border-accent/50 rounded-bl-xl" />
                </div>
            </div>
        </motion.div>
    );
}
