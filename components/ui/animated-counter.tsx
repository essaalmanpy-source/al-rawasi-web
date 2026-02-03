"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
    target: number;
    duration?: number;
    suffix?: string;
    prefix?: string;
    decimals?: number;
    className?: string;
    delay?: number;
}

export function AnimatedCounter({
    target,
    duration = 2,
    suffix = "",
    prefix = "",
    decimals = 0,
    className = "",
    delay = 0,
}: AnimatedCounterProps) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!isInView || hasAnimated.current) return;
        hasAnimated.current = true;

        const startTime = Date.now();
        const delayMs = delay * 1000;

        const animate = () => {
            const elapsed = Date.now() - startTime - delayMs;

            if (elapsed < 0) {
                requestAnimationFrame(animate);
                return;
            }

            const progress = Math.min(elapsed / (duration * 1000), 1);

            // Easing function for "built" feel - ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);

            const currentCount = eased * target;
            setCount(currentCount);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setCount(target);
            }
        };

        requestAnimationFrame(animate);
    }, [isInView, target, duration, delay]);

    // Format number with locale support
    const formattedCount = decimals > 0
        ? count.toFixed(decimals)
        : Math.round(count).toLocaleString();

    return (
        <motion.span
            ref={ref}
            className={className}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay }}
        >
            {prefix}
            {formattedCount}
            {suffix}
        </motion.span>
    );
}

// ============================================
// Statistics Card with Animated Counter
// ============================================
interface StatCardProps {
    value: number;
    label: string;
    suffix?: string;
    prefix?: string;
    icon?: React.ReactNode;
    delay?: number;
    className?: string;
}

export function StatCard({
    value,
    label,
    suffix = "",
    prefix = "",
    icon,
    delay = 0,
    className = "",
}: StatCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
            className={`group relative p-6 md:p-8 rounded-2xl bg-white border border-border/30 hover:border-primary/30 hover:shadow-lg transition-all duration-300 ${className}`}
        >
            {/* Hover glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

            <div className="relative z-10">
                {icon && (
                    <div className="w-12 h-12 mb-4 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                        {icon}
                    </div>
                )}

                <div className="text-4xl md:text-5xl font-bold text-foreground mb-2 font-heading">
                    <AnimatedCounter
                        target={value}
                        suffix={suffix}
                        prefix={prefix}
                        delay={delay + 0.2}
                        duration={2.5}
                    />
                </div>

                <p className="text-muted-foreground text-sm md:text-base">
                    {label}
                </p>
            </div>

            {/* Decorative corner */}
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/20 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
    );
}

// ============================================
// Compact Counter for inline use
// ============================================
interface CompactCounterProps {
    value: number;
    suffix?: string;
    label?: string;
    className?: string;
}

export function CompactCounter({ value, suffix = "", label, className = "" }: CompactCounterProps) {
    return (
        <div className={`text-center ${className}`}>
            <div className="text-3xl md:text-4xl font-bold text-primary font-heading">
                <AnimatedCounter target={value} suffix={suffix} duration={2} />
            </div>
            {label && (
                <p className="text-sm text-muted-foreground mt-1">{label}</p>
            )}
        </div>
    );
}
