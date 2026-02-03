"use client";

import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Locale } from "@/types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { StaggerContainer, StaggerItem, TextReveal } from "@/components/ui/animation-wrappers";
import { HeroBlendingMask, DepthLayer } from "@/components/ui/hero-blending-mask";

interface HeroSectionProps {
    lang: Locale;
    dict: Record<string, any>;
}

export function HeroSection({ lang, dict }: HeroSectionProps) {
    const isRTL = lang === 'ar';
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    // Detect if device is touch-enabled (mobile/tablet)
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check for touch device
        setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
        // Check for mobile viewport
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Mouse position for 3D parallax effect (desktop only)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring physics for mouse movement
    const springConfig = { stiffness: 50, damping: 20 };
    const smoothMouseX = useSpring(mouseX, springConfig);
    const smoothMouseY = useSpring(mouseY, springConfig);

    // Transform mouse position to subtle rotation and movement (disabled on mobile)
    const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], isTouchDevice ? [0, 0] : [2, -2]);
    const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], isTouchDevice ? [0, 0] : [-2, 2]);
    const translateX = useTransform(smoothMouseX, [-0.5, 0.5], isTouchDevice ? [0, 0] : [-10, 10]);

    // Scroll-based parallax (reduced on mobile for performance)
    const yBg = useTransform(scrollY, [0, 600], [0, isMobile ? 100 : 200]);
    const opacityBg = useTransform(scrollY, [0, 400], [1, 0.6]);
    const scaleBg = useTransform(scrollY, [0, 600], [1, isMobile ? 1.05 : 1.1]);

    // Cinematic zoom state (disabled on mobile)
    const [cinematicScale, setCinematicScale] = useState(1);

    // Handle mouse movement for 3D effect (desktop only)
    useEffect(() => {
        if (isTouchDevice) return; // Skip on touch devices

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

    // Cinematic zoom animation (disabled on mobile for performance)
    useEffect(() => {
        if (isMobile) {
            setCinematicScale(1);
            return;
        }

        let startTime = Date.now();
        let animationId: number;

        const animate = () => {
            const elapsed = (Date.now() - startTime) / 1000;
            // Subtle zoom from 1 to 1.03 over 20 seconds, then back
            const progress = (Math.sin(elapsed / 20 * Math.PI) + 1) / 2;
            setCinematicScale(1 + progress * 0.03);
            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationId);
    }, [isMobile]);

    return (
        <section
            ref={containerRef}
            className="relative flex items-center justify-center overflow-hidden
                h-[85vh] min-h-[500px] max-h-[700px]
                md:h-screen md:min-h-[600px] md:max-h-none"
            style={{ perspective: isTouchDevice ? "none" : "1200px" }}
        >
            {/* ============================================ */}
            {/* DEPTH LAYER 0: Background Image with Parallax */}
            {/* ============================================ */}
            <motion.div
                ref={imageRef}
                style={{
                    y: yBg,
                    opacity: opacityBg,
                    scale: scaleBg,
                    // Disable 3D transforms on mobile
                    ...(isTouchDevice ? {} : { rotateX, rotateY, x: translateX }),
                }}
                className="absolute inset-0 z-0"
            >
                {/* Main Hero Image */}
                <motion.div
                    initial={{ scale: 1.15, opacity: 0 }}
                    animate={{ scale: cinematicScale, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="relative w-full h-full"
                >
                    <Image
                        src="/images/hero-bg.jpg"
                        alt="Engineering Construction Site"
                        fill
                        className="object-cover object-center"
                        priority
                        quality={isMobile ? 75 : 90}
                        sizes="100vw"
                    />
                </motion.div>

                {/* Light overlay for readability */}
                <div className="absolute inset-0 z-10 bg-white/75 md:bg-white/70 backdrop-blur-[1px]" />

                {/* Gradient to blend into content */}
                <div className="absolute inset-0 z-[5] bg-gradient-to-b from-transparent via-transparent to-background/50" />
            </motion.div>

            {/* ============================================ */}
            {/* DEPTH LAYER 1: Decorative Geometric Elements */}
            {/* (Hidden on mobile for cleaner layout) */}
            {/* ============================================ */}
            {!isMobile && (
                <DepthLayer depth={1} className="absolute inset-0 pointer-events-none z-[5] hidden md:block">
                    {/* Floating architectural lines */}
                    <motion.div
                        className="absolute top-[15%] left-[10%] w-32 h-px bg-gradient-to-r from-primary/30 to-transparent"
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
                    />
                    <motion.div
                        className="absolute top-[20%] left-[10%] w-px h-24 bg-gradient-to-b from-primary/30 to-transparent"
                        initial={{ scaleY: 0, opacity: 0 }}
                        animate={{ scaleY: 1, opacity: 1 }}
                        transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
                    />

                    <motion.div
                        className="absolute bottom-[25%] right-[8%] w-40 h-px bg-gradient-to-l from-accent/30 to-transparent"
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        transition={{ delay: 1.4, duration: 1.5, ease: "easeOut" }}
                    />
                    <motion.div
                        className="absolute bottom-[25%] right-[8%] w-px h-20 bg-gradient-to-t from-accent/30 to-transparent"
                        initial={{ scaleY: 0, opacity: 0 }}
                        animate={{ scaleY: 1, opacity: 1 }}
                        transition={{ delay: 1.6, duration: 1.5, ease: "easeOut" }}
                    />

                    {/* Subtle grid pattern - desktop only */}
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
                            backgroundSize: "60px 60px",
                        }}
                    />
                </DepthLayer>
            )}

            {/* ============================================ */}
            {/* DEPTH LAYER 2: Main Content (Foreground) */}
            {/* ============================================ */}
            <DepthLayer depth={isTouchDevice ? 0 : 2} className="container-custom relative z-20 text-center text-foreground px-4 md:px-6 pt-16 md:pt-20">
                <StaggerContainer delay={0.2}>
                    <StaggerItem>
                        <div className="mb-6 md:mb-8 relative flex flex-col items-center">
                            {/* Company Name Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                                className="mb-4 md:mb-6 inline-block px-4 md:px-6 py-2 md:py-2.5 rounded-full font-medium tracking-wider md:tracking-widest uppercase text-[10px] md:text-xs shadow-lg md:shadow-xl
                                    bg-foreground/10 backdrop-blur-md border border-border/20 text-foreground/80"
                            >
                                {lang === 'ar' ? 'الرواســي للإستشارات الهندسية' : 'Al-Rawasi Engineering Consultants'}
                            </motion.div>

                            {/* Animated Slogan - Fluid typography */}
                            <h1 className="sr-only">{dict.hero.slogan}</h1>
                            <TextReveal
                                text={dict.hero.slogan}
                                className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-heading leading-tight mb-4 md:mb-6 drop-shadow-xl md:drop-shadow-2xl max-w-5xl mx-auto px-2"
                            />
                        </div>
                    </StaggerItem>

                    <StaggerItem>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            className="text-base md:text-xl lg:text-2xl text-foreground/70 mb-8 md:mb-12 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-sm px-2"
                        >
                            {lang === 'ar'
                                ? 'نحن نبني رؤية الغد بمعايير عالمية وخبرات محلية عريقة في مجال الهندسة والتطوير العمراني.'
                                : 'Building tomorrow\'s vision with global standards and deep local expertise in engineering and urban development.'}
                        </motion.p>
                    </StaggerItem>

                    <StaggerItem>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 0.8 }}
                            className="flex flex-col sm:flex-row gap-3 md:gap-5 justify-center items-center px-4 md:px-0"
                        >
                            <Link href={`/${lang}/projects`} className="w-full sm:w-auto">
                                <Button
                                    size="lg"
                                    variant="primary"
                                    className="group w-full sm:w-auto sm:min-w-[200px] text-base md:text-lg py-5 md:py-7 shadow-lg md:shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)] hover:shadow-[0_0_50px_rgba(var(--primary-rgb),0.5)] active:scale-95 md:hover:scale-105 transition-all duration-300"
                                >
                                    {dict.hero.cta_primary}
                                    {isRTL ? (
                                        <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 group-hover:-translate-x-1 transition-transform" />
                                    ) : (
                                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 md:ml-3 group-hover:translate-x-1 transition-transform" />
                                    )}
                                </Button>
                            </Link>
                            <Link href={`/${lang}/contact`} className="w-full sm:w-auto">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="w-full sm:w-auto sm:min-w-[200px] text-base md:text-lg py-5 md:py-7 text-primary border-primary bg-white/80 hover:bg-primary hover:text-white active:scale-95"
                                >
                                    {dict.hero.cta_secondary}
                                </Button>
                            </Link>
                        </motion.div>
                    </StaggerItem>
                </StaggerContainer>
            </DepthLayer>

            {/* ============================================ */}
            {/* Seamless Blending Mask to Next Section */}
            {/* (Reduced on mobile) */}
            {/* ============================================ */}
            <HeroBlendingMask
                intensity={isMobile ? 0.7 : 1}
                height={isMobile ? "30vh" : "45vh"}
                noiseOpacity={0.02}
                blurAmount={isMobile ? 2 : 3}
            />

            {/* ============================================ */}
            {/* Scroll Indicator - Hidden on mobile */}
            {/* ============================================ */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-3"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-6 h-10 rounded-full border-2 border-foreground/30 flex justify-center pt-2"
                >
                    <motion.div
                        animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-1.5 h-1.5 rounded-full bg-primary"
                    />
                </motion.div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/50 font-medium">
                    {lang === 'ar' ? 'مرر للأسفل' : 'Scroll'}
                </span>
            </motion.div>
        </section>
    );
}
