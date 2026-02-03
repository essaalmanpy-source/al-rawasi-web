"use client";

import { Locale } from "@/types";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    lang: Locale;
    bgImage?: string;
    withBlur?: boolean;
}

export function PageHeader({ title, subtitle, lang, bgImage, withBlur = true }: PageHeaderProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    // Detect touch device and mobile viewport
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Mouse position for subtle 3D effect (desktop only)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring physics
    const springConfig = { stiffness: 50, damping: 25 };
    const smoothMouseX = useSpring(mouseX, springConfig);
    const smoothMouseY = useSpring(mouseY, springConfig);

    // Transform mouse to subtle parallax (disabled on touch)
    const translateX = useTransform(smoothMouseX, [-0.5, 0.5], isTouchDevice ? [0, 0] : [-8, 8]);
    const translateY = useTransform(smoothMouseY, [-0.5, 0.5], isTouchDevice ? [0, 0] : [-8, 8]);
    const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], isTouchDevice ? [0, 0] : [1, -1]);
    const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], isTouchDevice ? [0, 0] : [-1, 1]);

    // Scroll-based parallax (reduced on mobile)
    const yBg = useTransform(scrollY, [0, 400], [0, isMobile ? 50 : 100]);
    const scaleBg = useTransform(scrollY, [0, 400], [1, isMobile ? 1.04 : 1.08]);
    const opacityContent = useTransform(scrollY, [0, 300], [1, 0.3]);

    // Cinematic zoom (disabled on mobile)
    const [cinematicScale, setCinematicScale] = useState(1);

    // Mouse move handler (desktop only)
    useEffect(() => {
        if (isTouchDevice) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            mouseX.set(x);
            mouseY.set(y);
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener("mousemove", handleMouseMove);
        }

        return () => {
            if (container) {
                container.removeEventListener("mousemove", handleMouseMove);
            }
        };
    }, [mouseX, mouseY, isTouchDevice]);

    // Subtle cinematic zoom animation (disabled on mobile)
    useEffect(() => {
        if (isMobile) {
            setCinematicScale(1);
            return;
        }

        let startTime = Date.now();
        let animationId: number;

        const animate = () => {
            const elapsed = (Date.now() - startTime) / 1000;
            const progress = (Math.sin(elapsed / 25 * Math.PI) + 1) / 2;
            setCinematicScale(1 + progress * 0.02);
            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationId);
    }, [isMobile]);

    return (
        <div
            ref={containerRef}
            className="relative flex items-center justify-center overflow-hidden
                h-[50vh] min-h-[300px] max-h-[400px]
                md:h-[60vh] md:min-h-[400px] md:max-h-[550px]
                lg:h-[65vh] lg:min-h-[450px] lg:max-h-[600px]"
            style={{ perspective: isTouchDevice ? "none" : "1000px" }}
        >
            {/* Background Image with Parallax */}
            {bgImage && (
                <motion.div
                    className="absolute inset-0 z-0"
                    style={{
                        y: yBg,
                        scale: scaleBg,
                        ...(isTouchDevice ? {} : { x: translateX, rotateX, rotateY }),
                    }}
                >
                    <motion.div
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: cinematicScale, opacity: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="relative w-full h-[120%] -top-[10%]"
                    >
                        <Image
                            src={bgImage}
                            alt={title}
                            fill
                            className="object-cover object-center"
                            priority
                            quality={isMobile ? 70 : 85}
                            sizes="100vw"
                        />
                    </motion.div>
                </motion.div>
            )}

            {/* Overlay Gradient - Lighter on mobile for better readability */}
            <div
                className={`absolute inset-0 z-10 ${bgImage
                    ? 'bg-gradient-to-b from-black/40 via-black/50 to-black/70 md:from-black/30 md:via-black/50 md:to-black/70'
                    : 'bg-gradient-to-r from-primary to-primary-light'
                    }`}
            />

            {/* Pattern Overlay - Hidden on mobile for cleaner look */}
            <div
                className="absolute inset-0 z-10 opacity-[0.08] hidden md:block"
                style={{
                    backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />

            {/* Decorative Lines - Desktop only */}
            {!isMobile && (
                <>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
                        className="absolute top-[20%] left-[5%] w-20 h-px bg-gradient-to-r from-white/40 to-transparent z-20 hidden md:block"
                    />
                    <motion.div
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: 0.7, duration: 1.2, ease: "easeOut" }}
                        className="absolute top-[20%] left-[5%] w-px h-16 bg-gradient-to-b from-white/40 to-transparent z-20 hidden md:block"
                    />
                </>
            )}

            {/* Content */}
            <motion.div
                className="container-custom relative z-20 text-center text-white px-4 md:px-6"
                style={{ opacity: opacityContent }}
            >
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-heading mb-3 md:mb-5 drop-shadow-lg"
                >
                    {title}
                </motion.h1>
                {subtitle && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-base md:text-lg lg:text-xl text-gray-100 md:text-gray-200 max-w-2xl mx-auto font-light leading-relaxed px-2"
                    >
                        {subtitle}
                    </motion.p>
                )}
            </motion.div>

            {/* Seamless Bottom Blending */}
            {withBlur && (
                <div className="absolute bottom-0 inset-x-0 z-20 pointer-events-none">
                    {/* Multi-layer gradient for seamless transition */}
                    <div
                        className="h-24 md:h-40"
                        style={{
                            background: `linear-gradient(to top,
                                hsl(var(--background)) 0%,
                                hsl(var(--background) / 0.95) 15%,
                                hsl(var(--background) / 0.8) 35%,
                                hsl(var(--background) / 0.5) 55%,
                                hsl(var(--background) / 0.2) 75%,
                                transparent 100%
                            )`,
                        }}
                    />

                    {/* Subtle blur zone - Desktop only for performance */}
                    <div
                        className="absolute bottom-0 inset-x-0 h-16 md:h-24 hidden md:block"
                        style={{
                            backdropFilter: "blur(2px)",
                            WebkitBackdropFilter: "blur(2px)",
                            maskImage: "linear-gradient(to top, black 0%, transparent 100%)",
                            WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 100%)",
                        }}
                    />
                </div>
            )}
        </div>
    );
}
