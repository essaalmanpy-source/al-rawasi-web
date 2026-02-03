"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

interface GeometricBackgroundProps {
    variant?: "architectural" | "grid" | "minimal" | "engineering";
    className?: string;
    intensity?: number; // 0 to 1
    animated?: boolean;
}

export function GeometricBackground({
    variant = "architectural",
    className = "",
    intensity = 0.5,
    animated = true,
}: GeometricBackgroundProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true });
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    // Parallax transforms for different layers
    const y1 = useTransform(scrollYProgress, [0, 1], [0, 50]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -30]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 15]);

    const variants = {
        architectural: <ArchitecturalElements intensity={intensity} animated={animated} y1={y1} y2={y2} />,
        grid: <GridPattern intensity={intensity} />,
        minimal: <MinimalElements intensity={intensity} animated={animated} />,
        engineering: <EngineeringElements intensity={intensity} animated={animated} rotate={rotate} />,
    };

    return (
        <div
            ref={ref}
            className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
            style={{ opacity: isInView ? 1 : 0, transition: "opacity 1s ease-out" }}
        >
            {variants[variant]}
        </div>
    );
}

// ============================================
// Architectural Elements
// ============================================
function ArchitecturalElements({
    intensity,
    animated,
    y1,
    y2,
}: {
    intensity: number;
    animated: boolean;
    y1: any;
    y2: any;
}) {
    return (
        <>
            {/* Floating corner frames */}
            <motion.div
                className="absolute top-[10%] left-[5%]"
                style={{ y: y1 }}
            >
                <div
                    className="w-24 h-24 border-l-2 border-t-2 border-primary/20 rounded-tl-xl"
                    style={{ opacity: intensity }}
                />
            </motion.div>

            <motion.div
                className="absolute bottom-[15%] right-[8%]"
                style={{ y: y2 }}
            >
                <div
                    className="w-32 h-32 border-r-2 border-b-2 border-accent/20 rounded-br-xl"
                    style={{ opacity: intensity }}
                />
            </motion.div>

            {/* Floating lines */}
            <motion.div
                className="absolute top-[30%] right-[15%] w-40 h-px"
                style={{ y: y1, opacity: intensity * 0.5 }}
            >
                <motion.div
                    className="w-full h-full bg-gradient-to-r from-primary/30 to-transparent"
                    animate={animated ? { scaleX: [0, 1, 0.8, 1] } : {}}
                    transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
                />
            </motion.div>

            <motion.div
                className="absolute bottom-[40%] left-[12%] w-px h-32"
                style={{ y: y2, opacity: intensity * 0.5 }}
            >
                <motion.div
                    className="w-full h-full bg-gradient-to-b from-accent/30 to-transparent"
                    animate={animated ? { scaleY: [0, 1, 0.7, 1] } : {}}
                    transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", delay: 1 }}
                />
            </motion.div>

            {/* Subtle circles */}
            <motion.div
                className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2"
                style={{ y: y1 }}
            >
                <div
                    className="w-[600px] h-[600px] rounded-full border border-primary/5"
                    style={{ opacity: intensity * 0.3 }}
                />
            </motion.div>

            {/* Decorative dots */}
            <div className="absolute top-[20%] right-[25%] flex gap-2" style={{ opacity: intensity * 0.4 }}>
                <div className="w-1.5 h-1.5 rounded-full bg-primary/30" />
                <div className="w-1.5 h-1.5 rounded-full bg-primary/20" />
                <div className="w-1.5 h-1.5 rounded-full bg-primary/10" />
            </div>
        </>
    );
}

