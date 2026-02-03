"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextReveal, FadeIn } from "@/components/ui/animation-wrappers";
import { ProjectsShowcase } from "@/components/home/projects-showcase";
import { ProjectsGrid } from "@/components/home/projects-grid";
import { Locale } from "@/types";
import { Project, GalleryProject } from "@/lib/data/projects";

interface ProjectsClientProps {
    projects: Project[];
    galleryProjects: GalleryProject[];
    lang: Locale;
}

export default function ProjectsClient({ projects, galleryProjects, lang }: ProjectsClientProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Parallax and Scale effects for the Hero
    const yHero = useTransform(scrollYProgress, [0, 0.2], [0, 150]);
    const scaleHero = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.15, 0.2], [1, 0.8, 0]);
    const blurHero = useTransform(scrollYProgress, [0, 0.2], [0, 10]);

    return (
        <main ref={containerRef} className="relative bg-background min-h-screen transition-colors duration-500">
            {/* Cinematic Hero Section */}
            <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
                <motion.div
                    style={{ y: yHero, scale: scaleHero, opacity: opacityHero, filter: `blur(${blurHero}px)` }}
                    className="absolute inset-0 z-0"
                >
                    {/* Color filter to match site theme */}
                    <div className="absolute inset-0 z-10 
                        dark:bg-secondary-dark/60 dark:mix-blend-multiply
                        light:bg-white/40 light:mix-blend-overlay" />
                    <div className="absolute inset-0 z-20 
                        dark:bg-gradient-to-b dark:from-transparent dark:via-secondary-dark/40 dark:to-secondary-dark
                        light:bg-gradient-to-b light:from-transparent light:via-white/50 light:to-background" />

                    <Image
                        src="/images/projects-hero.jpg"
                        alt="Projects Hero"
                        fill
                        className="object-cover"
                        priority
                    />
                </motion.div>

                <div className="container-custom relative z-30 text-center">
                    <FadeIn direction="up" delay={0.2}>
                        <span className="inline-block py-2 px-6 rounded-full backdrop-blur-md border text-accent text-xs font-bold uppercase tracking-[0.4em] mb-8 shadow-2xl
                            dark:bg-white/5 dark:border-white/10
                            light:bg-primary/5 light:border-primary/10">
                            {lang === 'ar' ? "معرض المشاريع" : "Project Portfolio"}
                        </span>
                    </FadeIn>
                    <TextReveal
                        text={lang === 'ar' ? "نصيغ المستقبل بأدوات الحاضر" : "Crafting the Future with Today's Excellence"}
                        className="text-5xl md:text-8xl font-bold font-heading tracking-tighter mb-8 leading-tight drop-shadow-2xl
                            dark:text-white light:text-foreground"
                    />
                    <FadeIn direction="up" delay={0.6}>
                        <p className="max-w-3xl mx-auto text-lg md:text-xl font-light leading-relaxed opacity-80 italic
                            dark:text-gray-300 light:text-muted-foreground">
                            {lang === 'ar'
                                ? "كل مشروع هو قصة نجاح، وتحدٍ هندسي حولناه إلى واقع ملموس يخدم المجتمع."
                                : "Every project is a success story, an engineering challenge transformed into a tangible reality serving the community."}
                        </p>
                    </FadeIn>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ delay: 1, duration: 2 }}
                    className="absolute bottom-10 left-1/2 -track-x-1/2 flex flex-col items-center gap-4"
                >
                    <div className="w-[1px] h-20 bg-gradient-to-b dark:from-white light:from-primary to-transparent" />
                </motion.div>
            </section>

            {/* Professional Engineering Intro Section */}
            <section className="relative py-32 backdrop-blur-sm z-10 transition-colors duration-500
                dark:bg-secondary-dark/50
                light:bg-neutral-50 light:border-y light:border-border/10">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="relative">
                            <div className="absolute -left-10 -top-10 w-40 h-40 bg-primary/20 blur-[100px] rounded-full" />
                            <FadeIn direction="left">
                                <h2 className="text-4xl md:text-6xl font-bold font-heading text-foreground mb-8 leading-tight">
                                    {lang === 'ar' ? "الدقة في التنفيذ، الإبداع في التصميم" : "Precision in Execution, Creativity in Design"}
                                </h2>
                            </FadeIn>
                            <div className="space-y-6 text-muted-foreground text-lg font-light leading-relaxed">
                                <FadeIn delay={0.2}>
                                    <p>
                                        {lang === 'ar'
                                            ? "نلتزم في الرواسي بالمعايير العالمية في كل تفريعة هندسية، بدءاً من التخطيط الأولي وصولاً إلى أدق التفاصيل في مرحلة التسليم."
                                            : "At Al-Rawasi, we adhere to global standards in every engineering branch, from initial planning to the finest details at the delivery stage."}
                                    </p>
                                </FadeIn>
                                <FadeIn delay={0.4}>
                                    <p>
                                        {lang === 'ar'
                                            ? "نستخدم أحدث التقنيات في نمذجة معلومات البناء (BIM) لضمان أعلى مستويات الدقة وتقليل الفاقد في الوقت والموارد."
                                            : "We utilize latest Building Information Modeling (BIM) technologies to ensure highest levels of precision and reduce time and resource waste."}
                                    </p>
                                </FadeIn>
                            </div>
                        </div>

                        {/* Static/Decorative Image/Element */}
                        <FadeIn direction="right" className="relative aspect-square">
                            <div className="absolute inset-0 border rounded-3xl rotate-3
                                dark:border-white/5 light:border-black/5" />
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-3xl" />
                            <Image
                                src="/images/projects-detail-view.jpg"
                                alt="Detail View"
                                fill
                                className="object-cover rounded-3xl opacity-60 brightness-75 transition-all duration-700 hover:opacity-100"
                            />
                            <div className="absolute bottom-10 right-10 backdrop-blur-xl border p-8 rounded-2xl max-w-xs
                                dark:bg-black/40 dark:border-white/10
                                light:bg-white/80 light:border-primary/10 light:shadow-xl">
                                <p className="text-accent font-bold text-4xl mb-2">100%</p>
                                <p className="font-bold text-sm uppercase tracking-widest
                                    dark:text-white light:text-primary">
                                    {lang === 'ar' ? "دقة معمارية" : "Architectural Precision"}
                                </p>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Immersive Projects Showcase - Limited to first 5 */}
            <div className="relative z-20">
                <ProjectsShowcase projects={projects.slice(0, 5)} lang={lang} />
            </div>

            {/* Modern Grid Gallery */}
            <div className="relative z-20">
                <ProjectsGrid projects={galleryProjects} lang={lang} />
            </div>
        </main>
    );
}
