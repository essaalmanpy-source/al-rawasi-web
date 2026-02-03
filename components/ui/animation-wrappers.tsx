"use client";

import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import React, { useRef } from "react";

// --- Types ---
export interface AnimationProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    direction?: "left" | "right" | "up" | "down" | "none";
}

// --- Smooth Scroll (Lenis) Wrapper ---
// Note: This should be used in the root layout if global smooth scroll is desired
// But simple CSS 'scroll-behavior: smooth' is often enough for anchor links. 
// For "Premium" smooth scroll, we use Lenis.
import { ReactLenis } from '@studio-freight/react-lenis';

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
    return (
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
            {children}
        </ReactLenis>
    );
}

// --- Fade In ---
export function FadeIn({ children, className, delay = 0, duration = 0.5, direction = "up" }: AnimationProps) {
    const offsets = {
        up: { y: 20, x: 0 },
        down: { y: -20, x: 0 },
        left: { y: 0, x: 20 },
        right: { y: 0, x: -20 },
        none: { y: 0, x: 0 }
    };

    const initial = direction === "none"
        ? { opacity: 0 }
        : { opacity: 0, x: offsets[direction].x, y: offsets[direction].y };

    return (
        <motion.div
            initial={initial}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// --- Slide In ---
export function SlideIn({ children, className, delay = 0, duration = 0.5, direction = "left" }: AnimationProps & { direction?: "left" | "right" | "up" | "down" }) {
    const variants = {
        hidden: {
            opacity: 0,
            x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
            y: direction === "up" ? 50 : direction === "down" ? -50 : 0
        },
        visible: { opacity: 1, x: 0, y: 0 }
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration, delay, ease: "easeOut" }}
            variants={variants}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// --- Stagger Container ---
export function StaggerContainer({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            transition={{ staggerChildren: 0.1, delayChildren: delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function StaggerItem({ children, className }: { children: React.ReactNode, className?: string }) {
    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <motion.div variants={variants} className={className}>
            {children}
        </motion.div>
    );
}

// --- Text Reveal ---
// Reveals text word by word (Arabic-compatible - keeps letters connected)
export function TextReveal({ text, className }: { text: string, className?: string }) {
    const words = text.split(" ");

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.1 },
        },
    };

    const wordAnimation = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 15,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 30,
        },
    };

    return (
        <motion.h1
            className={className}
            variants={container}
            initial="hidden"
            animate="visible"
        >
            {words.map((word, index) => (
                <motion.span
                    key={index}
                    variants={wordAnimation}
                    className="inline-block mx-[0.15em]"
                    style={{ display: 'inline-block' }}
                >
                    {word}
                </motion.span>
            ))}
        </motion.h1>
    );
}

// --- Scale In ---
export function ScaleIn({ children, className, delay = 0 }: AnimationProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay, ease: "backOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