// ============================================
// Grid Pattern
// ============================================
function GridPattern({ intensity }: { intensity: number }) {
    return (
        <>
            {/* Main grid */}
            <div
                className="absolute inset-0"
                style={{
                    opacity: intensity * 0.05,
                    backgroundImage: `
                        linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Secondary finer grid */}
            <div
                className="absolute inset-0"
                style={{
                    opacity: intensity * 0.03,
                    backgroundImage: `
                        linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)
                    `,
                    backgroundSize: "20px 20px",
                }}
            />

            {/* Radial fade overlay */}
            <div
                className="absolute inset-0"
                style={{
                    background: "radial-gradient(ellipse at center, transparent 0%, hsl(var(--background)) 70%)",
                }}
            />
        </>
    );
}

// ============================================
// Minimal Elements
// ============================================
function MinimalElements({
    intensity,
    animated,
}: {
    intensity: number;
    animated: boolean;
}) {
    return (
        <>
            {/* Single elegant line */}
            <motion.div
                className="absolute top-1/2 left-0 right-0 h-px"
                style={{ opacity: intensity * 0.1 }}
            >
                <motion.div
                    className="h-full bg-gradient-to-r from-transparent via-primary/30 to-transparent"
                    animate={animated ? { opacity: [0.3, 0.6, 0.3] } : {}}
                    transition={{ duration: 6, repeat: Infinity }}
                />
            </motion.div>

            {/* Subtle corner accent */}
            <div
                className="absolute bottom-0 right-0 w-20 h-20 border-r border-b border-primary/10"
                style={{ opacity: intensity }}
            />
        </>
    );
}

// ============================================
// Engineering Elements (Blueprint style)
// ============================================
function EngineeringElements({
    intensity,
    animated,
    rotate,
}: {
    intensity: number;
    animated: boolean;
    rotate: any;
}) {
    return (
        <>
            {/* Blueprint-style crosshairs */}
            <div
                className="absolute top-[25%] left-[20%]"
                style={{ opacity: intensity * 0.3 }}
            >
                <div className="relative w-16 h-16">
                    <div className="absolute top-1/2 left-0 w-full h-px bg-primary/40 -translate-y-1/2" />
                    <div className="absolute top-0 left-1/2 w-px h-full bg-primary/40 -translate-x-1/2" />
                    <div className="absolute top-1/2 left-1/2 w-3 h-3 border border-primary/40 rounded-full -translate-x-1/2 -translate-y-1/2" />
                </div>
            </div>

            {/* Measurement marks */}
            <motion.div
                className="absolute bottom-[30%] right-[15%] flex items-end gap-1"
                style={{ opacity: intensity * 0.4, rotate }}
            >
                {[40, 60, 30, 80, 50].map((height, i) => (
                    <motion.div
                        key={i}
                        className="w-1 bg-primary/30 rounded-t"
                        style={{ height: `${height}px` }}
                        animate={animated ? { scaleY: [0.5, 1, 0.5] } : {}}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.2,
                        }}
                    />
                ))}
            </motion.div>

            {/* Technical angle marker */}
            <div
                className="absolute top-[60%] left-[10%]"
                style={{ opacity: intensity * 0.25 }}
            >
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                    <path
                        d="M10 50 L50 50 L50 10"
                        stroke="currentColor"
                        strokeWidth="1"
                        className="text-primary/40"
                        fill="none"
                    />
                    <path
                        d="M20 50 A 30 30 0 0 0 50 20"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeDasharray="4 2"
                        className="text-accent/40"
                        fill="none"
                    />
                </svg>
            </div>

            {/* Dimension line */}
            <div
                className="absolute top-[15%] right-[30%] flex items-center gap-1"
                style={{ opacity: intensity * 0.3 }}
            >
                <div className="w-px h-3 bg-primary/40" />
                <div className="w-24 h-px bg-primary/40" />
                <div className="w-px h-3 bg-primary/40" />
            </div>
        </>
    );
}

// ============================================
// Floating Shapes (standalone component)
// ============================================
interface FloatingShapesProps {
    count?: number;
    className?: string;
}

export function FloatingShapes({ count = 5, className = "" }: FloatingShapesProps) {
    const shapes = Array.from({ length: count }, (_, i) => ({
        id: i,
        size: 20 + Math.random() * 40,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: 15 + Math.random() * 10,
        delay: Math.random() * 5,
    }));

    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            {shapes.map((shape) => (
                <motion.div
                    key={shape.id}
                    className="absolute rounded-full border border-primary/10"
                    style={{
                        width: shape.size,
                        height: shape.size,
                        left: `${shape.x}%`,
                        top: `${shape.y}%`,
                    }}
                    animate={{
                        y: [-20, 20, -20],
                        x: [-10, 10, -10],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: shape.duration,
                        repeat: Infinity,
                        delay: shape.delay,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}
