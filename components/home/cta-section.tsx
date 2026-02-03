"use client";

import { Locale } from "@/types";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft, Send } from "lucide-react";
import { FadeIn } from "@/components/ui/animation-wrappers";

export function CTASection({ lang }: { lang: Locale }) {
    const isRTL = lang === 'ar';

    return (
        <section className="relative py-32 overflow-hidden flex items-center justify-center min-h-[60vh]">
            {/* Background Layers */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/hero-bg.jpg"
                    alt="Background"
                    fill
                    className="object-cover opacity-30 grayscale mix-blend-multiply"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/95 to-neutral-50" />

                {/* Animated Gradient Orbs - Much More Visible */}
                <motion.div
                    className="absolute top-1/4 left-1/4 w-[700px] h-[700px] bg-primary/20 rounded-full blur-[80px]"
                    animate={{
                        scale: [1, 1.6, 1],
                        opacity: [0.7, 0.9, 0.7],
                        x: [0, 120, 0],
                        y: [0, -80, 0],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[80px]"
                    animate={{
                        scale: [1, 1.7, 1],
                        opacity: [0.6, 0.9, 0.6],
                        x: [0, -100, 0],
                        y: [0, 100, 0],
                    }}
                    transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 w-[550px] h-[550px] bg-primary/15 rounded-full blur-[90px]"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0.8, 0.5],
                        x: [0, 60, 0],
                        y: [0, -40, 0],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Floating Particles - Much Larger and More Visible */}
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-3 h-3 bg-primary/40 rounded-full shadow-[0_0_20px_rgba(157,31,101,0.4)]"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -200, 0],
                            opacity: [0, 1, 0],
                            scale: [0.7, 2, 0.7],
                        }}
                        transition={{
                            duration: 5 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                            ease: "easeInOut"
                        }}
                    />
                ))}

                {/* Multiple Gradient Waves */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-accent/20"
                    animate={{
                        x: ['-100%', '100%'],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                <motion.div
                    className="absolute inset-0 bg-gradient-to-l from-primary/15 via-transparent to-accent/15"
                    animate={{
                        x: ['100%', '-100%'],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />

                {/* Strong Radial Pulse Effect */}
                <motion.div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/70 via-cyan-400/40 to-transparent"
                    animate={{
                        scale: [1, 2.2, 1],
                        opacity: [0.7, 0, 0.7],
                    }}
                    transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Diagonal Light Beams */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent"
                    animate={{
                        opacity: [0, 0.6, 0],
                        rotate: [0, 10, 0],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute inset-0 bg-gradient-to-tl from-accent/15 via-transparent to-transparent"
                    animate={{
                        opacity: [0, 0.5, 0],
                        rotate: [0, -8, 0],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                />
            </div>

            <div className="container-custom relative z-10 text-center px-4">
                <FadeIn direction="up">
                    <span className="inline-block py-2 px-6 rounded-full bg-primary/5 backdrop-blur-md border border-primary/10 text-primary text-xs font-bold uppercase tracking-[0.3em] mb-8 shadow-lg">
                        {lang === 'ar' ? "ابدأ رحلتك معنا" : "Start Your Journey"}
                    </span>
                </FadeIn>

                <FadeIn direction="up" delay={0.2}>
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading text-foreground tracking-tighter mb-8 leading-tight">
                        {lang === 'ar' ? "هل أنت مستعد لبناء المستقبل؟" : "Ready to Build the Future?"}
                    </h2>
                </FadeIn>

                <FadeIn direction="up" delay={0.4} className="max-w-2xl mx-auto mb-12">
                    <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
                        {lang === 'ar'
                            ? "دعنا نحول رؤيتك إلى واقع ملموس بمعايير عالمية وحلول مبتكرة."
                            : "Let us transform your vision into tangible reality with global standards and innovative solutions."}
                    </p>
                </FadeIn>

                <FadeIn direction="up" delay={0.6}>
                    <Link
                        href={`/${lang}/contact`}
                        className="group inline-flex items-center gap-4 px-10 py-5 bg-primary text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl hover:bg-primary/90 hover:scale-105 transition-all duration-300 ease-out"
                    >
                        <span>{lang === 'ar' ? "تحدث مع خبرائنا" : "Talk to Our Experts"}</span>
                        <div className="w-8 h-8 rounded-full bg-white text-primary flex items-center justify-center group-hover:bg-white/90 transition-colors duration-300">
                            {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                        </div>
                    </Link>
                </FadeIn>
            </div>
        </section>
    );
}
