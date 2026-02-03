"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface HeroBlendingMaskProps {
    className?: string;
    intensity?: number; // 0 to 1 - how strong the blending effect is
    height?: string; // CSS height value for the mask
    noiseOpacity?: number; // Opacity of the noise texture
    blurAmount?: number; // Blur amount in pixels
}

export function HeroBlendingMask({
    className = "",
    intensity = 1,
    height = "40vh",
    noiseOpacity = 0.03,
    blurAmount = 2,
}: HeroBlendingMaskProps) {
    const maskRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    // Dynamic opacity based on scroll
    const blendOpacity = useTransform(scrollY, [0, 400], [0.3, 1]);

    return (
        <div
            ref={maskRef}
            className={`absolute bottom-0 inset-x-0 pointer-events-none overflow-hidden ${className}`}
            style={{ height }}
        >
            {/* Layer 1: Primary gradient fade - soft white to transparent */}
            <motion.div
                className="absolute inset-0"
                style={{
                    background: `linear-gradient(to top, 
                        hsl(var(--background)) 0%, 
                        hsl(var(--background) / 0.95) 15%,
                        hsl(var(--background) / 0.8) 30%,
                        hsl(var(--background) / 0.5) 50%,
                        hsl(var(--background) / 0.2) 70%,
                        transparent 100%
                    )`,
                    opacity: intensity,
                }}
            />

            {/* Layer 2: Secondary gradient for depth */}
            <div
                className="absolute inset-0"
                style={{
                    background: `linear-gradient(to top, 
                        hsl(var(--background)) 0%, 
                        hsl(var(--background) / 0.7) 20%,
                        transparent 60%
                    )`,
                    opacity: intensity * 0.8,
                }}
            />

            {/* Layer 3: Radial gradient for center softness */}
            <div
                className="absolute inset-0"
                style={{
                    background: `radial-gradient(ellipse 150% 100% at 50% 100%, 
                        hsl(var(--background)) 0%, 
                        hsl(var(--background) / 0.6) 40%,
                        transparent 80%
                    )`,
                    opacity: intensity * 0.6,
                }}
            />

            {/* Layer 4: Noise texture for organic dissolve effect */}
            <div
                className="absolute inset-0 mix-blend-overlay"
                style={{
                    opacity: noiseOpacity,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Layer 5: Subtle backdrop blur zone */}
            <div
                className="absolute inset-x-0 bottom-0"
                style={{
                    height: "30%",
                    backdropFilter: `blur(${blurAmount}px)`,
                    WebkitBackdropFilter: `blur(${blurAmount}px)`,
                    maskImage: "linear-gradient(to top, black 0%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 100%)",
                }}
            />

            {/* Layer 6: Light diffusion glow */}
            <div
                className="absolute inset-0"
                style={{
                    background: `linear-gradient(to top, 
                        hsl(var(--background) / 0.3) 0%, 
                        transparent 50%
                    )`,
                    filter: "blur(20px)",
                    opacity: intensity * 0.5,
                }}
            />
        </div>
    );
}

// ============================================
// Scroll-Responsive Blending Mask
// ============================================
interface ScrollBlendMaskProps {
    className?: string;
    startOpacity?: number;
    endOpacity?: number;
    height?: string;
}

export function ScrollBlendMask({
    className = "",
    startOpacity = 0.5,
    endOpacity = 1,
    height = "50vh",
}: ScrollBlendMaskProps) {
    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 300], [startOpacity, endOpacity]);

    return (
        <motion.div
            className={`absolute bottom-0 inset-x-0 pointer-events-none ${className}`}
            style={{
                height,
                opacity,
            }}
        >
            {/* Multi-layer gradient */}
            <div
                className="absolute inset-0"
                style={{
                    background: `linear-gradient(to top,
                        hsl(var(--background)) 0%,
                        hsl(var(--background) / 0.98) 5%,
                        hsl(var(--background) / 0.9) 15%,
                        hsl(var(--background) / 0.7) 30%,
                        hsl(var(--background) / 0.4) 50%,
                        hsl(var(--background) / 0.1) 75%,
                        transparent 100%
                    )`,
                }}
            />

            {/* Glassmorphism layer */}
            <div
                className="absolute inset-x-0 bottom-0 h-1/3"
                style={{
                    backdropFilter: "blur(4px) saturate(1.2)",
                    WebkitBackdropFilter: "blur(4px) saturate(1.2)",
                    maskImage: "linear-gradient(to top, black 0%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 100%)",
                }}
            />
        </motion.div>
    );
}

// ============================================
// Depth Layers Container
// ============================================
interface DepthLayerProps {
    children: React.ReactNode;
    depth: number; // 0 = background, 1 = midground, 2 = foreground
    className?: string;
}

export function DepthLayer({ children, depth, className = "" }: DepthLayerProps) {
    const { scrollY } = useScroll();

    // Different parallax speeds based on depth
    const speeds = {
        0: [0, 150], // Background moves most
        1: [0, 80], // Midground moves less
        2: [0, 30], // Foreground moves least
    };

    const y = useTransform(scrollY, [0, 500], speeds[depth as keyof typeof speeds] || [0, 0]);

    return (
        <motion.div
            className={`${className}`}
            style={{
                y,
                zIndex: depth * 10,
            }}
        >
            {children}
        </motion.div>
    );
}
