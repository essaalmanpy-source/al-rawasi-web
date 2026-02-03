"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Locale } from "@/types";
import { useRef } from "react";
import Image from "next/image";

export function CompanyStory({ lang }: { lang: Locale }) {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

    return (
        <section ref={sectionRef} className="relative py-32 overflow-hidden">
            {/* Parallax Background */}
            <motion.div style={{ y }} className="absolute inset-0 z-0">
                <Image
                    src="/images/hero-bg.jpg" // Reusing hero image but darker
                    alt="Background"
                    fill
                    className="object-cover opacity-20 grayscale"
                />
                <div className="absolute inset-0 
                    dark:bg-secondary-dark/90 light:bg-white/95" />
            </motion.div>

            <div className="container-custom relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="backdrop-blur-xl border rounded-3xl p-8 md:p-16 max-w-4xl mx-auto text-center shadow-2xl transition-colors duration-500
                        dark:bg-white/5 dark:border-white/10
                        light:bg-white light:border-border/50"
                >
                    <span className="text-accent font-heading font-bold tracking-widest uppercase mb-6 block">
                        {lang === 'ar' ? 'قصتنا' : 'Our Story'}
                    </span>

                    <h2 className="text-3xl md:text-5xl font-bold mb-8 font-heading text-foreground">
                        {lang === 'ar'
                            ? "من فكرة طموحة إلى واقع هندسي ملموس"
                            : "From Ambitious Idea to Tangible Engineering Reality"}
                    </h2>

                    <div className="space-y-6 text-muted-foreground text-lg leading-relaxed font-light">
                        <p>
                            {lang === 'ar'
                                ? "تأسست شركة الرواسي انطلاقاً من إيمان عميق بأن الهندسة ليست مجرد أرقام ومخططات، بل هي فن صناعة الحياة. بدأنا كفريق صغير من المهندسين الشغوفين، واليوم نفخر بكوننا شريكاً في أكبر المشاريع التنموية في البلاد."
                                : "Al-Rawasi was founded on a deep belief that engineering is not just numbers and blueprints, but the art of crafting life. We started as a small team of passionate engineers, and today we are proud to be a partner in the country's largest development projects."}
                        </p>
                        <p>
                            {lang === 'ar'
                                ? "واجهنا التحديات بالابتكار، وبنينا سمعتنا على الالتزام الصارم بالجودة. كل مشروع قمنا به كان بمثابة حجر أساس في صرح الثقة الذي بنيناه مع عملائنا."
                                : "We faced challenges with innovation and built our reputation on strict adherence to quality. Every project we undertook was a cornerstone in the edifice of trust we built with our clients."}
                        </p>
                    </div>

                    <motion.div
                        className="mt-12 pt-8 border-t dark:border-white/10 light:border-border/20 flex justify-center gap-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="text-center">
                            <span className="block text-4xl font-bold text-primary mb-1">+25</span>
                            <span className="text-sm text-muted-foreground uppercase tracking-widest">{lang === 'ar' ? 'سنوات خبرة' : 'Years Experience'}</span>
                        </div>
                        <div className="text-center">
                            <span className="block text-4xl font-bold text-primary mb-1">+50</span>
                            <span className="text-sm text-muted-foreground uppercase tracking-widest">{lang === 'ar' ? 'مشروع مكتمل' : 'Projects Done'}</span>
                        </div>
                        <div className="text-center">
                            <span className="block text-4xl font-bold text-primary mb-1">100%</span>
                            <span className="text-sm text-muted-foreground uppercase tracking-widest">{lang === 'ar' ? 'رضا العملاء' : 'Satisfaction'}</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
