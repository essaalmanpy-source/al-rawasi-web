"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// ============================================
// Animation Context Types
// ============================================
type PerformanceTier = "high" | "medium" | "low";

interface AnimationContextType {
    // Reduced motion preference
    prefersReducedMotion: boolean;

    // Performance tier based on device capabilities
    performanceTier: PerformanceTier;

    // Global animation toggle
    animationsEnabled: boolean;
    setAnimationsEnabled: (enabled: boolean) => void;

    // Check if specific animation type should run
    shouldAnimate: (type?: "parallax" | "3d" | "scroll" | "hover") => boolean;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

// ============================================
// Performance Detection
// ============================================
function detectPerformanceTier(): PerformanceTier {
    if (typeof window === "undefined") return "high";

    // Check for low-end device indicators
    const connection = (navigator as any).connection;
    const deviceMemory = (navigator as any).deviceMemory;
    const hardwareConcurrency = navigator.hardwareConcurrency;

    // Mobile detection
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    );

    // Low-end indicators
    if (
        (connection && connection.saveData) ||
        (deviceMemory && deviceMemory < 4) ||
        (hardwareConcurrency && hardwareConcurrency < 4)
    ) {
        return "low";
    }

    // Medium for mobile devices
    if (isMobile) {
        return "medium";
    }

    return "high";
}

// ============================================
// Animation Provider Component
// ============================================
interface AnimationProviderProps {
    children: ReactNode;
}

export function AnimationProvider({ children }: AnimationProviderProps) {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const [performanceTier, setPerformanceTier] = useState<PerformanceTier>("high");
    const [animationsEnabled, setAnimationsEnabled] = useState(true);

    useEffect(() => {
        // Detect reduced motion preference
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(mediaQuery.matches);

        const handleChange = (e: MediaQueryListEvent) => {
            setPrefersReducedMotion(e.matches);
        };

        mediaQuery.addEventListener("change", handleChange);

        // Detect performance tier
        setPerformanceTier(detectPerformanceTier());

        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, []);

    const shouldAnimate = (type?: "parallax" | "3d" | "scroll" | "hover"): boolean => {
        // If animations are globally disabled or user prefers reduced motion
        if (!animationsEnabled || prefersReducedMotion) {
            return false;
        }

        // Filter by performance tier and animation type
        switch (type) {
            case "3d":
                // 3D effects only on high performance
                return performanceTier === "high";
            case "parallax":
                // Parallax on high and medium
                return performanceTier !== "low";
            case "scroll":
                // Scroll animations on all tiers but simplified on low
                return true;
            case "hover":
                // Hover effects on all tiers
                return true;
            default:
                return true;
        }
    };

    const value: AnimationContextType = {
        prefersReducedMotion,
        performanceTier,
        animationsEnabled,
        setAnimationsEnabled,
        shouldAnimate,
    };

    return (
        <AnimationContext.Provider value={value}>
            {children}
        </AnimationContext.Provider>
    );
}

// ============================================
// Hook to use Animation Context
// ============================================
export function useAnimation() {
    const context = useContext(AnimationContext);
    if (context === undefined) {
        // Return default values if not wrapped in provider
        return {
            prefersReducedMotion: false,
            performanceTier: "high" as PerformanceTier,
            animationsEnabled: true,
            setAnimationsEnabled: () => { },
            shouldAnimate: () => true,
        };
    }
    return context;
}

// ============================================
// HOC for conditional animation rendering
// ============================================
interface WithAnimationProps {
    fallback?: ReactNode;
    type?: "parallax" | "3d" | "scroll" | "hover";
}

export function withAnimation<P extends object>(
    WrappedComponent: React.ComponentType<P>,
    options: WithAnimationProps = {}
) {
    return function AnimatedComponent(props: P) {
        const { shouldAnimate } = useAnimation();
        const { fallback, type } = options;

        if (!shouldAnimate(type)) {
            return fallback ? <>{fallback}</> : null;
        }

        return <WrappedComponent {...props} />;
    };
}
