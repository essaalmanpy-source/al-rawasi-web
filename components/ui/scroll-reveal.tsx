"use client";

import { useRef, useEffect, ReactNode } from "react";
import { motion, useInView, Variants } from "framer-motion";

// ============================================
// Animation Preset Types
// ============================================
type AnimationPreset =
    | "fade-up"
    | "fade-down"
    | "fade-left"
    | "fade-right"
    | "fade-in"
    | "scale-up"
    | "scale-down"
    | "slide-up"
    | "slide-down"
    | "construction"
    | "reveal-mask";

interface ScrollRevealProps {
    children: ReactNode;
    preset?: AnimationPreset;
    delay?: number;
    duration?: number;
    threshold?: number;
    className?: string;
    once?: boolean;
    stagger?: number;
    staggerChildren?: boolean;
}

// ============================================
// Animation Variants
// ============================================
const presetVariants: Record<AnimationPreset, Variants> = {
    "fade-up": {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
    },
    "fade-down": {
        hidden: { opacity: 0, y: -40 },
        visible: { opacity: 1, y: 0 },
    },
    "fade-left": {
        hidden: { opacity: 0, x: -40 },
        visible: { opacity: 1, x: 0 },
    },
    "fade-right": {
        hidden: { opacity: 0, x: 40 },
        visible: { opacity: 1, x: 0 },
    },
    "fade-in": {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    },
    "scale-up": {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
    },
    "scale-down": {
        hidden: { opacity: 0, scale: 1.2 },
        visible: { opacity: 1, scale: 1 },
    },
    "slide-up": {
        hidden: { opacity: 0, y: 60, clipPath: "inset(100% 0% 0% 0%)" },
        visible: { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" },
    },
    "slide-down": {
        hidden: { opacity: 0, y: -60, clipPath: "inset(0% 0% 100% 0%)" },
        visible: { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" },
    },
    "construction": {
        hidden: {
            opacity: 0,
            y: 30,
            filter: "blur(10px)",
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        },
    },
    "reveal-mask": {
        hidden: {
            clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
        },
        visible: {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        },
    },
};

// ============================================
// Main ScrollReveal Component
// ============================================
export function ScrollReveal({
    children,
    preset = "fade-up",
    delay = 0,
    duration = 0.6,
    threshold = 0.2,
    className = "",
    once = true,
    stagger = 0.1,
    staggerChildren = false,
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, {
        once,
        margin: "-20% 0px -20% 0px" as any,
    });

    const variants = presetVariants[preset];

    const containerVariants: Variants = staggerChildren
        ? {
            hidden: {},
            visible: {
                transition: {
                    staggerChildren: stagger,
                    delayChildren: delay,
                },
            },
        }
        : variants;

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            transition={
                !staggerChildren
                    ? {
                        duration,
                        delay,
                        ease: [0.25, 0.46, 0.45, 0.94],
                    }
                    : undefined
            }
            className={className}
        >
            {staggerChildren ? (
                <StaggeredChildren variants={variants} duration={duration}>
                    {children}
                </StaggeredChildren>
            ) : (
                children
            )}
        </motion.div>
    );
}

// ============================================
// Staggered Children Wrapper
// ============================================
function StaggeredChildren({
    children,
    variants,
    duration,
}: {
    children: ReactNode;
    variants: Variants;
    duration: number;
}) {
    // Wrap each child in a motion.div with variants
    const childrenArray = Array.isArray(children) ? children : [children];

    return (
        <>
            {childrenArray.map((child, index) => (
                <motion.div
                    key={index}
                    variants={variants}
                    transition={{
                        duration,
                        ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                >
                    {child}
                </motion.div>
            ))}
        </>
    );
}

// ============================================
// Construction Reveal - Elements appear as if "built"
// ============================================
interface ConstructionRevealProps {
    children: ReactNode;
    delay?: number;
    duration?: number;
    className?: string;
}

export function ConstructionReveal({
    children,
    delay = 0,
    duration = 0.8,
    className = "",
}: ConstructionRevealProps) {
    return (
        <ScrollReveal
            preset="construction"
            delay={delay}
            duration={duration}
            className={className}
        >
            {children}
        </ScrollReveal>
    );
}

// ============================================
// Mask Reveal - Directional wipe effect
// ============================================
interface MaskRevealProps {
    children: ReactNode;
    direction?: "left" | "right" | "up" | "down";
    delay?: number;
    duration?: number;
    className?: string;
}

export function MaskReveal({
    children,
    direction = "left",
    delay = 0,
    duration = 0.8,
    className = "",
}: MaskRevealProps) {
    const clipPaths: Record<string, { hidden: string; visible: string }> = {
        left: {
            hidden: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
            visible: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        },
        right: {
            hidden: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
            visible: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        },
        up: {
            hidden: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            visible: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        },
        down: {
            hidden: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            visible: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        },
    };

    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ clipPath: clipPaths[direction].hidden }}
            animate={isInView ? { clipPath: clipPaths[direction].visible } : {}}
            transition={{
                duration,
                delay,
                ease: [0.77, 0, 0.175, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// ============================================
// Architectural Divider - Animated line that draws in
// ============================================
interface ArchitecturalDividerProps {
    direction?: "horizontal" | "vertical";
    className?: string;
    delay?: number;
    duration?: number;
    color?: string;
}

export function ArchitecturalDivider({
    direction = "horizontal",
    className = "",
    delay = 0,
    duration = 1.2,
    color = "primary",
}: ArchitecturalDividerProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-30px" });

    const isHorizontal = direction === "horizontal";

    return (
        <motion.div
            ref={ref}
            className={`bg-${color}/30 ${className}`}
            initial={{
                scaleX: isHorizontal ? 0 : 1,
                scaleY: isHorizontal ? 1 : 0,
            }}
            animate={
                isInView
                    ? {
                        scaleX: 1,
                        scaleY: 1,
                    }
                    : {}
            }
            transition={{
                duration,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
            style={{
                width: isHorizontal ? "100%" : "2px",
                height: isHorizontal ? "1px" : "100%",
                transformOrigin: isHorizontal ? "left center" : "center top",
            }}
        />
    );
}

// ============================================
// Parallax Wrapper
// ============================================
interface ParallaxWrapperProps {
    children: ReactNode;
    speed?: number;
    className?: string;
}

export function ParallaxWrapper({
    children,
    speed = 0.5,
    className = "",
}: ParallaxWrapperProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleScroll = () => {
            const rect = element.getBoundingClientRect();
            const scrolled = window.scrollY;
            const rate = scrolled * speed;

            element.style.transform = `translateY(${rate}px)`;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [speed]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}
