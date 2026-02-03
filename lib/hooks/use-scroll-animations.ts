"use client";

import { useEffect, useRef, useState, createContext, useContext, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// ============================================
// GSAP ScrollTrigger Hook
// ============================================
export interface ScrollTriggerConfig {
    trigger?: string | Element | null;
    start?: string;
    end?: string;
    scrub?: boolean | number;
    markers?: boolean;
    toggleActions?: string;
    onEnter?: () => void;
    onLeave?: () => void;
    onEnterBack?: () => void;
    onLeaveBack?: () => void;
}

export function useGsapScrollTrigger<T extends HTMLElement>(
    animation: (element: T, tl: gsap.core.Timeline) => void,
    config: ScrollTriggerConfig = {},
    deps: any[] = []
) {
    const elementRef = useRef<T>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        // Create timeline with ScrollTrigger
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: config.trigger || element,
                start: config.start || "top 80%",
                end: config.end || "bottom 20%",
                scrub: config.scrub ?? false,
                markers: config.markers ?? false,
                toggleActions: config.toggleActions || "play none none reverse",
                onEnter: config.onEnter,
                onLeave: config.onLeave,
                onEnterBack: config.onEnterBack,
                onLeaveBack: config.onLeaveBack,
            },
        });

        timelineRef.current = tl;
        animation(element, tl);

        return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
        };
    }, deps);

    return elementRef;
}

// ============================================
// Parallax Hook
// ============================================
export interface ParallaxConfig {
    speed?: number; // -1 to 1, negative = slower than scroll, positive = faster
    direction?: "vertical" | "horizontal";
    start?: string;
    end?: string;
}

export function useParallax<T extends HTMLElement>(config: ParallaxConfig = {}) {
    const elementRef = useRef<T>(null);
    const { speed = 0.5, direction = "vertical", start = "top bottom", end = "bottom top" } = config;

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const distance = 100 * speed;
        const axis = direction === "vertical" ? "y" : "x";

        gsap.fromTo(
            element,
            { [axis]: -distance },
            {
                [axis]: distance,
                ease: "none",
                scrollTrigger: {
                    trigger: element,
                    start,
                    end,
                    scrub: true,
                },
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach((st) => {
                if (st.trigger === element) st.kill();
            });
        };
    }, [speed, direction, start, end]);

    return elementRef;
}

// ============================================
// Mouse Parallax Hook (3D Depth Effect)
// ============================================
export interface MouseParallaxConfig {
    strength?: number; // How much the element moves (default: 20)
    perspective?: number; // 3D perspective value
    rotateX?: boolean;
    rotateY?: boolean;
    scale?: boolean;
}

export function useMouseParallax<T extends HTMLElement>(config: MouseParallaxConfig = {}) {
    const elementRef = useRef<T>(null);
    const {
        strength = 20,
        perspective = 1000,
        rotateX = true,
        rotateY = true,
        scale = false,
    } = config;

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        let rafId: number;

        const handleMouseMove = (e: MouseEvent) => {
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                const rect = element.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const mouseX = e.clientX - centerX;
                const mouseY = e.clientY - centerY;

                const rotateYValue = rotateY ? (mouseX / rect.width) * strength : 0;
                const rotateXValue = rotateX ? -(mouseY / rect.height) * strength : 0;
                const scaleValue = scale ? 1.02 : 1;

                gsap.to(element, {
                    rotateX: rotateXValue,
                    rotateY: rotateYValue,
                    scale: scaleValue,
                    duration: 0.5,
                    ease: "power2.out",
                    transformPerspective: perspective,
                });
            });
        };

        const handleMouseLeave = () => {
            gsap.to(element, {
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                duration: 0.7,
                ease: "power2.out",
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener("mousemove", handleMouseMove);
            element.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [strength, perspective, rotateX, rotateY, scale]);

    return elementRef;
}

// ============================================
// Scroll Progress Hook
// ============================================
export function useScrollProgress(target?: React.RefObject<HTMLElement>) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const element = target?.current;

        const trigger = ScrollTrigger.create({
            trigger: element || document.body,
            start: element ? "top bottom" : "top top",
            end: element ? "bottom top" : "bottom bottom",
            scrub: true,
            onUpdate: (self) => {
                setProgress(self.progress);
            },
        });

        return () => trigger.kill();
    }, [target]);

    return progress;
}

// ============================================
// Cinematic Zoom Hook
// ============================================
export function useCinematicZoom<T extends HTMLElement>(config: {
    startScale?: number;
    endScale?: number;
    duration?: number;
} = {}) {
    const elementRef = useRef<T>(null);
    const { startScale = 1, endScale = 1.05, duration = 20 } = config;

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const tween = gsap.fromTo(
            element,
            { scale: startScale },
            {
                scale: endScale,
                duration,
                ease: "none",
                repeat: -1,
                yoyo: true,
            }
        );

        return () => {
            tween.kill();
        };
    }, [startScale, endScale, duration]);

    return elementRef;
}

// ============================================
// Stagger Reveal Hook
// ============================================
export function useStaggerReveal<T extends HTMLElement>(config: {
    childSelector?: string;
    stagger?: number;
    duration?: number;
    y?: number;
    start?: string;
} = {}) {
    const containerRef = useRef<T>(null);
    const {
        childSelector = "> *",
        stagger = 0.1,
        duration = 0.6,
        y = 30,
        start = "top 85%",
    } = config;

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const children = container.querySelectorAll(childSelector);

        gsap.fromTo(
            children,
            { opacity: 0, y },
            {
                opacity: 1,
                y: 0,
                duration,
                stagger,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: container,
                    start,
                    toggleActions: "play none none reverse",
                },
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach((st) => {
                if (st.trigger === container) st.kill();
            });
        };
    }, [childSelector, stagger, duration, y, start]);

    return containerRef;
}

// ============================================
// Counter Animation Hook
// ============================================
export function useAnimatedCounter(
    target: number,
    config: {
        duration?: number;
        start?: string;
        suffix?: string;
        prefix?: string;
    } = {}
) {
    const { duration = 2, start = "top 80%", suffix = "", prefix = "" } = config;
    const [count, setCount] = useState(0);
    const elementRef = useRef<HTMLElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const element = elementRef.current;
        if (!element || hasAnimated.current) return;

        const trigger = ScrollTrigger.create({
            trigger: element,
            start,
            onEnter: () => {
                if (hasAnimated.current) return;
                hasAnimated.current = true;

                const counter = { value: 0 };
                gsap.to(counter, {
                    value: target,
                    duration,
                    ease: "power2.out",
                    onUpdate: () => {
                        setCount(Math.round(counter.value));
                    },
                });
            },
        });

        return () => trigger.kill();
    }, [target, duration, start]);

    return {
        ref: elementRef,
        displayValue: `${prefix}${count.toLocaleString()}${suffix}`,
        count,
    };
}
